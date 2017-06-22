const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

// case-1:
//  >>> curl http://localhost:1337
//  # diff codes with example: a9-plugin-customize
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply(server.plugins.hello.getHello('John'));
  }
});

server.register([
  {register: require('./hello'), options: {}},
  require('blipp'),
], (err) => {
  if(err) {
    throw err;
  }

  server.start((err) => {
    if(err) {
      throw err;
    }
  });

  console.log(`Server running at ${server.info.uri}`);
});
