(function() {
  'use strict';

  angular.module('App')
  .controller('ProviderSearchController', ProviderSearchController);

  ProviderSearchController.$inject = ['$scope', 'dataservice', 'AuthenticationService', '$ionicModal', '$ionicPlatform', '$ionicPopup', 'spinnerService'];
  function ProviderSearchController($scope, dataservice, AuthenticationService, $ionicModal, $ionicPlatform, $ionicPopup, spinnerService) {
    var vm = this;
    vm.projects = [];
    vm.showBidForm = showBidForm;

    $scope.closeBidForm = closeBidForm;
    $scope.doBid = doBid;
    $scope.bid = {};
    $scope.bid.project = [];
    $scope.bid.comment = '';

    vm.errors = [];
    var okPopup;

    console.log('userId = ' + AuthenticationService.user._id);
    spinnerService.showAll();
    dataservice.projectsOpen().list({'userId':AuthenticationService.user._id}).$promise.then(
      function(response){
        vm.projects = response;
        console.log('vm.projects = ' + JSON.stringify(vm.projects, null, '\t'));
        spinnerService.hideAll();
      },
      function(response){
        console.log('error response.data = ' + JSON.stringify(response.data));
        vm.errors = response.data;
        spinnerService.hideAll();

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

    $ionicModal.fromTemplateUrl(
      'templates/modals/provider.bid.html',
      function(modal) { vm.bidForm = modal; },
      { scope: $scope, animation: 'slide-in-left', }
    );

    function closeBidForm(){ vm.bidForm.hide(); }
    function showBidForm(project) { $scope.bid.project = project; vm.bidForm.show(); };
    function doBid(){
      spinnerService.showAll();
      dataservice.projectBid().post({'id': $scope.bid.project._id}, {'bidder':AuthenticationService.user, 'comment':$scope.bid.comment}).$promise.then(
        function(response){
          $scope.message = 'Your bid has been registered.';
          spinnerService.hideAll();

          $ionicPlatform.ready( function(){
            okPopup = $ionicPopup.show({
              templateUrl: 'templates/modals/ok.popup.html',
              scope: $scope,
              title: 'Bid'
            });

            $scope.closeOkPopup = function() { okPopup.close(); closeBidForm(); };
          });
        },
        function(response){
          console.log('error response.data = ' + JSON.stringify(response.data));
          vm.errors = response.data;
          spinnerService.hideAll();

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
    }
  }
})();
