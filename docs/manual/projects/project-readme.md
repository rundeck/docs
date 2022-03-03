# Project README

A readme file is a great way to welcome your users and provide an overview about the project.
The readme content is interpreted as [markdown](http://commonmark.org/help/) text letting you format your text and embed images and links.

## Graphical Interface

![Figure: Project with Readme](~@assets/img/project-list-readme.png)

### CLI Usage

Update the readme with some text.

```bash
rd projects readme put -p MyProject -t "This is the **readme** for MyProject."
```

You might want to set the project home page to show the readme.

```bash
rd projects configure set -p MyProject -- \
   --project.gui.readme.display=projectHome
```

## API Usage

[Project readme/motd modification](/api/rundeck-api.md#project-readme-file)

    PUT /api/13/project/MyProject/readme.md
    Content-Type: text/plain

    This is the **readme** for MyProject.

## Filesystem

If using the _filesystem_ storage type only, you can create the file in the project base directory:

- launcher: \$RDECK_BASE/projects/{project}/readme.md
- rpm/deb: /var/rundeck/projects/{project}/readme.md

If using the _db_ storage type, use the GUI, the CLI or [API](#api-usage).
