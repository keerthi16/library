var supertest = require('supertest'),
    should = require('should');

var server = supertest.agent("localhost:3000" + '/librarian/users');

describe("Librarian: Route", function () {

    describe("create()", function () {

        it("should add a user", function (done) {

            var newRecord = {
                "name": "KiKe",
                "phone": "9916743563"
            };

            server
                .post("/")
                .send(newRecord)
                .expect(200)
                .end(function (err, response) {

                    should.not.exist(err);
                    response.body.error.should.equal(false);

                    done();

                });
        });

        it("should not a user", function (done) {

            var newRecord = {
                "name": "KiKe"
            }

            server
                .post("/")
                .send(newRecord)
                .expect(200)
                .end(function (err, response) {

                    should.not.exist(err);
                    response.body.error.should.equal(true);

                    done();

                });
        });

        it("should get _id user", function (done) {

            server
                .get("/")
                .expect(200)
                .end(function (err, response) {

                    should.not.exist(err);
                    response.body.error.should.equal(false);

                    done();

                });
        });
    });
});

