exports.register = function (server, options, next) {
  console.log('plugin[database]: do some database initialization here.');
  next();
};

exports.register.attributes = {
  name: 'database'
};
