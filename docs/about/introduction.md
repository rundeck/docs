# Rundeck Introduction

## What is Rundeck?

Rundeck is runbook automation that gives you and your colleagues self-service access to the processes and tools they need to get their job done.

When used for incident management, Rundeck will help you have shorter incidents and fewer escalations.

When used for general operations work, Rundeck will help alleviate the time-consuming and repetitive toil that currently consumes too much of your team's time.

For more information on use cases, see the [New to Rundeck] page.

With Rundeck, it is simple and easy to create workflows (called "jobs") from any of your existing tools or scripts. Trigger Rundeck jobs from the Web GUI, API, CLI, or by schedule. Rundeck's access control features make it easy to safely delegate control of tasks to those traditionally outside of operations.

Rundeck was designed to accept the reality that heterogeneous infrastructure and tooling are a fact of life in any sizable organization. That is why Rundeck doesn't make you replace the scripts, commands, or tools you use today. You use Rundeck to execute workflows across your existing automation (e.g., Ansible, Puppet, Chef, Jenkins, Docker, Kubernetes, legacy tools, and all of your custom scripts/APIs) or quickly automate previously manual procedures. With Rundeck you can reuse the automation skills you already have and add new ones as needed.

Out of the box, Rundeck gives you capabilities that would be expensive to develop and maintain in-house: workflow control, scheduling, error-handling, logging, access control, option passing, log filtering, web GUI, REST API (with CLI tools) and integration with external sources for authentication, resource model, and option data.

## Is Rundeck free?

#### Rundeck

Rundeck Open Source is free open source software licensed under the [Apache Software License v2.0](http://www.apache.org/licenses/LICENSE-2.0.html), and you can participate in the project on [GitHub]. For those who write and run Rundeck jobs at small-scale usage (e.g., limited use or within a team), the open-source Rundeck delivers you the features you need, for free, _forever_.

#### Rundeck Enterprise

The focus of [Rundeck Enterprise], our commercial offering, is on making Rundeck production-ready and enterprise-scale. Rundeck Enterprise, built on the open source Rundeck, is the bundle of software and services you need to run Rundeck as an enterprise-class service.

Built and tested for the enterprise, Rundeck Enterprise includes exclusive features (including clustering/HA, advanced workflow, enhanced ACL management, enhanced dashboards/visualization) and Rundeck Enterprise exclusive plugins. Professional support and on-boarding services are also part of the Rundeck Enterprise subscription bundle.

_NOTE: Rundeck Enterprise was recently renamed from Rundeck Pro. You may still see references to "Pro" here and there, as we work to update our documentation. Just know that they are the same thing._

[New to Rundeck]: https://www.rundeck.com/new-to-rundeck
[Rundeck Enterprise]: https://www.rundeck.com/enterprise
[github]: https://github.com/rundeck/rundeck

## Who makes Rundeck?

[Rundeck] is part of the [PagerDuty] suite of products and is developed by the Rundeck Business unit and the Rundeck community. The community is welcomed to participate in the project and contribute. Please submit an issue on our GitHub repository listed above or reach out to your Customer Success Team contact.

[Rundeck]: https://www.rundeck.com/
[PagerDuty]: https://www.pagerduty.com/

## Rundeck feature highlights

- Distributed command execution
- Workflow (including option passing, conditionals, error handling, and multiple workflow strategies)
- Pluggable execution system (SSH and WinRM by default; PowerShell available)
- Pluggable resource model (get details of your infrastructure from external systems)
- On-demand (Web GUI, API or CLI) or scheduled job execution
- Secure Key store for passwords and keys
- Role-based access control policy with support for LDAP/ActiveDirectory/SSO
- Access control policy editing/management tools
- History and auditing logs
- Use any scripting language

Want to learn more or give it a test run?
[Check out the Learning Page for a Welcome Tutorial](/learning)

Already itching to install it? Jump ahead to
[Installing Rundeck](/manual/03-getting-started.md#download-and-installation).
