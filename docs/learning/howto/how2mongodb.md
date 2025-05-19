# Managing MongoDB with Runbook Automation

[MongoDB](https://www.mongodb.com/) is a popular NoSQL database that stores data in flexible, JSON-like documents. This guide demonstrates how to use Rundeck's MongoDB Command Step Plugin to automate database operations, manage collections, and integrate MongoDB operations into your automation workflows.

This article assumes you're using Runbook Automation SAAS.  The MongoDB plugins will be fully implmented in version 5.13.0 for the Self Hosted product.

## Prerequisites for This Tutorial

1. **MongoDB Server or MongoDB Atlas account**
   * Either a MongoDB server installation
   * Or a MongoDB Atlas account with a cluster
2. **MongoDB database credentials**
   * Username and password with appropriate permissions
3. **Network access**
   * Ensure Rundeck server can reach your MongoDB instance
4. **PagerDuty Runbook Automation v5.11.1+**

:::tabs
@tab Setting Up the MongoDB Environment

### Local MongoDB Setup Example

First, install MongoDB on your server. For Ubuntu systems:

`sudo apt-get install mongodb`

Next, create an admin user by connecting to MongoDB and running:
```
use admin
db.createUser({
   user: "admin",
   pwd: "securePassword",
   roles: [ "userAdminAnyDatabase" ]
})
```

Then create a sample database and collections:
```
use ecommerce_db
db.products.insertMany([
{
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  stock: 50
},
{
  name: "Smartphone",
  price: 699.99,
  category: "Electronics",
  stock: 100
}
])
```

## Store Password in Key Storage

1. Open Key Storage and save the "securePassword" value from the above set in as a _Password_ value entry named `mongodb`.

@tab Basic Usage Example

## Configuring the MongoDB Command Step

1. Navigate to your job definition and add a new step
2. Select "MongoDB Command" from the step picker
3. Configure the connection settings:

For a basic MongoDB step configuration:

- **Database Deployment:** "MongoDB"
- **Server:** "yourMongoServer"
- **Port:** "27017" (or leave blank as this is the default)
- **Database:** "ecommerce_db"
- **Username:** "admin"
- **Password:** keys/mongodb
- **Command:**
```json
 {
   find: "products",
   filter: { "category": "Electronics" }
 }
```

## Common Use Cases and Examples

### 1. Basic Query Operations

To query all products in a collection:

```json
{
   find: "products",
   filter: {},
   limit: 10
}
```

### 2. Aggregation Pipeline

To calculate total inventory value:

```json
{
aggregate: "products",
pipeline: [
  {
    $group: {
      _id: null,
      totalValue: { 
        $sum: { $multiply: ["$price", "$stock"] }
      }
    }
  }
],
cursor: {}
}
```

### 3. Update Operations

To update product stock levels:
```json
{
update: "products",
updates: [
  {
    q: { name: "Laptop" },
    u: { $set: { stock: 45 } }
  }
]
}
```

@tab Advanced Database Setup

**Please follow the Basic Example first**

Provided below is a multi-step job definition for setting up a complete e-commerce database example. This job will include steps for creating collections, inserting data, and creating indexes.

Assumptions made in the job steps:
- MongoDB host name is configured as `mongodb`
- MongoDB user name is configured as `admin`
- Password is stored in Key Storage at `keys/mongodb`


This job definition includes:

Seven sequential steps that:
- Create and populate the products collection
- Create and populate the customers collection
- Create and populate the orders collection
- Create indexes for all collections
- Verify the setup with a count check

To use this job:

1. Save it as a YAML file (e.g., mongodb-ecommerce-setup.yaml)
1. Import it into your Rundeck instance
1. Ensure the MongoDB password is stored in the specified key storage path
2. Ensure that `mongodb` hostname is resolvable, if not update the steps with the right hostname.
3. Update the mongoHost value to match your MongoDB server
4. Run the job

The job will execute each step in sequence, creating a complete e-commerce database setup. The final step verifies the setup by counting the products collection.

```yaml
- defaultTab: nodes
  description: 'Sets up a complete e-commerce database with products, customers, and orders'
  executionEnabled: true
  group: MongoDB
  id: mongodb-ecommerce-setup
  loglevel: INFO
  name: MongoDB E-Commerce Setup
  nodeFilterEditable: false
  nodefilters:
    dispatch:
      excludePrecedence: true
      keepgoing: false
      rankOrder: ascending
      successOnEmptyNodeFilter: false
      threadcount: '1'
    filter: 'tags: "RUNNER"'
  nodesSelectedByDefault: false
  scheduleEnabled: true
  sequence:
    commands:
      # Step 1: Create Database
      - configuration:
          mongoCommand: |-
            {
              "dropDatabase": 1
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Drop existing database if exists
        nodeStep: true
        type: mongodb-nodestep

      # Step 2: Create Products Collection
      - configuration:
          mongoCommand: |-
            {
              "create": "products"
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Products Collection
        nodeStep: true
        type: mongodb-nodestep

      # Step 3: Insert Products
      - configuration:
          mongoCommand: |-
            {
              "insert": "products",
              "documents": [
                {
                  "name": "Laptop",
                  "price": 999.99,
                  "category": "Electronics",
                  "stock": 50,
                  "specifications": {
                    "brand": "TechBrand",
                    "model": "Pro2024",
                    "ram": "16GB",
                    "storage": "512GB SSD"
                  }
                },
                {
                  "name": "Smartphone",
                  "price": 699.99,
                  "category": "Electronics",
                  "stock": 100,
                  "specifications": {
                    "brand": "MobileX",
                    "model": "X12",
                    "ram": "8GB",
                    "storage": "256GB"
                  }
                },
                {
                  "name": "Coffee Maker",
                  "price": 79.99,
                  "category": "Appliances",
                  "stock": 30,
                  "specifications": {
                    "brand": "HomeBrew",
                    "model": "CM100",
                    "capacity": "12 cups"
                  }
                }
              ]
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Insert Products
        nodeStep: true
        type: mongodb-nodestep

      # Step 4: Create Customers Collection
      - configuration:
          mongoCommand: |-
            {
              "create": "customers"
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Customers Collection
        nodeStep: true
        type: mongodb-nodestep

      # Step 5: Insert Customers
      - configuration:
          mongoCommand: |-
            {
              "insert": "customers",
              "documents": [
                {
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@email.com",
                  "address": {
                    "street": "123 Main St",
                    "city": "Boston",
                    "state": "MA",
                    "zipCode": "02108"
                  },
                  "phoneNumber": "555-0123"
                },
                {
                  "firstName": "Jane",
                  "lastName": "Smith",
                  "email": "jane.smith@email.com",
                  "address": {
                    "street": "456 Oak Ave",
                    "city": "Chicago",
                    "state": "IL",
                    "zipCode": "60601"
                  },
                  "phoneNumber": "555-0124"
                }
              ]
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Insert Customers
        nodeStep: true
        type: mongodb-nodestep

      # Step 6: Create Orders Collection
      - configuration:
          mongoCommand: |-
            {
              "create": "orders"
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Orders Collection
        nodeStep: true
        type: mongodb-nodestep

      # Step 7: Create Indexes
      - configuration:
          mongoCommand: |-
            {
              "createIndexes": "products",
              "indexes": [
                {
                  "key": { "name": 1 },
                  "name": "idx_product_name"
                },
                {
                  "key": { "category": 1 },
                  "name": "idx_product_category"
                }
              ]
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Product Indexes
        nodeStep: true
        type: mongodb-nodestep

      - configuration:
          mongoCommand: |-
            {
              "createIndexes": "customers",
              "indexes": [
                {
                  "key": { "email": 1 },
                  "name": "idx_customer_email",
                  "unique": true
                }
              ]
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Customer Indexes
        nodeStep: true
        type: mongodb-nodestep

      - configuration:
          mongoCommand: |-
            {
              "createIndexes": "orders",
              "indexes": [
                {
                  "key": { "orderId": 1 },
                  "name": "idx_order_id",
                  "unique": true
                },
                {
                  "key": { "customerId": 1 },
                  "name": "idx_customer_id"
                }
              ]
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Create Order Indexes
        nodeStep: true
        type: mongodb-nodestep

      # Step 8: Verify Setup
      - configuration:
          mongoCommand: |-
            {
              "find": "products",
              "limit": 1
            }
          mongoDatabase: ecommerce_db
          mongoHost: mongodb
          mongoType: MongoDB
          mongoUser: admin
          outputMode: RELAXED
          passwordStoragePath: keys/mongodb
        description: Verify Products
        nodeStep: true
        type: mongodb-nodestep

    keepgoing: false
    strategy: node-first
  tags: 'ecommerce,mongodb,setup'
  uuid: mongodb-ecommerce-setup
```

## Best Practices

1. **Security**
   * Store MongoDB passwords in Rundeck's Key Storage
   * Use specific database users with minimum required permissions
   * Enable SSL/TLS for database connections

2. **Error Handling**
   * Add error handlers to your jobs
   * Use job references for common error scenarios
   * Log important database operations

3. **Performance**
   * Use appropriate indexes for your queries
   * Limit result sets when possible
   * Use projection to retrieve only needed fields

@tab Troubleshooting

Common issues and solutions:

1. **Connection Failed**
   * Verify network connectivity
   * Check credentials
   * Confirm port accessibility

2. **Command Execution Errors**
   * Validate JSON syntax
   * Check collection names
   * Verify user permissions

3. **Performance Issues**
   * Review query structure
   * Check for missing indexes
   * Monitor connection pool settings

:::

:::tip
When working with MongoDB Atlas, ensure your Rundeck server's IP address is whitelisted in the Atlas network access settings.
:::

## Additional Resources

* [MongoDB Command Reference](https://www.mongodb.com/docs/manual/reference/command/)
* [MongoDB Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)
* [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)