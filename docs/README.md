---
containerClass: home
home: true
icon: home
title: Home
// heroImage: /logo.svg
bgImage: /assets/img/pd-background.png
bgImageDark: /assets/img/pd-background.png
bgImageStyle:
background-attachment: fixed
heroText: Rundeck Documentation
tagline: Rundeck Documentation
actions:
- text: Tutorial 🧭
  link: ./cookbook/tutorial/
  type: primary
- text: Intro 💡
  link: ./guide/get-started/intro.html
- text: Config 🛠
  link: ./config/
- text: Online Demo 🪀
  link: https://stackblitz.com/fork/vuepress-theme-hope


highlights:


- header: Featured Resources  
  description: Explore Rundeck documentation to find step-by-step instructions, code samples, and reference information.
  // image: /assets/image/markdown.svg
  // bgImage: /assets/img/pd-background.png
  bgImageDark: /assets/img/pd-background.png
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



- header: Improved layouts
  description: An awesome responsive layout with full a11y support.
  image: /assets/image/layout.svg
  bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
  highlights:
    - title: Layout
      icon: object-group
      details: Improved navbar, sidebar, page nav and new breadcrumb, footer and toc. We also bring you a brand new homepage.
      link: ./guide/layout/

    - title: Dark Mode
      icon: circle-half-stroke
      details: Switch between light and dark modes freely
      link: ./guide/interface/darkmode.html

    - title: Customizable Theme Color
      icon: palette
      details: Customize theme color
      link: ./guide/interface/theme-color.html

    - title: Slide Page
      icon: person-chalkboard
      details: Adding slide pages to display things you like
      link: ./guide/layout/slides

    - title: More
      icon: ellipsis
      details: RTL layout, print support, fullscreen button, etc.
      link: ./guide/interface/others.html

- header: New features
  image: /assets/image/features.svg
  bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
  features:
    - title: Pageviews and Comments
      icon: comment-dots
      details: Start pageview statistics and comment support with Waline
      link: ./guide/feature/comment.html

    - title: Article Information
      icon: circle-info
      details: Add author, writing date, reading time, word count and other information to your article
      link: ./guide/feature/page-info.html

    - title: Article Encryption
      icon: lock
      details: Encrypt you articles based on page links, so that only the one you want could see them
      link: ./guide/feature/encrypt.html

    - title: Search
      icon: search
      details: Support docsearch and client search
      link: ./guide/feature/search.html

    - title: Copy Code Blocks
      icon: copy
      details: Copy codes with one click in code blocks
      link: ./guide/feature/copy-code.html

    - title: Image Preview
      icon: image
      details: Support viewing, zooming, sharing your page images like a gallery
      link: ./guide/feature/photo-swipe.html

- header: Blogging
  description: Create personal blog with theme
  image: /assets/image/blog.svg
  bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
  highlights:
    - title: Blog features
      icon: blog
      details: Listing your articles with their dates, tags and categories
      link: ./guide/blog/intro.html

    - title: Blog homepage
      icon: blog
      details: New blog homepage
      link: ./guide/blog/home.html

    - title: Blogger info
      icon: circle-info
      details: Customize avatar, name, slogan, introduction and social links
      link: ./guide/blog/blogger.html

    - title: Timeline
      icon: clock
      details: Read through blog posts in a timeline
      link: ./guide/blog/timeline.html

- header: Advanced
  description: Advanced features to improve site SEO and user experience
  image: /assets/image/advanced.svg
  bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
  bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
  highlights:
    - title: SEO Enhancement
      icon: dumbbell
      details: Optimize pages for search engines
      link: ./guide/advanced/seo.html

    - title: Sitemap
      icon: sitemap
      details: Generate a Sitemap for your site
      link: ./guide/advanced/sitemap.html

    - title: Feed
      icon: rss
      details: Generate feed to allow users to subscribe it
      link: ./guide/advanced/feed.html

    - title: PWA
      icon: mobile-screen
      details: Make your site more like an APP
      link: ./guide/advanced/pwa.html

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

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
