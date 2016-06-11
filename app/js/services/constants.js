(function () {
	'use strict';

  angular.module( 'App')
	// .constant('serverURL','http://192.168.0.5:3000')
  // .constant( "restAPI","http://192.168.0.5:3000/api" )
	.constant('serverURL','http://capstone-juan-jordaan.eu-gb.mybluemix.net')
	.constant('restAPI', 'http://capstone-juan-jordaan.eu-gb.mybluemix.net/api')
  .constant('httpVerbs', {'put': {method:'PUT'}, 'post': {method:'POST'}, 'list':  {method:'GET', isArray:true} } );
})();
