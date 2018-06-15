% SQLRunner Plugin (Pro)

The SQLRunner plugin is a node step plugin included Rundeck Pro that executes a .sql script against a JDBC URL.

## Usage

Add "SQLRunner Plugin" as a step in a workflow.

Provider name: `org.rundeck.sqlrunner.SQLRunnerNodeStepPlugin`

## Configuration

* *SQL script path*: Path to the sql script
* *JDBC Driver class name*: e.g. `com.mysql.jdbc.Driver`
* *JDBC url*: full JDBC url to use for connections
* *Database username* connection username
* *Database password* connection password
* *Auto commit flag*: if true, a `Connection::commit()` will be called after the script.

## Example Job XML

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<joblist>
  <job>
    <description></description>
    <executionEnabled>true</executionEnabled>
    <id>c9704ff9-c34f-455e-aa4b-8f98eae9ed5b</id>
    <loglevel>INFO</loglevel>
    <name>SQL Test</name>
    <scheduleEnabled>true</scheduleEnabled>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <node-step-plugin type='org.rundeck.sqlrunner.SQLRunnerNodeStepPlugin'>
          <configuration>
            <entry key='commit' value='true' />
            <entry key='jdbcDriver' value='com.mysql.jdbc.Driver' />
            <entry key='jdbcUrl' value='asdf' />
            <entry key='password' value='password' />
            <entry key='scriptPath' value='/var/sql/dbupdate.sql' />
            <entry key='user' value='user' />
          </configuration>
        </node-step-plugin>
      </command>
    </sequence>
    <uuid>c9704ff9-c34f-455e-aa4b-8f98eae9ed5b</uuid>
  </job>
</joblist>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
