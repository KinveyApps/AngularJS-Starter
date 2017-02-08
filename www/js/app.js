var kinveyInitialized = false;

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'kinvey',
  'app.login',
  'app.signup',
  'app.books',
  'app.upload',
  'app.profile',
  'app.components.navbar'
])
.config(['$stateProvider', function($stateProvider) {
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
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if (kinveyInitialized === false) {
      event.preventDefault(); // Stop the location change
      // Initialize Kinvey
      $kinvey.initialize({
        appKey: 'kid_WJt3WXdOpx',
        appSecret: '7cfd74e7af364c8f90b116c835f92e7d'
      }).then(function(activeUser) {
        kinveyInitialized = true;
        $state.go(toState, toParams);
      });
    } else if (toState.requiresActiveUser === true && !$kinvey.User.getActiveUser()) {
      event.preventDefault();
      $state.go('login');
    }
  });
}])
