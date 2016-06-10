(function() {
  'use strict';

  angular.module('App')
  .controller('SocketMessagesController', SocketMessagesController);

  SocketMessagesController.$inject = ['MessageInbox', '$ionicModal', '$scope']
  function SocketMessagesController(MessageInbox, $ionicModal, $scope){
    var vm = this;

    vm.messages = MessageInbox.getMessages();

    vm.deleteMessage = deleteMessage;

    function deleteMessage(message){ console.log('deleteing message'); MessageInbox.deleteMessage(message); closeMessage(); }
  }
})();
