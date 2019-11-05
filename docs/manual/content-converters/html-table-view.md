# HTML Table View Converter

Note: this plugin accepts Intermediate data types and produces `text/html`

Renders structured data as a Table in HTML. The input should be a List or Map. If the List
contains Maps, the first item's keys will be the table headers.

::: tip 
See: [Sanitized HTML Output](/manual/content-converters/index.md#sanitized-html-output)
:::

## Input Data Types

These are Intermediate data types, such as Java Collection types. These types are produced by other plugins, see [Related Plugins].

- `application/x-java-map-list` + `List<Map>` \* Renders a Table, using the keys of the first Map in the list as the Table headers.
- `application/x-java-col-list` + `List` \* Renders a Table, using the first item in the list as a list of Table headers. Each subsequent item is a row, as a Collection of objects, and
  each object will be rendered in a table cell, recursively if it is a List or Map.
- `application/x-java-map` + `Map` \* Renders a table with `Key` and `Value` headers, where each map entry is a row. Recursively renders values that are List or Map type.
- `application/x-java-list` + `List` \* Renders a table without headers, with a row for each item. The first column indicates the numeric index, and the second column
  renders the item, recursively for List or Map types.
- `application/x-java-map-or-list` + `Map` or `List` \* Used to accept an input type that could be either a List or Map.

## Output Data Types

- `text/html` - `String`

## Options

These metadata values can be set in the Log metadata with a prefix of `content-meta:`:

- `css-class` - CSS class to use for Table
- `table-title` - Title to use for Table

## Related Plugins

- [JSON](/manual/content-converters/json.md)
- [Properties](/manual/content-converters/properties.md)
- [Tabular Data](/manual/content-converters/tabular-data.md)
