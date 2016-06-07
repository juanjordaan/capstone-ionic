(function () {
	'use strict';

  angular.module( 'App')
  .constant( "baseURL","http://192.168.0.5:3000/api" )
	// .constant( "baseURL","/api" )
  .constant('httpVerbs', {'put': {method:'PUT'}, 'post': {method:'POST'}, 'list':  {method:'GET', isArray:true} } );
})();
