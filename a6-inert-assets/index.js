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
//  >>> curl http://127.0.0.1:1337/1.txt
server.register(Inert, (err) => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public'),
        listing: true
      }
    }
  });
});

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
});
