define('ng-controller', ['ng-model'],  function(ngModel) {
    return function(ngApp) {
        ngApp.controller('ngController1', function ($rootScope, $http, $routeParams) {
            $rootScope.greeting = 'Conghui1!';
            $rootScope.chiliSpicy = function() {
                $scope.greeting = 'chili';
            };
            $rootScope.person = ngModel;
            $rootScope.id = $routeParams.id;
//            //和service联系
            $rootScope.$on( 'personService.update', function(event) {
                $rootScope.person = ngModel;
                $rootScope.$apply();
            });
        }).controller('ngController2', function($scope, $http, $routeParams) {
            $http.get("http://www.w3cschool.cc/try/angularjs/data/Customers_JSON.php")
            .success(function(response) {
                $scope.greeting = response;
            });
        });
    };
});