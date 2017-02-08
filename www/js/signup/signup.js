angular.module('app.signup', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    name: 'signup',
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });
}])
.controller('SignupCtrl', ['$scope', '$kinvey', '$state', function($scope, $kinvey, $state) {
  $scope.showError = false;
  $scope.data = {};

  $scope.signup = function() {
    $scope.showError = false;

    $kinvey.User.signup($scope.data)
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
