% Project MOTD

Create a `motd.md` (Message of the Day) for information that may change frequently.


### Filesystem based motd

If using the *filesystem* storage type only, you can create the file in the project base directory:

* launcher: $RDECK_BASE/projects/{project}/motd.md
* rpm/deb: /var/rundeck/projects/{project}/motd.md

If using the *db* storage type, you can use the GUI, or the [API](#api-usage).

### Automating

[Project readme/motd modification](../../api/index.html#project-readme-file)

    PUT /api/13/project/myproject/motd.md
    Content-Type: text/plain

    This project manages [acme-guitars.com](http://acme-guitars.com).
