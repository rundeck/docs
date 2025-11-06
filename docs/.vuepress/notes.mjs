import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';
import nunjucks from 'nunjucks';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import RundeckVersion from './version.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const argv = _yargs(hideBin(process.argv)).argv;

const template = fs.readFileSync('./docs/.vuepress/notes.md.nj');

const excludeLabels = ['release-notes/exclude'];
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
  'smartinellibenedetti'
];

const ghToken = process.env.GH_API_TOKEN;

dotenv.config();

async function main() {
  const context = {};
  context.core = await getRepoData({ repo: 'rundeck', owner: 'rundeck' }, []);
  context.enterprise = await getRepoData({ repo: 'rundeckpro', owner: 'rundeckpro' }, ['release-notes/include']);
  context.docs = await getRepoData({ repo: 'docs', owner: 'rundeck' }, []);
  context.ansible = await getRepoData({ repo: 'ansible-plugin', owner: 'rundeck-plugins' }, ['release-notes/include']);
  context.runner = await getRepoData({ repo: 'sidecar', owner: 'rundeckpro' }, ['release-notes/include']);
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
  
  // Extract "Release Notes" section from enterprise PRs
  context.enterprise.pulls = context.enterprise.pulls.map(pr => ({
    ...pr,
    releaseNotes: extractPRSection(pr.body, 'Release Notes')
  }));

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

// Helper: Extract a specific section from PR body
function extractPRSection(body, sectionName) {
  if (!body) return null;
  
  // Match section headers like "## Release Notes" or "### Release Notes"
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

async function getRepoData(repo, includeLabels) {
  const gh = new Octokit({ auth: process.env.GH_API_TOKEN });

  const milestones = await gh.issues.listMilestones({ ...repo });

  const milestone = milestones.data.find((m) => m.title === argv.milestone);

  if (!milestone) {
    console.error(`GitHub milestone ${argv.milestone} not found on ${repo.owner}/${repo.repo}.`);
  } else {
    const issuesResp = await gh.paginate(gh.issues.listForRepo, {
      ...repo,
      milestone: milestone.number,
      state: 'closed',
      labels: includeLabels.join(','),
      per_page: 100,
    });

    const pulls = issuesResp
      .filter((i) => i.pull_request)
      .filter((i) => !i.labels.some((l) => excludeLabels.includes(l.name)));

    const issues = issuesResp
      .filter((i) => !i.pull_request)
      .filter((i) => !i.labels.some((l) => !excludeLabels.includes(l.name)));

    const contributors = {};
    const reporters = {};

    for (const p of pulls) {
      if (excludeUsernames.includes(p.user.login)) continue;
      if (contributors[p.user.login]) continue;
      const user = await gh.users.getByUsername({ username: p.user.login });
      contributors[user.data.login] = user.data;
    }

    for (const i of issues) {
      if (excludeUsernames.includes(i.user.login)) continue;
      if (reporters[i.user.login]) continue;
      const user = await gh.users.getByUsername({ username: i.user.login });
      reporters[user.data.login] = user.data;
    }

    return {
      contributors,
      reporters,
      pulls,
      issues,
    };
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
  const today = new Date().toISOString().split('T')[0];
  
  const config = {
    lastSelfHostedRelease: {
      version: version,
      date: today,
      description: "Last self-hosted release version and date"
    }
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`Updated pr-feed-config.json with version ${version} and date ${today}`);
}
