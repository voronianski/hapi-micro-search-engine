var env = process.env.NODE_ENV || 'development';

var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var _ = require('lodash');

var options = {
    cors: true,
    router: {stripTrailingSlash: true},
    debug: {request: (env === 'test' ? false : ['error'])}
};
var server = module.exports = Hapi.createServer('127.0.0.1', 8000, options);

// Routes
var memory = [];

server.route({
    method: 'POST',
    path: '/dictionary',
    config: {
        validate: {
            payload: Joi.array().min(1).includes(Joi.string())
        },
        handler: function (request, reply) {
            memory = _.uniq(memory.concat(request.payload));
            reply();
        }
    }
});

server.route({
    method: 'GET',
    path: '/search/{string}',
    handler: function (request, reply) {

    }
});

// Do not start server on test environment
if (!module.parent) {
    server.pack.register([Good], function (err) {
        if (err) {
            throw err;
        }
        server.start(function () {
            console.info('Micro search engine server is running at:', server.info.uri);
        });
    });
}
