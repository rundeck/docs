# Upgrading to Rundeck 3.2.6


::: tip
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.0 or earlier.
:::

## Remote Log Storage
::: danger
Rundeck may fail to bootstrap properly if the following instructions are not followed
:::

`3.2.6` Adds a unique constraint to the `log_file_storage_request` table. In order for this constraint
to be added during bootstrap there must be no duplicates in the table.

**Check for duplicates**

```sql
select count(id) from log_file_storage_request GROUP BY execution_id HAVING count(execution_id) > 1;
```

If a row count greater than 0 is returned, the duplicates must be removed:

**Locate uncompleted duplicates**
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
