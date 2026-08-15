# Best Practices

A short checklist for running the MCP server against a real Rundeck instance, not just a sandbox. None of this is enforced by the server itself; it's what to set up around it.

## Before you point it at a real instance

- **Use a dedicated Rundeck user for the API token, not your own account.** If you ever need to cut off the assistant's access, you disable one token instead of your own login. It also keeps a clean audit trail: actions the assistant takes show up under that user, not mixed in with your own manual changes.

  Create the user in Rundeck, then generate its token from that user's own profile page (**User Profile → Generate API Token**).

- **Write an ACL policy scoped to that user, limiting it to what you're comfortable with an AI assistant doing.** Without one, that user (and therefore the assistant) has whatever access Rundeck's defaults grant. The ACL policy is the actual enforcement point, not the tools themselves (see the next item).

  Start narrow (specific projects, read-only, no job execution) and widen it as you get comfortable. Validate any policy with `acl_validate` before submitting it with `acl_manage`. See [ACL Tools](tools.md#acl-tools).

- **Review generated job definitions and ACL policies before they go anywhere.** `job_create`, `job_validate`, and `acl_validate` check structure only, not your organization's conventions or Rundeck's own server-side rules. See the [Tools Reference](tools.md) for exactly what each one covers.

- **Point it at a non-production instance first**, especially the first time you chain `job_create` into `api_call`'s import endpoint. Confirm the round-trip does what you expect before doing it against production.

- **Treat the API token like a credential, because it is one.** Don't put it in shell history, commit it to version control, or paste it into a shared doc or ticket. If you're using `RUNDECK_INSTANCES` for more than one environment, keep the registry file `chmod 600` and out of any repo. See [Multiple Instances](multiple-instances.md).

- **Rotate the token periodically, and know how to revoke it.** This is easiest with a dedicated user (first item above): revoking that one token cuts the assistant off without touching anyone else's access.

## Related

- [Tools Reference](tools.md): what each tool actually checks vs. submits
- [Multiple Instances](multiple-instances.md): the `RUNDECK_INSTANCES` registry and file permissions
- [FAQ & Troubleshooting](faq.md)
