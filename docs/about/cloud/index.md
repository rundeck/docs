# Runbook Automation

Runbook Automation is a fully managed SaaS providing online secure access to the latest commercial Rundeck feature set.

![Cloud architecture](~@assets/img/ra-diagram.png)

## Core value of Runbook Automation
Organizations adopting cloud are looking for ways to stay nimble while improving system availability, quality of operations, and keeping control over costs. With Runbook Automation, platform engineering and SRE teams are able to standardize and automate cloud ops.

- **Easy integration with Cloud Services**<br>
Receiving events from external providers into Rundeck do not have to open their firewalls for inbound notifications.
- **Start in minutes**<br>
Immediate access to a dedicated Rundeck without needing to provision, install or manage infrastructure or software.
- **Automatic Updates**
Runbook Automation will be updated without any effort. No need to worry about coordinating and verifying upgrades.
- **Built for Availability**<br>
Runbook Automation will manage all aspects of high availability and reliability. You don’t have to invest time in configuring the redundancy, load balancing, data layer or monitoring the Rundeck Cluster environment. Runbook Automation is built upon PagerDuty’s decade of experience in providing a resilient SaaS environment.
- **Hardened Security**<br>
Runbook Automation will take care of security patching, protection, monitoring, and ensuring compliance with industry standards.

## Getting access

Runbook Automation can be evaluated and purchased under the Automation category [here](https://www.pagerduty.com/pricing/). PagerDuty and Runbook Automation accounts are separate at the moment,however, Single Sign On (ex. Okta or Azure AD) for both products can be configured resulting in a unified login experience. [Read the doc](/administration/security/sso.md) on how to configure SSO with Rundeck.

## Runbook Automation and Process Automation differences

Runbook Automation and Process Automation are 99% the same in terms of features. However, there are differences stemming from the different deployment architectures in what user classes and plugins are available and how job execution is carried out. 

### User roles and classes

The Opsadmin and FullAdmin roles are not available in Runbook Automation, and a user cannot assign those user classes. The highest privileged user role is the AppAdmin which allows full access to manage content (like projects, jobs, node sources etc) but cannot change any infrastructure configuration for the customer account instance. [Read more](/administration/security/default-users.md) about the different roles.

### Job execution

Plugin job steps generally execute in Runbook Automation. However, job steps that implement local NodeExecutor or FileCopier are delegated to execute on the Runner automatically. If a Runner is not configured these "local" steps will fail. Runners that match the node filter target will assume the role of the local node.  

### Plugins NOT available in cloud
The following plugins are not currently available in Runbook Automation.

- aws-s3-steps
- command
- file
- github-script-plugin
- local-script
- openssh-node-execution
- puppet-apply
- py-winrm-plugin
- rundeck-ansible
- rundeck-azure-storage-plugin
- rundeck-copyfile-plugin
- rundeck-localexec
- rundeck-script-plugin
- rundeckpro-cyberark
- rundeckpro-jira-plugins
- rundeckpro-rundeck-filetransfer
- rundeckpro-vmware-plugin
- waitfor
- directory
- file
- script


#### Key Storage

Currently, Runbook Automation can only connect to Cloud based keystore providers (Vault, Thycotic, CyberArk have SaaS solutions) with Runbook Automation keystore plugins. Runbook Automation keystore plugins have no connectivity to on-premise keystores.

#### Runner administration
[Read the Runner docs](/administration/runner/index.md) about how to install, configure and manage the Runner.

#### APIs

The highest privilege access for the APIs will be api keys with AppAdmin access. This means that APIs around content creation will be available (project, job, node etc), while APIs around infrastructure and configuration tasks will not be accessible.

## Runbook Automation security policies and Terms of service

1. **[Terms of service](https://www.pagerduty.com/terms-of-service/)**
1. **[SLA](https://www.pagerduty.com/standard-service-level-agreement/)**
1. **[PII data & privacy policy](https://www.pagerduty.com/privacy-policy/)**
1. **[Security & compliance](https://www.pagerduty.com/data-security-policy/)**
1. **[Data processing policy](https://www.pagerduty.com/data-processing-addendum/)**
1. **[Support policy](https://www.pagerduty.com/support-policy/)**

## Licensing

Licensing is provisioned and updated automatically once a subscription is purchased for Runbook Automation. Unlike Process Automation, account admins do not have permissions to update their license directly. For more details please check [here](https://www.pagerduty.com/pricing/).

## FAQ

## How is Runbook Automation managed?

- **How are Runbook Automation upgrades managed?**
User accounts do not have a choice when it comes to scheduling upgrades. We will notify customers ahead of time and customers should expect one planned monthly update. At the moment planned updates will incur some downtime (blackout period), however we will be striving to minimize that and cause as little ops disruption as possible.
- **Where is Runbook Automation hosted?**
Currently Runbook Automation is hosted AWS US.
