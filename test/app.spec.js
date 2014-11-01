require('should');

var Lab = require('lab');
var server = require('../app');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;

describe('micro search engine', function () {
    it('should be ok', function (done) {
        server.should.be.ok;
        done();
    });

    describe('when POSTing to /dictionary endpoint with valid data', function () {
        var response;

        before(function (done) {
            server.inject({
                method: 'POST',
                url: '/dictionary',
                payload: ['foo', 'bar', 'Foogazi', 'Blitzkrieg Bop!', 'androids', 'gogofoo']
            }, function (res) {
                response = res;
                done();
            });
        });

        it('return 200 status code', function (done) {
            response.statusCode.should.equal(200);
            done();
        });

        describe('when POSTing doublicates to /dictionary endpoint', function () {
            before(function (done) {
                server.inject({
                    method: 'POST',
                    url: '/dictionary',
                    payload: ['foo', 'bar']
                }, function (res) {
                    response = res;
                    done();
                });
            });

            it('return 200 status code', function (done) {
                response.statusCode.should.equal(200);
                done();
            });

            describe('when GETting existing string with /search endpoint', function () {
                before(function (done) {
                    server.inject({
                        method: 'GET',
                        url: '/search/Foo',
                    }, function (res) {
                        response = res;
                        done();
                    });
                });

                it('return 200 status code', function (done) {
                    response.statusCode.should.equal(200);
                    done();
                });

                it('return array of words that start with "foo"', function (done) {
                    response.result.should.be.an.Array.and.have.length(2);
                    done();
                });

                it('should contain strings that are lowercase and without doublicates', function (done) {
                    response.result[0].should.equal('foo');
                    response.result[1].should.equal('foogazi');
                    done();
                });
            });
        });
    });


    describe('when POSTing to /dictionary endpoint with NON-valid data', function () {
        var response;

        before(function (done) {
            server.inject({
                method: 'POST',
                url: '/dictionary',
                payload: {}
            }, function (res) {
                response = res;
                done();
            });
        });

        it('return 400 status code', function (done) {
            response.statusCode.should.equal(400);
            done();
        });
    });

    describe('when GETting NON-existing string with /search endpoint', function () {
        var response;

        before(function (done) {
            server.inject({
                method: 'GET',
                url: '/search/abracadabra!',
            }, function (res) {
                response = res;
                done();
            });
        });

        it('return 200 status code', function (done) {
            response.statusCode.should.equal(200);
            done();
        });

        it('return an empty array', function (done) {
            response.result.should.be.an.Array.and.have.length(0);
            done();
        });
    });
});
