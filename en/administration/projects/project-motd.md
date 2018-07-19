% Project MOTD

A motd file is a great way to make an announcement to the project's users.
The motd content is interpreted as [markdown](http://commonmark.org/help/) text letting you format your text and embed images and links.



## Graphical Interface

![Figure: Project motd](../../figures/fixme.png)

## CLI Usage

Update the motd with some text.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects motd put -p MyProject -t "This is the **motd** for MyProject"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You might want to set the project home page to show the motd.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects configure set -p MyProject -- \
   --project.gui.motd.display=projectHome
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## API Usage

[Project motd/motd modification](../../api/index.html#project-motd-file)

    PUT /api/13/project/myproject/motd.md
    Content-Type: text/plain

    This is the **motd** for MyProject

## Filesystem

If using the *filesystem* storage type only, you can create the file in the project base directory:

* launcher: $RDECK_BASE/projects/{project}/motd.md
* rpm/deb: /var/rundeck/projects/{project}/motd.md

If using the *db* storage type, use the GUI, the CLI or [API](#api-usage).
