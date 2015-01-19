define('ngControllers', ['ng-model'],  function(ngModel) {
    return function(ngApp) {
        ngApp.controller('ngController1', function ($scope, $http, $routeParams) {
            $scope.greeting = 'Conghui1!';
            $scope.chiliSpicy = function() {
                $scope.greeting = 'chili';
            };
            $scope.person = ngModel;
            $scope.id = $routeParams.id;
//            //和service联系
            $scope.$on( 'personService.update', function(event) {
                $scope.person = ngModel;
                $scope.$apply();
            });
        }).controller('ngController2', function($scope, $http, $routeParams) {
            $http.get("http://www.w3cschool.cc/try/angularjs/data/Customers_JSON.php")
            .success(function(response) {
                $scope.greeting = response;
            });
        });
    };
});