exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
      return reply('Hello World from "hello.js"\n');
    }
  });
  next();
};

exports.register.attributes = {
  name: 'hello'
};
