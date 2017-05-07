const hapi = require('hapi'),
      http2 = require('http2'),
      fs = require('fs');

let options = {
  key: fs.readFileSync(__dirname + '../../certificate/server.key'),
  cert:  fs.readFileSync(__dirname + '../../certificate/server.crt')
};

const server = new hapi.Server();
server.connection({
  listener: http2.createServer(options),
  host: 'localhost',
  port: 3333,
  tls: true
});

server.route({
  method: 'GET',
  path:'/',
  handler: (req, res) => {
    return res('Serving using HTTP2!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
