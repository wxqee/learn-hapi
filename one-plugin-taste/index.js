const Hapi = require('hapi');
const Blipp = require('blipp');                     // [1]
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Hello World\n');
  }
});

server.register(Blipp, (err) => {
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
