# PagerDuty Workflow Steps (Enterprise)

## What is PagerDuty?

PagerDuty is a software that provides incident response management services to IT operations teams. When an incident is created, PagerDuty makes it easy for IT teams to track that incident for the duration of its life. The Rundeck and PagerDuty integration allows teams to run diagnostic and corrective actions to minimize the duration of the incident, as well as get event notifications within PagerDuty.

## Plugin Configuration

To use the PagerDuty plugins: 
1. Generate a PagerDuty [API Access Key](https://support.pagerduty.com/docs/api-access-keys)
2. Add that key to [Key Storage](/manual/key-storage/key-storage).
3. Follow the steps outlined in [Plugin Configuration](/manual/plugins) to select the PagerDuty plugin suite and then select the PagerDuty API Access Key from Key Storage.

:::tip For OSS Users 
The PagerDuty plugins can be configured in the Project configuration settings by navigating to:

**Project Settings** -> **Edit Configuration** -> **Edit Configuration File** and adding the following property:<br>
**`project.pagerduty.api_key_path=keys/pd/api`**

The plugins can also be defined at the system level by adding the following to the **`framework.properties`** file:<br>
**`pagerduty.api_key_path=keys/pd/api`**

In both cases, `keys/pd/api` represent the path in Key Storage where the PagerDuty API Access key resides.
:::

## PagerDuty Incident Note

This job step allows users to add a note to an existing PagerDuty incident.

![PagerDuty - Add Note](/assets/img/pagerduty_note.png)

- **API Token**: The API token associated with the PagerDuty account. In PagerDuty go to Configuration, select API access and either create a new key or use an existing one.
- **Email**: The email address associated with the API token (whichever user was logged in when the token was created)
- **Incident ID**: The ID of the incident to add a note to
- **Note**: The note to add to the incident

## PagerDuty Escalate Incident

![PagerDuty - Escalate Incident](/assets/img/pagerduty-escalate-incident.png)

- **API Key**
: The API key for the account that contains the incident to update.

- **Email**
: The email address associated with the API token (whichever user was logged in when the token was created)

- **Escalation Leve**
: The level of the escalation policy that the incident should be escalated to.

- **Incident ID**
: The ID of the incident to run the response play for.

## PagerDuty Run Response Play

![PagerDuty - Run Response Play](/assets/img/pagerduty-run-response-play.png)

- **API Key**
: The API key for the account that contains the incident to update.

- **Email**
: The email address associated with the API token (whichever user was logged in when the token was created)

- **Response Play ID**
: The ID of the response play to be run in response to the incident.

- **Incident ID**
: The ID of the incident to run the response play for.

## PagerDuty Send Event

![PagerDuty - Send Event](/assets/img/pagerduty-send-event.png)

- **Dedupe Key**
: If a dedupe key is specified, it applies all events with matching dedupe key to the same open alert

- **Integration Key**
: This is the integration key for the account where the incident is

- **Event Action**
: These are the possible actions to take when creating the event. The options are trigger, acknowledge, and resolve.

- **Severity**
: This is the current severity level of the event. The options are critical, warning, error, info.

- **Event Summary**
: This is the summary for the event. The default sends execution information as the summary, but it can be anything.

- **Source**
: This is the source that created the event. By default, it is the job name, but it can be anything.

- **Component**
: This is where to specify the part or component of the affected system is broken.

- **Group**
: If something is specified here, it allows for a cluster or grouping of sources. For example, sources "prod-datapipe-02" and "prod-datapipe-03" might both be part of "prod-datapipe".

- **Class**
: The class/type of the event.

- **Images**
: This is a comma separated list of image URLS to include in the event.

> Note: to send events to PagerDuty services hosted in different regions, you will need to add the URL in a property called: framework.pagerduty.service.url, inside the framework.properties file, located in $RDECK_BASE/etc/ .

E.g.:
```bash
framework.pagerduty.service.url = https://events.eu.pagerduty.com
```

## PagerDuty Update Status

This job step allows users to update the status of an existing PagerDuty incident.

![PagerDuty - Update Status](/assets/img/pagerduty_status.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token (whichever user was logged in when the token was created)
- **Incident ID**: The ID of the incident to want to add a note to
- **Message**: This is where to update the status (acknowledged or resolved)

## PagerDuty Incident Update

This job step allows users to update an existing PagerDuty incident.

![PagerDuty - Incident Update](/assets/img/pagerduty_update.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token (whichever user was logged in when the token was created)
- **Incident ID**: The ID of the incident to add a note to
- **Status**: This is where to update the status (acknowledged or resolved)
- **Resolution**: If the incident was resolved, this is where to add the resolution notes
- **Assignees**: This is where to specify assignees, each separated by a comma

## PagerDuty Get Incident

![PagerDuty - Get Incident](/assets/img/pd-get.png)

- **Incident ID**: The ID of the Incident to get information on.
- **API Key**: The API key for the account that contains the incident to update.

## PagerDuty Update Escalation Policy

This job step allows users to update the escalation policy on a given incident.

![PagerDuty - Update Escalation](/assets/img/pd-update-escalation.png)

- **Escalation Policy**: This is the new escalation policy for the incident to use.
- **Incident ID**: The ID of the incident to update the escalation policy on.
- **API Key**: The API key for the account that contains the incident to update.


## PagerDuty Add Additional Responders

This job step allows users to specify another escalation policy or another user to assign to an incident.

![PagerDuty - Update Escalation](/assets/img/pd-add.png)

- **Escalation Policy**: This is the new escalation policy for the incident to use.
- **Incident ID**: The ID of the incident to update the escalation policy on.
- **API Key**: The API key for the account that contains the incident to update.
- **User**: The user to assign to the incident.
- **Message**: A message to include when notifying the new responders
- **Requester**: The person requesting the new responders. This user must match the API key specified in key storage.


## PagerDuty Send Change Event

![PagerDuty - Send Change Event](/assets/img/pd_changevent.png)

- **Routing Key**: This is the integration key for an integration on a service. Specify the one for the service where the change event should be sent.
- **Summary**: A brief text summary of the event.
- **Source**: The unique name of the location where the Change Event occurred.
- **Add Custom Fields**: This is a place to enter any custom fields for the change event. Specify a field key, label and description and then assign a value to that key once rendered.
- **API Key**: The API key for the account that contains the service to send the change event to.

> Note: to send events to PagerDuty services hosted in different regions, you will need to add the URL in a property called: framework.pagerduty.service.url, inside the framework.properties file, located in $RDECK_BASE/etc/ .

E.g.:
```bash
framework.pagerduty.service.url = https://events.eu.pagerduty.com
```

## PagerDuty Send Impact Metric

![PagerDuty - Send Impact Metric](/assets/img/pd_impactmetric.png)

>> Note: this feature has been deprecated by PagerDuty and will be removed in a future version of Rundeck.

- **Value**: This is the value to be appended to the impact metric.
- **Metric ID**: The ID of the metric that you want to be updated.
- **API Key**: The API key for the account that contains the incident to update.

## PagerDuty Create User

- **Email**: This is the unique email address for the new user to be created.
- **Name**: Full Name of the user
- **Color**: This is the schedule color for the user. There is a long list of string values available for this.  Edit an existing user to see options.
- **Role**: The PagerDuty role to assign this new user.
- **Title**: User's Job Title
- **Description**: A description of the user.
- **API Key**: The User API Key that corresponds to an account with rights to create/invite new user accounts.

## PagerDuty Update User

- **User ID**: This is the unique ID associated with the user (Required)
- **Email**: This is the unique email address for the new user to be created.
- **Name**: Full Name of the user
- **Color**: This is the schedule color for the user. There is a long list of string values available for this.  Edit an existing user to see options.
- **Role**: The PagerDuty role to assign this new user.
- **Title**: User's Job Title
- **Description**: A description of the user.
- **API Key**: The User API Key that corresponds to an account with rights to update new user accounts.

> Note: The User ID is not the user's email address. The Unique ID can be found in the URL of the User's profile or by issuing a Get List with their email as a filter.

## PagerDuty Delete User

- **User ID**: This is the unique ID associated with the user
- **API Key**: The User API Key that corresponds to an account with rights to delete new user accounts.

> Note: The User ID is not the user's email address. The Unique ID can be found in the URL of the User's profile or by issuing a Get List with their email as a filter.

## PagerDuty Get User

- - **User ID**: This is the unique ID associated with the user
- **API Key**: The User API Key that corresponds to an account with rights to query user accounts.

> Note: The User ID is not the user's email address. The Unique ID can be found in the URL of the User's profile or by issuing a Get List with their email as a filter.

## PagerDuty Get Users (List)

- **Team Ids**: An array of team IDs. Only results related to these teams will be returned. Account must have the teams ability to use this parameter. (KSDJ56,SKDJ56,AKSJF67)
- **Filter**: A unique query to find a list of users.  Example: `email@your.domain` would return a user with that email address.
