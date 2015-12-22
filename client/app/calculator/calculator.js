'use strict';

angular.module('iPhonePricePredictorApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/calculator', {
        templateUrl: 'app/calculator/calculator.html',
        controller: 'CalculatorCtrl'
      });
  });
