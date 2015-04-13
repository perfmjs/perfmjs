define('ng-controller', ['ng-model'],  function(ngModel) {
    return function(ngApp) {
        ngApp.controller('ngController1', ['$rootScope', '$http', '$routeParams', function ($rootScope, $http, $routeParams) {
            $rootScope.greeting = 'Conghui1!';
            $rootScope.chiliSpicy = function() {
               $rootScope.greeting = 'chili';
            };
            $rootScope.person = ngModel;
            $rootScope.id = $routeParams.id;
            //和service联系
            $rootScope.$on( 'personService.update', function(event) {
                $rootScope.person = ngModel;
                $rootScope.$apply();
            });
        }]).controller('ngController2', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
            $http.get("http://www.w3cschool.cc/try/angularjs/data/Customers_JSON.php")
            .success(function(response) {
                $scope.greeting = response;
            });
        }]).controller('demoController', ['$scope', function($scope) {
            $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];
            $scope.loadMore = function() {
                var last = $scope.images[$scope.images.length - 1];
                for(var i = 1; i <= 8; i++) {
                    $scope.images.push(last + i);
                }
            };
        }]).controller('12306', ['$scope', '$http', function($scope, $http) {
            var httpUrl = 'https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2015-02-13&from_station=SZQ&to_station=JJG';
            $http.jsonp(httpUrl)
                .success(function(response) {
                    console.log('succ:' + response);
                    $scope.greeting = response;
                }).error(function(response) {
                    console.log('error:' + response);
                });
        }]);
    };
});