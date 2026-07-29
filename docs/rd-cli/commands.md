# Rundeck CLI - Commands

The `rd` command provides top level commands:

Available commands:

	   adhoc      - Run adhoc command or script on matching nodes
	   executions - List running executions, attach and follow their output, or kill them
	   jobs       - List and manage Jobs
	   keys       - Manage Keys via the Key Storage Facility.
	   metrics    - View metrics endpoints information.
	   nodes      - List and manage node resources
	   projects   - List and manage projects
	   retry      - Run a Job based on a specific execution.
	   run        - Run a Job
	   scheduler  - View scheduler information
	   system     - View system information
	   tokens     - Create, and manage tokens
	   users      - Manage user information
	   version    - Print version information

	Use "rd [command] help" to get help on any command.

## acl


See [rd acl](./rd-acl.md)

## adhoc

Run adhoc command or script on matching nodes.

	Usage: adhoc options -- COMMAND...
		[--quoted -Q] : Use quoted args
		[--extension -x value] : File extension to use for temporary script
		[--filter -F value] : A node filter string
		[--follow -f] : Follow execution output as it runs
		[--keepgoing -K] : Keep going when an error occurs
		[--outformat -% value] : Output format specifier for execution data. You can use "%key" where key is one of:id, project, description, argstring, permalink, href, status, job, job.*, user, serverUUID, dateStarted, dateEnded, successfulNodes, failedNodes, adhoc. E.g. "%id %href"
		[--progress -r] : Do not echo log text, just an indicator that output is being received.
		[--project -p /^[-_a-zA-Z0-9+][-\._a-zA-Z0-9+]*$/] : Project name
		[--quiet -q] : Echo no output. Combine with -f/--follow to wait silently until the execution completes. Useful for non-interactive scripts.
		[--restart -t] : Restart from the beginning
		[--script -s value] : Dispatch specified script file
		[--interpreter -i value] : Script interpreter string
		[--stdin -S] : Execute input read from STDIN
		[--tail -T value] : Number of lines to tail from the end, default: 1
		[--threadcount -C value] : Execute using COUNT threads
		[--url -u value] : Download a URL and dispatch it as a script
		[--verbose -v] : Extended verbose output

## executions

List running executions, attach and follow their output, or kill them.


	Available commands:

	   delete     - Delete an execution by ID
	   deletebulk - Find and delete executions in a project
	   follow     - Follow the output of an execution
	   info       - Get info about a single execution by ID
	   kill       - Attempt to kill an execution by ID
	   list       - List all running executions for a project
	   query      - Query previous executions for a project
	   metrics    - Obtain metrics over the result set of an execution query. (API v29 required)
	   state      - Get detail about the node and step state of an execution by ID  
	   deleteall  - Delete all executions for a job

### execution query

Query previous executions for a project.

	Usage: query options
		[--adhoconly -A] : Adhoc executions only
		[--autopage] : Automatically load more results in non-interactive mode if there are more paged results. (query command only)
		[--noninteractive] : Don't use interactive prompts to load more pages if there are more paged results (query command only)
		[--xgroup value] : Group or partial group path to exclude, "-" means top-level jobs only
		[--xgroupexact value] : Exact group path to exclude, "-" means top-level jobs only
		[--xnameexact value] : Exclude Exact Job Name Filter, exclude any name that is equal to this value
		[--xname value] : Exclude Job Name Filter, exclude any name that matches this value
		[--xjobids -x value...] : Job ID list to exclude
		[--xjobs -X value...] : List of Full job group and name to exclude.
		[--group -g value] : Group or partial group path to include, "-" means top-level jobs only
		[--groupexact -G value] : Exact group path to include, "-" means top-level jobs only
		[--jobonly -J] : Job executions only
		[--nameexact -N value] : Exact Job Name Filter, include any name that is equal to this value
		[--name -n value] : Job Name Filter, include any name that matches this value
		[--jobids -i value...] : Job ID list to include
		[--jobs -j value...] : List of Full job group and name to include.
		[--max -m value] : Maximum number of results to retrieve at once.
		[--offset -o value] : First result offset to receive.
		[--older -O value] : Get executions older than specified time. e.g. "3m" (3 months).
	Use: h,n,s,d,w,m,y (hour,minute,second,day,week,month,year)
		[--outformat -% value] : Output format specifier for execution data. You can use "%key" where key is one of:id, project, description, argstring, permalink, href, status, job, job.*, user, serverUUID, dateStarted, dateEnded, successfulNodes, failedNodes, adhoc. E.g. "%id %href"
		[--project -p value] : Project name
		[--recent -d value] : Get executions newer than specified time. e.g. "3m" (3 months).
	Use: h,n,s,d,w,m,y (hour,minute,second,day,week,month,year)
		[--status -s value] : Status filter, one of: running,succeeded,failed,aborted
		[--user -u value] : User filter
		[--verbose -v] : Extended verbose output

### execution metrics

Obtain metrics over the result set of an execution query. (API v29 required)

	Usage: metrics options
		[--jobids -i value...] : Job ID list to include
		[--outformat -% value] : Output format specifier for execution metrics data. You can use "%key" where key is one of: total,failed-with-retry,failed,succeeded,duration-avg,duration-min,duration-max. E.g. "%total %failed %succeeded"
		[--verbose -v] : Show verbose output

	Accepts the same project/job filter options as `executions query` (`--project`, `--group`, `--name`, `--status`, `--recent`, `--older`, etc.), applied to the set of executions the metrics are computed over.

## jobs

List and manage Jobs.


	Available commands:

       disable        - Disable execution for a job
       enable         - Enable execution for a job
       files          - List and manage File options for Jobs (API v19)
       info           - Get info about a Job by ID (API v18)
       list           - List jobs found in a project, or download Job definitions (-f)
       load           - Load Job definitions from a file in XML, YAML or JSON format
       purge          - Delete jobs matching the query parameters
       reschedule     - Enable schedule for a job
       unschedule     - Disable schedule for a job
       enablebulk     - Enable execution for a set of jobs
       disablebulk    - Disable execution for a set of jobs
       reschedulebulk - Enable schedule for a set of jobs
       unschedulebulk - Disable schedule for a set of jobs
       forecast   - Get Schedule Forecast for a Job by ID (API v31)

### jobs files

List and manage File options for Jobs.

	Available commands:

	   info - Get info about a Job input option file (API v19)
	   list - List files uploaded for a Job or Execution (API v19). Specify Job ID or Execution ID
	   load - Upload a file as input for a job option (API v19). Returns a unique key for the uploaded file, which can be used as the option value when running the job.

#### jobs files info

	Usage: info options
		--id -i value : File ID

#### jobs files list

	Usage: list options
		[--eid -e value] : Execution ID
		[--jobid -j value] : Job ID
		[--max -m value] : Maximum number of results to retrieve at once.
		[--offset -o value] : First result offset to receive.
		[--state -s value] : File state filter for listing Files for a Job only. (default:temp), one of: temp,expired,deleted,retained.

	One of `-j/--jobid` or `-e/--eid` is required. `-s/--state` is only valid with `-j/--jobid`.

#### jobs files load

	Usage: load options
		--file -f value : File path of the file to upload
		--id -i value : Job ID
		--option -o value : Option name

## keys

Manage Keys via the Key Storage Facility.
Specify the path using -p/--path.


	Available commands:

	   create - Create a new key entry
	   delete - Delete the key at the given path
	   get    - Get the contents of a public key
	   info   - Get metadata about the given path
	   list   - List the keys and directories at a given path, or at the root by default
	   update - Update an existing key entry

## metrics

View metrics endpoints information.

	Available commands:

	   data        - Prints the metrics data.
	   healthcheck - Print health check status information.
	   list        - Print system information and stats.
	   ping        - Returns a simple response.
	   threads     - Print system threads status information.

### metrics list

	Usage: list options
		[--verbose -v] : Extended verbose output

### metrics healthcheck

	Usage: healthcheck options
		[--fail -f] : Exit with unsuccessful status if unhealthy checks are found.
		[--unhealthy -u] : Show only checks with unhealthy status.

### metrics threads

	Usage: threads options
		[--verbose -v] : Extended verbose output

### metrics data

	Usage: data options
		[--all -a] : Show all metrics available, which is the default. This option supersedes all other selection options.
		[--counters -c] : Show all counter metrics available.
		[--gauges -g] : Show all gauge metrics available.
		[--histograms -h] : Show all histogram metrics available.
		[--meters -m] : Show all meter metrics available.
		[--summary -s] : Show only a summary of metric data selected.
		[--timers -t] : Show all timer metrics available.

## nodes

List and manage node resources.

List all nodes for a project.  You can use the -F/--filter to specify a node filter, or simply add the filter on the end of the command

	Usage: list [options] NODE FILTER...
		[--filter -F value] : A node filter string
		[--outformat -% value] : Output format specifier for Node info. You can use "%key" where key is one of:nodename, hostname, osFamily, osVersion, osArch, description, username, tags, or any attribute. E.g. "%nodename %tags"
		[--project -p value] : Project name
		[--verbose -v] : Extended verbose output

## plugins

Manage Rundeck plugins.

	Available commands:

	   install   - Install a plugin from your plugin repository into your Rundeck instance
	   list      - List plugins
	   uninstall - Uninstall a Rundeck plugin from your Rundeck instance
	   upload    - Upload a Rundeck plugin to your plugin repository

### plugins upload

	Usage: upload options
		--file -f value : Path to Rundeck 2.0 plugin to install in your repository
		--repository -r value : Target name of repository to upload plugin into.

### plugins install

	Usage: install options
		--id -i value : Id of the plugin you want to install
		--repository -r value : Repository name that contains the plugin.
		[--version -v value] : (Optional) Specific version of the plugin you want to install

### plugins uninstall

	Usage: uninstall options
		--id -i value : Id of the plugin you want to uninstall

## projects

List and manage projects.

    Available commands:

       acls      - Manage Project ACLs
       archives  - Project Archives import and export
       configure - Manage Project configuration
       create    - Create a project
       delete    - Delete a project
       info      - Get info about a project
       list      - List all projects
       readme    - Manage Project readme
       scm       - Manage Project SCM

### projects acls

Manage Project ACLs.

	Available commands:

	   create - Create a project ACL definition
	   delete - Delete a project ACL definition
	   get    - Get a project ACL definition
	   list   - List project ACLs
	   update - Update a project ACL definition

#### projects acls list

	Usage: list options
		[--outformat -% value] : Output format specifier for ACL info. You can use "%key" where key is one of:name, type, href. E.g. "%name %href"
		--project -p value : Project name
		[--verbose -v] : Extended verbose output

#### projects acls get

	Usage: get options
		--name -n value : name of the aclpolicy file
		--project -p value : Project name

#### projects acls create

	Usage: create options
		--file -f value : ACLPolicy file to upload
		--name -n value : name of the aclpolicy file
		--project -p value : Project name

#### projects acls update

Update an existing project ACL definition.

	Usage: update options
		--file -f value : ACLPolicy file to upload
		--name -n value : name of the aclpolicy file
		--project -p value : Project name

#### projects acls delete

	Usage: delete options
		--name -n value : name of the aclpolicy file
		--project -p value : Project name

### projects archives

Project Archives import and export

    Available commands:

       export              - Export a project archive
       import              - Import a project archive
       async-import-status - Get the status of an ongoing asynchronous import process.

### projects archives export

Export a project archive.

	Usage: export options
		[--execids -e value...] : List of execution IDs. Exports only those ids.
		--file -f value : Output file path
		[--include -i value...] : List of archive contents to include. [all,jobs,executions,configs,readmes,acls,scm]. Default: all. (API v19 required for other options).
		--project -p /^[-_a-zA-Z0-9+][-\._a-zA-Z0-9+]*$/ : Project name

### projects archives import

Import a project archive.

	Usage: import options
		[--async-import-enabled -i] : Enables asynchronous import process for the uploaded project file.
		[--component -I value...] : Enable named import components, such as tours-manager (enterprise). See <https://docs.rundeck.com/docs/api/rundeck-api.html#project-archive-import>
		--file -f value : Import file path
		[--include value...] : List of archive contents to import. [executions,config,acl,scm,webhooks,nodeSources]. Default: executions. (webhooks: requires API v34. nodeSources: requires API v38).
		[--include-acl -a] : Include ACLs in import, default: false
		[--include-config -c] : Include project configuration in import, default: false
		[--include-node-sources -n] : Include node resources in import, default: false (api v38 required)
		[--include-scm -s] : Include SCM configuration in import, default: false (api v28 required)
		[--include-webhooks -w] : Include Webhooks in import, default: false (api v34 required)
		[-x] : Do not include executions in import. Default: do include executions in import.
		[--options -O value...] : Set options for enabled components, in the form name.key=value
		--project -p /^[-_a-zA-Z0-9+][-\._a-zA-Z0-9+]*$/ : Project name
		[-r] : Remove Job UUIDs in imported jobs. Default: preserve job UUIDs.
		[--regenerate-tokens -t] : regenerate the auth tokens associated with the webhook in import, default: false (api v34 required)
		[--remove-webhooks-uuids -R] : Remove Webhooks UUIDs in import. Default: preserve webhooks UUIDs. (api v47 required)
		[--strict] : Return non-zero exit status if any imported item had an error. Default: only job import errors are treated as failures.

	`--include` selects the archive contents to import using the same value syntax as `projects archives export`'s `--include` option. When `--include` is not specified, the individual `--include-*`/`-x` flags above are used instead, for backwards compatibility. If both are set, `--include` takes precedence.

### projects archives async-import-status

Get the status of an ongoing asynchronous import process.

	Usage: async-import-status options
		[--project -p value] : Project name

### projects scm

Manage Project SCM

	Available commands:

	   config      - Get SCM Config for a Project
	   disable     - Disable plugin
	   enable      - Enable plugin
	   inputs      - Get SCM action inputs
	   perform     - Perform SCM action
	   plugins     - List SCM plugins
	   setup       - Setup SCM Config for a Project
	   setupinputs - Get SCM Setup inputs
	   status      - Get SCM Status for a Project

### projects configure

Manage Project configuration

    Available commands:

       delete - Remove configuration properties for a project
       get    - Get all configuration properties for a project
       set    - Overwrite all configuration properties for a project
       update - Modify configuration properties for a project

### projects readme

Manage Project readme.md/motd.md.

	Available commands:

	   delete - Delete project readme/motd file
	   get    - Get project readme/motd file
	   put    - Set project readme/motd file

#### projects readme get

	Usage: get options
		[--motd -m] : Choose the 'motd.md' file. If unset, choose 'readme.md'.
		[--project -p value] : Project name

#### projects readme put

	Usage: put options
		[--file -f value] : Path to a file to read for readme/motd contents.
		[--motd -m] : Choose the 'motd.md' file. If unset, choose 'readme.md'.
		[--project -p value] : Project name
		[--text -t value] : Text to use for readme/motd contents.

	One of `-f/--file` or `-t/--text` is required.

#### projects readme delete

	Usage: delete options
		[--motd -m] : Choose the 'motd.md' file. If unset, choose 'readme.md'.
		[--project -p value] : Project name

## retry

Run a Job based on a specific execution. (API v24 required)

	Usage: retry options -- -OPT "VAL" -OPT2 "VAL"...
		[--eid -e value] : Execution ID to retry on failed nodes.
		[--failedNodes -F] : Run only on failed nodes (default=true).
		[--loglevel -l /(verbose|info|warning|error)/] : Run the command using the specified LEVEL. LEVEL can be verbose, info, warning, error.
		[--outformat -% value] : Output format specifier for execution logs. You can use "%key" where key is one of:time,level,log,user,command,node. E.g. "%user@%node/%level: %log"
		[--raw] : Treat option values as raw text, so that '-opt @value' is sent literally
		[--user -u value] : A username to run the job as, (runAs access required).
		[--verbose -v] : Extended verbose output

## run

Run a Job.

    Usage: run [options] -- -OPT "VAL" -OPT2 "VAL"...
         [--filter -F value] : A node filter string
         [--follow -f] : Follow execution output as it runs
         [--id -i value] : Run the Job with this IDENTIFIER
         [--job -j value] : Job job (group and name). Run a Job specified by Job name and group. eg: 'group/name'.
         [--loglevel -l /(debug|verbose|info|warning|error)/] : Run the command using the specified LEVEL. LEVEL can be debug, verbose, info, warning, error.
         [--outformat -% value] : Output format specifier for execution data. You can use "%key" where key is one of:id, project, description, argstring, permalink, href, status, job, job.*, user, serverUUID, dateStarted, dateEnded, successfulNodes, failedNodes, adhoc. E.g. "%id %href"
         [--progress -r] : Do not echo log text, just an indicator that output is being received.
         [--project -p value] : Project name
         [--quiet -q] : Echo no output. Combine with -f/--follow to wait silently until the execution completes. Useful for non-interactive scripts.
         [--raw] : Treat option values as raw text, so that '-opt @value' is sent literally
         [--restart -t] : Restart from the beginning
         [--at -@ value] : Run the job at the specified date/time. ISO8601 format (yyyy-MM-dd'T'HH:mm:ssXX)
         [--delay -d /(\d+[smhdwMY]\s*)+/] : Run the job at a certain time from now. Format: ##[smhdwMY] where ## is an integer and the units are seconds, minutes, hours, days, weeks, Months, Years. Can combine units, e.g. "2h30m", "20m30s"
         [--tail -T value] : Number of lines to tail from the end, default: 1
         [--user -u value] : A username to run the job as, (runAs access required).

## scheduler

View scheduler information

    Available commands:

       jobs     - List jobs for the current target server, or a specified server
       takeover - Tell a Rundeck server in cluster mode to claim all scheduled jobs from another cluster server

### scheduler jobs

List jobs for the current target server, or a specified server.

	Usage: jobs [options]
		[--uuid -u value] : Server UUID to query, or blank to select the target server

## system

View system information


	Available commands:

	   acls - Manage System ACLs
	   info - Print system information and stats
	   mode - Manage Execution Mode

### system acls

Manage System ACLs


	Available commands:

	   create - Create a system ACL definition
	   delete - Delete a system ACL definition
	   get    - get a system ACL definition
	   list   - list system acls
	   update - Update an existing system ACL definition

### system info

Print system information and stats.

### system mode

Manage Execution Mode.


	Available commands:

	   active  - Set execution mode Active
	   info    - Show execution mode
	   passive - Set execution mode Passive

## tokens

Create, and manage tokens


    Available commands:

       create - Create a token for a user
       delete - Delete a token
       info   - Get token info for an ID (API v19+)
       list   - List tokens for a user

## users

Manage user information


    Available commands:

       edit  - Edit information of the same user or another if 'user' is specified
       info  - Get information of the same user or from another if 'user' is specified
       list  - Get the list of users
       roles - Get the list of roles for the current user. (API v30 required)

## version

Print version information.

	Usage: version options
		[--verbose -v] : Extended verbose output

	With `-v/--verbose`, also prints the git commit, branch, build date, minimum supported API version, and user agent string.
