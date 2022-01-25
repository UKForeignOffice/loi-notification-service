var expect  = require("chai").expect;
var request = require("request");

before("Run Server", function (done) {
    server = require("../../server").getApp;
    done();
});

describe("Healthcheck is working", function() {

    describe("GET /healthcheck", function() {

        var url = "http://localhost:1234/api/notification/healthcheck";

        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("JSON body is correct", function(done) {
            request(url, function(error, response, body) {
                expect(body).to.contain('"message":"Notification Service is running"')
                done();
            });
        });

    });

});
