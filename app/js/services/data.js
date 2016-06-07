(function () {
	'use strict';

  angular.module( 'App')
  .factory('dataservice', dataservice);

  dataservice.$inject = ['$resource', 'baseURL', 'httpVerbs'];
  function dataservice($resource, baseURL, httpVerbs) {
    return {
      countries: countries,
      skills: skills,
      messages: messages,
      messageInbox: messageInbox,
      users: users,
      userSkills: userSkills,
      userRegister: userRegister,
      projects: projects,
      projectBid: projectBid,
      projectsOpen: projectsOpen,
      projectOwner: projectOwner,
      projectProvider: projectProvider,
      dashboard: dashboard,
      login: login,
      logout: logout
    };

    function countries( ){
      return $resource( baseURL+'/countries', null, httpVerbs );
    }

    function skills( ){
      return $resource( baseURL+'/skills', null, httpVerbs );
    }

    function messages( ){
      return $resource( baseURL+'/messages/:messageId', null, httpVerbs );
    }

    function messageInbox( ){
      return $resource( baseURL+'/messages/user/:userId', null, httpVerbs );
    }

    function users( ){
      return $resource( baseURL+'/users/:userId', null, httpVerbs );
    }

    function userSkills( ){
      return $resource( baseURL+'/users/:userId/skills', null, httpVerbs );
    }

    function userRegister( ){
      return $resource( baseURL+'/users/register', null, httpVerbs );
    }

    function projects( ){
      return $resource( baseURL+'/projects/:id', null, httpVerbs );
    }

    function projectBid( ){
      return $resource( baseURL+'/projects/:id/bid', null, httpVerbs );
    }

    function projectsOpen(){
      return $resource( baseURL+'/projects/open/:userId', null, httpVerbs );
    }

    function projectOwner(){
      return $resource( baseURL+'/projects/owner/:userId', null, httpVerbs );
    }

    function projectProvider(){
      return $resource( baseURL+'/projects/provider/:userId', null, httpVerbs );
    }

    function dashboard(){
      return $resource( baseURL+'/dashboard', null, httpVerbs );
    }

    function login(){
      return $resource( baseURL+'/login', null, httpVerbs );
    }

    function logout(){
      return $resource( baseURL+'/logout', null, httpVerbs );
    }
  }
})();
