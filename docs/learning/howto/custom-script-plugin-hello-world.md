# Developing a Custom Rundeck Script Plugin

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

Now that we see the value in creating our own workflow step script plugin, we can walk through a simple Hello World example.

### Script to wrap

We're going to wrap a simple bash script called helloworld.sh:

```bash
#!/bin/bash
echo "Hello world from $(hostname)! I am a $1. Don't tell anyone that the secret is \"$2\""
```

It prints the hostname it's called on and the first and second parameters passed to it. We can wrap a script from any scripting language as long as the interpreter is already deployed on the remote nodes.

### Basic plugin structure

A Rundeck plugin is a zipped directory with the following structure:

```
helloworld-plugin.zip
helloworld-plugin      -- root directory of zip contents, same name as zip file
├── plugin.yaml        -- plugin metadata file
└── contents           -- where to put your scripts
    └── helloworld.sh
```

`plugin.yaml` is the only required file in the zip. This is the `plugin.yaml` for our Hello World plugin:

```yaml
name: Hello World
version: 1
rundeckPluginVersion: 1.2
author: Carlo Cabanilla
date: 2018-07-20
url: http://rundeck.org/
providers:
  - name: HelloBash
    service: RemoteScriptNodeStep
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: helloworld.sh
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
          valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
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
    valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
```

### Setting up the plugin environment

How can we actually see this plugin in action? Rundeck is designed for real world multi-node environments but we don't want the hassle of actually spinning one up, so we use Docker to simulate a multi-node environment right on our workstation.

The environment setup can be downloaded at [https://github.com/clofresh/rundeck-playground](https://github.com/clofresh/rundeck-playground)

To build and start the Docker environment, run:

```bash
make compose
```

This make command is specific to this tutorial. It will do several things:

1. Zip the plugin source files into the proper zip structure and save it in the Rundeck image's build directory
2. Run Docker Compose to build all the images specified in `docker-compose.yml` and run containers from those images. Docker Compose will run the containers in the foreground, outputting all their logs to your terminal.

The containers in our environment are:

- rundeck: The Rundeck server. The Dockerfile copies the zipped plugin into the image's `libext` directory where Rundeck will watch for new plugins.
- rundeck-cli: The Rundeck command line client. This image doesn't run as a service but instead we invoke it from the command line to push configuration and invoke jobs on the Rundeck server.
- web_1 & web_2: Containers that simulate your application nodes. They run both an ssh daemon and a sample web app. These are the nodes that Rundeck will execute our plugin on.

### Pushing configuration to Rundeck

Once our Docker environment is up and the Rundeck server is listening for requests, we can push a sample project and job that will use our plugin. We do that from a separate terminal than our `make compose` command:

```bash
make rd-config
```

This will:

- Check for changes in our plugin source files, and if so, copy a new plugin zip into the running Rundeck container.
- Push all the Rundeck yaml config in `rundeck-project` to the running Rundeck server.
- Push the keys in `rundeck-project/key-storage` to the Key Storage.

With this command, you can iterate on your plugin or job configuration without having to stop and start the Docker environment. Additionally, it will only push the config that has changed.

The configuration we're pushing defines the nodes, project and job that use our plugin.

If you just want to run the job, you can skip ahead to _Running the Hello World job_, otherwise we walk through the config involved in the sections below.

#### Nodes

In order for Rundeck to know which nodes exist in your environment and how to connect to them, we provide a resource source yaml file:

```yaml
web_1:
  hostname: web_1
  tags: web

web_2:
  hostname: web_2
  tags: web
```

#### Project

To use the above defined resource source file, we set the following properties on the project:

```properties
project.ssh.user=root
project.ssh-keypath=/home/rundeck/.ssh/rundeck-playground
resources.source.1.config.file=/home/rundeck/nodes.yaml
resources.source.1.config.generateFileAutomatically=false
resources.source.1.config.includeServerNode=true
resources.source.1.type=file
```

`project.ssh.user` and `project.ssh-keypath` configure the ssh user and private key to use when connecting to any node with this project. It's up to you to properly distribute the ssh keys to your nodes. In our playground environment, we've bundled the keys into the Docker images.

`resources.source.1.config.file` points to the `nodes.yaml` file we created previously.

Both the ssh private key and the `nodes.yaml` file need to be deployed to the Rundeck server and be readable by the rundeck user.

#### Job

To define our job, we create another yaml file, `rundeck-project/hello_test_job.yaml`:

```yaml
- name: Hello Test Job
  description: "A job to test our hello world plugin"
  nodefilters:
    filter: web_.*
  sequence:
    commands:
      - nodeStep: true
        type: HelloBash
        configuration:
          secret_secret: keys/projects/hello-project/mysecret
```

Some values to note:

- The `nodefilters` key is letting us specify a regex to match the tags of the nodes we want to run this job on. In our case, any of the web nodes.
- The `sequence` key defines what the job should run. In our case, we're running one command, a node step of our HelloBash script from our custom plugin.
- The `configuration` key of the node step is how we pass configuration into our script. Note that we're passing in a Key Storage path instead of an actual value.

### Running the Hello World job

Now that we've spun up a Rundeck environment and defined a job that uses our plugin, we can run it using the `rd` command line client. If you had the `rd` client installed natively, it would be as simple as:

```bash
export RD_PROJECT=hello-project
rd run -f --job 'Hello Test Job'
```

But since we're running `rd` from a Docker container, we need some extra commands to get it to run:

```bash
alias rd='docker run --network rundeck-playground_default --mount type=bind,source="$(pwd)",target=/root -e RD_PROJECT=hello-project playground-rundeck-cli '

rd run -f --job 'Hello Test Job'
```

The `rd` alias we've created lets us type less and use the `rd` command as if it were running natively on our workstation.

All this is encapsulated in a make command:

```bash
make rd-run-job

# Found matching job: 7fd65208-4482-456b-9d76-aa099171938e Hello Test Job
# Execution started: [3] 7fd65208-4482-456b-9d76-aa099171938e /Hello Test Job <http://127.0.0.1:4440/project/hello-project/execution/show/3>
Hello world from abee114adea5! Don't tell anyone that the secret is "I'm Kilroy!"
Hello world from 9964ad40468a! Don't tell anyone that the secret is "I'm Kilroy!"
```

The script outputs the hostnames it's running on, which will most likely be different but similar to the above, as well as the secret "I'm Kilroy!". Remember that we passed in a Key Storage path value `keys/projects/hello-project/mysecret` for that parameter. To double check that that's the correct value, you can cat the value on disk that we pushed to the Rundeck server:

```bash
cat rundeck-project/key-storage/keys/projects/hello-project/mysecret
I'm Kilroy!
```

Another thing to notice is that even though we've securely passed the secret to the script plugin, once the script plugin has it, they can do whatever with the value, including expose it in the logs, so the script writer needs to be cautious about that.
