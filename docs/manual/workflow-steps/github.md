# Github Script Plugin (Enterprise)

The Github script plugin is a Workflow Step plugin included with Rundeck Enterprise that runs a command located on a GitHub repo.

## Configuration

- **Github Path**: The path of the repo, with the format `owner/repo`
- **File Name**: The script to run
- **Script Executable**: The executable that will run the script
- **Execution Timeout**: The execution timeout, leave it empty if the timeout is not needed
- **Username**: Github username
- **Password**: Github password

If Username and password are not provided, the library looks at ~/.github property file (check <http://github-api.kohsuke.org>)
