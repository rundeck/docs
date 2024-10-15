## Nixy Plugins

The *nixy plugins provide various file and command operations through node step plugins. The following *nixy plugins are available for PagerDuty Runbook Automation and Rundeck:

* [**File Contains (nixy / file / contains)**](#file-contains)
* [**File Dos2Unix (nixy / file / dos2unix)**](#file-dos2unix)
* [**File Exists (nixy / file / exists)**](#file-exists)
* [**File Not Exists (nixy / file / not-exists)**](#file-not-exists)
* [**File Rotate (nixy / file / rotate)**](#file-rotate)
* [**File Truncate (nixy / file / truncate)**](#file-truncate)
* [**Command Try Until (nixy / command / try-until)**](#command-try-until)
* [**Local Script Workflow Step (nixy / local-script)**](#local-script-workflow-step)
* [**Local Script Node Step (nixy / local-script)**](#local-script-node-step)
* [**Wait for Directory Exists (nixy / waitfor / dir-exists)**](#wait-for-directory-exists)
* [**Wait for File Contains (nixy / waitfor / file-contains)**](#wait-for-file-contains)
* [**Wait for File Exists (nixy / waitfor / file-exists)**](#wait-for-file-exists)
* [**Wait for File Size (nixy / waitfor / file-size)**](#wait-for-file-size)
* [**Wait for HTTP (nixy / waitfor / http)**](#wait-for-http)
* [**Wait for Munin (nixy / waitfor / munin)**](#wait-for-munin)
* [**Wait for Ping (nixy / waitfor / ping)**](#wait-for-ping)
* [**Wait for Port Open (nixy / waitfor / port-open)**](#wait-for-port-open)
* [**Wait for Sleep Workflow Step (nixy / waitfor / sleep)**](#wait-for-sleep-workflow-step)
* [**Wait for Local Ping (nixy / waitfor / local / ping)**](#wait-for-local-ping)
* [**Wait for Local Port Open (nixy / waitfor / local / port-open)**](#wait-for-local-port-open)

### File Contains

The **File Contains** plugin checks if a file contains a specific pattern. The plugin requires the following fields:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`
* **Pattern**: The pattern to search for in the file.
  * Example: `error`

### File Dos2Unix

The **File Dos2Unix** plugin converts DOS line endings to Unix line endings in a file or directory. The plugin requires the following fields:

* **File**: The path to the file or directory.
  * Example: `/tmp/path/to/file`
* **Recursive**: Run the dos2unix command recursively for the directory path.
  * Example: `true`

### File Exists

The **File Exists** plugin asserts that a file exists. If the file does not exist, the plugin exits with status 1. The plugin requires the following field:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`

### File Not Exists

The **File Not Exists** plugin asserts that a file does not exist. If the file exists, the plugin exits with status 1. The plugin requires the following field:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`

### File Rotate

The **File Rotate** plugin rotates a file and optionally compresses it with gzip. The plugin requires the following fields:

* **File**: The path to the file to rotate.
  * Example: `/tmp/path/to/file`
* **Compress**: Compress the file with gzip.
  * Example: `true`
* **Timestamp Format**: The timestamp format to use.
  * Example: `+%Y%m%d`
* **Sudo**: Run the command as sudo.
  * Example: `true`

### File Truncate

The **File Truncate** plugin truncates a file. The plugin requires the following field:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`

### Command Try Until

The **Command Try Until** plugin tries a command until the maximum number of failed attempts is reached. The plugin requires the following fields:

* **Attempts**: The maximum number of attempts.
  * Example: `5`
* **Interval**: The interval in seconds to wait before the next attempt.
  * Example: `10`
* **Command**: The command string to execute.
  * Example: `ls /tmp`

### Local Script Workflow Step

The **Local Script Workflow Step** plugin runs an inline script locally once for the workflow. The plugin requires the following fields:

* **Script**: The shell script to execute.
  * Example: `echo "Hello, World!"`
* **Arguments**: Optional command line arguments.
  * Example: `arg1 arg2`

### Local Script Node Step

The **Local Script Node Step** plugin runs an inline script locally for each node. The plugin requires the following fields:

* **Script**: The shell script to execute.
  * Example: `echo "Hello, World!"`
* **Arguments**: Optional command line arguments.
  * Example: `arg1 arg2`
* **Temporary Path**: The temporary path where the script will be copied. Default is `/tmp`.
  * Example: `/tmp`

### Wait for Directory Exists

The **Wait for Directory Exists** plugin waits for a directory to exist. The plugin requires the following fields:

* **Directory**: The path to the directory.
  * Example: `/tmp/path/to/dir`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for File Contains

The **Wait for File Contains** plugin waits for a file to contain a specific pattern. The plugin requires the following fields:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`
* **Pattern**: The pattern to search for in the file.
  * Example: `error`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for File Exists

The **Wait for File Exists** plugin waits for a file to exist. The plugin requires the following fields:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for File Size

The **Wait for File Size** plugin waits for a file to achieve a specific size. The plugin requires the following fields:

* **File**: The path to the file.
  * Example: `/tmp/path/to/file`
* **Size**: The size in bytes.
  * Example: `1024`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for HTTP

The **Wait for HTTP** plugin waits for a URL to be reachable. The plugin requires the following fields:

* **URL**: The URL to check.
  * Example: `http://example.com`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for Munin

The **Wait for Munin** plugin waits for a Munin host to be ready. The plugin requires the following fields:

* **Host**: The host to check.
  * Example: `munin.example.com`
* **Port**: The port to check. Default is `4949`.
  * Example: `4949`
* **Commands**: The Munin commands to evaluate.
  * Example: `fetch cpu`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for Ping

The **Wait for Ping** plugin waits for a host to be reachable. The plugin requires the following fields:

* **Host**: The host to check.
  * Example: `example.com`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for Port Open

The **Wait for Port Open** plugin waits for a network service to be reachable. The plugin requires the following fields:

* **Host**: The host to check.
  * Example: `example.com`
* **Port**: The port to check.
  * Example: `80`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for Sleep Workflow Step

The **Wait for Sleep Workflow Step** plugin waits for a specified interval to elapse, running locally once for the workflow. The plugin requires the following fields:

* **Interval**: The wait interval in seconds, minutes, or hours. Example: `1s`, `1m`, `1h`.
  * Example: `10s`
* **Cycles**: The number of sleep cycles.
  * Example: `5`
* **Progress**: Show progress with dot characters.
  * Example: `true`

### Wait for Local Ping

The **Wait for Local Ping** plugin waits for a host to be reachable, running on the Rundeck server. The plugin requires the following fields:

* **Host**: The host to check.
  * Example: `example.com`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`

### Wait for Local Port Open

The **Wait for Local Port Open** plugin waits for a network service to be reachable, running on the Rundeck server. The plugin requires the following fields:

* **Host**: The host to check.
  * Example: `example.com`
* **Port**: The port to check.
  * Example: `80`
* **Interval**: The wait interval in seconds.
  * Example: `10`
* **Max Attempts**: The maximum number of attempts to try.
  * Example: `5`