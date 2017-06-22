exports.register = function (server, options, next) {
  //notice: defined dependencies in attributes instead in this example.
  // server.dependency('database', (server, after) => {
  //   // Can do some dependency logic here.
  //   return after();
  // });

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
  name: 'hello',
  dependencies: ['database']
};
