(function () {
	'use strict';

  angular.module( 'App')
  .factory('$localStorage', ['$window', function( $window ) {
    return {
      get: function( key, defaultValue ) { return $window.localStorage[key] || defaultValue; },
      set: function( key, value ) { $window.localStorage[key] = value; },
      getObject: function( key, defaultValue ) { return JSON.parse( $window.localStorage[key] || defaultValue ); },
      setObject: function( key, value ) { $window.localStorage[key] = JSON.stringify( value ); },
    };
  }])
})();
