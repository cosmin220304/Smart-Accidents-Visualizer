var assert = require('assert'),
    http = require('http');

describe('/', function () {
  it('should return 200 on GET/', function (done) {
    http.get('http://localhost:8128', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  
  it('should return 200 on GET/heatMap', function (done) {
    http.get('http://localhost:8128/heatMap', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });


  it('should return 200 on GET/pieChart', function (done) {
    http.get('http://localhost:8128/pieChart', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });


  it('should return 404 on get/asd', function (done) {
    http.get('http://localhost:8128/asd', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });



});
