angular.module('app.components.navbar', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    name: 'navbar',
    abstract: true,
    templateUrl: 'js/components/navbar/navbar.html',
    controller: 'NavbarCtrl',
    requiresActiveUser: true
  });
}])
.controller('NavbarCtrl', ['$scope', '$kinvey', function($scope, $kinvey) {
  $scope.activeUser = $kinvey.User.getActiveUser();
}]);
