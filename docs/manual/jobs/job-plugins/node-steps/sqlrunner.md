# SQL Runner Plugin (Commercial)

The SQL Runner Plugin is a node step plugin that enables direct execution of SQL scripts and commands within your Rundeck workflows. This plugin supports running SQL statements against any database with JDBC connectivity, making it versatile for database automation tasks. Whether you need to perform database updates, run queries, or execute complex SQL scripts, this plugin provides a robust way to integrate database operations into your automation workflows.

![SQL Runner Plugin](/assets/img/sqlrunner-plugin.png)

## Configuration

### Script Configuration

- **Statement Delimiter** (optional)
  : Single character used to define the end of a statement when multiple statements are present
  - Default: '/'
  - Can be overridden in the script using the comment: `-- delimiter = ;`

- **SQL Script Source** (required, choose one)
  - **SQL script path**: File path or URL to the SQL script
    - Supports local files and HTTP(S) URLs
  - **SQL command(s)**: Inline SQL commands
    - Supports option value references (e.g., `${option.tablename}`)
    - Multiple statements supported

:::note
If both script path and inline commands are provided, the plugin will use the script path and ignore the inline commands.
:::

### Database Connection

- **JDBC Driver class name** (required)
  : The full class name of the JDBC driver
  - Example: `org.mariadb.jdbc.Driver`
  - Common drivers:
    - PostgreSQL: `org.postgresql.Driver`
    - MySQL: `com.mysql.jdbc.Driver`
    - MariaDB: `org.mariadb.jdbc.Driver`
    - Oracle: `oracle.jdbc.OracleDriver`
    - Microsoft: `com.microsoft.sqlserver.jdbc.SQLServerDriver`

- **JDBC URL** (required)
  : The complete JDBC connection URL
  - Format varies by database type
  - Examples:
    - PostgreSQL: `jdbc:postgresql://hostname:5432/database`
    - MySQL: `jdbc:mysql://hostname:3306/database`

### Authentication

- **Username** (required)
  : Database connection username

- **Password** (required, choose one method)
  - **Password from key storage**: Securely stored in Rundeck's Key Storage
  - **Direct Password**: Plain text password (not recommended for production)

### Execution Options

- **Auto commit flag**
  : Controls transaction behavior
  - If true, executes `Connection::commit()` after the script
  - Default: false

- **Variables**
  : Comma-separated list of values for prepared statements
  - Replaces `?` placeholders in the SQL script
  - Format: `type:value` or simple `value`
  - Supported types:
    - `boolean`: Boolean values
    - `byte`: Byte values
    - `short`: Short integers
    - `int`: Integers
    - `long`: Long integers
    - `float`: Float numbers
    - `double`: Double numbers
    - `string`: Text strings

- **Output Format**
  : Controls how query results are displayed
  - Options:
    - `text`: Simple text output (default)
    - `table`: CSV-formatted table
    - `json`: JSON format

## Notes and Tips

:::tip
For scripts with multiple statements, you can override the delimiter using a comment at the beginning of your script:

-- delimiter = ;
CREATE TABLE users (...);
INSERT INTO users (...);
:::

:::warning
When using password storage, ensure the key storage path is correctly set and accessible to the Rundeck server.
:::

- Supports both local and URL-based script sources
- Variables can be used for prepared statements to prevent SQL injection
- Results can be formatted as text, CSV tables, or JSON
- Transaction control through auto-commit configuration
- Compatible with any database providing JDBC drivers

## Security Considerations

- Use Key Storage for database passwords instead of plain text
- Consider using prepared statements with variables for dynamic SQL
- Ensure proper database user permissions
- Validate SQL scripts before deployment
