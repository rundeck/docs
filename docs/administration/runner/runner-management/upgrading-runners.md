# Upgrading Runners

This document describes how to upgrade Runners to the latest version.

## Runners Hosted on Virtual-Machines

:::tip Maintain Availability During Upgrades
To maintain availability while upgrading Runners, it is recommended to have at least one other Runner available to handle any tasks that may get assigned to the Runner being upgraded.
The recommended approach is to have two (or more) distinct Runners with the exact same **Tags**.  
This way, when the Runner being upgraded is taken offline, the other Runner(s) with the same Tag will be available to handle any tasks that may get assigned to the Runner being upgraded.
:::

For Runners hosted on virtual-machines, the upgrade process is as follows:

::: tabs
@tab Runbook Automation Console
1. Navigate to the Runner Management page.
2. Click on the **Actions** menu for the Runner to upgrade.
3. Click on **Download Runner**.
4. **DO NOT** yet click on **Regenerate Runner Credentials**.
5. On the existing Runner's host, stop the Java process for the current Runner.
    :::warning This will now make the existing Runner unavailable for any tasks.
6. Back in the Runbook Automation console, click on **Regenerate Runner Credentials**.
    ![Download Runner Package](/assets/img/download-runner-package.png)
7. Click on **Download Runner Package**.
8. Once the new `.jar` file has been downloaded, copy it to the existing Runner's host. 
9. Place the new `.jar` file in the same directory as the existing Runner.
10. Start the new Runner by executing the following command:
    ```bash
    java -jar your-runner-id.jar
    ```

@tab REST API
1. Retrieve the **Runner ID** of the Runner to upgrade.
    - This can be done by [listing the Runners via the API](/api/index.md#list-available-runners) and noting the Runner ID:
      - **```GET /api/41/runnerManagement/runners```**
    - The **Runner ID** is also visible in the Runbook Automation console:
      ![Runner ID](/assets/img/retrieve-runner-id.png)<br>
2. On the existing Runner's host, stop the Java process for the current Runner.
   :::warning This will now make the existing Runner unavailable for any tasks.
3. Regenerate the Runner credentials with the following API call:
    - **```POST /api/42/runnerManagement/runner/[Runner ID]/regenerateCreds```**
4. The response will contain the _download token_:  **`downloadTk`**
5. Download the new Runner package with the following API call:
    - **```GET /api/42/runnerManagement/download/[downloadTk]```**
    - This will download the new Runner `.jar` file.
6. Copy the new `.jar` file to the existing Runner's host.
7. Place the new `.jar` file in the same directory as the existing Runner.
8. Start the new Runner by executing the following command:
    ```bash
    java -jar your-runner-id.jar
    ```

:::

:::tip Use Same Invocation String as Previous Runner
When starting the new Runner, ensure that the invocation string is the same as the previous installed version of the Runner.
For example, if using a proxy-host, be sure to include the proxy-host information in the invocation string.
:::

## Runners Hosted in Docker

For Runners hosted in containers, the upgrade process uses the same steps as those outlined in the [Deploying Runners in Containers](/administration/runner/runner-installation/runner-install.md#deploying-runners-in-containers) document.

## Runners Hosted in Kubernetes

For Runners hosted in Kubernetes, the upgrade process uses the same steps as those outlined in the [Deploying Runners in Kubernetes](/administration/runner/runner-installation/runner-install.md#deploying-runners-in-kubernetes) document.