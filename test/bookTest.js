var supertest = require('supertest'),
    should = require('should');

var server = supertest.agent("localhost:3000" + '/books');

describe("Book: Route", function () {

    describe("create()", function () {

        it("should add a book", function (done) {

            var newRecord = {
                bookName: 'KiKe',
                author: 'Keerthi',
                link: 'kike.o.in',
                location: 'Science'
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

        it("should add all book", function (done) {

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

