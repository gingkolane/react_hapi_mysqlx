'use strict';

const config = require('./config.js')
const hapi = require ('@hapi/hapi')
const mysqlx = require('@mysql/xdevapi')

const init = async () => {

  const server = hapi.server(config.app)
  //create a connection pool
  const client = mysqlx.getClient(config.connectionUrl, config.connectionPool)

  server.route({
      method: 'GET',
      path: '/',
      handler: async () => {

        // get a session from the connection pool using client, 
        // must have a session variable defined.         // Note: getDefaultSchema() is a method of session, must be used on a session.
        const session = await client.getSession()
        
        // get users array from 'users' table
        const usersTable = await session.getDefaultSchema().getTable('users')

        const userRows = await usersTable.select().execute()

        // const userFirst= await userRows.fetchOne()

        const userArr = await userRows.fetchAll()

        const foundUser = usersTable.select().where('username like :username').bind('username', 'Oliver').execute()

        console.log("host:", session.inspect(),userRows, userArr, foundUser);

        return { 
            host: session.inspect(), 
            // usersTable: usersTable, 
            userRows: userRows, 
            // userFirst: userFirst,
            userArr: userArr,
            foundUser: foundUser
        } 

      }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
  };

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();