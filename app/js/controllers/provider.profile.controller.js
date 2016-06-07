(function() {
  'use strict';

  angular.module('App')
  .controller('ProviderProfileController', ProviderProfileController);

  ProviderProfileController.$inject = ['dataservice', 'AuthenticationService', '$scope', '$ionicPopup', '$ionicPlatform'];
  function ProviderProfileController(dataservice, AuthenticationService, $scope, $ionicPopup, $ionicPlatform) {
    var vm = this;

    vm.skills = [];
    vm.availableSkills = [];

    vm.updateSkills = updateSkills;
    vm.onValueChanged = onValueChanged;

    vm.errors = [];
    var okPopup;

    dataservice.skills().list().$promise.then(
      function(response){ vm.availableSkills = response; },
      function(response){
        console.log('response.data = ' + JSON.stringify(response.data));
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

    dataservice.userSkills().list({'userId':AuthenticationService.user._id}).$promise.then(
      function(response){
        vm.skills = response;
        // console.log('skills = ' + JSON.stringify(vm.skills, null, '\t'));
        for(var s in vm.skills ){
          for(var as in vm.availableSkills){
            if(vm.availableSkills[as].name === vm.skills[s].name){
              console.log('availableSkills/skills match');
              vm.availableSkills[as].checked=true;
              break;
            }
          }
        }
      },
      function(response){
        console.log('response = ' + JSON.stringify(response));
        vm.errors = response.data;
        console.log('vm.errors = ' + JSON.stringify(vm.errors));

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

    function updateSkills(){
      dataservice.userSkills().put({'userId':AuthenticationService.user._id}, vm.skills).$promise.then(
        function(response){
          $scope.message = 'Your skills have been updated.';
          $ionicPlatform.ready( function () {
            okPopup = $ionicPopup.show({
              templateUrl: 'templates/modals/ok.popup.html',
              scope: $scope,
              title: 'Skills'
            });

            $scope.closeOkPopup = function() { okPopup.close(); };
          });
        },
        function(response){
          vm.errors = response.data;
          console.log('vm.errors = ' + JSON.stringify(vm.errors));

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
    }

    function onValueChanged(value){ vm.skills = value; }
  }
})();
