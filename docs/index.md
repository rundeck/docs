---
home: true
icon: home
heroText:  Welcome to Docs
//heroImage: /assets/img/pd-background.png
bgImage: /assets/img/pd-background.png
bgImageDark: /assets/img/pd-background.png
//bgImageStyle:
//background-attachment: fixed
// tagline: Rundeck Documentation
actions:
- text: Intro 💡
  link: /about/introduction.html
- text: Tutorial 🧭
  link: /learning/getting-started/
- text: Download 🛠
  link: https://download.rundeck.com
- text: Start a Trial 🪀
  link: https://www.pagerduty.com/sign-up/runbook-automation/


highlights:

- header: Featured Resources  
  description: Explore Rundeck documentation to find step-by-step instructions, code samples, and reference information.
  // image: /assets/image/markdown.svg
  //bgImage: /assets/img/pd-background.png
  //bgImageDark: /assets/img/pd-background.png
  bgImageStyle:
  background-repeat: repeat
  background-size: initial
  features:
    - title: Learn fundamentals
      icon: book 
      details: Learn Rundeck fundamentals and key concepts
      link: ./guide/markdown/others.html#link-check

    - title: Distributed Automation
      icon: /assets/img/runner-icon.png
      details: Use tasklist in Markdown
      link: ./guide/markdown/tasklist.html

    - title: Integrations & Plugins
      icon: shuffle
      details: Your Markdown now support footnotes
      link: ./guide/markdown/footnote.html
  
    - title: Automated Incident Response
      icon: /assets/img/pd-icon.png
      details: Add cards in Markdown
      link: ./guide/markdown/card.html

    - title: AWS Automation
      icon:  /assets/img/aws-logo.png
      details: Group similar content with tabs and switch them together
      link: ./guide/markdown/tabs.html

    - title: Azure Automation
      icon: /assets/img/azure-logo.png
      details: Group similar codes with tabs
      link: ./guide/markdown/code-tabs.html

    - title: Google Cloud Automation
      icon: /assets/img/gcp-icon.png
      details: Allow you to add attributes for Markdown content
      link: ./guide/markdown/attrs.html

    - title: Kubernetes Automation
      icon: /assets/img/kubernetes-icon.png
      details: Your Markdown now support superscript and subscript
      link: ./guide/markdown/sup-sub.html

    - title: Windows Automation
      icon: /assets/img/windows-logo.png
      details: Use tasklist in Markdown
      link: ./guide/markdown/tasklist.html

    - title: Linux Automation
      icon: /assets/img/linux-logo.png
      details: Decorate Markdown content with styles
      link: ./guide/markdown/container.html

    - title: Ansible Integration
      icon: /assets/img/ansible-icon.png
      details: Let you decide to align paragraphs in the way you like
      link: ./guide/markdown/align.html

    - title: ServiceNow Integration
      icon: /assets/img/snow-icon.png
      details: Create your flowchart in Markdown
      link: ./guide/markdown/flowchart.html

    - title: Administration
      icon: screwdriver-wrench
      details: Mark words and sentences in Markdown
      link: ./guide/markdown/mark.html

    - title: Security
      icon: lock
      details: improve syntax to specify size and color scheme
      link: ./guide/markdown/image.html

    - title: API Documentation
      icon: code
      details: Create your flowchart in Markdown
      link: ./guide/markdown/flowchart.html
  
    - title: Contact Support
      icon: phone
      details: Display charts in Markdown
      link: ./guide/markdown/chart.html


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
      icon: aws
      details: Allows Process Automation to communicate with EC2 instances through the SSM service, rather than another communication protocol.
      link: /manual/projects/node-execution/aws-ssm.html

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
  highlights:
    - title: Keep up on the Latest
      icon: square-rss
      details: Keep up on what's new in the latest releases.
      link: https://community.pagerduty.com/forum/c/runbook-automation-process-automation

    - title: Collaborate with other community members
      icon: slideshare
      details: Join in dicsussions and share your own Automation tips and tricks.
      link: https://community.pagerduty.com/forum/c/runbook-automation-process-automation

    - title: Join the Leaderboard
      icon: circle-info
      details: Try to take over the top spot in the leaderboard by finishing challenges.
      link: https://community.pagerduty.com/forum/c/runbook-automation-process-automation

---
