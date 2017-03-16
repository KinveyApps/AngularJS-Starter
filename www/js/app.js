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
      event.preventDefault();
      $kinvey.initialize({
        appKey: '<appKey>',
        appSecret: '<appSecret>'
      })
        .then(function(activeUser) {
          kinveyInitialized = true;
          $state.go(toState, toParams);
        })
        .catch(function(error) {
          console.log(error.message, error.name);
        });
    } else if (toState.requiresActiveUser === true && !$kinvey.User.getActiveUser()) {
      event.preventDefault();
      $state.go('login');
    }
  });
}])
