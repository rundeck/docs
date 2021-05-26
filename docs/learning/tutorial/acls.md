# 5. Getting Started - Access Control Lists

Role Based Access can be managed at the system or project specific level.

In this list of project based ACLs the UserAccess policy governs the rights `alice` and `betty` have currently.

In the following Exercise we will allow Alice to also run AdHoc Commands:

:::: tabs
::: tab Enterprise Exercise:

1. Click **Project Settings > Access Control**
1. Click **+ Create ACL Policy** button
1. Name: `AllowCommands` _(no spaces)_
1. Click **+ New Rule** button
1. Description: `Commands for Alice`
1. By > _User_
1. User value: `alice`
1. Resource: `AdHoc`
1. **Allow** option _checked_
1. Check the first three options `(read), (view), and (run)`
1. Click **Add Rule**
1. Click **Save**

:::
::: tab Community Exercise:
1. Click **Project Settings > Access Control**
1. Click **+ Create ACL Policy** button
1. Name: `AllowCommands` _(no spaces)_
1. Paste the following code into the editor
    ```yaml
    ---
    by:
      username: alice
    description: Commands for Alice
    for:
      adhoc:
      - allow:
        - read
        - view
        - run
    ```
1. Click Save

>The code tells Rundeck to Allow Alice to run adhoc commands.
:::
::::

Return to the Alice Incognito window and refresh the browser. A new option for Commands should appear in the left navigation menu.

Since this ACL was scoped to `alice`, logging out and back in as `betty` will not have Commands in the Welcome Project.
