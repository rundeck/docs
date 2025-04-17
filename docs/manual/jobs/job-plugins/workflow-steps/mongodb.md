# MongoDB Command Step Plugin

The MongoDB Command Step plugin allows you to execute MongoDB commands and queries directly from your Rundeck workflows. MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents, making it ideal for applications that need to handle diverse and changing data structures. Unlike traditional relational databases, MongoDB's document model allows for nested data structures, arrays, and dynamic schemas. This plugin supports both standard MongoDB deployments and MongoDB Atlas (MongoDB's cloud database service), giving you the flexibility to interact with your MongoDB databases through Rundeck jobs. Whether you need to query collections, perform aggregations, update documents, or manage database operations, this plugin provides a straightforward way to integrate MongoDB operations into your automation workflows.

![MongoDB Command Runner](/assets/img/relnotes-511-mongo.png)<br>

## Configuration

### Connection Options

- **Database Deployment** (required)
  : Choose between "MongoDB" (standard deployment) or "MongoDB Atlas"
- **MongoDB Server** (required)
  : The hostname of your MongoDB server
  - For standard MongoDB: hostname or IP address
  - For MongoDB Atlas: cluster hostname (e.g., "cluster0.xxx.mongodb.net")
- **Port**
  : Database connection port (defaults to 27017)
  - Note: This parameter is ignored when using MongoDB Atlas
- **Database name** (required)
  : The name of the database you want to connect to

### Authentication

- **Username**
  : MongoDB username for authentication
- **Password from key storage**
  : The password for authentication, stored securely in Rundeck's Key Storage
- **Auth Source**
  : Optional database name associated with the user's credentials. See MongoDB [Authentication Options Documentation](https://www.mongodb.com/docs/manual/reference/connection-string-options/#mongodb-urioption-urioption.authSource)

### Command Execution

- **MongoDB Command** (required)
  : The MongoDB command or query to execute on the selected database
  - Default template:
    ```json
    {
      find: "collection_name",
      filter: {"key1":"value1"}
    }
    ```
  - For more command examples, see the [MongoDB Command Reference](https://www.mongodb.com/docs/manual/reference/command/)

### Output Configuration

- **Output Mode**
  : Choose the JSON representation format for the command results
  - Options: "RELAXED" (default) or "EXTENDED"
  - See [Extended-JSON Specification](https://github.com/mongodb/specifications/blob/master/source/extended-json/extended-json.md) for details

## Example Usage

### Basic Find Command
```json
{
  find: "users",
  filter: { "active": true }
}
```

### Error Handling
The plugin handles various types of errors and provides clear error messages for:

- Authentication failures
- Connection issues
- Invalid commands
- Database errors
- Error messages will be logged in the Rundeck execution output with appropriate context.


### Notes
- Supports both standard MongoDB deployments and MongoDB Atlas
- Commands are executed using the official MongoDB Java driver.  Here is a [reference page for the available commands](https://www.mongodb.com/docs/manual/reference/command/).
- Results are formatted in JSON.

:::tip
When using MongoDB Atlas, make sure your network/security settings allow connections from your Rundeck server's IP address.
:::