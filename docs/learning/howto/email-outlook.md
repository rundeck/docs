# MS Outlook Email Notification How-to
Elevate your Rundeck automation workflows by seamlessly integrating Outlook email notifications. In this comprehensive guide, we will walk you through configuring Rundeck to send crucial notifications directly to your Outlook email, ensuring that essential information about job executions and system events reaches the right stakeholders promptly.

Outlook, a widely utilized email service, becomes an integral part of your automation communication strategy with Rundeck. This integration is essential for maintaining real-time awareness of your automated processes, fostering collaboration among team members, and facilitating swift responses to potential issues.

## MS Outlook E-Mail configuration step by step
1. Stop your Rundeck instance service.
2. Open the `rundeck-config.properties` file and add the following lines:

```
grails.mail.host=smtp-mail.outlook.com
grails.mail.port=587
grails.mail.username=user@outlook.com
grails.mail.default.from=user@outlook.com
grails.mail.password=xxx
grails.mail.props.debug=true
grails.mail.props.mail.smtp.auth=true
grails.mail.props.mail.smtp.starttls.enable=true
```

Save the file.<br>
3. Start the Rundeck instance.<br>
4. Now your Rundeck email notification is configured to send emails to MS Outlook. You can [configure](https://docs.rundeck.com/docs/learning/getting-started/jobs/creating-a-job.html#add-an-example-webhook-notification-to-the-example-job) your jobs to send emails.

## How to Generate an App Password for MS Outlook
1. Sign in to your account, then navigate to your [My Account page](https://myaccount.microsoft.com/). 
2. Choose "Security info" from the left navigation pane or the link in the "Security info" block, and then choose "Add method" from the "Security info" page.
3. On the "Add a method" screen, choose "App password" from the drop-down menu, then click the "Add" button.
4. Enter the app's name that requires the app password, and then press the "Next" button.
5. Copy the text from the "Password" box, paste it into the app's password space (in this case, Outlook 2010), and then click "Done."
6. Once produced, utilize this App Password where `grails.mail.password=xxxx` is indicated in the `rundeck-config.properties` file.

## Resources
* [Rundeck E-Mail notification configuration](https://docs.rundeck.com/docs/administration/configuration/email-settings.html) 
* [Outlook app password generation](https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137) 