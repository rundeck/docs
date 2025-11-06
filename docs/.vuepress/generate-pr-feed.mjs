/**
 * generate-pr-feed.mjs
 * 
 * Generates RSS/Atom feeds and markdown pages from recently merged PRs
 * in the private rundeckpro repository. Designed for weekly release updates.
 * 
 * Usage:
 *   node generate-pr-feed.mjs --days=7 [--owner=rundeckpro] [--repo=rundeckpro]
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
  .option('owner', {
    alias: 'o',
    type: 'string',
    description: 'GitHub repository owner',
    default: 'rundeckpro'
  })
  .option('repo', {
    alias: 'r',
    type: 'string',
    description: 'GitHub repository name',
    default: 'rundeckpro'
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
    description: 'Maximum number of PRs to fetch',
    default: 100
  })
  .option('include-section', {
    type: 'string',
    description: 'Include a specific section from PR body (e.g., "Customer Summary")',
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
 * Calculate the "since" date based on config or --days parameter
 * @param {Object|null} config - Config object from pr-feed-config.json
 * @returns {Date} Date to use as cutoff for PRs
 */
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
    const releaseDate = new Date(config.lastSelfHostedRelease.date);
    console.log(`Using last self-hosted release: ${config.lastSelfHostedRelease.version} (${config.lastSelfHostedRelease.date})`);
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
  owner: argv.owner,
  repo: argv.repo,
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
 * Fetch recently merged PRs from GitHub
 * @param {Octokit} octokit - GitHub API client
 * @returns {Promise<Array>} Array of PR objects
 */
async function fetchRecentPRs(octokit) {
  const since = CONFIG.sinceDate;
  
  console.log(`Fetching PRs from ${CONFIG.owner}/${CONFIG.repo}...`);
  console.log(`Looking for PRs merged after ${since.toISOString().split('T')[0]}`);
  
  try {
    // Use paginate to get all PRs if more than per_page limit
    const pullRequests = await octokit.paginate(
      octokit.pulls.list,
      {
        owner: CONFIG.owner,
        repo: CONFIG.repo,
        state: 'closed',
        sort: 'updated',
        direction: 'desc',
        per_page: 100
      },
      (response) => response.data.slice(0, CONFIG.maxPRs)
    );

    console.log(`Retrieved ${pullRequests.length} closed PRs`);

    // Filter for merged PRs within the date range
    const mergedPRs = pullRequests.filter(pr => {
      if (!pr.merged_at) return false;
      
      const mergedDate = new Date(pr.merged_at);
      if (mergedDate <= since) return false;
      
      // Check for included labels
      const hasIncludedLabel = CONFIG.includeLabels.length === 0 || 
        pr.labels.some(label => CONFIG.includeLabels.includes(label.name));
      
      // Check for excluded labels
      const hasExcludedLabel = pr.labels.some(label => 
        CONFIG.excludeLabels.includes(label.name)
      );
      
      return hasIncludedLabel && !hasExcludedLabel;
    });

    console.log(`Found ${mergedPRs.length} merged PRs matching criteria`);
    
    // Sort by merge date, most recent first
    mergedPRs.sort((a, b) => new Date(b.merged_at) - new Date(a.merged_at));
    
    return mergedPRs;
    
  } catch (error) {
    console.error(`Error fetching PRs: ${error.message}`);
    if (error.status === 404) {
      console.error(`Repository ${CONFIG.owner}/${CONFIG.repo} not found or token lacks access.`);
    }
    throw error;
  }
}

/**
 * Group PRs by label categories
 * @param {Array} prs - Array of PR objects
 * @returns {Object} PRs grouped by category
 */
function groupPRsByCategory(prs) {
  const categories = {
    features: [],
    bugfixes: [],
    enhancements: [],
    other: []
  };
  
  prs.forEach(pr => {
    const labels = pr.labels.map(l => l.name.toLowerCase());
    
    if (labels.includes('feature')) {
      categories.features.push(pr);
    } else if (labels.includes('bugfix') || labels.includes('bug')) {
      categories.bugfixes.push(pr);
    } else if (labels.includes('enhancement') || labels.includes('improvement')) {
      categories.enhancements.push(pr);
    } else {
      categories.other.push(pr);
    }
  });
  
  return categories;
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
    const releaseDate = new Date(feedConfig.lastSelfHostedRelease.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      sectionContent
    };
  });
  
  // Prepare context for nunjucks
  const context = {
    currentDate: now.toISOString(),
    lastUpdated: dateStr,
    periodDescription,
    releaseInfo,
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
 * Format a single PR as markdown
 * @param {Object} pr - PR object
 * @returns {string} Formatted markdown
 */
function formatPRMarkdown(pr) {
  const mergedDate = new Date(pr.merged_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Clean the PR title to remove RUN-XXXX prefixes
  const cleanTitle = cleanPRTitle(pr.title);
  
  // Simple format: just title and date as a list item
  let markdown = `- **${escapeMarkdown(cleanTitle)}** _(${mergedDate})_\n`;
  
  // Optionally include a specific section from the PR body
  if (argv['include-section'] && pr.body) {
    const section = extractPRSection(pr.body, argv['include-section']);
    if (section) {
      // Indent the section content
      const indentedSection = section
        .split('\n')
        .map(line => line ? `  ${line}` : '')
        .join('\n');
      markdown += `${indentedSection}\n`;
    }
  }
  
  return markdown;
}

/**
 * Escape markdown special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeMarkdown(text) {
  if (!text) return '';
  // Don't escape characters inside code blocks
  return text.replace(/([*_~`])/g, '\\$1');
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
      <guid isPermaLink="false">rundeck-pr-${CONFIG.repo}-${pr.number}</guid>
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
    <id>rundeck-pr-${CONFIG.repo}-${pr.number}</id>
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
  console.log(`  Repository: ${CONFIG.owner}/${CONFIG.repo}`);
  
  if (feedConfig && feedConfig.lastSelfHostedRelease && !argv.days) {
    console.log(`  Mode: Since last self-hosted release`);
    console.log(`  Last release: ${feedConfig.lastSelfHostedRelease.version} (${feedConfig.lastSelfHostedRelease.date})`);
  } else {
    const daysDiff = Math.floor((new Date() - CONFIG.sinceDate) / (1000 * 60 * 60 * 24));
    console.log(`  Mode: Time-based lookback`);
    console.log(`  Days back: ${daysDiff}`);
  }
  
  console.log(`  Since date: ${CONFIG.sinceDate.toISOString().split('T')[0]}`);
  console.log(`  Include labels: ${CONFIG.includeLabels.join(', ')}`);
  console.log(`  Exclude labels: ${CONFIG.excludeLabels.join(', ')}`);
  console.log(`  Max PRs: ${CONFIG.maxPRs}`);
  console.log('');

  try {
    // Initialize GitHub client
    const octokit = initOctokit();
    
    // Fetch PRs
    const prs = await fetchRecentPRs(octokit);
    
    if (prs.length === 0) {
      console.log('\nNo PRs found matching the criteria.');
      console.log('Generating empty feeds...\n');
    }
    
    // Ensure output directories exist
    ensureDirectoryExists(CONFIG.outputDir);
    ensureDirectoryExists(CONFIG.feedsDir);
    
    // Generate markdown page
    const markdown = generateMarkdown(prs);
    const markdownPath = path.join(CONFIG.outputDir, 'index.md');
    writeFile(markdownPath, markdown, 'markdown page');
    
    // Generate RSS feed
    const rss = generateRSS(prs);
    const rssPath = path.join(CONFIG.feedsDir, 'development.xml');
    writeFile(rssPath, rss, 'RSS feed');
    
    // Generate Atom feed
    const atom = generateAtom(prs);
    const atomPath = path.join(CONFIG.feedsDir, 'development-atom.xml');
    writeFile(atomPath, atom, 'Atom feed');
    
    console.log('\n=== Summary ===');
    console.log(`Total PRs processed: ${prs.length}`);
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