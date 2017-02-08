angular.module('app.login', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    name: 'login',
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', ['$scope', '$kinvey', '$state', function($scope, $kinvey, $state) {
  $scope.showError = false;

  $scope.login = function() {
    $scope.showError = false;

    $kinvey.User.login($scope.username, $scope.password)
      .then(function() {
        $state.go('books');
      })
      .catch(function(error) {
        $scope.error = error;
        $scope.showError = true;
        $scope.$digest();
      });
  }
}]);
