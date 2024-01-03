---
home: true
icon: home
heroText:  Welcome to Docs
tagline: Runbook Automation | Process Automation | Rundeck
//heroImage: /assets/img/pd-background.png
bgImage: /assets/img/pd-background.png
bgImageDark: /assets/img/pd-background.png
//bgImageStyle:
//background-attachment: fixed
// tagline: Rundeck Documentation
actions:
- text: Intro
  icon: circle-play
  link: /about/introduction.html
- text: Tutorial 
  icon: graduation-cap
  link: /learning/getting-started/
- text: Download
  icon: download
  link: https://download.rundeck.com
- text: Start a Trial
  icon: /assets/img/pd-icon-small.png
  link: https://www.pagerduty.com/sign-up/runbook-automation/


highlights:

- header: Featured Resources  
  description: Explore Runbook Automation documentation to find step-by-step instructions, code samples, and reference information.
  // image: /assets/image/markdown.svg
  //bgImage: /assets/img/pd-background.png
  //bgImageDark: /assets/img/pd-background.png
  bgImageStyle:
  background-repeat: repeat
  background-size: initial
  features:
    - title: Learn Fundamentals
      icon: book 
      details: Runbook Automation fundamentals and key concepts.
      link: /learning/

    - title: Distributed Automation
      icon: /assets/img/runner-icon.png
      details: Automation across network and physical boundaries.
      link: /administration/runner/runner-intro.html

    - title: Integrations & Plugins
      icon: shuffle
      details: Orchestrate across the tooling ecosystem.
      link: /manual/plugins/
  
    - title: Automated Incident Response
      icon: /assets/img/pd-icon.png
      details: Diagnostics and Remediation.
      link: /learning/solutions/automated-diagnostics/

    - title: AWS Automation
      icon:  /assets/img/aws-icon-small.png
      details: Cloudwatch, Fargate, SSM, and more.
      link: /manual/plugins/aws-plugins-overview.html

    - title: Azure Automation
      icon: /assets/img/azure-logo.png
      details: VMs, Blob Storage, Active Directory SSO, and more.
      link: /manual/plugins/azure-plugins-overview.html

    - title: Google Cloud Automation
      icon: /assets/img/gcp-icon.png
      details: GCE, Cloud SQL, VPC Peering, and more.
      link: /manual/plugins/gcp-plugins-overview.html

    - title: Kubernetes Automation
      icon: /assets/img/kubernetes-icon.png
      details: Deployments, debugging, provisioning and more.
      link: /manual/plugins/kubernetes-plugins-overview.html

    - title: Windows Automation
      icon: /assets/img/windows-logo.png
      details: Self service interface for IT Ops tasks.
      link: /learning/howto/configuring-windows-nodes.html

    - title: Linux Automation
      icon: /assets/img/linux-logo.png
      details: Standardize systems across global footprint.
      link: /learning/howto/ssh-on-linux-nodes.html

    - title: Ansible Integration
      icon: /assets/img/ansible-icon.png
      details: Orchestrate Ansible across numerous environments.
      link: /learning/howto/using-ansible.html#how-to-integrate-ansible-with-rundeck

    - title: ServiceNow Integration
      icon: /assets/img/snow-icon.png
      details: Create, update and resolve tickets within Runbook Automation.
      link: /manual/plugins/servicenow-plugins-overview.html

    - title: Administration
      icon: screwdriver-wrench
      details: Manage users, roles, and global configuration.
      link: /administration/

    - title: Security
      icon: lock
      details: Harden the deployment to adhere to security best practices.
      link: /administration/security/

    - title: API Documentation
      icon: code
      details: Develop against the Runbook Automation API.
      link: /api/
  
    - title: Contact Support
      icon: phone
      details: Get help through the Community or Professional Support.
      link: /about/getting-help.html


- header: New features
  //image: /assets/image/features.svg
  bgImage: /images/waveform-light-04.svg
  bgImageDark: /images/waveform-dark-04.svg
  features:
    - title: Secrets via Distributed Automation
      icon: key
      details: Automate workflows with remote-hosted secrets storage.
      link: /history/4_x/version-4.16.0.html#secrets-management-integrations-through-enterprise-runner

    - title: Remote Node Inventory
      icon: computer
      details: Automate tasks in secure and remote environments, where inventory can only be discovered within the environment’s perimeter.
      link: /history/4_x/version-4.16.0.html#node-inventory-discovery-through-enterprise-runner

    - title: Cross Role/Account support for AWS
      icon: shuffle
      details: Integrate with multiple AWS IAM Roles that reside in one or multiple AWS Accounts.
      link: /history/4_x/version-4.17.0.html#cross-role-and-cross-account-support-for-ec2-aws-systems-manager

    - title: Plugin Suite Configuration
      icon: gears
      details: Consolidates configuration for plugin suites like AWS, Sensu, and more!
      link: /history/4_x/version-4.9.0.html#highlights

    - title: Track the ROI of your Automation
      icon: arrow-trend-up
      details: Track time and money saved to see insights into the effectiveness of your Automation.
      link: /history/4_x/version-4.7.0.html#highlights

    - title: Performance Enhancements
      icon: gauge-high
      details: Our new 5.0 release includes UI performance improvements up to 85%.
      link: /history/5_x/version-5.0.0.html#jobs-list-performance

- header: Distributed Automation
  description: With the Distributed Automation architecture, DevOps and Operations teams can manage automation in a central UI while delegating tasks within different private networks or multi-cloud environments without needing to open external firewall ports.
  //image: /assets/image/layout.svg
  bgImage: /images/waveform-light-14.svg
  bgImageDark: /images/waveform-dark-14.svg
  highlights:
    - title: Remote Task Execution
      icon: arrow-down-up-lock
      details: Run Scripts, discover nodes, gather secrets in remote environments.
      link: /administration/runner/runner-intro.html

    - title: Secure Communications
      icon: lock
      details: Enhanced security as ports no longer need to be open for the Automation Server to talk over sensitive ports.
      link: /administration/runner/runner-intro.html

    - title: AWS SSM Execution
      icon: /assets/img/aws-icon-small.png
      details: Allows Process Automation to communicate with EC2 instances through the SSM service, rather than another communication protocol.
      link: /learning/howto/cross-account-aws-ssm.html

    - title: Remote Secrets
      icon: key
      details: Keep passwords in their secure environments with remote access via the Enterprise Runner.
      link: history/4_x/version-4.16.0.html#secrets-management-integrations-through-enterprise-runner

    - title: More
      icon: ellipsis
      details: 
      link: /administration/runner/runner-intro.html



- header: Collaborate
  description: Join our Community Forums to collaborate with our team.
  //image: /assets/image/blog.svg
  bgImage: /images/waveform-light-02.svg
  bgImageDark: /images/waveform-dark-02.svg
  features:
    - title: Keep up on the Latest
      icon: square-rss
      details: Keep up on what's new in the latest releases.
      link: https://community.pagerduty.com/forum/c/runbook-automation-process-automation

    - title: Collaborate with other community members
      icon: share
      details: Join in discussions and share your own Automation tips and tricks.
      link: https://community.pagerduty.com/forum/c/runbook-automation-process-automation

    - title: Contribute to Docs
      icon:  pen-to-square
      details: See something to add or clarify? We always appreciate contributions to our docs site.
      link: /learning/howto/update-rundeck-docs.html

    - title: Contribute to the OSS Project
      icon:  code-branch
      details: Rundeck is an open source project, and we encourage community feedback and contributions.
      link: https://github.com/rundeck/rundeck

---
