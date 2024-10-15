# Containers
## Getting Started

::: tip Prerequisites
To use the Containers Solution, you must have a **PagerDuty Runbook Automation** (Self-Hosted or SaaS) instance available.

If you do not have a license for either of these products, [contact us](https://www.pagerduty.com/contact-us/runbook-automation/) to learn more.

**You must be running at least version 5.5.0 to use this Solution.** New instances of Runbook Automation have the Solution installed and included by default.<br>
:::

For all Runbook Automation environments, follow the steps below to download and import the Jobs and Tours:
### Download the **Automated Diagnostics Solution package**.
1. Download the latest release of the Solution [here](#).<br>

### Create a project in your Runbook Automation environment:
1. Click the **P** in the upper left corner to navigate to the Main Dashboard <br><br>
2. Click the blue **New Project+** button:<br>
![Add Project](/assets/img/solutions-auto-diag-add-project.png)<br><br>
3. Copy the following into the **Project Name** field:  **`containers-solution`**<br>
![Name Project](/assets/img/solutions-name-project.png)
    :::warning Heads Up
     Be sure to name the project **`containers-solution`**. Otherwise, some of the prebuilt Jobs and Tours will not function properly.
    :::
4. Provide a Label for a more "user-friendly" name - such as _Containers Solution_ <br><br>
5. Click the green **Create** button

### Import the archive file into your new project:
1. In your new project, click the **gears** in the lower left corner for **Project Settings**<br><br>
2. Choose **Import Archive** from the menu:
![Import Archive](/assets/img/solutions-auto-diag-import-archive.png)<br><br>
3. For the **Choose a Rundeck archive**, select the **`containers-solution.jar`** from the downloaded resources.<br><br>
4. Leave all of the import settings as their defaults<br><br>
5. Click the green **Import** button
   ::: tip Note
   The Tours in the Solution will help you prepare the project for the jobs included.  Be sure to start there and name your project properly using the instructions above.  
   If you are looking for a more general introduction to PagerDuty’s Automation products, it is recommended to review the contents of the [Welcome Project](/learning/howto/welcome-project-starter.md).
   :::