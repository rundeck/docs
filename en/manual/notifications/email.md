% Email

The Email plugin is a builtin notification plugin that sends emails when a job succeeds or fails.

Enter either comma-separated email addresses for email notification, or comma-separated URLs for webhook notification.

In the field for "Send Email to" you can also use these variables as property references:

* `${job.user.name}` - the user who executed the job
* `${job.user.email}` - the email of the executing user if set in their user profile

See Also:

* [[page:administration/configuration/email-settings.md]]
* [[page:administration/configuration/email-settings.md#custom-email-templates]]
