const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

// Defines new handler for routes on this server
server.handler('hello', (route, options) => {
  return function (request, reply) {
    const hello = options.customHello || 'Hello';
    const name = request.params.name;
    return reply(`${hello} ${name}`);
  };
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Hello World\n');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: {
    hello: {
      customHello: 'Welcome'
    }
  }
});

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
});
