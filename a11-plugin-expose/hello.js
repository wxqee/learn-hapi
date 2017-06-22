exports.register = function (server, options, next) {
  const getHello = function(name) {
     const target = name || "world";
     return `Hello ${target}`;
   };

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
      return reply('Hello World from "hello.js"\n');
    }
  });

  server.expose({ getHello: getHello });

  next();
};

exports.register.attributes = {
  name: 'hello'
};
