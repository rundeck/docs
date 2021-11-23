# Job Options

Rundeck Jobs can be configured to prompt a user for input by defining
one or more named _options_. An _option_ models a named parameter that
can be required or optional and include a range of choices that will
be presented to the user when the Job is run.

Users supply options by typing in a value or selecting from a menu
of choices. A validation pattern ensures input complies to the
option requirement. Once chosen, the value chosen for the option is
accessible to the commands called by the Job.

Option choices can be modeled as a static set or from a dynamic
source. Static choices can be modeled as a comma separated list in the
job definition. When option values must be
dynamic, the Job can be defined to use a URL to retrieve option data
from an external source. Enabling Jobs to access external sources via
URL opens the door to integrating Rundeck with other tools and
incorporating their data into Job workflows.

## Prompting the user

The obvious effect from defining Job options is their appearance to
the user running the Job. Users will be presented a page called "Choose
Execution Options..." where input and menu choices must be configured.

Command line users executing Jobs via the `run` shell
tool also will specify options as an argument string.

::: warning
The `run` command does not prompt the user for required options so you must specify them directly.
:::

It is worth spending a moment to consider how options become
part of the user interface to Jobs and give some thought to this next
level of procedure formalization.

- Naming and description convention: Visualize how the user will read
  the option name and judge its purpose from the description you supply.
- Required options: Making an option required means the Job will fail
  if a user does not specify a non-blank value. In other words, a blank or missing value is not allowed for the option.
- Input restrictions and validation: If you need to make the option
  value be somewhat open ended consider how you can create
  safeguards to control their choice.

## Input Types

Option Input Types define how the option is presented in the GUI, and how it is used when the Job executes.

Input types:

- "Plain" - a normal option which is shown in clear text
- "Secure" - a secure option which is obscured at user input time, and the value of which is not stored in the database. See [secure-options](#secure-options).
- "Secure Remote Authentication" - a secure option which is used only for remote authentication and is not exposed in scripts or commands. See [secure-remote-authentication-options](#secure-remote-authentication-options).

## Options editor

Options can be created for any stored Job. The Job edit page contains
an area displaying a summary to existing options and a link to add new
ones or edit existing ones.

![Add option link](~@assets/img/fig0501.png)

The option summary shows each option and its default value if it defines
them.

Clicking the "edit" link opens the options editor.

![Option editor](~@assets/img/fig0503.png)

The options editor displays an expanded summary for each defined
option. Each option is listed with its usage summary,
description, values list and any restrictions. Pressing the "Add an
option" link will open a form to define a new parameter. Pressing the
"Close" link will collapse the options editor and return back to the
summary view.

Moving the mouse over any row in the options editor reveals links to
delete or edit the highlighted option. Pressing the remove icon will
display a prompt confirming you want to delete that option from the Job.
Clicking the "edit" link opens a new form that lets you modify all
aspects of that option.

Options can also be defined as part of a job definition and later
loaded to the Rundeck server. See [job-xml](/manual/document-format-reference/job-v20.md) and [job-yaml](/manual/document-format-reference/job-yaml-v12.md) and
[rd jobs](https://rundeck.github.io/rundeck-cli/commands/#jobs) pages if you prefer using an textual Job definition.

## Defining an option

**Text Options**

New options can be defined by pressing the "Add an option" link while
existing ones can be changed by pressing their "edit" link.

Choose "Text" from the Option Type:

![Option edit form](~@assets/img/fig0502.png)

The option definition form is organized into several areas:

Identification

: Here you provide the option's name and description. The name
becomes part of acceptable arguments to the Job while the
description will be provided as help text to users running the Job.

     The Default Value will be pre-selected in the GUI when the option is presented.

Input Type

: Choose between "Plain", "Date", "Secure" and "Secure Remote Authentication". For input types other than "Plain", the multi-valued option will be disabled.

Date Format

: If "Date" Input Type is chosen, you can enter a date format to use when selecting the date
in the user interface. Using the [momentjs format](https://momentjs.com/docs/#/displaying/format/).

Default Value

: A Default Value will automatically be set for the option if it is not otherwise specified by the user, even if not specified among the arguments when executing a job via the command-line or API. Note that a blank value can be specified via the command-line or API, which will override the use of the Default Value.

Allowed values

: Allowed values provide a model of possible choices.
This can contain a static list of values or a URL to a server
providing option data. Values can be specified as a comma
separated list as seen above but can also be requested from an
external source using a "remote URL".

Restrictions

: Defines criteria on which input to accept or present. Option
choices can be controlled using the "Enforced from values"
restriction. When set "true", Rundeck will only present a
popup menu. If set "false", a text field will also be presented.
Enter a regular expression in the "Match Regular Expression"
field the Job will evaluate when run.

Requirement

: Indicates if the Job can only run if a non-blank value is provided for
that Option. Choose "No" to indicate that a blank value is allowed, and
choose "Yes" to indicate that a blank value is not allowed.

     If a Default Value is set, then it will be used when no value is provided, unless a blank value is allowed and is explicitly specified.

![Option Multivalued Form](~@assets/img/fig-option-multival.png)

Multi-valued

: Defines if the user input can consist of multiple values. Choosing "No" states that only a single value can chosen as input. Choosing "Yes" states that the user may select multiple input values from the Allowed values and/or enter multiple values of their own.

Delimiter

: The delimiter string will be used to separate the multiple values when the Job is run.

Select All Values by Default

: If checked, and no default value(s) are specified, all of the remote or local values will be selected by default.

Once satisfied with the option definition, press the "Save" button to
add it to the Job definition. Pressing the "Cancel" button will
dismiss the changes and close the form.

Usage (see below)

![Option Usage](~@assets/img/fig-option-usage.png)

### Option timestamp variable

You can use the string `${DATE:format}` as a job option value (either as default value or as input by the user), which will be converted when the job/command is executed.
This variable also allows you to add or remove days as you can see below.

`${DATE:format}` current date in format used by the Java [SimpleDateFormatter](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)

`${DATE+2:format}` two days from now

`${DATE-2:format}` two days ago


### File Option Type

Choose "File" from the Option Type:

![File Option Edit Form](~@assets/img/fig-newoption-file.png)

The Option Name and Description can be entered.

Required

: Choose whether to require the option have a value.

File option usage:

The `option.NAME` variable will contain a unique ID identifying the uploaded file.

`file.NAME` will be the local file path.

`file.NAME.filename` will be the original file name (if available).

`file.NAME.sha` will be the SHA256 hash of the file.

## Script usage

Option values can be passed to scripts as an argument or referenced
inside the script via a named token. Each option value is defined in the Options context variables as `option.NAME`.

See the [Context Variables](/manual/job-workflows.md#context-variables) Section.

**Example:**

A Job named "hello" and has an option named "message".

The "hello" Job option signature would be: `-message <>`.

![Option usage](~@assets/img/fig0504.png)

The arguments passed to the script are defined as `${option.message}`.

Here's the content of this simple script that shows the various
forms to access the value of the "message" option.

```bash .numberLines
#!/bin/sh
echo envvar=$RD_OPTION_MESSAGE ;# access message as environment variable.
echo args=$1                   ;# read value passed into argument vector
echo message=@option.message@  ;# access message via replacement token syntax
```

When the user runs the "hello" job they will be prompted for the
"message" value.

![Option entered](~@assets/img/fig0505.png)

Let's assume they chose the word "howdy" in response.
The output of the Job will be:

```bash
envar=howdy
args=howdy
message=howdy
```

If you define the option to be _Required_, then the Job will fail to run unless the user supplies a value that is not blank.

If you define the option to not be _Required_, then the option value is allowed to be blank, and specifying a blank value would result in:

```bash
envar=
args=
message=
```

You can use the _Default Value_ of an option to provide a value in the case where the user doesn't specify it. In the GUI, the _Default Value_ will automatically be presented in the Job Execution page. From the CLI or API, leaving off a `-option` argument to a job will use the default value.

You can also handle default values within a script, if your option doesn't specify one, or the user specifies a blank value for the option:

**Environment variable:**

As a precaution you might test existence for the variable and
perhaps set a default value.
To test its existence you might use:

```bash
test -s "$RD_OPTION_NAME"
```

You might also use a Bash feature that tests and defaults it to a
value:

```bash
${RD_OPTION_NAME:=mydefault}
```

**Replacement token:**

If the option is blank or unset the token will be replaced with a blank
string. You might write your script a bit more defensively and
change the implementation like so:

```bash
message="@option.message@"
if [ -z "$message" ]
then
   message=mydefault
fi
```

::: warning
The replacement token syntax is only supported in inline script steps (ie, not script file or command steps).
:::

**Escaping Replacement Token:**

If you want to use the `@` char in a way that looks like a replacement token
you can escape it using `@@`, i.e. doubling it.

```bash
# escaping of @ sign to avoid expansion before the @option.domain@
email="user@@mail.@option.domain@"

# If the first @ sign comes right before the token, use three @
email="user@@@option.domain@"
```

In this example, the `@@@option.domain@` will result in `@mydomain`,
and `@@mail.@option.domain2@` will result in `@mail.mydomain`.

If you do not escape the `@` in the second example, then `@mail.@`
will be expanded to a missing value, resulting in a blank string.

You do not need to escape the `@` sign in all cases, only when it might look
like an expansion token. If there are any whitespace characters
before the next `@` sign, it does not need to be escaped:

```bash
# first @ sign does not need to be escaped
text="Hi user@somewhere, @option.greeting@!"
```

## Escaped values

When the arguments to script or the contents of a Command execution string are
evaluated, embedded property references like `${option.name}` are replaced by
the values entered by a user.

To prevent any user input from including shell-special characters (accidentally or maliciously), any argument which has embedded references will be quoted for the shell.

You should also be careful in how arguments to scripts are used within a script.

For example, if you have a Shell script step with argument string `${option.message}`, and script:

```bash
#!/bin/bash

echo $1
```

Then this script will partially expand the `${option.message}` value a second time, even though it was correctly quoted to pass to your script.

You should do something like this instead:

```bash
#!/bin/bash

echo "$1"
```

Which allows the shell will correctly handle the input value by quoting it.

### Using non-escaped values


If the job needs to provide an option in its raw, unescaped form it is possible to use the `unquotedoption` context lookup key instead of `option`.

For example:
The option `${option.name}` value could be accessed without any escaping by referencing it as `${unquotedoption.name}` instead.  
In a script similarly use `@unquotedoption.name@` instead of `@option.name@`.

::: warning
Using non-escaped values can expose the environment to security risks like Command injection (but not limited to command injection!).
:::

>  Consider the following example where a user is allowed to supply a list of directories to an hypothetical backup job. Let's also suppose the job processed the directory list with `tar -zcvf /tmp/archive.tgz @unquotedoption.targetdirs@`. Then a malicious user could trick the job into running an extra command by supplying this value for:
`targetdirs`: `/etc /home /var/lib/redis; rm -rf /`.  
Then, depending on the user privileges, the script will happily nuke as many directories
and files as it can on the target node.  
You can limit the risk by adopting appropriate regex masks, coding the script
defensively, and using the least privilege principle.

## Secure Options

Options can be marked as Secure, to show a password prompt in the GUI, instead of a normal text field or drop down menu. Secure option values are not stored with the Execution as are the other option values.

There are two types of Secure options:

- Secure - these option values are exposed in scripts and commands.
- Secure Remote Authentication - these option values _are not_ exposed in scripts and commands, and are only used by Node Executors to authenticate to Nodes and execute commands.

Secure Options do not support Multi-valued input.

Secure Options cannot be used as authentication input to Node Executors, you must use a Secure Remote Authentication option described below.

**Important Note**

"Secure" option values are not stored in the Rundeck database when the Job is executed, but the value that is entered
is exposed to use in scripts and commands. Make sure you acknowledge these security implications before using them. Secure options are available for use in scripts and command like any other option value:

- as plaintext arguments using `${option.name}`
  - Using the option value as an argument to a command could expose the plaintext value in the system process table
- as plaintext environment variables in remote and local script execution as `$RD_OPTION_NAME`
  - Local and possibly remote scripts may be passed this value into their environment
- as plaintext tokens expanded in remote scripts as `@option.name@`.
  - Inline Script workflow steps that contain a token expansion will be expanded into a temporary file, and the temp file will contain the plaintext option value.

::: tip
When passed as arguments to Job References, they can only be passed as the value of another Secure option. See [Using Secure Options with Job References](#using-secure-options-with-job-references).
:::

### Secure Remote Authentication Options

The built-in [SSH Provider](/manual/projects/node-execution/ssh.md) for node execution allows using passwords for SSH and/or Sudo authentication mechanisms, and the passwords are supplied by Secure Remote Authentication Options defined in a Job.

Secure Remote Authentication Options have some limitations compared to Plain and Secure options:

- The values entered by the user are not available for normal script and command option value expansion. This means that they can only be used for the purposes of the Remote Authentication.

### Using Secure Options with Job References

When you [define a Job Reference step in a workflow](/manual/node-steps/builtin.md#job-reference-step), you can specify the arguments that are passed to it. You can pass Secure Option values and Secure Remote Authentication Option values from a top-level job to a Job Reference, but option values _cannot be passed into another option of a different type_. So a parent job can only pass option values to the Job reference if the option type is the same between the jobs.

This constraint is to maintain the security design of these options:

1. Secure options should not to be stored in the Rundeck execution database, so must not be used as plain option values.
2. Secure Remote Authentication options should not be used in scripts/commands, so must not be used as Secure or Plain option values.

As an example, here is are two jobs, Job A and Job B, which define some options:

- Job A
  - Option "plain1" - Plain
  - Option "secure1" - Secure
  - Option "auth1" - Secure remote authentication
- Job B
  - Option "plain2" - Plain
  - Option "secure2" - Secure
  - Option "auth2" - Secure remote authentication

If Job A defines a Job reference to call Job B, then the only valid mapping is shown below:

- plain1 -> plain2
- secure1 -> secure2
- auth1 -> auth2

So the arguments for the Job Reference might look like this:

    -plain2 ${option.plain1} -secure2 ${option.secure1} -auth2 ${option.auth1}

> Note, If you define arguments in the wrong manner, then the Secure and Secure Remote Authentication options will not be set when the Job reference is called. Plain options will behave the way they do in Command or Script arguments, and be left as-is as uninterpreted property references.

### Secure Options using Key Storage

Secure options can specify a Storage Path in lieu of a default value. This path to the [Key Storage Facility](/administration/key-storage/key-storage.md)
will be loaded as the option value when one is not supplied.

The path must indicate a stored `password` entry in the storage facility.

![Storage Path for Secure Option](~@assets/img/jobs-options-secure-storage-path.png)

## Remote option values

A model of option values can be retrieved from an external source
called an _option model provider_.
When the `valuesUrl` is specified for an Option, then the model of
allowed values is retrieved from the specified URL.

This is useful in a couple of scenarios when Rundeck is used to
coordinate process that depend on other systems:

- Deploying packages or artifacts produced by a build or CI server, e.g. Jenkins.
  - A list of recent Jenkins build artifacts can be imported as Options data, so that a User can pick an appropriate package name to deploy from a list.
- Selecting from a set of available environments, defined in a CMDB
- Any situation in which input variables for your Jobs must be selected from some set of values produced by a different system.

## Option model provider

The Option model provider is a mechanism to allow the Options defined for a Job to have some of the possible input values provided by a remote service or database.

Option model providers are configured on a per-Option basis (where a Job may have zero or more Options).

### Requirements

1. Options model data must be [JSON formatted](http://www.json.org).
2. It must be accessible via HTTP(S) or on the local disk for the Rundeck server.
3. It must be in one of two JSON structures, _either_:
   - An array of string values
   - OR, an array of Maps, each with two entries, `name` and `value`.
4. By default, the HTTP(S) response must include the `application/json` content type in the header.
   In case this cannot be controlled, the attribute `project.jobs.disableRemoteOptionJsonCheck` can be set to `true` in the project settings.

### Configuration

Each Option entry for a Job can be configured to get the set of possible values from a remote URL. If you are authoring the Jobs via [job.xml file format](/manual/document-format-reference/job-v20.md#option), simply add a `valuesUrl` attribute for the `<option>`. If you are modifying the Job in the Rundeck web GUI, you can entry a URL in the "Remote URL" field for the Option.

e.g.:

    <option valuesUrl="http://site.example.com/values.json" ... />

::: tip
File URL scheme is also acceptable (e.g, `file:/path/to/job/options/optA.json`).
:::

The value data must be returned in JSON data format described below.

### JSON format

Three styles of return data are supported: simple list, simple object, and a name/value list. For a simple list, the list values will be displayed in a pop-up list when running the Job. If a simple object or name/value pairs are returned, then the `name` will be displayed in the list, but the `value` will be used as the input.

_Examples_

Simple List:

```json
["x value for test","y value for test"]
```

This will populate the select menu with the given values.

Simple Object:

```json
{ "Name": "value1", "Name2":"value2" }
```

This will populate the select menu to show the names and use the values.

Name Value List:

```json
[
  {"name":"X Label", "value":"x value"},
  {"name":"Y Label", "value":"y value"},
  {"name":"A Label", "value":"a value"}
]
```

For multivalued options, if the result is a list of objects and some have a `selected` property of `true`,
those values will be selected by default.

For a single valued option, the first result with `selected=true` will be selected (if any).

Name Value List with default selections:

```json
[
  {"name":"X Label", "value":"x value", "selected": true},
  {"name":"Y Label", "value":"y value"},
  {"name":"A Label", "value":"a value", "selected": true}
]
```

### URL connection parameters

You can configure timeouts globally as described in [Configuration - Job Remote Option URL connection parameters](/administration/configuration/config-file-reference.md#rundeck-config.properties).

You can also specify these connection parameters on a per-URL basis:

`timeout`
: socket timeout in seconds

`contimeout`
: connection timeout in seconds

`retry`
: retry count if no response from server

To set this in an Option's remote URL, add them as the "fragment" portion of the URL, after the `#` character like so:

    http://host/mypath#timeout=60;contimeout=5;retry=1

Use `key=value` for a parameter, and separate multiple parameters with the `;` character.

### Cascading Remote Options

Cascading options allow an option's Remote values URL to embed the values
entered by the user for other options when executing a Job. When the user
enters or selects a value for one of the other options, then the remote JSON is
refreshed for the current option.

This provides a mechanism for declaring hierarchical or dependent sets of option
values.

E.g. if you wanted one option to choose a "repository", and another option to
select a specific "branch" within that repository. Define your option provider
to respond correctly based on the selected "repository" value, and define your
Remote option URL to include a reference to the "repository" option value. The
Rundeck GUI will then reload the JSON values from the remote URL and insert the
correct value of the "repository" option when loading the "branch" option
values. If the user changes the selected repository, then the branch values will
be automatically refreshed.

You can declare a
dependency of one option to another by embedding property references within the
remote values URL. The property reference is of the form
`${option.[name].value}`. If you declare an option with a remote values URL
like "http://server/options?option2=${option.option2.value}", then that option
will depend on the value of the "option2" option.

In the GUI, when the options are loaded, option2 will be shown first, and the
remote values for option1 will only be loaded once a value has been selected for
option2, and the value will be placed in the URL when it is loaded.

If an option has dependencies on other options that do not have a value set,
then the embedded references will evaluate to "" (empty string) when loading
the URL.

If an option has dependencies on other options and the remote values [JSON
data](#json-format) is empty (empty list or empty object), then the option shown in
the GUI will indicate that the user should select values for the necessary
options. This allows Option model providers to indicate that some or all of the
dependent option values are necessary for the current option before showing the
input for the option.

It is possible to have dependencies on more than one option, and any change to
one of the dependencies will cause the option values to be reloaded from the
remote URL.

::: tip
It is also possible to declare a cycle of dependencies between option values, which will cause the automatic reloading to be disabled. In this case the user must manually click the reload button to reload the option values if a dependency has changed.
:::

### Variable expansion in remote URLs

The URL declared for the "valuesUrl" can embed variables which will be
filled with certain job context items when making the remote request. This
helps make the URLs more generic and contextual to the Job.

Two types of expansions are available, Job context, and Option
context.

To include job information in the URL, specify a variable of the form
`${job._property_}`.

Properties available for Job context:

- `name`: Name of the Job
- `group`: Group of the Job
- `description`: Job description
- `project`: Project name
- `user.name`: User executing the job
- `rundeck.nodename`: Name of the Rundeck server node
- `rundeck.serverUUID`: UUID of the Rundeck server node (cluster mode)
- `rundeck.basedir`: File path of the Rundeck base dir (`file://` URLs only)

Additionally the `rundeck.*` properties can be specified without the `job.` prefix, e.g. `${rundeck.basedir}`.

To include Option information in the URL, specify a variable of the
form \${option._property_}:

Properties available for Option context:

- `name`: Name of the current option

To include [Cascading remote option](#cascading-remote-options) values information in the URL, specify a variable of the
form \${option._name_.value}:

- `option.[name].value`: substitutes the selected value of another option by name. If the option is not set, then a blank string ("") will be substituted.

_Examples_

    http://server.com/test?name=${option.name}

Passes the option name as the "name" query parameter to the URL.

    http://server.com/test?jobname=${job.name}&jobgroup=${job.group}

Passes the job name and group as query parameters.

    http://server.com/branches?repository=${option.repository.value}

Passes the value of the selected "repository" option, or "" (blank) if it is not set. This option becomes
a dependent of the "repository" option, and if the "repository" value changes, the remote option values
for this option will be reloaded.

### Remote request failures

If the request for the remote option values fails, then the GUI form
will display a warning message:

![](~@assets/img/fig0901.png)

In this case, the option will be allowed to use a textfield to set the value.

## Linking to Jobs and providing option values

You can create a URL to link to a specific Job, and pre-fill some of the option values by adding URL query parameters to the Job's URL.

Query Parameters format for options:

- `opt.NAME` : provide a value for an option named `NAME`

For example, if the URL for the Job is:

    http://rundeck:4440/project/MyProject/job/show/ab698597-9753-4e98-bdab-90ebf395b0d0

Then you can pre-fill the values for `myopt1` and `myotheropt` by appending this to the URL:

    ?opt.myopt1=some+value&opt.myotheropt=another+value

The result would be:

    http://rundeck:4440/project/MyProject/job/show/ab698597-9753-4e98-bdab-90ebf395b0d0?opt.myopt1=some+value&opt.myotheropt=another+value

Note: be sure to properly escape the strings for option values, and if necessary for the option names as well.
