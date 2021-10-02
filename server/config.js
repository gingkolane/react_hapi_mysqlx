const { getClient } = require("@mysql/xdevapi");

var config = {};

//nodejs server app's setting 
config.app = {
  host: 'localhost',
  port: 3000
}

// connection module is an object that defines connection configuration properties
// https://dev.mysql.com/doc/dev/connector-nodejs/8.0/module-Connection.html
config.connection = {
  host:'localhost',
  port: 33060,
  user: 'root',
  password:'xxxxx',
  schema: 'nihaoma'  //default database to connect to (defaults to '')
};

// connection properties can be written together in an url format
config.connectionUrl = 'mysqlx://root:xxxxx@localhost:33060/nihaoma'

// Connection pool is an object that describes the pool configuration properties.
// https://dev.mysql.com/doc/dev/connector-nodejs/8.0/module-ConnectionPool.html
config.connectionPool = { 
  pooling: { 
    enabled: true, 
    maxIdleTime:500, 
    maxSize:25, 
    queueTimeout:500
  }
}

// Two ways to make mysql database connection using mysqlx api

// ====== use getSession() to connect to a single instance

// session = mysqlx.getSession(config.connection)

// or 
// session = mysqlx.getSession(config.connectionUrl)

// if default schema is defined: 
// schema = mysqlx.getSession(config.connection)

// ========= use getClient() to connect to a connection pool
// const client = mysqlx.getClient(config.connectionUrl,config.connectionPool);

// if use default pool properties, can simply do this
// const client = mysqlx.getClient(config.connectionUrl);

module.exports = config;

// Set up mysql connections:
// https://dev.mysql.com/doc/dev/connector-nodejs/8.0/tutorial-Connecting_to_a_Server.html

// Config setup ref: 
// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
// https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app/22365674#22365674