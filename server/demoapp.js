// this is the code from oracle engineer tutorial https://www.youtube.com/watch?v=KMoUtQ5acGw
// file name app.js

const config = require('./config')
const hapi = require ('@hapi/hapi')
const mysqlx = require('@mysql/xdevapi')

async function init() {
    const server = hapi.server(config.app)
    const client = await mysqlx.getClient(config.db.srv_host)

 //shared database session
 let session

 server.route([{
         method:'get',
         path:'/',
         handler: async () => {
             session = await client.getSession()

             const schemas = await session.getSchemas()

             return { host: session.insepect().host, schemas: schemas.map(s => s.getName())}
         }, {
             method: 'GET',
             path:'/services',
             handle: async(_,h) => {
                 //return the list of existing services
                 const collection = session.getDefaultSchema().getCollection('services')
                 const res = await collection.find().execute()

                 return res.fetchAll()
             }
         }, {
             method: 'POST', 
             path:'/services',
             handle: async (request, h) => {
                 //create an entry for a new device

                 session = await client.getSession()
                 const collection = session.getDefaultSchema().getCollection('services')
                 await collection.add(request.payload).execute()
                  
                 return h.response().created('http://localhost:3000/services')
             }
         }
 ])


 //connect is released from the pool everytime a response  is sent back
 server.ext({
     type:'onPreResponse',
     method:(_,h) => {
         session && session.close()

         return h.continue
     }
 })

 session = await client.getSession()
 await session.getDefaultSchema().createCollection('services',{reuseExisiting: true})
 await session.close()

 await server.start()
 console.log('server listining on http;??localhost:${config.app.port}')
}

process.on('unhandledRejection',err => {
    console.log(err)
})




var mysqlx = require('mysqlx');

// Connect to server on localhost
var mySession = mysqlx.getSession( {
                host: 'localhost', port: 33060,
                user: 'user', password: 'password' } );

var myDb = mySession.getSchema('test');

// Use the collection 'my_collection'
var myColl = myDb.getCollection('my_collection');

// Specify which document to find with Collection.find() and
// fetch it from the database with .execute()
var myDocs = myColl.find('name like :param').limit(1).
        bind('param', 'L%').execute();

// Print document
print(myDocs.fetchOne());

mySession.close();

const Hapi = require('@hapi/hapi')
const mysqlx = require('@mysql/xdevapi')

const server = hapi.server(config.app)
const client = await mysqlx.getClient(config.db.pooling)

session = await client.getSession()

const schemas = await session.getSchemas()

return { host: session.insepect().host, schemas: schemas.map(s => s.getName())}


 //shared database session
 let session

 const config = require('./config')