(function() {
  'use strict';

  angular.module('App')
  .controller('OwnerOverviewController', OwnerOverviewController);

  OwnerOverviewController.$inject = ['$scope', 'dataservice', 'AuthenticationService', '$ionicModal', '$ionicPlatform', '$ionicPopup', 'spinnerService'];
  function OwnerOverviewController($scope, dataservice, AuthenticationService, $ionicModal, $ionicPlatform, $ionicPopup, spinnerService) {
    var vm = this;

    vm.projects = getProjects();
    vm.showBidderForm = showBidderForm;
    vm.acceptBid = acceptBid;
    vm.declineBid = declineBid;

    $scope.bidder = [];
    $scope.closeBidderForm = closeBidderForm;
    vm.errors = [];

    function getProjects(){
      spinnerService.showAll();
      dataservice.projectOwner().list({'userId':AuthenticationService.user._id}).$promise.then(
        function(response){
          vm.projects = response;
          for( var p in vm.projects ){
            for( var s in p.skill){
              skill[s].checked=true;
            }
          }
          spinnerService.hideAll();
        },
        function(response){
          console.log('2response = ' + JSON.stringify(response));
          spinnerService.hideAll();
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }

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

    function declineBid(projectId, bidderId, comment){
      console.log('Decline bid : { projectId :' + projectId + ' bidderId : ' + JSON.stringify(bidderId) + ' comment: ' + comment + '}');
      spinnerService.showAll();
      dataservice.projectBid().put({'id':projectId}, {operation:'decline', bidderId:bidderId, comment:comment}).$promise.then(
        function(response){
          getProjects();
          spinnerService.hideAll();
        },
        function(response){
          console.log('2response = ' + JSON.stringify(response));
          spinnerService.hideAll();
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }

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

    function acceptBid(projectId, bidderId, comment){
      console.log('Accept bid : { projectId :' + projectId + ' bidderId : ' + JSON.stringify(bidderId) + ' comment : ' + comment + '}');
      spinnerService.showAll();
      dataservice.projectBid().put({'id':projectId}, {operation:'accept', bidderId:bidderId, comment:comment}).$promise.then(
        function(response){
          getProjects();
          spinnerService.hideAll();
        },
        function(response){
          spinnerService.hideAll();
          console.log('2response = ' + JSON.stringify(response));
          if(Array.isArray(response.data)){ console.log('array of errors'); vm.errors = response.data; }
          else { vm.errors = [response.data.message]; }

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

    $ionicModal.fromTemplateUrl(
      'templates/modals/bidder.html',
      function(modal) { vm.bidderForm = modal; },
      { scope: $scope, animation: 'slide-in-left', }
    );

    function showBidderForm(bidder){
      // console.log('bidder = ' + JSON.stringify(bidder, null, '\t'));
      $scope.bidder = bidder;
      vm.bidderForm.show();
    };
    function closeBidderForm(){
      // console.log('closeBidderForm');
      vm.bidderForm.hide();
    };
  }
})();
