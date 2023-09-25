# Develop a Custom Groovy Plugin

One of the key features of Rundeck is its notification system, which keeps stakeholders informed about job statuses, alerts, and other critical events in workflows. While Rundeck provides a selection of built-in notification plugins, organizations may need to develop custom plugins to meet their unique requirements. The  development of custom notification plugins offers a strategic advantage in ensuring timely and contextually relevant communication.

By understanding the relevance of custom notification plugins and how they empower Rundeck users to tailor their automation environment to their unique needs, you'll be better equipped to harness the full potential of this powerful automation platform, driving operational excellence and responsiveness in your organization's IT infrastructure.

In this how-to guide we will develop a basic groovy-based notification plugin on Rundeck Community.  

_Note: The same instructions are applicable for PagerDuty Process Automation._

## What is a Rundeck Notification?

Notifications are actions that are taken when a Job begins or ends. There are five conditions that can trigger notifications:

* `onstart` - the Job has begun.. 
* `onsuccess` - the Job has finished without error.
* `onfailure` - the Job failed or was aborted.
* `onavgduration` - The Execution time exceeded the Job's average duration.
* `onretryablefailure` - the Job was unsuccessful but will be retried.

A triggered notification can be sent via email, a webhook, or by HTTP.

## What is Groovy?

Groovy is a dynamic, object-oriented programming language that runs in a Java Virtual Machine (JVM). It was designed to be a more concise and expressive alternative to Java while still leveraging the extensive Java ecosystem and libraries. 

Groovy combines features from several programming languages, including Java, Python, and Ruby, to provide a flexible and powerful language for a wide range of tasks.

Groovy is used in various contexts, including web development (Grails is a popular Groovy-based web framework), build automation (e.g., Gradle build scripts), and as a scripting language for various applications. It's known for its flexibility and developer-friendly features, making it a valuable tool for those working in the Java ecosystem.

Groovy can be used to develop several types of Rundeck plugins. This simplifies plugin development while retaining the capability of the Java language.

## Let's code

-  Create a new file called "MyNotificationPlugin.groovy" in your favorite text editor with the following contents.<br>
    ```
	import com.dtolabs.rundeck.plugins.notification.NotificationPlugin;

	/**
	* This example just prints a message on the stdout/service.log file
  	based on if the job execution is “started,”success,” or “failure.”
	*/
	rundeckPlugin(NotificationPlugin){
   	  onstart {
       	println("started!: data ${execution}")
       	true
   	  }
	
   	  onsuccess {
       	println("success!: data ${execution}")
       	true
   	  }
	
   	  onfailure {
       	println("failed!: data ${execution}")
       	true
   	  }
	}
    ```
     
  If used as written, this plugin prints execution information based on the job status.   
- Save this file in the `libext` Rundeck directory. In that way, the plugin will be automatically installed in the Rundeck Instance.  <br>
 
_Groovy plugins don't need compilation._  

## Test the plugin on the Rundeck instance

1. Create a new job, give it a name, and add a step (e.g.: a `whoami` command)  
2. Go to the "Notification" tab and click on the "On Start" section, then select the "MyNotificationPlugin" Notification Type.  
3. Do the same in the "On Success", and "On Failure" sections.  <br>
	![](~@assets/img/groovynote1.png)
1. Save the job.  
2. Execute the job and examine the stdout output (docker-based environments) or service.log (rpm/deb-based Rundeck instance) file output.  
	![](~@assets/img/groovynote2.png)<br>
If you modify the job to fail intentionally and run it again, you will see the "On Failure" string defined on the custom plugin code.

## Resources

* [Apache Groovy site](http://www.groovy-lang.org/) 
* [Rundeck Plugin development](https://docs.rundeck.com/docs/developer/01-plugin-development.html#plugin-development) 
* [Notification plugins development](https://docs.rundeck.com/docs/developer/05-notification-plugins.html)