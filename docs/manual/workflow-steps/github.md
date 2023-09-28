# Github Script Plugin (Enterprise)

The Github script plugin is a Workflow Step plugin included with Process Automation that runs a command located on a GitHub repo.

![Github Script WF Step Plugin View](/assets/img/gh-script-step-plugin.png)


## Configuration

- **API URL**: Github API base URL. (Eg: https://api.github.com)
- **Repo Path**: Github repo path. (Eg: repo-owner/repo-name)
- **Script Path**: Path to script in the repository. (Eg: path/to/script.sh)
- **Script Interpreter**: Interpreter to run the script. ("bash", "sh", "python", "cmd", "powershell")

> Note: The step will run the script located in 
> `<API-URL>/<REPO-PATH>/<SCRIPT-PATH>` using the desired interpreter
>
> Eg: `https://api.github.com/repo-owner/repo-name/path/to/script.sh`


- **Execution Timeout**: Timeout of the execution (milliseconds). Leave it empty if the timeout is not needed
- **Fail On Error**: Force to fail the step if the script has an error
- **Authentication Type**: Authentication Type. (Basic: to use account password, OAuth token: to use GH Personal Access Token)
- **Username**: Github Username
- **Password**: Github Account Password (For Basic Authentication)
- **Token**: Github Personal Access Token (For OAuth Authentication)

If Username and password are not provided, the library tries to find it at ~/.github property file (check <http://github-api.kohsuke.org>)
