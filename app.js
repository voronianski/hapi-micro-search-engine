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
var server = module.exports = Hapi.createServer(8000, options);

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
    config: {
        validate: {
            params: {
                string: Joi.string().trim()
            }
        },
        handler: function (request, reply) {
            var results = memory
                .map(function (word) {
                    return word.toLowerCase();
                })
                .filter(function (word) {
                    word = String(word);
                    var starts = String(request.params.string).toLowerCase();

                    // latest benchmarks on startsWith implementations - http://jsperf.com/starts-with/15
                    return word.length >= starts.length && word.slice(0, starts.length) === starts;
                });

            reply(results || []);
        }
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
