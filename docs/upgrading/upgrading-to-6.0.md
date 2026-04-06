# Rundeck 6.0.x Upgrade Notes

These notes cover steps and considerations when upgrading from Rundeck or Runbook Automation **5.x** to **6.0.x** (Grails 7 / Java 17 baseline). Read this page together with the [general upgrade guide](/upgrading/upgrading.md). If you are more than one major version behind, follow **all** intervening upgrade guides first (for example, anything that applies from the [5.0 upgrade notes](/upgrading/upgrading-to-5.0.md) if you have not already done that work).

## Java 17 required

**Rundeck 6.0.0** requires **Java 17** as the minimum and only supported runtime. See [Java (system requirements)](/administration/install/system-requirements.md#java) for details, supported distributions, and verification.

The **5.x** series supports Java 11 and Java 17. If the instance still runs on Java 11, either move to Java 17 **before** upgrading to 6.0 (while still on 5.x), or plan Java 17 installation as part of the same maintenance window as the 6.0 upgrade. Do not start Rundeck 6.0 on Java 11.

Newer Java versions are not validated for 6.0.0 at release; they may work but are not yet supported.

### Enterprise Runners

Runners must meet the same **Java 17** requirement as the server. Plan to upgrade [Enterprise Runners](/administration/runner/runner-management/upgrading-runners.md) to a **release that matches your Rundeck 6.0** deployment per your download or image policy, and confirm each Runner JVM is on Java 17.

If you skip or defer Runner upgrades, remote execution features that depend on a compatible Runner may not work correctly until Runners are aligned with the server version.


## JVM heap and memory

The 6.0 line ships on an updated application stack (for example **Grails 7** and **Spring Boot 3**), which can **increase baseline JVM memory** use compared to 5.x. Default memory settings in packages or images may have been raised accordingly.

If you already tune the process yourself—for example **`RDECK_JVM_SETTINGS`** / **`RDECK_JVM`**, **`JAVA_OPTS`**, **Windows service** limits, or **container memory**—plan to **validate heap and RSS after upgrade**. If you see slow performance, frequent GC, or **OutOfMemoryError**, increase limits using [Tuning Rundeck](/administration/maintenance/tuning-rundeck.md) and [JVM / startup configuration](/administration/configuration/system-properties.md) as a starting point.

## py-winrm plugin (Python 3.8+) {#py-winrm-plugin-python-38}

The bundled **[py-winrm-plugin](https://github.com/rundeck-plugins/py-winrm-plugin)** no longer supports **Python 2**. Updated releases track **[pywinrm](https://github.com/diyan/pywinrm/)**, which requires **Python 3.8 or newer**.

Before upgrading to **Rundeck 6.0**, ensure every host that runs PyWinRM code is using **Python 3.8+** on the OS path the plugin uses (typically the **Rundeck / Runbook Automation server**; if you use **Enterprise Runners** to execute WinRM against nodes, install **Python 3.8+** on those Runner hosts as well). Reinstall **`pywinrm`** (and optional extras such as Kerberos/CREDSSP helpers) with a **Python 3** `pip` if needed.

Configuration and prerequisites are summarized in [Connect to Windows Nodes with PyWinRM](/learning/howto/configuring-windows-nodes.md).

## MySQL 8.4 and database migrations

**MySQL 8.4** is supported as of **Rundeck 6.0.0**, with schema and migration changes included in the product. See [Using MySQL](/administration/configuration/database/mysql.md) (including the **MySQL 8.4** section) and [supported databases](/administration/install/system-requirements.md#database).

As with any upgrade, use a **supported production database**, take a **backup** before upgrading, and allow the application to run migrations on startup in a controlled window.

## Monitoring and metrics (legacy HTTP off by default)

Rundeck **6.0** changes the default for **legacy** metrics HTTP endpoints (`/metrics/*`, Dropwizard-style JSON). Those endpoints are **disabled by default** (`rundeck.metrics.legacy.enabled=false`). **Modern** Spring Boot Actuator endpoints under **`/monitoring/*`** (for example Prometheus scrape and JSON metric discovery) remain **enabled by default**.

API routes that **forward to legacy metrics** (for example **`/api/25/metrics/metrics`**) follow the same rule: if legacy HTTP is off, those calls will not serve data until you migrate or opt in.

**Action items:**

1. **Prefer migration:** Point scrapers, health checks, and integrations at **`/monitoring/*`** instead of **`/metrics/*`**. See [Legacy endpoints](/administration/monitoring/configuration.md#legacy-endpoints) for a mapping of old URLs to new ones and [Using monitoring data](/administration/monitoring/monitoring.md) for usage examples.
2. **Temporary bridge:** If you must keep legacy URLs during transition, set **`rundeck.metrics.legacy.enabled=true`** (see [Monitoring configuration](/administration/monitoring/configuration.md#legacy-endpoints)).

Legacy **`/metrics/*`** HTTP is scheduled for **removal in Rundeck 7.0**; plan to rely on **`/monitoring/*`** before then. For a full picture of application vs. infrastructure metrics (including JMX), see the [monitoring overview](/administration/monitoring/index.md).

## Activity RSS feed (deprecated; off by default) {#activity-rss-feed-server-feature-removed}

**Rundeck 6.0** **deprecates** the server **Activity RSS** feature (XML URLs for execution history matching Activity filters, including modes that allowed **unauthenticated** access). It is **disabled by default** for security and maintainability reasons. The feed is scheduled for **full removal in a later release** (plan migrations in the 6.x timeframe; see [RUN-2665](https://pagerduty.atlassian.net/browse/RUN-2665)).

**Recommended:** Move integrations to the **REST API** ([API documentation](/api/index.md)) with proper **authentication** and ACLs, or use [notifications](/manual/notifications/index.md) and [webhooks](/manual/notifications/webhooks.md) for execution-driven automation.

**If RSS is business-critical temporarily:** Set **`rundeck.feature.legacyRSS.enabled=true`** in `rundeck-config.properties` (or your deployment’s equivalent app configuration). On startup, Rundeck logs a **warning** that the feature is deprecated and unsafe for unauthenticated exposure. Plan to migrate before it is removed.

**Configuration migration:** The older property **`rss.enabled`** is **no longer sufficient**. If you still have **`rss.enabled=true`** but do **not** set **`rundeck.feature.legacyRSS.enabled=true`**, RSS stays **off** and the server logs an **error** with the property you must set to opt in deliberately. See [Configuration file reference](/administration/configuration/config-file-reference.md#activity-rss-feed-deprecated).

**Not affected:** The commercial **[RSS Feed Plugin](/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin.md)** workflow step (read **external** RSS feeds inside jobs) is unrelated and unchanged.

## Feature flags (defaults, removals, and cleanup) {#feature-flags-defaults-removals-and-cleanup}

Rundeck **6.0** includes a broad pass on **`rundeck.feature.*`** settings: many flags now default to **`true`**, several behaviors are **always on** (the flag no longer exists in the product), and a few **obsolete** flags were **deleted**. If you maintain a long **`rundeck-config.properties`** or **System Configuration** dump from earlier releases, treat an upgrade to 6.0 as a good time to **reconcile feature flags**—remove entries that only restate new defaults, and retest after any change.

This section highlights the changes that most often affect integrations and operations. It is **not** an exhaustive list of every flag in the product.

### REST API: XML removed (JSON only) {#rest-api-xml-removed-json-only}

The **`rundeck.feature.legacyXml.enabled`** property is **removed** in **6.0**. The **REST API no longer supports XML** requests or responses. Clients must use **JSON** (`Accept: application/json`, `Content-Type: application/json` where applicable). See [XML support](/api/index.md#xml-support) in the API guide.

**Document formats** (for example job definitions or resource documents that use XML as a **file** format) are separate from the HTTP API content negotiation above; follow the format-specific documentation for those workflows.

### Enterprise Runner: distributed automation and replicas on by default

For **Runbook Automation Self-Hosted 6.0+**, these flags default to **`true`**:

- **`rundeck.feature.distributedAutomation.enabled`** — runner tags, project runner management, and related **distributed automation** UI/API behavior.
- **`rundeck.feature.runnerReplicas.enabled`** — **Runner replicas** (multiple replica processes per Runner).

You typically **do not** need to set them unless you are **disabling** a capability or following a special migration path. On **5.x**, replicas in particular were often **off until configured**; documentation for those versions may still say to set the property explicitly.

Runner overview: [Enterprise Runner](/administration/runner/index.md#enabling-the-latest-runner-features).

### Other notable flag outcomes (summary)

Internal review also **raised defaults** or **made behaviors permanent** for features such as execution and job lifecycle plugins, notifications editor (Vue), workflow execution summary UI, workflow dynamic step summary, and several storage/plugin behaviors—so explicit **`false`** overrides from older environments may now be **overriding the 6.0 default on**. After upgrade, confirm whether those overrides are still intentional.


