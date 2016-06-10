angular.module('App')
.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$compileProvider',
function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

  $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    controller: 'AppController',
    templateUrl: 'templates/sidebar.html'
  })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'AppController'
  })
  .state('app.home', {
    url: "/home",
    cache: false,
    views: {
      'viewContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.messages', {
    url: "/messages",
    views: {
      'viewContent': {
        templateUrl: "templates/messages.html",
        controller: 'SocketMessagesController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.providerOverview', {
    url: "/providerOverview",
    views: {
      'viewContent': {
        templateUrl: "templates/provider.overview.html",
        controller: 'ProviderOverviewController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.providerProfile', {
    url: "/providerProfile",
    cache: false,
    views: {
      'viewContent': {
        templateUrl: "templates/provider.profile.html",
        controller: 'ProviderProfileController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.providerSearch', {
    url: "/providerSearch",
    cache: false,
    views: {
      'viewContent': {
        templateUrl: "templates/provider.search.html",
        controller: 'ProviderSearchController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.ownerOverview', {
    url: "/ownerOverview",
    cache: false,
    views: {
      'viewContent': {
        templateUrl: "templates/owner.overview.html",
        controller: 'OwnerOverviewController',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.ownerProject', {
    url: "/ownerProject",
    cache: false,
    views: {
      'viewContent': {
        templateUrl: "templates/owner.project.html",
        controller: 'OwnerProjectController',
        controllerAs: 'vm'
      }
    }
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });
}]);
