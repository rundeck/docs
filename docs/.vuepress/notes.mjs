import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import RundeckVersion from './version.mjs';
import { fetchPRsBetweenTags, extractPRSection, getPreviousVersion } from './pr-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// Parse command line arguments
const argv = _yargs(hideBin(process.argv))
  .option('milestone', {
    type: 'string',
    description: 'Target version/milestone (e.g., 5.17.0)',
    demandOption: true
  })
  .option('from-version', {
    type: 'string',
    description: 'Previous version to compare from (e.g., 5.16.0). Auto-calculated if not provided.'
  })
  .option('draft', {
    type: 'boolean',
    description: 'Generate as draft.md instead of version-X.Y.Z.md',
    default: false
  })
  .help()
  .argv;

const template = fs.readFileSync('./docs/.vuepress/notes.md.nj');

// List of usernames to exclude from contributors
const excludeUsernames = [
  'github-actions[bot]',
  'dependabot[bot]',
  'fdevans',
  'gschueler',
  'alexander-variacode',
  'mrdubr',
  'carlosrfranco',
  'chrismcg14',
  'ChuckCrawford',
  'jsboak',
  'jbrookspd',
  'Jesus-Osuna-M',
  'hiawvp',
  'ltamaster',
  'ronaveva',
  'smartinellibenedetti',
  'jayas006',
  'edbaltra'
];

async function main() {
  // Determine version range
  const toVersion = argv.milestone;
  const fromVersion = argv['from-version'] || getPreviousVersion(toVersion);
  
  console.log('=== Rundeck Release Notes Generator ===\n');
  console.log(`Comparing versions: ${fromVersion} → ${toVersion}\n`);
  
  // Check if toVersion tag exists by attempting to fetch from main repos
  const gh = new Octokit({ auth: process.env.GH_API_TOKEN });
  let tagExists = false;
  let useHead = false;
  
  // Try to find the tag in rundeck repo (main repo)
  const tagFormats = [`v${toVersion}`, toVersion, `V${toVersion}`];
  for (const tag of tagFormats) {
    try {
      await gh.rest.repos.getReleaseByTag({
        owner: 'rundeck',
        repo: 'rundeck',
        tag: tag
      });
      tagExists = true;
      break;
    } catch (error) {
      if (error.status !== 404) {
        // Some other error, try git refs
        try {
          await gh.rest.git.getRef({
            owner: 'rundeck',
            repo: 'rundeck',
            ref: `tags/${tag}`
          });
          tagExists = true;
          break;
        } catch (refError) {
          // Continue to next format
        }
      }
    }
  }
  
  // Determine behavior based on tag existence and mode
  if (!tagExists) {
    if (argv.draft) {
      console.log(`\nWarning: Tag ${toVersion} not found, using HEAD for preview\n`);
      useHead = true;
    } else {
      console.error(`\nERROR: Tag ${toVersion} not found.`);
      console.error(`       Create the tag first or use --draft mode to preview with HEAD.\n`);
      console.log(`Continuing with empty results to create placeholder file...\n`);
      // Continue execution but with empty results
    }
  }
  
  const context = {};
  context.core = await getRepoData({ repo: 'rundeck', owner: 'rundeck' }, fromVersion, toVersion, ['release-notes/include'], useHead);
  context.enterprise = await getRepoData({ repo: 'rundeckpro', owner: 'rundeckpro' }, fromVersion, toVersion, ['release-notes/include'], useHead);
  context.docs = await getRepoData({ repo: 'docs', owner: 'rundeck' }, fromVersion, toVersion, [], useHead); // No label filtering for docs (need all PRs for contributors)
  context.ansible = await getRepoData({ repo: 'ansible-plugin', owner: 'rundeck-plugins' }, fromVersion, toVersion, ['release-notes/include'], useHead);
  context.runner = await getRepoData({ repo: 'sidecar', owner: 'rundeckpro' }, fromVersion, toVersion, ['release-notes/include'], useHead);
  context.contributors = { ...context.core.contributors, ...context.docs.contributors, ...context.ansible.contributors };

  context.version = new RundeckVersion({ versionString: argv.milestone });
  
  // Add current date in two formats
  const now = new Date();
  context.currentDate = now.toISOString().split('T')[0]; // Format: 2025-01-01
  
  // Format for "January 1st, 2025"
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const day = now.getDate();
  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  context.currentDateLong = `${monthNames[now.getMonth()]} ${day}${suffix(day)}, ${now.getFullYear()}`;

  const notes = nunjucks.renderString(template.toString(), context);

  const pathBase = `./docs/history/${argv.milestone.split('.').slice(0, 1).concat(['x']).join('_')}/`;

  let outPath = "";
  if (argv.draft) {
    outPath = path.join(pathBase, 'draft.md');
  } else {
    outPath = path.join(pathBase, `version-${argv.milestone}.md`);
  }
  console.log(notes);
  fs.writeFileSync(outPath, notes);

  // Only run update functions if not a draft
  if (!argv.draft) {
    updateDocsearchVersion(argv.milestone);
    updateSetupJs(argv.milestone);
    addSidebarVersion(argv.milestone);
    updateLatestReleaseLink(argv.milestone);
    updateNavbarReleaseLink(argv.milestone);
    updatePRFeedConfig(argv.milestone);
  }
}

// Helper: Add sidebar version entry if not present
function addSidebarVersion(version) {
  const sidebarPath = path.resolve(__dirname, 'sidebar-menus/history.ts');
  let content = fs.readFileSync(sidebarPath, 'utf-8');
  const versionEntry = `          {\n            text: "${version}",\n            link: "https://docs.rundeck.com/${version}/"\n          },\n`;
  if (content.includes(`text: "${version}"`)) {
    console.log(`Sidebar version entry for ${version} already exists in history.ts, skipping.`);
    return;
  }
  const version5xSection = /text: 'Version 5\.x',[\s\S]*?children: \[/m;
  const match = content.match(version5xSection);
  if (match) {
    const insertIndex = match.index + match[0].indexOf('children: [') + 'children: ['.length;
    content = content.slice(0, insertIndex) + '\n' + versionEntry + content.slice(insertIndex);
    fs.writeFileSync(sidebarPath, content);
    console.log(`Added sidebar version entry for ${version} to history.ts`);
  } else {
    console.warn('Could not find Version 5.x section in sidebar-menus/history.ts');
  }
}

// Helper: Update the "Latest Release" link in sidebar
function updateLatestReleaseLink(version) {
  const sidebarPath = path.resolve(__dirname, 'sidebar-menus/history.ts');
  let content = fs.readFileSync(sidebarPath, 'utf-8');
  
  // Find the major version number (e.g., "5" from "5.17.0")
  const majorVersion = version.split('.')[0];
  
  // Pattern to match the "Latest Release" link line
  const latestReleasePattern = /(text: 'Latest Release',[\s\S]*?link: ')\/history\/\d+_x\/version-[\d.]+\.md(',)/;
  
  if (content.match(latestReleasePattern)) {
    // Replace with new version
    content = content.replace(
      latestReleasePattern,
      `$1/history/${majorVersion}_x/version-${version}.md$2`
    );
    
    fs.writeFileSync(sidebarPath, content);
    console.log(`Updated "Latest Release" link to version ${version} in history.ts`);
  } else {
    console.warn('Could not find "Latest Release" link pattern in sidebar-menus/history.ts');
  }
}

// Helper: Update the "Release Notes" link in navbar
function updateNavbarReleaseLink(version) {
  const navbarPath = path.resolve(__dirname, 'navbar-menus/about.js');
  let content = fs.readFileSync(navbarPath, 'utf-8');
  
  // Find the major version number (e.g., "5" from "5.17.0")
  const majorVersion = version.split('.')[0];
  
  // Pattern to match the Release Notes link line in navbar
  const releaseNotesPattern = /(text: 'Release Notes',[\s\S]*?link: ')\/history\/\d+_x\/version-[\d.]+\.md(')/;
  
  if (content.match(releaseNotesPattern)) {
    // Replace with new version
    content = content.replace(
      releaseNotesPattern,
      `$1/history/${majorVersion}_x/version-${version}.md$2`
    );
    
    fs.writeFileSync(navbarPath, content);
    console.log(`Updated navbar "Release Notes" link to version ${version} in about.js`);
  } else {
    console.warn('Could not find "Release Notes" link pattern in navbar-menus/about.js');
  }
}

async function getRepoData(repo, fromVersion, toVersion, includeLabels, useHead = false) {
  const gh = new Octokit({ auth: process.env.GH_API_TOKEN });

  console.log(`Fetching PRs from ${repo.owner}/${repo.repo}...`);
  
  try {
    // Determine the head reference
    const headRef = useHead ? 'main' : null;
    
    // Fetch PRs between tags using shared utility
    const pulls = await fetchPRsBetweenTags(
      gh,
      repo.owner,
      repo.repo,
      fromVersion,
      toVersion,
      includeLabels,
      excludeUsernames, // Use excludeUsernames as exclude labels (though these are for contributors)
      headRef
    );

    // Extract contributors (excluding bots and internal users)
    const contributors = {};
    
    for (const p of pulls) {
      if (excludeUsernames.includes(p.user.login)) continue;
      if (contributors[p.user.login]) continue;
      
      try {
        const user = await gh.users.getByUsername({ username: p.user.login });
        contributors[user.data.login] = user.data;
      } catch (error) {
        console.warn(`  Warning: Could not fetch user data for ${p.user.login}: ${error.message}`);
      }
    }

    // Extract "Release Notes" section from all PRs
    const pullsWithNotes = pulls.map(pr => ({
      ...pr,
      releaseNotes: extractPRSection(pr.body, 'Release Notes')
    }));

    console.log(`  Found ${pullsWithNotes.length} PRs and ${Object.keys(contributors).length} contributors\n`);

    return {
      contributors,
      pulls: pullsWithNotes,
    };
  } catch (error) {
    console.error(`  Error fetching PRs from ${repo.owner}/${repo.repo}: ${error.message}`);
    return { contributors: {}, pulls: [] };
  }
}


(async () => {
  await main();
})();


function updateDocsearchVersion(version) {
  const docsearchConfigPath = path.resolve(__dirname, '../../.docsearch/config.json');
  const docsearchConfig = JSON.parse(fs.readFileSync(docsearchConfigPath, 'utf-8'));
  if (
    docsearchConfig.start_urls &&
    docsearchConfig.start_urls[0] &&
    docsearchConfig.start_urls[0].variables &&
    Array.isArray(docsearchConfig.start_urls[0].variables.version)
  ) {
    docsearchConfig.start_urls[0].variables.version[2] = version;
    fs.writeFileSync(docsearchConfigPath, JSON.stringify(docsearchConfig, null, 2));
    console.log(`Updated .docsearch/config.json version to ${version}`);
  } else {
    console.warn('Could not update .docsearch/config.json: version array not found.');
  }
}

function updateSetupJs(version) {
  const setupJsPath = path.resolve(__dirname, 'setup.js');
  let setupJs = fs.readFileSync(setupJsPath, 'utf-8');
  setupJs = setupJs
    .replace(/const RUNDECK_VERSION='[^']*'/, `const RUNDECK_VERSION='${version}'`)
    .replace(/const RUNDECK_VERSION_FULL='[^']*'/, `const RUNDECK_VERSION_FULL='${version}-SNAPSHOT'`);
  fs.writeFileSync(setupJsPath, setupJs);
  console.log(`Updated setup.js RUNDECK_VERSION to ${version} and RUNDECK_VERSION_FULL to ${version}-SNAPSHOT`);
}

function updatePRFeedConfig(version) {
  const configPath = path.resolve(__dirname, 'pr-feed-config.json');
  
  // Read existing config to preserve fields like lastSaasRelease and lastSaasCut
  let config = { lastSelfHostedRelease: {} };
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (error) {
      console.warn('Could not parse existing pr-feed-config.json, creating new config.');
    }
  }
  
  // Get current date in YYYY-MM-DD format
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  // Update version and lastSelfHostedDate, preserve other fields
  config.lastSelfHostedRelease = {
    ...config.lastSelfHostedRelease,
    version: version,
    lastSelfHostedDate: dateStr,
    description: "Last self-hosted release version and date"
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`Updated pr-feed-config.json with version ${version} and date ${dateStr}`);
}
