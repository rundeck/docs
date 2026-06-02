import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import RundeckVersion from './version.mjs';
import { fetchPRsBetweenTags, extractPRSection, getPreviousVersion, cleanPRTitle } from './pr-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// Parse command line arguments
const argv = _yargs(hideBin(process.argv))
  .option('milestone', {
    type: 'string',
    description: 'Target version/milestone (e.g., 5.17.0) `npm run notes -- --milestone=5.17.0`',
    demandOption: true
  })
  .option('from-version', {
    type: 'string',
    description:
      'Previous version to compare from (e.g., 5.20.0). For X.0.0 milestones, defaults to docs setup.js RUNDECK_VERSION when it is still on the prior major line; otherwise auto-decrement (patch/minor) or legacy (major−1).17.0 fallback.'
  })
  .option('draft', {
    type: 'boolean',
    description:
      'Write to docs/history/…/draft.md and skip setup/sidebar/navbar updates. Omit for a full release run (version-X.Y.Z.md + config updates).',
    default: false
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description:
      'Output file path relative to the repo root (e.g. docs/history/6_x/version-6.0.0.md). Overrides the default path from --draft / milestone. Parent directories are created if needed.',
  })
  .help()
  .argv;

const template = fs.readFileSync('./docs/.vuepress/notes.md.nj');

const notesEnv = new nunjucks.Environment();
notesEnv.addFilter('cleanPRTitle', cleanPRTitle);

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
  const fromVersion = resolveNotesFromVersion(
    toVersion,
    setup.rundeckVersion,
    argv['from-version'],
  );

  const toParts = toVersion.split('.').map(Number);
  const isMajorMilestone =
    toParts.length === 3 &&
    !toParts.some(Number.isNaN) &&
    toParts[1] === 0 &&
    toParts[2] === 0;

  console.log('=== Rundeck Release Notes Generator ===\n');
  console.log(`Comparing versions: ${fromVersion} → ${toVersion}\n`);
  if (
    !argv['from-version'] &&
    isMajorMilestone &&
    fromVersion === setup.rundeckVersion
  ) {
    console.log(
      `(Prior line taken from docs setup.js RUNDECK_VERSION=${setup.rundeckVersion}. Override with --from-version= if needed.)\n`,
    );
  }
  
  // Check if toVersion tag exists by attempting to fetch from main repos
  // Use a quiet Octokit instance to avoid noisy 404 logs during tag detection
  const gh = new Octokit({ 
    auth: process.env.GH_API_TOKEN,
    log: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {}
    }
  });
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
      console.log(`✓ Found release tag: ${tag}\n`);
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
          console.log(`✓ Found git tag: ${tag}\n`);
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
      console.log(`⚠ Tag ${toVersion} not found, using HEAD for preview\n`);
      useHead = true;
    } else {
      console.log(`⚠ Tag ${toVersion} not found - creating placeholder file without PR data`);
      console.log(`  Tip: Use --draft mode to preview with HEAD, or create the tag first.\n`);
      // Continue execution but skip PR fetching
    }
  }
  
  const context = {};
  
  // Skip PR fetching if tag doesn't exist and not in draft mode
  const skipPRs = !tagExists && !useHead;
  
  if (skipPRs) {
    console.log('Skipping PR fetching (tag not found, not in draft mode)\n');
    context.core = { contributors: {}, pulls: [] };
    context.enterprise = { contributors: {}, pulls: [] };
    context.docs = { contributors: {}, pulls: [] };
    context.ansible = { contributors: {}, pulls: [] };
    context.runner = { contributors: {}, pulls: [] };
  } else {
    context.core = await getRepoData({ repo: 'rundeck', owner: 'rundeck' }, fromVersion, toVersion, ['release-notes/include'], useHead);
    context.enterprise = await getRepoData({ repo: 'rundeckpro', owner: 'rundeckpro' }, fromVersion, toVersion, ['release-notes/include'], useHead);
    context.docs = await getRepoData({ repo: 'docs', owner: 'rundeck' }, fromVersion, toVersion, [], useHead); // No label filtering for docs (need all PRs for contributors)
    context.ansible = await getRepoData({ repo: 'ansible-plugin', owner: 'rundeck-plugins' }, fromVersion, toVersion, ['release-notes/include'], useHead);
    context.runner = await getRepoData({ repo: 'sidecar', owner: 'rundeckpro' }, fromVersion, toVersion, ['release-notes/include'], useHead);
  }
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

  const notes = notesEnv.renderString(template.toString(), context);

  const seriesDir = `${argv.milestone.split('.').slice(0, 1).concat(['x']).join('_')}`;
  const pathBase = path.join(process.cwd(), 'docs', 'history', seriesDir);

  let outPath;
  if (argv.output) {
    outPath = path.resolve(process.cwd(), argv.output);
  } else if (argv.draft) {
    outPath = path.join(pathBase, 'draft.md');
  } else {
    outPath = path.join(pathBase, `version-${argv.milestone}.md`);
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  console.log(notes);
  fs.writeFileSync(outPath, notes);

  // Only run update functions if not a draft
  if (!argv.draft) {
    console.log('\n=== Updating Configuration Files ===\n');
    // Turning off docsearch update for version specific page
    // updateDocsearchVersion(argv.milestone);
    updateSetupJs(argv.milestone);
    addSidebarVersion(argv.milestone);
    updateLatestReleaseLink(argv.milestone);
    updateNavbarReleaseLink(argv.milestone);
    updatePRFeedConfig(argv.milestone);
    
    console.log('\n✓ Successfully generated release notes and updated all configuration files!');
    console.log(`  File: ${outPath}`);
    if (!tagExists && !useHead) {
      console.log('\n  Note: PR data not included (tag not found). Re-run after creating the tag to populate PR details.');
    }
  } else {
    console.log(`\n✓ Draft release notes generated: ${outPath}`);
  }
}

// Helper: Add sidebar version entry if not present (under Version {major}.x in Previous Version Docs)
function addSidebarVersion(version) {
  const sidebarPath = path.resolve(__dirname, 'sidebar-menus/history.ts');
  let content = fs.readFileSync(sidebarPath, 'utf-8');
  const versionEntry = `          {\n            text: "${version}",\n            link: "https://docs.rundeck.com/${version}/"\n          },\n`;
  if (content.includes(`text: "${version}"`)) {
    console.log(`Sidebar version entry for ${version} already exists in history.ts, skipping.`);
    return;
  }

  const major = version.split('.')[0];
  const sectionLabel = `Version ${major}.x`;
  // Match current sidebar style: text: 'Version N.x',
  const sectionOpen = new RegExp(
    `(text: 'Version ${major.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.x',[\\s\\S]*?children: \\[)(\\n)`,
    'm',
  );
  let match = content.match(sectionOpen);
  if (match) {
    const insertIndex = match.index + match[1].length;
    content = content.slice(0, insertIndex) + versionEntry + content.slice(insertIndex);
    fs.writeFileSync(sidebarPath, content);
    console.log(`Added sidebar version entry for ${version} under ${sectionLabel} in history.ts`);
    return;
  }

  // New major line: insert a Version N.x block at the top of Previous Version Docs children
  const newBlock = `      {\n        text: '${sectionLabel}',\n        collapsible: true,\n        children: [\n${versionEntry}        ]\n      },\n`;
  const previousDocsRegex =
    /(text: "Previous Version Docs",\s*\n\s*collapsible: true,\s*\n\s*children: \[\n)/;
  if (previousDocsRegex.test(content)) {
    content = content.replace(previousDocsRegex, `$1${newBlock}`);
    fs.writeFileSync(sidebarPath, content);
    console.log(
      `Added ${sectionLabel} block with ${version} to history.ts (new major line under Previous Version Docs)`,
    );
    return;
  }

  console.warn(
    'Could not find matching Version N.x section or Previous Version Docs in sidebar-menus/history.ts',
  );
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
  // Use quiet logging to avoid noisy 404 errors during tag format attempts
  const gh = new Octokit({ 
    auth: process.env.GH_API_TOKEN,
    log: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {}
    }
  });

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
      [], // Exclude labels (e.g., 'wip', 'do-not-publish') - none currently needed
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


// function updateDocsearchVersion(version) {
//   const docsearchConfigPath = path.resolve(__dirname, '../../.docsearch/config.json');
//   const docsearchConfig = JSON.parse(fs.readFileSync(docsearchConfigPath, 'utf-8'));
//   if (
//     docsearchConfig.start_urls &&
//     docsearchConfig.start_urls[0] &&
//     docsearchConfig.start_urls[0].variables &&
//     Array.isArray(docsearchConfig.start_urls[0].variables.version)
//   ) {
//     docsearchConfig.start_urls[0].variables.version[2] = version;
//     fs.writeFileSync(docsearchConfigPath, JSON.stringify(docsearchConfig, null, 2));
//     console.log(`Updated .docsearch/config.json version to ${version}`);
//   } else {
//     console.warn('Could not update .docsearch/config.json: version array not found.');
//   }
// }

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
