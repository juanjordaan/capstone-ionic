(function() {
  'use strict';

  angular.module('App')
  .factory('MessageInbox', MessageInbox);

  MessageInbox.$inject = ['socketFactory', 'serverURL', '$cordovaToast'];
  function MessageInbox(socketFactory, serverURL, $cordovaToast){
    var messages = [];
    var initialized = false;
    var connection;
    var socket;

    var fn = {
      getMessages : getMessages,
      deleteMessage : deleteMessage,
      connect : connect,
      disconnect : disconnect
    }

    function authenticate(credentials){
      console.log('authenticating');
      socket.emit('auth', credentials, function (response) {
        console.log('socket connection : ' + response.status);

        fetchMessages();
      });

      return true;
    }

    function fetchMessages(){
      console.log('fetchAllMessages');
      socket.emit('fetchAllMessages', '', function (response) {
        messages = response.payload;
        console.log('TODO : Growl for ' + messages.length + ' pulled messages');
        if(messages.length == 0){
          $cordovaToast
          .show( 'No new messages', 'long', 'top' )
          .then(
            function ( success ) { console.log('success : ' + success); },
            function ( error ) { console.log('error : ' + error ); }
          );
        }
        else{
          $cordovaToast
          .show( 'Your messages have been retreived', 'long', 'top' )
          .then(
            function ( success ) { console.log('success : ' + success); },
            function ( error ) { console.log('error : ' + error ); }
          );
        }
      });
    }

    function deleteMessage(message){
      console.log('socket delete message id : ' + message._id);
      socket.emit('deleteMessage', message._id, function (response) {
        if( response.status == 'ok' ){
          var i = messages.indexOf(message);
          messages.splice(i, 1);
        }
        else {
          console.log('response.status : ' + response.status);
        }
      });
    }

    function getMessages(){
      // console.log('returning ' + messages.length + ' messages');
      return messages;
    }

    function connect(credentials){
      console.log('connecting');
      if(!initialized){
        connection = io.connect(serverURL, {'forceNew':true});
        socket = socketFactory({
          ioSocket: connection
        });

        socket.on('connect', function () {
          authenticate(credentials);
        });

        socket.on('newMessages', function (payload) {
          messages.push(payload);
          $cordovaToast
          .show( 'New message has been received', 'long', 'top' )
          .then(
            function ( success ) { console.log('success : ' + success); },
            function ( error ) { console.log('error : ' + error ); }
          );
        });

        initialized = true;
      }

      return initialized;
    }

    function disconnect(){
      if(initialized){
        socket.emit('end');
        socket.disconnect();
        initialized = false;
      }
    }

    return fn;
  }
})();
