require(['utils', 'angular', 'angular-route', 'angular-mock', 'ng-app', 'ngServices', 'ngControllers', 'ng-model'], function (utils, angular, ngRoute, ngMock, ngApp, ngServices, ngControllers, ngModel) {
    describe('测试angularJS框架的controllers和services', function() {
        beforeEach(module('ngApp'));

        describe('测试ngController1功能', function() {
            it('controllers能被实例化', inject(function ($rootScope, $controller) {
                var controller = $controller('ngController1', {'$scope': $rootScope});
                $rootScope.greeting = 'longerthaneightchars';
                $rootScope.chiliSpicy();
                expect($rootScope.greeting).toEqual('chili');
            }));
        });
        describe('测试ngServices功能', function() {
            it("services能被实例化", inject(function (personService) {
                expect(personService).not.toBeNull();
                personService.changeName('tony123456');
                expect(ngModel.firstName).toEqual('tony123456');
            }));
        });
    });
});