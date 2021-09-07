const FS = require('fs')
const Path = require('path')

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
    context.docs = await getRepoData({repo: 'docs', owner: 'rundeck'}, [])
    context.systemreport = await getRepoData({repo: 'enterprise-system-report', owner: 'rundeckpro'}, ['release-notes/include'])
    context.schedules = await getRepoData({repo: 'enterprise-schedules', owner: 'rundeckpro'}, ['release-notes/include'])
    context.calendars = await getRepoData({repo: 'enterprise-calendars', owner: 'rundeckpro'}, ['release-notes/include'])
    context.tours = await getRepoData({repo: 'enterprise-tour-manager', owner: 'rundeckpro'}, ['release-notes/include'])
    context.contributors = {...context.core.contributors, ...context.enterprise.contributors, ...context.docs.contributors, ...context.systemreport.contributors, ...context.schedules.contributors, ...context.calendars.contributors, ...context.tours.contributors}
    //context.reporters = {...context.core.reporters, ...context.enterprise.reporters}

    // FS.writeFileSync('notes.json', JSON.stringify(context))
    // const data = FS.readFileSync('notes.json')
    // const context = JSON.parse(data.toString())

    context.version = new RundeckVersion({versionString: argv.milestone})

    const notes = nunjucks.renderString(template.toString(), context)

    console.log(notes)

    const pathBase = `./docs/history/${argv.milestone.split('.').slice(0,2).concat(['x']).join('_')}/`

    let path

    if (argv.draft) {
        path = Path.join(pathBase, 'draft.md')
    }
    else {
        path = Path.join(pathBase, `version-${argv.milestone}.md`)
    }

    FS.writeFileSync(path, notes)
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
