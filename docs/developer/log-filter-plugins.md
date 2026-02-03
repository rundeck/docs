# Log Filter Plugins

## Overview

Log Filter plugins process and transform logging output from commands, scripts, and other workflow steps in real-time. They're one of the most powerful plugin types in Rundeck, enabling you to:

**Transform Logs:**
- Mask sensitive data (passwords, API keys, tokens)
- Format or colorize output
- Add context and metadata
- Convert between formats (JSON, XML, etc.)

**Extract Data:**
- Capture specific values from output
- Parse structured data (JSON, XML, CSV)
- Extract metrics and statistics
- Store data as job variables

**Control Output:**
- Filter noise (suppress verbose logs)
- Highlight errors and warnings
- Quiet successful operations
- Remove or modify specific log lines

**Common Use Cases:**
- **Security** - Mask credentials in logs before they're stored
- **Monitoring** - Extract metrics and send to monitoring systems
- **Data Flow** - Capture command output as variables for later steps
- **Compliance** - Redact PII or sensitive information
- **Integration** - Parse API responses and extract relevant data
- **Debugging** - Add context or highlight specific patterns

**Real-World Examples:**
- Mask database passwords in SQL command output
- Extract deployment IDs from CI/CD tool responses
- Capture test results and pass/fail counts
- Highlight errors in red while suppressing debug output
- Extract JSON fields from API responses into job options

Log Filter plugins implement the [LogFilterPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/logging/LogFilterPlugin.html) interface and provide the `LogFilter` service.

## How Log Filters Work

### Execution Flow

1. **Configuration** - User adds log filter to workflow or specific step
2. **Initialization** - `init()` method called when workflow/step starts
3. **Event Processing** - For each log line:
   - `handleEvent()` called with log event
   - Filter can view/modify/control the event
   - Returns control decision (emit, quell, quiet, remove)
4. **Completion** - `complete()` method called when workflow/step finishes

### Processing Pipeline

```
Command Output → Log Event → Log Filter 1 → Log Filter 2 → ... → Final Output
                              ↓ modify         ↓ modify           ↓
                              ↓ metadata       ↓ suppress         ↓
                              ↓ capture        ↓ highlight        ↓ stored logs
```

Multiple log filters can be chained together, processing events in order.

### Configuration Levels

Log filters can be applied at two levels:

**1. Workflow Level (Global)**

Applies to ALL steps in the workflow:

```
Workflow
├── Log Filter: Mask Passwords    ← Applies to all steps
├── Step 1: Database Query
│   └── Output filtered
├── Step 2: API Call
│   └── Output filtered  
└── Step 3: File Copy
    └── Output filtered
```

**Example:** Security log filter that masks credentials across all operations.

**2. Step Level (Local)**

Applies only to specific step(s):

```
Workflow
├── Step 1: Database Query
│   ├── Log Filter: Mask SQL Passwords    ← Only this step
│   └── Output filtered
├── Step 2: API Call
│   ├── Log Filter: Extract JSON Response  ← Only this step
│   └── Output filtered and data captured
└── Step 3: File Copy
    └── Output NOT filtered (no filter configured)
```

**Example:** Data extraction filter only on API steps that return JSON.

### Multiple Filters (Chaining)

When multiple filters are configured, they process events in order:

```
Log Event: "API response: {token: 'secret123'}"
    ↓
Filter 1 (Mask Tokens): "API response: {token: '****'}"
    ↓
Filter 2 (Highlight API): "API response: {token: '****'}"  ← colored/formatted
    ↓
Final Output
```

Each filter receives the event as modified by previous filters.

## Java Plugin Implementation

::: tip
Refer to [Java Plugin Development](/developer/java-plugin-development.md) for general information about developing Java plugins for Rundeck.
:::

### Plugin Interface

Implement the [LogFilterPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/logging/LogFilterPlugin.html) interface:

```java
public interface LogFilterPlugin {
    void init(PluginLoggingContext context, Map<String, String> config);
    void handleEvent(PluginLoggingContext context, LogEventControl event);
    void complete(PluginLoggingContext context);
}
```

### Key Components

**[PluginLoggingContext]({{$javaDocBase}}/com/dtolabs/rundeck/core/logging/PluginLoggingContext.html)**
- Access to data context (job variables, node attributes, etc.)
- Output context for capturing data
- Logger for plugin logging

**[LogEventControl]({{$javaDocBase}}/com/dtolabs/rundeck/core/logging/LogEventControl.html)**
- Get/modify the [LogEvent]({{$javaDocBase}}/com/dtolabs/rundeck/core/logging/LogEvent.html) (message, type, level, metadata)
- Control event handling:
  - `emit()` - Log should be emitted to output (default)
  - `quell()` - Log processed but not emitted in final output
  - `quiet()` - Final log level set to VERBOSE (suppressed unless verbose mode)
  - `remove()` - Log event discarded, not processed further

### Basic Structure

```java
import com.dtolabs.rundeck.core.logging.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin;

import java.util.Map;
import java.util.regex.Pattern;

@Plugin(name = "my-log-filter", service = ServiceNameConstants.LogFilter)
@PluginDescription(
    title = "My Log Filter",
    description = "Filters and processes log output"
)
public class MyLogFilter implements LogFilterPlugin {
    
    @PluginProperty(
        title = "Pattern",
        description = "Pattern to match in log lines",
        required = true
    )
    private String pattern;
    
    private Pattern compiledPattern;
    
    @Override
    public void init(PluginLoggingContext context, Map<String, String> config) {
        // Initialize plugin - compile patterns, setup state, etc.
        this.compiledPattern = Pattern.compile(pattern);
        context.log(2, "MyLogFilter initialized with pattern: " + pattern);
    }
    
    @Override
    public void handleEvent(PluginLoggingContext context, LogEventControl event) {
        // Process each log event
        String message = event.getMessage();
        
        if (compiledPattern.matcher(message).find()) {
            // Match found - do something
            event.setMessage("[MATCHED] " + message);
        }
    }
    
    @Override
    public void complete(PluginLoggingContext context) {
        // Cleanup and final processing
        context.log(2, "MyLogFilter completed");
    }
}
```

### Complete Example: Mask Sensitive Data

This filter masks passwords and API keys in log output:

```java
package com.example.rundeck.filters;

import com.dtolabs.rundeck.core.logging.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin;

import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Plugin(name = "mask-passwords", service = ServiceNameConstants.LogFilter)
@PluginDescription(
    title = "Mask Passwords",
    description = "Masks passwords, tokens, and sensitive data in log output using regex patterns"
)
public class MaskPasswordsFilter implements LogFilterPlugin {
    
    @PluginProperty(
        title = "Patterns",
        description = "Regex patterns to match (one per line). Capturing groups will be masked.",
        required = false,
        defaultValue = "password[=:]\\s*([^\\s]+)\ntoken[=:]\\s*([^\\s]+)\napikey[=:]\\s*([^\\s]+)"
    )
    @RenderingOption(key = "displayType", value = "MULTI_LINE")
    private String patterns;
    
    @PluginProperty(
        title = "Replacement",
        description = "Replacement text for masked values",
        required = false,
        defaultValue = "****"
    )
    private String replacement;
    
    @PluginProperty(
        title = "Case Insensitive",
        description = "Perform case-insensitive matching",
        required = false,
        defaultValue = "true"
    )
    private Boolean caseInsensitive;
    
    private List<Pattern> compiledPatterns;
    private int maskedCount = 0;
    
    @Override
    public void init(PluginLoggingContext context, Map<String, String> config) {
        compiledPatterns = new ArrayList<>();
        
        if (patterns != null && !patterns.trim().isEmpty()) {
            String[] lines = patterns.split("\\n");
            int flags = (caseInsensitive != null && caseInsensitive) 
                ? Pattern.CASE_INSENSITIVE 
                : 0;
            
            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty()) {
                    try {
                        compiledPatterns.add(Pattern.compile(line, flags));
                        context.log(2, "Loaded mask pattern: " + line);
                    } catch (Exception e) {
                        context.log(0, "Invalid pattern: " + line + " - " + e.getMessage());
                    }
                }
            }
        }
        
        context.log(2, "Mask Passwords filter initialized with " + 
                    compiledPatterns.size() + " patterns");
    }
    
    @Override
    public void handleEvent(PluginLoggingContext context, LogEventControl event) {
        String message = event.getMessage();
        String originalMessage = message;
        
        // Apply each pattern
        for (Pattern pattern : compiledPatterns) {
            Matcher matcher = pattern.matcher(message);
            StringBuffer sb = new StringBuffer();
            
            while (matcher.find()) {
                // Mask each capturing group
                StringBuilder masked = new StringBuilder();
                masked.append(matcher.group(0));
                
                for (int i = 1; i <= matcher.groupCount(); i++) {
                    String group = matcher.group(i);
                    if (group != null) {
                        String escapedReplacement = Matcher.quoteReplacement(replacement);
                        masked = new StringBuilder(masked.toString().replace(group, escapedReplacement));
                    }
                }
                
                matcher.appendReplacement(sb, Matcher.quoteReplacement(masked.toString()));
                maskedCount++;
            }
            
            matcher.appendTail(sb);
            message = sb.toString();
        }
        
        // Update message if it changed
        if (!message.equals(originalMessage)) {
            event.setMessage(message);
        }
    }
    
    @Override
    public void complete(PluginLoggingContext context) {
        if (maskedCount > 0) {
            context.log(2, "Masked " + maskedCount + " sensitive values");
        }
    }
}
```

### Complete Example: Extract JSON Data

This filter extracts values from JSON output and stores them as job variables:

```java
package com.example.rundeck.filters;

import com.dtolabs.rundeck.core.logging.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

@Plugin(name = "json-extractor", service = ServiceNameConstants.LogFilter)
@PluginDescription(
    title = "JSON Data Extractor",
    description = "Extracts values from JSON output and stores them as job variables"
)
public class JsonExtractorFilter implements LogFilterPlugin {
    
    @PluginProperty(
        title = "JSON Fields",
        description = "JSON paths to extract (e.g., 'deployment.id', 'status', 'version'). One per line.",
        required = true
    )
    @RenderingOption(key = "displayType", value = "MULTI_LINE")
    private String fields;
    
    @PluginProperty(
        title = "Variable Prefix",
        description = "Prefix for exported variables (e.g., 'data' creates 'data.deployment.id')",
        required = false,
        defaultValue = "result"
    )
    private String variablePrefix;
    
    @PluginProperty(
        title = "Log Extracted Values",
        description = "Log extracted values to output",
        required = false,
        defaultValue = "true"
    )
    private Boolean logValues;
    
    private List<String> fieldPaths;
    private ObjectMapper objectMapper;
    private Map<String, String> extractedData;
    
    @Override
    public void init(PluginLoggingContext context, Map<String, String> config) {
        objectMapper = new ObjectMapper();
        extractedData = new HashMap<>();
        fieldPaths = new ArrayList<>();
        
        if (fields != null && !fields.trim().isEmpty()) {
            String[] lines = fields.split("\\n");
            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty()) {
                    fieldPaths.add(line);
                }
            }
        }
        
        context.log(2, "JSON Extractor initialized for fields: " + fieldPaths);
    }
    
    @Override
    public void handleEvent(PluginLoggingContext context, LogEventControl event) {
        String message = event.getMessage().trim();
        
        // Try to parse as JSON
        if ((message.startsWith("{") || message.startsWith("["))) {
            try {
                JsonNode root = objectMapper.readTree(message);
                
                // Extract each field
                for (String fieldPath : fieldPaths) {
                    String value = extractJsonValue(root, fieldPath);
                    if (value != null) {
                        String varName = variablePrefix + "." + fieldPath;
                        extractedData.put(varName, value);
                        
                        // Add to data context
                        Map<String, String> newData = new HashMap<>();
                        newData.put(varName, value);
                        context.getOutputContext().addOutput("data", newData);
                        
                        if (logValues != null && logValues) {
                            context.log(2, "Extracted " + varName + " = " + value);
                        }
                    }
                }
            } catch (Exception e) {
                // Not JSON or parse error - ignore
            }
        }
    }
    
    private String extractJsonValue(JsonNode root, String path) {
        String[] parts = path.split("\\.");
        JsonNode current = root;
        
        for (String part : parts) {
            if (current == null) {
                return null;
            }
            current = current.get(part);
        }
        
        return (current != null && !current.isNull()) ? current.asText() : null;
    }
    
    @Override
    public void complete(PluginLoggingContext context) {
        if (!extractedData.isEmpty()) {
            context.log(2, "JSON Extractor captured " + extractedData.size() + " values");
            
            if (logValues != null && logValues) {
                context.log(2, "Captured data: " + extractedData);
            }
        }
    }
}
```

### Complete Example: Highlight Errors

This filter highlights error lines in red and suppresses verbose output:

```java
package com.example.rundeck.filters;

import com.dtolabs.rundeck.core.logging.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin;

import java.util.*;
import java.util.regex.Pattern;

@Plugin(name = "highlight-errors", service = ServiceNameConstants.LogFilter)
@PluginDescription(
    title = "Highlight Errors",
    description = "Highlights errors in red and optionally suppresses verbose output"
)
public class HighlightErrorsFilter implements LogFilterPlugin {
    
    @PluginProperty(
        title = "Error Patterns",
        description = "Patterns that indicate errors (one per line)",
        required = false,
        defaultValue = "ERROR\nFAILED\nException\nfatal"
    )
    @RenderingOption(key = "displayType", value = "MULTI_LINE")
    private String errorPatterns;
    
    @PluginProperty(
        title = "Warning Patterns",
        description = "Patterns that indicate warnings (one per line)",
        required = false,
        defaultValue = "WARN\nWARNING"
    )
    @RenderingOption(key = "displayType", value = "MULTI_LINE")
    private String warningPatterns;
    
    @PluginProperty(
        title = "Suppress Debug",
        description = "Suppress debug/verbose output",
        required = false,
        defaultValue = "false"
    )
    private Boolean suppressDebug;
    
    private List<Pattern> errorRegexes;
    private List<Pattern> warningRegexes;
    private Pattern debugPattern;
    
    @Override
    public void init(PluginLoggingContext context, Map<String, String> config) {
        errorRegexes = compilePatterns(errorPatterns);
        warningRegexes = compilePatterns(warningPatterns);
        
        if (suppressDebug != null && suppressDebug) {
            debugPattern = Pattern.compile("^(DEBUG|TRACE|VERBOSE):", Pattern.CASE_INSENSITIVE);
        }
        
        context.log(2, "Highlight Errors filter initialized");
    }
    
    private List<Pattern> compilePatterns(String patterns) {
        List<Pattern> compiled = new ArrayList<>();
        if (patterns != null && !patterns.trim().isEmpty()) {
            for (String line : patterns.split("\\n")) {
                line = line.trim();
                if (!line.isEmpty()) {
                    compiled.add(Pattern.compile(line, Pattern.CASE_INSENSITIVE));
                }
            }
        }
        return compiled;
    }
    
    @Override
    public void handleEvent(PluginLoggingContext context, LogEventControl event) {
        String message = event.getMessage();
        
        // Check for errors
        for (Pattern pattern : errorRegexes) {
            if (pattern.matcher(message).find()) {
                // Add error metadata (can be used for highlighting in UI)
                Map<String, String> meta = new HashMap<>();
                meta.put("content-data-type", "text/html");
                meta.put("color", "red");
                event.addEventMeta(meta);
                event.setMessage("<span style='color: red; font-weight: bold;'>" + 
                               escapeHtml(message) + "</span>");
                return;
            }
        }
        
        // Check for warnings
        for (Pattern pattern : warningRegexes) {
            if (pattern.matcher(message).find()) {
                Map<String, String> meta = new HashMap<>();
                meta.put("color", "orange");
                event.addEventMeta(meta);
                event.setMessage("<span style='color: orange;'>" + 
                               escapeHtml(message) + "</span>");
                return;
            }
        }
        
        // Suppress debug lines
        if (debugPattern != null && debugPattern.matcher(message).find()) {
            event.quiet();  // Set to VERBOSE level (only shown in verbose mode)
        }
    }
    
    private String escapeHtml(String text) {
        return text.replace("&", "&amp;")
                  .replace("<", "&lt;")
                  .replace(">", "&gt;")
                  .replace("\"", "&quot;")
                  .replace("'", "&#39;");
    }
    
    @Override
    public void complete(PluginLoggingContext context) {
        // Nothing to do on completion
    }
}
```

## Groovy Plugin Implementation

Groovy plugins provide a more concise DSL for log filters.

### Basic Structure

```groovy
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin

rundeckPlugin(LogFilterPlugin) {
    title = "My Groovy Log Filter"
    description = "Filters logs using Groovy"
    
    configuration {
        pattern title: "Pattern", description: "Pattern to match", required: true
    }
    
    init { PluginLoggingContext context, Map config ->
        // Initialize plugin
    }
    
    handleEvent { PluginLoggingContext context, LogEventControl event, Map config ->
        // Process each log event
    }
    
    complete { PluginLoggingContext context, Map config ->
        // Cleanup and finalize
    }
}
```

### Closure Methods

**`init` (optional)**
- Called once when workflow/step starts
- Use for initialization, compiling patterns, setting up state

**`handleEvent` (required)**
- Called for every log event
- Parameters:
  - `context` - [PluginLoggingContext]({{$javaDocBase}}/com/dtolabs/rundeck/core/logging/PluginLoggingContext.html)
  - `event` - [LogEventControl]({{$javaDocBase}}/com/dtolabs/rundeck/core/logging/LogEventControl.html)
  - `config` - Configuration map

**`complete` (optional)**
- Called once when workflow/step completes
- Use for final processing, logging summaries, cleanup

### Complete Example: Mask Passwords (Groovy)

```groovy
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin
import java.util.regex.Pattern

rundeckPlugin(LogFilterPlugin) {
    title = "Mask Passwords (Groovy)"
    description = "Masks passwords and sensitive data in log output"
    
    configuration {
        patterns(
            title: "Patterns",
            description: "Regex patterns to match (one per line)",
            defaultValue: "password[=:]\\s*([^\\s]+)\ntoken[=:]\\s*([^\\s]+)",
            required: false,
            renderingOptions: [
                displayType: "MULTI_LINE"
            ]
        )
        
        replacement(
            title: "Replacement",
            description: "Replacement text",
            defaultValue: "****",
            required: false
        )
    }
    
    def compiledPatterns = []
    def maskedCount = 0
    
    init { context, config ->
        def patternText = config.patterns
        if (patternText) {
            patternText.split('\n').each { line ->
                line = line.trim()
                if (line) {
                    try {
                        compiledPatterns << Pattern.compile(line, Pattern.CASE_INSENSITIVE)
                        context.log(2, "Loaded pattern: ${line}")
                    } catch (Exception e) {
                        context.log(0, "Invalid pattern: ${line}")
                    }
                }
            }
        }
        context.log(2, "Mask Passwords initialized with ${compiledPatterns.size()} patterns")
    }
    
    handleEvent { context, event, config ->
        def message = event.message
        def originalMessage = message
        def replacement = config.replacement ?: '****'
        
        compiledPatterns.each { pattern ->
            def matcher = pattern.matcher(message)
            def sb = new StringBuffer()
            
            while (matcher.find()) {
                def masked = matcher.group(0)
                for (int i = 1; i <= matcher.groupCount(); i++) {
                    def group = matcher.group(i)
                    if (group) {
                        masked = masked.replace(group, replacement)
                    }
                }
                matcher.appendReplacement(sb, java.util.regex.Matcher.quoteReplacement(masked))
                maskedCount++
            }
            matcher.appendTail(sb)
            message = sb.toString()
        }
        
        if (message != originalMessage) {
            event.message = message
        }
    }
    
    complete { context, config ->
        if (maskedCount > 0) {
            context.log(2, "Masked ${maskedCount} sensitive values")
        }
    }
}
```

### Complete Example: Count Lines (Groovy)

```groovy
import com.dtolabs.rundeck.plugins.logging.LogFilterPlugin

rundeckPlugin(LogFilterPlugin) {
    title = "Line Counter"
    description = "Counts log lines and reports statistics"
    
    configuration {
        showStats(
            title: "Show Statistics",
            description: "Log final statistics",
            type: "Boolean",
            defaultValue: "true",
            required: false
        )
        
        errorPattern(
            title: "Error Pattern",
            description: "Pattern for error lines",
            defaultValue: "(?i)(error|failed|exception)",
            required: false
        )
    }
    
    def totalLines = 0
    def errorLines = 0
    def warningLines = 0
    def errorPattern = null
    def warningPattern = ~/(?i)(warn|warning)/
    
    init { context, config ->
        if (config.errorPattern) {
            errorPattern = ~/${config.errorPattern}/
        }
        context.log(2, "Line Counter initialized")
    }
    
    handleEvent { context, event, config ->
        def message = event.message
        totalLines++
        
        if (errorPattern && message =~ errorPattern) {
            errorLines++
        } else if (message =~ warningPattern) {
            warningLines++
        }
    }
    
    complete { context, config ->
        if (config.showStats == 'true') {
            context.log(2, "=== Log Statistics ===")
            context.log(2, "Total lines: ${totalLines}")
            context.log(2, "Error lines: ${errorLines}")
            context.log(2, "Warning lines: ${warningLines}")
            context.log(2, "Info lines: ${totalLines - errorLines - warningLines}")
            
            if (errorLines > 0) {
                def errorPercent = (errorLines * 100.0 / totalLines).round(2)
                context.log(2, "Error rate: ${errorPercent}%")
            }
        }
    }
}
```

For more details on Groovy plugins, see [Groovy Plugin Development](/developer/groovy-plugin-development.md).

## Best Practices

### 1. Compile Patterns in init()

**Bad:**
```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    Pattern pattern = Pattern.compile(patternString);  // Compiles on every event!
    Matcher matcher = pattern.matcher(event.getMessage());
    // ...
}
```

**Good:**
```java
private Pattern compiledPattern;

@Override
public void init(PluginLoggingContext context, Map<String, String> config) {
    this.compiledPattern = Pattern.compile(patternString);  // Compile once
}

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    Matcher matcher = compiledPattern.matcher(event.getMessage());  // Reuse
    // ...
}
```

### 2. Avoid Heavy Processing

Log filters are called for **every log line**. Keep processing lightweight:

```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    // Good - simple pattern match
    if (event.getMessage().contains("ERROR")) {
        event.addEventMeta(Collections.singletonMap("level", "error"));
    }
    
    // Bad - expensive operation on every line
    // String result = callExternalAPI(event.getMessage());  // DON'T DO THIS
}
```

### 3. Use Appropriate Control Methods

Choose the right control method for your use case:

```java
// Completely remove the event (not processed further)
event.remove();

// Process but don't emit in final output (useful for data extraction)
event.quell();

// Set to VERBOSE level (only shown with -v flag)
event.quiet();

// Emit normally (default behavior, explicit call not needed)
event.emit();
```

### 4. Handle Errors Gracefully

```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    try {
        String message = event.getMessage();
        // Your processing logic
        String processed = processMessage(message);
        event.setMessage(processed);
    } catch (Exception e) {
        // Log error but don't break the workflow
        context.log(0, "Error processing log event: " + e.getMessage());
        // Leave message unchanged
    }
}
```

### 5. Use complete() for Summaries

```java
private int errorCount = 0;
private int warningCount = 0;

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    if (event.getMessage().contains("ERROR")) {
        errorCount++;
    } else if (event.getMessage().contains("WARN")) {
        warningCount++;
    }
}

@Override
public void complete(PluginLoggingContext context) {
    // Log summary at the end
    context.log(2, String.format("Summary: %d errors, %d warnings", 
                                errorCount, warningCount));
}
```

### 6. Validate Configuration

```java
@Override
public void init(PluginLoggingContext context, Map<String, String> config) {
    String pattern = config.get("pattern");
    
    if (pattern == null || pattern.trim().isEmpty()) {
        context.log(0, "ERROR: Pattern is required but not configured");
        throw new IllegalArgumentException("Pattern is required");
    }
    
    try {
        this.compiledPattern = Pattern.compile(pattern);
    } catch (PatternSyntaxException e) {
        context.log(0, "ERROR: Invalid regex pattern: " + e.getMessage());
        throw new IllegalArgumentException("Invalid regex pattern", e);
    }
    
    context.log(2, "Filter initialized successfully");
}
```

### 7. Don't Modify Message Unnecessarily

```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    String message = event.getMessage();
    
    // Only modify if needed
    if (shouldModify(message)) {
        String newMessage = modifyMessage(message);
        event.setMessage(newMessage);
    }
    // If not modified, don't call setMessage() - it's unnecessary
}
```

### 8. Use Metadata for UI Enhancements

```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    if (event.getMessage().contains("ERROR")) {
        // Add metadata for UI rendering
        Map<String, String> meta = new HashMap<>();
        meta.put("content-data-type", "text/html");
        meta.put("color", "red");
        event.addEventMeta(meta);
    }
}
```

## Common Patterns

### Pattern: Masking Sensitive Data

```java
// Match patterns like "password=secret" and mask the value
Pattern pattern = Pattern.compile("(password|token|key)[=:]\\s*([^\\s]+)", 
                                 Pattern.CASE_INSENSITIVE);
Matcher matcher = pattern.matcher(message);
StringBuffer sb = new StringBuffer();

while (matcher.find()) {
    String masked = matcher.group(1) + "=" + "****";
    matcher.appendReplacement(sb, masked);
}
matcher.appendTail(sb);
event.setMessage(sb.toString());
```

### Pattern: Data Extraction to Variables

```java
// Extract deployment ID and store as variable
Pattern pattern = Pattern.compile("Deployment ID: ([A-Z0-9-]+)");
Matcher matcher = pattern.matcher(event.getMessage());

if (matcher.find()) {
    String deploymentId = matcher.group(1);
    
    // Add to context for use in later steps
    Map<String, String> data = new HashMap<>();
    data.put("deployment.id", deploymentId);
    context.getOutputContext().addOutput("data", data);
    
    context.log(2, "Captured deployment ID: " + deploymentId);
}
```

### Pattern: Suppress Verbose Output

```java
// Suppress debug lines unless verbose mode is enabled
if (event.getMessage().startsWith("DEBUG:") || 
    event.getMessage().startsWith("TRACE:")) {
    event.quiet();  // Only shown with -v flag
}
```

### Pattern: Count and Report

```java
private Map<String, Integer> statusCounts = new HashMap<>();

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    String message = event.getMessage();
    
    // Count status codes
    Pattern pattern = Pattern.compile("HTTP (\\d{3})");
    Matcher matcher = pattern.matcher(message);
    
    if (matcher.find()) {
        String statusCode = matcher.group(1);
        statusCounts.merge(statusCode, 1, Integer::sum);
    }
}

@Override
public void complete(PluginLoggingContext context) {
    context.log(2, "=== HTTP Status Summary ===");
    statusCounts.forEach((code, count) -> 
        context.log(2, String.format("  %s: %d requests", code, count))
    );
}
```

### Pattern: Multi-line Buffering

```java
private StringBuilder buffer = new StringBuilder();
private boolean inMultilineBlock = false;

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    String message = event.getMessage();
    
    if (message.startsWith("BEGIN_BLOCK")) {
        inMultilineBlock = true;
        buffer.setLength(0);  // Clear buffer
        event.quell();  // Don't emit start marker
        return;
    }
    
    if (message.startsWith("END_BLOCK")) {
        inMultilineBlock = false;
        // Process buffered content
        String processed = processMultilineData(buffer.toString());
        event.setMessage(processed);
        return;
    }
    
    if (inMultilineBlock) {
        buffer.append(message).append("\n");
        event.quell();  // Buffer but don't emit
    }
}
```

## Performance Considerations

### Impact on Execution

Log filters are called for **every single log line**. In a job with 10,000 lines of output:
- `handleEvent()` is called 10,000 times
- Heavy processing = significant performance impact

### Performance Best Practices

**1. Compile Patterns Once**
```java
// Bad: Compiles 10,000 times
Pattern.compile(regex).matcher(message).find();

// Good: Compiles once
private Pattern pattern = Pattern.compile(regex);
pattern.matcher(message).find();
```

**2. Avoid String Concatenation in Loops**
```java
// Bad
String result = "";
for (String part : parts) {
    result += part;  // Creates new string each time
}

// Good
StringBuilder result = new StringBuilder();
for (String part : parts) {
    result.append(part);
}
```

**3. Early Exit for Non-matches**
```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    String message = event.getMessage();
    
    // Quick check before expensive processing
    if (!message.contains("API")) {
        return;  // Exit early
    }
    
    // Only do expensive regex on potential matches
    if (apiPattern.matcher(message).find()) {
        // Process...
    }
}
```

**4. Limit State Size**
```java
// Be careful with unbounded collections
private List<String> allMessages = new ArrayList<>();  // Could use GBs of memory!

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    allMessages.add(event.getMessage());  // Don't do this!
}

// Better: Keep only summary data
private int messageCount = 0;
private int errorCount = 0;
```

## Troubleshooting

### Plugin Not Being Called

**Problem:** Log filter configured but `handleEvent()` never called.

**Check:**
- Filter is applied at correct level (workflow or step)
- Plugin JAR is in libext directory
- Rundeck restarted after installation
- No errors in Rundeck logs during plugin loading

**Verify:**
```bash
grep "LogFilter" /var/log/rundeck/service.log
```

### Messages Not Being Modified

**Problem:** `setMessage()` called but output unchanged.

**Check:**
- Another filter downstream is overwriting your changes
- Filter is configured after the step that produces the logs
- Event is being `removed()` or `quelled()` before your filter

**Debug:**
```java
@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    String original = event.getMessage();
    String modified = processMessage(original);
    event.setMessage(modified);
    
    // Debug log
    if (!original.equals(modified)) {
        context.log(2, "Modified: " + original + " -> " + modified);
    }
}
```

### Memory Issues

**Problem:** Job runs out of memory when log filter is enabled.

**Check:**
- Are you storing all messages? (Don't do this!)
- Are you creating many objects per event?
- Are compiled patterns being recreated?

**Fix:**
```java
// Bad - unbounded growth
private List<String> allLogs = new ArrayList<>();

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    allLogs.add(event.getMessage());  // Memory leak!
}

// Good - bounded summary data
private int totalLines = 0;
private int errorLines = 0;

@Override
public void handleEvent(PluginLoggingContext context, LogEventControl event) {
    totalLines++;
    if (event.getMessage().contains("ERROR")) {
        errorLines++;
    }
}
```

### Regex Performance Issues

**Problem:** Job is very slow with log filter enabled.

**Check:**
- Are you using complex or backtracking-heavy regex?
- Are patterns compiled in `init()` or `handleEvent()`?

**Optimize:**
```java
// Bad - catastrophic backtracking
Pattern.compile("(a+)+b");

// Good - non-backtracking
Pattern.compile("a+b");

// Use simple string operations when possible
if (message.startsWith("ERROR")) {  // Fast
    // vs
}
if (Pattern.matches("^ERROR.*", message)) {  // Slower
}
```

## When to Use Log Filters

### ✅ Good Use Cases

**Security & Compliance:**
- Mask passwords, tokens, API keys before logging
- Redact PII (social security numbers, credit cards)
- Remove sensitive configuration data

**Data Extraction:**
- Capture deployment IDs, build numbers, test results
- Extract metrics from command output
- Parse structured data (JSON, XML) into variables

**Log Management:**
- Suppress verbose debug output
- Highlight errors and warnings
- Filter noise from third-party tools

**Monitoring & Reporting:**
- Count errors, warnings, specific patterns
- Calculate success rates, response times
- Generate execution summaries

**Formatting:**
- Colorize output for better readability
- Add context or timestamps
- Convert between formats

### ❌ When NOT to Use Log Filters

**Heavy Processing:**
- Don't call external APIs on every log line
- Don't perform complex calculations
- Don't do database lookups

**Large State Management:**
- Don't buffer all logs in memory
- Don't store entire output for later processing
- Use summary data instead

**Job Logic:**
- Don't use filters to control job flow
- Don't make decisions that affect job steps
- Use proper conditional steps instead

**External System Integration:**
- Don't send logs to external systems from filters
- Use notification plugins or workflow steps
- Filters are for log processing, not integration

## Localization

For the basics of plugin localization see: [Plugin Development - Plugin Localization](/developer/plugin-properties.md#plugin-localization).

## Example Implementations

### Built-in Log Filters

Rundeck includes several built-in log filters you can study:

**Mask Passwords** - Masks sensitive data in logs  
[Source Code](https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logging/MaskPasswordsFilterPlugin.groovy)

**Render Formatted Data** - Formats JSON and other structured output  
[Source Code](https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logging/RenderDatatypeFilterPlugin.groovy)

**Quiet Output** - Suppresses verbose output  
[Source Code](https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logging/QuietFilterPlugin.groovy)

**Highlight Output** - Highlights specific patterns  
[Source Code](https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logging/HighlightFilterPlugin.groovy)

**Key-Value Data** - Extracts key=value pairs  
[Source Code](https://github.com/rundeck/rundeck/blob/master/rundeckapp/src/main/groovy/com/dtolabs/rundeck/server/plugins/logging/KeyValueLogFilterPlugin.groovy)

### Community Examples

**Example Groovy Log Filters:**  
<https://github.com/rundeck/rundeck/tree/master/examples/example-groovy-log-filter-plugins>

**Plugin Development Examples:**  
<https://github.com/rundeck-plugins/>

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Groovy Plugin Development](/developer/groovy-plugin-development.md) - Groovy plugin DSL
- [Plugin Properties](/developer/plugin-properties.md) - Configuration properties
- [Logging Plugins](/developer/logging-plugins.md) - Alternative logging plugin type
- [Workflow Steps](/manual/jobs/job-workflows.md#workflow-steps) - Understanding workflows

## Quick Reference

### Plugin Interface

```java
@Plugin(name = "my-filter", service = ServiceNameConstants.LogFilter)
public class MyFilter implements LogFilterPlugin {
    void init(PluginLoggingContext context, Map<String, String> config);
    void handleEvent(PluginLoggingContext context, LogEventControl event);
    void complete(PluginLoggingContext context);
}
```

### Event Control Methods

| Method | Effect |
|--------|--------|
| `event.emit()` | Emit log normally (default) |
| `event.quell()` | Process but don't emit in final output |
| `event.quiet()` | Set to VERBOSE level (only with -v flag) |
| `event.remove()` | Discard event completely |
| `event.setMessage(String)` | Modify log message |
| `event.getMessage()` | Get current message |
| `event.addEventMeta(Map)` | Add metadata for UI rendering |

### Context Methods

| Method | Purpose |
|--------|---------|
| `context.log(level, msg)` | Log from plugin (levels: 0=error, 1=warn, 2=info) |
| `context.getDataContext()` | Access job variables, node attributes |
| `context.getOutputContext()` | Capture data as job variables |

### Configuration Levels

**Workflow Level:**
```
Workflow
├── [Log Filter: Applied to ALL steps]
├── Step 1
├── Step 2
└── Step 3
```

**Step Level:**
```
Workflow
├── Step 1 [Log Filter: Only this step]
├── Step 2
└── Step 3
```
