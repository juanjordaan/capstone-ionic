(function() {
  'use strict';

  angular.module('App')
  .controller('ProviderOverviewController', ProviderOverviewController);

  ProviderOverviewController.$inject = ['dataservice', 'AuthenticationService', '$ionicPopup', '$timeout', '$ionicPlatform', 'SpinnerService'];
  function ProviderOverviewController(dataservice, AuthenticationService, $ionicPopup, $timeout, $ionicPlatform, SpinnerService) {
    var vm = this;

    vm.projects = [];
    vm.errors = [];
    $scope.mainSpinner = SpinnerService.isShow();

    $scope.mainSpinner = SpinnerService.show();
    dataservice.projectProvider().list({userId:AuthenticationService.user._id}).$promise.then(
      function(response){
        vm.projects = response;
        $scope.mainSpinner = SpinnerService.hide();
      },
      function(response){
        console.log('error response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;
        $scope.mainSpinner = SpinnerService.hide();

        $ionicPlatform.ready( function(){
          var tmp = '<ul class="list">';
          for( var error in vm.errors ){
            tmp += '<li class="item"><i class="icon ion-alert"></i> ' + response.data[error] + '</li>';
          }

          tmp += '</ul>';

          $scope.errorPopup = $ionicPopup.alert({
            template : tmp,
            title: 'Errors',
            cssClass: 'errorPopup'
          });

          $scope.closeErrorPopup = function() { $scope.errorPopup.close(); };
        });
      }
    );

    console.log('vm.projects = ' + JSON.stringify(vm.projects, null, '\t'));
  }
})();
