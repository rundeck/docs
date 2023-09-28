# Git Plugin

Rundeck provides SCM Export and SCM Import providers for Git.

This plugin allows Source Code Management of the jobs, versioning, exporting or importing their definitions using a remote Git repository.

:::warning
**For Github SCM users**

[Github has stopped supporting insecure algorithms](https://github.blog/2021-09-01-improving-git-protocol-security-github/#when-are-these-changes-effective).  As of version 4.5.0 the SCM integration uses SSHJ by default, which supports the SSH-RSA 2 keys that are now required by GitHub.

Versions older than 4.5 cannot use `Private Key` method to authenticate to Github. As a workaround, You still can use the `Password` authentication method with the Github `Personal Access Token` to connect to your Github repos.
:::

_Project Settings > Setup SCM_

![Setup SCM Option](~@assets/img/scm-git-conf-location.png)

## Git Export Configuration

![Setup export button](~@assets/img/scm-git-conf-export-button.png)

### Committer Configuration

**Committer Name** and **Committer Email** are mandatory fields, the recommended configuration is to use the default `${user.fullName}` and `${user.email}`. The email and name of the current user can be set on the Profile page.

### Git Repository Configuration

**The Base Directory** is a local folder on the server node used to clone the git repository.

**Git url** and **Branch** are the common repository settings.
- For `HTTP/HTTPS` urls use the form: `http[s]://user@host.xz[:port]/path/to/repo.git`
:::tip
Many SCM systems provide a "clone" url for http[s] in the form: `http[s]://host.xz/path/to/repo.git`, to make use of this in the default git plugin it is necessary to add it the scm user with an `@` sign in the url: `http[s]://scm-user@host.xz/path/to/repo.git`
:::

- For `SSH` urls use the form: `ssh://user@host.xz[:port]/path/to/repo.git`
:::tip
Many SCM systems provide a "clone" url for ssh in the form: `git@host.xz:path/to/repo.git`, to make use of this in the default git plugin it is necessary to prepend `ssh://` and replace the `:` with a `/` in the url: `ssh://git@host.xz/path/to/repo.git`
:::

:::warning
The plugin will try to resolve the origin based on the URL that is provided to it. So if the user provides an invalid URL, it can cause Rundeck to behave erratically (same behavior as in a server command shell). Please make sure to supply a URL that plausibly resolves to the *.git file.
:::

**Fetch automatically** automatize the fetch command to be called in background (use true always).

### Job Source Files Configuration

**Export UUID Behavior** can be one of these values: `preserve`, `original` or `remove`.

- `preserve` - Write the Job UUID into exported Jobs, and as `${job.id}` in the **File Path Template**
- `original` - Write the imported Source UUID into exported Jobs, and use it as the `${job.sourceId}` in the **File Path Template**. This value is different from the job UUID.
- `remove` - Do not write a UUID into the exported Jobs.

Changing this value modifies the file definition and files need to be pushed again to the repository.

**File Path Template** is the path template for storing a Job to a file within the base dir. It works using these patterns:

- `${job.name}` - the job name
- `${job.group}` - blank, or path/
- `${job.project}` - project name
- `${job.id}` - job UUID
- `${job.sourceId}` - Original Job UUID, this is a random UUID different from `${job.id}` (See above `original` UUID Behavior)
- `${config.format}` - Serialization format `xml` or `yaml`.

**Format** store files using `xml` or `yaml` format.

### Authentication Configuration

:::warning
    ***WARNING***

    Git plugin will be disabled from the project if a user doesn't have permissions to access the password/key configured in the plugin to access the desired repository, leaving in the GUI and logs messages like the following:

    _GUI_:
    ![Disabled SCM in Jobs Section](~@assets/img/SCM-403.png)
    
    _Console_:
    ```bash
    ERROR controllers.MenuController - [SCM disabled] User don't have permissions to the configuration key. Please refer to the system's SCM key owner or administrator for further actions.
    ```
:::

**SSH: Strict Host Key Checking**: If yes, require remote host SSH key is defined in the `~/.ssh/known_hosts` file, otherwise do not verify.

**SSH Key Storage Path** (Optional): A Storage Key path containing the private key to be used with git authentication.
:::tip
Use the following command to generate the ssh key pair:
`ssh-keygen -t key-type -m PEM -f key-pair-name -C ""`
:::

**Password Storage Path** (Optional): A password stored in the Key Storage to be used on the ssh or https git authentication.

**Synchronize Automatically**: Automatically pull remote changes on automatic fetch (this doesn't auto import job changes into rundeck). If false, you can always perform it manually. You should always perform a manual import.

## Git Import Configuration

![Setup import button](~@assets/img/scm-git-conf-import-button.png)

### Git Repository Configuration

**The Base Directory** is a local folder on the server node used to clone the git repository.

**Git url** and **Branch** are the common repository settings.
- For `HTTP/HTTPS` urls use the form: `http[s]://user@host.xz[:port]/path/to/repo.git`
:::tip
Many SCM systems provide a "clone" url for http[s] in the form: `http[s]://host.xz/path/to/repo.git`, to make use of this in the default git plugin it is necessary to add it the scm user with an `@` sign in the url: `http[s]://scm-user@host.xz/path/to/repo.git`
:::

- For `SSH` urls use the form: `ssh://user@host.xz[:port]/path/to/repo.git`
:::tip
Many SCM systems provide a "clone" url for ssh in the form: `git@host.xz:path/to/repo.git`, to make use of this in the default git plugin it is necessary to prepend `ssh://` and replace the `:` with a `/` in the url: `ssh://git@host.xz/path/to/repo.git`
:::

**Fetch automatically** automatize the fetch command to be called in background (use true always).

**Pull automatically** automatically pull remote changes on automatic fetch (this doesn't auto import job changes into rundeck). If false, you can always perform it manually. You should always perform a manual import.

### Job Source Files Configuration

**Import UUID Behavior** how to handle UUIDs from imported Job source files

- `preserve` - Preserve the Source UUID as the Job UUID
- `archive` - Remove the Source UUID but keep it for use in Export. Allows you to use `${job.sourceId}` in the **File Path Template** instead of `${job.id}`.
- `remove` - Remove the source UUID.

**File Path Template** is the path template for storing a Job to a file within the base dir. It works using these patterns:

- `${job.name}` - the job name
- `${job.group}` - blank, or path/
- `${job.project}` - project name
- `${job.id}` - job UUID
- `${job.sourceId}` - Original Job UUID, this is a random UUID different from `${job.id}` (See above `archive` UUID Behavior)
- `${config.format}` - Serialization format `xml` or `yaml`.

### Authentication Configuration

**SSH: Strict Host Key Checking**: If yes, require remote host SSH key is defined in the `~/.ssh/known_hosts` file, otherwise do not verify.

**SSH Key Storage Path** (Optional): A Storage Key path containing the private key to be used with git authentication.
:::tip
Use the following command to generate the ssh key pair:

`ssh-keygen -t ed25519 -f key-pair-name -C ""`
:::

**Password Storage Path** (Optional): A password stored in the Key Storage to be used on the ssh or https git authentication.

### Setup Configuration

You can set **Match a Regular Expression?** to `yes` to enter a regular expression that is going to be checked to match all paths that match the regular expression to be imported.
If you set it to `no` on the next step you are going to be asked to select one by one the files to be imported.

## Advanced configurations

### Use the same repo for multiple projects.

There is more than one way to use a single repository for multiple projects.

You can use different branches of the same repository for each project or you can use the same branch but using folders in the repository.

This is an example of use folders inside the same repository and branch.

### Export Configuration

On the first project, called _project-a_ in this example:
Set **Export UUID Behavior** to `original`.
Set **File Path Template** to `project-a/${job.group}${job.name}-${job.sourceId}.${config.format}`.

In another project, called _project-b_ on this example, use the same configuration, just change the **File Path Template** to `project-b/${job.group}${job.name}-${job.sourceId}.${config.format}`.

### Import Configuration

On the first project, to import jobs from _project-a_ in the last example:
Set **Import UUID Behavior** to `archive`.
Set **File Path Template** to `project-a/${job.group}${job.name}-${job.sourceId}.${config.format}`.
Set **Match a Regular Expression?** to `yes` and **Regular Expression** to `project-a/.*\.xml` or `project-a/.*\.yaml`.

On the other project, to import _project-b_:
Set **Import UUID Behavior** to `archive`.
Set **File Path Template** to `project-b/${job.group}${job.name}-${job.sourceId}.${config.format}`.
Set **Match a Regular Expression?** to `yes` and **Regular Expression** to `project-b/.*\.xml` or `project-b/.*\.yaml`.

:::tip
It is not recommended to use the same repository and branch when using export and import plugins on the same project.
:::
