# Build a Custom Email Notification Template

Rundeck's built-in job notification email covers the essentials out of the box: execution status, a link back to the job, description, node results, and log output. It's built with a table-based, email-safe layout, which is the standard approach for HTML email — but no single template renders identically everywhere. Outlook's desktop client uses Microsoft Word's rendering engine instead of a browser engine, and some Android mail apps strip parts of embedded stylesheets, so both are common sources of rendering differences.

Rather than chasing pixel-perfect rendering across every email client, Rundeck lets you supply your own notification template. This guide walks through building one.

:::tip
Though these instructions reference Rundeck, they also apply to the Enterprise versions of the product, PagerDuty [Runbook Automation](https://www.pagerduty.com/platform/automation/runbook/).
:::

## Overview

A custom template can be a full HTML or Markdown file on the Rundeck server's filesystem, referenced by a property in `rundeck-config.properties`. You can set it globally, per-trigger (`start`/`success`/`failure`), or per project-and-job — the most specific setting wins. See [Email Settings - Custom Email Templates](/administration/configuration/email-settings.md#custom-email-templates) for the complete property reference; this guide focuses on how to actually author the template file.

## Step 1: Decide the scope of your customization

Pick the narrowest property that fits your need:

```properties
# applies to all notifications, any trigger/project
rundeck.mail.template.file=[path to template file]
rundeck.mail.template.subject=[custom subject line]

# applies only to a specific trigger (success, failure, or start)
rundeck.mail.[trigger].template.file=[path to template file]
rundeck.mail.[trigger].template.subject=[custom subject line]

# applies only to a specific project and job name
rundeck.mail.[project].[jobname].template.file=[path to template file]
rundeck.mail.[project].[jobname].template.subject=[custom subject line]
```

If the file path ends in `.md` or `.markdown`, it's rendered as Markdown; otherwise Rundeck treats it as raw HTML.

## Step 2: Keep the HTML email-safe

A handful of rules will keep your template rendering consistently, without needing to test against every mail client on the market:

- **Lay out with tables, not `<div>`/flexbox/grid.** Outlook desktop's Word-based engine doesn't support modern CSS layout at all; a table-based structure is the one layout approach that's safe everywhere.
- **Inline your styling** (`style="..."` attributes) rather than relying solely on a `<style>` block in `<head>`. Some Android and Gmail clients strip `<style>` blocks, so anything that matters — colors, spacing, font sizes — should also be set inline.
- **Don't gate content behind `:hover`.** A `:hover`-only expand/collapse interaction never fires on a touchscreen, so content hidden behind it can become permanently invisible on mobile mail apps. If something should be visible, render it visible by default.
- **Favor a simple, reliably-rendering template over a fancier one that breaks somewhere.** A plain, well-structured layout that looks the same (if a little plain) in Outlook, Gmail, and Android beats one that looks great in one client and drops content in another.

## Step 3: Reference execution data

Your template's subject, file path, and body can all use `${group.key}` property references. Available values include:

- `execution.*` and `job.*` — see [Notification Plugin - Execution Data](/developer/notification-plugins.md#execution-data) for the full list.
- `option.name` — any job option, as `${option.name}`.
- `rundeck.href` — URL to the Rundeck server.
- `notification.trigger` — the trigger name (`start`, `success`, `failure`).
- `notification.eventStatus` — a status string suitable for a subject line, e.g. `SUCCESS`, `FAILURE`, `STARTING`.
- `execution.projectHref` — URL to the project.

## Step 4: A minimal starting template

This is a deliberately plain example — table layout, inline styles, no hover-dependent interactivity — meant as a starting point rather than a finished design:

```html
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="padding:20px;">
          <tr>
            <td style="border-left:6px solid #2E7D32;padding-left:12px;">
              <h2 style="margin:0;font-size:20px;">${job.name}</h2>
              <p style="margin:4px 0;color:#555;font-size:14px;">${notification.eventStatus} &mdash; ${execution.project}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 0;">
              <a href="${execution.href}" style="color:#1565C0;text-decoration:none;">View execution details</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-top:1px solid #EEEEEE;font-size:13px;color:#555;">
              Started: ${execution.dateStarted}<br/>
              Status: ${execution.status}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

## Step 5: Point Rundeck at your template

Stop the Rundeck service, add the property to `rundeck-config.properties`, and restart:

```properties
rundeck.mail.template.file=/etc/rundeck/templates/job-notification.html
rundeck.mail.template.subject=[${notification.eventStatus}] ${job.name}
```

## Step 6: Test in the clients your team actually uses

Trigger a test execution and check the notification in the mail clients your organization actually uses. At minimum, check Outlook desktop and an Android mail app if either is in use — these are the two most likely to diverge from Gmail/webkit-based rendering. There's no need to validate against every email client that exists; just the ones relevant to your recipients.

## Resources

* [Email Settings - Custom Email Templates](/administration/configuration/email-settings.md#custom-email-templates) (full property reference)
* [Notification Plugin - Execution Data](/developer/notification-plugins.md#execution-data)
* [Job Notifications](/learning/getting-started/jobs/creating-a-job.md#add-an-example-webhook-notification-to-the-example-job)
