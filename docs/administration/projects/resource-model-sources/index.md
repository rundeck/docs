# Node Model Sources

The Resource model source is a way to share information about your infrastructure to Rundeck as Nodes.

Resource model data is a set of Node descriptors, each with a uniquely identifying name. In addition to Name, some pieces of metadata are required (like `hostname`, and `username`), and some are optional.

Rundeck can integrate with external data by configuring the use of _Providers_ or _Sources_. Providers are third-party services or systems that export data that Rundeck can import. Additionally, Rundeck supports an external Editor for Node data.

Rundeck makes use of common data formats (XML, JSON & YAML). Third-party software may produce these formats natively, however it is typical to have to massage the output of one system into the appropriate format to be consumed by Rundeck. Since URLs and HTTP are a lowest-common-denominator for communication, Rundeck only requires that the data Providers make this data available as a file at a URL or on the local disk.
