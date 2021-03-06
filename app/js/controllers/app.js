(function () {
  'use strict';

  angular.module('App')
  .controller('AppController', AppController);

  AppController.$inject = [ '$ionicPopup', '$scope', '$state', 'dataservice', 'AuthenticationService', '$ionicModal', '$timeout', '$ionicPlatform', '$cordovaCamera', '$cordovaImagePicker', '$localStorage', '$ionicSideMenuDelegate', 'MessageInbox', 'spinnerService'];
  function AppController ( $ionicPopup, $scope, $state, dataservice, AuthenticationService, $ionicModal, $timeout, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, $localStorage, $ionicSideMenuDelegate, MessageInbox, spinnerService ){
    $scope.credentials = AuthenticationService.getCredentials();
    $scope.rememberMe = AuthenticationService.rememberMe ? true : false;

    $scope.user = {};
    $scope.user._id = null;
    $scope.user.avatar = 'data:image/jpeg;base64,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';
    $scope.user.email = '';
    $scope.user.firstname = '';
    $scope.user.lastname = '';
    $scope.user.company = '';
    $scope.user.dob = new Date();
    $scope.user.telephone = '';
    $scope.user.country = {};
    $scope.user.password = '';
    $scope.confirmPassword = '';
    $scope.user.username = '';

    // Test code
    // $scope.user.email = 'juan.jordaan1234@gmail.com';
    // $scope.user.firstname = 'Juan';
    // $scope.user.lastname = 'Jordaan';
    // $scope.user.company = 'Private';
    // $scope.user.telephone = '+12987654321';
    // $scope.user.password = '123';
    // $scope.confirmPassword = '123';

    $scope.errors = [];
    var okPopup;

    spinnerService.showAll();
    dataservice.countries().list().$promise.then(
      function(response){
        $scope.countries = response;
        spinnerService.hideAll();
      },
      function(response){
        spinnerService.hideAll();
        $ionicPlatform.ready( function(){
          var tmp = '<ul class="list">';
          for( var error in $scope.errors ){
            tmp += '<li class="item"><i class="icon ion-alert"></i> ' + response.status + ' ' + response.statusText + '</li>';
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

    $scope.searchCountry='';
    $scope.queryCountry = queryCountry;

    $scope.logout = function(){
      spinnerService.showAll();
      AuthenticationService.logout();
      if($ionicSideMenuDelegate.isOpen()){
        $ionicSideMenuDelegate.toggleLeft(false);
      }
      MessageInbox.disconnect();
      spinnerService.hideAll();
      $state.go('login');
    };

    $scope.loggedIn = function(){return AuthenticationService.isLogged};
    $scope.doLogin = function(){
      spinnerService.showAll();
      dataservice.login().post($scope.credentials).$promise.then(
        function(response){
          AuthenticationService.user = response;
          // console.log('$scope.credentials = ' + JSON.stringify($scope.credentials, null, '\t'));
          // console.log('AuthenticationService.user = ' + JSON.stringify(AuthenticationService.user, null, '\t'));
          AuthenticationService.isLogged = true;
          // console.log('login() : $scope.rememberMe = ' + $scope.rememberMe);
          AuthenticationService.saveRememberMe($scope.rememberMe);
          $scope.credentials = AuthenticationService.getCredentials();
          MessageInbox.connect($scope.credentials);
          spinnerService.hideAll();
          $state.go('app.home');
        },
        function(response){
          spinnerService.hideAll();
          AuthenticationService.isLogged = false;
          $scope.errors = response.data;
          $ionicPlatform.ready( function(){
            var tmp = '<ul class="list">';
            for( var error in $scope.errors ){
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
    };

    $ionicModal
    .fromTemplateUrl('templates/register.html', { scope: $scope })
    .then( function ( modal ) { $scope.registerform = modal; });
    $scope.closeRegister = function () { $scope.registerform.hide(); $state.go('login'); };
    $scope.register = function () { $scope.registerform.show(); };
    $scope.doRegister = function () {
      // console.log('Doing registration', $scope.user );
      spinnerService.showAll();
      $scope.user.username = $scope.user.email;
      dataservice.userRegister().post($scope.user).$promise.then(
        function(response){
          // console.log('response = ' + JSON.stringify(response, null, '\t'));
          $scope.user._id = response._id;
          $scope.credentials.username = $scope.user.email;
          $scope.credentials.password = $scope.user.password;
          spinnerService.hideAll();
          $timeout(function () { $scope.closeRegister(); }, 1000 );

          $scope.message = 'You are successfully registered.';
          $ionicPlatform.ready( function () {
            okPopup = $ionicPopup.show({
              templateUrl: 'templates/modals/ok.popup.html',
              scope: $scope,
              title: 'Register'
            });

            $scope.closeOkPopup = function() { okPopup.close(); };
          });

          $state.go('login');
        },
        function(response){
          // console.log('response.data = ' + JSON.stringify(response.data));
          spinnerService.hideAll();
          $scope.errors = response.data;
          $ionicPlatform.ready( function(){
            var tmp = '<ul class="list">';
            for( var error in $scope.errors ){
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
    };

    $ionicPlatform.ready( function() {
      var cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $scope.takePicture = function() {
        $cordovaCamera
        .getPicture( cameraOptions )
        .then(
          function( imageData ) { $scope.user.avatar = "data:image/jpeg;base64," + imageData; },
          function( error ) {
            $ionicPlatform.ready( function(){
              var tmp = '<ul class="list">';
              tmp += '<li class="item"><i class="icon ion-alert"></i> ' + error + '</li>';
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

        $scope.registerform.show();
      };
    });

    $ionicPlatform.ready( function() {
      var pickerOptions = { maximumImagesCount: 1, width: 100, height: 100, quality: 50 };

      $scope.imagePicker = function() {
        $cordovaImagePicker
        .getPictures( pickerOptions )
        .then(
          function( results ) { $scope.user.avatar = results[0]; },
          function( error ) {
            $ionicPlatform.ready( function(){
              var tmp = '<ul class="list">';
              tmp += '<li class="item"><i class="icon ion-alert"></i> ' + error + '</li>';
              tmp += '</ul>';

              $scope.errorPopup = $ionicPopup.alert({
                template : tmp,
                title: 'Errors',
                cssClass: 'errorPopup'
              });
              $scope.closeErrorPopup = function() { $scope.errorPopup.close(); };
            });
          }
        )
      };
    });

    function queryCountry(query){
      var results = query ? $scope.countries.filter( createCountryFilter(query) ) : $scope.countries, deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }
      else {
        return results;
      }
    }

    $scope.countryChange = function (item){ $scope.country = item; }

    $scope.exitApp = function (){
      console.log('exitApp called');
      ionic.Platform.exitApp();
    }

    $scope.toggleRememberMe = function(){
      $scope.rememberMe = $scope.rememberMe ? false : true;
      console.log('toggle $scope.rememberMe = ' + $scope.rememberMe);
    }
  };
})();
