// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngResource', 'ngAnimate', 'ionic-multiselect', 'btford.socket-io'])
.run(['$ionicPlatform', '$sqliteService', '$rootScope', '$ionicLoading', function($ionicPlatform, $sqliteService, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Load the Pre-populated database, debug = true
    $sqliteService.preloadDataBase(true);
  });

  $rootScope.$on('loading:show', function () {
    $ionicLoading.show({ template: '<ion-spinner></ion-spinner> Loading ...' });
  });

  $rootScope.$on( 'loading:hide', function () {
    $ionicLoading.hide();
  });

  $rootScope.$on('$stateChangeStart', function () {
    console.log( 'Loading ...' );
    $rootScope.$broadcast( 'loading:show' );
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    console.log( 'done' );
    $rootScope.$broadcast( 'loading:hide' );
  });

  $rootScope.$on('$stateChangeError', function ( event, toState, toParams, fromState, fromParams, error ) {
    console.log( 'error - $stateChangeError : ' + angular.toJson( error) );
    $rootScope.$broadcast( 'loading:hide' );
  });

  $rootScope.$on('$stateNotFound', function ( event, unfoundState, fromState, fromParams ) {
    console.log( 'error - $stateNotFound' );
    console.log( unfoundState.to ); // "lazy.state"
    console.log( unfoundState.toParams ); // {a:1, b:2}
    console.log( unfoundState.options ); // {inherit:false} + default options

    $rootScope.$broadcast( 'loading:hide' );
  });
}]);
