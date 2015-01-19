define('ngServices', ['ng-model'], function(ngModel) {
    return function(ngApp) {
        ngApp.service('personService', ['$rootScope', function($rootScope) {
            var service = {
                changeName: function (newName) {
                    ngModel.firstName = newName;
                    $rootScope.$broadcast('personService.update');
                }
            }
            return service;
        }]);
    }
});
