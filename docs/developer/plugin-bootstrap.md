# Plugin Bootstrap Tool

## Overview

The [Rundeck Plugin Bootstrap](https://github.com/rundeck/plugin-bootstrap) tool is a command-line utility that generates complete plugin project scaffolding, allowing you to start developing Rundeck plugins in minutes rather than hours.

Instead of manually creating project structures, gradle configurations, and boilerplate code, the bootstrap tool generates everything you need with a single command. You get a working plugin project with build files, test structure, and template code that you can immediately customize.

## What It Generates

When you run the bootstrap tool, it creates:

- **Complete project structure** - Organized directories for source, tests, and resources
- **Build configuration** - Gradle build files with proper Rundeck dependencies
- **Template plugin code** - Java, Groovy, or Script templates for your plugin type
- **Test scaffolding** - Test files and testing setup
- **README file** - Documentation template for your plugin
- **Makefile** - Build automation commands
- **Everything configured** - Ready to build and deploy immediately

## Why Use Plugin Bootstrap

**Without Bootstrap:**
1. Create project structure manually
2. Set up gradle/maven configuration
3. Add Rundeck dependencies (find correct versions)
4. Write boilerplate plugin code
5. Configure manifest/metadata
6. Set up testing framework
7. ⏱️ 1-2 hours before writing actual logic

**With Bootstrap:**
1. Run one command
2. ✅ Complete working plugin in seconds
3. Start writing your plugin logic immediately

## Installation

### From Source (Recommended)

Clone and build the bootstrap tool:

```bash
git clone https://github.com/rundeck/plugin-bootstrap.git
cd plugin-bootstrap
./gradlew build
tar -xf build/distributions/rundeck-plugin-bootstrap.tar
```

The executable will be at: `rundeck-plugin-bootstrap/bin/rundeck-plugin-bootstrap`

### From Package (DEB)

```bash
sudo dpkg -i rundeck-plugin-bootstrap-X.Y.Z-1_all.deb
```

### From Package (RPM)

```bash
sudo rpm -i rundeck-plugin-bootstrap-X.Y.Z-1.noarch.rpm
```

## Usage

### Basic Command

```bash
rundeck-plugin-bootstrap \
  -n <PluginName> \
  -t <PluginType> \
  -s <ServiceType> \
  -d <DestinationDirectory>
```

### Command Options

| Option | Short | Description |
|--------|-------|-------------|
| `--pluginName` | `-n` | Name of your plugin (e.g., "MyNodeExecutor") |
| `--pluginType` | `-t` | Plugin implementation type: `java`, `script`, or `ui` |
| `--serviceType` | `-s` | Rundeck service type (see tables below) |
| `--destinationDirectory` | `-d` | Directory where plugin project will be created |

### Help Command

```bash
rundeck-plugin-bootstrap help
```

## Supported Plugin Types

### Java Plugin Services

Generate Java-based plugins for these services:

| Service Type | Flag Value | Description |
|--------------|------------|-------------|
| **Workflow Step** | `WorkflowStep` | Execute once per job |
| **Node Step** | `WorkflowNodeStep` | Execute per node |
| **Notification** | `Notification` | Send job event notifications |
| **Resource Model Source** | `ResourceModelSource` | Provide node inventory |
| **Node Executor** | `NodeExecutor` | Execute commands on nodes |
| **Log Filter** | `LogFilter` | Filter/transform log output |
| **Orchestrator** | `Orchestrator` | Control node execution order |
| **Option Values** | `Option` | Provide dynamic option values |

**Example:**
```bash
rundeck-plugin-bootstrap -n SlackNotifier -t java -s Notification -d ~/projects
```

### Script Plugin Services

Generate script-based plugins for these services:

| Service Type | Flag Value | Description |
|--------------|------------|-------------|
| **Node Step** | `WorkflowNodeStep` | Execute per node (local) |
| **Remote Script** | `RemoteScriptNodeStep` | Generate scripts for remote execution |
| **Resource Model Source** | `ResourceModelSource` | Provide node inventory |
| **Node Executor** | `NodeExecutor` | Execute commands on nodes |
| **File Copier** | `FileCopier` | Copy files to nodes |
| **Both Executor + Copier** | `NodeExecutorFileCopier` | Generate both plugins |
| **Option Values** | `Option` | Provide dynamic option values |

**Example:**
```bash
rundeck-plugin-bootstrap -n CustomExecutor -t script -s NodeExecutor -d ~/projects
```

### UI Plugin Services

Generate UI-based plugins:

| Service Type | Flag Value | Description |
|--------------|------------|-------------|
| **UI Plugin** | `UI` | Add custom UI components |

**Example:**
```bash
rundeck-plugin-bootstrap -n DashboardWidget -t ui -s UI -d ~/projects
```

## Common Examples

### Create a Node Step Plugin (Java)

```bash
rundeck-plugin-bootstrap \
  -n ApiIntegration \
  -t java \
  -s WorkflowNodeStep \
  -d ~/projects
```

**Generates:**
- `~/projects/apiintegration/` directory
- Complete Java project with Gradle build
- Template plugin implementing NodeStepPlugin
- Test scaffolding
- README and Makefile

**Next steps:**
```bash
cd ~/projects/apiintegration
# Edit src/main/java/.../ApiIntegration.java
./gradlew build
# Plugin JAR is in build/libs/
```

### Create a Notification Plugin (Java)

```bash
rundeck-plugin-bootstrap \
  -n TeamsNotifier \
  -t java \
  -s Notification \
  -d ~/projects
```

### Create a Node Executor (Script)

```bash
rundeck-plugin-bootstrap \
  -n CustomSSH \
  -t script \
  -s NodeExecutor \
  -d ~/projects
```

**Generates:**
- Script plugin structure
- plugin.yaml template
- Shell script template
- Gradle build for packaging

### Create Resource Model Source (Java)

```bash
rundeck-plugin-bootstrap \
  -n CloudInventory \
  -t java \
  -s ResourceModelSource \
  -d ~/projects
```

### Create Option Values Plugin (Script)

```bash
rundeck-plugin-bootstrap \
  -n EnvironmentList \
  -t script \
  -s Option \
  -d ~/projects
```

## Development Workflow

### 1. Generate Plugin Scaffold

```bash
rundeck-plugin-bootstrap -n MyPlugin -t java -s WorkflowStep -d ~/dev
```

### 2. Develop Your Plugin

```bash
cd ~/dev/myplugin
# Edit the generated plugin class in src/main/java/
# Implement your plugin logic
```

### 3. Build and Test

```bash
# Run tests
./gradlew test

# Build plugin JAR
./gradlew build
```

### 4. Deploy to Rundeck

```bash
# Copy to Rundeck plugins directory
cp build/libs/myplugin-*.jar $RDECK_BASE/libext/

# Or for development
cp build/libs/myplugin-*.jar /var/lib/rundeck/libext/
```

### 5. Test in Rundeck

- Restart Rundeck
- Create or edit a job
- Your plugin appears in the appropriate plugin selector
- Test with real executions

## Using for Testing During Development

The bootstrap tool is also valuable for creating test harnesses:

**Fast Development Testing Workflow:**

1. Generate a test plugin of the same type you're developing
2. Write tests that exercise the plugin functionality
3. Run tests quickly without full Rundeck startup
4. Iterate rapidly on plugin logic
5. Final testing in Rundeck UI

**Example Test Structure:**

The generated projects include test templates. Use them to:
- Mock ExecutionContext and dependencies
- Test plugin logic in isolation
- Verify configuration property handling
- Test error conditions
- Run quickly in your IDE

See [example tests](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/blob/master/src/test/groovy/com/dtolabs/rundeck/plugin/resources/ec2/EC2ResourceModelSourceSpec.groovy) for reference.

## Generated Project Structure

### Java Plugin Structure

```
myplugin/
├── build.gradle              # Gradle build with Rundeck dependencies
├── settings.gradle
├── README.md                 # Plugin documentation template
├── Makefile                  # Build shortcuts
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/plugin/myplugin/
    │   │       ├── MyPlugin.java        # Your plugin implementation
    │   │       ├── Constants.groovy     # Constants and configuration
    │   │       └── ExampleApis.groovy   # API integration helpers
    │   └── resources/
    │       └── resources/
    │           └── icon.png             # Plugin icon
    └── test/
        └── groovy/
            └── com/plugin/myplugin/
                └── MyPluginSpec.groovy  # Spock tests
```

### Script Plugin Structure

```
myplugin/
├── build.gradle              # Gradle build for packaging
├── README.md
├── Makefile
└── contents/
    ├── plugin.yaml           # Plugin metadata and configuration
    └── myplugin.sh          # Your plugin script
```

## Customizing Generated Plugins

After generation, customize:

### 1. Plugin Metadata

**Java (annotations):**
```java
@Plugin(service="WorkflowStep", name="my-plugin")
@PluginDescription(title="My Plugin", description="Does something useful")
```

**Script (plugin.yaml):**
```yaml
name: My Plugin
version: 1.0
author: Your Name
```

### 2. Configuration Properties

**Java:**
```java
@PluginProperty(title = "API Key", required = true)
private String apiKey;
```

**Script (plugin.yaml):**
```yaml
config:
  - name: api_key
    title: API Key
    type: String
    required: true
```

### 3. Implementation Logic

Replace template code with your actual logic:
- API calls
- Data processing
- Error handling
- Output generation

### 4. Tests

Enhance generated tests to cover your logic:
- Test success paths
- Test error conditions
- Test configuration handling
- Test edge cases

## Tips and Best Practices

### Naming Conventions

**Plugin Names:**
- Use PascalCase: `MyAwesomePlugin`
- Be descriptive: `JiraTicketCreator` not `JiraPlugin`
- Avoid generic names: `CustomApiStep` not `Step`

**Result:**
- Generated project uses lowercase: `myawesomeplugin/`
- Java class: `MyAwesomePlugin.java`
- Service name: `my-awesome-plugin` or `myawesomeplugin`

### Building After Generation

```bash
# First build
cd myplugin
./gradlew build

# Build output
ls build/libs/
# myplugin-1.0.jar
```

### Rapid Iteration

**For Script Plugins:**
- No compilation needed
- Edit script directly
- Repackage with `make` or `gradle build`
- Copy to Rundeck `libext`

**For Java Plugins:**
- Edit Java source
- `./gradlew build`
- Copy JAR to `libext`
- Restart Rundeck

### IDE Integration

Import the generated project into your IDE:

**IntelliJ IDEA:**
```bash
# After generation
cd myplugin
idea .  # Or File > Open > select build.gradle
```

**VS Code:**
```bash
cd myplugin
code .
```

## Troubleshooting

### Command Not Found

**Check:**
- Bootstrap tool is built: `./gradlew build` in plugin-bootstrap repo
- Tool is extracted: Check `rundeck-plugin-bootstrap/bin/` directory
- Path is correct: Use full path or add to `$PATH`

### Generation Fails

**Check:**
- All required options provided: `-n`, `-t`, `-s`, `-d`
- Destination directory exists and is writable
- Plugin name is valid (no spaces or special characters)
- Service type is supported for the plugin type chosen

### Build Fails After Generation

**Check:**
- Java/Gradle installed and accessible
- Internet connection available (for dependency downloads)
- Generated build.gradle has correct Rundeck version

## Limitations

**Not Supported:**
- Some newer plugin types may not have templates yet
- Groovy plugins (only Java, Script, and UI)
- Custom project structures beyond templates

**Workarounds:**
- Generate closest matching type and adapt
- Use as starting point, then customize structure
- Refer to example plugins for newer types

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - Developing Java plugins
- [Script Plugin Development](/developer/script-plugin-development.md) - Developing script plugins
- [Plugin Development Overview](/developer/) - Choosing your approach
- [GitHub Repository](https://github.com/rundeck/plugin-bootstrap) - Source code and issues
