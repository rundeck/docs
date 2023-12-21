import FS from 'fs';
import Path from 'path';
import { Buffer } from 'buffer';
import nunjucks from 'nunjucks';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { RundeckVersion } from './version.js';


const argv = yargs(hideBin(process.argv)).argv

const template = FS.readFileSync('./docs/.vuepress/notes.md.nj')

const excludeLabels = ['release-notes/exclude']

async function main() {
    const context = {}
    context.core = await getRepoData({repo: 'rundeck', owner: 'rundeck'}, [])
    context.enterprise = await getRepoData({repo: 'rundeckpro', owner: 'rundeckpro'}, ['release-notes/include'])
    context.docs = await getRepoData({repo: 'docs', owner: 'rundeck'}, [])
    context.ansible = await getRepoData({repo: 'ansible-plugin', owner: 'rundeck-plugins'}, [])
    context.runner = await getRepoData({repo: 'sidecar', owner: 'rundeckpro'}, ['release-notes/include'])
    context.sidecarVersion = await getSideCarVersion({repo: 'rundeckpro', owner: 'rundeckpro'})
    context.contributors = {...context.core.contributors, ...context.docs.contributors, ...context.ansible.contributors}
    //context.reporters = {...context.core.reporters, ...context.enterprise.reporters}

    // FS.writeFileSync('notes.json', JSON.stringify(context))
    // const data = FS.readFileSync('notes.json')
    // const context = JSON.parse(data.toString())

    context.version = new RundeckVersion({versionString: argv.milestone})

    const notes = nunjucks.renderString(template.toString(), context)

    console.log(notes)

    const pathBase = `./docs/history/${argv.milestone.split('.').slice(0,1).concat(['x']).join('_')}/`

    let path

    if (argv.draft) {
        path = Path.join(pathBase, 'draft.md')
    }
    else {
        path = Path.join(pathBase, `version-${argv.milestone}.md`)
    }

    FS.writeFileSync(path, notes)
}

async function getSideCarVersion(repo) {
    const gh = new Octokit({auth: argv.token || process.env.GH_API_TOKEN})

    const milestones = await gh.issues.listMilestones({...repo})

    const milestone = milestones.data.filter(m => m.title == argv.milestone)[0]
    
    //console.log(milestone.title)

    if (!milestone) {
        console.error(`GitHub milestone ${argv.milestone} not found!`)
        // process.exit(1)
    } else {
        try {
            const proRunnerVersion = await gh.repos.getContent({
                ...repo,
                path: "gradle.properties",
                ref: `v${milestone.title}`
            })
            //console.log(proRunnerVersion);
            const runnerVersion = proRunnerVersion.data;
            //console.log(`RunnerVersionvar: ${runnerVersion}`);
            const content = Buffer.from(runnerVersion.content, "base64").toString();
            // console.log(`Content:\n${content}\n`);
            const sidecarVersionLine = content.match(/^sidecarVersion=(.*)/m);
            if (sidecarVersionLine) {
                version = sidecarVersionLine[1].trim();
                console.log(`Sidecar Version: ${version}`);
            }
            return {
                version
            }
        } catch (error) {
            console.error("Sidecar Version Not Found")
            version = "Version Not Found check for release tag"
            //console.log(error);
            return {
                version
            }
        }
    }
}

async function getRepoData(repo, includeLabels, excludeTags) {
    const gh = new Octokit({auth: argv.token || process.env.GH_API_TOKEN})

    const milestones = await gh.issues.listMilestones({...repo})

    const milestone = milestones.data.filter(m => m.title == argv.milestone)[0]

    if (!milestone) {
        console.error(`GitHub milestone ${argv.milestone} not found!`)
        //process.exit(1)
    } else {

    const issuesResp = await gh.paginate(gh.issues.listForRepo, {
        ...repo,
        milestone: milestone.number,
        state: 'closed',
        labels: includeLabels.join(','),
        per_page: 100
    })

    const pulls = issuesResp
        .filter(i => i.pull_request)
        .filter(i => !i.labels.some(l => excludeLabels.includes(l.name)))

    const issues = issuesResp
        .filter(i => !i.pull_request)
        .filter(i => !i.labels.some(l => !excludeLabels.includes(l.name)))

    const contributors = {}
    const reporters = {}

    for (const p of pulls) {
        if (contributors[p.user.login])
            continue

        const user = await gh.users.getByUsername({username: p.user.login})
        contributors[user.data.login] = user.data
    }

    for (const i of issues) {
        if (reporters[i.user.login])
            continue

        const user = await gh.users.getByUsername({username: i.user.login})
        reporters[user.data.login] = user.data
    }

    return {
        contributors,
        reporters,
        pulls,
        issues
    }
  }
}

main()
