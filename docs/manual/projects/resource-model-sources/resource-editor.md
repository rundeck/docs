# Resource Editor

The Resource Editor integration is a way to link to a third-party system used for managing Node definitions from within Rundeck. Each Node entry in the resources.xml or resources.yaml can define a URL to provide an "Edit" link that will appear in the Rundeck Run page for that Node.

This allows you to make use of the Resource Model Source in a more seamless way. Rundeck will load the Resource model from the third-party Provider system, and users of Rundeck can click straight to the Editor for those Nodes. The Provider and the Editor could be the same system, or they could both be custom CGI scripts that integrate with a third system.

Some teams have acquired or developed tools to manage information
about the hosts deployed in their networks. These tools have
interfaces to not just view but also modify the data about these
hosts. Though there is no widely used common standard adopted by users
of these tools, it is possible to map the data to meet the needs of
[Rundeck resource models](#resource-model-source).

### Definition

The [Rundeck resource model document format](/manual/document-format-reference/resource-v13.md) and the [resource-yaml-v13](/manual/document-format-reference/resource-yaml-v13.md) format provide two attributes that help connect the dots between the
Rundeck UI and the editing interface provided by the external data
management tool. They can use `editUrl` or `remoteUrl` attributes to specify the remote URL. The URLs can embed properties about the node to expand prior to being loaded, which allows you to e.g. submit query parameters using the node name.

`editUrl`

: Specifies a URL to a remote site which will allow editing of the Node. When specified, the Node resource will display an "Edit" link in the Rundeck GUI and clicking it will open a new browser page for the URL.

[`remoteUrl`](#using-remoteurl)

: Specifies a URL for a remote site which will be loaded in an iframe within a Rundeck page. Clicking the "Edit" link for the Node will load content from the site within the current Rundeck page, allow you to perform your edit at the remote site, and has optional JavaScript hooks to report the state of the editing process back to the Rundeck page for a more streamlined user interface.

### Using properties

Properties of the Node can be embedded in the URL and expanded prior to use. The syntax is:

    ${node.property}

Available properties are:

`name`, `hostname`, `os-name`, `os-version`, `os-family`, `os-arch`, `username`, `description`, `tags`, `project`

You can embed these properties within the url like this:

    http://mycmdb:8080/node/edit?name=${node.name}

### Using remoteUrl

Using the `remoteUrl` lets you embed another site into an iframe within the Rundeck page, and optionally allows communication back to the Rundeck page about the state of the editing process.

If you want to embed the remote site without having to make any changes to the remote page content, you can do so simply by specifying the `remoteUrl` to use. When the user clicks "Edit" the site will load within an iframe, and the user can perform whatever actions on the site are necessary. After they are done they will have to manually click the "Close" button on the Rundeck page to close the iframe.

If you want the user interface in Rundeck to be more streamlined, you will have to be able to modify the web pages produced by the remote site to add simple Javascript calls to communicate back to the Rundeck page. The JavaScript hooks are designed to not add much burden to the developer of the remote site or system, so they are optional.

#### Streamlining the interface

If the remote site implements some Javascript messaging conforming to a simple optional protocol, then the user interface between Rundeck and the remote site can be made more seamless.

Rundeck lets the remote site inform it when the following steps occur:

- The user begins editing a Node
- The user saves the Node changes successfully and is finished
- The user cancels the Node changes, or otherwise has finished without saving
- An error occurs and an error message should be shown.

Due to web browser security restrictions, direct communication between different webpages can only be done through use of the [postMessage](https://html.spec.whatwg.org/#crossDocumentMessages) method.

The remote page can send these messages simply with this javascript:

    <script type="text/javascript">
        if(window.self!=window.parent){
            window.parent.postMessage("...message...","http://rundeckserver:port");
        }
    </script>

`window.parent` will be the enclosing browser window when the site is loaded within an iframe. This script simply checks whether the page is loaded in an iframe before sending the message.

The first argument to `postMessage` is one of the message codes shown below. The second argument is the expected "origin", meaning the URL scheme, server and port of the server receiving the message. You can specify "\*" to include any site that may be loading the content, but you may want to restrict it to your Rundeck installation's scheme, hostname and port.

Rundeck can receive the following messages sent by the remote site:

`rundeck:node:edit:started`
~ Sent as soon as the remote edit URL is loaded and indicates that the remote Site understands the messaging protocol and has loaded the correct edit page. You would probably send this on the "edit" or "form" page for the targeted node.

`rundeck:node:edit:error` or `rundeck:node:edit:error:An error message`
~ Sent if some error occurs. The remote editing form will close and the error message (if any) will be shown. You would probably send this on the "edit" or "view" page if there is an error locating the targeted Node or loading anything required for the edit process.

The next two messages are only valid after the "started" message has already been received:

`rundeck:node:edit:finished:true`
~ Sent after the remote form has been saved without errors. This indicates that the editing process is done and has completed with saved changes. You would probably send this on the "view" or "show" page for the targeted node if the save operation was successful.

`rundeck:node:edit:finished:false`
~ Sent after the remote form has been either cancelled or discarded without changes. This indicates that the editing process is done but no changes were made. You would probably send this on the "view" or "show" for the targeted node (if your site simply shows the node view again) or "list" page (if your site goes back to a list of resources) if the user hits "cancel".

Any message not shown here that is received by Rundeck after it has received the "started" message will be considered unexpected and the editing process will close the iframe.

The user will also have the option to close and cancel the remote editing process at any time.

Note that sending the "error" or "finished" message will close the editing session and all subsequent messages will be ignored.

TODO: The JavaScript code to communicate back to Rundeck could be bundled into a simple widget script file for easier inclusion on remote sites.

### Examples

Here are some examples of using the `editUrl` and `remoteUrl` in a resources.xml/resources.yaml file:

Specify a simple URL for editing, which will simply produce a link:

```xml
<node name="venkman" editUrl="http://mycmdb:8080/node/edit" ... />
```

Specify a URL for editing, with embedded "name" property as a parameter:

```xml
<node name="venkman" editUrl="http://mycmdb:8080/node/edit?name=${node.name}" ... />
```

Specify a remote URL with embedded "name" and "project" properties as parameters:

```xml
<node name="venkman" remoteUrl="http://mycmdb:8080/node/edit?name=${node.name}&amp;project=${node.project}" ... />
```

Specify a remote URL with embedded "name" property as part of the path:

```xml
<node name="venkman" remoteUrl="http://mycmdb:8080/node/edit/${node.name}"  ... />
```

In YAML, some examples:

Specify a remote URL with embedded "name" and "project" properties as parameters:

```yaml
venkman:
  nodename: venkman
  remoteUrl: http://mycmdb:8080/node/edit?name=${node.name}&amp;project=${node.project}
```

Specify a remote URL with embedded "name" property as part of the path:

```yaml
venkman:
  nodename: venkman
  remoteUrl: "http://mycmdb:8080/node/edit/${node.name}
```

#### Simple site integration

The [ndbtest](https://github.com/gschueler/ndbtest) project on github provides an example of how the remote Resource Editor can integrate with Rundeck using JavaScript.

This project is a simple [Grails](https://grails.org) application which provides a database of Node data. The standard web-based user flow is:

- List all nodes.
- Edit a Node with the edit page. From here the User can:
  - Cancel the Node changes
    - Goes to the Node show page
  - Save the Node changes
    - Result is successful
      - Goes to the Node show page
    - Result fails, so display an Error message (either on the edit page or the list page)

We want the Node's "edit" link in Rundeck to go directly to an edit page, so the `remoteUrl` for each Node entry then should be a URL to link to this page, for example:

    remoteUrl="http://localhost:8080/node/edit?name=${node.name}&amp;project=${node.project}"

The code below shows that the `name` & `project` are used to select the correct node from the database, even though the built-in identifier is an ID number:

- [NodeController.groovy:51](https://github.com/gschueler/ndbtest/blob/master/grails-app/controllers/com/dtolabs/ndb/NodeController.groovy#L51).

  - Note that if there is no Node found with the specified values, then the response will be to set an error message and then show the list page.

So the JavaScript for integrating with Rundeck is then added to the following pages in this system:

- [node/edit.gsp](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/edit.gsp)
  - If an error has occurred, it posts an error message starting on [Line 27](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/edit.gsp#L27)
  - Otherwise, it posts the `started` message starting [on line 34](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/edit.gsp#L34)
- [node/show.gsp](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/show.gsp)
  - If the node save was successful, send the `finished:true` message, starting at [line 21](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/show.gsp#L21).
  - Otherwise send the `finished:false` message starting at [line 28](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/show.gsp#L28).
- [node/list.gsp](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/list.gsp)
  - If an error has occurred, it posts an error message starting on [line 20](https://github.com/gschueler/ndbtest/blob/master/grails-app/views/node/list.gsp#L20).

To complete the round-trip of editing a Node and then showing the results back in Rundeck, the ndbtest project would have to export XML formatted Resource data, and then your Rundeck project.properties file would have to point to the appropriate URL. (This is left as an exercise to the reader.)

[Tutorial](/tutorials/index.md)
