const Hapi = require('hapi');
const Blipp = require('blipp');
const HapiLevel = require('hapi-level');
const UserStore = require('./user-store.js');
const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1'});

// Test Case 1:
// $ curl -H 'Content-Type: application/json' -d '{"userName": "wxqee", "age": 30}' http://localhost:1337/user
// {"id":"47a22fa7-2f9b-4386-affa-080219bed127","details":{"userName":"wxqee","age":30}}
// $ curl http://localhost:1337/user/47a22fa7-2f9b-4386-affa-080219bed127
// {"id":"47a22fa7-2f9b-4386-affa-080219bed127","details":{"userName":"wxqee","age":30}}

server.register([
  {
    register: HapiLevel,
    options: {
      config: {
        valueEncoding: 'json'
      }
    }
  },
  UserStore,
  Blipp
], (err) => {
  server.start(err => {
    console.log(`Server running at ${server.info.uri}`);
  });
});
