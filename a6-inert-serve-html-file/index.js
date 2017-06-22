const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Hello World\n');
  }
});

// case-1:
//  >>> curl http://127.0.0.1:1337/helloworld
server.register(Inert, (err) => {
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: (request, reply) => {
       const path = Path.join(__dirname, `${request.params.file}.html`);
       console.log(path);
       return reply.file(path);
     }
  });
});

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
});
