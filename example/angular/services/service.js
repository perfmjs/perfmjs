define('ng-service', ['ng-model'], function(ngModel) {
    return function(ngApp) {
        ngApp.service('personService', ['$rootScope', function ($rootScope) {
            return {
                changeName: function (newName) {
                    ngModel.firstName = newName;
                    ngModel.age = 2000000;
                    $rootScope.$broadcast('personService.update');
                }
            };
        }]);
    };
});
