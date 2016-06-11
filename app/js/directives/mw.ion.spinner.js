(function () {
  'use strict';

  angular.module('App')
  .directive('mwIonSpinner', mwIonSpinner);

  mwIonSpinner.$inject = ['spinnerService'];
  function mwIonSpinner(spinnerService){
    // console.log('mwIonSpinner');

    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        name: '@?',
        show: '=?',
        imgSrc: '@?',
        register: '@?',
        onLoaded: '&?',
        onShow: '&?',
        onHide: '&?'
      },
      template: [
        '<span ng-show="show">',
        '  <img class="mw-spinner" ng-show="imgSrc" ng-src="{{imgSrc}}" />',
        '  <span ng-transclude></span>',
        '</span>'
      ].join(''),
      controller: function ($scope, spinnerService) {
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        } else {
          $scope.register = !!$scope.register;
        }

        var api = {
          name: $scope.name,
          // console.log('mwIonSpinner name = ' + $scope.name);
          show: function () {
            $scope.show = true;
            console.log('self ' + name + ' show: ' + $scope.show );
          },
          hide: function () {
            $scope.show = false;
            console.log('self ' + name + ' show: ' + $scope.show );
          },
          toggle: function () {
            $scope.show = !$scope.show;
            console.log('self ' + name + ' show: ' + $scope.show );
          }
        };

        if ($scope.register === true) {
          // console.log('mwIonSpinner registering ' + JSON.stringify(api) );
          spinnerService.register(api);
        }

        if ($scope.onShow || $scope.onHide) {
          $scope.$watch('show', function (show) {
            if (show && $scope.onShow) {
              $scope.onShow({
                spinnerService: spinnerService,
                spinnerApi: api
              });
            } else if (!show && $scope.onHide) {
              $scope.onHide({
                spinnerService: spinnerService,
                spinnerApi: api
              });
            }
          });
        }

        if ($scope.onLoaded) {
          $scope.onLoaded({
            spinnerService: spinnerService,
            spinnerApi: api
          });
        }
      }
    }
  }
})();
