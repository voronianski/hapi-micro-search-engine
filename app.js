var Hapi = require('hapi');

var options = {
    cors: true,
    router: {stripTrailingSlash: true},
    debug: {request: ['error']}
};
var server = Hapi.createServer('127.0.0.1', 8000, options);

server.start(function () {
    console.info('Micro search engine server is running at:', server.info.uri);
});
