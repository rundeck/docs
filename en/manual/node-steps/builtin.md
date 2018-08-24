% Builtin Node Steps

### Command step

Use the command step to call system commands. Enter any command string you
would type at the terminal on the remote hosts.

![Command step type](../../figures/fig0404.png)

### Script step

Execute the supplied shell script content. Optionally, can pass an
argument to the script specified in the lower text field.

![Script step type](../../figures/fig0405.png)

### Script file step

Executes the script file local to the sever to the filtered Node
set. Arguments can be passed to the script by specifying them in the
lower text field.

![Script file step type](../../figures/fig0406.png)


### Script URL step

Downloads a script from a URL, and executes it to the filtered Node
set. Arguments can be passed to the script by specifying them in the
lower text field.

![Script URL step type](../../figures/fig0406.png)


The URL can contain [Context Variables][page:manual/job-workflows.md#context-variables] that will be expanded at runtime.

### Job reference step

To call another saved Job, create a Job Reference step. Enter the name
of the Job and its group. 

![Job reference step type](../../figures/fig0407.png)

The Job Reference form provides a Job browser to make it easier to
select from the existing set of saved Jobs. 
Click the "Choose A Job..." link and navigate to the desired Job.

Finally, if the Job defines Options, you can specify them in the
commandline arguments text field and can include variable expansion to pass
any input options for the current job.  Format:

    -optname <value> -optname <value> ...

The format for specifying options is exactly the same as you would pass 
to the `run` commandline tool, and you can substitute values of input 
options to the current job. For example:

    -opt1 something -opt2 ${option.opt2}

This would set the value "something" for the Job's "opt1" option, and then pass
the "opt2" option directly from the top-level job to the Job reference.

This is similar to calling the other Job with [run]: 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
run [filter-options] -j group/jobname -- -opt1 something -opt2 somethingelse
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the Job has required Options that are not specified on the arguments line,
then a "defaultValue" of that option will be used if it is defined.  If a
required option does not have a default value, then the execution will fail
because the option is not specified.

Job References can be run as either *Node Steps* or  *Workflow Steps* (see [Workflow Steps : Types of Steps](#workflow-steps)).
 When you choose to use a Job Reference as a *Node Step*, you can use the Node context variables within the arguments string to the Job.

#### Overriding Node Filters

You can override the Node Filters used in the referenced Job. Click the "Override Node Filters?" button to expand the Node Filter area.

![Job Reference Node Filter Override](../../figures/job-ref-node-filter-override.png)

Enter a new filter in the "Node Filter" input field to preview the matched nodes.  

Once you enter a new filter, you can modify the other aspects for the Node Dispatching used by the Job Reference:

* Thread Count
* Node failure behavior
* Node Rank attribute
* Node Rank order

### Copy File step

### Local Command step

### Data Node step

## Notes

### Advanced Script options

For [Script steps](#script-step), [Script file steps](#script-file-step), and [Script URL steps](#script-url-step), you can specify an optional *Invocation* string to declare how the script should be executed.

Click on the "Advanced" link to reveal the input.

![Advanced Script Settings](../../figures/job_workflow_script_interpreter.png)

Enter a command that will be used as the *invocation* to run the script, by including `${scriptfile}` to define where the resulting file will appear in the invocation command.  For example, you can execute the script using `sudo` by entering:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo -u username ${scriptfile}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This will then allow your script to make use of [Sudo authentication](../../manual/node-execution/ssh-node-execution.html#secondary-sudo-password-authentication).

The effective commandline for your script will become:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo -u username [scriptfile] arguments ...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If necessary, you can check the "Quote arguments to script invocation string?" checkbox, which will then quote both the scriptfile and arguments before passing to the invocation command:

    [invocation string] "[scriptfile] arguments ..."

### Changing the File extension

You can also change the file extension set on the temporary file when it is invoked.  This might be necessary if your command expects a file with a certain extension.

Set the "File Extension" field to the desired extension. The `.` is optional, e.g. `.ps` or `sh`.  The default is determined by the type of target node.  Unix uses `.sh` and Windows uses `.bat`.

### Quoting arguments to steps

When you define a [Command](#command-step) or arguments to any Script or Job reference step, your arguments are interpreted as a space-separated sequence of strings. If you need to use spaces or quotes within the argument, here are some rules for quoting arguments:

* If you have an argument with a space character, you can use either double or single quotes: 
    * `"my argument"`: interpreted as `my argument`
    * `'my argument'`: interpreted as `my argument`
* If you need to embed quotes within a quoted argument, you can wrap it in the opposite kind of quote (double or single):
    * `'"double quotes"'`: interpreted as `"double quotes"`
    * `"'single quotes'"`: interpreted as `'single quotes'`
* Or use doubled-up quote characters
    * `"""double quotes"""`: interpreted as `"double quotes"`
    * `'''single quotes'''`: interpreted as `'single quotes'`
