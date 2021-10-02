var config = {};

//nodejs server app's setting 
config.app = {
  host: 'localhost',
  port: 3000
}

// Two methods:
// mysqlx.getSession() to a single instance
// mysqlx.getClient()  for pooling

//this is the config for getSession()
// use this to create a session in the app
// session = mysqlx.getSession(config.session)
config.session = {
  host:'localhost',
  port: 33060,
  user: 'root',
  password:'SEPHORA2021!'
  schema: 'nihaoma'
};

// or 
// uri = 'mysqlx://root:passwd@localhost:33060/mySchema'
// session = mysqlx.getSession(uri)

// format for uri
// uri = mysqlx://root:passwd@localhost:33060/mySchema
// client = mysqlx.getClient(uri, {pooling})

config.pooling = {
  uri: 'mysqlx://root:SEPHORA2021!@localhost:33060/nihaoma'
  pooling: {enabled: true, maxIdleTime:500, maxSize:25, queueTimeout:500}
}
// use this to create a client in app
// const client = mysql.getClient(config.pooling)

// if use default, can simply do this
// const client = mysqlx.getClient('mysqlx:root@localhost:33060');


module.exports = config;

// Set up mysql connections:
// https://dev.mysql.com/doc/dev/connector-nodejs/8.0/tutorial-Connecting_to_a_Server.html

// Config setup ref: 
// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
// https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app/22365674#22365674