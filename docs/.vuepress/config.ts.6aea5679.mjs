// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { containerPlugin } from "@vuepress/plugin-container";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { getDirname, path } from "@vuepress/utils";
import { openGraphPlugin } from "vuepress-plugin-open-graph";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { redirectPlugin } from "vuepress-plugin-redirect";
import { compareDate } from "vuepress-shared/node";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import Carousel from "vue-carousel";

// docs/.vuepress/sidebar-menus/administration.ts
var administration_default = [{
  text: "Administration Guide",
  collapsible: false,
  children: [
    {
      text: "Rundeck / Process Automation",
      collapsible: true,
      children: [
        {
          text: "Installation",
          collapsible: true,
          link: "/administration/install/index",
          children: [
            "/administration/install/index",
            "/administration/install/system-requirements",
            "/administration/install/jar",
            "/administration/install/linux-deb",
            "/administration/install/linux-rpm",
            "/administration/install/tomcat",
            "/administration/install/aws",
            "/administration/install/windows",
            "/administration/install/source",
            "/administration/install/docker",
            "/administration/install/signingkeys"
          ]
        },
        {
          text: "Upgrading",
          collapsible: true,
          link: "/upgrading/",
          children: [
            "/upgrading/",
            "/upgrading/upgrading",
            "/upgrading/upgrading-to-5.0.md",
            "/upgrading/upgrading-to-4.8.md",
            "/upgrading/upgrading-to-4.1.md",
            "/upgrading/upgrading-to-4.md",
            "/upgrading/upgrading-to-rundeck-3.4.md",
            "/upgrading/upgrading-to-rundeck-3.3.4.md",
            "/upgrading/upgrading-to-rundeck-3.3.md",
            "/upgrading/upgrading-to-rundeck-3.2.md",
            "/upgrading/upgrading-to-rundeck-3.1.md",
            "/upgrading/upgrading-to-rundeck3"
          ]
        },
        {
          text: "Licensing",
          collapsible: true,
          link: "/administration/license"
        },
        {
          text: "Runner",
          collapsible: true,
          link: "/administration/runner/",
          children: [
            "/administration/runner/",
            "/administration/runner/runner-intro.md",
            "/administration/runner/runner-setup.md",
            "/administration/runner/runner-install.md",
            "/administration/runner/runner-config.md",
            "/administration/runner/runner-using.md",
            "/administration/runner/runner-advancedsetup.md",
            "/administration/runner/runner-logging.md",
            "/administration/runner/runner-faq.md"
          ]
        },
        {
          text: "Configuration",
          collapsible: true,
          link: "/administration/configuration/",
          children: [
            "/administration/configuration/",
            {
              text: "Database",
              collapsible: true,
              children: [
                "/administration/configuration/database/",
                "/administration/configuration/database/mysql",
                "/administration/configuration/database/mssql",
                "/administration/configuration/database/secure_mssql",
                "/administration/configuration/database/oracle",
                "/administration/configuration/database/postgres"
              ]
            },
            {
              text: "Docker",
              collapsible: true,
              children: [
                { link: "/administration/configuration/docker", text: "Configuration Reference" },
                { link: "/administration/configuration/docker/extending-configuration.md", text: "Extending Configuration" }
              ]
            },
            "/administration/configuration/hashicorp-consul",
            "/administration/configuration/email-settings",
            "/administration/configuration/gui-customization",
            "/administration/configuration/localization",
            "/administration/configuration/config-file-reference",
            "/administration/configuration/system-properties",
            "/administration/configuration/encryptable-properties",
            {
              text: "Plugins",
              collapsible: true,
              children: [
                "/administration/configuration/plugins/",
                "/administration/configuration/plugins/installing",
                "/administration/configuration/plugins/plugin-types",
                "/administration/configuration/plugins/configuring",
                "/administration/configuration/plugins/bundled-plugins"
              ]
            },
            "/administration/configuration/storage-facility",
            "/administration/configuration/repository"
          ]
        },
        {
          text: "Maintenance",
          collapsible: true,
          link: "/administration/maintenance/",
          children: [
            "/administration/maintenance/",
            "/administration/maintenance/startup",
            "/administration/maintenance/logs",
            "/administration/maintenance/backup",
            "/administration/maintenance/tuning-rundeck"
          ]
        },
        {
          text: "Clustering",
          collapsible: true,
          link: "/administration/cluster/",
          children: [
            "/administration/cluster/",
            {
              text: "Load Balancer",
              collapsible: true,
              children: [
                "/administration/cluster/loadbalancer/",
                "/administration/cluster/loadbalancer/health-check",
                "/administration/cluster/loadbalancer/aws-alb",
                "/administration/cluster/loadbalancer/aws-elb",
                "/administration/cluster/loadbalancer/haproxy",
                "/administration/cluster/loadbalancer/iis",
                "/administration/cluster/loadbalancer/NGINX"
              ]
            },
            {
              text: "Log Store",
              collapsible: true,
              children: [
                "/administration/cluster/logstore/",
                "/administration/cluster/logstore/azure",
                "/administration/cluster/logstore/s3"
              ]
            },
            "/administration/cluster/autotakeover/",
            "/administration/cluster/loadbalancer/reverse_proxies",
            "/administration/configuration/remote-job-execution",
            "/administration/cluster/replication/"
          ]
        }
      ]
    },
    {
      text: "Security",
      collapsible: true,
      link: "/administration/security/default-users",
      children: [
        "/administration/security/default-users",
        "/administration/security/authentication",
        "/administration/security/authorization",
        "/administration/security/acl-policy-editor",
        "/administration/security/ssl",
        {
          text: "SSO",
          collapsible: true,
          link: "/administration/security/sso",
          children: [
            "/administration/security/sso/azure-sso.md",
            "/administration/security/sso/okta.md",
            "/administration/security/sso/ping.md"
          ]
        },
        "/administration/security/webapp-http-headers",
        "/administration/security/project-acl",
        "/administration/security/password-security",
        "/administration/security/ratelimiting",
        "/administration/security/blocklist",
        "/administration/security/audit-trail"
      ]
    }
  ]
}];

// docs/.vuepress/sidebar-menus/user-guide.ts
var user_guide_default = [{
  text: "User Guide",
  collapsible: false,
  link: "/manual/",
  children: [
    { link: "/manual/", text: "User Guide Overview" },
    {
      text: "Projects",
      collapsible: true,
      link: "/manual/projects/",
      children: [
        "/manual/projects/",
        "/manual/projects/project-create",
        "/manual/projects/configuration",
        {
          text: "SCM",
          collapsible: true,
          children: [
            "/manual/projects/scm/",
            "/manual/projects/scm/git",
            "/manual/projects/scm/job-replication"
          ]
        },
        "/manual/projects/project-readme",
        "/manual/projects/project-motd",
        "/manual/projects/plugin-control",
        "/manual/projects/project-archive",
        "/manual/projects/project-delete",
        {
          text: "Resource Model Sources",
          collapsible: true,
          children: [
            "/manual/projects/resource-model-sources/",
            "/manual/projects/resource-model-sources/aws",
            "/manual/projects/resource-model-sources/azure",
            "/manual/projects/resource-model-sources/datadog",
            "/manual/projects/resource-model-sources/ecs-fargate",
            "/manual/projects/resource-model-sources/gcp",
            "/manual/projects/resource-model-sources/kubernetes",
            "/manual/projects/resource-model-sources/builtin",
            "/manual/projects/resource-model-sources/oracle",
            "/manual/projects/resource-model-sources/node-wizard",
            "/manual/projects/resource-model-sources/resource-editor",
            "/manual/projects/resource-model-sources/sensu",
            "/manual/projects/resource-model-sources/servicenow",
            "/manual/projects/resource-model-sources/http-json",
            "/manual/projects/resource-model-sources/vmware"
          ]
        },
        {
          text: "Node Execution",
          collapsible: true,
          children: [
            //            '/manual/projects/node-execution/',
            "/manual/projects/node-execution/aws-ecs",
            "/manual/projects/node-execution/aws-ssm",
            "/manual/projects/node-execution/bastionssh",
            "/manual/projects/node-execution/builtin",
            "/manual/projects/node-execution/openssh",
            "/manual/projects/node-execution/powershell",
            "/manual/projects/node-execution/script",
            "/manual/projects/node-execution/ssh"
          ]
        }
      ]
    },
    {
      text: "Jobs",
      collapsible: true,
      link: "/manual/jobs",
      children: [
        "/manual/jobs",
        "/manual/creating-jobs",
        "/manual/job-workflows",
        "/manual/job-options",
        "/manual/jobs/job-notifications",
        {
          text: "Log Filters",
          collapsible: true,
          link: "/manual/log-filters/",
          children: [
            "/manual/log-filters/",
            "/manual/log-filters/key-value-data.md",
            "/manual/log-filters/quiet-output.md",
            "/manual/log-filters/progress-badge.md",
            "/manual/log-filters/highlight-output.md",
            "/manual/log-filters/render-formatted-data.md",
            "/manual/log-filters/mask-passwords.md",
            "/manual/log-filters/json-jq.md",
            "/manual/log-filters/multi-line-regex.md"
          ]
        },
        "/manual/job-plugins",
        "/manual/execution-lifecycle/job-resume.md",
        "/manual/execution-lifecycle/job-retry-failed-nodes.md",
        "/manual/execution-lifecycle/result-data.md",
        "/manual/execution-lifecycle/roi-metrics.md",
        "/manual/jobs/job-queue.md",
        "/manual/jobs/ai-generated-runbooks.md"
      ]
    },
    {
      text: "Plugins",
      collapsible: true,
      link: "/manual/plugins/index",
      children: [
        { text: "Overview", link: "/manual/plugins/index" },
        { text: "AWS", link: "/manual/plugins/aws-plugins-overview.md" },
        { text: "Azure", link: "/manual/plugins/azure-plugins-overview.md" },
        { text: "Datadog", link: "/manual/plugins/datadog-plugins-overview.md" },
        { text: "Google Cloud", link: "/manual/plugins/gcp-plugins-overview.md" },
        { text: "Jira", link: "/manual/plugins/jira-plugins-overview.md" },
        { text: "Kubernetes", link: "/manual/plugins/kubernetes-plugins-overview.md" },
        { text: "PagerDuty", link: "/manual/plugins/pagerduty-plugins-overview.md" },
        { text: "Sensu", link: "/manual/plugins/sensu-plugins-overview.md" },
        { text: "ServiceNow", link: "/manual/plugins/servicenow-plugins-overview.md" },
        { text: "Full List", link: "/manual/plugins/full-list" }
      ]
    },
    {
      text: "Nodes",
      collapsible: true,
      link: "/manual/05-nodes",
      children: [
        "/manual/05-nodes",
        "/manual/node-enhancers.md",
        "/manual/11-node-filters.md",
        {
          text: "Health Checks",
          collapsible: true,
          link: "/manual/healthchecks",
          children: [
            "/manual/healthchecks",
            "/manual/healthcheckplugins/datadog.md",
            "/manual/healthcheckplugins/sensu.md",
            "/manual/healthcheckplugins/azure-healthcheck.md",
            "/manual/healthcheckplugins/aws-ec2-healthcheck.md",
            "/manual/healthcheckplugins/gcp-compute-healthcheck.md"
          ]
        }
      ]
    },
    {
      text: "Key Storage",
      collapsible: true,
      link: "/manual/key-storage/index",
      children: [
        "/manual/key-storage/index",
        "/manual/key-storage/enterprise-runner-key-storage.md",
        {
          text: "Key Storage Plugins",
          collapsible: true,
          children: [
            "/manual/key-storage/storage-plugins/thycotic-storage.md",
            "/manual/key-storage/storage-plugins/vault.md",
            "/manual/key-storage/storage-plugins/cyberark-storage.md"
          ]
        }
      ]
    },
    {
      text: "Commands",
      link: "/manual/06-commands",
      collapsible: true
    },
    {
      text: "Activity",
      link: "/manual/08-activity",
      collapsible: true,
      children: [
        "/manual/08-activity",
        "/manual/07-executions"
      ]
    },
    {
      text: "Schedules (Enterprise)",
      collapsible: true,
      link: "/manual/schedules/project-schedules",
      children: [
        "/manual/schedules/project-schedules.md",
        "/manual/schedules/missedjobfires.md"
      ]
    },
    {
      text: "Tour Manager (Enterprise)",
      collapsible: true,
      link: "/manual/tour-manager.md"
    },
    {
      text: "Calendars (Enterprise)",
      collapsible: true,
      link: "/manual/calendars",
      children: [
        "/manual/calendars",
        "/manual/calendars/system-calendars.md",
        "/manual/calendars/project-calendars.md",
        "/manual/calendars/import-export.md"
      ]
    },
    {
      text: "Webhooks",
      collapsible: true,
      link: "/manual/webhooks",
      children: [
        "/manual/webhooks",
        {
          text: "Webhooks Handlers",
          children: [
            "/manual/webhooks/advanced-run-job",
            "/manual/webhooks/pagerduty-run-job",
            "/manual/webhooks/datadog-run-job.md",
            "/manual/webhooks/aws-sns-webhook",
            "/manual/webhooks/github-webhook",
            "/manual/webhooks/run-job.md",
            "/manual/webhooks/log-events.md"
          ]
        }
      ]
    },
    {
      text: "Project Settings",
      collapsible: true,
      link: "/manual/project-settings"
    },
    {
      text: "System Menu",
      collapsible: true,
      link: "/manual/system-configs",
      children: [
        "/manual/system-configs",
        "/manual/user-management/user-mgmt",
        "/manual/user-management/password-reset",
        "/manual/user-management/user-classes",
        "/manual/system-report",
        "/manual/configuration-mgmt/configmgmt"
      ]
    },
    { link: "/manual/10-user.md", text: "Profile Menu" },
    {
      text: "Integrations",
      collapsible: true,
      link: "/manual/integrations",
      children: [
        "/manual/integrations/servicenow-app.md"
      ]
    },
    {
      text: "Document Formats",
      collapsible: true,
      children: [
        "/manual/document-format-reference/aclpolicy-v10.md",
        "/manual/document-format-reference/job-v20.md",
        "/manual/document-format-reference/job-yaml-v12.md",
        "/manual/document-format-reference/resource-json-v10.md",
        "/manual/document-format-reference/resource-v13.md",
        "/manual/document-format-reference/resource-yaml-v13.md"
      ]
    }
  ]
}];

// docs/.vuepress/sidebar-menus/command-line-tools.ts
var command_line_tools_default = [{
  text: "Command Line Tool",
  collapsible: false,
  link: "/rd-cli/",
  children: [
    { link: "/rd-cli/", text: "Overview" },
    { link: "/rd-cli/install.md", text: "Installation" },
    { link: "/rd-cli/configuration.md", text: "Configuration" },
    { link: "/rd-cli/commands.md", text: "Commands" },
    { link: "/rd-cli/rd-acl.md", text: "ACL Tool" },
    { link: "/rd-cli/scripting.md", text: "Scripting" },
    { link: "/rd-cli/ssl.md", text: "SSL" },
    { link: "/rd-cli/javalib.md", text: "JAVA API Library" },
    { link: "/rd-cli/changes.md", text: "Change Log" },
    { link: "/rd-cli/extensions.md", text: "Extensions" }
  ]
}];

// docs/.vuepress/sidebar-menus/plugin-development.ts
var plugin_development_default = [{
  text: "Plugin Development",
  collapsible: false,
  children: [
    "/developer/01-plugin-development.md",
    "/developer/02-plugin-annotations.md",
    "/developer/03-model-source-format-parser-generator-plugins.md",
    "/developer/03-model-source-plugins.md",
    "/developer/03-step-plugins.md",
    "/developer/04-file-copier-plugins.md",
    "/developer/04-node-execution-plugins.md",
    "/developer/05-notification-plugins.md",
    "/developer/06-logging-plugins.md",
    "/developer/07-storage-plugin.md",
    "/developer/08-storage-converter-plugins.md",
    "/developer/09-orchestrator-plugin.md",
    "/developer/10-scm-plugins.md",
    "/developer/11-ui-plugins.md",
    "/developer/log-filter-plugins.md",
    "/developer/content-converter-plugins.md",
    "/developer/12-option-values-plugins.md",
    "/developer/13-user-group-source-plugin.md",
    "/developer/14-file-upload-plugins.md",
    "/developer/password-encrypt-utility.md",
    "/developer/16-webhook-plugins.md",
    "/developer/execution-lifecycle.md",
    "/developer/job-lifecycle.md",
    "/developer/audit-events-listeners.md"
  ]
}];

// docs/.vuepress/getChildren.js
import _ from "lodash";
import fs from "fs";
import glob from "glob";
import markdownIt from "markdown-it";
import meta from "markdown-it-meta";
var getChildren = function(parent_path, dir) {
  let files = glob.sync(parent_path + (dir ? `/${dir}` : "") + "/*.md").map((path2) => {
    let md = new markdownIt();
    md.use(meta);
    let file = fs.readFileSync(path2, "utf8");
    md.render(file);
    let order = md.meta.order;
    path2 = path2.slice(parent_path.length);
    if (path2.endsWith("index.md")) {
      path2 = path2.slice(0, -8);
    }
    return {
      path: path2,
      order
    };
  });
  const children = _.sortBy(files, ["order", "path"]).map((file) => file.path);
  return children;
};
var getChildren_default = getChildren;

// docs/.vuepress/sidebar-menus/learning.ts
var learning_default = [{
  text: "Learning",
  collapsible: false,
  children: [
    "/learning/",
    {
      text: "Getting Started",
      link: "/learning/getting-started/index",
      collapsible: true,
      children: [
        { link: "/learning/getting-started/index", text: "Overview" },
        { link: "/learning/getting-started/nodes-overview.md", text: "Introduction to Nodes" },
        { link: "/learning/getting-started/users-overview.md", text: "Introduction to Users" },
        { link: "/learning/getting-started/secrets-overview.md", text: "Introduction to Managing Secrets" },
        { link: "/learning/getting-started/acl-overview.md", text: "Introduction to Access Control" },
        {
          text: "Setup and Maintenance",
          collapsible: true,
          children: [
            { link: "/learning/getting-started/server-setup-overview.md", text: "Overview of On Premise Server Setup" },
            { link: "/learning/getting-started/projects-overview.md", text: "Setting up a Project" },
            { link: "/learning/getting-started/system-maintenance-overview.md", text: "Overview of On Premise System Maintenance" },
            { link: "/learning/getting-started/runners-overview.md", text: "Working with Runners in Process Automation" }
          ]
        },
        {
          text: "Runbook Automation",
          collapsible: true,
          link: "/learning/getting-started/rba/index",
          children: [
            { link: "/learning/getting-started/rba/index", text: "Getting Started with Runbook Automation" },
            { link: "/learning/getting-started/rba/runner-setup.md", text: "Setting up a Runner" },
            { link: "/learning/getting-started/rba/node-setup.md", text: "Adding a Node with Runner" }
          ]
        },
        {
          text: "Tutorial",
          collapsible: true,
          link: "/learning/tutorial/index",
          children: [
            "/learning/tutorial/index",
            "/learning/tutorial/creatingnodes",
            "/learning/tutorial/commands",
            "/learning/tutorial/jobs",
            "/learning/tutorial/users",
            "/learning/tutorial/acls",
            "/learning/tutorial/conclusion"
          ]
        },
        {
          text: "Working with Jobs",
          link: "/learning/getting-started/jobs/index",
          collapsible: true,
          children: [
            "/learning/getting-started/jobs/index",
            "/learning/getting-started/jobs/what-is-a-job.md",
            "/learning/getting-started/jobs/pieces-of-a-job.md",
            "/learning/getting-started/jobs/how-to-run-a-job.md",
            "/learning/getting-started/jobs/workflow-strategies.md",
            "/learning/getting-started/jobs/node-sources.md",
            "/learning/getting-started/jobs/sharing-jobs.md",
            "/learning/getting-started/jobs/job-options.md",
            "/learning/getting-started/jobs/creating-a-job.md",
            "/learning/getting-started/jobs/job-plugins.md",
            "/learning/getting-started/jobs/commercial-job-features.md"
          ]
        }
      ]
    },
    {
      text: "How To",
      link: "/learning/howto/index",
      collapsible: true,
      children: [
        { link: "/learning/howto/index.md", text: "Overview" },
        { link: "/learning/howto/welcome-project-starter.md", text: "Welcome Projects" },
        {
          text: "ACL Recipes",
          collapsible: true,
          link: "/learning/howto/acls/",
          children: [
            ...getChildren_default("docs/learning/", "howto/acls")
          ]
        },
        {
          text: "Administration",
          collapsible: true,
          children: [
            "/learning/howto/runner-service-windows.md",
            "/learning/howto/migrate-to-rundeck-packages-repo.md",
            "/learning/howto/install-centos.md",
            "/learning/howto/migrate-to-mysql.md",
            "/learning/howto/use-terraform-provider.md",
            "/learning/howto/terraform-jobs.md",
            "/learning/howto/learn-rd-cli.md",
            "/learning/howto/elk-integration.md",
            "/learning/howto/acl_basic_examples.md",
            "/learning/howto/apache2-proxy-gssapi.md",
            "/learning/howto/workinglogs.md",
            "/learning/howto/S3-minio.md",
            "/learning/howto/how2scm.md",
            "/learning/howto/egress-proxy.md",
            "/learning/howto/how2-terra-rd-aws.md",
            "/learning/howto/how2-terra-rd-eks.md",
            "/learning/howto/troubleshooting.md",
            "/learning/howto/customize-gui.md",
            "/learning/howto/runner-paop-selfsigned.md"
          ]
        },
        {
          text: "Managing Nodes",
          collapsible: true,
          children: [
            "/learning/howto/ssh-on-linux-nodes.md",
            "/learning/howto/configuring-windows-nodes.md",
            "/learning/howto/revoke-ssh-keys.md",
            "/learning/howto/how2winrm-rundeck.md"
          ]
        },
        {
          text: "Writing Jobs",
          collapsible: true,
          children: [
            "/learning/howto/use-example-jobs.md",
            "/learning/howto/passing-variables.md",
            "/learning/howto/calling-apis.md",
            "/learning/howto/log4shell.md",
            "/learning/howto/use-roi-metrics.md",
            "/learning/howto/env-in-notifications.md",
            "/learning/howto/rabbitmq-diag.md"
          ]
        },
        {
          text: "Integrating",
          collapsible: true,
          children: [
            "/learning/howto/using-webhooks.md",
            "/learning/howto/cross-account-aws-ssm.md",
            "/learning/howto/pagerduty-notification.md",
            "/learning/howto/using-ansible.md",
            "/learning/howto/config-sn-nodesource.md",
            "/learning/howto/configure-gcp-plugins.md",
            "/learning/howto/sn-midserver.md",
            "/learning/howto/rundeck-exporter.md",
            "/learning/howto/vault-integration.md",
            "/learning/howto/howtojenkins.md",
            "/learning/howto/how2kube.md",
            "/learning/howto/actions-with-rba.md",
            "/learning/howto/events-with-rba.md",
            "/learning/howto/email-gmail.md",
            "/learning/howto/email-outlook.md"
          ]
        },
        {
          text: "Customizing",
          collapsible: true,
          children: [
            "/learning/howto/plugin-bootstrap.md",
            "/learning/howto/custom-script-plugin-hello-world.md",
            "/learning/howto/java-plugin.md",
            "/learning/howto/groovy-plugin.md",
            "/learning/howto/how2extenddocker.md"
          ]
        },
        {
          text: "Contributing",
          collapsible: true,
          children: [
            "/learning/howto/update-rundeck-docs.md",
            "/learning/howto/build-rundeck.md"
          ]
        }
      ]
    },
    {
      text: "Solutions",
      collapsible: true,
      children: [
        {
          text: "Automated Diagnostics",
          link: "/learning/solutions/automated-diagnostics/index",
          collapsible: true,
          children: [
            { link: "/learning/solutions/automated-diagnostics/index.md", text: "Solution Summary" },
            { link: "/learning/solutions/automated-diagnostics/getting-started.md", text: "Getting Started" },
            { link: "/learning/solutions/automated-diagnostics/automation-actions.md", text: "Configuring Automation Actions" },
            { link: "/learning/solutions/automated-diagnostics/first-diagnostic-runbook.md", text: "First Diagnostic Runbook" },
            { link: "/learning/solutions/automated-diagnostics/integrating-chat-tools.md", text: "Integrating Chat Tools" },
            {
              text: "Examples & Best Practices",
              link: "/learning/solutions/automated-diagnostics/examples-overview.md",
              collapsible: true,
              children: [
                { link: "/learning/solutions/automated-diagnostics/examples-overview.md", text: "Examples Overview" },
                { link: "/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md", text: "Public Cloud Providers" },
                { link: "/learning/solutions/automated-diagnostics/examples/linux.md", text: "Linux" },
                { link: "/learning/solutions/automated-diagnostics/examples/windows.md", text: "Windows" },
                { link: "/learning/solutions/automated-diagnostics/examples/apis.md", text: "SaaS & Internal API's" },
                {
                  text: "Kubernetes",
                  link: "/learning/solutions/automated-diagnostics/examples/kubernetes",
                  collapsible: true,
                  children: [
                    { link: "/learning/solutions/automated-diagnostics/examples/kubernetes", text: "Kubernetes Examples" },
                    { link: "/learning/solutions/automated-diagnostics/examples/k8s-logs-events.md", text: "Pod Logs & K8s Events" },
                    { link: "/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture.md", text: "App Debug State Capture" }
                  ]
                },
                { link: "/learning/solutions/automated-diagnostics/examples/databases.md", text: "Databases" },
                { link: "/learning/solutions/automated-diagnostics/examples/network-devices.md", text: "Network Devices" },
                { link: "/learning/solutions/automated-diagnostics/examples/observability-integrations.md", text: "Observability Integrations" }
              ]
            },
            { link: "/learning/solutions/automated-diagnostics/sending-output-to-pagerduty.md", text: "Sending Output to PagerDuty" },
            { link: "/learning/solutions/automated-diagnostics/integrating-with-event-orchestration.md", text: "Integrating with Event Orchestration" },
            { link: "/learning/solutions/automated-diagnostics/simplifying-diagnostics.md", text: "Simplifying Diagnostics Output" },
            { link: "/learning/solutions/automated-diagnostics/automation-beyond-triage.md", text: "Automation Beyond Triage" },
            { link: "/learning/solutions/automated-diagnostics/feedback-faq.md", text: "Feedback & FAQ" }
            //            {link: '/learning/solutions/auto-incident-kubernetes-logs.md', text: 'Example: Kubernetes Logs'},
            //            {link: '/learning/solutions/auto-diagnostics-github-script.md', text: 'Example: Raw Scripts'}
          ]
        }
      ]
    },
    {
      text: "Terminology",
      link: "/learning/tutorial/terminology",
      collapsible: true,
      children: [
        "/learning/tutorial/terminology"
      ]
    }
  ]
}];

// docs/.vuepress/getHistory.js
import cmp from "semver-compare";
function getHistory(parent, dir) {
  const entries = getChildren_default(parent, dir);
  const sorted = entries.sort(cmp).reverse();
  return sorted;
}
var getHistory_default = getHistory;

// docs/.vuepress/sidebar-menus/history.ts
var history_default = [
  {
    text: "Release Notes",
    collapsible: false,
    link: "/history/",
    headerDepth: 1,
    children: [
      ...getHistory_default("docs/history/"),
      {
        text: "5.x",
        collapsible: true,
        link: "/history/",
        children: getHistory_default("docs/history/", "5_x")
      },
      {
        text: "4.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "4_x")
      },
      {
        text: "3.4.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "3_4_x")
      },
      {
        text: "3.3.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "3_3_x")
      },
      {
        text: "3.2.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "3_2_x")
      },
      {
        text: "3.1.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "3_1_x")
      },
      {
        text: "3.0.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "3_0_x")
      },
      {
        text: "2.x",
        collapsible: true,
        children: getHistory_default("docs/history/", "2_x")
      },
      {
        text: "1.x",
        collapsible: true,
        link: "/history/",
        children: getChildren_default("docs/history/", "1_x")
      },
      {
        text: "Security Advisories",
        collapsible: true,
        link: "/history/cves/",
        children: getChildren_default("docs/history/", "cves")
      }
    ]
  }
];

// docs/.vuepress/sidebar-menus/about.ts
var about_default = [{
  text: "About",
  collapsible: false,
  headerDepth: 2,
  children: [
    "/about/introduction.md",
    {
      text: "Process Automation",
      collapsible: true,
      link: "/about/enterprise/",
      children: [
        {
          text: "Overview",
          link: "/about/enterprise/"
        }
      ]
    },
    {
      text: "Runbook Automation",
      collapsible: true,
      link: "/about/cloud/",
      children: [
        {
          text: "Overview",
          link: "/about/cloud/"
        }
      ]
    },
    "/about/getting-help.md",
    "/about/licensing.md",
    {
      text: "Release Notes",
      link: "/history/"
    }
  ]
}];

// docs/.vuepress/sidebar-menus/api.ts
var api_default = [{
  text: "API Documentation",
  link: "/api/",
  children: [
    {
      text: "API Reference",
      link: "/api/",
      collapsible: true,
      headerDepth: 1
    },
    "/api/rundeck-api-versions.md",
    "/api/api_basics.md",
    "/api/api-spec.md"
  ]
}];

// docs/.vuepress/config.ts
import markdownItInclude from "markdown-it-include";
import markdownItDeflist from "markdown-it-deflist";
import markdownItImplicitFigures from "markdown-it-implicit-figures";

// docs/.vuepress/navbar-menus/about.js
var about_default2 = [
  {
    text: "Introduction",
    link: "/about/introduction"
  },
  {
    text: "Process Automation",
    link: "/about/enterprise/"
  },
  {
    text: "Runbook Automation",
    link: "/about/cloud/"
  },
  {
    text: "Getting Help",
    link: "/about/getting-help"
  },
  {
    text: "Licensing",
    link: "/about/licensing"
  },
  {
    text: "Release Notes",
    link: "/history/"
  }
];

// docs/.vuepress/navbar-menus/user-guide.js
var user_guide_default2 = [
  {
    link: "/manual/index.md",
    text: "Overview"
  },
  {
    link: "/manual/projects/",
    text: "Projects"
  },
  {
    link: "/manual/jobs.md",
    text: "Jobs"
  },
  {
    link: "/manual/plugins/index.md",
    text: "Plugins"
  },
  {
    link: "/manual/05-nodes",
    text: "Nodes"
  },
  {
    text: "Key Storage",
    link: "/manual/key-storage/index"
  },
  {
    link: "/manual/06-commands",
    text: "Commands"
  },
  {
    link: "/manual/08-activity",
    text: "Activity"
  },
  {
    link: "/manual/schedules/project-schedules",
    text: "Schedules"
  },
  {
    link: "/manual/calendars",
    text: "Calendars"
  },
  {
    link: "/manual/webhooks",
    text: "Webhooks"
  },
  {
    link: "/manual/tour-manager",
    text: "Tour Manager"
  },
  {
    link: "/manual/project-settings",
    text: "Project Settings"
  },
  {
    link: "/manual/system-configs",
    text: "System Menu"
  },
  {
    link: "/manual/10-user",
    text: "Profile Menu"
  },
  {
    link: "/manual/integrations/index",
    text: "Integrations"
  },
  {
    link: "/manual/document-format-reference/index",
    text: "Document Formats"
  }
];

// docs/.vuepress/navbar-menus/learning.js
var learning_default2 = [
  {
    text: "Overview",
    link: "/learning/"
  },
  {
    text: "Getting Started",
    link: "/learning/getting-started/index"
  },
  {
    text: "How To Articles",
    link: "/learning/howto/index"
  },
  {
    text: "Solutions",
    link: "/learning/solutions/automated-diagnostics/index.md"
  },
  {
    text: "Terminology",
    link: "/learning/tutorial/terminology"
  }
];

// docs/.vuepress/navbar-menus/administration.js
var administration_default2 = [
  {
    text: "Installation",
    link: "/administration/install/index"
  },
  {
    text: "Upgrading",
    link: "/upgrading/"
  },
  {
    text: "Licensing",
    link: "/administration/license"
  },
  {
    text: "Configuration",
    link: "/administration/configuration/"
  },
  {
    text: "Security",
    link: "/administration/security/default-users"
  },
  {
    text: "Enterprise Runner",
    link: "/administration/runner/"
  },
  {
    text: "Maintenance",
    link: "/administration/maintenance/index"
  },
  {
    text: "Clustering",
    link: "/administration/cluster/index"
  }
];

// docs/.vuepress/navbar-menus/development.js
var development_default = [
  {
    text: "API",
    link: "/api/"
  },
  {
    text: "Plugin Development",
    link: "/developer/"
  },
  {
    text: "Included Plugins",
    link: "/manual/plugins/full-list"
  },
  {
    text: "RD - Command Line Interface",
    link: "/rd-cli/"
  },
  {
    text: "Release Notes",
    link: "/history/"
  },
  {
    text: "Security Advisories",
    link: "/history/CVEs/"
  }
];

// docs/.vuepress/markdown-it-replace-vars.js
function markdown_it_replace_vars_default(md, ruleName, transform) {
  md.core.ruler.push(
    ruleName,
    function(state) {
      for (let index = state.tokens.length - 1; index >= 0; index--) {
        if (state.tokens[index].content) {
          state.tokens[index].content = transform(state.tokens[index].content);
        }
        if (state.tokens[index].children) {
          let children = state.tokens[index].children;
          for (let i = children.length - 1; i >= 0; i--) {
            children[i].content = transform(children[i].content);
          }
        }
      }
    }
  );
}

// docs/.vuepress/setup.js
import { BaseTransition } from "vue";
var RUNDECK_VERSION = "5.1.2";
var RUNDECK_VERSION_FULL = "5.1.2-SNAPSHOT";
var API_VERSION = "46";
var API_DEP_REL = "6.0.0";
var API_DEP_VER = "17";
var API_MIN_VER = "14";
var CLI_VERSION = "2.0.8";
var GPG_KEY_DATE = "20240108";
var REPO_BRANCH = "4.0.x";
var setup = {
  base: process.env.DOC_BASE || "",
  branch: process.env.DOC_BRANCH || REPO_BRANCH,
  apiVersion: API_VERSION,
  apiDepVersion: API_DEP_VER,
  apiDepRelease: API_DEP_REL,
  apiMinVersion: API_MIN_VER,
  rundeckVersion: process.env.RUNDECK_VERSION || RUNDECK_VERSION,
  rundeckVersionFull: process.env.RUNDECK_VERSION_FULL || RUNDECK_VERSION_FULL,
  cliVersion: process.env.CLI_VERSION || CLI_VERSION,
  gpgKeyDate: process.env.GPG_KEY_DATE || GPG_KEY_DATE
};
var setup_default = setup;

// docs/.vuepress/config.ts
var __vite_injected_original_import_meta_url = "file:///Users/jcohen1/Downloads/docs/docs/.vuepress/config.ts";
var __dirname = getDirname(__vite_injected_original_import_meta_url);
console.log(setup_default);
var config_default = defineUserConfig({
  debug: false,
  title: "",
  description: "",
  shouldPrefetch: false,
  base: `/${setup_default.base ? setup_default.base + "/" : ""}`,
  head: [
    //   ['script', {}, `
    //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','GTM-5QNBBN6');
    //   `],
    //   ['script', { src: '/' + setup.base + '/js/gtm.js', defer: true }],
  ],
  extendsMarkdown: (md) => {
    md.use(markdown_it_replace_vars_default, "custom_token_replace", function(content) {
      return content.replace(/\{\{\s*\$(\w+)\s*\}\}/g, (a, b) => {
        return setup_default[b] || a;
      });
    });
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, "../")
    });
    md.use(markdownItDeflist);
    md.use(markdownItImplicitFigures, {
      figcaption: true
    });
  },
  define: {
    API_VERSION: setup_default.apiVersion,
    API_DEP_VERSION: setup_default.apiDepVersion,
    API_DEP_RELEASE: setup_default.apiDepRelease,
    API_MIN_VERSION: setup_default.apiMinVersion,
    VERSION: setup_default.rundeckVersion,
    VERSION_FULL: setup_default.rundeckVersionFull,
    CLI_VERSION: setup_default.cliVersion
  },
  //Theme Config
  theme: hopeTheme({
    debug: true,
    logo: "/images/RundeckbyPagerDuty.svg",
    repo: "rundeck/docs",
    docsDir: "docs",
    docsBranch: setup_default.branch,
    repoDisplay: true,
    darkmode: "toggle",
    prevLink: false,
    nextLink: false,
    lastUpdated: true,
    pageInfo: false,
    contributors: false,
    plugins: {
      pwa: {
        update: "hint",
        cacheHTML: true
      },
      prismjs: {
        light: "night-owl"
      },
      mdEnhance: {
        tabs: true,
        codetabs: true
      },
      feed: {
        hostname: "https://docs.rundeck.com",
        rss: true,
        json: true,
        filter: ({ frontmatter, filePathRelative }) => !(frontmatter.feed === void 0 || frontmatter.home || !filePathRelative || frontmatter.article === false || frontmatter.feed === false),
        sorter: (pageA, pageB) => compareDate(pageA.frontmatter.date, pageB.frontmatter.date)
      },
      components: {
        components: [
          "FontIcon",
          "PDF",
          "VideoPlayer",
          "YouTube"
        ],
        componentOptions: {
          fontIcon: {
            assets: "fontawesome"
          },
          pdf: {
            pdfjs: "/assets/lib/pdfjs/"
          }
        },
        Carousel,
        Slide
      }
    },
    navbar: [
      {
        text: "About",
        children: about_default2
      },
      {
        text: "User Guide",
        children: user_guide_default2
      },
      {
        text: "Administration",
        children: administration_default2
      },
      {
        text: "Learning",
        children: learning_default2
      },
      {
        text: "Development",
        children: development_default
      }
    ],
    sidebar: {
      "/about/": about_default,
      "/administration/": administration_default,
      "/upgrading/": administration_default,
      "/rd-cli/": command_line_tools_default,
      "/manual/": user_guide_default,
      "/learning/": learning_default,
      "/developer/": plugin_development_default,
      "/history/": history_default,
      "/api/": api_default,
      "/": [
        ""
      ]
    }
    // }
  }),
  //Plugins Config
  plugins: [
    registerComponentsPlugin({
      components: {
        RundeckSwaggerUi: path.resolve(__dirname, "./components/RundeckSwaggerUI.vue")
      }
    }),
    googleAnalyticsPlugin({
      id: "G-05XJ24KPYH"
    }),
    redirectPlugin({
      config: {
        "/manual/01-introduction.html": "/introduction/introduction.html",
        "/manual/03-getting-started.html": "/learning/index.html",
        "/manual/02-getting-help.html": "/introduction/getting-help.html",
        "/manual/04-jobs.html": "/manual/jobs.html",
        "/administration/configuration/license.html": "/administration/license.html",
        "/manual/servicenow-app.html": "/manual/integrations/servicenow-app.html",
        "/administration/security/key-storage.html": "/manual/key-storage/key-storage.html",
        "/administration/key-storage/key-storage.html": "/manual/key-storage/key-storage.html",
        "/administration/security/storage-plugins.html": "/manual/key-storage/key-plugins.html",
        "/administration/key-storage/storage-plugins.html": "/manual/key-storage/key-plugins.html",
        "/administration/security/storage-plugins/cyberark-storage.html": "/manual/key-storage/storage-plugins/cyberark-storage.html",
        "/administration/key-storage/storage-plugins/cyberark-storage.html": "/manual/key-storage/storage-plugins/cyberark-storage.html",
        "/administration/security/storage-plugins/thycotic-storage.html": "/manual/key-storage/storage-plugins/thycotic-storage.html",
        "/administration/key-storage/storage-plugins/thycotic-storage.html": "/manual/key-storage/storage-plugins/thycotic-storage.html",
        "/administration/security/storage-plugins/vault.html": "/manual/key-storage/storage-plugins/vault.html",
        "/manual/command-line-tools/index.html": "/rd-cli/index.html",
        "/manual/command-line-tools/rd.html": "/rd-cli/index.html",
        "/manual/command-line-tools/rd-acl.html": "/rd-cli/rd-ext-acl.html",
        "/history/cves/": "/history/CVEs/",
        "/introduction/introduction.html": "/about/introduction.html",
        "/administration/architecture-and-deployment/system-architecture.html": "/about/enterprise/index.html",
        "/administration/architecture-and-deployment/aws.html": "/administration/install/aws.html",
        "/administration/projects/": "/manual/projects/",
        "/manual/12-webhooks.html": "/manual/webhooks.html",
        "/history/4_0_x/version-4.0.0.html": "/history/4_x/version-4.0.0.html",
        "/manual/workflow-steps/aws-athena": "/manual/workflow-steps/amazon-athena.html",
        "/enterprise/quickstart.html": "/enterprise/index.html",
        "/learning/solutions/automated-diagnostics/solution-overview.html": "/learning/solutions/automated-diagnostics/index.html",
        "/manual/plugins/plugins-overview.html": "/manual/plugins/index.html",
        "/administration/install/installing-rundeck": "/administration/install/index",
        "/learning/tutorial/preparing.html": "/learning/tutorial/index.html",
        "/learning/howto/overview.html": "/learning/howto/index.html",
        "/learning/getting-started/overview.html": "/learning/getting-started/index.html",
        "/plugins/": "/manual/plugins/full-list",
        "/learning/getting-started/rba/rba-welcome-overview.html": "/learning/getting-started/rba/index.html",
        "/learning/getting-started/jobs/overview.html": "/learning/getting-started/jobs/index.html",
        "/manual/key-storage/key-storage.html": "/manual/key-storage/index.html",
        "/api/rundeck-api.html": "/api/index.html",
        "/introduction/getting-help.html/manual/job-options.html": "/manual/job-options.html#option-model-provider",
        "/introduction/getting-help.html/administration/maintenance/tuning-rundeck.html": "/administration/maintenance/tuning-rundeck.html#quartz-job-threadcount"
      }
    }),
    openGraphPlugin({
      host: "https://docs.rundeck.com",
      twitterSite: "rundeck"
    }),
    containerPlugin(
      {
        type: "deprecated",
        locales: {
          "/": {
            defaultInfo: "Deprecation Warning"
          }
        }
      }
    ),
    containerPlugin(
      {
        type: "enterprise",
        locales: {
          "/": {
            defaultInfo: "Available in PagerDuty Process Automation Commercial products."
          }
        }
      }
    ),
    containerPlugin(
      {
        type: "tutorial",
        locales: {
          "/": {
            defaultInfo: "This tutorial is based on example code in the Welcome Projects."
          }
        }
      }
    ),
    containerPlugin(
      {
        type: "incubating",
        locales: {
          "/": {
            defaultInfo: "Incubating: This feature or API is new! We may still have a few bugs or change some functionality in the future."
          }
        }
      }
    ),
    containerPlugin(
      {
        type: "betafeature",
        locales: {
          "/": {
            defaultInfo: "BETA FEATURE"
          }
        }
      }
    ),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components")
    }),
    docsearchPlugin({
      locales: {
        "/": {
          placeholder: "Search Documentation",
          translations: {
            button: {
              buttonText: "Search Documentation"
            }
          }
        }
      },
      appId: "GRSXNRCDRG",
      apiKey: "c463f74d6f36a5af808650e0f69aadfa",
      indexName: "prod_rundeck_docs",
      searchParameters: {
        hitsPerPage: 100,
        facetFilters: [`version:${setup_default.base}`]
      }
    })
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvYWRtaW5pc3RyYXRpb24udHMiLCAiZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy91c2VyLWd1aWRlLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvY29tbWFuZC1saW5lLXRvb2xzLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvcGx1Z2luLWRldmVsb3BtZW50LnRzIiwgImRvY3MvLnZ1ZXByZXNzL2dldENoaWxkcmVuLmpzIiwgImRvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvbGVhcm5pbmcudHMiLCAiZG9jcy8udnVlcHJlc3MvZ2V0SGlzdG9yeS5qcyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2hpc3RvcnkudHMiLCAiZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9hYm91dC50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2FwaS50cyIsICJkb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvYWJvdXQuanMiLCAiZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzL3VzZXItZ3VpZGUuanMiLCAiZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzL2xlYXJuaW5nLmpzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci1tZW51cy9hZG1pbmlzdHJhdGlvbi5qcyIsICJkb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvZGV2ZWxvcG1lbnQuanMiLCAiZG9jcy8udnVlcHJlc3MvbWFya2Rvd24taXQtcmVwbGFjZS12YXJzLmpzIiwgImRvY3MvLnZ1ZXByZXNzL3NldHVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmltcG9ydCB7IGRlZmluZVVzZXJDb25maWcsIFBhZ2UgfSBmcm9tICd2dWVwcmVzcyc7XG5pbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IHsgY29udGFpbmVyUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1jb250YWluZXInO1xuaW1wb3J0IHsgZG9jc2VhcmNoUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1kb2NzZWFyY2gnO1xuaW1wb3J0IHsgZ2V0RGlybmFtZSwgcGF0aCB9IGZyb20gJ0B2dWVwcmVzcy91dGlscyc7XG5pbXBvcnQgeyBvcGVuR3JhcGhQbHVnaW4gfSBmcm9tICd2dWVwcmVzcy1wbHVnaW4tb3Blbi1ncmFwaCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbXBvbmVudHNQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXJlZ2lzdGVyLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgcmVkaXJlY3RQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLXJlZGlyZWN0XCI7XG5pbXBvcnQgeyBjb21wYXJlRGF0ZSB9IGZyb20gXCJ2dWVwcmVzcy1zaGFyZWQvbm9kZVwiO1xuaW1wb3J0IHsgZ29vZ2xlQW5hbHl0aWNzUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1nb29nbGUtYW5hbHl0aWNzJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICd2dWUtY2Fyb3VzZWwnO1xuXG4vLyBzaWRlYmFyc1xuaW1wb3J0IHNpZGViYXJBZG1pbiBmcm9tICcuL3NpZGViYXItbWVudXMvYWRtaW5pc3RyYXRpb24nXG5pbXBvcnQgc2lkZWJhclVzZXJHdWlkZSBmcm9tICcuL3NpZGViYXItbWVudXMvdXNlci1ndWlkZSdcbmltcG9ydCBzaWRlYmFyQ29tbWFuZExpbmVUb29scyBmcm9tICcuL3NpZGViYXItbWVudXMvY29tbWFuZC1saW5lLXRvb2xzJ1xuaW1wb3J0IHNpZGViYXJEZXZlbG9wZXIgZnJvbSAnLi9zaWRlYmFyLW1lbnVzL3BsdWdpbi1kZXZlbG9wbWVudCdcbmltcG9ydCBzaWRlYmFyTGVhcm5pbmcgZnJvbSAnLi9zaWRlYmFyLW1lbnVzL2xlYXJuaW5nJ1xuaW1wb3J0IHNpZGViYXJIaXN0b3J5IGZyb20gJy4vc2lkZWJhci1tZW51cy9oaXN0b3J5J1xuaW1wb3J0IHNpZGViYXJBYm91dCBmcm9tICcuL3NpZGViYXItbWVudXMvYWJvdXQnXG5pbXBvcnQgYXBpTWVudSBmcm9tICcuL3NpZGViYXItbWVudXMvYXBpJ1xuXG5cbmltcG9ydCBtYXJrZG93bkl0SW5jbHVkZSBmcm9tICdtYXJrZG93bi1pdC1pbmNsdWRlJ1xuaW1wb3J0IG1hcmtkb3duSXREZWZsaXN0IGZyb20gJ21hcmtkb3duLWl0LWRlZmxpc3QnXG5pbXBvcnQgbWFya2Rvd25JdEltcGxpY2l0RmlndXJlcyBmcm9tICdtYXJrZG93bi1pdC1pbXBsaWNpdC1maWd1cmVzJ1xuXG4vLyBuYXZiYXJzXG5pbXBvcnQgbmF2YmFyQWJvdXQgZnJvbSAnLi9uYXZiYXItbWVudXMvYWJvdXQnXG5pbXBvcnQgbmF2YmFyVXNlckd1aWRlIGZyb20gJy4vbmF2YmFyLW1lbnVzL3VzZXItZ3VpZGUnXG5pbXBvcnQgbmF2YmFyTGVhcm5pbmcgZnJvbSAnLi9uYXZiYXItbWVudXMvbGVhcm5pbmcnXG5pbXBvcnQgbmF2YmFyQWRtaW4gZnJvbSAnLi9uYXZiYXItbWVudXMvYWRtaW5pc3RyYXRpb24nXG5pbXBvcnQgbmF2YmFyRGV2ZWxvcG1lbnQgZnJvbSAnLi9uYXZiYXItbWVudXMvZGV2ZWxvcG1lbnQnXG5pbXBvcnQgbWFya2Rvd25JdFJlcGxhY2VWYXJzIGZyb20gJy4vbWFya2Rvd24taXQtcmVwbGFjZS12YXJzJ1xuXG4vL0dldCBzZXR1cCB2YXJpYWJsZXNcbmNvbnN0IF9fZGlybmFtZSA9IGdldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKTtcbmltcG9ydCBzZXR1cCBmcm9tICcuL3NldHVwJztcbmNvbnNvbGUubG9nKHNldHVwKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcbiAgZGVidWc6IGZhbHNlLFxuICB0aXRsZTogJycsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxuICBiYXNlOiBgLyR7c2V0dXAuYmFzZSA/IHNldHVwLmJhc2UgKyAnLycgOiAnJ31gLFxuICBoZWFkOiBbXG4gIC8vICAgWydzY3JpcHQnLCB7fSwgYFxuICAvLyAgICAgKGZ1bmN0aW9uKHcsZCxzLGwsaSl7d1tsXT13W2xdfHxbXTt3W2xdLnB1c2goeydndG0uc3RhcnQnOlxuICAvLyAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCksZXZlbnQ6J2d0bS5qcyd9KTt2YXIgZj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdLFxuICAvLyAgICAgaj1kLmNyZWF0ZUVsZW1lbnQocyksZGw9bCE9J2RhdGFMYXllcic/JyZsPScrbDonJztqLmFzeW5jPXRydWU7ai5zcmM9XG4gIC8vICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPScraStkbDtmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGosZik7XG4gIC8vICAgICB9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJ2RhdGFMYXllcicsJ0dUTS01UU5CQk42Jyk7XG4gIC8vICAgYF0sXG4gIC8vICAgWydzY3JpcHQnLCB7IHNyYzogJy8nICsgc2V0dXAuYmFzZSArICcvanMvZ3RtLmpzJywgZGVmZXI6IHRydWUgfV0sXG4gIF0sXG4gIGV4dGVuZHNNYXJrZG93bjogbWQgPT4ge1xuICAgIG1kLnVzZShtYXJrZG93bkl0UmVwbGFjZVZhcnMsICdjdXN0b21fdG9rZW5fcmVwbGFjZScsIGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICByZXR1cm4gY29udGVudC5yZXBsYWNlKC9cXHtcXHtcXHMqXFwkKFxcdyspXFxzKlxcfVxcfS9nLCAoYSxiKT0+IHtcbiAgICAgICAgICByZXR1cm4gc2V0dXBbYl18fGFcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgbWQudXNlKG1hcmtkb3duSXRJbmNsdWRlLCB7XG4gICAgICByb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL1wiKVxuICAgIH0pO1xuICAgIG1kLnVzZShtYXJrZG93bkl0RGVmbGlzdCk7XG4gICAgbWQudXNlKG1hcmtkb3duSXRJbXBsaWNpdEZpZ3VyZXMsIHtcbiAgICAgIGZpZ2NhcHRpb246IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgQVBJX1ZFUlNJT046IHNldHVwLmFwaVZlcnNpb24sXG4gICAgQVBJX0RFUF9WRVJTSU9OOiBzZXR1cC5hcGlEZXBWZXJzaW9uLFxuICAgIEFQSV9ERVBfUkVMRUFTRTogc2V0dXAuYXBpRGVwUmVsZWFzZSxcbiAgICBBUElfTUlOX1ZFUlNJT046IHNldHVwLmFwaU1pblZlcnNpb24sXG4gICAgVkVSU0lPTjogc2V0dXAucnVuZGVja1ZlcnNpb24sXG4gICAgVkVSU0lPTl9GVUxMOiBzZXR1cC5ydW5kZWNrVmVyc2lvbkZ1bGwsXG4gICAgQ0xJX1ZFUlNJT046IHNldHVwLmNsaVZlcnNpb25cbiAgfSxcblxuICAvL1RoZW1lIENvbmZpZ1xuICB0aGVtZTogaG9wZVRoZW1lKHtcbiAgICBkZWJ1ZzogdHJ1ZSxcbiAgICBsb2dvOiAnL2ltYWdlcy9SdW5kZWNrYnlQYWdlckR1dHkuc3ZnJyxcbiAgICByZXBvOiAncnVuZGVjay9kb2NzJyxcbiAgICBkb2NzRGlyOiAnZG9jcycsXG4gICAgZG9jc0JyYW5jaDogc2V0dXAuYnJhbmNoLFxuICAgIHJlcG9EaXNwbGF5OiB0cnVlLFxuICAgIGRhcmttb2RlOiAndG9nZ2xlJyxcbiAgICBwcmV2TGluazogZmFsc2UsXG4gICAgbmV4dExpbms6IGZhbHNlLFxuICAgIGxhc3RVcGRhdGVkOiB0cnVlLFxuICAgIHBhZ2VJbmZvOiBmYWxzZSxcbiAgICBjb250cmlidXRvcnM6IGZhbHNlLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHB3YToge1xuICAgICAgICB1cGRhdGU6ICdoaW50JyxcbiAgICAgICAgY2FjaGVIVE1MOiB0cnVlXG4gICAgICB9LFxuICAgICAgcHJpc21qczoge1xuICAgICAgICBsaWdodDogJ25pZ2h0LW93bCdcbiAgICAgIH0sXG4gICAgICBtZEVuaGFuY2U6IHtcbiAgICAgICAgdGFiczogdHJ1ZSxcbiAgICAgICAgY29kZXRhYnM6IHRydWUsXG4gICAgICB9LFxuICAgICAgZmVlZDoge1xuICAgICAgICBob3N0bmFtZTogJ2h0dHBzOi8vZG9jcy5ydW5kZWNrLmNvbScsXG4gICAgICAgIHJzczogdHJ1ZSxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgZmlsdGVyOiAoeyBmcm9udG1hdHRlciwgZmlsZVBhdGhSZWxhdGl2ZSB9OiBQYWdlKTogYm9vbGVhbiA9PiAhKGZyb250bWF0dGVyLmZlZWQgPT09IHVuZGVmaW5lZCB8fCBmcm9udG1hdHRlci5ob21lIHx8ICFmaWxlUGF0aFJlbGF0aXZlIHx8IGZyb250bWF0dGVyLmFydGljbGUgPT09IGZhbHNlIHx8IGZyb250bWF0dGVyLmZlZWQgPT09IGZhbHNlKSxcbiAgICAgICAgc29ydGVyOiAoXG4gICAgICAgICAgcGFnZUE6IFBhZ2UsXG4gICAgICAgICAgcGFnZUI6IFBhZ2UsXG4gICAgICAgICk6IG51bWJlciA9PlxuICAgICAgICAgIGNvbXBhcmVEYXRlKCBwYWdlQS5mcm9udG1hdHRlci5kYXRlLCBwYWdlQi5mcm9udG1hdHRlci5kYXRlKVxuICAgICAgfSxcbiAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAgICBcIkZvbnRJY29uXCIsXG4gICAgICAgICAgICBcIlBERlwiLFxuICAgICAgICAgICAgXCJWaWRlb1BsYXllclwiLFxuICAgICAgICAgICAgXCJZb3VUdWJlXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBjb21wb25lbnRPcHRpb25zOiB7XG4gICAgICAgICAgICBmb250SWNvbjoge1xuICAgICAgICAgICAgICBhc3NldHM6IFwiZm9udGF3ZXNvbWVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwZGY6IHtcbiAgICAgICAgICAgICAgcGRmanM6IFwiL2Fzc2V0cy9saWIvcGRmanMvXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgQ2Fyb3VzZWwsXG4gICAgICAgICAgU2xpZGVcbiAgICAgIH1cbiAgICB9LFxuICAgIG5hdmJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBjaGlsZHJlbjogbmF2YmFyQWJvdXRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdVc2VyIEd1aWRlJyxcbiAgICAgICAgY2hpbGRyZW46IG5hdmJhclVzZXJHdWlkZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgY2hpbGRyZW46IG5hdmJhckFkbWluXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnTGVhcm5pbmcnLFxuICAgICAgICBjaGlsZHJlbjogbmF2YmFyTGVhcm5pbmdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEZXZlbG9wbWVudCcsXG4gICAgICAgIGNoaWxkcmVuOiBuYXZiYXJEZXZlbG9wbWVudFxuICAgICAgfVxuICAgIF0sXG4gICAgc2lkZWJhcjoge1xuICAgICAgICcvYWJvdXQvJzogc2lkZWJhckFib3V0LFxuICAgICAgICcvYWRtaW5pc3RyYXRpb24vJzogc2lkZWJhckFkbWluLFxuICAgICAgICcvdXBncmFkaW5nLyc6IHNpZGViYXJBZG1pbixcbiAgICAgICAnL3JkLWNsaS8nOiBzaWRlYmFyQ29tbWFuZExpbmVUb29scyxcbiAgICAgICAnL21hbnVhbC8nOiBzaWRlYmFyVXNlckd1aWRlLFxuICAgICAgICcvbGVhcm5pbmcvJzogc2lkZWJhckxlYXJuaW5nLFxuICAgICAgICcvZGV2ZWxvcGVyLyc6IHNpZGViYXJEZXZlbG9wZXIsXG4gICAgICAgJy9oaXN0b3J5Lyc6IHNpZGViYXJIaXN0b3J5LFxuICAgICAgICcvYXBpLyc6IGFwaU1lbnUsXG4gICAgICAnLyc6IFtcbiAgICAgICAgJydcbiAgICAgIF1cbiAgICB9XG4gICAgLy8gfVxuICB9KSxcblxuICAvL1BsdWdpbnMgQ29uZmlnXG4gIHBsdWdpbnM6IFtcbiAgICByZWdpc3RlckNvbXBvbmVudHNQbHVnaW4oe1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBSdW5kZWNrU3dhZ2dlclVpOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jb21wb25lbnRzL1J1bmRlY2tTd2FnZ2VyVUkudnVlJyksXG4gICAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZ29vZ2xlQW5hbHl0aWNzUGx1Z2luKHtcbiAgICAgICAgaWQ6ICdHLTA1WEoyNEtQWUgnLFxuICAgICAgfSksXG4gICAgcmVkaXJlY3RQbHVnaW4oe1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICcvbWFudWFsLzAxLWludHJvZHVjdGlvbi5odG1sJyA6ICcvaW50cm9kdWN0aW9uL2ludHJvZHVjdGlvbi5odG1sJyxcbiAgICAgICAgICAgICcvbWFudWFsLzAzLWdldHRpbmctc3RhcnRlZC5odG1sJyA6ICcvbGVhcm5pbmcvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAnL21hbnVhbC8wMi1nZXR0aW5nLWhlbHAuaHRtbCcgOiAnL2ludHJvZHVjdGlvbi9nZXR0aW5nLWhlbHAuaHRtbCcsXG4gICAgICAgICAgICAnL21hbnVhbC8wNC1qb2JzLmh0bWwnIDogJy9tYW51YWwvam9icy5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9saWNlbnNlLmh0bWwnIDogJy9hZG1pbmlzdHJhdGlvbi9saWNlbnNlLmh0bWwnLFxuICAgICAgICAgICAgJy9tYW51YWwvc2VydmljZW5vdy1hcHAuaHRtbCcgOiAnL21hbnVhbC9pbnRlZ3JhdGlvbnMvc2VydmljZW5vdy1hcHAuaHRtbCcsXG4gICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L2tleS1zdG9yYWdlLmh0bWwnIDogJy9tYW51YWwva2V5LXN0b3JhZ2Uva2V5LXN0b3JhZ2UuaHRtbCcsXG4gICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2tleS1zdG9yYWdlL2tleS1zdG9yYWdlLmh0bWwnIDogJy9tYW51YWwva2V5LXN0b3JhZ2Uva2V5LXN0b3JhZ2UuaHRtbCcsXG4gICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L3N0b3JhZ2UtcGx1Z2lucy5odG1sJyA6ICcvbWFudWFsL2tleS1zdG9yYWdlL2tleS1wbHVnaW5zLmh0bWwnLFxuICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9rZXktc3RvcmFnZS9zdG9yYWdlLXBsdWdpbnMuaHRtbCcgOiAnL21hbnVhbC9rZXktc3RvcmFnZS9rZXktcGx1Z2lucy5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvc3RvcmFnZS1wbHVnaW5zL2N5YmVyYXJrLXN0b3JhZ2UuaHRtbCcgOiAnL21hbnVhbC9rZXktc3RvcmFnZS9zdG9yYWdlLXBsdWdpbnMvY3liZXJhcmstc3RvcmFnZS5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24va2V5LXN0b3JhZ2Uvc3RvcmFnZS1wbHVnaW5zL2N5YmVyYXJrLXN0b3JhZ2UuaHRtbCcgOiAnL21hbnVhbC9rZXktc3RvcmFnZS9zdG9yYWdlLXBsdWdpbnMvY3liZXJhcmstc3RvcmFnZS5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvc3RvcmFnZS1wbHVnaW5zL3RoeWNvdGljLXN0b3JhZ2UuaHRtbCcgOiAnL21hbnVhbC9rZXktc3RvcmFnZS9zdG9yYWdlLXBsdWdpbnMvdGh5Y290aWMtc3RvcmFnZS5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24va2V5LXN0b3JhZ2Uvc3RvcmFnZS1wbHVnaW5zL3RoeWNvdGljLXN0b3JhZ2UuaHRtbCcgOiAnL21hbnVhbC9rZXktc3RvcmFnZS9zdG9yYWdlLXBsdWdpbnMvdGh5Y290aWMtc3RvcmFnZS5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvc3RvcmFnZS1wbHVnaW5zL3ZhdWx0Lmh0bWwnIDogJy9tYW51YWwva2V5LXN0b3JhZ2Uvc3RvcmFnZS1wbHVnaW5zL3ZhdWx0Lmh0bWwnLFxuICAgICAgICAgICAgJy9tYW51YWwvY29tbWFuZC1saW5lLXRvb2xzL2luZGV4Lmh0bWwnIDogJy9yZC1jbGkvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAnL21hbnVhbC9jb21tYW5kLWxpbmUtdG9vbHMvcmQuaHRtbCcgOiAnL3JkLWNsaS9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICcvbWFudWFsL2NvbW1hbmQtbGluZS10b29scy9yZC1hY2wuaHRtbCcgOiAnL3JkLWNsaS9yZC1leHQtYWNsLmh0bWwnLFxuICAgICAgICAgICAgJy9oaXN0b3J5L2N2ZXMvJyA6ICcvaGlzdG9yeS9DVkVzLycsXG4gICAgICAgICAgICAnL2ludHJvZHVjdGlvbi9pbnRyb2R1Y3Rpb24uaHRtbCcgOiAnL2Fib3V0L2ludHJvZHVjdGlvbi5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vYXJjaGl0ZWN0dXJlLWFuZC1kZXBsb3ltZW50L3N5c3RlbS1hcmNoaXRlY3R1cmUuaHRtbCcgOiAnL2Fib3V0L2VudGVycHJpc2UvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2FyY2hpdGVjdHVyZS1hbmQtZGVwbG95bWVudC9hd3MuaHRtbCcgOiAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvYXdzLmh0bWwnLFxuICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9wcm9qZWN0cy8nIDogJy9tYW51YWwvcHJvamVjdHMvJyxcbiAgICAgICAgICAgICcvbWFudWFsLzEyLXdlYmhvb2tzLmh0bWwnIDogJy9tYW51YWwvd2ViaG9va3MuaHRtbCcsXG4gICAgICAgICAgICAnL2hpc3RvcnkvNF8wX3gvdmVyc2lvbi00LjAuMC5odG1sJyA6ICcvaGlzdG9yeS80X3gvdmVyc2lvbi00LjAuMC5odG1sJyxcbiAgICAgICAgICAgICcvbWFudWFsL3dvcmtmbG93LXN0ZXBzL2F3cy1hdGhlbmEnIDogJy9tYW51YWwvd29ya2Zsb3ctc3RlcHMvYW1hem9uLWF0aGVuYS5odG1sJyxcbiAgICAgICAgICAgICcvZW50ZXJwcmlzZS9xdWlja3N0YXJ0Lmh0bWwnIDogJy9lbnRlcnByaXNlL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL3NvbHV0aW9uLW92ZXJ2aWV3Lmh0bWwnIDogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgJy9tYW51YWwvcGx1Z2lucy9wbHVnaW5zLW92ZXJ2aWV3Lmh0bWwnIDogJy9tYW51YWwvcGx1Z2lucy9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vaW5zdGFsbC9pbnN0YWxsaW5nLXJ1bmRlY2snIDogJy9hZG1pbmlzdHJhdGlvbi9pbnN0YWxsL2luZGV4JyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvdHV0b3JpYWwvcHJlcGFyaW5nLmh0bWwnIDogJy9sZWFybmluZy90dXRvcmlhbC9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vb3ZlcnZpZXcuaHRtbCcgOiAnL2xlYXJuaW5nL2hvd3RvL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvb3ZlcnZpZXcuaHRtbCcgOiAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICcvcGx1Z2lucy8nIDogJy9tYW51YWwvcGx1Z2lucy9mdWxsLWxpc3QnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvcmJhL3JiYS13ZWxjb21lLW92ZXJ2aWV3Lmh0bWwnIDogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvcmJhL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvam9icy9vdmVydmlldy5odG1sJyA6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAnL21hbnVhbC9rZXktc3RvcmFnZS9rZXktc3RvcmFnZS5odG1sJyA6ICcvbWFudWFsL2tleS1zdG9yYWdlL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgJy9hcGkvcnVuZGVjay1hcGkuaHRtbCcgOiAnL2FwaS9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICcvaW50cm9kdWN0aW9uL2dldHRpbmctaGVscC5odG1sL21hbnVhbC9qb2Itb3B0aW9ucy5odG1sJyA6ICcvbWFudWFsL2pvYi1vcHRpb25zLmh0bWwjb3B0aW9uLW1vZGVsLXByb3ZpZGVyJyxcbiAgICAgICAgICAgICcvaW50cm9kdWN0aW9uL2dldHRpbmctaGVscC5odG1sL2FkbWluaXN0cmF0aW9uL21haW50ZW5hbmNlL3R1bmluZy1ydW5kZWNrLmh0bWwnIDogJy9hZG1pbmlzdHJhdGlvbi9tYWludGVuYW5jZS90dW5pbmctcnVuZGVjay5odG1sI3F1YXJ0ei1qb2ItdGhyZWFkY291bnQnXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIG9wZW5HcmFwaFBsdWdpbih7XG4gICAgICAgIGhvc3Q6ICdodHRwczovL2RvY3MucnVuZGVjay5jb20nLFxuICAgICAgICB0d2l0dGVyU2l0ZTogJ3J1bmRlY2snLFxuICAgICAgfSksXG4gICAgY29udGFpbmVyUGx1Z2luKFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZGVwcmVjYXRlZCcsXG4gICAgICAgICAgICBsb2NhbGVzOiB7XG4gICAgICAgICAgICAgICAgJy8nOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRJbmZvOiAnRGVwcmVjYXRpb24gV2FybmluZycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKSxcbiAgICBjb250YWluZXJQbHVnaW4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnRlcnByaXNlJyxcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAgICAgICAnLyc6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluZm86ICdBdmFpbGFibGUgaW4gUGFnZXJEdXR5IFByb2Nlc3MgQXV0b21hdGlvbiBDb21tZXJjaWFsIHByb2R1Y3RzLicsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKSxcbiAgICBjb250YWluZXJQbHVnaW4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICd0dXRvcmlhbCcsXG4gICAgICAgICAgICBsb2NhbGVzOiB7XG4gICAgICAgICAgICAgICAgJy8nOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRJbmZvOiAnVGhpcyB0dXRvcmlhbCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgaW4gdGhlIFdlbGNvbWUgUHJvamVjdHMuJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgKSxcbiAgICBjb250YWluZXJQbHVnaW4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdpbmN1YmF0aW5nJyxcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAgICAgICAnLyc6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluZm86ICdJbmN1YmF0aW5nOiBUaGlzIGZlYXR1cmUgb3IgQVBJIGlzIG5ldyEgV2UgbWF5IHN0aWxsIGhhdmUgYSBmZXcgYnVncyBvciBjaGFuZ2Ugc29tZSBmdW5jdGlvbmFsaXR5IGluIHRoZSBmdXR1cmUuJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApLFxuICAgIGNvbnRhaW5lclBsdWdpbihcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2JldGFmZWF0dXJlJyxcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAgICAgICAnLyc6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluZm86ICdCRVRBIEZFQVRVUkUnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICksXG4gICAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luKHtcbiAgICAgICAgY29tcG9uZW50c0RpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vY29tcG9uZW50cycpLFxuICAgIH0pLFxuICAgIGRvY3NlYXJjaFBsdWdpbih7XG4gICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAgICcvJzoge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIERvY3VtZW50YXRpb24nLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnU2VhcmNoIERvY3VtZW50YXRpb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXBwSWQ6ICdHUlNYTlJDRFJHJyxcbiAgICAgICAgYXBpS2V5OiAnYzQ2M2Y3NGQ2ZjM2YTVhZjgwODY1MGUwZjY5YWFkZmEnLFxuICAgICAgICBpbmRleE5hbWU6ICdwcm9kX3J1bmRlY2tfZG9jcycsXG4gICAgICAgIHNlYXJjaFBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiAxMDAsXG4gICAgICAgICAgICBmYWNldEZpbHRlcnM6IFsgYHZlcnNpb246JHtzZXR1cC5iYXNlfWAgXVxuICAgICAgICB9LFxuICAgIH0pLFxuICAgICAgICAgIFxuICBdLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9hZG1pbmlzdHJhdGlvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2FkbWluaXN0cmF0aW9uLnRzXCI7ZXhwb3J0IGRlZmF1bHQgW3tcbiAgdGV4dDogJ0FkbWluaXN0cmF0aW9uIEd1aWRlJyxcbiAgY29sbGFwc2libGU6IGZhbHNlLFxuICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1J1bmRlY2sgLyBQcm9jZXNzIEF1dG9tYXRpb24nLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSW5zdGFsbGF0aW9uJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvaW5kZXgnLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9pbnN0YWxsL3N5c3RlbS1yZXF1aXJlbWVudHMnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9pbnN0YWxsL2phcicsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvbGludXgtZGViJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vaW5zdGFsbC9saW51eC1ycG0nLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9pbnN0YWxsL3RvbWNhdCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvYXdzJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vaW5zdGFsbC93aW5kb3dzJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vaW5zdGFsbC9zb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9pbnN0YWxsL2RvY2tlcicsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2luc3RhbGwvc2lnbmluZ2tleXMnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1VwZ3JhZGluZycsXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGluazogJy91cGdyYWRpbmcvJyxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgJy91cGdyYWRpbmcvJyxcbiAgICAgICAgICAgICAgICAgICcvdXBncmFkaW5nL3VwZ3JhZGluZycsXG4gICAgICAgICAgICAgICAgICAnL3VwZ3JhZGluZy91cGdyYWRpbmctdG8tNS4wLm1kJyxcbiAgICAgICAgICAgICAgICAgICcvdXBncmFkaW5nL3VwZ3JhZGluZy10by00LjgubWQnLFxuICAgICAgICAgICAgICAgICAgJy91cGdyYWRpbmcvdXBncmFkaW5nLXRvLTQuMS5tZCcsXG4gICAgICAgICAgICAgICAgICAnL3VwZ3JhZGluZy91cGdyYWRpbmctdG8tNC5tZCcsXG4gICAgICAgICAgICAgICAgICAnL3VwZ3JhZGluZy91cGdyYWRpbmctdG8tcnVuZGVjay0zLjQubWQnLFxuICAgICAgICAgICAgICAgICAgJy91cGdyYWRpbmcvdXBncmFkaW5nLXRvLXJ1bmRlY2stMy4zLjQubWQnLFxuICAgICAgICAgICAgICAgICAgJy91cGdyYWRpbmcvdXBncmFkaW5nLXRvLXJ1bmRlY2stMy4zLm1kJyxcbiAgICAgICAgICAgICAgICAgICcvdXBncmFkaW5nL3VwZ3JhZGluZy10by1ydW5kZWNrLTMuMi5tZCcsXG4gICAgICAgICAgICAgICAgICAnL3VwZ3JhZGluZy91cGdyYWRpbmctdG8tcnVuZGVjay0zLjEubWQnLFxuICAgICAgICAgICAgICAgICAgJy91cGdyYWRpbmcvdXBncmFkaW5nLXRvLXJ1bmRlY2szJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdMaWNlbnNpbmcnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vbGljZW5zZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUnVubmVyJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci8nLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci8nLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9ydW5uZXIvcnVubmVyLWludHJvLm1kJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vcnVubmVyL3J1bm5lci1zZXR1cC5tZCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci9ydW5uZXItaW5zdGFsbC5tZCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci9ydW5uZXItY29uZmlnLm1kJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vcnVubmVyL3J1bm5lci11c2luZy5tZCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci9ydW5uZXItYWR2YW5jZWRzZXR1cC5tZCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci9ydW5uZXItbG9nZ2luZy5tZCcsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3J1bm5lci9ydW5uZXItZmFxLm1kJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vJyxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uLycsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdEYXRhYmFzZScsXG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9kYXRhYmFzZS8nLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9kYXRhYmFzZS9teXNxbCcsXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uL2RhdGFiYXNlL21zc3FsJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vZGF0YWJhc2Uvc2VjdXJlX21zc3FsJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vZGF0YWJhc2Uvb3JhY2xlJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vZGF0YWJhc2UvcG9zdGdyZXMnXG5cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RvY2tlcicsXG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgIHtsaW5rOiAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vZG9ja2VyJywgdGV4dDogJ0NvbmZpZ3VyYXRpb24gUmVmZXJlbmNlJ30sXG4gICAgICAgICAgICAgICAgICAgICAge2xpbms6ICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9kb2NrZXIvZXh0ZW5kaW5nLWNvbmZpZ3VyYXRpb24ubWQnLCB0ZXh0OiAnRXh0ZW5kaW5nIENvbmZpZ3VyYXRpb24nfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uL2hhc2hpY29ycC1jb25zdWwnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uL2VtYWlsLXNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9ndWktY3VzdG9taXphdGlvbicsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vbG9jYWxpemF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9jb25maWctZmlsZS1yZWZlcmVuY2UnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uL3N5c3RlbS1wcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9lbmNyeXB0YWJsZS1wcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1BsdWdpbnMnLFxuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFsnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vcGx1Z2lucy8nLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9wbHVnaW5zL2luc3RhbGxpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9wbHVnaW5zL3BsdWdpbi10eXBlcycsXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jb25maWd1cmF0aW9uL3BsdWdpbnMvY29uZmlndXJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9wbHVnaW5zL2J1bmRsZWQtcGx1Z2lucydcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9zdG9yYWdlLWZhY2lsaXR5JyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY29uZmlndXJhdGlvbi9yZXBvc2l0b3J5J1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdNYWludGVuYW5jZScsXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGluazogJy9hZG1pbmlzdHJhdGlvbi9tYWludGVuYW5jZS8nLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL21haW50ZW5hbmNlLycsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL21haW50ZW5hbmNlL3N0YXJ0dXAnLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9tYWludGVuYW5jZS9sb2dzJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vbWFpbnRlbmFuY2UvYmFja3VwJyxcbiAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vbWFpbnRlbmFuY2UvdHVuaW5nLXJ1bmRlY2snXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NsdXN0ZXJpbmcnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vY2x1c3Rlci8nLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvJyxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0xvYWQgQmFsYW5jZXInLFxuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvbG9hZGJhbGFuY2VyLycsXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jbHVzdGVyL2xvYWRiYWxhbmNlci9oZWFsdGgtY2hlY2snLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY2x1c3Rlci9sb2FkYmFsYW5jZXIvYXdzLWFsYicsXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jbHVzdGVyL2xvYWRiYWxhbmNlci9hd3MtZWxiJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvbG9hZGJhbGFuY2VyL2hhcHJveHknLFxuICAgICAgICAgICAgICAgICAgICAgICcvYWRtaW5pc3RyYXRpb24vY2x1c3Rlci9sb2FkYmFsYW5jZXIvaWlzJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvbG9hZGJhbGFuY2VyL05HSU5YJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTG9nIFN0b3JlJyxcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jbHVzdGVyL2xvZ3N0b3JlLycsXG4gICAgICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jbHVzdGVyL2xvZ3N0b3JlL2F6dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvbG9nc3RvcmUvczMnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvYXV0b3Rha2VvdmVyLycsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvbG9hZGJhbGFuY2VyL3JldmVyc2VfcHJveGllcycsXG4gICAgICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vcmVtb3RlLWpvYi1leGVjdXRpb24nLFxuICAgICAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9jbHVzdGVyL3JlcGxpY2F0aW9uLydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF19LFxuICAgIHtcbiAgICAgIHRleHQ6ICdTZWN1cml0eScsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvZGVmYXVsdC11c2VycycsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L2RlZmF1bHQtdXNlcnMnLFxuICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L2F1dGhlbnRpY2F0aW9uJyxcbiAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9zZWN1cml0eS9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9zZWN1cml0eS9hY2wtcG9saWN5LWVkaXRvcicsXG4gICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvc3NsJyxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdTU08nLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvc3NvJyxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L3Nzby9henVyZS1zc28ubWQnLFxuICAgICAgICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L3Nzby9va3RhLm1kJyxcbiAgICAgICAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9zZWN1cml0eS9zc28vcGluZy5tZCdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvd2ViYXBwLWh0dHAtaGVhZGVycycsXG4gICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvcHJvamVjdC1hY2wnLFxuICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L3Bhc3N3b3JkLXNlY3VyaXR5JyxcbiAgICAgICAgJy9hZG1pbmlzdHJhdGlvbi9zZWN1cml0eS9yYXRlbGltaXRpbmcnLFxuICAgICAgICAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L2Jsb2NrbGlzdCcsXG4gICAgICAgICcvYWRtaW5pc3RyYXRpb24vc2VjdXJpdHkvYXVkaXQtdHJhaWwnXG4gICAgICBdXG4gICAgfVxuICBdXG59XVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL3VzZXItZ3VpZGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy91c2VyLWd1aWRlLnRzXCI7ZXhwb3J0IGRlZmF1bHQgW3tcbiAgdGV4dDogJ1VzZXIgR3VpZGUnLFxuICBjb2xsYXBzaWJsZTogZmFsc2UsXG4gIGxpbms6ICcvbWFudWFsLycsXG4gIGNoaWxkcmVuOiBbXG4gICAgeyBsaW5rOiAnL21hbnVhbC8nLCB0ZXh0OiAnVXNlciBHdWlkZSBPdmVydmlldyd9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiUHJvamVjdHNcIixcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgbGluazogJy9tYW51YWwvcHJvamVjdHMvJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsL3Byb2plY3RzLycsXG4gICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Byb2plY3QtY3JlYXRlJyxcbiAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvY29uZmlndXJhdGlvbicsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnU0NNJyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvc2NtLycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9zY20vZ2l0JyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL3NjbS9qb2ItcmVwbGljYXRpb24nXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9wcm9qZWN0LXJlYWRtZScsXG4gICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Byb2plY3QtbW90ZCcsXG4gICAgICAgICcvbWFudWFsL3Byb2plY3RzL3BsdWdpbi1jb250cm9sJyxcbiAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvcHJvamVjdC1hcmNoaXZlJyxcbiAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvcHJvamVjdC1kZWxldGUnLFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1Jlc291cmNlIE1vZGVsIFNvdXJjZXMnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzLycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL2F3cycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL2F6dXJlJyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Jlc291cmNlLW1vZGVsLXNvdXJjZXMvZGF0YWRvZycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL2Vjcy1mYXJnYXRlJyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Jlc291cmNlLW1vZGVsLXNvdXJjZXMvZ2NwJyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Jlc291cmNlLW1vZGVsLXNvdXJjZXMva3ViZXJuZXRlcycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL2J1aWx0aW4nLFxuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvcmVzb3VyY2UtbW9kZWwtc291cmNlcy9vcmFjbGUnLFxuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvcmVzb3VyY2UtbW9kZWwtc291cmNlcy9ub2RlLXdpemFyZCcsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL3Jlc291cmNlLWVkaXRvcicsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL3NlbnN1JyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL3Jlc291cmNlLW1vZGVsLXNvdXJjZXMvc2VydmljZW5vdycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL2h0dHAtanNvbicsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9yZXNvdXJjZS1tb2RlbC1zb3VyY2VzL3Ztd2FyZSdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTm9kZSBFeGVjdXRpb24nLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4vLyAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL25vZGUtZXhlY3V0aW9uLycsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9ub2RlLWV4ZWN1dGlvbi9hd3MtZWNzJyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL25vZGUtZXhlY3V0aW9uL2F3cy1zc20nLFxuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvbm9kZS1leGVjdXRpb24vYmFzdGlvbnNzaCcsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9ub2RlLWV4ZWN1dGlvbi9idWlsdGluJyxcbiAgICAgICAgICAgICcvbWFudWFsL3Byb2plY3RzL25vZGUtZXhlY3V0aW9uL29wZW5zc2gnLFxuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvbm9kZS1leGVjdXRpb24vcG93ZXJzaGVsbCcsXG4gICAgICAgICAgICAnL21hbnVhbC9wcm9qZWN0cy9ub2RlLWV4ZWN1dGlvbi9zY3JpcHQnLFxuICAgICAgICAgICAgJy9tYW51YWwvcHJvamVjdHMvbm9kZS1leGVjdXRpb24vc3NoJ1xuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0pvYnMnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBsaW5rOiAnL21hbnVhbC9qb2JzJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsL2pvYnMnLFxuICAgICAgICAnL21hbnVhbC9jcmVhdGluZy1qb2JzJyxcbiAgICAgICAgJy9tYW51YWwvam9iLXdvcmtmbG93cycsXG4gICAgICAgICcvbWFudWFsL2pvYi1vcHRpb25zJyxcbiAgICAgICAgJy9tYW51YWwvam9icy9qb2Itbm90aWZpY2F0aW9ucycsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTG9nIEZpbHRlcnMnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGxpbms6ICcvbWFudWFsL2xvZy1maWx0ZXJzLycsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICcvbWFudWFsL2xvZy1maWx0ZXJzLycsXG4gICAgICAgICAgICAnL21hbnVhbC9sb2ctZmlsdGVycy9rZXktdmFsdWUtZGF0YS5tZCcsXG4gICAgICAgICAgICAnL21hbnVhbC9sb2ctZmlsdGVycy9xdWlldC1vdXRwdXQubWQnLFxuICAgICAgICAgICAgJy9tYW51YWwvbG9nLWZpbHRlcnMvcHJvZ3Jlc3MtYmFkZ2UubWQnLFxuICAgICAgICAgICAgJy9tYW51YWwvbG9nLWZpbHRlcnMvaGlnaGxpZ2h0LW91dHB1dC5tZCcsXG4gICAgICAgICAgICAnL21hbnVhbC9sb2ctZmlsdGVycy9yZW5kZXItZm9ybWF0dGVkLWRhdGEubWQnLFxuICAgICAgICAgICAgJy9tYW51YWwvbG9nLWZpbHRlcnMvbWFzay1wYXNzd29yZHMubWQnLFxuICAgICAgICAgICAgJy9tYW51YWwvbG9nLWZpbHRlcnMvanNvbi1qcS5tZCcsXG4gICAgICAgICAgICAnL21hbnVhbC9sb2ctZmlsdGVycy9tdWx0aS1saW5lLXJlZ2V4Lm1kJ1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgJy9tYW51YWwvam9iLXBsdWdpbnMnLFxuICAgICAgICAnL21hbnVhbC9leGVjdXRpb24tbGlmZWN5Y2xlL2pvYi1yZXN1bWUubWQnLFxuICAgICAgICAnL21hbnVhbC9leGVjdXRpb24tbGlmZWN5Y2xlL2pvYi1yZXRyeS1mYWlsZWQtbm9kZXMubWQnLFxuICAgICAgICAnL21hbnVhbC9leGVjdXRpb24tbGlmZWN5Y2xlL3Jlc3VsdC1kYXRhLm1kJyxcbiAgICAgICAgJy9tYW51YWwvZXhlY3V0aW9uLWxpZmVjeWNsZS9yb2ktbWV0cmljcy5tZCcsXG4gICAgICAgICcvbWFudWFsL2pvYnMvam9iLXF1ZXVlLm1kJyxcbiAgICAgICAgJy9tYW51YWwvam9icy9haS1nZW5lcmF0ZWQtcnVuYm9va3MubWQnXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnUGx1Z2lucycsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGxpbms6Jy9tYW51YWwvcGx1Z2lucy9pbmRleCcsXG4gICAgICBjaGlsZHJlbjpbXG4gICAgICAgIHt0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL21hbnVhbC9wbHVnaW5zL2luZGV4J30sXG4gICAgICAgIHt0ZXh0OiAnQVdTJywgbGluazogJy9tYW51YWwvcGx1Z2lucy9hd3MtcGx1Z2lucy1vdmVydmlldy5tZCd9LFxuICAgICAgICB7dGV4dDogJ0F6dXJlJywgbGluazogJy9tYW51YWwvcGx1Z2lucy9henVyZS1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnRGF0YWRvZycsIGxpbms6Jy9tYW51YWwvcGx1Z2lucy9kYXRhZG9nLXBsdWdpbnMtb3ZlcnZpZXcubWQnfSxcbiAgICAgICAge3RleHQ6ICdHb29nbGUgQ2xvdWQnLCBsaW5rOiAnL21hbnVhbC9wbHVnaW5zL2djcC1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnSmlyYScsIGxpbms6ICcvbWFudWFsL3BsdWdpbnMvamlyYS1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnS3ViZXJuZXRlcycsIGxpbms6ICcvbWFudWFsL3BsdWdpbnMva3ViZXJuZXRlcy1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnUGFnZXJEdXR5JywgbGluazogJy9tYW51YWwvcGx1Z2lucy9wYWdlcmR1dHktcGx1Z2lucy1vdmVydmlldy5tZCd9LFxuICAgICAgICB7dGV4dDogJ1NlbnN1JywgbGluazogJy9tYW51YWwvcGx1Z2lucy9zZW5zdS1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnU2VydmljZU5vdycsIGxpbms6ICcvbWFudWFsL3BsdWdpbnMvc2VydmljZW5vdy1wbHVnaW5zLW92ZXJ2aWV3Lm1kJ30sXG4gICAgICAgIHt0ZXh0OiAnRnVsbCBMaXN0JywgbGluazogJy9tYW51YWwvcGx1Z2lucy9mdWxsLWxpc3QnfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ05vZGVzJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgbGluazonL21hbnVhbC8wNS1ub2RlcycsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnL21hbnVhbC8wNS1ub2RlcycsXG4gICAgICAgICcvbWFudWFsL25vZGUtZW5oYW5jZXJzLm1kJyxcbiAgICAgICAgJy9tYW51YWwvMTEtbm9kZS1maWx0ZXJzLm1kJyxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIZWFsdGggQ2hlY2tzJyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBsaW5rOiAnL21hbnVhbC9oZWFsdGhjaGVja3MnLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICcvbWFudWFsL2hlYWx0aGNoZWNrcycsXG4gICAgICAgICAgICAgICcvbWFudWFsL2hlYWx0aGNoZWNrcGx1Z2lucy9kYXRhZG9nLm1kJyxcbiAgICAgICAgICAgICAgJy9tYW51YWwvaGVhbHRoY2hlY2twbHVnaW5zL3NlbnN1Lm1kJyxcbiAgICAgICAgICAgICAgJy9tYW51YWwvaGVhbHRoY2hlY2twbHVnaW5zL2F6dXJlLWhlYWx0aGNoZWNrLm1kJyxcbiAgICAgICAgICAgICAgJy9tYW51YWwvaGVhbHRoY2hlY2twbHVnaW5zL2F3cy1lYzItaGVhbHRoY2hlY2subWQnLFxuICAgICAgICAgICAgICAnL21hbnVhbC9oZWFsdGhjaGVja3BsdWdpbnMvZ2NwLWNvbXB1dGUtaGVhbHRoY2hlY2subWQnXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnS2V5IFN0b3JhZ2UnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBsaW5rOiAnL21hbnVhbC9rZXktc3RvcmFnZS9pbmRleCcsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnL21hbnVhbC9rZXktc3RvcmFnZS9pbmRleCcsXG4gICAgICAgICcvbWFudWFsL2tleS1zdG9yYWdlL2VudGVycHJpc2UtcnVubmVyLWtleS1zdG9yYWdlLm1kJyxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdLZXkgU3RvcmFnZSBQbHVnaW5zJyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgJy9tYW51YWwva2V5LXN0b3JhZ2Uvc3RvcmFnZS1wbHVnaW5zL3RoeWNvdGljLXN0b3JhZ2UubWQnLFxuICAgICAgICAgICAgJy9tYW51YWwva2V5LXN0b3JhZ2Uvc3RvcmFnZS1wbHVnaW5zL3ZhdWx0Lm1kJyxcbiAgICAgICAgICAgICcvbWFudWFsL2tleS1zdG9yYWdlL3N0b3JhZ2UtcGx1Z2lucy9jeWJlcmFyay1zdG9yYWdlLm1kJ1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdDb21tYW5kcycsXG4gICAgICBsaW5rOiAnL21hbnVhbC8wNi1jb21tYW5kcycsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdBY3Rpdml0eScsXG4gICAgICBsaW5rOiAnL21hbnVhbC8wOC1hY3Rpdml0eScsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsLzA4LWFjdGl2aXR5JyxcbiAgICAgICAgJy9tYW51YWwvMDctZXhlY3V0aW9ucydcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdTY2hlZHVsZXMgKEVudGVycHJpc2UpJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgbGluazogJy9tYW51YWwvc2NoZWR1bGVzL3Byb2plY3Qtc2NoZWR1bGVzJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsL3NjaGVkdWxlcy9wcm9qZWN0LXNjaGVkdWxlcy5tZCcsXG4gICAgICAgICcvbWFudWFsL3NjaGVkdWxlcy9taXNzZWRqb2JmaXJlcy5tZCdcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnVG91ciBNYW5hZ2VyIChFbnRlcnByaXNlKScsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGxpbms6ICcvbWFudWFsL3RvdXItbWFuYWdlci5tZCcsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQ2FsZW5kYXJzIChFbnRlcnByaXNlKScsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGxpbms6Jy9tYW51YWwvY2FsZW5kYXJzJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsL2NhbGVuZGFycycsXG4gICAgICAgICcvbWFudWFsL2NhbGVuZGFycy9zeXN0ZW0tY2FsZW5kYXJzLm1kJyxcbiAgICAgICAgJy9tYW51YWwvY2FsZW5kYXJzL3Byb2plY3QtY2FsZW5kYXJzLm1kJyxcbiAgICAgICAgJy9tYW51YWwvY2FsZW5kYXJzL2ltcG9ydC1leHBvcnQubWQnXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnV2ViaG9va3MnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBsaW5rOiAnL21hbnVhbC93ZWJob29rcycsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnL21hbnVhbC93ZWJob29rcycsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnV2ViaG9va3MgSGFuZGxlcnMnLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL21hbnVhbC93ZWJob29rcy9hZHZhbmNlZC1ydW4tam9iJyxcbiAgICAgICAgICAgICcvbWFudWFsL3dlYmhvb2tzL3BhZ2VyZHV0eS1ydW4tam9iJyxcbiAgICAgICAgICAgICcvbWFudWFsL3dlYmhvb2tzL2RhdGFkb2ctcnVuLWpvYi5tZCcsXG4gICAgICAgICAgICAnL21hbnVhbC93ZWJob29rcy9hd3Mtc25zLXdlYmhvb2snLFxuICAgICAgICAgICAgJy9tYW51YWwvd2ViaG9va3MvZ2l0aHViLXdlYmhvb2snLFxuICAgICAgICAgICAgJy9tYW51YWwvd2ViaG9va3MvcnVuLWpvYi5tZCcsXG4gICAgICAgICAgICAnL21hbnVhbC93ZWJob29rcy9sb2ctZXZlbnRzLm1kJ1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQcm9qZWN0IFNldHRpbmdzJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgbGluazogJy9tYW51YWwvcHJvamVjdC1zZXR0aW5ncycsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnU3lzdGVtIE1lbnUnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBsaW5rOiAnL21hbnVhbC9zeXN0ZW0tY29uZmlncycsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICcvbWFudWFsL3N5c3RlbS1jb25maWdzJyxcbiAgICAgICAgICAnL21hbnVhbC91c2VyLW1hbmFnZW1lbnQvdXNlci1tZ210JyxcbiAgICAgICAgICAnL21hbnVhbC91c2VyLW1hbmFnZW1lbnQvcGFzc3dvcmQtcmVzZXQnLFxuICAgICAgICAgICcvbWFudWFsL3VzZXItbWFuYWdlbWVudC91c2VyLWNsYXNzZXMnLFxuICAgICAgICAgICcvbWFudWFsL3N5c3RlbS1yZXBvcnQnLFxuICAgICAgICAgICcvbWFudWFsL2NvbmZpZ3VyYXRpb24tbWdtdC9jb25maWdtZ210J1xuICAgICAgXVxuICAgIH0sXG4gICAge2xpbms6ICcvbWFudWFsLzEwLXVzZXIubWQnLCB0ZXh0OiAgJ1Byb2ZpbGUgTWVudSd9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdJbnRlZ3JhdGlvbnMnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBsaW5rOiAnL21hbnVhbC9pbnRlZ3JhdGlvbnMnLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAnL21hbnVhbC9pbnRlZ3JhdGlvbnMvc2VydmljZW5vdy1hcHAubWQnXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnRG9jdW1lbnQgRm9ybWF0cycsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbWFudWFsL2RvY3VtZW50LWZvcm1hdC1yZWZlcmVuY2UvYWNscG9saWN5LXYxMC5tZCcsXG4gICAgICAgICcvbWFudWFsL2RvY3VtZW50LWZvcm1hdC1yZWZlcmVuY2Uvam9iLXYyMC5tZCcsXG4gICAgICAgICcvbWFudWFsL2RvY3VtZW50LWZvcm1hdC1yZWZlcmVuY2Uvam9iLXlhbWwtdjEyLm1kJyxcbiAgICAgICAgJy9tYW51YWwvZG9jdW1lbnQtZm9ybWF0LXJlZmVyZW5jZS9yZXNvdXJjZS1qc29uLXYxMC5tZCcsXG4gICAgICAgICcvbWFudWFsL2RvY3VtZW50LWZvcm1hdC1yZWZlcmVuY2UvcmVzb3VyY2UtdjEzLm1kJyxcbiAgICAgICAgJy9tYW51YWwvZG9jdW1lbnQtZm9ybWF0LXJlZmVyZW5jZS9yZXNvdXJjZS15YW1sLXYxMy5tZCcsXG4gICAgICBdXG4gICAgfVxuICBdXG59XVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2NvbW1hbmQtbGluZS10b29scy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2NvbW1hbmQtbGluZS10b29scy50c1wiO2V4cG9ydCBkZWZhdWx0IFt7XG4gIHRleHQ6ICdDb21tYW5kIExpbmUgVG9vbCcsXG4gIGNvbGxhcHNpYmxlOiBmYWxzZSxcbiAgbGluazogJy9yZC1jbGkvJyxcbiAgY2hpbGRyZW46IFtcbiAgICB7bGluazogJy9yZC1jbGkvJywgdGV4dDogJ092ZXJ2aWV3J30sXG4gICAge2xpbms6ICcvcmQtY2xpL2luc3RhbGwubWQnLHRleHQ6ICdJbnN0YWxsYXRpb24nfSxcbiAgICB7bGluazogJy9yZC1jbGkvY29uZmlndXJhdGlvbi5tZCcsdGV4dDogJ0NvbmZpZ3VyYXRpb24nfSxcbiAgICB7bGluazogJy9yZC1jbGkvY29tbWFuZHMubWQnLHRleHQ6ICdDb21tYW5kcyd9LFxuICAgIHtsaW5rOiAnL3JkLWNsaS9yZC1hY2wubWQnLHRleHQ6ICdBQ0wgVG9vbCd9LFxuICAgIHtsaW5rOiAnL3JkLWNsaS9zY3JpcHRpbmcubWQnLHRleHQ6ICdTY3JpcHRpbmcnfSxcbiAgICB7bGluazogJy9yZC1jbGkvc3NsLm1kJyx0ZXh0OiAnU1NMJ30sXG4gICAge2xpbms6ICcvcmQtY2xpL2phdmFsaWIubWQnLHRleHQ6ICdKQVZBIEFQSSBMaWJyYXJ5J30sXG4gICAge2xpbms6ICcvcmQtY2xpL2NoYW5nZXMubWQnLHRleHQ6ICdDaGFuZ2UgTG9nJ30sXG4gICAge2xpbms6ICcvcmQtY2xpL2V4dGVuc2lvbnMubWQnLHRleHQ6ICdFeHRlbnNpb25zJ31cbiAgXVxufV1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9wbHVnaW4tZGV2ZWxvcG1lbnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9wbHVnaW4tZGV2ZWxvcG1lbnQudHNcIjtleHBvcnQgZGVmYXVsdCBbe1xuICB0ZXh0OiAnUGx1Z2luIERldmVsb3BtZW50JyxcbiAgY29sbGFwc2libGU6IGZhbHNlLFxuICBjaGlsZHJlbjogW1xuICAgICcvZGV2ZWxvcGVyLzAxLXBsdWdpbi1kZXZlbG9wbWVudC5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDItcGx1Z2luLWFubm90YXRpb25zLm1kJyxcbiAgICAnL2RldmVsb3Blci8wMy1tb2RlbC1zb3VyY2UtZm9ybWF0LXBhcnNlci1nZW5lcmF0b3ItcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDMtbW9kZWwtc291cmNlLXBsdWdpbnMubWQnLFxuICAgICcvZGV2ZWxvcGVyLzAzLXN0ZXAtcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDQtZmlsZS1jb3BpZXItcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDQtbm9kZS1leGVjdXRpb24tcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDUtbm90aWZpY2F0aW9uLXBsdWdpbnMubWQnLFxuICAgICcvZGV2ZWxvcGVyLzA2LWxvZ2dpbmctcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMDctc3RvcmFnZS1wbHVnaW4ubWQnLFxuICAgICcvZGV2ZWxvcGVyLzA4LXN0b3JhZ2UtY29udmVydGVyLXBsdWdpbnMubWQnLFxuICAgICcvZGV2ZWxvcGVyLzA5LW9yY2hlc3RyYXRvci1wbHVnaW4ubWQnLFxuICAgICcvZGV2ZWxvcGVyLzEwLXNjbS1wbHVnaW5zLm1kJyxcbiAgICAnL2RldmVsb3Blci8xMS11aS1wbHVnaW5zLm1kJyxcbiAgICAnL2RldmVsb3Blci9sb2ctZmlsdGVyLXBsdWdpbnMubWQnLFxuICAgICcvZGV2ZWxvcGVyL2NvbnRlbnQtY29udmVydGVyLXBsdWdpbnMubWQnLFxuICAgICcvZGV2ZWxvcGVyLzEyLW9wdGlvbi12YWx1ZXMtcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvMTMtdXNlci1ncm91cC1zb3VyY2UtcGx1Z2luLm1kJyxcbiAgICAnL2RldmVsb3Blci8xNC1maWxlLXVwbG9hZC1wbHVnaW5zLm1kJyxcbiAgICAnL2RldmVsb3Blci9wYXNzd29yZC1lbmNyeXB0LXV0aWxpdHkubWQnLFxuICAgICcvZGV2ZWxvcGVyLzE2LXdlYmhvb2stcGx1Z2lucy5tZCcsXG4gICAgJy9kZXZlbG9wZXIvZXhlY3V0aW9uLWxpZmVjeWNsZS5tZCcsXG4gICAgJy9kZXZlbG9wZXIvam9iLWxpZmVjeWNsZS5tZCcsXG4gICAgJy9kZXZlbG9wZXIvYXVkaXQtZXZlbnRzLWxpc3RlbmVycy5tZCdcbiAgXVxufV1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL2dldENoaWxkcmVuLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL2dldENoaWxkcmVuLmpzXCI7aW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCBtYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0J1xuaW1wb3J0IG1ldGEgZnJvbSAnbWFya2Rvd24taXQtbWV0YSdcblxuLy8gTG9hZCBhbGwgTUQgZmlsZXMgaW4gYSBzcGVjaWZpZWQgZGlyZWN0b3J5IGFuZCBvcmRlciBieSBtZXRhZGF0YSAnb3JkZXInIHZhbHVlXG5jb25zdCBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudF9wYXRoLCBkaXIpIHtcbiAgICBsZXQgZmlsZXMgPSBnbG9iXG4gICAgICAgIC5zeW5jKHBhcmVudF9wYXRoICsgKGRpciA/IGAvJHtkaXJ9YCA6ICcnKSArICcvKi5tZCcpXG4gICAgICAgIC5tYXAocGF0aCA9PiB7XG4gICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBNYXJrZG93bkl0XG4gICAgICAgICAgICBsZXQgbWQgPSBuZXcgbWFya2Rvd25JdCgpO1xuICAgICAgICAgICAgLy8gQWRkIG1hcmtkb3duLWl0LW1ldGFcbiAgICAgICAgICAgIG1kLnVzZShtZXRhKTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgb3JkZXIgdmFsdWVcbiAgICAgICAgICAgIGxldCBmaWxlID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBtZC5yZW5kZXIoZmlsZSk7XG4gICAgICAgICAgICBsZXQgb3JkZXIgPSBtZC5tZXRhLm9yZGVyO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIFwicGFyZW50X3BhdGhcIiBhbmQgXCIubWRcIlxuICAgICAgICAgICAgcGF0aCA9IHBhdGguc2xpY2UocGFyZW50X3BhdGgubGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBcImluZGV4XCIsIG1ha2luZyBpdCB0aGUgZGUgZmFjdG8gaW5kZXggcGFnZVxuICAgICAgICAgICAgaWYgKHBhdGguZW5kc1dpdGgoJ2luZGV4Lm1kJykpIHtcbiAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIC04KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIG9yZGVyXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgIC8vIFJldHVybiB0aGUgb3JkZXJlZCBsaXN0IG9mIGZpbGVzLCBzb3J0IGJ5ICdvcmRlcicgdGhlbiAncGF0aCdcbiAgICBjb25zdCBjaGlsZHJlbiA9IF8uc29ydEJ5KGZpbGVzLCBbJ29yZGVyJywgJ3BhdGgnXSlcbiAgICAgICAgLm1hcChmaWxlID0+IGZpbGUucGF0aCk7XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGdldENoaWxkcmVuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2xlYXJuaW5nLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvbGVhcm5pbmcudHNcIjtpbXBvcnQgZ2V0Q2hpbGRyZW4gZnJvbSAnLi4vZ2V0Q2hpbGRyZW4nXG5cbmV4cG9ydCBkZWZhdWx0IFt7XG4gIHRleHQ6ICdMZWFybmluZycsXG4gIGNvbGxhcHNpYmxlOiBmYWxzZSxcbiAgY2hpbGRyZW46IFtcbiAgICAnL2xlYXJuaW5nLycsXG4gICAge1xuICAgICAgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICBsaW5rOiAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9pbmRleCcsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHsgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvaW5kZXgnLCB0ZXh0OiAnT3ZlcnZpZXcnfSxcbiAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9ub2Rlcy1vdmVydmlldy5tZCcsIHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gTm9kZXMnIH0sXG4gICAgICAgIHsgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvdXNlcnMtb3ZlcnZpZXcubWQnLCB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIFVzZXJzJyB9LFxuICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL3NlY3JldHMtb3ZlcnZpZXcubWQnLCB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIE1hbmFnaW5nIFNlY3JldHMnIH0sXG4gICAgICAgIHsgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvYWNsLW92ZXJ2aWV3Lm1kJywgdGV4dDogJ0ludHJvZHVjdGlvbiB0byBBY2Nlc3MgQ29udHJvbCcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdTZXR1cCBhbmQgTWFpbnRlbmFuY2UnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL3NlcnZlci1zZXR1cC1vdmVydmlldy5tZCcsIHRleHQ6ICdPdmVydmlldyBvZiBPbiBQcmVtaXNlIFNlcnZlciBTZXR1cCcgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvcHJvamVjdHMtb3ZlcnZpZXcubWQnLCB0ZXh0OiAnU2V0dGluZyB1cCBhIFByb2plY3QnIH0sXG4gICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL3N5c3RlbS1tYWludGVuYW5jZS1vdmVydmlldy5tZCcsIHRleHQ6ICdPdmVydmlldyBvZiBPbiBQcmVtaXNlIFN5c3RlbSBNYWludGVuYW5jZScgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvcnVubmVycy1vdmVydmlldy5tZCcsIHRleHQ6ICdXb3JraW5nIHdpdGggUnVubmVycyBpbiBQcm9jZXNzIEF1dG9tYXRpb24nIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICBcdCAgdGV4dDogJ1J1bmJvb2sgQXV0b21hdGlvbicsXG4gICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvcmJhL2luZGV4JyxcbiAgICAgIFx0ICBjaGlsZHJlbjogW1xuICAgICAgXHQgIFx0eyBsaW5rOiAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9yYmEvaW5kZXgnLCB0ZXh0OiAnR2V0dGluZyBTdGFydGVkIHdpdGggUnVuYm9vayBBdXRvbWF0aW9uJ30sXG4gICAgICBcdCAgXHR7IGxpbms6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL3JiYS9ydW5uZXItc2V0dXAubWQnLCB0ZXh0OiAnU2V0dGluZyB1cCBhIFJ1bm5lcid9LFxuICAgICAgXHQgIFx0eyBsaW5rOiAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9yYmEvbm9kZS1zZXR1cC5tZCcsIHRleHQ6ICdBZGRpbmcgYSBOb2RlIHdpdGggUnVubmVyJ30sXG4gICAgICBcdCAgXVxuICAgIFx0fSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdUdXRvcmlhbCcsXG4gICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgbGluazogJy9sZWFybmluZy90dXRvcmlhbC9pbmRleCcsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICcvbGVhcm5pbmcvdHV0b3JpYWwvaW5kZXgnLFxuICAgICAgICAgICAgJy9sZWFybmluZy90dXRvcmlhbC9jcmVhdGluZ25vZGVzJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvdHV0b3JpYWwvY29tbWFuZHMnLFxuICAgICAgICAgICAgJy9sZWFybmluZy90dXRvcmlhbC9qb2JzJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvdHV0b3JpYWwvdXNlcnMnLFxuICAgICAgICAgICAgJy9sZWFybmluZy90dXRvcmlhbC9hY2xzJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvdHV0b3JpYWwvY29uY2x1c2lvbidcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnV29ya2luZyB3aXRoIEpvYnMnLFxuICAgICAgICAgIGxpbms6ICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvaW5kZXgnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9qb2JzL2luZGV4JyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvd2hhdC1pcy1hLWpvYi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9qb2JzL3BpZWNlcy1vZi1hLWpvYi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9qb2JzL2hvdy10by1ydW4tYS1qb2IubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvam9icy93b3JrZmxvdy1zdHJhdGVnaWVzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvbm9kZS1zb3VyY2VzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvc2hhcmluZy1qb2JzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvam9iLW9wdGlvbnMubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvam9icy9jcmVhdGluZy1hLWpvYi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2dldHRpbmctc3RhcnRlZC9qb2JzL2pvYi1wbHVnaW5zLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvZ2V0dGluZy1zdGFydGVkL2pvYnMvY29tbWVyY2lhbC1qb2ItZmVhdHVyZXMubWQnXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnSG93IFRvJyxcbiAgICAgIGxpbms6ICcvbGVhcm5pbmcvaG93dG8vaW5kZXgnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvaG93dG8vaW5kZXgubWQnLCB0ZXh0OiAnT3ZlcnZpZXcnIH0sXG4gICAgICAgIHsgbGluazogJy9sZWFybmluZy9ob3d0by93ZWxjb21lLXByb2plY3Qtc3RhcnRlci5tZCcsIHRleHQ6ICdXZWxjb21lIFByb2plY3RzJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0FDTCBSZWNpcGVzJyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBsaW5rOiAnL2xlYXJuaW5nL2hvd3RvL2FjbHMvJyxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgLi4uZ2V0Q2hpbGRyZW4oJ2RvY3MvbGVhcm5pbmcvJywgJ2hvd3RvL2FjbHMnKVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vcnVubmVyLXNlcnZpY2Utd2luZG93cy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL21pZ3JhdGUtdG8tcnVuZGVjay1wYWNrYWdlcy1yZXBvLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vaW5zdGFsbC1jZW50b3MubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9taWdyYXRlLXRvLW15c3FsLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vdXNlLXRlcnJhZm9ybS1wcm92aWRlci5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3RlcnJhZm9ybS1qb2JzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vbGVhcm4tcmQtY2xpLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vZWxrLWludGVncmF0aW9uLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vYWNsX2Jhc2ljX2V4YW1wbGVzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vYXBhY2hlMi1wcm94eS1nc3NhcGkubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by93b3JraW5nbG9ncy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL1MzLW1pbmlvLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vaG93MnNjbS5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2VncmVzcy1wcm94eS5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2hvdzItdGVycmEtcmQtYXdzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vaG93Mi10ZXJyYS1yZC1la3MubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by90cm91Ymxlc2hvb3RpbmcubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9jdXN0b21pemUtZ3VpLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vcnVubmVyLXBhb3Atc2VsZnNpZ25lZC5tZCdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTWFuYWdpbmcgTm9kZXMnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3NzaC1vbi1saW51eC1ub2Rlcy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2NvbmZpZ3VyaW5nLXdpbmRvd3Mtbm9kZXMubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9yZXZva2Utc3NoLWtleXMubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9ob3cyd2lucm0tcnVuZGVjay5tZCdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdXcml0aW5nIEpvYnMnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3VzZS1leGFtcGxlLWpvYnMubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9wYXNzaW5nLXZhcmlhYmxlcy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2NhbGxpbmctYXBpcy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2xvZzRzaGVsbC5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3VzZS1yb2ktbWV0cmljcy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2Vudi1pbi1ub3RpZmljYXRpb25zLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vcmFiYml0bXEtZGlhZy5tZCdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSW50ZWdyYXRpbmcnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3VzaW5nLXdlYmhvb2tzLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vY3Jvc3MtYWNjb3VudC1hd3Mtc3NtLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vcGFnZXJkdXR5LW5vdGlmaWNhdGlvbi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3VzaW5nLWFuc2libGUubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9jb25maWctc24tbm9kZXNvdXJjZS5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2NvbmZpZ3VyZS1nY3AtcGx1Z2lucy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3NuLW1pZHNlcnZlci5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3J1bmRlY2stZXhwb3J0ZXIubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by92YXVsdC1pbnRlZ3JhdGlvbi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2hvd3RvamVua2lucy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2hvdzJrdWJlLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vYWN0aW9ucy13aXRoLXJiYS5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2V2ZW50cy13aXRoLXJiYS5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2VtYWlsLWdtYWlsLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vZW1haWwtb3V0bG9vay5tZCdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQ3VzdG9taXppbmcnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL3BsdWdpbi1ib290c3RyYXAubWQnLFxuICAgICAgICAgICAgJy9sZWFybmluZy9ob3d0by9jdXN0b20tc2NyaXB0LXBsdWdpbi1oZWxsby13b3JsZC5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2phdmEtcGx1Z2luLm1kJyxcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vZ3Jvb3Z5LXBsdWdpbi5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2hvdzJleHRlbmRkb2NrZXIubWQnXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0NvbnRyaWJ1dGluZycsXG4gICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICcvbGVhcm5pbmcvaG93dG8vdXBkYXRlLXJ1bmRlY2stZG9jcy5tZCcsXG4gICAgICAgICAgICAnL2xlYXJuaW5nL2hvd3RvL2J1aWxkLXJ1bmRlY2subWQnXG5cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdTb2x1dGlvbnMnLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0F1dG9tYXRlZCBEaWFnbm9zdGljcycsXG4gICAgICAgICAgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2luZGV4JyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvaW5kZXgubWQnLCB0ZXh0OiAnU29sdXRpb24gU3VtbWFyeScgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2dldHRpbmctc3RhcnRlZC5tZCcsIHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnIH0sXG4gICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9hdXRvbWF0aW9uLWFjdGlvbnMubWQnLCB0ZXh0OiAnQ29uZmlndXJpbmcgQXV0b21hdGlvbiBBY3Rpb25zJyB9LFxuICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvZmlyc3QtZGlhZ25vc3RpYy1ydW5ib29rLm1kJywgdGV4dDogJ0ZpcnN0IERpYWdub3N0aWMgUnVuYm9vaycgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2ludGVncmF0aW5nLWNoYXQtdG9vbHMubWQnLCB0ZXh0OiAnSW50ZWdyYXRpbmcgQ2hhdCBUb29scycgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0V4YW1wbGVzICYgQmVzdCBQcmFjdGljZXMnLFxuICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvZXhhbXBsZXMtb3ZlcnZpZXcubWQnLFxuICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9leGFtcGxlcy1vdmVydmlldy5tZCcsIHRleHQ6ICdFeGFtcGxlcyBPdmVydmlldycgfSxcbiAgICAgICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9leGFtcGxlcy9wdWJsaWMtY2xvdWQtcHJvdmlkZXJzLm1kJywgdGV4dDogJ1B1YmxpYyBDbG91ZCBQcm92aWRlcnMnIH0sXG4gICAgICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvZXhhbXBsZXMvbGludXgubWQnLCB0ZXh0OiAnTGludXgnIH0sXG4gICAgICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvZXhhbXBsZXMvd2luZG93cy5tZCcsIHRleHQ6ICdXaW5kb3dzJyB9LFxuICAgICAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2V4YW1wbGVzL2FwaXMubWQnLCB0ZXh0OiAnU2FhUyAmIEludGVybmFsIEFQSVxcJ3MnIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0t1YmVybmV0ZXMnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2V4YW1wbGVzL2t1YmVybmV0ZXMnLFxuICAgICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9leGFtcGxlcy9rdWJlcm5ldGVzJywgdGV4dDogJ0t1YmVybmV0ZXMgRXhhbXBsZXMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2V4YW1wbGVzL2s4cy1sb2dzLWV2ZW50cy5tZCcsIHRleHQ6ICdQb2QgTG9ncyAmIEs4cyBFdmVudHMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2V4YW1wbGVzL2s4cy1hcHAtZGVidWctY2FwdHVyZS5tZCcsIHRleHQ6ICdBcHAgRGVidWcgU3RhdGUgQ2FwdHVyZScgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvZXhhbXBsZXMvZGF0YWJhc2VzLm1kJywgdGV4dDogJ0RhdGFiYXNlcycgfSxcbiAgICAgICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9leGFtcGxlcy9uZXR3b3JrLWRldmljZXMubWQnLCB0ZXh0OiAnTmV0d29yayBEZXZpY2VzJyB9LFxuICAgICAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2V4YW1wbGVzL29ic2VydmFiaWxpdHktaW50ZWdyYXRpb25zLm1kJywgdGV4dDogJ09ic2VydmFiaWxpdHkgSW50ZWdyYXRpb25zJyB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9zZW5kaW5nLW91dHB1dC10by1wYWdlcmR1dHkubWQnLCB0ZXh0OiAnU2VuZGluZyBPdXRwdXQgdG8gUGFnZXJEdXR5JyB9LFxuICAgICAgICAgICAgeyBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvaW50ZWdyYXRpbmctd2l0aC1ldmVudC1vcmNoZXN0cmF0aW9uLm1kJywgdGV4dDogJ0ludGVncmF0aW5nIHdpdGggRXZlbnQgT3JjaGVzdHJhdGlvbicgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL3NpbXBsaWZ5aW5nLWRpYWdub3N0aWNzLm1kJywgdGV4dDogJ1NpbXBsaWZ5aW5nIERpYWdub3N0aWNzIE91dHB1dCcgfSxcbiAgICAgICAgICAgIHsgbGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0b21hdGVkLWRpYWdub3N0aWNzL2F1dG9tYXRpb24tYmV5b25kLXRyaWFnZS5tZCcsIHRleHQ6ICdBdXRvbWF0aW9uIEJleW9uZCBUcmlhZ2UnIH0sXG4gICAgICAgICAgICB7IGxpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG9tYXRlZC1kaWFnbm9zdGljcy9mZWVkYmFjay1mYXEubWQnLCB0ZXh0OiAnRmVlZGJhY2sgJiBGQVEnIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAge2xpbms6ICcvbGVhcm5pbmcvc29sdXRpb25zL2F1dG8taW5jaWRlbnQta3ViZXJuZXRlcy1sb2dzLm1kJywgdGV4dDogJ0V4YW1wbGU6IEt1YmVybmV0ZXMgTG9ncyd9LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICB7bGluazogJy9sZWFybmluZy9zb2x1dGlvbnMvYXV0by1kaWFnbm9zdGljcy1naXRodWItc2NyaXB0Lm1kJywgdGV4dDogJ0V4YW1wbGU6IFJhdyBTY3JpcHRzJ31cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdUZXJtaW5vbG9neScsXG4gICAgICBsaW5rOiAnL2xlYXJuaW5nL3R1dG9yaWFsL3Rlcm1pbm9sb2d5JyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJy9sZWFybmluZy90dXRvcmlhbC90ZXJtaW5vbG9neSdcbiAgICAgIF1cbiAgICB9XG4gIF1cbn1dXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9nZXRIaXN0b3J5LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL2dldEhpc3RvcnkuanNcIjtpbXBvcnQgY21wIGZyb20gJ3NlbXZlci1jb21wYXJlJ1xuXG5pbXBvcnQgZ2V0Q2hpbGRyZW4gZnJvbSAnLi9nZXRDaGlsZHJlbidcblxuXG5mdW5jdGlvbiBnZXRIaXN0b3J5KHBhcmVudCwgZGlyKSB7XG4gICAgY29uc3QgZW50cmllcyA9IGdldENoaWxkcmVuKHBhcmVudCwgZGlyKVxuXG4gICAgY29uc3Qgc29ydGVkID0gZW50cmllcy5zb3J0KGNtcCkucmV2ZXJzZSgpXG5cbiAgICByZXR1cm4gc29ydGVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEhpc3RvcnkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvaGlzdG9yeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9zaWRlYmFyLW1lbnVzL2hpc3RvcnkudHNcIjtpbXBvcnQgZ2V0SGlzdG9yeSBmcm9tICcuLi9nZXRIaXN0b3J5J1xuaW1wb3J0IGdldENoaWxkcmVuIGZyb20gJy4uL2dldENoaWxkcmVuJ1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXh0OiAnUmVsZWFzZSBOb3RlcycsXG4gICAgY29sbGFwc2libGU6IGZhbHNlLFxuICAgIGxpbms6ICcvaGlzdG9yeS8nLFxuICAgIGhlYWRlckRlcHRoOiAxLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICAuLi5nZXRIaXN0b3J5KCdkb2NzL2hpc3RvcnkvJyksXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICc1LngnLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgbGluazogJy9oaXN0b3J5LycsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRIaXN0b3J5KCdkb2NzL2hpc3RvcnkvJywgJzVfeCcpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnNC54JyxcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRIaXN0b3J5KCdkb2NzL2hpc3RvcnkvJywgJzRfeCcpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnMy40LngnLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IGdldEhpc3RvcnkoJ2RvY3MvaGlzdG9yeS8nLCAnM180X3gnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICczLjMueCcsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBjaGlsZHJlbjogZ2V0SGlzdG9yeSgnZG9jcy9oaXN0b3J5LycsICczXzNfeCcpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJzMuMi54JyxcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRIaXN0b3J5KCdkb2NzL2hpc3RvcnkvJywgJzNfMl94JyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnMy4xLngnLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IGdldEhpc3RvcnkoJ2RvY3MvaGlzdG9yeS8nLCAnM18xX3gnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICczLjAueCcsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBjaGlsZHJlbjogZ2V0SGlzdG9yeSgnZG9jcy9oaXN0b3J5LycsICczXzBfeCcpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJzIueCcsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBjaGlsZHJlbjogZ2V0SGlzdG9yeSgnZG9jcy9oaXN0b3J5LycsICcyX3gnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICcxLngnLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgbGluazogJy9oaXN0b3J5LycsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbignZG9jcy9oaXN0b3J5LycsICcxX3gnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiU2VjdXJpdHkgQWR2aXNvcmllc1wiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgbGluazogJy9oaXN0b3J5L2N2ZXMvJyxcbiAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKCdkb2NzL2hpc3RvcnkvJywgJ2N2ZXMnKSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuXG5dXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXItbWVudXMvYWJvdXQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9hYm91dC50c1wiO2V4cG9ydCBkZWZhdWx0W3tcbiAgdGV4dDogJ0Fib3V0JyxcbiAgY29sbGFwc2libGU6IGZhbHNlLFxuICBoZWFkZXJEZXB0aDogMixcbiAgY2hpbGRyZW46IFtcbiAgICAnL2Fib3V0L2ludHJvZHVjdGlvbi5tZCcsXG4gICAge1xuICAgICAgIHRleHQ6ICdQcm9jZXNzIEF1dG9tYXRpb24nLFxuICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgIGxpbms6ICcvYWJvdXQvZW50ZXJwcmlzZS8nLFxuICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICB7IFxuICAgICAgICAgIHRleHQ6ICdPdmVydmlldycsXG4gICAgICAgICAgbGluazogJy9hYm91dC9lbnRlcnByaXNlLydcbiAgICAgICAgfVxuICAgIF19LFxuICAgIHtcbiAgICAgICB0ZXh0OiAnUnVuYm9vayBBdXRvbWF0aW9uJyxcbiAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICBsaW5rOiAnL2Fib3V0L2Nsb3VkLycsXG4gICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgeyBcbiAgICAgICAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgICAgICAgIGxpbms6ICcvYWJvdXQvY2xvdWQvJ1xuICAgICAgICB9XG4gICAgICAgXVxuICAgIH0sXG4gICAgJy9hYm91dC9nZXR0aW5nLWhlbHAubWQnLFxuICAgICcvYWJvdXQvbGljZW5zaW5nLm1kJyxcbiAgICB7XG4gICAgICB0ZXh0OiAnUmVsZWFzZSBOb3RlcycsXG4gICAgICBsaW5rOiAnL2hpc3RvcnkvJ1xuICAgIH1cbiAgXVxufV1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9hcGkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci1tZW51cy9hcGkudHNcIjtleHBvcnQgZGVmYXVsdFt7XG4gIHRleHQ6ICdBUEkgRG9jdW1lbnRhdGlvbicsXG4gIGxpbms6ICcvYXBpLycsXG4gIGNoaWxkcmVuOiBbXG4gICAge1xuICAgICAgdGV4dDogJ0FQSSBSZWZlcmVuY2UnLFxuICAgICAgbGluazogJy9hcGkvJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgaGVhZGVyRGVwdGg6IDFcbiAgICB9LFxuICAgICcvYXBpL3J1bmRlY2stYXBpLXZlcnNpb25zLm1kJyxcbiAgICAnL2FwaS9hcGlfYmFzaWNzLm1kJyxcbiAgICAnL2FwaS9hcGktc3BlYy5tZCdcbiAgXVxufV1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvYWJvdXQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzL2Fib3V0LmpzXCI7ZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgbGluazogJy9hYm91dC9pbnRyb2R1Y3Rpb24nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUHJvY2VzcyBBdXRvbWF0aW9uJyxcbiAgICBsaW5rOiAnL2Fib3V0L2VudGVycHJpc2UvJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ1J1bmJvb2sgQXV0b21hdGlvbicsXG4gICAgbGluazogJy9hYm91dC9jbG91ZC8nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnR2V0dGluZyBIZWxwJyxcbiAgICBsaW5rOiAnL2Fib3V0L2dldHRpbmctaGVscCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdMaWNlbnNpbmcnLFxuICAgIGxpbms6ICcvYWJvdXQvbGljZW5zaW5nJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ1JlbGVhc2UgTm90ZXMnLFxuICAgIGxpbms6ICcvaGlzdG9yeS8nXG4gIH1cbl1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvdXNlci1ndWlkZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvdXNlci1ndWlkZS5qc1wiO2V4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIGxpbms6ICcvbWFudWFsL2luZGV4Lm1kJyxcbiAgICB0ZXh0OiAnT3ZlcnZpZXcnXG4gIH0sXG4gIHtcbiAgICBsaW5rOiAnL21hbnVhbC9wcm9qZWN0cy8nLFxuICAgIHRleHQ6ICdQcm9qZWN0cydcbiAgfSxcbiAge1xuICAgIGxpbms6ICcvbWFudWFsL2pvYnMubWQnLFxuICAgIHRleHQ6ICdKb2JzJ1xuICB9LFxuICB7XG4gICAgbGluazogJy9tYW51YWwvcGx1Z2lucy9pbmRleC5tZCcsXG4gICAgdGV4dDogJ1BsdWdpbnMnXG4gIH0sXG4gIHtcbiAgICBsaW5rOiAnL21hbnVhbC8wNS1ub2RlcycsXG4gICAgdGV4dDogJ05vZGVzJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ0tleSBTdG9yYWdlJyxcbiAgICBsaW5rOiAnL21hbnVhbC9rZXktc3RvcmFnZS9pbmRleCdcbiAgfSxcbiAge1xuICAgIGxpbms6ICcvbWFudWFsLzA2LWNvbW1hbmRzJyxcbiAgICB0ZXh0OiAnQ29tbWFuZHMnXG4gIH0sXG4gIHtcbiAgICBsaW5rOiAnL21hbnVhbC8wOC1hY3Rpdml0eScsXG4gICAgdGV4dDogJ0FjdGl2aXR5J1xuICB9LFxuICB7XG4gICAgbGluazogJy9tYW51YWwvc2NoZWR1bGVzL3Byb2plY3Qtc2NoZWR1bGVzJyxcbiAgICB0ZXh0OiAnU2NoZWR1bGVzJ1xuICB9LFxuICB7XG4gICAgbGluazogJy9tYW51YWwvY2FsZW5kYXJzJyxcbiAgICB0ZXh0OiAnQ2FsZW5kYXJzJ1xuICB9LFxuICB7XG4gICAgbGluazogJy9tYW51YWwvd2ViaG9va3MnLFxuICAgIHRleHQ6ICdXZWJob29rcydcbiAgfSxcbiAge1xuICAgIGxpbms6ICcvbWFudWFsL3RvdXItbWFuYWdlcicsXG4gICAgdGV4dDogJ1RvdXIgTWFuYWdlcidcbiAgfSxcbiAge1xuICAgIGxpbms6ICcvbWFudWFsL3Byb2plY3Qtc2V0dGluZ3MnLFxuICAgIHRleHQ6ICdQcm9qZWN0IFNldHRpbmdzJ1xuICB9LFxuICB7XG4gICAgbGluazogJy9tYW51YWwvc3lzdGVtLWNvbmZpZ3MnLFxuICAgIHRleHQ6ICdTeXN0ZW0gTWVudSdcbiAgfSxcbiAge1xuICAgIGxpbms6ICcvbWFudWFsLzEwLXVzZXInLFxuICAgIHRleHQ6ICdQcm9maWxlIE1lbnUnXG4gIH0sXG4gIHtcbiAgICBsaW5rOiAnL21hbnVhbC9pbnRlZ3JhdGlvbnMvaW5kZXgnLFxuICAgIHRleHQ6ICdJbnRlZ3JhdGlvbnMnXG4gIH0sXG4gIHtcbiAgICBsaW5rOiAnL21hbnVhbC9kb2N1bWVudC1mb3JtYXQtcmVmZXJlbmNlL2luZGV4JyxcbiAgICB0ZXh0OiAnRG9jdW1lbnQgRm9ybWF0cydcbiAgfVxuXVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL25hdmJhci1tZW51cy9sZWFybmluZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvbGVhcm5pbmcuanNcIjtleHBvcnQgZGVmYXVsdCBbe1xuICAgIHRleHQ6ICdPdmVydmlldycsXG4gICAgbGluazogJy9sZWFybmluZy8nXG4gIH0sXG4gIHtcbiAgICAgIHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnLFxuICAgICAgbGluazogJy9sZWFybmluZy9nZXR0aW5nLXN0YXJ0ZWQvaW5kZXgnXG4gIH0sXG4gIHtcbiAgICAgIHRleHQ6ICdIb3cgVG8gQXJ0aWNsZXMnLFxuICAgICAgbGluazogJy9sZWFybmluZy9ob3d0by9pbmRleCdcbiAgfSxcbiAge1xuICAgICAgdGV4dDogJ1NvbHV0aW9ucycsXG4gICAgICBsaW5rOiAnL2xlYXJuaW5nL3NvbHV0aW9ucy9hdXRvbWF0ZWQtZGlhZ25vc3RpY3MvaW5kZXgubWQnXG4gIH0sXG4gIHtcbiAgICAgIHRleHQ6ICdUZXJtaW5vbG9neScsXG4gICAgICBsaW5rOiAnL2xlYXJuaW5nL3R1dG9yaWFsL3Rlcm1pbm9sb2d5J1xuICB9XG5dXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL25hdmJhci1tZW51c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzL2FkbWluaXN0cmF0aW9uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL25hdmJhci1tZW51cy9hZG1pbmlzdHJhdGlvbi5qc1wiO2V4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHRleHQ6ICdJbnN0YWxsYXRpb24nLFxuICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vaW5zdGFsbC9pbmRleCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdVcGdyYWRpbmcnLFxuICAgIGxpbms6ICcvdXBncmFkaW5nLydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdMaWNlbnNpbmcnLFxuICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vbGljZW5zZSdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdDb25maWd1cmF0aW9uJyxcbiAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL2NvbmZpZ3VyYXRpb24vJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ1NlY3VyaXR5JyxcbiAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL3NlY3VyaXR5L2RlZmF1bHQtdXNlcnMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnRW50ZXJwcmlzZSBSdW5uZXInLFxuICAgIGxpbms6ICcvYWRtaW5pc3RyYXRpb24vcnVubmVyLydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdNYWludGVuYW5jZScsXG4gICAgbGluazogJy9hZG1pbmlzdHJhdGlvbi9tYWludGVuYW5jZS9pbmRleCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdDbHVzdGVyaW5nJyxcbiAgICBsaW5rOiAnL2FkbWluaXN0cmF0aW9uL2NsdXN0ZXIvaW5kZXgnXG4gIH1cbl1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXItbWVudXMvZGV2ZWxvcG1lbnQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3MvbmF2YmFyLW1lbnVzL2RldmVsb3BtZW50LmpzXCI7ZXhwb3J0IGRlZmF1bHQgW3tcbiAgICB0ZXh0OiAnQVBJJyxcbiAgICBsaW5rOiAnL2FwaS8nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUGx1Z2luIERldmVsb3BtZW50JyxcbiAgICBsaW5rOiAnL2RldmVsb3Blci8nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnSW5jbHVkZWQgUGx1Z2lucycsXG4gICAgbGluazogJy9tYW51YWwvcGx1Z2lucy9mdWxsLWxpc3QnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUkQgLSBDb21tYW5kIExpbmUgSW50ZXJmYWNlJyxcbiAgICBsaW5rOiAnL3JkLWNsaS8nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUmVsZWFzZSBOb3RlcycsXG4gICAgbGluazogJy9oaXN0b3J5LydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdTZWN1cml0eSBBZHZpc29yaWVzJyxcbiAgICBsaW5rOiAnL2hpc3RvcnkvQ1ZFcy8nXG4gIH1cbl1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL21hcmtkb3duLWl0LXJlcGxhY2UtdmFycy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamNvaGVuMS9Eb3dubG9hZHMvZG9jcy9kb2NzLy52dWVwcmVzcy9tYXJrZG93bi1pdC1yZXBsYWNlLXZhcnMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICggbWQsIHJ1bGVOYW1lLCB0cmFuc2Zvcm0pIHtcbiAgICBtZC5jb3JlLnJ1bGVyLnB1c2gocnVsZU5hbWUsIGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBzdGF0ZS50b2tlbnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIFxuICAgICAgICAgIGlmKHN0YXRlLnRva2Vuc1tpbmRleF0uY29udGVudCl7XG4gICAgICAgICAgICAgIHN0YXRlLnRva2Vuc1tpbmRleF0uY29udGVudCA9IHRyYW5zZm9ybShzdGF0ZS50b2tlbnNbaW5kZXhdLmNvbnRlbnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHN0YXRlLnRva2Vuc1tpbmRleF0uY2hpbGRyZW4pe1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gc3RhdGUudG9rZW5zW2luZGV4XS5jaGlsZHJlbjtcbiAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICBjaGlsZHJlbltpXS5jb250ZW50ID0gdHJhbnNmb3JtKGNoaWxkcmVuW2ldLmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG59OyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pjb2hlbjEvRG93bmxvYWRzL2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NldHVwLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qY29oZW4xL0Rvd25sb2Fkcy9kb2NzL2RvY3MvLnZ1ZXByZXNzL3NldHVwLmpzXCI7aW1wb3J0IHsgQmFzZVRyYW5zaXRpb24gfSBmcm9tIFwidnVlXCJcblxuY29uc3QgUlVOREVDS19WRVJTSU9OPSc1LjEuMidcbmNvbnN0IFJVTkRFQ0tfVkVSU0lPTl9GVUxMPSc1LjEuMi1TTkFQU0hPVCdcbmNvbnN0IEFQSV9WRVJTSU9OPSc0NidcbmNvbnN0IEFQSV9ERVBfUkVMPSc2LjAuMCdcbmNvbnN0IEFQSV9ERVBfVkVSPScxNydcbmNvbnN0IEFQSV9NSU5fVkVSPScxNCdcbmNvbnN0IENMSV9WRVJTSU9OPScyLjAuOCdcbmNvbnN0IEdQR19LRVlfREFURT0nMjAyNDAxMDgnXG5cbmNvbnN0IFJFUE9fQlJBTkNIPSc0LjAueCdcblxuY29uc3Qgc2V0dXAgPSB7XG4gICAgYmFzZTogcHJvY2Vzcy5lbnYuRE9DX0JBU0UgfHwgJycsXG4gICAgYnJhbmNoOiBwcm9jZXNzLmVudi5ET0NfQlJBTkNIIHx8IFJFUE9fQlJBTkNILFxuICAgIGFwaVZlcnNpb246IEFQSV9WRVJTSU9OLFxuICAgIGFwaURlcFZlcnNpb246IEFQSV9ERVBfVkVSLFxuICAgIGFwaURlcFJlbGVhc2U6IEFQSV9ERVBfUkVMLFxuICAgIGFwaU1pblZlcnNpb246IEFQSV9NSU5fVkVSLFxuICAgIHJ1bmRlY2tWZXJzaW9uOiBwcm9jZXNzLmVudi5SVU5ERUNLX1ZFUlNJT04gfHwgUlVOREVDS19WRVJTSU9OLFxuICAgIHJ1bmRlY2tWZXJzaW9uRnVsbDogcHJvY2Vzcy5lbnYuUlVOREVDS19WRVJTSU9OX0ZVTEwgfHwgUlVOREVDS19WRVJTSU9OX0ZVTEwsXG4gICAgY2xpVmVyc2lvbjogcHJvY2Vzcy5lbnYuQ0xJX1ZFUlNJT04gfHwgQ0xJX1ZFUlNJT04sXG4gICAgZ3BnS2V5RGF0ZTogcHJvY2Vzcy5lbnYuR1BHX0tFWV9EQVRFIHx8IEdQR19LRVlfREFURVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZXR1cFxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsd0JBQThCO0FBQ3ZDLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsWUFBWSxZQUFZO0FBQ2pDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsZ0NBQWdDO0FBQ3pDLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsNkJBQTZCO0FBQ3RDLE9BQU8sY0FBYzs7O0FDWmlWLElBQU8seUJBQVEsQ0FBQztBQUFBLEVBQ3BYLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDTjtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixVQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sYUFBYTtBQUFBLGNBQ2IsVUFBVTtBQUFBLGdCQUNSO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBRUY7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sYUFBYTtBQUFBLGNBQ2IsVUFBVTtBQUFBLGdCQUNSLEVBQUMsTUFBTSx3Q0FBd0MsTUFBTSwwQkFBeUI7QUFBQSxnQkFDOUUsRUFBQyxNQUFNLG1FQUFtRSxNQUFNLDBCQUF5QjtBQUFBLGNBQzNHO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixhQUFhO0FBQUEsY0FDYixVQUFVO0FBQUEsZ0JBQUM7QUFBQSxnQkFDVDtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixhQUFhO0FBQUEsY0FDYixVQUFVO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLGFBQWE7QUFBQSxjQUNiLFVBQVU7QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUFDO0FBQUEsSUFDVDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04s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LGFBQWEsTUFBTSw0QkFBMkI7QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixNQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sVUFBVTtBQUFBLFlBQ047QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtB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Qy9FO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixVQUFVO0FBQUEsWUFDUixHQUFHLG9CQUFZLGtCQUFrQixZQUFZO0FBQUEsVUFDL0M7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLFVBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUVBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVB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QUcsbUJBQVcsZUFBZTtBQUFBLE1BQzdCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixVQUFVLG1CQUFXLGlCQUFpQixLQUFLO0FBQUEsTUFDN0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixLQUFLO0FBQUEsTUFDN0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixPQUFPO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixPQUFPO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixPQUFPO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixPQUFPO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixPQUFPO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVLG1CQUFXLGlCQUFpQixLQUFLO0FBQUEsTUFDN0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixVQUFVLG9CQUFZLGlCQUFpQixLQUFLO0FBQUEsTUFDOUM7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixVQUFVLG9CQUFZLGlCQUFpQixNQUFNO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVGOzs7QUNuRW9WLElBQU8sZ0JBQU8sQ0FBQztBQUFBLEVBQ2pXLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0csTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNDLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDSjtBQUFBLElBQUM7QUFBQSxJQUNEO0FBQUEsTUFDRyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDVDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNEO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FDbEMrVSxJQUFPLGNBQU8sQ0FBQztBQUFBLEVBQzdWLE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxJQUNSO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRixDQUFDOzs7QVZXRCxPQUFPLHVCQUF1QjtBQUM5QixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLCtCQUErQjs7O0FXM0IyUyxJQUFPQyxpQkFBUTtBQUFBLEVBQzlWO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRjs7O0FDekIyVixJQUFPQyxzQkFBUTtBQUFBLEVBQ3hXO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEs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TixTQUFTO0FBQUEsVUFDTCxLQUFLO0FBQUEsWUFDRCxhQUFhO0FBQUEsVUFDakI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsTUFDSTtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ0wsS0FBSztBQUFBLFlBQ0QsYUFBYTtBQUFBLFVBQ2pCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLE1BQ0k7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNMLEtBQUs7QUFBQSxZQUNELGFBQWE7QUFBQSxVQUNqQjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDTCxLQUFLO0FBQUEsWUFDRCxhQUFhO0FBQUEsVUFDakI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLHlCQUF5QjtBQUFBLE1BQ3JCLGVBQWUsS0FBSyxRQUFRLFdBQVcsY0FBYztBQUFBLElBQ3pELENBQUM7QUFBQSxJQUNELGdCQUFnQjtBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ0wsS0FBSztBQUFBLFVBQ0QsYUFBYTtBQUFBLFVBQ2IsY0FBYztBQUFBLFlBQ2QsUUFBUTtBQUFBLGNBQ0osWUFBWTtBQUFBLFlBQ2hCO0FBQUEsVUFDQTtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxRQUNkLGFBQWE7QUFBQSxRQUNiLGNBQWMsQ0FBRSxXQUFXLGNBQU0sSUFBSSxFQUFHO0FBQUEsTUFDNUM7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUVIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJhYm91dF9kZWZhdWx0IiwgInVzZXJfZ3VpZGVfZGVmYXVsdCIsICJsZWFybmluZ19kZWZhdWx0IiwgImFkbWluaXN0cmF0aW9uX2RlZmF1bHQiLCAiYWJvdXRfZGVmYXVsdCIsICJ1c2VyX2d1aWRlX2RlZmF1bHQiLCAiYWRtaW5pc3RyYXRpb25fZGVmYXVsdCIsICJsZWFybmluZ19kZWZhdWx0Il0KfQo=
