'use strict';

var app = require('../..');
var request = require('supertest');

var newCalculate;

describe('Calculate API:', function() {

  describe('GET /api/calculates', function() {
    var calculates;

    beforeEach(function(done) {
      request(app)
        .get('/api/calculates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          calculates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      calculates.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/calculates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/calculates')
        .send({
          name: 'New Calculate',
          info: 'This is the brand new calculate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCalculate = res.body;
          done();
        });
    });

    it('should respond with the newly created calculate', function() {
      newCalculate.name.should.equal('New Calculate');
      newCalculate.info.should.equal('This is the brand new calculate!!!');
    });

  });

  describe('GET /api/calculates/:id', function() {
    var calculate;

    beforeEach(function(done) {
      request(app)
        .get('/api/calculates/' + newCalculate._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          calculate = res.body;
          done();
        });
    });

    afterEach(function() {
      calculate = {};
    });

    it('should respond with the requested calculate', function() {
      calculate.name.should.equal('New Calculate');
      calculate.info.should.equal('This is the brand new calculate!!!');
    });

  });

  describe('PUT /api/calculates/:id', function() {
    var updatedCalculate

    beforeEach(function(done) {
      request(app)
        .put('/api/calculates/' + newCalculate._id)
        .send({
          name: 'Updated Calculate',
          info: 'This is the updated calculate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCalculate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCalculate = {};
    });

    it('should respond with the updated calculate', function() {
      updatedCalculate.name.should.equal('Updated Calculate');
      updatedCalculate.info.should.equal('This is the updated calculate!!!');
    });

  });

  describe('DELETE /api/calculates/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/calculates/' + newCalculate._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when calculate does not exist', function(done) {
      request(app)
        .delete('/api/calculates/' + newCalculate._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
