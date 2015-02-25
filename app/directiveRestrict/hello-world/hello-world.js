'use strict';

angular.module('myApp.directiveRestrict.HelloWorld', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hello-world', {
    templateUrl: 'directiveRestrict/hello-world/hello-world.html',
    controller: 'HelloWorldController'
  });
}])

.controller('HelloWorldController', [function() {

}])

;