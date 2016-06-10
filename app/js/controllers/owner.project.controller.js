(function() {
  'use strict';

  angular.module('App')
  .controller('OwnerProjectController', OwnerProjectController);

  OwnerProjectController.$inject = ['dataservice', 'AuthenticationService', '$scope', '$ionicPlatform', '$state', '$ionicPopup'];
  function OwnerProjectController(dataservice, AuthenticationService, $scope, $ionicPlatform, $state, $ionicPopup) {
    var vm = this;

    vm.project = {};
    vm.project.name = '';
    vm.project.owner = AuthenticationService.user._id;
    vm.project.provider = null;
    vm.project.skill = [];
    vm.project.title = '';
    vm.project.description = '';

    // Test Code
    // vm.project.name = 'P14';
    // vm.project.title = 'P14';
    // vm.project.description = 'P14';

    vm.availableSkills = [];

    vm.createProject = createProject;
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

    function createProject(){
      dataservice.projects().post(vm.project).$promise.then(
        function(response){
          $scope.message = 'Project created';
          $ionicPlatform.ready( function () {
            okPopup = $ionicPopup.show({
              templateUrl: 'templates/modals/ok.popup.html',
              scope: $scope,
              title: 'Project'
            });

            $scope.closeOkPopup = function() { okPopup.close(); $state.go('app.ownerOverview'); };
          });
        },
        function(response){
          console.log('response.data = ' + JSON.stringify(response.data));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }
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

    function onValueChanged(value){ vm.project.skill = value; }
  }
})();
