(function() {
  'use strict';

  angular.module('App')
  .controller('SocketMessagesController', SocketMessagesController);

  SocketMessagesController.$inject = ['MessageInbox', '$ionicModal', '$scope', 'spinnerService']
  function SocketMessagesController(MessageInbox, $ionicModal, $scope, spinnerService){
    var vm = this;

    vm.messages = MessageInbox.getMessages()
    vm.deleteMessage = deleteMessage;

    function deleteMessage(message){
      spinnerService.showAll();
      console.log('deleteing message');
      MessageInbox.deleteMessage(message);
      closeMessage();
      spinnerService.hideAll();
    }
  }
})();
