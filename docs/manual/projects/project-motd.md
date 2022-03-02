# Project Message Of The Day (MOTD)

A motd file is a great way to make an announcement to the project's users.
The motd content is interpreted as [markdown](http://commonmark.org/help/) text letting you format your text and embed images and links.

## Graphical Interface

To edit the project Message of the Day follow this navigation path.
![MOTD Menu Selection](~@assets/img/motd-menu-item.png)

Enter the text that needs to be shared with users of this project and click Save.
![Figure: Project motd](~@assets/img/motdgui02.png)

From **Project Settings > Edit Configuration > GUI** choose where the Message of the Day will be displayed.
![Figure: Project motd](~@assets/img/motdgui01.png)

The Message of the Day will be shown when a user has access to that project.
![Figure: Project motd](~@assets/img/motdgui03.png)

## CLI Usage

Update the motd with the [rd-cli](/manual/command-line-tools/rd.md) tool.

```bash
rd projects readme put -p MyProject --motd -t "This is the **motd** for MyProject"
```

Now, you must add a property to set where to show the motd message, these options are `projectList` to show it in the main list of projects, `projectHome` to show it in the project view, or `navbar` to have a button in the navigation bar to display the motd at will, you could add more than one option as comma separated attributes:

Example to show the motd in the project list and in the main project
```bash
rd projects configure set -p MyProject -- --project.gui.motd.display=projectList,projectHome
```

## API Usage

[Project motd/motd modification](/api/rundeck-api.md#project-motd-file)

As we saw above, setting the motd using the GUI is the easiest way, less used is the API, but you can accomplish the same as by GUI or rd-cli, using below example:

```
PUT /api/35/project/myproject/motd.md
Content-Type: text/plain
"This is the **motd** for MyProject"
```

## Filesystem

If using the _filesystem_ storage type only, you can create the file in the project base directory:

- launcher: $RDECK_BASE/projects/{project}/motd.md
- rpm/deb: /var/rundeck/projects/{project}/motd.md

If using the _db_ storage type, use the GUI, the [CLI](/manual/command-line-tools/rd.md) or [API](#api-usage).
