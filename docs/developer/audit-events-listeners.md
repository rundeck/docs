# Audit Events Listener Plugins

## About

Audit event listeners plugins provides a way to capture and process certain system events related to user access to the application and its resources.

Implementing an Audit Event Listener, you can configure a process to be executed when the following events take place:

-	User logs in successfully to the application
-	Users logs out from the application
-	User fails a login attempt
-	User access a project through the UI

## Use

After installation, audit event plugins will be automatically loaded on startup and start receiving the corresponding events. 

## Service Configuration

The following service configuration options are available at `rundeck-config.properties file:

- `rundeck.audit.projectNotificationPeriod=1800` Defines the minimum period of seconds to wait between triggering repetitive events for a single project within the current session. Default 1800 (30 minutes)
- `rundeck.audit.minCacheRetentionPeriod=1800` Defines the minimum period of seconds to keep session tracking data in cache. Default 1800 (30 minutes).


## Java Plugin

::: tip
Refer to [Java Development](/developer/01-plugin-development.md#java-plugin-development) for information about developing a Java plugin for Rundeck.
:::

#### Implement the `AuditEventListenerPlugin` interface:

* [AuditEventListenerPlugin]({{{javaDocBase}}}/com/dtolabs/rundeck/core/audit/AuditEventListenerPlugin.html)

Define your class with the `@Plugin` annotation, with a service name of `AuditEventListener`

```java
/**
 * Example listener for audit events.
 * <p>
 * Use this kind of plugin to take actions when certain auditing events are triggered.
 *
 */
@Plugin(
    name = ExampleAuditListener.PROVIDER_NAME,
    service = ServiceNameConstants.AuditEventListener)
@PluginDescription(
    title = "Example Audit Plugin",
    description = "Example plugin for implementing an auditing listener")
public class ExampleAuditListener implements AuditEventListenerPlugin {

  public static final String PROVIDER_NAME = "ExampleAuditListener";

```

Add the desired configuration properties for your plugin using the `@PluginProperty` annotations. 
You can then set this properties at the `framework.properties` file using the format `framework.plugin.AuditEventListener.MyProviderName.MyPropertyName` 


```java
// will look for the 'framework.plugin.AuditEventListener.ExampleAuditListener.path' property at framework.properties.
@PluginProperty(required = true)
private String path;

// will look for the 'framework.plugin.AuditEventListener.ExampleAuditListener.filename' property at framework.properties.
@PluginProperty(
    name = "filename",
    defaultValue = "audit.log"
)
private String nameFile;
```

If you need to run initialization procedures, you can use the init() method defined by the interface:

```java
/** The PrintWriter we will use to write to a file */
private PrintWriter output = null;

/**
 * This method is called right after the plugin has been initialized and configured.
 * Use this method to perform instance initialization.
 */
@Override
public void init() {
  System.out.println("  !!! EXAMPLE AUDIT PLUGIN INITIALIZATION: " + this.toString());
  System.out.println("  !!! PATH: " + path);
  System.out.println("  !!! Filename: " + nameFile);
  System.out.println();

  File outputFile = new File(path, nameFile);
  try {
    OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(outputFile, true));
    this.output = new PrintWriter(outputStream, true);
  } catch (FileNotFoundException e) {
    e.printStackTrace();
    throw new RuntimeException(e.getMessage(), e);
  }

  // Write a header to the file.
  output.format("[%-30s] %-15s %-20s %-20s %-15s %-37s %-35s %s%n",
      "DATE",
      "USER",
      "EVENT_NAME",
      "RESOURCE_NAME",
      "HOSTNAME",
      "SERVER_UUID",
      "SESSION_ID",
      "SOURCE"
  );
}
```

#### Capturing event info

When an event is triggered, you will receive an event through the onEvent() method. The event object contains all the information related to the event. You can also access properties defined at the rundeck configuration file:

```java

/**
 * This method is called when any kind of event is triggered.
 * If a triggered event also matches any of the below methods, this method will
 * be also called BEFORE said specific method.
 *
 * @param event
 */
public void onEvent(AuditEvent event) {


  String user = event.getUserInfo().getUsername(); // Gets the username which generated the event.
  Date ts = event.getTimestamp(); // Timestamp at which the event was generated.
  List<String> roles = event.getUserInfo().getUserRoles(); // List with the auth roles of the user.

  String resourceType = event.getResourceInfo().getType();
  // Type of resource which generated the event. (IE: user, project).

  // Check if the resource associated to the event is a project.
  if (ResourceTypes.PROJECT.equals(resourceType)) {

    // Get the project name
    String projectName = event.getResourceInfo().getName();

  System.out.format("Event [%s] triggered on project [%s]: %s%n",
        event.getActionType(), projectName, event.toString());
  }

  System.out.println("\nExample Plugin On-event!!!" + event);

  // Write to file.
  // Write a header to the file.
  output.format("[%-30s] %-15s %-20s %-20s %-15s %-37s %-35s %s%n",
      event.getTimestamp(),
      event.getUserInfo().getUsername(),
      event.getResourceInfo().getType() + "_" + event.getActionType(),
      event.getResourceInfo().getName(),
      event.getRequestInfo().getServerHostname(),
      event.getRequestInfo().getServerUUID(),
      event.getRequestInfo().getSessionID(),
      event.getRequestInfo().getUserAgent()
  );

}

```

#### Event callbacks

Besides the generic onEvent() callback, the interface also provides dedicated callbacks for many of the usual events. This callback methods are called after the onEvent method, and only for the corresponding event. Use these methods if you just need to capture certain specific events:

```java
  /**
   * This method is called when an event with Action "login_success" and Resource Type "user"
   * is triggered.
   */
  public void onLoginSuccess(AuditEvent event) {

    System.out.println("\nExample Plugin onLoginSuccess!!!" + event);

  }


    /*
    It is not necessary to implement all methods, you can only implement the ones
    you need.
     */

//    /**
//     * This method is called when an event with Action "login_failed" and Resource Type "user"
//     * is triggered.
//     */
//    @Override
//    void onLoginFailed(AuditEvent event) {
//        System.out.println("\nExample Plugin onLoginFailed!!!" + event)
//    }
}

```

#### Available callbacks

Currently the available callbacks on the interface are:

- onLoginSuccess: Called when a user logins successfully.
- onLoginFailed: Called on an authentication failure event.
- onLogout: Called when a user logs out.
- onProjectView: Called when the project homepage is accessed.

