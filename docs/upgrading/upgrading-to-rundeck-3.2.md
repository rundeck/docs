# Upgrading to Rundeck 3.2


::: tip
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.0 or earlier.
:::

## Upgrading from Rundeck 3.0 Using Debian/RPM packaging


The value of `framework.projects.dir` in the default install of Rundeck 3.2 in the config file `framework.properties` has changed to:

	framework.projects.dir=/var/lib/rundeck/projects

Rundeck 3.0.x has this :

	framework.projects.dir=/var/rundeck/projects


If before the upgrade the `/var/rundeck/projects` is NOT empty, 3.2 will start properly, but if `/var/rundeck/projects` is empty, it will be deleted and 3.2 won't start until you modify the proper line in `framework.properties` to be `/var/lib/rundeck/projects`.

An error with this message may occur in the Rundeck console at startup:

```
... nested exception is java.lang.IllegalArgumentException: project base directory could not be created. /var/rundeck/projects

```

## Webhooks
:::tip
Webhooks were feature flagged in `3.1.x` and disabled by default.  Your instance may not have used Webhooks prior to the 3.2 release.  If you did not use Webhooks prior to version 3.2 you can skip this issue.
:::

### Advanced Run Job (Enterprise)
The [condition](/manual/webhooks/advanced-run-job.html#conditions) type `matches` has been renamed to `equals`. Webhooks using `Advanced Run Job` with `matches` conditions will need to be updated to work properly. These configurations can be updated by:  

- Loading the webhook in the UI, selecting `equals` on the appropriate conditions, and then saving

   **OR**

- Updating the webhooks configuration through the [API](/api/rundeck-api.html#webhooks-incubating)

## Log File Storage Constraints
If you are updating from a version prior to `3.2.6` it is recommended following guidance below to ensure proper loading of Rundeck.

Rundeck version `3.2.6` and later adds a unique constraint to the `log_file_storage_request` table. In order for this constraint to be added as part of the upgrade there must be no duplicates in the table.

::: tip
Note: The SQL code below was only tested on MySQL.  You may need to adjust for your particular implementation.
:::

**Check for duplicates**

Manually run this SQL against your Rundeck database.

```sql
select count(id) from log_file_storage_request
GROUP BY execution_id HAVING count(execution_id) > 1;
```

If a row count comes back as 0 you can continue with the upgrade and skip the following steps.

If a row count greater than 0 is returned, the duplicates must be removed:

**Locate duplicates**
```sql
DELETE FROM log_file_storage_request
WHERE id IN (
    SELECT * FROM (
        SELECT log.id FROM log_file_storage_request log
        JOIN (
            SELECT executiuon_id
            FROM log_file_storage_request
            GROUP BY execution_id
            HAVING count(*) > 1
        ) dupe
        ON log.execution_id = dupe.execution_id
        WHERE log.completed=0
    ) uncompleted_dupes
);
```

**Delete all but one duplicate entry**
```sql
DELETE FROM log_file_storage_request
WHERE id NOT IN (
    SELECT * FROM (
        SELECT min(id)
        FROM log_file_storage_request
        GROUP BY execution_id
    ) dupes
);
```
