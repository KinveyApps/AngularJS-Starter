angular.module('app.books', [
  'ui.router',
  'kinvey'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state({
    parent: 'navbar',
    name: 'books',
    url: '/',
    templateUrl: 'js/books/books.html',
    controller: 'BooksCtrl',
    requiresActiveUser: true
  });
}])
.controller('BooksCtrl', ['$scope', '$kinvey', function($scope, $kinvey) {
  $scope.find = function() {
    var store = $kinvey.DataStore.collection('books');
    store.find()
      .subscribe(function(books) {
        $scope.books = books;
        $scope.$digest();
      }, function(error) {
        console.log(error);
      });
  }

  $scope.find();
}]);
