# Gmail Email Notification How-to
Rundeck, with its powerful automation capabilities, becomes even more valuable when paired with effective notification configurations. This guide will focus on integrating Gmail notifications into your Rundeck workflows, enabling timely alerts and updates.

Email notifications are a crucial workflow management component, ensuring that key stakeholders are informed about job executions and system status. By configuring Gmail notifications in Rundeck, you can seamlessly integrate this communication channel into your automation processes.

This step-by-step guide will walk you through the process, allowing you to enhance the visibility and responsiveness of your Rundeck automation setup. Let's dive in!

## Gmail configuration step by step
1. Stop your Rundeck instance service.
2. Open the `rundeck-config.properties` file and add the lines:

```
grails.mail.host=smtp.gmail.com
grails.mail.port=587
grails.mail.username=user@gmail.com
grails.mail.password=xxxx
grails.mail.props.mail.smtp.auth=true
grails.mail.props.mail.smtp.starttls.enable=true
grails.mail.props.mail.smtp.starttls.required=true
```

Then save the file.  
3. Start the Rundeck Service.  
4. Now your Rundeck email notification is configured to send emails through Gmail, which you can [use](https://docs.rundeck.com/docs/learning/getting-started/jobs/creating-a-job.html#add-an-example-webhook-notification-to-the-example-job) on your jobs.

## How to Generate an App Password for Gmail
Note: To create an app password, you need 2-step Verification on the Google Account.
1. Navigate to your [Google Account](https://myaccount.google.com/).
2. Click the "Security" button.
3. Select "2-Step Verification" under "Signing in to Google."
4. Scroll down to the bottom of the page and click on App passwords.
5. Give the app a name that will assist you in remembering where you'll use the password.
6. Click the "Generate" button.
7. Follow the prompts on your screen to enter the app password. The app password is the generated 16-character code.
8. Click "Done".
9. Once produced, enter this App Password where `grails.mail.password=xxxx` is stated in the `rundeck-config.properties` file.

## Resources
* [Rundeck E-Mail notification configuration](https://docs.rundeck.com/docs/administration/configuration/email-settings.html)
* [Gmail app password generation](https://support.google.com/accounts/answer/185833?hl=en)