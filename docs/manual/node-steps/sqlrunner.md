# SQLRunner Plugin (Enterprise)

The SQLRunner plugin is a node step plugin included with Rundeck Enterprise that executes a .sql script against a JDBC URL.

## Usage

Add "SQLRunner Plugin" as a step in a workflow.

Provider name: `org.rundeck.sqlrunner.SQLRunnerNodeStepPlugin`

## Configuration

- _SQL script path_: Path to the sql script
- _SQL inline script_: Alternative to sql script path.
- _Variables_: comma separated list of variables values too be used as Prepared Statement.
- _JDBC Driver class name_: e.g. `com.mysql.jdbc.Driver`
- _JDBC url_: full JDBC url to use for connections
- _Database username_ connection username
- _Database password_ connection password
- _Auto commit flag_: if true, a `Connection::commit()` will be called after the script.

## Usage of variables

The variable text field can receive a comma separated list of variables values too be used as Prepared Statement, this is, replacing a `?` variable in the script.
The list of variables  can be a list of values comma separated or using the format `type:value`.
If you omit the type, it's going to be passed as generic object to the JDBC connector, this works only on some cases.
## Example Job XML

```xml
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
```

## Example Job XML using variables

```xml
<joblist>
   <job>
      <description />
      <context>
         <options preserveOrder="true">
            <option name="name" required="true" />
         </options>
      </context>
      <executionEnabled>true</executionEnabled>
      <id>2d782a36-c06b-47fa-8ceb-7fcc9ff9fab7</id>
      <loglevel>INFO</loglevel>
      <name>SQL_test</name>v
      <scheduleEnabled>true</scheduleEnabled>
      <sequence keepgoing="false" strategy="node-first">
         <command>
            <node-step-plugin type="org.rundeck.sqlrunner.SQLRunnerNodeStepPlugin">
               <configuration>
                  <entry key="commit" value="true" />
                  <entry key="jdbcDriver" value="org.postgresql.Driver" />
                  <entry key="jdbcUrl" value="jdbc:postgresql://wintermute/rundeck" />
                  <entry key="password" value="rundeck" />
                  <entry key="scriptBody" value="INSERT INTO test (id, version, args, date) VALUES(0, ?, ?, now());" />
                  <entry key="user" value="rundeck" />
                  <entry key="variables" value="int:0,string:${option.name}" />
               </configuration>
            </node-step-plugin>
         </command>
      </sequence>
      <uuid>2d782a36-c06b-47fa-8ceb-7fcc9ff9fab7</uuid>
   </job>
</joblist>
```