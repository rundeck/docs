---
title: Content Converters
---

# Content Converter Plugins

Content Converter Plugins allow Step Plugins and Log Filter plugins to
output data that can be rendered as HTML into the Execution Log view
of a Rundeck Job or Adhoc execution.

::: tip
Note: For more information in the operation of Content Converter plugins, and how to create them, see ([Development > Content Converter Plugins](/developer/content-converter-plugins.md)).
:::


For example, the [Render Formatted Data](/manual/log-filters/render-formatted-data.md) plugin
allows you to simply mark content in your Log output as `html` or `markdown`
and the appropriate Content Converter plugin(s) will be invoked to render
the content correctly when you view it in the GUI. Rundeck also knows how to chain up to two plugins together
to produce `text/html` output for the Log View. This allows some plugins to
simply parse formatted data such as CSV, and another plugin to render it as HTML.


~~~
 .----------------.      +----------------+
| input: text/json +---->| JSON converter |
 '----------------'      +-------+--------+
                                 |
                                 v
                         .------------------.    +----------------------+
                        | result: x-java-map +-->| HTML Table converter |
                         '------------------'    +----------+-----------+
                                                            |
                                                            v
                                                   .------------------.
                                                  | result: text/html  |
                                                   '------------------'

~~~


Normally Content Converters are not used directly. However,
Step plugins can include metadata in their log output that will invoke
Content Converters without needing to use Log Filters. Log Filters such as the Render Formatted Data
plugin are
useful with scripts, commands, or other step plugins that output
data or content in plain text format and do not have a way to add
their own metadata to the log output.

## Sanitized HTML Output

Normally, any HTML that Rundeck generates from user-content (such as log output) will
be passed through an HTML Sanitizer, which strips potentially malicious content
from the input HTML, such as `<script>` tags and certain attributes.
If your HTML output is not rendering as you expect, this may be the reason why.


## Plugins


- [HTML Table View Converter](/manual/content-converters/html-table-view.md)
- [HTML View Converter](/manual/content-converters/html-view.md)
- [JSON Data Converter](/manual/content-converters/json.md)
- [Markdown Converter](/manual/content-converters/markdown.md)
- [Properties Converter](/manual/content-converters/properties.md)
- [Tabular Data Converter](/manual/content-converters/tabular-data.md)
