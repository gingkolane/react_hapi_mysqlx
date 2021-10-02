var config = {};

//nodejs server app's setting 
config.app = {
  host: 'localhost',
  port: 3000
}

config.db = {}
//this is the config for connecting to the mysql database
config.db.session = {
  host:'localhost',
  port: 33060,
  user: 'root',
  password:'SEPHORA2021!'
};
// use this to create a session in the app
// session = mysqlx.getSession(url)


// this is setting for pooling
config.db.pooling = {
  url: 'mysqlx://root:SEPHORA2021!@localhost:33060/server',
  pooling: {enabled: true, maxIdleTime:500, maxSize:25, queueTimeout:500}
}

// use this to create a client in app
// client = mysqlx.getClient(url, {pooling})


module.exports = config;

// ref: 
// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
// https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app/22365674#22365674