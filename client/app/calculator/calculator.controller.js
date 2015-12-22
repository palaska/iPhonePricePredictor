'use strict';

angular.module('iPhonePricePredictorApp')
  .controller('CalculatorCtrl', function ($scope, $http) {
    $scope.item ={};
    $scope.price = 0;

    $scope.calculate = function(){
      if($scope.item.memory && $scope.item.guarantee && $scope.item.model && $scope.item.day) {
      $http.post('/api/calculates', $scope.item).then(function(res){
        $scope.price = res.data.data;
        console.log(res);
      }, function(err){
        console.log(err);
      });
      }
    }
  });
