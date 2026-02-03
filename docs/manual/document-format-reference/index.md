# Document Format Reference

## Overview

Rundeck uses structured document formats for defining Jobs, Resources (Nodes), and Access Control policies. These formats allow you to:

- **Define Jobs as Code**: Create and manage Job definitions in version control
- **Import/Export Jobs**: Share Jobs between projects or Rundeck instances
- **Manage Resources**: Define node inventories programmatically
- **Configure Access Control**: Define security policies in a structured, reviewable format
- **Automate via API**: Programmatically create and update Rundeck configurations

This section provides detailed specifications for each document format, including schema definitions, examples, and version information.

## When to Use These Formats

**Job Definitions:**
- Exporting Jobs from the GUI for backup or version control
- Creating Jobs using the [rd CLI tool](https://rundeck.github.io/rundeck-cli/) or API
- Bulk importing Jobs into projects
- Defining Jobs in CI/CD pipelines

**Resource Model Sources:**
- Defining custom node inventories
- Creating static node definitions
- Building resource model source plugins

**ACL Policies:**
- Defining role-based access controls
- Managing security policies as code
- Controlling access to Projects, Jobs, Nodes, and System functions

## Available Format References

### Job Definitions

Jobs can be defined in XML, YAML, or JSON formats. All three formats support the same features and can be converted between each other.

- **[JOB-XML](job-v20.md)** - XML format for Job definitions (v2.0)
- **[JOB-YAML](job-yaml-v12.md)** - YAML format for Job definitions (v1.2)
- **[JOB-JSON](job-json-v44.md)** - JSON format for Job definitions (v4.4)

**Choose YAML when:**
- Working with configuration as code
- Prioritizing human readability
- Using version control systems
- Most common choice for Job definitions

**Choose XML when:**
- Integrating with XML-based tools
- Working with legacy Job definitions
- Original Rundeck format

**Choose JSON when:**
- Working with REST APIs
- Programmatic Job generation
- Integration with JSON-based tooling

### Resource Model (Node Definitions)

Resources (Nodes) can be defined in JSON, XML, or YAML formats for use with Resource Model Source plugins.

- **[RESOURCE-JSON](resource-json-v10.md)** - JSON format for node definitions (v1.0)
- **[RESOURCE-XML](resource-v13.md)** - XML format for node definitions (v1.3)
- **[RESOURCE-YAML](resource-yaml-v13.md)** - YAML format for node definitions (v1.3)

These formats are used when:
- Creating custom Resource Model Source plugins
- Defining static node inventories
- Importing node data from external systems

### Access Control Policies

- **[ACLPOLICY](aclpolicy-v10.md)** - YAML format for ACL policy definitions (v1.0)

ACL policies define authorization rules for:
- Project access
- Job execution and modification
- Node access
- System-level operations

## Related Documentation

- [Jobs](/manual/jobs/creating-jobs.md) - Creating and managing Jobs
- [Resource Model Sources](/manual/projects/resource-model-sources/) - Node inventory configuration
- [Access Control](/administration/security/authorization.md) - Authorization and ACL policies
- [API Documentation](/api/) - Using document formats with the Rundeck API
- [rd CLI Tool](https://rundeck.github.io/rundeck-cli/) - Command-line interface for Rundeck
