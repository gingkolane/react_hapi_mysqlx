'use strict';

const hapi = require ('@hapi/hapi')
const mysqlx = require('@mysql/xdevapi')
const config = require('./config')

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {

        return 'Hello World! I can use nodemon to automatically refresh pages. ';

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