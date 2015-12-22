/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/calculates              ->  index
 * POST    /api/calculates              ->  create
 * GET     /api/calculates/:id          ->  show
 * PUT     /api/calculates/:id          ->  update
 * DELETE  /api/calculates/:id          ->  destroy
 */

'use strict';

//var _ = require('lodash');
var Calculate = require('./calculate.model');
var csvParse = require('csv-parse'),
    fs = require('fs'),
    LinearRegression = require('shaman').LinearRegression,
    _ = require('underscore');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Creates a new Calculate in the DB
exports.calculate = function(req, res) {
  //console.log(req.body);
  var guess = {};
  var string = req.body.guarantee + "," + req.body.model + "," +req.body.memory + ',' + req.body.day;
  var array = JSON.parse("[" + string + "]");
  fs.readFile('./server/api/calculate/463-sonDATA.csv', 'utf8', function(err, dataStr) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  csvParse(dataStr, {delimiter: ',', auto_parse: true}, function(err, data) {

    var X = data.map(function(r) { return [Number(r[2]), Number(r[3]), Number(r[4]), Number(r[5]), Number(r[6]), Number(r[7])]; });
    var y = data.map(function(r) { return Number(r[0]); });

    // Initialize and train the linear regression
    var lr = new LinearRegression(X, y, {algorithm: 'NormalEquation'});
    lr.train(function(err) {
      if (err) {
        console.log('error', err);
        process.exit(2);
      }

      guess.data = lr.predict(array);
      console.log(guess.data);
      return res.json(guess);
    });
  });
});

};

