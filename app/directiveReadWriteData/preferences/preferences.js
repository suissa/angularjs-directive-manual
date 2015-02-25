'use strict';

angular.module('myApp.preferences', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preferences', {
    templateUrl: 'directiveReadWriteData/preferences/preferences.html',
    controller: 'PreferencesController'
  });
}])

.controller('PreferencesController', [function() {

}])

.directive('toggle', function() {
  return {
    scope: {
        toggle: '=',
    },
    link: function($scope, element, attrs) {
      $scope.$watch("toggle", function(value) {
        element.toggleClass('active', value)
      });
      angular.element(element).click(function() {
        $scope.$apply(function() {
            $scope.toggle = !$scope.toggle
        });
      });
    } // link
  } // return
})
;