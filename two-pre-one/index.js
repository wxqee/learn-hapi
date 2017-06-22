const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

const routePrequesite = {
  method: function() {
    return 'pre1_value';
  },
  assign: 'm1'
};

server.route({
  method: 'GET',
  path: '/',
  config: {
    description: 'Return an object with hello message',
    pre: [routePrequesite],
    handler: (request, reply) => {
      return reply({
        message: 'hello',
        m1: request.pre.m1
      });
    }
  },
});

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
});
