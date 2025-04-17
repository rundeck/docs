# Managing MongoDB with Runbook Automation

[MongoDB](https://www.mongodb.com/) is a popular NoSQL database that stores data in flexible, JSON-like documents. This guide demonstrates how to use Rundeck's MongoDB Command Step Plugin to automate database operations, manage collections, and integrate MongoDB operations into your automation workflows.

This article assumes you're using PagerDuty Process Automation (formerly Rundeck Enterprise) version 5.11.1 or later.

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
   user: "root",
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
- **Username:** "root"
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
- MongoDB user name is configured as `root`
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
1. Update the mongoHost value to match your MongoDB server
1. Run the job

The job will execute each step in sequence, creating a complete e-commerce database setup. The final step verifies the setup by counting the products collection.

```yaml
- defaultTab: nodes
  description: 'Sets up a complete e-commerce database with products, customers, and orders'
  executionEnabled: true
  group: MongoDB
  loglevel: INFO
  name: MongoDB E-Commerce Setup
  nodeFilterEditable: false
  plugins:
    ExecutionLifecycle: {}
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    # Step 1: Create and populate products collection
    - configuration:
        mongoCommand: |-
          {
            insert: "products",
            documents: [
              {
                name: "Laptop",
                price: 999.99,
                category: "Electronics",
                stock: 50,
                specifications: {
                  brand: "TechBrand",
                  model: "Pro2024",
                  ram: "16GB",
                  storage: "512GB SSD"
                }
              },
              {
                name: "Smartphone",
                price: 699.99,
                category: "Electronics",
                stock: 100,
                specifications: {
                  brand: "MobileX",
                  model: "X12",
                  ram: "8GB",
                  storage: "256GB"
                }
              },
              {
                name: "Coffee Maker",
                price: 79.99,
                category: "Appliances",
                stock: 30,
                specifications: {
                  brand: "HomeBrew",
                  model: "CM100",
                  capacity: "12 cups"
                }
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Products Collection
      nodeStep: false
      type: mongodb

    # Step 2: Create and populate customers collection
    - configuration:
        mongoCommand: |-
          {
            insert: "customers",
            documents: [
              {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@email.com",
                address: {
                  street: "123 Main St",
                  city: "Boston",
                  state: "MA",
                  zipCode: "02108"
                },
                phoneNumber: "555-0123"
              },
              {
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@email.com",
                address: {
                  street: "456 Oak Ave",
                  city: "Chicago",
                  state: "IL",
                  zipCode: "60601"
                },
                phoneNumber: "555-0124"
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Customers Collection
      nodeStep: false
      type: mongodb

    # Step 3: Create and populate orders collection
    - configuration:
        mongoCommand: |-
          {
            insert: "orders",
            documents: [
              {
                orderId: "ORD001",
                customerId: { $db.customers.findOne({email: "john.doe@email.com"})._id },
                orderDate: new Date("2024-04-17"),
                items: [
                  {
                    productId: { $db.products.findOne({name: "Laptop"})._id },
                    quantity: 1,
                    price: 999.99
                  }
                ],
                totalAmount: 999.99,
                status: "completed"
              },
              {
                orderId: "ORD002",
                customerId: { $db.customers.findOne({email: "jane.smith@email.com"})._id },
                orderDate: new Date("2024-04-16"),
                items: [
                  {
                    productId: { $db.products.findOne({name: "Smartphone"})._id },
                    quantity: 1,
                    price: 699.99
                  },
                  {
                    productId: { $db.products.findOne({name: "Coffee Maker"})._id },
                    quantity: 1,
                    price: 79.99
                  }
                ],
                totalAmount: 779.98,
                status: "processing"
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Orders Collection
      nodeStep: false
      type: mongodb

    # Step 4: Create indexes for products
    - configuration:
        mongoCommand: |-
          {
            createIndexes: "products",
            indexes: [
              {
                key: { name: 1 },
                name: "idx_product_name"
              },
              {
                key: { category: 1 },
                name: "idx_product_category"
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Product Indexes
      nodeStep: false
      type: mongodb

    # Step 5: Create indexes for customers
    - configuration:
        mongoCommand: |-
          {
            createIndexes: "customers",
            indexes: [
              {
                key: { email: 1 },
                name: "idx_customer_email",
                unique: true
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Customer Indexes
      nodeStep: false
      type: mongodb

    # Step 6: Create indexes for orders
    - configuration:
        mongoCommand: |-
          {
            createIndexes: "orders",
            indexes: [
              {
                key: { orderId: 1 },
                name: "idx_order_id",
                unique: true
              },
              {
                key: { customerId: 1 },
                name: "idx_customer_id"
              }
            ]
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Create Order Indexes
      nodeStep: false
      type: mongodb

    # Step 7: Verify setup with collection counts
    - configuration:
        mongoCommand: |-
          {
            aggregate: "products",
            pipeline: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 }
                }
              }
            ],
            cursor: {}
          }
        mongoDatabase: ecommerce_db
        mongoHost: mongodb
        mongoType: MongoDB
        mongoUser: root
        outputMode: RELAXED
        passwordStoragePath: keys/mongodb
      description: Verify Products Count
      nodeStep: false
      type: mongodb

    keepgoing: false
    strategy: node-first
  tags: mongodb,ecommerce,setup
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