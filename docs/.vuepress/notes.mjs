import fs from 'fs';
import * as path from 'path';
import { Buffer } from 'buffer';
import nunjucks from 'nunjucks';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import RundeckVersion from './version.mjs';

const argv = _yargs(hideBin(process.argv)).argv;

const template = fs.readFileSync('./docs/.vuepress/notes.md.nj');

const excludeLabels = ['release-notes/exclude'];

const ghToken = process.env.GH_API_TOKEN;

dotenv.config();

console.log(ghToken)

async function main() {
  const context = {};
  context.core = await getRepoData({ repo: 'rundeck', owner: 'rundeck' }, []);
  context.enterprise = await getRepoData({ repo: 'rundeckpro', owner: 'rundeckpro' }, ['release-notes/include']);
  context.docs = await getRepoData({ repo: 'docs', owner: 'rundeck' }, []);
  context.ansible = await getRepoData({ repo: 'ansible-plugin', owner: 'rundeck-plugins' }, []);
  context.runner = await getRepoData({ repo: 'sidecar', owner: 'rundeckpro' }, ['release-notes/include']);
  context.sidecarVersion = await getSideCarVersion({ repo: 'rundeckpro', owner: 'rundeckpro' });
  context.contributors = { ...context.core.contributors, ...context.docs.contributors, ...context.ansible.contributors };

  context.version = new RundeckVersion({ versionString: argv.milestone });

  const notes = nunjucks.renderString(template.toString(), context);

  const pathBase = `./docs/history/${argv.milestone.split('.').slice(0, 1).concat(['x']).join('_')}/`;

  //let path;
  let outPath = "";

  if (argv.draft) {
    outPath = path.join(pathBase, 'draft.md');
  } else {
    outPath = path.join(pathBase, `version-${argv.milestone}.md`);
  }

  fs.writeFileSync(outPath, notes);
}

async function getSideCarVersion(repo) {
  const gh = new Octokit({ auth: argv.token || process.env.GH_API_TOKEN });

  const milestones = await gh.issues.listMilestones({ ...repo });

  const milestone = milestones.data.find((m) => m.title === argv.milestone);

  if (!milestone) {
    console.error(`GitHub milestone ${argv.milestone} not found!`);
  } else {
    try {
      const proRunnerVersion = await gh.repos.getContent({
        ...repo,
        path: 'gradle.properties',
        ref: `v${milestone.title}`,
      });

      const runnerVersion = proRunnerVersion.data;
      const content = Buffer.from(runnerVersion.content, 'base64').toString();
      const sidecarVersionLine = content.match(/^sidecarVersion=(.*)/m);

      if (sidecarVersionLine) {
        const version = sidecarVersionLine[1].trim();
        console.log(`Sidecar Version: ${version}`);
        return {
          version,
        };
      }
    } catch (error) {
      console.error('Sidecar Version Not Found');
      const version = 'Version Not Found check for release tag';
      return {
        version,
      };
    }
  }
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
      if (contributors[p.user.login]) continue;
      const user = await gh.users.getByUsername({ username: p.user.login });
      contributors[user.data.login] = user.data;
    }

    for (const i of issues) {
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

main();
