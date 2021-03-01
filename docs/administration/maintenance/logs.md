# Logs

Depending on the installer used, the log files will be under a base
directory:

- RPM: `/var/log/rundeck`
- Launcher: `$RDECK_BASE/server/logs`

The following files will be found in the log directory:

     .
     |-- command.log
     |-- rundeck.audit.log
     |-- rundeck.jobs.log
     |-- rundeck.options.log
     |-- rundeck.log
     `-- service.log

Different facilities log to their own files:

- `command.log`: Shell tools log their activity to the command.log
- `rundeck.audit.log`: Authorization messages pertaining to aclpolicy
- `rundeck.job.log`: Log of all job definition changes
- `rundeck.options.log`: Logs remote HTTP requests for Options JSON data
- `rundeck.log`: General Rundeck application messages
- `service.log`: Standard input and output generated during runtime

See the [#log4j-properties](/administration/configuration/config-file-reference.md#log4j-properties) section for information
about customizing log message formats and location.

## Streaming log plugins

Streaming log plugins have two forms:

Streaming Log Writers
: can write log data to another system (e.g. a search or log storage system) as the log data is received. Multiple Log Writers can be configured for a server, and Rundeck's filesystem-based log writer is used by default.

Streaming Log Readers
: can load the log data from another system, rather than from the local file system. Only a single Log Reader can be configured for the a server, and Rundeck's filesystem-based log reader is used by default.

To learn how to develop your own Logging plugin
see [Plugin Developer Guide - Logging Plugin](/developer/06-logging-plugins.md).

## Rotation of service.log (Linux)

**Required:** `logrotate` installed in system.

#### Create logrotate configuration file

     cat << EOF > /etc/logrotate.d/theRundeckLog
     /var/log/rundeck/service.log {
      su root root
      copytruncate
      daily
      missingok
      rotate 7
      compress
      delaycompress
      notifempty
      create 640 root adm
     }
     EOF

**Full documentation and examples can be seen with `man logrotate`**

#### Create cron schedule as needed, i.e monthly rotation

     echo "@monthly root logrotate /etc/logrotate.d/theRundeckLog" >> /etc/crontab

#### Test rotation rules and configurations

     logrotate --debug --force /etc/logrotate.d/theRundeckLog

**Output should be seen as**

     reading config file theRundeckLog
	Allocating hash table for state file, size 15360 B
	Handling 1 logs
	rotating pattern: /var/log/rundeck/service.log after 1 days (7 rotations)
	empty log files are not rotated, old logs are removed
	considering log /var/log/rundeck/service.log
	...

**New service.log backups should be created within service.log directory**

## Rotation of service.log (Windows)

**Method 1: Powershell script**

```powershell
# SERVICE.LOG ROTATION CONFIGS ########################
$Verbose = "true" # true | false
$SkipClear = "true" # true | false # skip clearing service.log for testing
$Every = "month" # start | hour | day | month | size
$MaxCount = 5 # limit of files to rotate
$MaxSize = 2MB # limit of file size to rotate
$LogPath = ".\var\logs"
$LogFile = "service.log"
$RotationFile = "rotation.log"
$RundeckBat = "rundeckd.bat"
$RundeckService = "rundeckd"
########################################################

$ServiceLog = "$LogPath\$LogFile"
$RotationLog = "$LogPath\$RotationFile"
$WorkingDir = (Get-Location).Path
$DateNow = Get-Date -Format yyyyMMddhhmmss
$Launcher = "$Launcher -jar $RundeckWar"
$ZipLogs = Get-ChildItem -Path $LogPath -Filter "*.zip"

Function RotateLog($Log) {
  Try {
    $MessageSuccess = "$DateNow - ROTATION SUCCESSFUL [$Every] : $ServiceLog-$DateNow.zip"
    $MessageFailed = "$DateNow - ROTATION FAILED [$Every] : $Log is being used or not found"
    Compress-Archive -Path "$Log" -DestinationPath "$ServiceLog-$DateNow.zip" -CompressionLevel Optimal -Force
    if ($SkipClear.ToLower() -EQ "false") { Clear-Content -Path $ServiceLog -Force }
    Add-Content -Value $MessageSuccess -Path $RotationLog -Encoding Utf8 -Force
    if ($Verbose.ToLower() -EQ "true") { Write-Output "$MessageSuccess" }
  } Catch {
    Add-Content -Value $MessageFailed -Path $RotationLog -Encoding Utf8 -Force
    if ($Verbose.ToLower() -EQ "true") { Write-Output "$MessageFailed" }
  }
}

Function RotateByTime($Time) {
  ForEach ($Log in $ZipLogs) {
    if ($Log.Name.Contains((Get-Date -Format "$Time"))) {
      Expand-Archive -Path "$LogPath\$Log" -DestinationPath "$ENV:TEMP\$LogFile-temp" -Force
      Add-Content -Value (Get-Content -Path "$ENV:TEMP\$LogFile-temp\$LogFile") -Path "$ENV:TEMP\$LogFile" -Force
      Remove-Item -Path "$ENV:TEMP\$LogFile-temp" -Recurse -Force
      Remove-Item -Path "$LogPath\$Log" -Force
    }
  }
  if ((Test-Path -Path "$ENV:TEMP\$LogFile") -EQ $true) {
    RotateLog("$ENV:TEMP\$LogFile")
    Remove-Item -Path "$ENV:TEMP\$LogFile" -Force
  } else { RotateLog("$ServiceLog") }
}

Function RotateBySize {
  if (((Get-ChildItem -Path "$ServiceLog").Length / 1MB) -GT ($MaxSize / 1MB)) {
    RotateLog("$ServiceLog")
  }
}

Function DoRotation {
  # start
  if ($Every.ToLower() -EQ "start") { if (($ZipLogs).Count -LT $MaxCount) { RotateLog("$ServiceLog") } }

  # hourly
  if ($Every.ToLower() -EQ "hour") { RotateByTime("yyyyMMddhh") }

  # daily
  if ($Every.ToLower() -EQ "day") { RotateByTime("yyyyMMdd") }

  # monthly
  if ($Every.ToLower() -EQ "month") { RotateByTime("yyyyMM") }

  # size
  if ($Every.ToLower() -EQ "size") { RotateBySize }
}

# IMPORTANT: Windows will lock service.log file while in use by Rundeck. Must be done when service is down.

# before starting rundeck service
DoRotation
Start-Service -Name $RundeckService

# after terminating rundeck service
Stop-Service -Name $RundeckService
DoRotation
```

**Method 2: `LogRotateWin` (Windows version of logrotate)**

**Download from official repo, install in system** `https://sourceforge.net/projects/logrotatewin/files/`

#### Create logrotate configuration file

     C:\Rundeck\var\log\service.log {
      copytruncate
      daily
      missingok
      rotate 7
      compress
      delaycompress
      notifempty
      create
     }

**Full documentation and examples can be seen in `https://sourceforge.net/p/logrotatewin/wiki/LogRotate/`**

#### Create task schedule as needed, i.e

     C:\> SCHTASKS /TN RundeckRotation /SC DAILY /ST 00:00 /TR "logrotate C:\LogRotateConfigs\Rundeck.conf"

#### Test rotation rules and configurations

     C:\> logrotate --debug --force C:\LogRotateConfigs\Rundeck.conf

**Output should be seen as**

     reading config file C:\LogRotateConfigs\Rundeck.conf
	Allocating hash table for state file, size 15360 B
	Handling 1 logs
	rotating pattern: C:\Rundeck\var\log\service.log after 1 days (7 rotations)
	empty log files are not rotated, old logs are removed
	considering log C:\Rundeck\var\log\service.log
	...

**New service.log backups should be created within service.log directory**

