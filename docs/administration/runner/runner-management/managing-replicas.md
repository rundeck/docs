# Managing Replicas

Runners are composed of one or more Replicas.  To view the Replicas of a Runner, go to the **Runners** page and select the Runner you want to view. The **Replicas** tab will show you the list of Replicas for that Runner.

![View Replicas of a Runner](/assets/img/runner-replicas-list.png)<br>

For more details on the concept of Replicas and Runners, read through the [Concepts & Architecture](/administration/runner/concepts.md).

## Adding Replicas

:::tip Ephemeral vs Persistent Replicas
Replicas can only be added via the GUI or API on-demand if the Runner is configured to _not_ treat its Replicas as Ephemeral.
More details on this are explained in the [**Ephemeral vs. Persistent Replicas**](/administration/runner/concepts.md#ephemeral-vs-persistent-replicas) section.
:::

To add a Replica to a Runner, go to the **Replicas** tab of the Runner and click on the **Add Replica** button:

![Add Replica Button](/assets/img/add-replica-button.png)<br>

This will open a popup that provides the various methods for downloading the Replica package:

![Add Replica Popup](/assets/img/add-replica-modal.png)<br>

Follow the instructions in the popup, or for more details see the [**Creating Runners**](/administration/runner/runner-installation/creating-runners.md) section.

##  Removing Replicas

:::tip Ephemeral vs Persistent Replicas
Replicas can only be deleted via the GUI or API on-demand if the Runner is configured to _not_ treat its Replicas as Ephemeral.
More details on this are explained in the [**Ephemeral vs. Persistent Replicas**](/administration/runner/concepts.md#ephemeral-vs-persistent-replicas) section.
:::

To remove a Replica from a Runner, go to the **Replicas** tab of the Runner and click on the **Actions** dropdown. Click on **Delete** and then click on **Ok** to confirm the deletion.

![Delete Replica Button](/assets/img/delete-replica.png)<br>

## Replica Status

The status of Replicas can be seen by navigating to the **Replicas** tab of the Runner. The status of each Replica is shown in the **Last Active** column. The status can be one of the following:

* **New**: The Replica has been created but not yet started. Heartbeats are sent from the Replica every 5 seconds.
* **Healthy**: The Replica is currently running and available for tasks.
* **Unhealth**: The Replica has connected to Runbook Automation but is experiencing a high workload. This status is set to safeguard the execution times and tells Runbook Automation to utilize another Replica - if available.
* **Unknown**: The server has not heard from the Replica in 30 seconds. Tasks will not be assigned to this Replica.
* **Down**: The Replica has not been heard from in 120 seconds. Tasks will not be assigned to this Replica.

## Tuning Replicas

The number of concurrent operations that a Replica can handle can be tuned by setting the system property<br> 
**`-Drunner.operations.maxRunning=<EXEC_LIMIT>`** when deploying a Runner. The default value is 50.