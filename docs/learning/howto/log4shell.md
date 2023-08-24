# Find Log4Shell with Rundeck

Rundeck prepared a blog about how a Rundeck Administrator might chase down an security vulnerability like the recent issues in Log4j.  This learning article discusses some of the technical details covered in that article and expands on the ideas with steps to implementing a Rundeck Health Check to keep an eye out for vulnerable nodes.

[You can read the full Blog article here](https://www.rundeck.com/blog/chasing-log4shell-with-automation-mindset)

In this table are the two job exports from the demonstration video in the blog.

:::warning Disclaimer
These jobs are provided as examples only to illustrate a design pattern and are not intended to provide security for any environment.  Since this was recorded LunaSec may have issued newer versions of the tool so be sure to adjust the jobs for the latest version.

You might also notice that when scanning Rundeck 3.4.8 (you did upgrade to the latest version right!!??) the tool prior to version 1.4 identifies a vulnerability in the Log4j 2.16 package as 2.14.  We have confirmed this is a false positive in Log4Shell and is fixed in 1.4.0.  Be assured Rundeck 3.4.8 is patched and protected from CVE-2021-44228 and CVE-2021-45046.
:::

To add the job definitions to a project of your own follow these steps:

1. Save the text below to a file called `installation.yaml` / `scanner.yaml` respectively.
1. Navigate to the **Jobs** section of your _Project_.
1. Click **Job Actions** > **Upload Definition**
1. Choose the `installation.yaml` file and click **Upload**.  (Repeat for `scanner.yaml`)
1. Run the _Scan Directory for Log4Shell_ job.  (No need to run the install job first.  The scanner job does that if it's missing.)

:::: tabs
::: tab Installation Job
```
- defaultTab: nodes
  description: ''
  executionEnabled: true
  loglevel: INFO
  name: Install Log4Shell
  nodeFilterEditable: false
  nodefilters:
    dispatch:
      excludePrecedence: true
      keepgoing: false
      rankOrder: ascending
      successOnEmptyNodeFilter: false
      threadcount: '3'
    filter: .*
  nodesSelectedByDefault: true
  plugins:
    ExecutionLifecycle: null
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    - description: Install Log4Shell Scanner
      fileExtension: sh
      interpreterArgsQuoted: false
      script: |-
        wget -O /usr/bin/log4shell https://github.com/lunasec-io/lunasec/releases/download/v1.4.0-log4shell/log4shell_1.4.0-log4shell_Linux_x86_64
        chmod 755 /usr/bin/log4shell
      scriptInterpreter: sudo
    keepgoing: false
    strategy: node-first
```
:::
::: tab Scanning Job
```
- defaultTab: nodes
  description: ''
  executionEnabled: true
  loglevel: INFO
  name: Scan Directory with Log4Shell
  nodeFilterEditable: true
  nodefilters:
    dispatch:
      excludePrecedence: true
      keepgoing: true
      rankOrder: ascending
      successOnEmptyNodeFilter: false
      threadcount: '3'
    filter: .*
  nodesSelectedByDefault: true
  options:
  - label: Directory to Scan
    name: DirectoryPath
    value: /
  plugins:
    ExecutionLifecycle: {}
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    - description: Check Log4Shell Version
      errorhandler:
        jobref:
          group: ''
          name: Install Log4Shell
          nodeStep: 'true'
          useName: 'true'
          uuid: c89d6ff5-18a8-4165-838d-e7c1fb693c3d
        keepgoingOnSuccess: true
      exec: sudo log4shell -v
    - interpreterArgsQuoted: false
      script: |-
        if log4shell s --json --no-follow-symlinks @option.DirectoryPath@ 2>&1 | grep -q -E '(44228|45046)'
        then
          echo "Found vulnerable to Log4Shell"
          log4shell s @option.DirectoryPath@ 2>&1
          exit 1;
        fi
      scriptInterpreter: sudo
    keepgoing: false
    strategy: node-first
```
:::

## Setting up a Health Check

Health Checks (available in Process Automation) will run commands periodically to determine the health of a system.  We can apply this to the Log4Shell situation and add a Health Check to see if a machine needs to be patched.

### Setup Steps

1. Navigate to **Health Checks** in your _Project_.
1. Click the **Configure** tab.
1. Choose **Add Health Check Plugin+** button.
1. Choose **Script Health Check**
1. Fill out the following fields:
  - Node Filter: `.*`
  - Label: `Log4Shell`
  - Script: See below
  - File Extension: `sh`
  - Regex Match: `(.*)`
  - Match Key: `OUTPUT`

Health Check Script

```
if log4shell -v
then
if sudo log4shell s --json --no-follow-symlinks / 2>&1 | grep -q -E '(44228|45046)';
then
echo "UNHEALTHY";
exit 1;
else
echo "HEALTHY";
exit 0;
fi
else
echo "UNHEALTHY"
exit 1;
fi
```
> Since log4shell always returns successful we are using if statements and a grep command to check for specific CVE values and returning the status needed for the Health Check.  The script will also return UNHEALTHY if log4shell isn't installed.

:::
This exercise can be done in the Welcome Project after you have completed the [Tutorial](/learning/tutorial/).  To make sure the node find something on Node1 or Node2 download an older version of Log4j2 from the [Apache archives](https://archive.apache.org/dist/logging/log4j/).  Or run this AdHoc command against Node1. `wget https://archive.apache.org/dist/logging/log4j/2.14.0/apache-log4j-2.14.0-bin.zip`
:::
