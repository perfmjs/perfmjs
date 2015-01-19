require(['utils', 'angular', 'angular-route', 'angular-mock', 'ng-app', 'ngServices', 'ngControllers', 'ng-model'], function (utils, angular, ngRoute, ngMock, ngApp, ngServices, ngControllers, ngModel) {
    describe('测试angularJS框架的controllers和services', function() {
        beforeEach(module('ngApp'));
        var $scope = {}, $controller;

        beforeEach(inject(function(_$controller_, _$rootScope_){
            $controller = _$controller_;
            $scope = _$rootScope_;
        }));

        describe('测试ngController1功能', function() {
            var controller;
            beforeEach(function() {
                controller = $controller('ngController1', {'$scope': $scope});
            });

            it('controllers能被实例化', function() {
                $scope.greeting = 'longerthaneightchars';
                $scope.chiliSpicy();
                expect($scope.greeting).toEqual('chili');
            });
        });
        describe('测试ngServices功能', function() {
            var service;
            beforeEach(inject(function(personService) {
                service = personService;
            }));

            it("services能被实例化", function() {
                expect(service).not.toBeNull();
                service.changeName('tony123456');
                expect(ngModel.firstName).toEqual('tony123456');
            });
        });
    });
});