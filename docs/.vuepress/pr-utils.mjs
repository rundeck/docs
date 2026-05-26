/**
 * pr-utils.mjs
 * 
 * Shared utilities for fetching and processing GitHub Pull Requests
 * based on tag comparisons.
 */

/**
 * Parse the SaaS cut tag to extract commit SHAs
 * Tag format: rba/${vNum}-RBA-${vDate}-${coreSha}-${proSha}
 * Example: rba/5.18-RBA-20251030-2f39445-a6d9e14
 * 
 * @param {string} tag - SaaS cut tag
 * @returns {Object} Object with rundeckSha and rundeckproSha, or null if parse fails
 */
export function parseSaasCutTag(tag) {
  // Tag format: rba/5.18-RBA-20251030-2f39445-a6d9e14
  //                    ^version  ^date    ^core   ^pro
  const match = tag.match(/^rba\/[\d.]+-RBA-\d{8}-([a-fA-F0-9]+)-([a-fA-F0-9]+)$/);
  
  if (!match) {
    console.warn(`  Warning: Could not parse SaaS cut tag format: ${tag}`);
    return null;
  }
  
  return {
    rundeckSha: match[1],     // coreSha - rundeck submodule commit
    rundeckproSha: match[2]   // proSha - rundeckpro commit
  };
}

/**
 * Fetch PRs merged between two tags using git comparison
 * @param {Object} octokit - Initialized Octokit instance
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} fromVersion - Starting version tag (e.g., "5.16.0")
 * @param {string} toVersion - Ending version tag (e.g., "5.17.0")
 * @param {Array<string>} includeLabels - Labels that PRs must have (empty array = all PRs)
 * @param {Array<string>} excludeLabels - Labels to exclude from results
 * @param {string} headRef - Optional head reference (defaults to trying the toVersion tag)
 * @returns {Promise<Array>} Array of PR objects
 */
export async function fetchPRsBetweenTags(octokit, owner, repo, fromVersion, toVersion, includeLabels = [], excludeLabels = [], headRef = null) {
  // Try different tag naming conventions for base (from) tag
  const baseTagFormats = [`v${fromVersion}`, fromVersion, `V${fromVersion}`];
  
  // Try different tag naming conventions for head (to) tag
  const headTagFormats = headRef ? [headRef] : [`v${toVersion}`, toVersion, `V${toVersion}`];
  
  let comparison = null;
  let baseTagUsed = null;
  let headTagUsed = null;
  
  // Try to find valid base tag (silently try different formats)
  for (const baseTag of baseTagFormats) {
    for (const headTag of headTagFormats) {
      try {
        // Compare base tag to head tag/ref
        comparison = await octokit.rest.repos.compareCommits({
          owner,
          repo,
          base: baseTag,
          head: headTag
        });
        baseTagUsed = baseTag;
        headTagUsed = headTag;
        console.log(`  ✓ Found tags ${baseTag}...${headTag}, ${comparison.data.ahead_by} commits ahead`);
        break;
      } catch (error) {
        if (error.status === 404) {
          continue; // Try next format silently
        }
        throw error;
      }
    }
    if (comparison) break;
  }
  
  if (!comparison) {
    console.log(`  ⚠ Tags ${fromVersion}...${toVersion} not found - skipping ${owner}/${repo}`);
    return [];
  }
  
  // Extract PR numbers from merge commits
  const prNumbers = new Set();
  for (const commit of comparison.data.commits) {
    // Check for standard merge commit pattern
    const match = commit.commit.message.match(/Merge pull request #(\d+)/);
    if (match) {
      prNumbers.add(parseInt(match[1]));
    } else {
      // For squash merges or other commits, check if they're associated with a PR
      try {
        const { data: associatedPRs } = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
          owner,
          repo,
          commit_sha: commit.sha
        });
        
        // Add any merged PRs associated with this commit
        associatedPRs.forEach(pr => {
          if (pr.merged_at) {
            prNumbers.add(pr.number);
          }
        });
      } catch (error) {
        // Log errors for individual commits at debug level to aid troubleshooting
        console.debug(`    Debug: Could not fetch associated PRs for commit ${commit.sha}: ${error.message}`);
      }
    }
  }
  
  console.log(`  Found ${prNumbers.size} unique PRs (including squash merges)`);
  
  // Fetch full PR data and filter by labels
  // Use batched parallel requests to improve performance and respect rate limits
  // Processing 10 PRs at a time provides a good balance between speed and API courtesy
  const BATCH_SIZE = 10;
  const prNumbersArray = Array.from(prNumbers);
  const prs = [];
  
  for (let i = 0; i < prNumbersArray.length; i += BATCH_SIZE) {
    const batch = prNumbersArray.slice(i, i + BATCH_SIZE);
    
    // Fetch batch in parallel
    const batchResults = await Promise.allSettled(
      batch.map(prNumber =>
        octokit.rest.pulls.get({
          owner,
          repo,
          pull_number: prNumber
        })
      )
    );
    
    // Process results and filter by labels
    batchResults.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        const pr = result.value.data;
        const prLabels = pr.labels.map(label => label.name);
        
        // Check exclude labels first
        if (excludeLabels.length > 0 && excludeLabels.some(label => prLabels.includes(label))) {
          return;
        }
        
        // Check if PR has required labels (empty array means no filtering)
        if (includeLabels.length === 0 || includeLabels.some(label => prLabels.includes(label))) {
          prs.push({
            ...pr,
            _repoOwner: owner,
            _repoName: repo
          });
        }
      } else {
        const prNumber = batch[idx];
        console.warn(`  Warning: Could not fetch PR #${prNumber} from ${owner}/${repo}: ${result.reason?.message || 'Unknown error'}`);
      }
    });
  }
  
  console.log(`  After label filtering: ${prs.length} PRs with required labels`);
  
  return prs;
}

/**
 * Clean PR title by removing the required Jira prefix `[RUN-123]` (optional colon/spaces after `]`).
 * Titles without this prefix are left unchanged so non-compliant titles surface as-is.
 * @param {string} title - PR title
 * @returns {string} Cleaned title
 */
export function cleanPRTitle(title) {
  if (!title) return '';
  return title.replace(/^(?:\[RUN-[0-9]+\]\s*:?\s*)+/, '').trim();
}

/**
 * Extract a specific section from PR body
 * Looks for sections like "## Customer Summary" or "### Release Notes"
 * @param {string} body - PR body text
 * @param {string} sectionName - Section header to look for (case insensitive)
 * @returns {string|null} Section content or null if not found
 */
export function extractPRSection(body, sectionName) {
  if (!body) return null;
  
  // Match section headers like "## Customer Summary" or "### Release Notes"
  const sectionRegex = new RegExp(
    `^#+\\s*${sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`,
    'im'
  );
  
  const lines = body.split('\n');
  let inSection = false;
  let sectionContent = [];
  let sectionLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (sectionRegex.test(line)) {
      // Found the section header
      inSection = true;
      sectionLevel = line.match(/^#+/)[0].length;
      continue;
    }
    
    if (inSection) {
      // Check if we've hit another section at same or higher level
      const headerMatch = line.match(/^(#+)\s/);
      if (headerMatch && headerMatch[1].length <= sectionLevel) {
        break; // End of our section
      }
      sectionContent.push(line);
    }
  }
  
  const content = sectionContent.join('\n').trim();
  return content || null;
}

/**
 * Auto-decrement version to get previous version
 * Examples:
 *   5.17.0 -> 5.16.0
 *   5.17.1 -> 5.17.0
 *   5.0.0 -> 4.17.0 (assumes previous major version ended at .17.0)
 * 
 * @param {string} version - Current version (e.g., "5.17.0")
 * @returns {string} Previous version
 */
export function getPreviousVersion(version) {
  const parts = version.split('.').map(Number);
  
  if (parts.length !== 3) {
    throw new Error(`Invalid version format: ${version}. Expected format: X.Y.Z`);
  }
  
  let [major, minor, patch] = parts;
  
  // If patch > 0, decrement patch
  if (patch > 0) {
    return `${major}.${minor}.${patch - 1}`;
  }
  
  // If minor > 0, decrement minor
  if (minor > 0) {
    return `${major}.${minor - 1}.0`;
  }
  
  // Major bump (e.g. 6.0.0 → prior line). Old releases used a fixed minor; use
  // resolveNotesFromVersion() with docs RUNDECK_VERSION instead for accurate PR ranges.
  if (major > 0) {
    return `${major - 1}.17.0`;
  }

  throw new Error(`Cannot decrement version: ${version}`);
}

/**
 * Resolve the "from" version for release-notes PR scraping.
 * For a new major (X.0.0), if docs still track the previous major in setup (RUNDECK_VERSION),
 * use that value so notes span 5.20.0 → 6.0.0 instead of a stale hardcoded 5.17.0.
 *
 * @param {string} toVersion - Milestone (e.g. "6.0.0")
 * @param {string} docsRundeckVersion - Typically setup.rundeckVersion from the docs build
 * @param {string|null|undefined} explicitFrom - CLI --from-version when set
 * @returns {string}
 */
export function resolveNotesFromVersion(toVersion, docsRundeckVersion, explicitFrom) {
  if (explicitFrom) {
    return explicitFrom;
  }
  const tp = toVersion.split('.').map(Number);
  if (tp.length !== 3 || tp.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid milestone: ${toVersion}. Expected X.Y.Z`);
  }
  const [maj, min, pat] = tp;
  const sp = String(docsRundeckVersion || '')
    .split('.')
    .map(Number);
  const isMajorMilestone = min === 0 && pat === 0;
  const docsLooksPriorLine = sp.length === 3 && !sp.some(Number.isNaN) && sp[0] === maj - 1;
  if (isMajorMilestone && docsLooksPriorLine) {
    return docsRundeckVersion;
  }
  return getPreviousVersion(toVersion);
}

