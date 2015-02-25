'use strict';

angular.module('myApp.collection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/collection', {
    templateUrl: 'directiveBindings/collection/collection.html',
    controller: 'CollectionController'
  });
}])

.controller('CollectionController', ['$scope', function($scope) {
  $scope.members = [
    {name: 'Suissa'}
  , {name: 'Doug Crocks'}
  , {name: 'Max Lovecats'}
  ];
}])

.directive('collection', function () {
  return {
    restrict: "AE",
    scope: {
      collection: '='
    },
    templateUrl: 'directiveBindings/collection/template.html'
  }
})

.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
})
;