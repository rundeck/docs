> ⚠️ **NOTICE**: This project has been archived! All documentation work has been detoured to the [VuePress Docs project](https://github.com/rundeck/docs-vuepress) . Please open all PRs and issues against that repo!

# Building

Requires:

* pandoc installed and in your PATH
* groovy installed and in your PATH

Build procedure:

    make

Ouput:

* html english output

  `en/dist/html/*`

* man english output

  `en/dist/man/*`

* zip package

  `dist/rundeck-docs-VERSION.zip`

# Writing links

When writing Markdown links between documents, instead of using relative paths and html file names, which might change in the future, you can use these syntaxes to link directly to the page based on its absolute file path;

Link to a page and specify the link text:
    
    [My text][page:administration/configuration/system-properties.md]

Link to the same page. The link text will be set to the document title for that page:

    [[page:administration/configuration/system-properties.md]]
    
You can include anchor text in the page link as well:

    [[page:administration/configuration/system-properties.md#rpm-and-deb]]

Use the exact file path/name as present in the language subdirectory.  The previous links link to the `/en/administration/configuration/system-properties.md` file when generated in the `en` dir.

Either one is preferable to the normal `[link](../../path/to/file.html)`.

# API Documentation

The API documentation is located at https://github.com/rundeck/docs/blob/3.0.x/en/api/rundeck-api.md

When adding or updating APIs in Rundeck, please follow these directions for updating the associated API documentation:

1. Write a summary of changes at the top of the document, this should list each change under a section such as "Added" or "Updated" or "Removed". Each significant change should link to the appropriate endpoint definition.
2. Example: "Updated Endpoints:" - "GET /api/V/project/[PROJECT]/export - exportScm parameter"
    
**If you are adding a new endpoint:**

1. Add the new documentation under the appropriate section
1. Name your section header descriptively such as "Running Adhoc Script Urls"
1. Note the anchor link that will be generated for you section, e.g. "#running-adhoc-script-urls"
1. At the very bottom of the document, add a Reference link using the form: `/api/V/my/endpoint/[PARAM]` that links to the anchor based on your newly added section, using the Markdown link reference syntax, e.g.: `[/api/V/project/[PROJECT]/run/url]:#running-adhoc-script-urls`
1. If your endpoint uses multiple HTTP Verbs in addition to GET, such as POST/PUT/DELETE, add another Reference link for each verb, such as `[DELETE /api/V/token/[ID]]:#delete-a-token`
1. Under the [Index](https://github.com/rundeck/docs/blob/3.0.x/en/api/rundeck-api.md#index) section, add a link from your new endpoint path to the correct anchor section.
1. Repeat for each additional HTTP Verb

**Verify your links are correct in the generated documentation**
