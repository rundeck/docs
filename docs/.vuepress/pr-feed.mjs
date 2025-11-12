/**
 * pr-feed.mjs
 * 
 * Generates RSS/Atom feeds and markdown pages from recently merged PRs
 * from both rundeckpro/rundeckpro and rundeck/rundeck repositories.
 * 
 * Usage:
 *   node pr-feed.mjs [--days=7] [--include-section="Release Notes"]
 * 
 * Environment Variables:
 *   GH_API_TOKEN - GitHub API token with access to private repos
 */

import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import nunjucks from 'nunjucks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the template
const template = fs.readFileSync('./docs/.vuepress/pr-feed.md.nj');

// Load environment variables
dotenv.config();

// Parse command line arguments
const argv = _yargs(hideBin(process.argv))
  .option('days', {
    alias: 'd',
    type: 'number',
    description: 'Number of days to look back for merged PRs (overrides --since-release)',
  })
  .option('since-release', {
    type: 'boolean',
    description: 'Show PRs since last self-hosted release (from pr-feed-config.json)',
    default: true
  })
  .option('output-dir', {
    type: 'string',
    description: 'Output directory for markdown page',
    default: path.join(__dirname, '../history/updates')
  })
  .option('labels', {
    alias: 'l',
    type: 'array',
    description: 'Labels to filter PRs (space-separated)',
    default: ['release-notes/include']
  })
  .option('exclude-labels', {
    type: 'array',
    description: 'Labels to exclude from results',
    default: ['wip', 'do-not-publish']
  })
  .option('max-prs', {
    type: 'number',
    description: 'Maximum number of PRs to fetch per repository',
    default: 100
  })
  .option('include-section', {
    type: 'string',
    description: 'Include a specific section from PR body (e.g., "Release Notes")',
  })
  .help()
  .argv;

/**
 * Load the PR feed configuration
 * @returns {Object} Configuration object with lastSelfHostedRelease info
 */
function loadConfig() {
  const configPath = path.join(__dirname, 'pr-feed-config.json');
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.warn(`Warning: Could not load pr-feed-config.json: ${error.message}`);
    console.warn('Falling back to --days parameter.');
    return null;
  }
}

/**
 * Parse the SaaS cut tag to extract commit SHAs
 * Tag format: rba/${vNum}-RBA-${vDate}-${coreSha}-${proSha}
 * Example: rba/5.18-RBA-20251030-2f39445-a6d9e14
 * 
 * @param {string} tag - SaaS cut tag
 * @returns {Object} Object with rundeckSha and rundeckproSha, or null if parse fails
 */
function parseSaasCutTag(tag) {
  // Tag format: rba/5.18-RBA-20251030-2f39445-a6d9e14
  //                    ^version  ^date    ^core   ^pro
  const match = tag.match(/^rba\/[\d.]+-RBA-\d{8}-([a-f0-9]+)-([a-f0-9]+)$/);
  
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
 * Fetch PRs merged after a specific tag using git comparison
 * @param {Object} octokit - Initialized Octokit instance
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} version - Version tag (e.g., "5.17.0")
 * @param {Array<string>} includeLabels - Labels that PRs must have
 * @param {string} headRef - Optional head reference (defaults to 'main')
 * @returns {Promise<Array>} Array of PR objects
 */
async function fetchPRsSinceTag(octokit, owner, repo, version, includeLabels = [], headRef = 'main') {
  // Try different tag naming conventions
  const tagFormats = [`v${version}`, version, `V${version}`];
  
  let comparison = null;
  let tagUsed = null;
  
  for (const tag of tagFormats) {
    try {
      // Compare tag to head reference
      comparison = await octokit.rest.repos.compareCommits({
        owner,
        repo,
        base: tag,
        head: headRef
      });
      tagUsed = tag;
      console.log(`  Found tag ${tag}, ${comparison.data.ahead_by} commits ahead of ${headRef}`);
      break;
    } catch (error) {
      if (error.status === 404) {
        continue; // Try next format
      }
      throw error;
    }
  }
  
  if (!comparison) {
    const errorMsg = `Tag for version ${version} not found in ${owner}/${repo} (tried: ${tagFormats.map(tag => `'${tag}'`).join(', ')})`;
    console.error(`  ERROR: ${errorMsg}`);
    throw new Error(errorMsg);
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
        
        // Check if PR has required labels
        if (includeLabels.length === 0 || includeLabels.some(label => prLabels.includes(label))) {
          // Check exclude labels
          if (!CONFIG.excludeLabels.some(label => prLabels.includes(label))) {
            prs.push({
              ...pr,
              _repoOwner: owner,
              _repoName: repo
            });
          }
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

function calculateSinceDate(config) {
  // If --days is explicitly provided, use it
  if (argv.days) {
    const since = new Date();
    since.setDate(since.getDate() - argv.days);
    console.log(`Using explicit --days=${argv.days} parameter`);
    return since;
  }
  
  // If --since-release is true and config exists, use release date
  if (argv['since-release'] && config && config.lastSelfHostedRelease) {
    const releaseDate = new Date(config.lastSelfHostedRelease.lastSelfHostedDate);
    console.log(`Using last self-hosted release: ${config.lastSelfHostedRelease.version} (${config.lastSelfHostedRelease.lastSelfHostedDate})`);
    return releaseDate;
  }
  
  // Fallback to 7 days
  const since = new Date();
  since.setDate(since.getDate() - 7);
  console.log('No config found, falling back to 7 days');
  return since;
}

// Load configuration
const feedConfig = loadConfig();

// Configuration
const CONFIG = {
  sinceDate: calculateSinceDate(feedConfig),
  includeLabels: argv.labels,
  excludeLabels: argv['exclude-labels'],
  maxPRs: argv['max-prs'],
  outputDir: argv['output-dir'],
  feedsDir: path.join(__dirname, '../.vuepress/public/feeds'),
  siteUrl: 'https://docs.rundeck.com',
  feedTitle: 'Rundeck Development Updates',
  feedDescription: 'Recent merged pull requests and development updates from Rundeck'
};

/**
 * Initialize Octokit with GitHub API token
 */
function initOctokit() {
  const token = process.env.GH_API_TOKEN;
  
  if (!token) {
    console.error('Error: GH_API_TOKEN environment variable is not set.');
    console.error('Please set your GitHub API token to access private repositories.');
    process.exit(1);
  }
  
  return new Octokit({ auth: token });
}

/**
 * Fetch recent merged PRs from a specific repository
 * @param {Object} octokit - Initialized Octokit instance
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {Array<string>} includeLabels - Labels that PRs must have (empty array = all PRs)
 * @param {Date} sinceDate - Date to fetch PRs after
 * @returns {Promise<Array>} Array of PR objects
 */
async function fetchRecentPRs(octokit, owner, repo, includeLabels, sinceDate) {
  console.log(`  Repository: ${owner}/${repo}`);
  if (includeLabels.length > 0) {
    console.log(`  Required labels: ${includeLabels.join(', ')}`);
  } else {
    console.log(`  No label filtering`);
  }
  
  try {
    // Use paginate to handle large result sets automatically
    const pullRequests = await octokit.paginate(
      octokit.rest.pulls.list,
      {
        owner,
        repo,
        state: 'closed',
        sort: 'updated',
        direction: 'desc',
        per_page: 100
      },
      (response, done) => {
        // Filter only merged PRs within our date range
        const filtered = response.data.filter(pr => {
          // Must be merged (not just closed)
          if (!pr.merged_at) return false;
          
          // Must be within date range
          const mergedDate = new Date(pr.merged_at);
          if (mergedDate < sinceDate) {
            done(); // Stop pagination once we're past our date range
            return false;
          }
          
          return true;
        });
        
        return filtered;
      }
    );
    
    console.log(`  Found ${pullRequests.length} merged PRs since ${sinceDate.toISOString().split('T')[0]}`);
    
    // Filter by labels
    const filteredPRs = pullRequests.filter(pr => {
      const prLabels = pr.labels.map(label => label.name);
      
      // Check exclude labels first
      if (CONFIG.excludeLabels.some(label => prLabels.includes(label))) {
        return false;
      }
      
      // Check include labels (must have at least one, if specified)
      if (includeLabels.length > 0) {
        return includeLabels.some(label => prLabels.includes(label));
      }
      
      return true;
    });
    
    console.log(`  After label filtering: ${filteredPRs.length} PRs`);
    
    // Limit to max PRs and sort by merge date (newest first)
    const limitedPRs = filteredPRs
      .sort((a, b) => new Date(b.merged_at) - new Date(a.merged_at))
      .slice(0, CONFIG.maxPRs);
    
    if (limitedPRs.length < filteredPRs.length) {
      console.log(`  Limited to ${CONFIG.maxPRs} most recent PRs`);
    }
    
    // Add repo information to each PR for later use
    const prsWithRepo = limitedPRs.map(pr => ({
      ...pr,
      _repoOwner: owner,
      _repoName: repo
    }));
    
    return prsWithRepo;
    
  } catch (error) {
    if (error.status === 404) {
      throw new Error(`Repository ${owner}/${repo} not found. Check your credentials and repository name.`);
    } else if (error.status === 401) {
      throw new Error('Authentication failed. Check your GitHub token.');
    } else {
      throw new Error(`Failed to fetch PRs from ${owner}/${repo}: ${error.message}`);
    }
  }
}

/**
 * Generate markdown content for VuePress
 * @param {Array} prs - Array of PR objects
 * @returns {string} Markdown content
 */
function generateMarkdown(prs) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  // Determine what to show in the description
  let periodDescription;
  let releaseInfo = '';
  if (feedConfig && feedConfig.lastSelfHostedRelease && !argv.days) {
    const releaseVersion = feedConfig.lastSelfHostedRelease.version;
    // Parse date as UTC to avoid timezone issues
    const releaseDateParts = feedConfig.lastSelfHostedRelease.lastSelfHostedDate.split('-');
    const releaseDate = new Date(Date.UTC(
      parseInt(releaseDateParts[0]), 
      parseInt(releaseDateParts[1]) - 1, 
      parseInt(releaseDateParts[2])
    )).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
    periodDescription = `merged since the last self-hosted release`;
    releaseInfo = ` of [${releaseVersion}](/history/5_x/version-${releaseVersion}.md) on ${releaseDate}`;
  } else {
    const daysDiff = Math.floor((now - CONFIG.sinceDate) / (1000 * 60 * 60 * 24));
    periodDescription = `merged in the last ${daysDiff} days`;
  }
  
  // Prepare PR data for template
  const prData = prs.map(pr => {
    const mergedDate = new Date(pr.merged_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const cleanTitle = cleanPRTitle(pr.title);
    
    let sectionContent = null;
    if (argv['include-section'] && pr.body) {
      const section = extractPRSection(pr.body, argv['include-section']);
      if (section) {
        // Indent the section content for proper markdown formatting
        sectionContent = section
          .split('\n')
          .map(line => line ? `  ${line}` : '')
          .join('\n');
      }
    }
    
    return {
      cleanTitle,
      mergedDate,
      sectionContent,
      repoName: pr._repoName,
      prUrl: pr.html_url,
      number: pr.number
    };
  });
  
  // Format lastSaasRelease date if available
  let lastSaasRelease = null;
  if (feedConfig && feedConfig.lastSelfHostedRelease && feedConfig.lastSelfHostedRelease.lastSaasRelease) {
    const saasDateParts = feedConfig.lastSelfHostedRelease.lastSaasRelease.split('-');
    lastSaasRelease = new Date(Date.UTC(
      parseInt(saasDateParts[0]), 
      parseInt(saasDateParts[1]) - 1, 
      parseInt(saasDateParts[2])
    )).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  }
  
  // Prepare context for nunjucks
  const context = {
    currentDate: now.toISOString(),
    lastUpdated: dateStr,
    periodDescription,
    releaseInfo,
    lastSaasRelease,
    prs: prData
  };
  
  // Render template with context
  return nunjucks.renderString(template.toString(), context);
}

/**
 * Clean PR title by removing RUN-XXXX prefixes
*/
function cleanPRTitle(title) {
  if (!title) return '';
  // Remove one or more RUN-XXXX prefixes with optional colons and spaces
  return title.replace(/^(RUN-[0-9]+\s*)+:?\s*/g, '').trim();
}

/**
 * Extract a specific section from PR body
 * Looks for sections like "## Customer Summary" or "### Release Notes"
 * @param {string} body - PR body text
 * @param {string} sectionName - Section header to look for (case insensitive)
 * @returns {string|null} Section content or null if not found
 */
function extractPRSection(body, sectionName) {
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
 * Generate RSS 2.0 feed
 * @param {Array} prs - Array of PR objects
 * @returns {string} RSS XML content
 */
function generateRSS(prs) {
  const now = new Date();
  const updatesPageUrl = `${CONFIG.siteUrl}/docs/history/updates/`;
  
  const items = prs.map(pr => {
    const cleanTitle = cleanPRTitle(pr.title);
    const mergedDate = new Date(pr.merged_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Simple description with just the title and date
    const description = `${cleanTitle} (Merged: ${mergedDate})`;
    
    return `    <item>
      <title>${escapeXml(cleanTitle)}</title>
      <link>${updatesPageUrl}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(pr.merged_at).toUTCString()}</pubDate>
      <guid isPermaLink="false">rundeck-pr-${pr._repoName}-${pr.number}</guid>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CONFIG.feedTitle)}</title>
    <link>${CONFIG.siteUrl}/docs</link>
    <description>${escapeXml(CONFIG.feedDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <atom:link href="${CONFIG.siteUrl}/feeds/development.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

/**
 * Generate Atom feed
 * @param {Array} prs - Array of PR objects
 * @returns {string} Atom XML content
 */
function generateAtom(prs) {
  const now = new Date();
  const updatesPageUrl = `${CONFIG.siteUrl}/docs/history/updates/`;
  
  const entries = prs.map(pr => {
    const cleanTitle = cleanPRTitle(pr.title);
    const mergedDate = new Date(pr.merged_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Simple content with just the title and date
    const content = escapeXml(`${cleanTitle} (Merged: ${mergedDate})`);
    
    return `  <entry>
    <title>${escapeXml(cleanTitle)}</title>
    <link href="${updatesPageUrl}" />
    <id>rundeck-pr-${pr._repoName}-${pr.number}</id>
    <updated>${new Date(pr.merged_at).toISOString()}</updated>
    <content type="text">${content}</content>
  </entry>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(CONFIG.feedTitle)}</title>
  <link href="${CONFIG.siteUrl}/feeds/development.xml" rel="self" />
  <link href="${CONFIG.siteUrl}/docs" />
  <updated>${now.toISOString()}</updated>
  <id>${CONFIG.siteUrl}/feeds/development</id>
  <subtitle>${escapeXml(CONFIG.feedDescription)}</subtitle>
${entries}
</feed>`;
}

/**
 * Escape XML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeXml(str) {
  if (!str) return '';
  return str.toString().replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Ensure directory exists, create if not
 * @param {string} dirPath - Directory path
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Write file with error handling
 * @param {string} filePath - File path
 * @param {string} content - Content to write
 * @param {string} description - Description for logging
 */
function writeFile(filePath, content, description) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Generated ${description}: ${filePath}`);
  } catch (error) {
    console.error(`✗ Error writing ${description}: ${error.message}`);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('=== Rundeck PR Feed Generator ===\n');
  console.log('Configuration:');
  console.log(`  Repositories: rundeckpro/rundeckpro + rundeck/rundeck`);
  
  // Initialize GitHub client early to fetch tag info
  const octokit = initOctokit();
  
  // Determine the version to use
  let version = null;
  let tagBasedMode = false;
  
  if (feedConfig && feedConfig.lastSelfHostedRelease && !argv.days) {
    version = feedConfig.lastSelfHostedRelease.version;
    tagBasedMode = true;
    console.log(`  Mode: Since last self-hosted release tag`);
    console.log(`  Last release: ${version}`);
  } else {
    const daysDiff = Math.floor((new Date() - CONFIG.sinceDate) / (1000 * 60 * 60 * 24));
    console.log(`  Mode: Time-based lookback`);
    console.log(`  Days back: ${daysDiff}`);
  }
  
  console.log(`  Include labels (both repos): ${CONFIG.includeLabels.join(', ')}`);
  console.log(`  Exclude labels: ${CONFIG.excludeLabels.join(', ')}`);
  console.log(`  Max PRs per repo: ${CONFIG.maxPRs}`);
  console.log('');

  try {
    let allPRs = [];
    
    if (tagBasedMode) {
      // Tag-based mode: compare git history
      const saasCutTag = feedConfig.lastSelfHostedRelease.lastSaasCut;
      
      // Parse the SaaS cut tag to extract commit SHAs
      const saasCutCommits = saasCutTag ? parseSaasCutTag(saasCutTag) : null;
      
      console.log('Fetching PRs from rundeckpro/rundeckpro...');
      // For rundeckpro, use the proSha from the tag or fall back to main
      let rundeckproHead = 'main';
      if (saasCutCommits) {
        rundeckproHead = saasCutCommits.rundeckproSha;
        console.log(`  Using SaaS cut commit as endpoint: ${rundeckproHead.substring(0, 7)}`);
      }
      const rundeckproPRs = await fetchPRsSinceTag(octokit, 'rundeckpro', 'rundeckpro', version, CONFIG.includeLabels, rundeckproHead);
      
      console.log('\nFetching PRs from rundeck/rundeck...');
      // For rundeck, use the coreSha from the tag or fall back to main
      let rundeckHead = 'main';
      if (saasCutCommits) {
        rundeckHead = saasCutCommits.rundeckSha;
        console.log(`  Using SaaS cut commit as endpoint: ${rundeckHead.substring(0, 7)}`);
      }
      const rundeckPRs = await fetchPRsSinceTag(octokit, 'rundeck', 'rundeck', version, CONFIG.includeLabels, rundeckHead);
      
      // Combine and sort all PRs by merge date
      allPRs = [...rundeckproPRs, ...rundeckPRs];
    } else {
      // Time-based mode: use date-based fetching
      console.log('Fetching PRs from rundeckpro/rundeckpro...');
      const rundeckproPRs = await fetchRecentPRs(octokit, 'rundeckpro', 'rundeckpro', CONFIG.includeLabels, CONFIG.sinceDate);
      
      console.log('\nFetching PRs from rundeck/rundeck...');
      const rundeckPRs = await fetchRecentPRs(octokit, 'rundeck', 'rundeck', CONFIG.includeLabels, CONFIG.sinceDate);
      
      // Combine and sort all PRs by merge date
      allPRs = [...rundeckproPRs, ...rundeckPRs];
    }
    
    allPRs.sort((a, b) => new Date(b.merged_at) - new Date(a.merged_at));
    
    console.log(`\nTotal PRs from both repos: ${allPRs.length}`);
    
    if (allPRs.length === 0) {
      console.log('\nNo PRs found matching the criteria.');
      console.log('Generating empty feeds...\n');
    }
    
    // Ensure output directories exist
    ensureDirectoryExists(CONFIG.outputDir);
    ensureDirectoryExists(CONFIG.feedsDir);
    
    // Generate markdown page
    const markdown = generateMarkdown(allPRs);
    const markdownPath = path.join(CONFIG.outputDir, 'index.md');
    writeFile(markdownPath, markdown, 'markdown page');
    
    // Generate RSS feed
    const rss = generateRSS(allPRs);
    const rssPath = path.join(CONFIG.feedsDir, 'development.xml');
    writeFile(rssPath, rss, 'RSS feed');
    
    // Generate Atom feed
    const atom = generateAtom(allPRs);
    const atomPath = path.join(CONFIG.feedsDir, 'development-atom.xml');
    writeFile(atomPath, atom, 'Atom feed');
    
    console.log('\n=== Summary ===');
    console.log(`Total PRs processed: ${allPRs.length}`);
    console.log(`Markdown page: ${markdownPath}`);
    console.log(`RSS feed: ${rssPath}`);
    console.log(`Atom feed: ${atomPath}`);
    console.log(`Feed URL (RSS): ${CONFIG.siteUrl}/feeds/development.xml`);
    console.log(`Feed URL (Atom): ${CONFIG.siteUrl}/feeds/development-atom.xml`);
    console.log('\n✓ Generation complete!');
    
  } catch (error) {
    console.error('\n✗ Fatal error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Execute main function
(async () => {
  await main();
})();