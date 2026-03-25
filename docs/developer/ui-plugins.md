# UI Plugins

## Overview

UI Plugins extend the Rundeck web interface by injecting custom JavaScript and CSS into specific pages. They enable you to:

- Add new tabs and visualizations to existing pages
- Enhance the user interface with custom components
- Integrate with external systems via the browser
- Create custom dashboards and reports
- Modify existing UI behavior

**Common Use Cases:**
- Custom metrics dashboards (execution statistics, ROI summaries)
- Enhanced job list views with additional data
- Integration with external monitoring/analytics tools
- Custom data visualizations using Chart.js or other libraries
- Workflow enhancements and automation tools

UI Plugins that are installed are loaded on all applicable pages by default.

UI Plugins can be packaged as either Zip files or Java Jar files. **Zip plugins are recommended** for most use cases as they're simpler to develop and deploy.

Your Javascript has access to a [Javascript API](#javascript-api) for integration with Rundeck.

## Behavior

When Rundeck renders a page, it evaluates whether any UI plugins are applicable, and
what resources of those plugins to load for the page. If some plugins declare that they `require`
other plugins, the ordering is arranged to load required plugins first, if possible. Note: any plugin that you put in the `requires` section must also be configured to load on the
same pages, otherwise Rundeck will not load it.

For Zip UI plugins Rundeck looks at the `plugin.yaml` data which declares the page configurations to determine applicability. For Java plugins, Rundeck calls the `doesApply` method.

When loading a plugin for the page, Rundeck will link to the script and stylesheets for the
page. For Zip UI Plugins, the Page configuration determines which scripts and stylesheets
to load. For Java plugins, the `scriptResourcesForPath` and `styleResourcesForPath` methods
will be called.

## Development Approaches

### Simple Zip Plugin (Basic)

The simplest approach: manually create directory structure and package as a zip file.

**Best for:**
- Simple plugins with minimal JavaScript/CSS
- Quick prototypes and learning
- No build tooling needed

See the [basic structure](#simple-plugin-structure-manual) below.

### Modern Gradle + Asset Pipeline (Recommended)

Use Gradle with the Asset Pipeline plugin for production-quality plugins.

**Best for:**
- Complex plugins with multiple JS/CSS files
- Using asset preprocessing (SCSS, ES6+, minification)
- Professional plugins shared with community
- Projects requiring dependency management

**Key Benefits:**
- Automatic asset compilation and optimization
- SCSS/SASS support
- Asset fingerprinting for cache busting
- Built-in zip packaging
- Version management with `axion-release`

See the [modern structure](#modern-plugin-structure-with-asset-pipeline) section below.

**Example repositories using this approach:**
- [ui-job-metrics](https://github.com/rundeck-plugins/ui-job-metrics) - Job execution metrics dashboard (for stats-based metrics with `rundeck.feature.guiUseExecutionDailyMetrics.enabled`, plugins should use the [execution metrics API](/api/index.md#execution-query-metrics) with `useStats=true`, API v57+; see [Execution daily metrics](/administration/configuration/config-file-reference.md#execution-daily-metrics))
- [ui-roi-summary](https://github.com/rundeck-plugins/ui-roi-summary) - ROI summary views

## Simple Plugin Structure (Manual)

For basic plugins created manually without build tooling:

```
[name]-plugin.zip
\- [name]-plugin/              # Root directory (same name as zip file)
   |- plugin.yaml              # Plugin metadata file
   \- resources/               # All plugin resources
      |- icon.png              # Plugin icon
      |- i18n/                 # Internationalization
      |  |- messages.properties
      |  |- messages_es_419.properties
      |  \- ...
      |- js/                   # JavaScript files
      |  |- init.js
      |  |- myfile.js
      |  \- ...
      \- css/                  # Stylesheets
         |- mystyles.css
         \- ...
```

## Modern Plugin Structure (with Asset Pipeline)

For professional plugins using Gradle and Asset Pipeline:

```
ui-myplugin/
├── build.gradle                    # Gradle build with Asset Pipeline
├── gradle/
│   ├── libs.versions.toml         # Dependency versions
│   └── wrapper/                   # Gradle wrapper
├── src/
│   └── main/
│       └── rdplugin/
│           ├── plugin.yaml        # Plugin metadata
│           ├── assets/            # SOURCE files (compiled by Asset Pipeline)
│           │   ├── css/
│           │   │   ├── variables.css
│           │   │   └── styles.css
│           │   └── js/
│           │       ├── main.js
│           │       └── lib/
│           │           ├── support.js
│           │           └── dataManager.js
│           └── resources/         # STATIC files (copied as-is)
│               ├── html/          # HTML templates
│               │   └── template.html
│               ├── i18n/          # Internationalization
│               │   └── messages.properties
│               ├── icon.png       # Plugin icon
│               └── js/
│                   └── init.js    # Initialization script
└── build/
    ├── assets/resources/          # COMPILED assets go here
    │   ├── js/                    # Processed JavaScript
    │   └── css/                   # Processed CSS
    └── distributions/             # Final plugin ZIP
        └── ui-myplugin-1.0.0.zip
```

### Key Directory Distinctions

**`assets/` directory** (Asset Pipeline source):
- Files here are **processed/compiled** by Asset Pipeline
- SCSS/SASS compiled to CSS
- JavaScript can use directives (`//= require`)
- Asset fingerprinting applied
- Minification (if enabled)
- Output goes to `build/assets/resources/`

**`resources/` directory** (static files):
- Files here are **copied as-is** (no processing)
- HTML templates
- Internationalization files
- Icons and images
- Initialization scripts that load first

**Why this split?**
- `resources/js/init.js` runs first and sets up your plugin namespace
- `assets/js/main.js` contains your processed application code
- HTML templates need to be unprocessed for runtime loading
- i18n files must remain in `.properties` format

### Example build.gradle

```gradle
buildscript {
    repositories {
        mavenCentral()
        maven { url "https://repo.grails.org/grails/core" }
    }
    dependencies {
        classpath "com.bertramlabs.plugins:asset-pipeline-gradle:4.5.0"
    }
}

plugins {
    id 'pl.allegro.tech.build.axion-release' version '1.14.0'
    id 'java'
}

apply plugin: 'com.bertramlabs.asset-pipeline'

repositories {
    mavenCentral()
}

ext.pluginName = 'My UI Plugin'
ext.pluginDescription = 'Custom UI enhancements'
ext.archivesBaseName = "ui-myplugin"

// Asset Pipeline configuration
assets {
    minifyJs = false        # Enable in production
    minifyCss = false
    enableSourceMaps = false
    includes = ['css/**/*.css', 'js/**/*.js']
    excludes = ['**/*.html', 'js/lib/**/*.js']  # Don't process libs
    
    from "${project.projectDir}/src/main/rdplugin/assets"
    compileDir = "${project.buildDir}/assets/resources"
}

// Create plugin ZIP
task pluginZip(type: Jar) {
    destinationDirectory = file("build/distributions")
    archiveBaseName = project.ext.archivesBaseName
    archiveVersion = project.version
    archiveExtension = 'zip'
    
    from("${project.buildDir}/zip-contents") {
        into("${archivesBaseName}-${version}")
    }
}

build.dependsOn 'pluginZip'
```

## UI Plugin Configuration (plugin.yaml)

The `plugin.yaml` file defines your plugin metadata and which pages it applies to.

### Basic Example

```yaml
name: ui-myplugin
rundeckPluginVersion: 1.2
author: Your Name
url: https://github.com/yourorg/your-plugin
date: 2026-02-02
version: 1.0.0
providers:
    - service: UI
      name: ui-myplugin
      plugin-type: ui
      title: 'My Plugin Title'
      description: 'Brief description of what this plugin does'
      ui:
        - pages: ['menu/jobs', 'scheduledExecution/show']
          scripts:
            - js/init.js
            - js/main.js
          styles:
            - css/styles.css
```

### Configuration Fields

**Top-level fields:**
- `name:` Unique plugin identifier (lowercase, hyphen-separated)
- `rundeckPluginVersion:` Use `1.2` or `1.3`
- `author:` Your name or organization
- `version:` Plugin version (semantic versioning)
- `date:` Release date (ISO8601 format)
- `url:` Project homepage or repository

**Provider configuration:**
- `service:` Must be `UI`
- `name:` Provider ID (typically matches plugin name)
- `plugin-type:` Must be `ui`
- `title:` Display name shown in Rundeck
- `description:` Brief description of functionality

**UI section:**

Each entry in the `ui:` array defines page-specific loading:

- `pages:` Which pages to load on
  - Single path: `'menu/jobs'`
  - Multiple paths: `['menu/jobs', 'scheduledExecution/show']`
  - All pages: `'*'` (use sparingly)
- `scripts:` JavaScript files to load (order matters)
  - Paths relative to `resources/` directory
  - Listed in load order
- `styles:` CSS files to load
  - Paths relative to `resources/` directory
- `requires:` (Optional) Other UI plugin IDs this depends on
  - Ensures load order dependencies

### Common Page Paths

| Page | Path | Description |
|------|------|-------------|
| Job List | `menu/jobs` | Jobs page/list view |
| Job Detail | `scheduledExecution/show` | Individual job page |
| Execution Page | `execution/show` | Individual execution view |
| Activity | `reports/index` | Activity/history page |
| Project Home | `menu/projectHome` | Project dashboard |
| Nodes | `framework/nodes` | Nodes page |
| Commands | `framework/adhoc` | Commands page |
| All Pages | `*` | Every page (use carefully) |

::: warning Performance Tip
Only load your plugin on pages where it's needed. Avoid using `pages: '*'` unless absolutely necessary, as it loads on every page and can impact performance.
:::

### Multiple Page Configurations

You can define different scripts/styles for different pages:

```yaml
ui:
  # Load on job list with full dashboard
  - pages: ['menu/jobs']
    scripts:
      - js/init.js
      - js/dashboard.js
      - js/charts.min.js
    styles:
      - css/styles.css
  
  # Load on job detail with minimal code
  - pages: ['scheduledExecution/show']
    scripts:
      - js/init.js
      - js/job-detail.js
    styles:
      - css/styles.css
```

### Script Load Order

::: tip Important
Script order matters! List dependencies first:

```yaml
scripts:
  - js/lib/chart.min.js     # Third-party library
  - js/init.js               # Initialize namespace
  - js/main.js               # Your main code
```
:::

### Localization

For the basics of zip plugin localization see: [Plugin Development - Internationalization/Localization for Zip files](/developer/script-plugin-development.md#localization).

### Icon

See [Plugin Icons](/developer/plugin-properties.md#plugin-icons).

## JavaScript Development Patterns

### UI Version Detection

Rundeck has different UI versions (Classic UI vs. Current UI). Plugins should detect which UI is active:

**Pattern: Detect Current UI**

```javascript
// Check if Current UI is active
const currentUi = !!document.querySelector('.ui-type-current');

if (currentUi) {
    console.log('Current UI detected - initialize plugin');
    // Your plugin initialization code
} else {
    console.log('Classic UI detected - plugin may not be compatible');
    // Optionally handle Classic UI or skip initialization
}
```

**Why this matters:**
- Current UI and Classic UI have different DOM structures
- Selectors that work in one may not work in the other
- Prevents errors when plugin loads on incompatible UI version
- Some features (like certain APIs) are only available in Current UI

**Real-world example from ui-job-metrics:**

```javascript
function initJobMetrics() {
  const currentUi = !!document.querySelector('.ui-type-current');
  
  if (currentUi) {
    console.log('Initializing Job Metrics');
    var jobListSupport = new JobListSupport();
    
    jQuery(function() {
      // Initialize your plugin components
    });
  } else {
    console.log('Job Metrics requires Current UI');
  }
}

// Auto-initialize when script loads
initJobMetrics();
```

### Plugin Namespace Pattern

Avoid global namespace pollution by using a dedicated namespace object.

**Pattern: Use `window.RDPRO` or similar**

```javascript
// resources/js/init.js - Loads first, sets up namespace
jQuery(function() {
  // Initialize global namespace if it doesn't exist
  if (typeof window.RDPRO != "object") {
      window.RDPRO = {};
  }
  
  // Register your plugin in the namespace
  window.RDPRO["ui-myplugin"] = {
      name: "ui-myplugin",
      version: "1.0.0",
      initialized: false
  };
});
```

```javascript
// assets/js/main.js - Your main plugin code
function initMyPlugin() {
  // Access your namespace
  var plugin = window.RDPRO["ui-myplugin"];
  
  if (plugin.initialized) {
    console.log('Plugin already initialized');
    return;
  }
  
  // Your initialization logic here
  
  plugin.initialized = true;
}

initMyPlugin();
```

**Benefits:**
- Prevents naming conflicts with other plugins
- Provides a clear plugin registry
- Makes debugging easier (inspect `window.RDPRO` in console)
- Allows communication between related plugins

### Dark Mode / Theme Detection

Rundeck supports light and dark themes. Plugins should adapt their styling and charts accordingly.

**Pattern: Detect Current Theme**

```javascript
function getChartThemeColors() {
  // Check current theme
  const isDarkMode = document.documentElement.getAttribute('data-color-theme') === 'dark';
  
  return {
    textColor: isDarkMode ? '#ffffff' : '#666666',
    gridColor: isDarkMode ? 'rgba(160, 160, 160, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    borderColor: isDarkMode ? 'rgba(160, 160, 160, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff'
  };
}

// Apply theme to Chart.js
function createChart(ctx, data) {
  const theme = getChartThemeColors();
  
  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            color: theme.textColor
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: theme.gridColor
          },
          ticks: {
            color: theme.textColor
          }
        },
        y: {
          grid: {
            color: theme.gridColor
          },
          ticks: {
            color: theme.textColor
          }
        }
      }
    }
  });
}
```

**Watching for theme changes:**

```javascript
// Watch for theme changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-color-theme') {
      console.log('Theme changed, updating charts...');
      updateChartsForTheme();
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-color-theme']
});
```

### Adding Tabs to Existing Pages

Common pattern for adding new tabs to pages like the Job List.

**Pattern: JobListSupport.initPage()**

```javascript
// Helper class for adding tabs (from support.js pattern)
function JobListSupport() {
  this.initPage = function(
    firsttab,      // Existing tab selector (e.g., '#joblistContent')
    firsttitle,    // Title for existing tab
    contentid,     // ID for your new tab content
    tabid,         // ID for your new tab link
    tabname,       // Display name for your tab
    tabcontent,    // HTML content for your tab
    ontabcontent,  // Callback when tab is created
    makefirst,     // true = insert your tab first
    newactive      // true = make your tab active by default
  ) {
    // Tab creation logic...
    // See full implementation in ui-job-metrics/ui-roi-summary repos
  }
}

// Usage example
var jobListSupport = new JobListSupport();

jobListSupport.initPage(
  '#joblistContent',           // Existing content selector
  'Jobs',                      // Existing tab title
  'job-metrics-content',       // Your tab content ID
  'job-metrics-tab',           // Your tab ID
  'Job Metrics',               // Your tab title
  '<div id="metrics-container"></div>',  // Your HTML
  function(tabElement) {
    // Called after tab is created
    initializeMetricsView(tabElement);
  },
  false,    // Don't make it first tab
  false     // Don't make it active by default
);
```

### LocalStorage for User Preferences

Store user-configurable settings in browser localStorage.

**Pattern: Persistent Settings**

```javascript
// Save setting
function saveTimeWindow(days) {
  localStorage.setItem('rundeck.plugin.ui-myplugin.timeWindow', days.toString());
}

// Load setting with default
function getTimeWindow() {
  const saved = localStorage.getItem('rundeck.plugin.ui-myplugin.timeWindow');
  return saved ? parseInt(saved) : 30; // Default: 30 days
}

// Using with Knockout.js (common in Rundeck UI)
function GraphOptions() {
  var self = this;
  
  // Initialize with saved value or default
  const savedTimeWindow = localStorage.getItem('rundeck.plugin.ui-myplugin.timeWindow');
  self.timeWindow = ko.observable(savedTimeWindow ? parseInt(savedTimeWindow) : 30);
  
  // Persist changes automatically
  self.timeWindow.subscribe(function(newValue) {
    localStorage.setItem('rundeck.plugin.ui-myplugin.timeWindow', newValue.toString());
    console.log('Time window updated:', newValue);
  });
}
```

**Best practice:**
- Use namespaced keys: `rundeck.plugin.[your-plugin-name].[setting-name]`
- Provide sensible defaults
- Validate loaded values (they could be corrupted)

## Complete Working Example

Here's a minimal but complete UI plugin that adds a custom tab to the Job List page:

### Directory Structure

```
ui-hello-world/
├── build.gradle
└── src/
    └── main/
        └── rdplugin/
            ├── plugin.yaml
            ├── resources/
            │   ├── icon.png
            │   ├── i18n/
            │   │   └── messages.properties
            │   └── js/
            │       └── init.js
            └── assets/
                ├── css/
                │   └── styles.css
                └── js/
                    ├── lib/
                    │   └── support.js
                    └── hello.js
```

### plugin.yaml

```yaml
name: ui-helloworld
rundeckPluginVersion: 1.2
author: Your Name
url: https://github.com/yourname/ui-hello-world
date: 2026-02-02
version: 1.0.0
providers:
    - service: UI
      name: ui-helloworld
      plugin-type: ui
      title: 'Hello World Plugin'
      description: 'Example UI plugin demonstrating basic patterns'
      ui:
        - pages: ['menu/jobs']
          scripts:
            - js/init.js
            - js/hello.js
          styles:
            - css/styles.css
```

### resources/js/init.js

```javascript
// Initialize plugin namespace
jQuery(function() {
  if (typeof window.RDPRO != "object") {
      window.RDPRO = {};
  }
  
  window.RDPRO["ui-helloworld"] = {
      name: "ui-helloworld",
      version: "1.0.0",
      initialized: false
  };
  
  console.log('Hello World plugin namespace created');
});
```

### assets/js/lib/support.js

```javascript
function JobListSupport() {
  this.initPage = function(firsttab, firsttitle, contentid, tabid, 
                          tabname, tabcontent, ontabcontent, makefirst, newactive) {
    var main = jQuery(firsttab);
    var activeOld = newactive ? '' : 'active';
    var activenew = newactive ? 'active' : '';
    
    var newTabLi = `<li class="${activenew}">
      <a href="#${contentid}" data-toggle="tab" id="${tabid}">${tabname}</a>
    </li>`;
    
    if (!main.hasClass('tab-pane')) {
      // First tab - need to create tab structure
      var tabA = `<li class="${activeOld}">
        <a href="${firsttab}" data-toggle="tab" id="${firsttab.substr(1)}_tab">${firsttitle}</a>
      </li>`;
      var tabB = newTabLi;
      
      if (makefirst) {
        [tabA, tabB] = [tabB, tabA];
      }
      
      let tabs = jQuery(`
        <div class="vue-tabs">
          <div class="nav-tabs-navigation">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs">${tabA}${tabB}</ul>
            </div>
          </div>
          <div class="tab-content"></div>
        </div>
      `);
      
      let newtab = jQuery(`<div id="${contentid}" class="tab-pane ${activenew}">${tabcontent}</div>`);
      let maintabcontent = tabs.find('.tab-content');
      main.wrap(maintabcontent);
      newtab.insertAfter(main);
      main.addClass('tab-pane ' + activeOld);
      tabs.insertBefore(main.parent());
      
      if (typeof ontabcontent === 'function') {
        ontabcontent(newtab[0]);
      }
    } else {
      // Tab structure already exists
      let tabs = main.parent().parent().find('.nav.nav-tabs');
      
      if (makefirst) {
        tabs.prepend(newTabLi);
      } else {
        tabs.append(newTabLi);
      }
      
      let newtab = jQuery(`<div id="${contentid}" class="tab-pane">${tabcontent}</div>`);
      newtab.insertAfter(main);
      
      if (typeof ontabcontent === 'function') {
        ontabcontent(newtab[0]);
      }
    }
    
    return jQuery('#' + tabid);
  };
}
```

### assets/js/hello.js

```javascript
//= require ./lib/support

function initHelloWorld() {
  // Check for Current UI
  const currentUi = !!document.querySelector('.ui-type-current');
  
  if (!currentUi) {
    console.log('Hello World plugin requires Current UI');
    return;
  }
  
  console.log('Initializing Hello World plugin');
  
  jQuery(function() {
    var plugin = window.RDPRO["ui-helloworld"];
    
    if (plugin.initialized) {
      return;
    }
    
    var jobListSupport = new JobListSupport();
    
    // Create tab content
    var tabContent = `
      <div style="padding: 20px;">
        <h3>Hello from UI Plugin!</h3>
        <p>This tab was added by a UI plugin.</p>
        <p>Project: ${window._rundeck.projectName}</p>
        <button id="hello-button" class="btn btn-primary">Click Me</button>
        <div id="hello-output" style="margin-top: 20px;"></div>
      </div>
    `;
    
    // Add the tab
    jobListSupport.initPage(
      '#joblistContent',
      'Jobs',
      'hello-tab-content',
      'hello-tab',
      'Hello World',
      tabContent,
      function(tabElement) {
        // Tab created callback
        jQuery('#hello-button').click(function() {
          var count = localStorage.getItem('hello.clickCount') || 0;
          count = parseInt(count) + 1;
          localStorage.setItem('hello.clickCount', count);
          
          jQuery('#hello-output').html(
            `<div class="alert alert-success">
              Button clicked ${count} time(s)!
            </div>`
          );
        });
      },
      false,  // Not first tab
      false   // Not active by default
    );
    
    plugin.initialized = true;
    console.log('Hello World plugin initialized');
  });
}

// Auto-initialize
initHelloWorld();
```

### assets/css/styles.css

```css
#hello-tab-content {
    background: var(--background-color, #ffffff);
    color: var(--text-color, #333333);
}

#hello-button {
    background: var(--primary-color, #337ab7);
    border-color: var(--primary-color, #2e6da4);
}

#hello-button:hover {
    background: var(--primary-hover-color, #286090);
    border-color: var(--primary-hover-border, #204d74);
}
```

### Build and Install

```bash
# Build
./gradlew clean build

# Install
cp build/distributions/ui-helloworld-1.0.0.zip $RDECK_BASE/libext/

# No restart required - just reload the page
```

## Best Practices

### 1. Always Detect UI Version

```javascript
const currentUi = !!document.querySelector('.ui-type-current');
if (!currentUi) {
    console.warn('Plugin requires Current UI');
    return;
}
```

### 2. Use Plugin Namespaces

```javascript
// Good
window.RDPRO["ui-myplugin"] = { /* ... */ };

// Bad - pollutes global namespace
window.myPluginData = { /* ... */ };
```

### 3. Handle Theme Changes

```javascript
// Support both light and dark themes
const isDarkMode = document.documentElement.getAttribute('data-color-theme') === 'dark';
```

### 4. Check for Initialization

```javascript
if (plugin.initialized) {
    return; // Prevent double-initialization
}
```

### 5. Use LocalStorage Carefully

```javascript
// Always namespace your keys
localStorage.setItem('rundeck.plugin.myplugin.setting', value);

// Always provide defaults
const setting = localStorage.getItem('key') || defaultValue;

// Always validate loaded data
const days = parseInt(saved);
if (isNaN(days) || days < 1) {
    days = defaultValue;
}
```

### 6. Load Scripts in Correct Order

```yaml
scripts:
  - js/lib/chart.min.js    # Third-party deps first
  - js/init.js              # Namespace setup
  - js/main.js              # Your code last
```

### 7. Only Load on Necessary Pages

```yaml
# Good - specific pages
pages: ['menu/jobs', 'scheduledExecution/show']

# Bad - loads everywhere (performance impact)
pages: '*'
```

### 8. Use Asset Directives for Code Organization

```javascript
//= require ./lib/support
//= require ./lib/dataManager
// Your main code here
```

### 9. Provide User Feedback

```javascript
// Show loading states
showSpinner();
fetchData().then(() => {
    hideSpinner();
    showSuccess();
}).catch(() => {
    hideSpinner();
    showError();
});
```

### 10. Test in Both Themes

- Test your UI in light mode
- Test your UI in dark mode
- Ensure charts/visualizations adapt correctly
- Check contrast and readability

### 11. Handle Errors Gracefully

```javascript
try {
    initializePlugin();
} catch (error) {
    console.error('Plugin initialization failed:', error);
    // Show user-friendly error message
}
```

### 12. Clean Up Resources

```javascript
// If your plugin creates intervals/observers
window.addEventListener('beforeunload', function() {
    clearInterval(myInterval);
    observer.disconnect();
});
```

## Java Plugin Type

::: tip
Refer to [Java Development](/developer/java-plugin-development.md) for information about developing a Java plugin for Rundeck.
:::

The plugin interface is [UIPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/rundeck/UIPlugin.html).

```java

public interface UIPlugin {
    /**
     * @param path
     *
     * @return true if this plugin applies at the path
     */
    boolean doesApply(String path);

    /**
     *
     * @param path
     * @return list of resources available at the path
     */
    List<String> resourcesForPath(String path);

    /**
     * @param path
     *
     * @return list of javascript resources to load at the path
     */
    List<String> scriptResourcesForPath(String path);

    /**
     * @param path
     *
     * @return list of css stylesheets to load at the path
     */
    List<String> styleResourcesForPath(String path);

    /**
     * @param path
     *
     * @return list of plugin names this plugin depends on for the specified path
     */
    List<String> requires(String path);
}

```

The methods of the plugin are used as follows:

- `doesApply`: should return `true`, if the plugin applies to the given path
- `resourcesForPath`: return the list of resources for the given path
- `scriptResourcesForPath`: return the list of Javascript resources for the path
- `styleResourcesForPath`: return the list of CSS resources for the path
- `requires`: return a list of other UI plugin names which this plugin requires, used to order the loading of plugin resources.

Resources should be included in your plugin Jar file under a `resources/` directory.

### Localization

For the basics of Java plugin localization see: [Plugin Development - Plugin Localization](/developer/plugin-properties.md#plugin-localization)

### Icon

See [Plugin Icons](/developer/plugin-properties.md#plugin-icons).

## Javascript API

When loaded in a Rundeck GUI page, your Javascript code can use a simple Javascript API to
get more information about the Rundeck application, and your plugin.

Note: Rundeck makes use of [Knockout][] and [jQuery][] on all GUI pages, so they can be used by your plugins. Knockout is useful to understand when interacting with the JS already included on a Rundeck page.

Rundeck creates a window object called `rundeckPage` with these methods:

- `project()`: returns the name of the current project, if available
- `path()`: the page path
- `lang()`: current user locale and language code
- `pluginBaseUrl(pluginId)`: returns the base URL for loading file resources for a plugin with provider ID "pluginId". Append a resources path to retrieve any plugin resource files.
- `pluginBasei18nUrl(pluginId)`: returns the base URL for loading i18n resources for a plugin with provider ID "pluginId". Append a resources path to retrieve i18n resources.

Note: the `rundeckPage` object may have other methods, but any methods not documented here are subject to change.

### Loading resources

You can load other resources from your plugin by using the `pluginBaseUrl` for your plugin.

Example using jQuery:

```js
function loadHtmlTemplate(file){
	//assuming my zip plugin has a resources/html/myfile.html
	var myProvider='com.mycompany.rundeck.myplugin';
	var pluginUrl = rundeckPage.pluginBaseUrl(myProvider);
    var fullUrl = pluginUrl + '/html/' + file + ".html";
    jQuery.get(fullUrl, function (text) {
    	//do something with the HTML contents
    });
}
```

### Loading i18n Resources

The `rundeckPage.pluginBasei18nUrl(..)` method will return the base URL for loading i18n resources.

Rundeck Plugin Localization/Internationalization uses java `.properties` formatted files. (See [Plugin Localization](/developer/plugin-properties.md#plugin-localization)). However, your i18n resources don't have to be `.properties` files.

Requesting resources via this URL provides two features to help with i18n:

1. Locale resolution. Requesting a path such as `rundeckPage.pluginBasei18nUrl('myprovider')+'/myfile.txt'`, will attempt to resolve the file by looking for a file based on the current User's locale/language settings. E.g. if their language is set to Spanish (code `es_419`), the request will resolve to a file `i18n/myfile_es_419.txt` if it exists. It will fall back to the language (e.g. `es`), then any default locale (e.g. `en_us`), default language (e.g. `en`) and finally the original file path.
2. Conversion of Java .properties to JSON. If you request a `.properties` file, and append a `?format=json` to the URL, Rundeck will load the Java Properties formatted data, and return the JSON for the data.

Examples:

Loads plugin i18n messages into the `window.Messages` object.
If my zip plugin has a file `resources/i18n/messages_es_419.properties`
and user's current lang is `es_419`, this would load the Spanish messages:

```js
function loadi18nMessages(file){
	var myProvider='com.mycompany.rundeck.myplugin';
	var plugini18nBase = rundeckPage.pluginBasei18nUrl(myProvider);
    jQuery.ajax({
        url: plugini18nBase + '/messages.properties?format=json',
        success: function (data) {
            if (typeof(window.Messages) != 'object') {
                window.Messages = {};
            }
            jQuery.extend(window.Messages, data);
        }
    });
}
```

This example is similar to the first example, but loads a HTML file specific to the Language/Locale of the user. If the locale is `es_419` this would load the `resources/i18n/html/myfile_es_419.html` file:

```js

function loadi18nHtmlTemplate(file){
	var myProvider='com.mycompany.rundeck.myplugin';
	var plugini18nBase = rundeckPage.pluginBasei18nUrl(myProvider);
    var fullUrl = plugini18nBase + '/html/' + file + ".html";
    jQuery.get(fullUrl, function (text) {
    	//do something with the HTML contents
    });
}
```

## Performance Considerations

::: danger Critical: API Usage Can Impact Server Performance
UI plugins that make API calls to Rundeck can significantly impact server performance, especially in large environments with hundreds or thousands of jobs/executions. **You are responsible for ensuring your plugin performs efficiently.**
:::

### Why Performance Matters

UI plugins run in every user's browser, but when they call Rundeck APIs, those calls hit the server. Problems multiply:

- **One inefficient query** × **Multiple users** × **Auto-refresh** = **Server overload**
- Large environments amplify these issues exponentially
- CPU spikes can impact all Rundeck users
- Database load can slow down the entire system

**Real-world example:**
An early version of the Job Metrics plugin made inefficient API calls that caused significant CPU spikes in environments with 1000+ jobs. The issue only appeared at scale and required optimization.

### API Performance Best Practices

#### 1. Minimize API Calls

**Bad - Calls API for every job individually:**
```javascript
// DON'T DO THIS
jobs.forEach(job => {
    // Makes 1000 API calls if you have 1000 jobs!
    fetch(`/api/job/${job.id}/executions`).then(data => {
        processJobData(job.id, data);
    });
});
```

**Good - Single batched API call:**
```javascript
// DO THIS
const jobIds = jobs.map(j => j.id).join(',');
fetch(`/api/project/${project}/executions?jobIdListFilter=${jobIds}&max=500`)
    .then(data => {
        const executionsByJob = groupExecutionsByJob(data.executions);
        jobs.forEach(job => {
            processJobData(job.id, executionsByJob[job.id] || []);
        });
    });
```

#### 2. Use Appropriate Query Parameters

**Control result size:**
```javascript
// Limit results to what you actually need
fetch(`/api/project/${project}/executions?max=100&offset=0`)

// Filter on the server, not in the browser
fetch(`/api/project/${project}/executions?recentFilter=1d&statusFilter=succeeded`)
```

**Available filters:**
- `max` - Limit number of results (default: 20, max: 200)
- `offset` - Pagination offset
- `recentFilter` - Time window (`1h`, `1d`, `1w`, `1m`)
- `statusFilter` - Filter by status (`succeeded`, `failed`, `running`)
- `jobIdListFilter` - Filter by specific job IDs

#### 3. Implement Caching

**Cache API responses in memory:**
```javascript
const cache = {
    data: null,
    timestamp: null,
    ttl: 60000  // 1 minute
};

function fetchWithCache(url) {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cache.data && cache.timestamp && (now - cache.timestamp) < cache.ttl) {
        console.log('Using cached data');
        return Promise.resolve(cache.data);
    }
    
    // Fetch fresh data
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            cache.data = data;
            cache.timestamp = now;
            return data;
        });
}
```

**Use localStorage for persistent caching:**
```javascript
function getCachedData(key, maxAge) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
    }
    
    return data;
}

function setCachedData(key, data) {
    localStorage.setItem(key, JSON.stringify({
        data: data,
        timestamp: Date.now()
    }));
}
```

#### 4. Use Web Workers for Heavy Processing

**Offload data processing to a worker:**
```javascript
// assets/js/lib/dataWorker.js
self.addEventListener('message', function(e) {
    const { executions, jobs } = e.data;
    
    // Heavy processing happens in worker thread
    const results = processExecutionData(executions, jobs);
    
    self.postMessage({ results: results });
});

// main.js
const worker = new Worker('/path/to/dataWorker.js');

worker.postMessage({ executions: rawData, jobs: jobList });

worker.addEventListener('message', function(e) {
    const results = e.data.results;
    updateUI(results);
});
```

#### 5. Implement Progressive Loading

**Load data in chunks:**
```javascript
async function loadAllExecutions(project, maxDays = 30) {
    const pageSize = 200;  // API max per request
    let offset = 0;
    let allExecutions = [];
    let hasMore = true;
    
    while (hasMore) {
        const url = `/api/project/${project}/executions?max=${pageSize}&offset=${offset}&recentFilter=${maxDays}d`;
        const response = await fetch(url);
        const data = await response.json();
        
        allExecutions = allExecutions.concat(data.executions);
        
        // Show progress to user
        updateProgressBar(allExecutions.length, data.total);
        
        hasMore = data.executions.length === pageSize;
        offset += pageSize;
        
        // Yield to browser to prevent freezing
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return allExecutions;
}
```

#### 6. Debounce User Actions

**Prevent excessive API calls from user input:**
```javascript
let debounceTimer;

function onSearchInput(query) {
    clearTimeout(debounceTimer);
    
    // Wait 300ms after user stops typing
    debounceTimer = setTimeout(() => {
        searchJobs(query);
    }, 300);
}

jQuery('#search-input').on('input', function() {
    onSearchInput(jQuery(this).val());
});
```

#### 7. Implement Request Throttling

**Limit concurrent API requests:**
```javascript
class RequestQueue {
    constructor(maxConcurrent = 3) {
        this.queue = [];
        this.active = 0;
        this.maxConcurrent = maxConcurrent;
    }
    
    async add(requestFn) {
        if (this.active >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        
        this.active++;
        
        try {
            return await requestFn();
        } finally {
            this.active--;
            const next = this.queue.shift();
            if (next) next();
        }
    }
}

const queue = new RequestQueue(3);

// Usage
queue.add(() => fetch('/api/executions/1'));
queue.add(() => fetch('/api/executions/2'));
queue.add(() => fetch('/api/executions/3'));
// Only 3 run concurrently
```

#### 8. Monitor Your Plugin's Performance

**Add performance tracking:**
```javascript
function trackApiCall(url, startTime) {
    const duration = Date.now() - startTime;
    
    console.log(`API Call: ${url}`);
    console.log(`Duration: ${duration}ms`);
    
    if (duration > 2000) {
        console.warn(`Slow API call detected: ${url} took ${duration}ms`);
    }
    
    // Store metrics
    metrics.apiCalls++;
    metrics.totalTime += duration;
    metrics.avgTime = metrics.totalTime / metrics.apiCalls;
}

// Usage
const startTime = Date.now();
fetch(url)
    .then(response => {
        trackApiCall(url, startTime);
        return response.json();
    });
```

### Auto-Refresh Considerations

If your plugin auto-refreshes data, be extra careful:

**Bad - Aggressive refresh:**
```javascript
// DON'T DO THIS - Hammers server every 5 seconds
setInterval(() => {
    fetchAllData();
}, 5000);
```

**Good - Reasonable refresh with user control:**
```javascript
// Default: 60 seconds (configurable by user)
const DEFAULT_REFRESH = 60000;
const refreshInterval = localStorage.getItem('plugin.refreshInterval') || DEFAULT_REFRESH;

let refreshTimer;

function startAutoRefresh() {
    refreshTimer = setInterval(() => {
        // Only refresh if tab is visible
        if (!document.hidden) {
            fetchAllData();
        }
    }, refreshInterval);
}

// Stop refresh when user navigates away
window.addEventListener('beforeunload', () => {
    clearInterval(refreshTimer);
});

// Pause refresh when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(refreshTimer);
    } else {
        startAutoRefresh();
    }
});
```

### Testing at Scale

::: warning Test with Realistic Data Volumes
Your plugin might work fine with 10 jobs but fail with 1000. Always test with production-scale data.
:::

**Recommended test scenarios:**
- Small environment: 10-50 jobs, 100-500 executions
- Medium environment: 100-500 jobs, 1K-10K executions
- Large environment: 1000+ jobs, 50K+ executions
- Enterprise environment: 5000+ jobs, 500K+ executions

**What to monitor:**
- API response times
- Browser memory usage (Chrome DevTools → Memory tab)
- CPU usage in browser (Chrome DevTools → Performance tab)
- Server CPU/memory (watch Rundeck logs and metrics)
- Time to initial render
- Time to interactive

### Performance Checklist

Before releasing your plugin:

- [ ] Minimize number of API calls (batch where possible)
- [ ] Use appropriate query filters and limits
- [ ] Implement caching (memory and/or localStorage)
- [ ] Use Web Workers for heavy processing
- [ ] Implement progressive loading for large datasets
- [ ] Debounce user input actions
- [ ] Throttle concurrent requests
- [ ] Make auto-refresh configurable and reasonable (≥60 seconds)
- [ ] Pause operations when tab is hidden
- [ ] Add performance monitoring/logging
- [ ] Test with production-scale data
- [ ] Monitor server impact during testing
- [ ] Document performance characteristics in README

### When Performance Issues Arise

If users report performance problems:

1. **Gather metrics** - What scale environment? How many jobs/executions?
2. **Profile your code** - Use Chrome DevTools Performance tab
3. **Check API calls** - Network tab shows all requests and timing
4. **Optimize queries** - Add filters, reduce result sets
5. **Add caching** - Especially for data that doesn't change often
6. **Move to workers** - Offload heavy processing
7. **Communicate** - Document known limitations and recommendations

## Example Plugin

Here are some [UI Plugin Examples][example-code].

[uiplugin]: {{$javaDocBase}}/com/dtolabs/rundeck/plugins/rundeck/UIPlugin.html
[knockout]: https://knockoutjs.com/
[jquery]: https://jquery.com/
[example-code]: https://github.com/rundeck-plugins/ui-plugin-examples/
