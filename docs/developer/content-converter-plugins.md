---
title: Content Converter Plugins
---

# Content Converter Plugins

## Overview

Content Converter plugins transform log output into rich, visual formats for display in the Rundeck GUI. Instead of plain text, you can render logs as HTML tables, charts, JSON viewers, markdown, or custom visualizations.

**What They Do:**

Convert log data from one format to another:
- **Input:** Structured data (JSON, XML, CSV, custom formats)
- **Processing:** Parse, transform, format
- **Output:** Rich HTML for GUI display

**Common Use Cases:**

**Data Visualization:**
- **JSON → HTML Table** - Display API responses as tables
- **CSV → HTML Table** - Render CSV output with formatting
- **Metrics → Charts** - Convert performance data to charts/graphs
- **Test Results → Dashboard** - Pretty test result displays

**Enhanced Readability:**
- **Markdown → HTML** - Render markdown in logs
- **ANSI Colors → HTML** - Convert terminal colors to HTML
- **XML → Formatted HTML** - Pretty-print XML responses
- **Log Levels → Icons** - Visual indicators for errors/warnings

**Custom Formats:**
- **Proprietary → Standard** - Convert vendor formats to readable output
- **Binary → Hex View** - Display binary data
- **Structured Logs → Timeline** - Event timeline visualization

**Real-World Examples:**
- API response JSON rendered as formatted table
- Database query results displayed with sorting/filtering
- Test suite results with pass/fail icons and colors
- Deployment metrics shown as progress bars
- Network scan results in organized table

**How Converters Work:**

```
Log Event (with metadata)
    ↓
content-data-type: application/json
    ↓
Content Converter Plugin
    ↓
Converts: JSON String → HTML
    ↓
Rich Display in Rundeck GUI
```

**Chaining Converters:**

Rundeck can chain up to **2 converters** to reach HTML:

```
Raw Data → Intermediate Format → HTML

Example 1:
CSV String → Java List → HTML Table

Example 2:
JSON String → Java Map → HTML Table
```

This modularity lets you:
- Reuse converters (multiple data sources → same HTML renderer)
- Build libraries of converters
- Combine converters flexibly

**Data Types:**

A "Data Type" = Java Class + MIME Type string

Examples:
- `String` + `application/json`
- `List<String>` + `application/x-java-list`
- `Map` + `application/x-java-map-or-list`
- `String` + `text/html` (final output)

## When to Create a Content Converter

### Built-in Converters Cover Common Formats

Rundeck includes converters for:
- **JSON** → HTML Table
- **CSV/TSV** → HTML Table  
- **ANSI Colors** → HTML
- **Java Maps/Lists** → HTML Table
- **Markdown** → HTML

### Create Custom Converter When:

**✅ Proprietary Format**
- Vendor-specific log format
- Custom structured output
- Legacy system format

**✅ Special Visualization**
- Charts/graphs from metrics
- Custom tables with special formatting
- Progress bars, gauges, dashboards
- Timeline views

**✅ Integration**
- Parse output from specific tools
- Match existing visualizations
- Company-specific formats

### Don't Create When:

**❌ Standard JSON/CSV**

Use built-in converters + Log Filter plugin to set `content-data-type`.

**❌ Simple HTML**

Use Log Filter plugin to wrap output in HTML directly.

## How Content Converters Work

### Trigger: Log Metadata

Converters are applied automatically when log events have metadata:

```java
// In a Log Filter or Step Plugin:
Map<String, String> meta = new HashMap<>();
meta.put("content-data-type", "application/json");
event.addEventMeta(meta);
```

### Automatic Application

When viewing logs in GUI:
1. Rundeck sees `content-data-type: application/json` metadata
2. Finds converter(s) that can convert to `text/html`
3. Chains up to 2 converters if needed
4. Renders HTML in GUI

### Used With Log Filters

Typical pattern:

**Step 1: Log Filter adds metadata**
```java
// Log Filter Plugin
if (isJsonLine(message)) {
    event.addEventMeta(Collections.singletonMap("content-data-type", "application/json"));
}
```

**Step 2: Content Converter renders**
```java
// Content Converter Plugin
convert("application/json", "text/html") {
    // Parse JSON and return HTML table
}
```

## Log Metadata

Log events have Metadata (key/value strings) associated with them.

If a Log event has a `content-data-type` metadata value, Rundeck will attempt to chain together up to two Content Converter Plugins
to convert the specified data type into `text/html` for rendering in the GUI.

Using a Log Filter plugin such as the [Render Formatted Data](/manual/log-filters/render-formatted-data.md) built-in Log Filter Plugin allows adding the `content-data-type` to the output
of Commands or Script steps.

Additional metadata can be passed to the Content Converter plugins. All log metadata entries with keys starting with `content-meta:` will be extracted from the
Log Event metadata, and the `content-meta:` prefix removed.

## Java Plugin Implementation

Implement [ContentConverterPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/logs/ContentConverterPlugin.html):

```java
public interface ContentConverterPlugin {
    boolean isSupportsDataType(Class<?> clazz, String dataType);
    Class<?> getOutputClassForDataType(Class<?> clazz, String dataType);
    String getOutputDataTypeForContentDataType(Class<?> clazz, String dataType);
    Object convert(Object data, String dataType, Map<String,String> metadata);
}
```

### Complete Example: JSON to HTML Table

```java
package com.example.rundeck.converter;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.logs.ContentConverterPlugin;
import com.fasterxml.jackson.databind.*;

@Plugin(name = "json-table", service = ServiceNameConstants.ContentConverter)
public class JsonTableConverter implements ContentConverterPlugin {
    
    @Override
    public boolean isSupportsDataType(Class<?> clazz, String dataType) {
        return String.class.isAssignableFrom(clazz) && 
               "application/json".equals(dataType);
    }
    
    @Override
    public Class<?> getOutputClassForDataType(Class<?> clazz, String dataType) {
        return String.class;  // Output is HTML string
    }
    
    @Override
    public String getOutputDataTypeForContentDataType(Class<?> clazz, String dataType) {
        return "text/html";  // Final output type
    }
    
    @Override
    public Object convert(Object data, String dataType, Map<String, String> metadata) {
        if (!(data instanceof String)) {
            return null;
        }
        
        try {
            String jsonStr = (String) data;
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonStr);
            
            return generateHtmlTable(root);
        } catch (Exception e) {
            return "<pre>Error parsing JSON: " + e.getMessage() + "</pre>";
        }
    }
    
    private String generateHtmlTable(JsonNode node) {
        if (node.isArray()) {
            return arrayToTable(node);
        } else if (node.isObject()) {
            return objectToTable(node);
        } else {
            return "<pre>" + node.asText() + "</pre>";
        }
    }
    
    private String arrayToTable(JsonNode array) {
        StringBuilder html = new StringBuilder();
        html.append("<table border='1' cellpadding='5' style='border-collapse: collapse;'>");
        
        // Header row from first element
        if (array.size() > 0 && array.get(0).isObject()) {
            html.append("<thead><tr>");
            Iterator<String> fieldNames = array.get(0).fieldNames();
            while (fieldNames.hasNext()) {
                html.append("<th>").append(fieldNames.next()).append("</th>");
            }
            html.append("</tr></thead>");
        }
        
        // Data rows
        html.append("<tbody>");
        for (JsonNode item : array) {
            html.append("<tr>");
            if (item.isObject()) {
                item.elements().forEachRemaining(value -> 
                    html.append("<td>").append(value.asText()).append("</td>")
                );
            } else {
                html.append("<td>").append(item.asText()).append("</td>");
            }
            html.append("</tr>");
        }
        html.append("</tbody></table>");
        
        return html.toString();
    }
    
    private String objectToTable(JsonNode obj) {
        StringBuilder html = new StringBuilder();
        html.append("<table border='1' cellpadding='5' style='border-collapse: collapse;'>");
        html.append("<tbody>");
        
        Iterator<Map.Entry<String, JsonNode>> fields = obj.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> entry = fields.next();
            html.append("<tr>");
            html.append("<th>").append(entry.getKey()).append("</th>");
            html.append("<td>").append(entry.getValue().asText()).append("</td>");
            html.append("</tr>");
        }
        
        html.append("</tbody></table>");
        return html.toString();
    }
}
```

### Groovy ContentConverter

Create a groovy script that calls the `rundeckPlugin` method and passes the `ContentConverterPlugin` as the type of plugin:

```java
import com.dtolabs.rundeck.plugins.logs.ContentConverterPlugin
rundeckPlugin(ContentConverterPlugin){
    //plugin definition
}
```

To define metadata about your plugin, see the [Plugin Development - Groovy Plugin Development](/developer/groovy-plugin-development.md) chapter.

The `ContentConverterPlugin` Groovy DSL supports defining conversions between data types.

Data types are represented with the `DataType` class (internal to the groovy plugin builder),
and can be created by calling the `dataType(Class,String)` method with a Java Class, and a data type string.

The built-in `convert(DataType input, Datatype output, Closure closure)` method allows you to define conversions from one
Data Type to another. Your closure will be called with the input data, and is expected to return the output data.
Returning `null` will simply skip the conversion.

#### convert declaration

Call `convert` using explicit data types and a closure to define the conversion:

```java
/**
 * Converts two data types
 */
convert(dataType(String,'application/x-my-data'), dataType(String,'text/html')) {
    //properties available via delegation:
    // data: the input data
    // metadata: input metadata map
    // dataType: input DataType

    //return type must match the output Java class in the DataType:
    return "hello ${data}, it seems you are ${metadata.mood?:'happy'}."
}
```

When the DataType uses a Java String as its class, you can omit calling `dataType`,
and simply pass the dataType string:

```java
/**
 * Called to convert two data types
 */
convert('application/x-my-data', 'text/html') {
	//data is a String, and we should return a String
	return '<b>'+data+' more data</b>'
}
```

And if you are going to return `text/html` the output declaration can be skipped:

```java
/**
 * Called to convert two data types
 */
convert('application/x-my-data') {
	//return type defaults to String and datatype 'text/html'
	return '<b>'+data+' more data</b>'
}
```

Since Rundeck will chain together up to two ContentConverters to render `text/html` for a given
input data type, you can define multiple conversion, if you want to use
an intermediate type.

```java
/**
 * Convert a string into an intermediate java type
 */
convert('application/x-my-data-type', dataType(SomeClass,'application/x-another-type')) {
	//use an intermediate object
	return new SomeClass(data)
}
/**
 * Expect the intermediate type as input, and default to HTML output
 */
convert(dataType(SomeClass,'application/x-another-type')) {
	//now `data` will be a SomeClass object
	return data.generateHtml()
}
```

## Localization

For the basics of plugin localization see: [Plugin Development - Plugin Localization](/developer/plugin-properties.md#plugin-localization).

## Example

Several built-in plugins are listed here:

- [`rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logs`](https://github.com/rundeck/rundeck/tree/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logs)

Several of the built-in rundeck plugins convert their input into a "Data Type" of: A Java List or Map object and type name of `application/x-java-map-or-list`. This "Data Type" can be rendered to HTML via the [HTMLTableViewConverterPlugin].

Your plugins can make use of this built-in plugin and therefore do not have to convert directly to HTML.
See the [JsonConverterPlugin] for an example.

[jsonconverterplugin]: https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logs/JsonConverterPlugin.groovy
[htmltableviewconverterplugin]: https://github.com/rundeck/rundeck/tree/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logs/HTMLTableViewConverterPlugin.groovy

## Example Groovy plugins

See <https://github.com/rundeck/rundeck/tree/master/examples/example-groovy-content-converter-plugins>.

[Plugin Development - Plugin Localization](/developer/plugin-properties.md#plugin-localization)

## Best Practices

### 1. Chain With Existing Converters

```groovy
// Convert to intermediate Java Map (others can render to HTML)
convert('application/x-mydata', dataType(Map, 'application/x-java-map-or-list')) {
    return parseToMap(data)  // Use built-in HTML renderer
}
```

### 2. Handle Errors Gracefully

```java
try {
    return generateHtml(data);
} catch (Exception e) {
    return "<pre class='error'>Error rendering: " + escape(e.getMessage()) + "</pre>";
}
```

### 3. Escape HTML

```java
private String escapeHtml(String text) {
    return text.replace("&", "&amp;")
              .replace("<", "&lt;")
              .replace(">", "&gt;");
}
```

## Related Documentation

- [Log Filter Plugins](/developer/log-filter-plugins.md) - Add content-data-type metadata
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md) - Built-in log filter
- [Java Plugin Development](/developer/java-plugin-development.md) - General guide
