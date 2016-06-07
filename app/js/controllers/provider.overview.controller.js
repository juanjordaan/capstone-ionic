(function() {
  'use strict';

  angular.module('App')
  .controller('ProviderOverviewController', ProviderOverviewController);

  ProviderOverviewController.$inject = ['dataservice', 'AuthenticationService', '$ionicPopup', '$timeout', '$ionicPlatform'];
  function ProviderOverviewController(dataservice, AuthenticationService, $ionicPopup, $timeout, $ionicPlatform) {
    var vm = this;

    vm.projects = [];
    vm.errors = [];

    dataservice.projectProvider().list({userId:AuthenticationService.user._id}).$promise.then(
      function(response){ vm.projects = response; },
      function(response){
        console.log('error response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;

        $ionicPlatform.ready( function(){
          var tmp = '<ul class="list">';
          for( var error in vm.errors ){
            tmp += '<li class="item"><i class="icon ion-alert"></i> ' + response.data[error] + '</li>';
          }

          tmp += '</ul>';

          $scope.errorPopup = $ionicPopup.alert({
            template : tmp,
            title: 'Errors',
            cssClass: 'styledErrorPopup'
          });

          $scope.closeErrorPopup = function() { $scope.errorPopup.close(); };
        });
      }
    );

    console.log('vm.projects = ' + JSON.stringify(vm.projects, null, '\t'));
  }
})();
