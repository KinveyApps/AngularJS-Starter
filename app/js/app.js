'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'kinvey',
  'myApp.login',
  'myApp.signup',
  'myApp.books',
  'myApp.upload',
  'myApp.profile',
  'myApp.components.navbar'
])
.config(['$kinveyProvider', '$stateProvider', function($kinveyProvider, $stateProvider) {
  $kinveyProvider.init({
    appKey: 'kid_WJt3WXdOpx',
    appSecret: '7cfd74e7af364c8f90b116c835f92e7d'
  });

  $stateProvider.state({
    name: 'logout',
    url: '/logout',
    controller: ['$kinvey', '$state', function($kinvey, $state) {
      $kinvey.User.logout()
        .then(function() {
          $state.go('login');
        });
    }]
  });
}])
.run(['$rootScope', '$kinvey', '$state', function($rootScope, $kinvey, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.requiresActiveUser === true && !$kinvey.User.getActiveUser()) {
      event.preventDefault();
      $state.go('login');
    }
  })
}])
