### Automated Diagnostics Examples
---

## Databases
#### Introduction
Databases are one of the more common elements that customers choose to run diagnostics against.  Sometimes, the database effectively is the application that is being investigated but more often, the database is one component in a more complex application stack.  In this latter case, the databases is one of several items being checked when diagnosing a problem.

#### Approaches to diagnostics with a database
1. Query services and parse logs on the database’s host node
    In most cases, the database is a service running on a Linux or Windows server.  Through node steps, it is possible to run commands to get status information about the database service.  It is also common to parse logs related to the database to find key error messages.
![](~@assets/img/db1.png)
2. [SQLRunner Plugin](/manual/node-steps/sqlrunner.html#sqlrunner-plugin-enterprise) (Process Automation only)
    The SQLRunner plugin is a node step that can execute a .sql script against a JDBC URL.  This provides a way to get vital diagnostic information directly from the live database.  Currently, this plugin is available only for Process Automation (on premise).
![](~@assets/img/db2.png)