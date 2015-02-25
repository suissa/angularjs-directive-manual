'use strict';

angular.module('myApp.photo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/photo', {
    templateUrl: 'directiveBindings/photo/photo.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}])

.directive('photo', function() {
  return {
    restrict: 'AE',
    templateUrl: 'directiveBindings/photo/template.html',
    replace: true,
    // passa os valores abaixo a partir dos 
    // atributos da diretiva para o scope do template
    scope: {
      caption: '@',
      photoSrc: '@'
    }
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