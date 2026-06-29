---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-06-05T00:00:00.000Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.

This page highlights changes that are live on Runbook Automation SaaS and will be included in the upcoming Self-Hosted release.

## Runbook Automation 6.0 is rolling out to SaaS

Runbook Automation 6.0 is being deployed to the SaaS platform. This is a major release built on a modernized platform (Grails 7 / Spring Boot 3 on Java 17) with security hardening, performance improvements, and modernized monitoring.

::: tip We handle the upgrade
There is nothing you need to do for the platform upgrade itself - the SaaS environment is upgraded for you, and your **Runners continue to operate**. The notes below cover a few new defaults and behavior changes you may notice, and the one item that can require action on Runner hosts you manage.
:::

### What you may notice

- **Modernized platform and security**: 6.0 moves to Grails 7 / Spring Boot 3 on Java 17, with upgraded dependencies and modernized storage encryption (AES-256-GCM). Existing data continues to work and migrates automatically.
- **Monitoring endpoints modernized**: Metrics are now served under `/monitoring/*` (including a Prometheus endpoint at `/monitoring/prometheus`). The legacy `/metrics/*` endpoints are disabled by default. If you scrape Rundeck metrics, point your collectors at the `/monitoring/*` endpoints.
- **Runner enhancements on by default**: Distributed automation and Runner replicas are enabled by default. Your existing Runners keep working; you may see the newer Runner management capabilities in the UI.
- **UI modernization**: Continued rollout of the updated (NextUI) interface, including the User and System Configuration menus.

### Action you may need to take

- **REST API is now JSON only**: XML request and response support has been removed from the API. If you have integrations that still send or expect `application/xml`, update them to use JSON. See the [API documentation](/api/index.md).
- **WinRM via self-managed Runners requires Python 3.8+**: The [py-winrm plugin](/learning/howto/configuring-windows-nodes.md) dropped Python 2 support (upstream `pywinrm` now requires Python 3.8 or newer). If you run your own Runners that connect to Windows nodes over WinRM, ensure those hosts have Python 3.8+ before the update reaches them.
- **Activity RSS feed deprecated**: The built-in Activity RSS feed is deprecated and disabled by default. Use the [API](/api/index.md) or notifications for execution-driven integrations. This does not affect the [RSS Feed Plugin](/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin.md) workflow step.

Full, version-specific release notes for Self-Hosted customers will be published with the 6.0 Self-Hosted release in the [Release Notes](/history/) section.

## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates

These updates highlight changes deployed to the Runbook Automation SaaS platform ahead of the next Self-Hosted release, drawing from both our commercial product repository and the open source Rundeck repository.

**Note**: Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation, and to the upgrade guide that accompanies the 6.0 Self-Hosted release.

---

**List Last updated:** 2026-06-05
