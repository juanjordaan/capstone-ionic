(function() {
  'use strict';

  angular.module('App')
  .controller('SocketMessagesController', SocketMessagesController);

  SocketMessagesController.$inject = ['MessageInbox', '$ionicModal', '$scope', 'SpinnerService']
  function SocketMessagesController(MessageInbox, $ionicModal, $scope, SpinnerService){
    var vm = this;

    vm.messages = MessageInbox.getMessages()
    $scope.mainSpinner = SpinnerService.isShow();;

    vm.deleteMessage = deleteMessage;

    function deleteMessage(message){
      $scope.mainSpinner = SpinnerService.show();
      console.log('deleteing message');
      MessageInbox.deleteMessage(message);
      closeMessage();
      $scope.mainSpinner = SpinnerService.hide();
    }
  }
})();
