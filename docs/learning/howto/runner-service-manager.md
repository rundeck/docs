---
title: Runner Service Manager
description: A comprehensive automation job that provides complete lifecycle management for Runbook Automation (RBA) and PagerDuty runners.
---

# Runner Service Manager

## Overview
This comprehensive automation job provides complete lifecycle management for both Runbook Automation (RBA) and PagerDuty runners across your infrastructure. It supports multiple deployment architectures, including standalone and replica configurations, handles systemd service management with both privileged and unprivileged execution modes, and implements intelligent naming conventions with automatic SSL certificate management.

## How It Helps Automation
This job transforms complex runner deployment and management into a streamlined, reliable process that scales with your infrastructure needs by providing:

*   **Infrastructure Scaling:** Easily deploy runners across multiple nodes with consistent configuration.
*   **High Availability:** Replica architecture ensures job execution continuity even if individual runners fail.
*   **Operational Excellence:** Integrated monitoring, health checks, and automatic crash alerting.
*   **Security:** Automatic SSL certificate handling and secure credential management.
*   **Maintenance:** Simplified upgrades and lifecycle management across entire runner fleets.

---

## Use Case Example
Imagine you need to deploy a fleet of RBA runners across your production environment with high availability. Using this job, you can:

1. Install replica runners on multiple nodes that automatically cluster under a parent runner pool.
2. Configure systemd services with crash alerting to PagerDuty.
3. Manage SSL certificates automatically for secure HTTPS connections.
4. Perform rolling upgrades without manual intervention.
5. Monitor runner health and status through integrated API checks.

*Example Output:* The job creates runners like `runner-rba-rep-sysd-MyProject-node01` and `runner-rba-rep-sysd-MyProject-node02`, clustering them under `runner-rba-pool-sysd-MyProject` for load balancing.

---

## Prerequisites
Before running this job, ensure the target nodes meet the following requirements:

*   Java runtime environment installed.
*   Network connectivity to the Rundeck API and external endpoints.
*   Appropriate permissions for service management (systemd or process-based).
*   Valid API tokens for Rundeck and PagerDuty (if using PD runners).
*   Sufficient disk space in the working directory for runner installation.

### External Endpoints
The job communicates with the following external services:
*   Rundeck API endpoints (for runner management and project operations).
*   PagerDuty Runbook Actions service (`https://runbook-actions.pagerduty.com`).
*   PagerDuty Events V2 API (`https://events.pagerduty.com/v2/enqueue`).
*   SSL certificate validation services for HTTPS connections.

---

## Job Configuration Options

| Option Name | Required | Description | Default |
|---|---|---|---|
| **rd-token** | Yes | Runbook Automation (RBA) API Token. Stored securely in Key Storage. | *None* |
| **pd-token** | No | PagerDuty Automation Actions Token. Required for PD runner operations. | *None* |
| **pd-runner-id** | No | Runner ID from `credentials.pdrunner-creds`. | *None* |
| **pd-runner-secret** | No | Runner Secret from `credentials.pdrunner-creds`. | *None* |
| **mode** | Yes | Action to perform: `status`, `start`, `stop`, `restart`, `install-only`, `install-start`, `uninstall`, `upgrade`. | `status` |
| **runner-type** | Yes | The ecosystem type of Runner to manage: `rba-runner` or `pd-runner`. | `rba-runner` |
| **architecture** | Yes | Deployment architecture. `standalone` creates 1:1 runners, `replica` creates a clustered pool. | `standalone` |
| **parent-runner** | No | The logical Parent Runner name this replica belongs to (used only when architecture is `replica`). | *None* |
| **runner-naming** | Yes | Naming convention for the managed Runner's directory/service structure: `standard` or `verbose`. | `verbose` |
| **runner-tags** | No | Comma-separated list of additional tags to apply (standalone RBA runners only). | *None* |
| **runner-memory** | Yes | Memory allocation applied to `-Xms` and `-Xmx`. Options: `512M`, `1G`, `2G`, `4G`. | `1G` |
| **project** | No | Rundeck Project to associate. Auto-uses the current project if left blank. | *None* |
| **runner-as-node** | Yes | Register and configure the Runner to automatically act as a dispatchable Node. | `true` |
| **work-dir** | No | Absolute installation path. Uses the default node working directory if blank. | *None* |
| **service-as-systemd** | No | Manage the Runner as a Systemd service. | `true` |
| **service-as-root** | No | Manage the Runner with root privileges. Leave blank for unprivileged execution. | *None* |
| **runner-error-routing-key**| No | PagerDuty Routing Key for crash alerting via Events V2 API (requires systemd). | *None* |
| **skip-errors** | Yes | Skip errors and resume steps for non-critical exceptions. | `false` |

---

## Technical Details
*   **Runtime Environment:** Python 3.x is used for automation scripts, and Java is required for runner execution.
*   **Workflow Strategy:** Uses a ruleset-based conditional execution with complex branching logic based on runner type, service management preference, and operation mode.
*   **Step Execution:** A mixed workflow containing both workflow steps and node steps, utilizing the `get-rba-api-version` function. 
*   **Rollback Mechanisms:** Incorporates logic to prevent orphaned API registrations by cleanly rolling back failed installations.

---

## Job Definition
The complete job definition can be downloaded and imported directly into your Rundeck instance.

[Download the Runner Service Manager Job Definition (JSON)](runner-service-manager.json)
