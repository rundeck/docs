# Rundeck CLI - Extensions

Rundeck CLI can use *extension jars* to add additional functionality.

## Using Extensions

Extension loading is disabled by default. Enable it:

```sh
export RD_EXT_DISABLED=false
```

Download an extension jar, and place it in the `RD_EXT_DIR` directory.

By default for UNIX this is located at `~/.rd/extv2`, you can override the location in your `~/.rd/rd.conf` file by adding:

``` sh
export RD_EXT_DIR=/my/ext/dir
```

When you run `rd`, the extensions will be loaded and added as commands in the hierarchy of available subcommands.

You can check the list of loaded extensions by running `rd` with `RD_DEBUG=1`.

## Develop an Extension

Extensions can be developed as Java libraries.


### Dependencies

Add the `rd-cli-lib` dependency to your project.

Starting with version `2.1.4`, `rd-cli-lib` (and `rd-api-client`) are published to PagerDuty's PackageCloud Maven repository (no credentials required to read) instead of Maven Central. Versions `2.1.3` and earlier remain permanently available on Maven Central.

Javadoc:

* [rd-cli-lib ![javadoc](https://javadoc.io/badge2/org.rundeck.cli/rd-cli-lib/javadoc.svg)](https://javadoc.io/doc/org.rundeck.cli/rd-cli-lib)


### Gradle example

~~~{groovy}
//rd-cli-lib and rd-api-client 2.1.4+ are published to PagerDuty's PackageCloud repository (no credentials required to read)
repositories {
    mavenCentral() //still needed for cli-toolbelt, and for rd-cli-lib/rd-api-client versions 2.1.3 and earlier
    maven {
        url "https://packagecloud.io/pagerduty/rundeck/maven2"
    }
}

dependencies {
    api "org.rundeck.cli:rd-cli-lib:{{$cliVersion}}"
    implementation "org.rundeck.api:rd-api-client:{{$cliVersion}}"

    implementation 'com.squareup.retrofit2:retrofit:2.7.1'
    implementation 'com.squareup.retrofit2:converter-jackson:2.7.1'
    implementation 'com.squareup.retrofit2:converter-jaxb:2.7.1'

}
~~~

## Implement `RdCommandExtension`

Argument parsing is done with [picocli](https://picocli.info). Extend `BaseCommand` (which implements
`RdCommandExtension`) and annotate the class with picocli's `@CommandLine.Command`. Methods annotated with
`@CommandLine.Command` are automatically registered as subcommands.

The following example adds the command `rd somecommand`:

```java
package com.mycompany;

import org.rundeck.client.tool.extension.BaseCommand;
import picocli.CommandLine;

@CommandLine.Command(name = "somecommand", description = "An example extension command")
public class MyClass extends BaseCommand {

    @CommandLine.Command(description = "Run the example subcommand")
    public void run(@CommandLine.Option(names = {"-m", "--message"}) String message) {
        getRdOutput().output("running somecommand: " + message);
    }
}
```

If you need direct access to the `RdTool` and output beyond what `BaseCommand` exposes, implement
`RdCommandExtension` directly instead of extending `BaseCommand`.

## Declare the Service

The `rd` tool uses the Java ServiceLoader to load extensions on the classpath.

Declare your class in a file called `META-INF/services/org.rundeck.client.tool.extension.RdCommandExtension`

    com.mycompany.MyClass

For a standard Gradle java library, create the file in `src/main/resources/META-INF/services/org.rundeck.client.tool.extension.RdCommandExtension`
