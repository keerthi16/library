var supertest = require('supertest'),
    should = require('should');

var server = supertest.agent("localhost:3000" + '/user');

describe("User: Route", function () {

    describe("create()", function () {

        it("should get _id user", function (done) {

            server
                .get("/")
                .expect(200)
                .end(function (err, response) {

                    done();

                });
        });
    });
});

