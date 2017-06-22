const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const server = new Hapi.Server();
server.connection({ port: 8080 });
server.register(Inert, (err) => {

  /*
  == Case 1 ==

  $ curl http://localhost:8080/
  <h1>index.html</h1>
   
  <p>Go to <a href="about.html">about.html</a></p>

  == Case 2 ==

  $ curl http://localhost:8080/about
  <h1>Page not found</h1>

  == Case 3 ==

  $ curl http://localhost:8080/about.html
  <h1>about.html</h1>
  */

  // serve static html and image files
  server.route({
    method: 'GET',
    path: '/{files*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public')
      }
    }
  });

  // return not found page if handler returns a 404
  server.ext('onPostHandler', function (request, reply) {
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 404) {
      return reply.file(Path.join(__dirname, '404.html')).code(404);
    }
    return reply.continue();
  });

  server.start((err) => {
    console.log(`Server running at: ${server.info.uri}`);
  });
});
