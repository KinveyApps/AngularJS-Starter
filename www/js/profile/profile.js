angular.module('app.profile', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    parent: 'navbar',
    name: 'profile',
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'ProfileCtrl',
    requiresActiveUser: true
  });
}])
.controller('ProfileCtrl', ['$scope', '$kinvey', function($scope, $kinvey) {
  $scope.showSuccess = false;
  $scope.showError = false;
  $scope.user = $kinvey.User.getActiveUser();

  $scope.update = function() {
    $scope.showSuccess = false;
    $scope.showError = false;

    $scope.user.update($scope.user.data)
      .then(function() {
        $scope.showSuccess = true;
        $scope.$digest();
      })
      .catch(function(error) {
        $scope.error = error;
        $scope.showError = true;
        $scope.$digest();
      });
  };
}]);
