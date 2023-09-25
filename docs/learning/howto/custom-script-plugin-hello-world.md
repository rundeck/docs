# Develop a Custom Script Plugin

This tutorial covers:

- The benefits of a custom Rundeck script plugin
- How to create a basic script plugin
- How to deploy the necessary Rundeck configuration to use it

The end result of this tutorial as well as a Docker environment to run it in can be found on [GitHub](https://github.com/clofresh/rundeck-playground).

## Why create your own script plugin?

Rundeck Community is an open source runbook automation platform that comes with a lot of functionality out of the box, like running script commands on your nodes with a command step. If you can already run commands with the default functionality, why would you want to write a new plugin to do that?

Several reasons:

- To encapsulate and reuse functionality across projects and jobs
- To expose script parameters to the UI with descriptions, types and defaults
- To securely access secrets stored in Key Storage

### Encapsulate and reuse functionality across projects and jobs

Command defined as a command step are specific to a job. If you need to reuse the script in several jobs in the same or different projects, you would have to copy-paste it each time which can get to be cumbersome and error-prone.

Using a custom plugin encapsulates the script so that job writers across any projects can use the script's functionality. When the plugin author uploads a new version of the plugin, all jobs automatically use the latest version.

### Expose script parameters to the UI with descriptions, types and defaults

Command line scripts can come with many parameters. When running them from command line, if you're lucky, you are able to get the help text from them. Some scripts may not have help on their parameters. When creating a custom script plugin, you can define, document and provide default values that make sense in the context of your organization for the parameters of your script. Conversely, you can also leave out parameters to a script that you don't want job authors to have access to.

All the parameters defined in the plugin will show up in the Rundeck job editing UI, providing the job authors with affordances to guide them in using the script.

### Securely access secrets stored in Key Storage

Many scripts require some type of secret to authorize the script to do its work so the job user needs to know the secret to use the script. This increases the risk of that secret getting exposed depending how secrets are shared in your organization.

A more secure solution would be to authorize the job user to use the secret without having them know its value. Plugins can access secrets by referring to paths in the Rundeck Key Storage. Rundeck will evaluate the value of the secret into the execution without the job user ever knowing the value. This reduces the scope of who needs to know the secret to the Rundeck administrator populating the Key Storage. It also lets the administrator rotate the secrets transparent to the job user.

## How to create a simple workflow step script plugin

Create a basic plugin using the [rundeck plugin bootstrap tool](/learning/howto/plugin-bootstrap.md):

```bash
rundeck-plugin-bootstrap -d <plugins-path> -n HelloBash -s WorkflowNodeStep -t script

gradle build
```

### Script to wrap

We can modify the bash script stored in `<plugins-path>/contents/exec`:

```bash
#!/bin/bash
set -eu

echo "Hello world from $(hostname)! I am a $1. Don't tell anyone that the secret is \"$2\"
```

It prints the hostname it's called on and the first and second parameters passed to it. We can wrap a script from any scripting language as long as the interpreter is already deployed on the remote nodes.

### The plugin configuration

`<plugin-path>/plugin.yaml` has the configuration for the plugin, we will replace the content with our Hello World plugin setup:

```yaml
name: HelloBash
rundeckPluginVersion: 2.0
author: Rundeck Dev
description: Describe your plugin here
rundeckCompatibilityVersion: 3.x
targetHostCompatibility: unix
license: Apache 2.0
tags:
  - script
  - WorkflowNodeStep
date: 2022-07-11T18:51:13.151Z
version: 1.0.0
providers:
  - name: hellobash
    service: WorkflowNodeStep
    title: HelloBash
    description: The description of hellobash plugin
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: exec
    script-args: ${config.who_i_am} ${config.secret_secret}
    config:
      - name: who_i_am
        type: Select
        title: Who I Am
        description: Provide a predefined list of options
        values: machine, mannequin
        default: machine
      - name: secret_secret
        type: String
        title: My Secret
        description: Securely pass this to the script
        renderingOptions:
          selectionAccessor: "STORAGE_PATH"
          valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
          storage-path-root: "keys"
```

The significant section is the item in the `providers` array. It says we're creating a RemoteScriptNodeStep named HelloBash. A RemoteScriptNodeStep means the script will run on the remote nodes, as opposed to a WorkflowNodeStep, which runs on the Rundeck server itself and receives the nodes as parameters.

#### Script invocation

The values for `script-interpreter`, `script-file`, and `script-args` are invoked on the remote node as follows:

```bash
/bin/bash helloworld.sh ${job.name}
```

`helloworld.sh` only needs to be bundled in the plugin zip contents directory and Rundeck takes care of copying it to the remote nodes that it runs on.

The `script-args` value we pass to the script, `${job.name}` is one of many context variables that Rundeck sets.

#### Script parameters

The `config` key defines the inputs to the script, their types, defaults and how they're rendered in the UI.

The `who_i_am` item describes a select box with predefined values of `machine` or `mannequin`, defaulting to `machine`.

```yaml
- name: who_i_am
  type: Select
  title: Who I Am
  description: Provide a predefined list of options
  values: machine, mannequin
  default: machine
```

The `secret_secret` item is a string value but the `valueConversion: "STORAGE_PATH_AUTOMATIC_READ"` tells Rundeck to interpret that string as a path in Key Storage and pass the value of that key to the script. This is how we can securely reference secrets without exposing them to the job users.

```yaml
- name: secret_secret
  type: String
  title: My Secret
  description: Securely pass this to the script
  renderingOptions:
    selectionAccessor: "STORAGE_PATH"
    valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
    storage-path-root: "keys"
```
### Check the script works from a deployed instance
#### Create a key storage entry
Click on the gear button, go to Key Storage.

![Key Storage System Menu](~@assets/img/key-storage-sysmenu-button.png)

Click on Add or Upload a Key

![Add a Key Button](~@assets/img/key-storage-add-a-key.png)

Set a key as follows:

![Filled Password Key form](~@assets/img/custom-script-plugin-key-storage.png)

#### Create a job definition
To define our job, we create another yaml file, `hello_test_job.yaml`:

```yaml
- name: Test Job
  defaultTab: nodes
  description: 'A job to test our hello world plugin'
  loglevel: INFO
  sequence:
    commands:
    - configuration:
        secret_secret: keys/path-to-secret/secret.key
        who_i_am: machine
      nodeStep: true
      type: hellobash
    keepgoing: false
    strategy: node-first
```

Some values to note:

- The `nodefilters` key is letting us specify a regex to match the tags of the nodes we want to run this job on. In our case, any of the web nodes.
- The `sequence` key defines what the job should run. In our case, we're running one command, a node step of our HelloBash script from our custom plugin.
- The `configuration` key of the node step is how we pass configuration into our script. Note that we're passing in a Key Storage path instead of an actual value.

#### Run the Test Job

[Create a project](/manual/projects/project-create.md) and [upload the job definition](/manual/creating-jobs.html#importing-job-definitions) for our `hello_test_job.yaml`

Run the job and see the output:

![Custom Script Plugin job Output](~@assets/img/custom-script-plugin-job-output.png)
