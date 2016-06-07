(function () {
	'use strict';

  angular.module( 'App')
  .factory('AuthenticationService', AuthenticationService)

	AuthenticationService.$inject = ['$localStorage'];
	function AuthenticationService($localStorage){
		var auth = {
			getCredentials : getCredentials,
			rememberMe : false,
			saveRememberMe : saveRememberMe,
      user : {},
      isLogged: false,
      loginFacebook: loginFacebook,
      storeUser: storeUser,
      logout: logout
    }

		return auth;

		var initialized = false;
		var credentials = {};

		function getCredentials(){
			// console.log('initialized = ' + initialized);
			if( !initialized){
				// console.log('fetching localStorage userinfo');
				credentials = $localStorage.getObject( 'userinfo','{}' );
				// console.log('credentials = ' + JSON.stringify(credentials));
				if( credentials.username && credentials.password){
		      // console.log('changing rememberMe to true');
		      auth.rememberMe = true;
		    }
				initialized = true;
			}

			// console.log('returning credentials ' + JSON.stringify(credentials));
			return credentials;
		};

		function saveRememberMe(value){
			auth.rememberMe = value;
			// console.log('saveRememberMe auth.rememberMe = ' + auth.rememberMe);
			if(!auth.rememberMe){
				credentials = {};
			}
			$localStorage.setObject('userinfo', credentials);
		}

		function loginFacebook() {
      // console.log('window.location.protocol = ' + window.location.protocol);
      // console.log('window.location.host = ' + window.location.host);
      // window.location = window.location.protocol + '//' + window.location.host + '/api/v1/users/facebook';
      window.location = window.location.protocol + '//' + window.location.host + '/facebook';
    };

    function storeUser(credentials){
      // console.log('storeUser credentials = ' + credentials);
      storeUserCredentials(credentials);
    }

    function logout(){
      auth.user = {};
      auth.isLogged = false;
    }
  }
})();
