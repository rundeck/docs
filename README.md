# Building

Requires:

* pandoc installed and in your PATH

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
