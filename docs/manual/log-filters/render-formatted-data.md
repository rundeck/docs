# Render Formatted Data

Allows marking formatted data as a certain data type, for rendering in the Log Output.

Some supported datatypes:

- `application/json` [JSON][] (synonyms: `json`)
- `application/x-java-properties` [Java Properties][] (synonyms: `properties`)
- `text/csv` CSV (synonyms: `csv`)
- `text/html` HTML (synonyms: `html`)
- `text/x-markdown` [Markdown][] (synonyms: `markdown`,`md`)

[json]: http://json.org
[markdown]: https://en.wikipedia.org/wiki/Markdown
[java properties]: https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#load(java.io.Reader)

To mark a section of output with a datatype, echo this marker defining it:

    #BEGIN:RUNDECK:DATATYPE:<datatype>

Replacing `<datatype>` with one of the supported data types.

You can mark the section as ending by echoing:

    #END:RUNDECK:DATATYPE

Otherwise, when the step ends the plugin will treat it as ended.

You can also choose a value for the `Data Type` property, to preset
a datatype to use for the entire output log data. If this is set, then
no "BEGIN" marker is looked for.

The data can then be rendered in the Rundeck Log output GUI.
The specific renderer for the data type is determined by available
ViewConverter plugins.

For example, you can emit JSON data, and prefix it with:

    echo #BEGIN:RUNDECK:DATATYPE:application/json

Then emit json data (only)

    cat file.json

Then END the datatype:

    echo #END:RUNDECK:DATATYPE

The log output will then capture all of the JSON data in a single
log event, and mark it as `application/json` data type.

### Configuration

Data type
: Enter a data type to use by default for all output from the
step. If not set, the BEGIN and END markers will be looked for.

### See Also

- (/manual/content-converters/index.md)
