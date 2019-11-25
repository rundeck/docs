# Email

The Email plugin is a builtin notification plugin that sends emails when a job succeeds or fails.

![Email Notification](~@assets/img/email-notification.png)

**Include log output**

Add the log output from the execution to the email. There are two options where put the log:

- **Attached as file to email**: put the log output as an attached file.
  The attached file extension can be controller using template settings.
  See [Email Settings: Custom Attached Log Output File](/administration/configuration/email-settings.md#custom-attached-log-output-file) above.

- **Inline to the email**: the log will be added to the email body.
  If you use custom templates, you will need to add the variable `${logoutput.data}` on the template in order to pass the log on the email body.

**Send Email to**

Enter either comma-separated email addresses for email notification, or comma-separated URLs for webhook notification.

In the field for "Send Email to" you can also use these variables as property references:

- `${job.user.name}` - the user who executed the job
- `${job.user.email}` - the email of the executing user if set in their user profile

See Also:

- [Email Settings](/administration/configuration/email-settings)
- [Email Settings: Custom Email Templates](/administration/configuration/email-settings.md#custom-email-templates)
