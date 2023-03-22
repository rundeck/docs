# Custom Logging

By default all logs will be written to the directory `${RUNNER_LAUNCH_DIR}/runner/logs`.
The `runner.log` is the main log.
The `operations.log` mainly contains information about the receipt and completion of operations.

## Alternative Logging Modes

### Write logs to output console

If you want to log all data to the console you can do this by setting either of the following:

- Environment variable
    `RUNNER_LOG_OUTPUT=console`

- System property
    `-Drunner.log.output=console`

### Write logs in json format

If you want to use a logging system that handles json formatted logs you can turn this one by doing:

- Environment variable
    `RUNNER_LOG_OUTPUT=json`

- System property
    `-Drunner.log.output=json`

The logs will be written to the `${RUNNER_LAUNCH_DIR}/runner/logs`
but will be named `runner-json.log` and `operations-json.log`

## Custom Logging

The Runner uses the Log4j2 system to log all operations.

You can pass your own Log4j2 configuration to the Runner by launching with the System property `-Dlog4j2.configurationFile=your_log4j2_config_file.xml`

[See Apache's site more information about configuration of Log4j2.](https://logging.apache.org/log4j/2.x/manual/configuration.html)
