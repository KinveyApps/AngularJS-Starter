angular.module('app.upload', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    parent: 'navbar',
    name: 'upload',
    url: '/upload',
    templateUrl: 'js/upload/upload.html',
    controller: 'UploadCtrl',
    requiresActiveUser: true
  });
}])
.controller('UploadCtrl', ['$scope', '$kinvey', function($scope, $kinvey) {
  $scope.public = false;
  $scope.showSuccess = false;
  $scope.showError = false;

  $scope.upload = function() {
    $scope.showSuccess = false;
    $scope.showError = false;

    var file = document.getElementById('file').files[0];
    var filename = $scope.filename && $scope.filename !== '' ? $scope.filename : file.name;

    if (file) {
      $kinvey.Files.upload(file, { filename: filename, public: $scope.public })
        .then(function() {
          $scope.showSuccess = true;
          $scope.$digest();
        })
        .catch(function(error) {
          $scope.error = error;
          $scope.showError = true;
          $scope.$digest();
        });
    }
  };
}]);
