# Use case: database credential rotation

Now that we know how to create custom workflow step script plugin in the [hello world tutorial](/tutorials/custom-script-plugin-hello-world.md), let's walk through a real world use case: rotation database credentials. Credential rotation has traditionally been a complicated, thankless administrative chore. It's the type of work that might be labeled [toil](https://landing.google.com/sre/book/chapters/eliminating-toil.html) and exactly the kind of work that Rundeck has been designed to streamline.

The end result of this tutorial as well as a Docker environment to run it in can be found on [GitHub](https://github.com/clofresh/rundeck-playground)

## The problem

What's difficult about database credential rotation?

- It involves multiple steps across multiple nodes in your production cluster.
- It's necessary to handle secrets in the form of the new credentials you're creating, plus credentials of a super user that can create the new login.
- Manually run steps are error prone and mistakes can potentially cause a site-wide outage if your app can't authenticate with the database anymore.

## Addressing the problem with Rundeck

By creating a custom script plugin to interact with the database, its downstream clients and the Rundeck Key Storage, we can automate the creation and deployment of the new credentials as well as safely handle the decomissioning of the old credentials.

### Secure secrets handling

Since the Key Storage stores the credentials, the administrator triggering the credential rotation doesn't ever need to see the actual credentials of the database super user or the newly generated database user.

### Critical logic is tested ahead of time

The logic for creating the database login is encapsulated in a script that has been tested prior to actually needing to rotate the credentials, so we avoid putting a human in the stressful, error-prone situation of having to figure out correct syntax to run on a live system on the fly.

Similarly, the app restart logic is encapsulated as well, with health check logic as an extra safety measure to halt the process in case something has gone wrong before applying the change to the whole cluster.

### Ease of use encourages proactive security

Lastly, by creating a single button solution to rotate database credentials, we're much more likely to rotate our credentials on a regular basis to mitigate potential security risks, rather than only after a security incident has already occured.

## Automating credential rotation with Rundeck

In order to automate the credential rotation, we need to automate the individual steps, then orchestrate the steps in a single process. The steps we want to automate are:

- Creating a new database login
- Updating the application configuration to use the new database login
- Restarting the applications to apply the configuration change
- Deleting the old database login

### Restarting the apps

We can start with restarting the applications because that's something we can test on its own before proceeding. We'll create a new plugin metadata file `rundeck-plugins/db-creds/plugin.yaml`:

```yaml
name: Database credential management
version: 1
rundeckPluginVersion: 1.2
author: Carlo Cabanilla
date: 2018-07-20
url: http://rundeck.org/
providers:
  - name: RestartApp
    service: RemoteScriptNodeStep
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: restart.sh
    script-args: ${config.process} ${config.health_url}
    config:
      - type: String
        name: process
        title: process
        description: the process to restart
      - type: String
        name: health_url
        title: health_url
        description: the http endpoint to poll to check that it's healthy
        default: http://localhost:8080
```

Our restart script takes 2 parameters: the name of the process on the node, and a url that we can poll to check that it's healthy. The implementation of the restart script is specific to the Docker playground environment so we'll leave out the details, but from a high level it:

- Kills the process and lets the supervising parent process restart it
- Polls the health check url until it returns healthy or times out
- Exits with an error code if it times out to let the calling process know whether to continue or not with downstream steps

In order to be able to run the restart, we create a job that specifies the nodes to run it on and the input parameters. `rundeck-project/jobs/RestartApp.yaml`:

```yaml
- name: RestartApp
  uuid: RestartApp
  nodefilters:
    filter: web_.*
  sequence:
    commands:
      - configuration:
          health_url: http://localhost:8080
          process: python3
        nodeStep: true
        type: RestartApp
    keepgoing: false
    strategy: node-first
```

We specify a `uuid` here so that we know how to refer to it from other jobs, otherwise Rundeck will assign a random uuid.

We can test the restart using our [playground Docker environment](https://github.com/clofresh/rundeck-playground):

```bash
make rd-run-job JOB=RestartApp

# Found matching job: RestartApp RestartApp
# Execution started: [5] RestartApp /RestartApp <http://127.0.0.1:4440/project/hello-project/execution/show/5>
Restarting python3 app
Waiting for app to stop
Waiting for app to start and return 200
Done
Restarting python3 app
Waiting for app to stop
Waiting for app to start and return 200
Done
```

### Modifying the app config

Now we can create a step to update the configured database login on the application nodes. In your production environment you might use a configuration management tool like Ansible or Chef to accomplish this but here we use a simple Python script. We can add this to the `providers` key of `rundeck-plugins/db-creds/plugin.yaml`:

```yaml
- name: UpdateDBCredentials
  service: RemoteScriptNodeStep
  plugin-type: script
  script-interpreter: /usr/local/bin/python3
  script-file: change_password.py
  script-args: /etc/web.yaml ${config.user} ${config.password}
  config:
    - type: String
      name: user
      title: user
      description: "db user"
    - type: String
      name: password
      title: password
      description: "db password"
      renderingOptions:
        valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
```

Note the `valueConversion: "STORAGE_PATH_AUTOMATIC_READ"` setting to able to refer to a path in Key Storage for the database password.

Corresponding job config `rundeck-project/jobs/UpdateAppConfig.yaml`:

```yaml
- name: UpdateAppConfig
  uuid: UpdateAppConfig
  nodefilters:
    filter: web_.*
  options:
    - label: Database user
      name: dbuser
      required: true
  scheduleEnabled: true
  sequence:
    commands:
      - nodeStep: true
        configuration:
          user: ${option.dbuser}
          password: keys/projects/hello-project/db/${option.dbuser}
        type: UpdateDBCredentials
    keepgoing: false
    strategy: node-first
```

In the job, we expose an option to the job user to specify the database user to set the config to. We use that value as part of the Key Storage path to look up the password. By using a naming convention for the key path, we hide the details of the Key Storage setup from the job user.

We can test it with:

```bash
make rd-run-job JOB=UpdateAppConfig JOB_OPTIONS='-dbuser web2'

# Found matching job: UpdateAppConfig UpdateAppConfig
# Execution started: [6] UpdateAppConfig /UpdateAppConfig <http://127.0.0.1:4440/project/hello-project/execution/show/6>
Updating /etc/web.yaml with db user credentials: web2
Done
Updating /etc/web.yaml with db user credentials: web2
Done
```

### Creating the new db login

Creating a new database login requires a super user database login plus a user and password for the new login. Add this to the `providers` key of `rundeck-plugins/db-creds/plugin.yaml`:

```yaml
- name: CreateDBUser
  service: RemoteScriptNodeStep
  plugin-type: script
  script-interpreter: /bin/bash
  script-file: create-db-user.sh
  script-args: ${config.master_db_user} ${config.master_db_password} ${config.new_user} ${config.new_password} ${config.role}
  config:
    - type: String
      name: master_db_user
      title: master_db_user
      description: "master db user"
      default: master1
    - type: String
      name: master_db_password
      title: master_db_password
      description: "master db user password"
      default: keys/projects/hello-project/db/master1
      renderingOptions:
        valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
    - type: String
      name: new_user
      title: new_user
      description: "New db user"
    - type: String
      name: new_password
      title: new_password
      description: "New db password"
      renderingOptions:
        valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
    - type: String
      name: role
      title: role
      description: "Database role to grant the new user"
```

Corresponding job config `rundeck-project/jobs/CreateDbUser.yaml`:

```yaml
- name: CreateDbUser
  uuid: CreateDbUser
  nodefilters:
    filter: web_1
  options:
    - label: Master db user version
      name: master_user_version
      required: false
      value: "1"
    - label: Web db user version
      name: web_user_version
      required: true
  sequence:
    commands:
      - nodeStep: true
        configuration:
          master_db_user: master${option.master_user_version}
          master_db_password: keys/projects/hello-project/db/master${option.master_user_version}
          new_user: web${option.web_user_version}
          new_password: keys/projects/hello-project/db/web${option.web_user_version}
          role: web
        type: CreateDBUser
    keepgoing: false
    strategy: node-first
```

```bash
make rd-run-job JOB=CreateDbUser JOB_OPTIONS='-web_user_version 2'

# Found matching job: CreateDbUser CreateDbUser
# Execution started: [7] CreateDbUser /CreateDbUser <http://127.0.0.1:4440/project/hello-project/execution/show/7>
GRANT ROLE
```

### Deleting the old db login

Updating `rundeck-plugins/db-creds-plugin/plugin.yaml`:

```yaml
- name: DeleteDBUser
  service: RemoteScriptNodeStep
  plugin-type: script
  script-interpreter: /bin/bash
  script-file: delete-db-user.sh
  script-args: ${config.master_db_user} ${config.master_db_password} ${config.user}
  config:
    - type: String
      name: master_db_user
      title: master_db_user
      description: "master db user"
      default: master1
    - type: String
      name: master_db_password
      title: master_db_password
      description: "master db user password"
      default: keys/projects/hello-project/db/master1
      renderingOptions:
        valueConversion: "STORAGE_PATH_AUTOMATIC_READ"
    - type: String
      name: user
      title: user
      description: "db user to delete"
```

And the corresponding job `rundeck-project/jobs/DeleteDbUser.yaml`:

```yaml
- name: DeleteDbUser
  uuid: DeleteDbUser
  nodefilters:
    filter: web_1
  options:
    - label: Master db user version
      name: master_user_version
      required: false
      value: "1"
    - label: Web db user version
      name: web_user_version
      required: true
  sequence:
    commands:
      - nodeStep: true
        configuration:
          master_db_user: master${option.master_user_version}
          master_db_password: keys/projects/hello-project/db/master${option.master_user_version}
          user: web${option.web_user_version}
        type: DeleteDBUser
```

```bash
make rd-run-job JOB=DeleteDbUser JOB_OPTIONS='-web_user_version 1'

# Found matching job: DeleteDbUser DeleteDbUser
# Execution started: [9] DeleteDbUser /DeleteDbUser <http://127.0.0.1:4440/project/hello-project/execution/show/9>
DROP ROLE
```

### Tying it all together

To tie all the steps together into a single job, we can use job reference steps. `rundeck-project/jobs/RotateDbCredentials.yaml`:

```yaml
- name: RotateDbCredentials
  uuid: RotateDbCredentials
  options:
  - label: master_user_version
    name: master_user_version
    value: '1'
  - label: web_user_version
    name: web_user_version
    required: true
  - label: prev_web_user_version
    name: prev_web_user_version
    required: true
  sequence:
    commands:
    - jobref:
        name: CreateDbUser
        uuid: CreateDbUser
        nodeStep: 'true'
        importOptions: true
    - jobref:
        name: UpdateAppConfig
        uuid: UpdateAppConfig
        nodeStep: 'true'
        args: -dbuser web${option.web_user_version}
    - jobref:
        name: RestartApp
        name: RestartApp
        nodeStep: 'true'
    - jobref:
        name: DeleteDbUser
        uuid: DeleteDbUser
        nodeStep: 'true'
        args: -master_user_version ${option.master_user_version} -web_user_version ${option.prev_web_user_version}
    keepgoing: false
    strategy: sequential
```

We'll need a new user and password, which we can create in the Key Storage:

```bash
echo 'An0th3r!S3cr3t' > rundeck-project/key-storage/keys/projects/hello-project/db/web3
```

Then running the job should push the new key. We need to specify both the new version and the previous version that needs deleting.

```bash
make rd-run-job JOB=RotateDbCredentials JOB_OPTIONS='-web_user_version 3 -prev_web_user_version 2'

# Created: keys/projects/hello-project/db/web3 [password]
# Found matching job: RotateDbCredentials RotateDbCredentials
# Execution started: [7] RotateDbCredentials /RotateDbCredentials <http://127.0.0.1:4440/project/hello-project/execution/show/7>
GRANT ROLE
Updating /etc/web.yaml with db user credentials: web3
Done
Updating /etc/web.yaml with db user credentials: web3
Done
Restarting python3 app
Waiting for app to stop
Waiting for app to start and return 200
Done
Restarting python3 app
Waiting for app to stop
Waiting for app to start and return 200
Done
DROP ROLE
```

And there you have it: a single command to rotate your database credentials!
