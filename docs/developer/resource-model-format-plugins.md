# Node Format Plugins
## (Resource Model Format Plugins)

## Overview

**Node Format plugins** (also called "Resource Format" or "Resource Model Format" plugins in the API) parse and generate node data in different file formats. They enable Rundeck to read nodes from various formats (JSON, XML, CSV, custom formats) and export nodes to those same formats.

::: tip Terminology Note
In the Rundeck API these are called "ResourceFormatParser" and "ResourceFormatGenerator," but we refer to them as "Node Format" plugins since they deal with node data. They're companion plugins to [Node Source plugins](/developer/resource-model-source-plugins.md).
:::

**What Do They Do?**

- **Parser** - Converts text format (JSON, XML, YAML, CSV, etc.) **into** Rundeck nodes
- **Generator** - Converts Rundeck nodes **into** text format for export/storage

**Why Are They Separate from Node Sources?**

[Node Source plugins](/developer/resource-model-source-plugins.md) fetch node data from external systems. Format plugins handle the parsing/generation of that data regardless of where it came from:

```
Node Source Plugin          Format Plugin           Rundeck
     ↓                           ↓                    ↓
Fetch from API  →  Returns JSON  →  JSON Parser  →  Node Objects
Fetch from File →  Returns YAML  →  YAML Parser  →  Node Objects
Fetch from DB   →  Returns XML   →  XML Parser   →  Node Objects
```

This separation means:
- Node sources don't need to know about formats
- Formats can be reused across sources
- Custom formats work with any source

**Common Use Cases:**

**Built-in Formats (Usually Sufficient):**
- `resourceyaml` - YAML format (most common)
- `resourcejson` - JSON format
- `resourcexml` - XML format

**Create Custom Format When:**
- **Legacy System** - Proprietary format you can't change
- **Special Requirements** - Complex nested structures, binary formats
- **Integration** - Format used by existing tools
- **Custom CSV** - Non-standard CSV layout

**Real-World Examples:**
- **Network Device CSV** - Parse vendor-specific CSV export format
- **CMDB XML** - Parse proprietary CMDB XML schema
- **Monitoring Tool JSON** - Parse custom JSON from monitoring system
- **Excel Spreadsheet** - Parse converted CSV from Excel with specific columns
- **INI File Format** - Parse legacy INI configuration files

## When to Create Format Plugins

### Built-in Formats Cover Most Needs

Rundeck includes parsers/generators for:
- **YAML** (`resourceyaml`) - Most common, human-readable
- **JSON** (`resourcejson`) - API integrations
- **XML** (`resourcexml`) - Legacy systems

**Check first** if existing formats work for your use case.

### Create Custom Format When:

**✅ Proprietary Format**
- Vendor-specific format you can't change
- Legacy system with unique structure
- Internal format used by other tools

**✅ Special Requirements**
- Complex nested structures
- Custom field mapping
- Conditional logic during parsing
- Data validation/transformation

**✅ Integration Needs**
- Existing tools output specific format
- Must match external schema
- Binary or compressed formats

### Don't Create Format Plugin When:

**❌ Simple Transformation**

Use a script to convert to YAML/JSON first, then use built-in parsers.

**❌ Standard Formats**

If it's standard JSON/XML/YAML, use built-in parsers.

## Java Plugin Implementation

### Parser Interface

Parsers convert text data into Rundeck nodes.

Implement [ResourceFormatParser]({{$javaDocBase}}/com/dtolabs/rundeck/core/resources/format/ResourceFormatParser.html):

```java
public interface ResourceFormatParser {
    Set<String> getFileExtensions();  // e.g., ["csv", "txt"]
    Set<String> getMIMETypes();       // e.g., ["text/csv"]
    INodeSet parseDocument(File file) throws ResourceFormatParserException;
    INodeSet parseDocument(InputStream input) throws ResourceFormatParserException;
}
```

### Complete Parser Example: CSV Format

Parse custom CSV format into nodes:

```java
package com.example.rundeck.format;

import com.dtolabs.rundeck.core.common.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.resources.format.*;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;

import java.io.*;
import java.util.*;

@Plugin(name = "csv-nodes", service = ServiceNameConstants.ResourceFormatParser)
public class CsvNodeFormatParser implements ResourceFormatParser {
    
    @Override
    public Set<String> getFileExtensions() {
        return Collections.singleton("csv");
    }
    
    @Override
    public Set<String> getMIMETypes() {
        return new HashSet<>(Arrays.asList("text/csv", "text/comma-separated-values"));
    }
    
    @Override
    public INodeSet parseDocument(File file) throws ResourceFormatParserException {
        try (FileInputStream fis = new FileInputStream(file)) {
            return parseDocument(fis);
        } catch (IOException e) {
            throw new ResourceFormatParserException(
                "Error reading file: " + e.getMessage(), e);
        }
    }
    
    @Override
    public INodeSet parseDocument(InputStream input) throws ResourceFormatParserException {
        NodeSetImpl nodeSet = new NodeSetImpl();
        
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {
            String line;
            boolean firstLine = true;
            int lineNum = 0;
            
            while ((line = reader.readLine()) != null) {
                lineNum++;
                line = line.trim();
                
                // Skip empty lines
                if (line.isEmpty()) {
                    continue;
                }
                
                // Skip header line
                if (firstLine) {
                    firstLine = false;
                    // Optionally validate header
                    if (!line.startsWith("nodename,hostname")) {
                        throw new ResourceFormatParserException(
                            "Invalid CSV header. Expected: nodename,hostname,username,...");
                    }
                    continue;
                }
                
                try {
                    INodeEntry node = parseLine(line, lineNum);
                    nodeSet.putNode(node);
                } catch (Exception e) {
                    throw new ResourceFormatParserException(
                        "Error parsing line " + lineNum + ": " + e.getMessage(), e);
                }
            }
            
        } catch (IOException e) {
            throw new ResourceFormatParserException(
                "Error reading input: " + e.getMessage(), e);
        }
        
        return nodeSet;
    }
    
    private INodeEntry parseLine(String line, int lineNum) throws ResourceFormatParserException {
        // Parse CSV line (simple split - use CSV library for production)
        String[] parts = line.split(",", -1);  // -1 keeps empty trailing fields
        
        if (parts.length < 2) {
            throw new ResourceFormatParserException(
                "Line " + lineNum + ": Expected at least 2 fields (nodename,hostname)");
        }
        
        NodeEntryImpl node = new NodeEntryImpl();
        
        // Required fields
        String nodename = parts[0].trim();
        String hostname = parts[1].trim();
        
        if (nodename.isEmpty()) {
            throw new ResourceFormatParserException(
                "Line " + lineNum + ": nodename cannot be empty");
        }
        if (hostname.isEmpty()) {
            throw new ResourceFormatParserException(
                "Line " + lineNum + ": hostname cannot be empty");
        }
        
        node.setNodename(nodename);
        node.setHostname(hostname);
        
        // Optional fields (with safe indexing)
        if (parts.length > 2 && !parts[2].trim().isEmpty()) {
            node.setUsername(parts[2].trim());
        }
        
        if (parts.length > 3 && !parts[3].trim().isEmpty()) {
            node.setOsFamily(parts[3].trim());
        }
        
        if (parts.length > 4 && !parts[4].trim().isEmpty()) {
            node.setDescription(parts[4].trim());
        }
        
        // Tags (semicolon-separated in column 6)
        if (parts.length > 5 && !parts[5].trim().isEmpty()) {
            String[] tags = parts[5].split(";");
            Set<String> tagSet = new HashSet<>();
            for (String tag : tags) {
                String trimmed = tag.trim();
                if (!trimmed.isEmpty()) {
                    tagSet.add(trimmed);
                }
            }
            node.setTags(tagSet);
        }
        
        // Custom attributes (key=value pairs in column 7, pipe-separated)
        if (parts.length > 6 && !parts[6].trim().isEmpty()) {
            Map<String, String> attributes = new HashMap<>();
            String[] attrs = parts[6].split("\\|");
            for (String attr : attrs) {
                String[] kv = attr.split("=", 2);
                if (kv.length == 2) {
                    attributes.put(kv[0].trim(), kv[1].trim());
                }
            }
            node.setAttributes(attributes);
        }
        
        return node;
    }
}
```

**Expected CSV Format:**

```csv
nodename,hostname,username,osFamily,description,tags,attributes
web01,web01.example.com,ubuntu,Linux,Web server 1,web;prod;frontend,environment=prod|app=ecommerce
web02,web02.example.com,ubuntu,Linux,Web server 2,web;prod;frontend,environment=prod|app=ecommerce
db01,db01.example.com,postgres,Linux,Database primary,database;prod,environment=prod|role=primary
```

### Generator Interface

Generators convert Rundeck nodes into text format.

Implement [ResourceFormatGenerator]({{$javaDocBase}}/com/dtolabs/rundeck/core/resources/format/ResourceFormatGenerator.html):

```java
public interface ResourceFormatGenerator {
    Set<String> getFileExtensions();
    List<String> getMIMETypes();  // First is default
    void generateDocument(INodeSet nodeset, OutputStream stream)
        throws ResourceFormatGeneratorException, IOException;
}
```

### Complete Generator Example: CSV Format

Generate CSV from nodes:

```java
package com.example.rundeck.format;

import com.dtolabs.rundeck.core.common.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.resources.format.*;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Plugin(name = "csv-nodes", service = ServiceNameConstants.ResourceFormatGenerator)
public class CsvNodeFormatGenerator implements ResourceFormatGenerator {
    
    @Override
    public Set<String> getFileExtensions() {
        return Collections.singleton("csv");
    }
    
    @Override
    public List<String> getMIMETypes() {
        // First one is default
        return Arrays.asList("text/csv", "text/comma-separated-values");
    }
    
    @Override
    public void generateDocument(INodeSet nodeset, OutputStream stream)
            throws ResourceFormatGeneratorException, IOException {
        
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stream))) {
            // Write header
            writer.write("nodename,hostname,username,osFamily,description,tags,attributes");
            writer.newLine();
            
            // Write each node
            for (String nodename : nodeset.getNodeNames()) {
                INodeEntry node = nodeset.getNode(nodename);
                writeNode(node, writer);
            }
            
            writer.flush();
        }
    }
    
    private void writeNode(INodeEntry node, BufferedWriter writer) throws IOException {
        // Build CSV line
        List<String> fields = new ArrayList<>();
        
        // Required fields
        fields.add(escapeCsv(node.getNodename()));
        fields.add(escapeCsv(node.getHostname()));
        
        // Optional fields (use empty string if null)
        fields.add(escapeCsv(node.getUsername()));
        fields.add(escapeCsv(node.getOsFamily()));
        fields.add(escapeCsv(node.getDescription()));
        
        // Tags (semicolon-separated)
        Set<String> tags = node.getTags();
        if (tags != null && !tags.isEmpty()) {
            String tagsStr = tags.stream()
                .sorted()
                .collect(Collectors.joining(";"));
            fields.add(escapeCsv(tagsStr));
        } else {
            fields.add("");
        }
        
        // Attributes (pipe-separated key=value pairs)
        Map<String, String> attributes = node.getAttributes();
        if (attributes != null && !attributes.isEmpty()) {
            String attrsStr = attributes.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> e.getKey() + "=" + e.getValue())
                .collect(Collectors.joining("|"));
            fields.add(escapeCsv(attrsStr));
        } else {
            fields.add("");
        }
        
        // Write line
        writer.write(String.join(",", fields));
        writer.newLine();
    }
    
    private String escapeCsv(String value) {
        if (value == null) {
            return "";
        }
        
        // Escape if contains comma, quote, or newline
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            // Quote and escape internal quotes
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        
        return value;
    }
}
```

**Generated CSV Output:**

```csv
nodename,hostname,username,osFamily,description,tags,attributes
db01,db01.example.com,postgres,Linux,Database primary,database;prod,environment=prod|role=primary
web01,web01.example.com,ubuntu,Linux,Web server 1,frontend;prod;web,app=ecommerce|environment=prod
web02,web02.example.com,ubuntu,Linux,Web server 2,frontend;prod;web,app=ecommerce|environment=prod
```

## Best Practices

### 1. Handle Malformed Input Gracefully

```java
@Override
public INodeSet parseDocument(InputStream input) throws ResourceFormatParserException {
    NodeSetImpl nodeSet = new NodeSetImpl();
    
    try {
        // Parse input
        for (String line : readLines(input)) {
            try {
                INodeEntry node = parseLine(line);
                nodeSet.putNode(node);
            } catch (Exception e) {
                // Log error but continue with other nodes
                System.err.println("Error parsing line '" + line + "': " + e.getMessage());
            }
        }
    } catch (Exception e) {
        throw new ResourceFormatParserException("Parse error: " + e.getMessage(), e);
    }
    
    return nodeSet;
}
```

### 2. Validate Required Fields

```java
private INodeEntry parseLine(String data) throws ResourceFormatParserException {
    JsonNode node = parseJson(data);
    
    // Validate required fields
    if (!node.has("nodename") || node.get("nodename").asText().isEmpty()) {
        throw new ResourceFormatParserException("Missing required field: nodename");
    }
    
    if (!node.has("hostname") || node.get("hostname").asText().isEmpty()) {
        throw new ResourceFormatParserException("Missing required field: hostname");
    }
    
    // Create node...
}
```

### 3. Use Standard Libraries

```java
// Bad - manual CSV parsing is error-prone
String[] parts = line.split(",");

// Good - use Apache Commons CSV or OpenCSV
CSVParser parser = CSVParser.parse(input, StandardCharsets.UTF_8, CSVFormat.DEFAULT);
for (CSVRecord record : parser) {
    // Reliable parsing with proper escaping
}
```

### 4. Declare Correct MIME Types

```java
@Override
public Set<String> getMIMETypes() {
    return new HashSet<>(Arrays.asList(
        "text/csv",                      // Primary
        "text/comma-separated-values",   // Alternative
        "application/csv"                // Common variant
    ));
}
```

### 5. Handle Character Encoding

```java
@Override
public INodeSet parseDocument(InputStream input) throws ResourceFormatParserException {
    // Explicitly specify UTF-8 encoding
    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(input, StandardCharsets.UTF_8))) {
        // Parse...
    }
}
```

## Related Documentation

- [Node Source Plugins](/developer/resource-model-source-plugins.md) - Fetch nodes from external systems
- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Node Management](/manual/05-nodes.md) - Using nodes in Rundeck

## Quick Reference

### Common File Extensions

| Extension | Format | Common Use |
|-----------|--------|------------|
| `.yaml`, `.yml` | YAML | Human-readable, most common |
| `.json` | JSON | API responses, JavaScript |
| `.xml` | XML | Legacy systems, SOAP APIs |
| `.csv` | CSV | Spreadsheets, databases |
| `.properties` | Properties | Java configuration |
| `.ini` | INI | Legacy config files |

### Common MIME Types

| MIME Type | Format |
|-----------|--------|
| `text/yaml`, `application/yaml` | YAML |
| `application/json` | JSON |
| `text/xml`, `application/xml` | XML |
| `text/csv` | CSV |
| `text/plain` | Plain text |

### Built-in Formats

Rundeck includes these formats out-of-the-box:

| Format Name | Extensions | Description |
|-------------|------------|-------------|
| `resourceyaml` | `.yaml`, `.yml` | YAML format (recommended) |
| `resourcejson` | `.json` | JSON format |
| `resourcexml` | `.xml` | XML format |
