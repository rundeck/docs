# Job Options
Rundeck Jobs can be configured to prompt the user for input at the time a Job is run. These inputs are called _options_, which simulate a named parameter (required or optional) and are available to the user when the Job is executed. Rundeck Job Options are similar to variables, a space to put a value that will influence how the Job will run. For example, a Job Option might represent whether or not a script will run in a verbose mode or not. Effectively, job options allow a job runner to customize the job in some ways at runtime without having access to change the actual job.<br>
Rundeck and Runbook Automation have two kinds of options: _text_ and _file_.<br>
## Option Type: Text
![](/assets/img/joboptions1.png)<br>
The form for defining text options includes the following areas:<br>
### Identification
Option Name and Description are entered here. The Description will be made available to people executing the Job as help text.<br>
### Input Type
_Plain_, _Date_, _Secure_, and _Secure Remote Authentication_ are available types. Multi-valued options are only available for input type _Plain_.<br>
* **Plain Text**<br>
The most common type of option in Jobs, Plain Text stores a string to use in any part of the workflow.<br>
* **Date**<br>
Date options allows you to define dates as an option. Date options uses the _moment js_ format, and the full reference of this format is available [here](https://momentjs.com/docs/#/displaying/format/).<br>
* **Secure Option**<br>
A safe option where the value is hidden when the user enters it. For Secure Options, the GUI displays a password prompt rather than a standard text field or drop-down menu. Unlike other option values, the Secure Option values are not stored with the execution.<br>
* **Remote Secure Option**<br>
A safe choice that is hidden from scripts and commands and only used for remote authentication. The node executor and node definition must directly support this type of option.<br>
Passwords for SSH and/or sudo authentication mechanisms can be used with the built-in SSH Provider for node execution. Those passwords are provided via Secure Remote Authentication Options defined in a Job.<br>
### Date Format
If Date Input Type is selected, users provide a date format to be used when selecting the date in the user interface (see "Date" in the next section).<br>
### Default Value
If the option is not otherwise supplied by the user, it will automatically be set to the default value.  This applies to cases when an option hasn’t been specified among the arguments and the task is executed using the command-line or an API. The use of the Default Value will be overridden if a blank value is given via the command-line or API.<br>
### Allowed values
This can contain a static list of values or a URL to a server providing option data. Values can be specified as a comma separated list as seen above but can also be requested from an external source using a "remote URL".<br>
An external source known as a [remote option provider](/manual/jobs/job-options.md#option-model-provider) can be used to obtain a list of permitted option values. Permitted values are retrieved from the specified URL when the valuesUrl parameter for an Option is specified.<br>
### Restrictions
This defines criteria on which inputs to allow. If "Enforced from values" is set to "true", Rundeck will only present a popup menu containing allowed options. If set to "false", a text field will also be presented to enter other values. Enter a regular expression in the "Match Regular Expression" field to be evaluated when the Job is run.<br>
### Requirement
Specifies whether Job must have a non-blank value for this Option in order to be executed. Choose "No" to say that a blank value is acceptable and "Yes" to say that a blank value is not acceptable. If a Default Value is set, then it will be used when no value is provided, unless a blank value is allowed and is explicitly specified.<br>
### Should be hidden
If set to true, the option will be hidden when running the job. This is useful when the objective is to pass a static option to a script/command step, avoiding any user change.<br>
### Multi-valued
Defines if input can consist of multiple values. Choosing "No" states that only a single value can be chosen as input. Choosing "Yes" states that the user may select multiple input values from the Allowed values and/or enter multiple values of their own.<br>
### Delimiter
The delimiter string that will be used to separate multiple values when the Job is run.<br>
### Select All Values by Default
If checked, and no default value(s) are specified, all of the remote or local values will be selected by default.<br>
## Option Type: File
![](/assets/img/joboptions2.png)<br>
The option type file permits uploading a file that can be utilized as part of the Job. Areas displayed when setting up a File Option Type are a subset of those available in the Text Option Type.<br>
## How to reference options on command steps and script steps
### Command Step
To reference a Job Option from a Command Step use the following notation:<br>
`${option.myoption}`<br>
Example:` echo "the result is: ${option.myoption}"`<br>
### Inline Script step
On Inline scripts the right format is<br>
`@option.myoption@`<br>
Example:` echo "the result is: @option.myoption@"`<br>
### Script step
If you're using a script stored in the server file system and you want to use a Rundeck Option, the format is<br>
`$RD_OPTION_MYOPTION`<br>
Example:` echo "the result is: $RD_OPTION_MYOPTION"`<br>