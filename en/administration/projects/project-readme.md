% Project README

You can create a readme file that welcomes your users and provides an overview about the project.
This readme file can contain markdown text letting you format or embed images.

You can also create a `motd.md` (Message of the Day) with other information that
may change more frequently.


![Project readme](../../figures/fig0203.png)


### Filesystem based readme/motd

If using the *filesystem* storage type only, you can create the file in the project base directory:

* launcher: $RDECK_BASE/projects/{project}/readme.md
* rpm/deb: /var/rundeck/projects/{project}/readme.md

If using the *db* storage type, you can use the GUI, or the [API](#api-usage).

### Automating

[Project readme/motd modification](../../api/index.html#project-readme-file)

    PUT /api/13/project/myproject/readme.md
    Content-Type: text/plain

    This project manages [acme-guitars.com](http://acme-guitars.com).
