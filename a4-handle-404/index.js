const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Hello World\n');
  }
});

server.route({
  method: '*',
  path: '/{p*}',
  handler: (request, reply) => {
    return reply(`The page /${request.params.p} was not found\n`).code(404);
  }
});

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
});
