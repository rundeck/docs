---
home: true
icon: home
heroText:  Rundeck Documentation
//heroImage: /assets/img/pd-background.png
bgImage: /assets/img/pd-background.png
//bgImageDark: /assets/img/pd-background.png
//bgImageStyle:
// background-attachment: fixed
// tagline: Rundeck Documentation
actions:
- text: Intro 💡
  link: ./guide/get-started/intro.html
  type: primary
- text: Tutorial 🧭
  link: ./cookbook/tutorial/
- text: Download Opensource 🛠
  link: ./config/
- text: Start a Trial 🪀
  link: https://stackblitz.com/fork/vuepress-theme-hope


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
      //icon: edit
      details: Learn Rundeck fundamentals and key concepts
      link: ./guide/markdown/others.html#link-check

    - title: Download & Upgrade
      //icon:
      details: Let you decide to align paragraphs in the way you like
      link: ./guide/markdown/align.html

    - title: Remote Commands & Scripts
      //icon: iconfont icon-shell
      details: Decorate Markdown content with styles
      link: ./guide/markdown/container.html

    - title: AWS Automation
      //icon:  fa-brands fa-aws
      details: Group similar content with tabs and switch them together
      link: ./guide/markdown/tabs.html

    - title: Azure Automation
      //icon: code
      details: Group similar codes with tabs
      link: ./guide/markdown/code-tabs.html

    - title: Google Cloud Automation
      //icon: code
      details: Allow you to add attributes for Markdown content
      link: ./guide/markdown/attrs.html

    - title: Kubernetes Automation
      //icon: superscript
      details: Your Markdown now support superscript and subscript
      link: ./guide/markdown/sup-sub.html

    - title: Distributed Automation
      //icon: condition
      details: Use tasklist in Markdown
      link: ./guide/markdown/tasklist.html

    - title: Windows Automation
      //icon: windows
      details: Use tasklist in Markdown
      link: ./guide/markdown/tasklist.html

    - title: Integrations & Plugins
      //icon: quote-left
      details: Your Markdown now support footnotes
      link: ./guide/markdown/footnote.html

    - title: Administration
      //icon: highlighter
      details: Mark words and sentences in Markdown
      link: ./guide/markdown/mark.html

    - title: Security
      //icon: image
      details: improve syntax to specify size and color scheme
      link: ./guide/markdown/image.html

    - title: Automated Incident Response
      //icon: square
      details: Add cards in Markdown
      link: ./guide/markdown/card.html

    - title: Contact Support
      //icon: support
      details: Display charts in Markdown
      link: ./guide/markdown/chart.html

    - title: Release Notes
      //icon: route
      details: Create your flowchart in Markdown
      link: ./guide/markdown/flowchart.html

    - title: API Documentation
      //icon: code
      details: Create your flowchart in Markdown
      link: ./guide/markdown/flowchart.html

- header: New features
  //image: /assets/image/features.svg
  bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
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
  bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
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
  bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
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

<style>
.main-title {
  margin: 0.5rem 0;

  background: linear-gradient(
    120deg,
    var(--theme-color-light),
    var(--theme-color) 30%,
    color.adjust(hope-config.$theme-color, $hue: 60deg) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;

  font-weight: bold;
  font-size: 3.6rem;
  font-family: var(--font-family);
  line-height: 1.5;


  @media (max-width: hope-config.$tablet) {
    margin: 0;
  }

  @media (max-width: hope-config.$pad) {
    font-size: 2.5rem;
    text-align: center;
  }

  @media (max-width: hope-config.$tablet) {
    font-size: 2.25rem;
    text-align: center;
  }

  @media (max-width: hope-config.$mobile) {
    margin: 0 auto;
    font-size: 2rem;
  }
}
</style>

[comment]: <> (---)

[comment]: <> (sidebar: false)

[comment]: <> (title: Rundeck Documentation)

[comment]: <> (---)

[comment]: <> (<br>)

[comment]: <> (## Rundeck {{ $rundeckVersion}} Documentation    )

[comment]: <> (Here at [docs.rundeck.com]&#40;https://docs.rundeck.com/docs&#41;, you'll find a comprehensive resource for all things Rundeck. Whether you're new to Rundeck or an experienced user, this documentation site is designed to help you harness the power of Rundeck's automation and orchestration capabilities.)

[comment]: <> (Rundeck is an open-source platform that simplifies and automates operations tasks, enabling teams to efficiently manage their infrastructure and workflows. With its intuitive interface and powerful features, Rundeck empowers both developers and operations teams to collaborate and automate complex processes.)

[comment]: <> (- **Automate Complex Workflows**: Design and execute sophisticated workflows, chaining together tasks, commands, and scripts, enabling end-to-end automation of your operational processes.)

[comment]: <> (- **Manage and Schedule Jobs**: Easily schedule and manage jobs across your infrastructure, allowing you to streamline and automate routine tasks efficiently.)

[comment]: <> (- **Control Access and Security**: Implement fine-grained access controls and security policies to ensure that only authorized users can perform specific actions within Rundeck.)

[comment]: <> (- **Monitor and Track Executions**: Gain visibility into job executions, monitor their progress, and capture detailed logs and reports for auditing and troubleshooting purposes.)

[comment]: <> (This documentation site serves as a central hub for all your Rundeck-related needs. It offers a wealth of information, including detailed guides, tutorials, reference materials, and best practices to help you get the most out of Rundeck. Whether you're looking for installation instructions, troubleshooting tips, or advanced usage scenarios, you'll find it all here.)

[comment]: <> (### Key Features of the Rundeck Documentation Site:)

[comment]: <> (1. **[Getting Started Guides]&#40;/learning/index.md&#41;**: If you're new to Rundeck, our getting started guides will walk you through the installation process, configuration, and provide a foundation for understanding the core concepts.<br><br>)

[comment]: <> (2. **[Tutorials]&#40;/learning/howto/overview.md&#41;**: Step-by-step tutorials cover a wide range of use cases, demonstrating how to automate routine tasks, create workflows, integrate with other tools, and more.<br><br>)

[comment]: <> (3. **[API Documentation]&#40;/api/rundeck-api.md&#41;**: Explore the Rundeck API documentation to learn how to interact with Rundeck programmatically and integrate it into your existing infrastructure and tooling.<br><br>)

[comment]: <> (4. **[Release Notes]&#40;/history/&#41;**: Stay up to date with the latest features, enhancements, and bug fixes in each Rundeck release. [Sign up for Release Notes]&#40;https://www.rundeck.com/release-notes-signup&#41;<br><br>)

[comment]: <> (If you're looking for documentation of older versions of Rundeck, you can access them at the [Old Versions]&#40;/manual/old-docs.md&#41; section.)

[comment]: <> (## Process Automation)

[comment]: <> (Process Automation, the commercial offering, provides additional features to further enhance your automation capabilities:)

[comment]: <> (### Enterprise Support)

[comment]: <> (With Process Automation, you gain access to enterprise-grade support, ensuring that you have the assistance you need to run Rundeck in production environments. Benefit from timely assistance, troubleshooting, and guidance from the Rundeck team.)

[comment]: <> (### Clustering)

[comment]: <> (Process Automation allows you to create a high-availability cluster of Rundeck instances, enabling load balancing and fault tolerance. This ensures that your automation workflows are always available and can handle high volumes of jobs and executions.)

[comment]: <> (### Extensive Integration Plugins)

[comment]: <> (Process Automation provides a wide range of integration plugins, allowing you to connect Rundeck with other tools and systems in your infrastructure ecosystem. Seamlessly integrate with popular tools such as Jenkins, Ansible, Git, Slack, and many more, enabling end-to-end automation across your environment.)

[comment]: <> (### Advanced Scheduling Options)

[comment]: <> (Process Automation offers advanced scheduling capabilities, giving you fine-grained control over when and how your jobs and workflows are executed. Schedule jobs based on specific dates, times, intervals, or even trigger them in response to external events or conditions.)

[comment]: <> (### And More)

[comment]: <> (We strive to keep the documentation up to date, providing accurate and relevant information to support your Rundeck journey. If you have any questions or suggestions, please don't hesitate to reach out to us. Your feedback is invaluable in helping us improve the documentation and ensure a seamless experience for all users.)

[comment]: <> (Thank you for choosing Rundeck, and we hope you find the documentation site a valuable resource in your automation and orchestration endeavors!)