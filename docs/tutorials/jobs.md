# Jobs

Jobs are a convenient method to establish a library of routine
procedures. By their nature, a Job encapsulates a process as a
logically named interface. Jobs can begin as a single step workflow
that calls an inline shell script but evolve into a multi-step
workflow, that calls specialized steps.
A job can also call other jobs as steps in its
workflow. Using this approach one can view each Job as a reusable
building block upon which more complex processes can be built.

The administrator decides Jobs can be used to encapsulate
the restart procedures. Both developers and
administrators can collaborate on the job definitions, their evolution and
maintenance.

## Job structure

The overall goal is to provide a single restart procedure, for the sake of reusability, it
might be preferred to break each step of the process into separate jobs.

Using this approach the administrator imagines the following jobs:

- start: call the start procedure to start the web service.
- stop: call the stop procedure to stop the web service.
- status: call the status procedure to stop the web service.
- Restart: call the stop, start, and status jobs in succession.

Since the restart procedure is the primary focus, it is capitalized
for distinction.

The extra complexity from defining a job for every individual step can
pay off later, if those steps can be recombined with future jobs to
serve later management needs. How far a process is decomposed into
individual jobs is a judgement balancing maintenance requirements
and the desire for job reuse.

### Job grouping

It is helpful to use job groups and have a convention for naming them.
A good convention assists others with a navigation scheme that
helps them remember and find the desired procedure. Job groups
also help simplify access control policy.

The administrator chooses to create a top level group named
"web" where the web restart related jobs will be organized.

    web/
    |-- Restart
    |-- start
    |-- status
    `-- stop

When opening the "anvils" project users will see the jobs
grouped below web as shown in the screenshot below.

![Anvils job group](~@assets/img/fig0604.png)

## Scripts

Sets of scripts are already in use to manage the startup and shutdown
procedures. Rather than force the issue as to
which one is correct or superior, the administrator focuses on
creating a skeleton to more easily present how scripts can be
encapsulated by the job workflow. After demonstrating this simple
framework, the administrator can discuss how to incorporate the best
of script implementations from the ops and dev teams into the Job definitions.

For the skeleton, the administrator creates placeholder scripts
that merely echo their intent but define the essential arguments they will need.
The scripts - start, status and stop - represent the logical steps of
the restart process.

:::details Click to see start script
```bash .numberLines
#!/bin/bash
#/ usage: start ?dir?
set -eu
[[ $# != 1 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
mkdir -p "$DIR"
echo $$ > "$DIR/pid"
echo "- Web started (pid=$$)"
```
::::

:::details Click to see status script
```bash .numberLines
#!/bin/bash
#/ usage: status ?dir?
set -eu
[[ $# != 1 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
[[ ! -f "$DIR/pid" ]] && { echo DOWN; exit 1; }
PID=$(cat "$DIR/pid")
[[ -z "$PID" ]] && { echo "DOWN"; exit 1; } || { echo "- RUNNING (pid=$PID)"; }
```
:::

:::details Click to see stop script
```bash .numberLines
#!/bin/bash
#/ usage: stop ?dir? ?method?
set -eu
[[ $# != 2 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
METHOD=$2
if [[ -f "$DIR/pid" ]]
then
  pid=$(cat "$DIR/pid")
  rm -f "$DIR/pid"; #approximates a kill process
  exit_code=$?
  echo "- Web stopped (pid=${pid}) using method: $METHOD"
fi
exit ${exit_code:-0}
```
:::

Because either the normal or force can be specified for the
"method" option, the Jobs will need to pass the user's choice as an
argument to the script.

There is no script for the restart process itself since that will be
defined as a Job workflow.

## Job options

To support specifying parameters to the scripts,
the the three jobs will declare an option named "dir"
to specify the web service install directory. The stop
script will need an additional option, "method" to specify `normal` or `force` choices.

A benefit of job options is the ability to display a
menu of choices to the user running the job. Once chosen, the value
selected by the menu is then passed to the script.
Options can also have default values or lists of choices to help
the user choose between routine inputs.

### Allowed option values

An option can be defined to only allow values from a specified
list. This places safe guards on how a Job can be run by limiting
choices to those the scripts can safely handle.

The administrator takes advantage of this by limiting the "method" option
values to just "normal" or "force" choices.

The screenshot below contains the Option edit form for the "method" option.
The form includes elements to define description and default
value, as well as, Allowed Values and Restrictions.

![Option editor for method](~@assets/img/fig0605.png)

Allowed values can be specified as a comma separated list as seen above but
can also be requested from an external source using a "remote URL".

Option choices can be controlled using the "Enforced from values"
restriction. When set "true", the Rundeck UI will only present a
popup menu. If set "false", a text field will also be presented. Use
the "Match Regular Expression" form to validate the input option.

Here's a screenshot of how Rundeck will display the menu choices:

![Option menu for method](~@assets/img/fig0606.png)

### Script access to option data

Option values can be passed to scripts as an argument or referenced
inside the script using a named token. For example, the values for the
"method" an "dir" options can be accessed in one of several ways:

Value referenced as an environment variable. Each option name is upcased
and prefixed with "RD*OPTION*":

- Bash: `$RD_OPTION_METHOD`, `$RD_OPTION_DIR`

Value passed in the argument vector to the executed script or command
via the `scriptargs` tag.

- Commandline Arguments: `${option.method}`, `${option.dir}`

Value represented as a named token inside the script and replaced
before execution:

- Script Content: `@option.method@`, `@option.dir@`

## Job definition

With an understanding of the scripts and the options needed to
control the restart operation, the final step is to compose the Job
definitions.

As with the Node Definitions the Tutorial will walk through the GUI setup
of the first job, then provide an import for the remaining jobs.

Click the *Job Actions* Button and select *New Job*.  
Use the following sections to configure the job.

#### Details Tab
  * Job Name: `stop`  
  * Group: `web`  
  * Description: `the web stop procedure`
  ![Workflow Details](~@assets/img/tutorial-wf-details.png)

#### Workflow Tab

  * Click *Add an Option*
    * Name: `dir`
    * Option Label: `Directory`
    * Default Value: `$HOME/anvils`
    * Required: `Yes`
    * *All other values can remain defaults*
    * Click **Save** on the Option Box
  * Add another Option
    * Name: `method`
    * Allowed Values: Select List and enter the following in the box `normal,force`
    * Restrictions: `Enforced from Allowed Values`
    * Required: `Yes`
    * *All other values can remain defaults*
    * Click **Save** on the Option Box
  * In the "Add A Step" section select `Script` on the Node Steps tab.
    * Paste the following code from above into the script box:
    ```bash .numberLines
    #!/bin/bash
    #/ usage: stop ?dir? ?method?
    set -eu
    [[ $# != 2 ]] && {
      grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
    }
    DIR=$1
    METHOD=$2
    if [[ -f "$DIR/pid" ]]
    then
            pid=$(cat "$DIR/pid")
            rm -f "$DIR/pid"; #approximates a kill process
            exit_code=$?
            echo "- Web stopped (pid=${pid}) using method: $METHOD"
    fi
    exit ${exit_code:-0}
    ```
    * Arguments: `${option.method}`
    * Click Save

#### Nodes Tab
  * Select the option for: `Dispatch to Nodes`  
  * Node Filter: `tags: www`  
  * Editable Filter: `Yes`
  ![Node Details](~@assets/img/tutorial-wf-nodes.png)

#### Save the Job
Click the save button to save the **stop** job.

### Additional Jobs
While each subsequent job could be defined graphically in Rundeck, provided
below is a method to import the other jobs directly.

::: details Click and copy/save this XML to a file on your local machine
``` xml .numberLines
<joblist>
  <job>
    <context>
      <options preserveOrder='true'>
        <option name='dir' required='true' value='$HOME/anvils'>
          <label>Directory</label>
        </option>
        <option enforcedvalues='true' name='method' required='true' values='normal,force' valuesListDelimiter=',' />
      </options>
    </context>
    <defaultTab>nodes</defaultTab>
    <description>the web stop procedure</description>
    <executionEnabled>true</executionEnabled>
    <group>web</group>
    <name>stop</name>
    <nodeFilterEditable>true</nodeFilterEditable>
    <nodefilters>
      <filter>tags: www</filter>
    </nodefilters>
    <nodesSelectedByDefault>true</nodesSelectedByDefault>
    <scheduleEnabled>true</scheduleEnabled>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <script><![CDATA[#!/bin/bash
#/ usage: stop ?dir? ?method?
set -eu
[[ $# != 2 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
METHOD=$2
if [[ -f "$DIR/pid" ]]
then
        pid=$(cat "$DIR/pid")
        rm -f "$DIR/pid"; #approximates a kill process
        exit_code=$?
        echo "- Web stopped (pid=${pid}) using method: $METHOD"
fi
exit ${exit_code:-0}]]></script>
        <scriptargs>${option.method}</scriptargs>
      </command>
    </sequence>
  </job>
  <job>
    <context>
      <options preserveOrder='true'>
        <option name='dir' required='true' value='$HOME/anvils'>
          <label>Directory</label>
        </option>
      </options>
    </context>
    <description>the web start procedure</description>
    <executionEnabled>true</executionEnabled>
    <group>web</group>
    <loglevel>INFO</loglevel>
    <name>start</name>
    <nodeFilterEditable>true</nodeFilterEditable>
    <nodefilters>
      <filter>tags: www</filter>
    </nodefilters>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <script><![CDATA[#!/bin/bash
#/ usage: start ?dir?
set -eu
[[ $# != 1 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
mkdir -p "$DIR"
echo $$ > "$DIR/pid"
echo "- Web started (pid=$$)"]]></script>
        <scriptargs />
      </command>
    </sequence>
  </job>
  <job>
    <context>
      <options preserveOrder='true'>
        <option name='dir' required='true' value='$HOME/anvils' />
      </options>
    </context>
    <defaultTab>nodes</defaultTab>
    <description>the web status procedure</description>
    <executionEnabled>true</executionEnabled>
    <group>web</group>
    <name>status</name>
    <nodefilters>
      <filter>tags: www</filter>
    </nodefilters>
    <nodesSelectedByDefault>true</nodesSelectedByDefault>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <script><![CDATA[#!/bin/bash
#/ usage: status ?dir?
set -eu
[[ $# != 1 ]] && {
  grep '^#/ usage:' <"$0" | cut -c4- >&2 ; exit 2;
}
DIR=$1
[[ ! -f "$DIR/pid" ]] && { echo DOWN; exit 1; }
PID=$(cat "$DIR/pid")
[[ -z "$PID" ]] && { echo "DOWN"; exit 1; } || { echo "- RUNNING (pid=$PID)"; }
]]></script>
        <scriptargs />
      </command>
    </sequence>
  </job>
</joblist>

```
:::

- On the Jobs Page click the Job Action button and select Upload Definition:
![Upload Job Definition](~@assets/img/tutorial-upload-job-def.png)  

- Click _Choose File_ and select the file the the text from above.
- Click Upload.

### Descriptions of the Jobs included

#### Stop Job
Defines Job, /web/stop, and executes the shell script to
Nodes tagged "web". Using the `scriptargs` tag, the shell
script is passed a single argument, `${option.method}`,
containing the value chosen in the Job run form.

#### Start Job
Defines Job, /web/start, that also executes a shell script to Nodes tagged "web".

#### Status Job
Defines Job, /web/status, that also executes a shell script to
Nodes tagged "web".

::: tip
These job definitions are defined using an XML file conforming to the
[job-xml](/manual/document-format-reference/job-v20.md) document format.
:::

::: tip
These examples demonstrate Jobs with inline scripts. This is for the purpose of
providing a simple and transparent example. You may rightly consider other
approaches such as external script files or custom steps to further encapsulate
the code from the job definition.
:::

### Restart Job composition

The final job definition declares the "Restart" job which merely
wraps calls to the stop, start, status jobs already defined.
This is done by declaring a sequence of Job calls to the three jobs we already created.

:::details Click and copy/save the restart job XML to a file on your local machine
```xml .numberLines
<joblist>
  <job>
    <context>
      <options preserveOrder='true'>
        <option name='dir' required='true' value='$HOME/anvils' />
        <option enforcedvalues='true' name='method' values='normal,force' valuesListDelimiter=',' />
      </options>
    </context>
    <defaultTab>nodes</defaultTab>
    <description>restart the web server</description>
    <executionEnabled>true</executionEnabled>
    <group>web</group>
    <name>Restart</name>
    <scheduleEnabled>true</scheduleEnabled>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <jobref group='web' name='stop'>
          <arg line='-dir ${option.dir} -method ${option.method}' />
          <useName>true</useName>
        </jobref>
      </command>
      <command>
        <jobref group='web' name='start'>
          <arg line='-dir ${option.dir}' />
          <useName>true</useName>
        </jobref>
      </command>
      <command>
        <jobref group='web' name='status'>
          <arg line='-dir ${option.dir}' />
          <useName>true</useName>
        </jobref>
      </command>
    </sequence>
  </job>
</joblist>
```
:::

Note that we don't define a `nodefilters` or `dispatch` section for Restart, because we
only want this sequence to execute **once**, on the server node. The Job
references will each be called once, and the "start", "stop" and "status" Jobs will
each be dispatched to the nodes they define.

## Running the job

### Run using the GUI

The Jobs could then be run from the Rundeck graphical console by going to the
"Jobs" page. From there, navigate to the "web" job group to
display the four stored Jobs.

Clicking the "Run" button for the Restart job, will display the
options selection page. The menu for the "method" option displays the
two choices: "normal" and "force".
No other choices can be made, nor a textfield for free form entry,
because the "method" option was defined with the restriction "enforced from allowed values".

![Restart run page](~@assets/img/fig0608.png)

::: tip
Note that the jobs will not execute successfully at this time.  The tutorial is just walking through a theoretical scenario.
:::
