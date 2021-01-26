const FS = require('fs')

const nunjucks = require('nunjucks')

const {Octokit} = require('@octokit/rest')
require('dotenv').config()
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const {RundeckVersion} = require('./version.js')

const argv = yargs(hideBin(process.argv)).argv

const template = FS.readFileSync('./docs/.vuepress/notes.md.nj')

const excludeLabels = ['release-notes/exclude']

async function main() {
    const context = {}
    context.core = await getRepoData({repo: 'rundeck', owner: 'rundeck'}, [])
    context.enterprise = await getRepoData({repo: 'rundeckpro', owner: 'rundeckpro'}, ['release-notes/include'])
    context.contributors = {...context.core.contributors, ...context.enterprise.contributors}
    context.reporters = {...context.core.reporters, ...context.enterprise.reporters}

    // FS.writeFileSync('notes.json', JSON.stringify(context))
    // const data = FS.readFileSync('notes.json')
    // const context = JSON.parse(data.toString())

    context.version = new RundeckVersion({versionString: argv.milestone})

    const notes = nunjucks.renderString(template.toString(), context)

    console.log(notes)

    const path = `./docs/history/${argv.milestone.split('.').slice(0,2).concat(['x']).join('_')}/version-${argv.milestone}.md`
    FS.writeFileSync(path, notes)
}

async function getRepoData(repo, includeLabels, excludeTags) {
    const gh = new Octokit({auth: argv.token || process.env.GH_API_TOKEN})

    const milestones = await gh.issues.listMilestones({...repo})
    const milestone = milestones.data.filter(m => m.title == argv.milestone)[0]

    const issuesResp = await gh.issues.listForRepo({...repo, milestone: milestone.number, state: 'closed', labels: includeLabels.join(',')})

    const pulls = issuesResp.data
        .filter(i => i.pull_request)
        .filter(i => !i.labels.some(l => excludeLabels.includes(l.name)))

    const issues = issuesResp.data
        .filter(i => !i.pull_request)
        .filter(i => !i.labels.some(l => !excludeLabels.includes(l.name)))

    const contributors = {}
    const reporters = {}

    for (const p of pulls) {
        const user = await gh.users.getByUsername({username: p.user.login})
        contributors[user.data.login] = user.data
    }

    for (const i of issues) {
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

main()