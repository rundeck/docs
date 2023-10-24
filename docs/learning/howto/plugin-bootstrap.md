# Use the plugin bootstrap tool
[Here](https://github.com/rundeck/plugin-bootstrap/releases) you can download the latest release of the plugin-bootstrap tool.

### Installing from zip file
Download the tar or zip distribution, and use the tool `<extraction-path>/bin/rundeck-plugin-bootstrap`.

### Installing from deb package
```bash
sudo dpkg -i <download-path>/rundeck-plugin-bootstrap-X.Y.Z-1_all.deb
```

### Installing from rpm package
```bash
sudo rpm -i <download-path>/rundeck-plugin-bootstrap-X.Y.Z-1.noarch.rpm
```

### Check the available options
To confirm that you have the bootstrap tool, run:

```bash
rundeck-plugin-bootstrap --help

Usage: plugin-bootstrap [-hV] -d=<destinationDirectory> -n=<pluginName>
                        -s=<serviceType> -t=<pluginType>
Create a Rundeck plugin artifact.
  -d, --destinationDirectory=<destinationDirectory>
                  The directory in which the artifact directory will be generated
  -h, --help      Show this help message and exit.
  -n, --pluginName=<pluginName>
                  Plugin Name.
  -s, --serviceType=<serviceType>
                  Rundeck Service Type: ResourceModelSource, Notification,
                    WorkflowStep, WorkflowNodeStep, LogFilter, NodeExecutor,
                    Orchestrator, FileCopier, RemoteScriptNodeStep,
                    NodeExecutorFileCopier, Option, UI
  -t, --pluginType=<pluginType>
                  Plugin Type: java, script, ui
  -V, --version   Print version information and exit.
```

### Generate the Java plugin project structure

Now we're ready to generate the Java plugin project structure using the `rundeck-plugin-bootstrap` tool.

```bash
rundeck-plugin-bootstrap -d rundeck-plugins/ -n hellojava -t java -s WorkflowStep

Plugin generated at: rundeck-plugins/hellojava
```

Then we initialize the Gradle build script.

```bash
cd rundeck-plugins/hellojava
gradle wrapper

BUILD SUCCESSFUL in 1s
1 actionable task: 1 executed
```

## Verify that we can deploy the plugin

### Running the example tests

To verify that our environment is set up correctly, we can run the plugin tests that the bootstrap tool generated:

```bash
./gradlew test
```

To package up the compiled files into a single .jar file that we can easily deploy, run:

```bash
./gradlew build
```

Now the plugin should've been generated in `build/libs/<plugin-package-name>.jar`:

```bash
ls build/libs/

hellojava-0.1.0.jar
```

### Deploying the plugin to a local environment

Deploy the new plugin on an existant instance or use a [fresh installation](/administration/install/index.html#installation). 

Once the Rundeck server is up, we must login and click the system menu gear icon, plugins submenu and click on Upload Plugin. AAA

![Upload Plugin Menu](/assets/img/upload-plugin-submenu.png)

Browse the plugin in the local filesystem or on the internet and install. 

![Browse Plugin and Install](/assets/img/hellojava-browse-plugin-n-install.png)