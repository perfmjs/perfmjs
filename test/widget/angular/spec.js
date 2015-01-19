define('angular-test-spec', ['utils', 'angular', 'ng-app', 'angular-mock', 'ng-model'], function (utils, angular, ngApp, ngMock, ngModel) {
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
        describe('测试ngDirectives功能', function() {
            var $compile,  $rootScope;
            beforeEach(inject(function(_$compile_, _$rootScope_){
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            }));

            it('相应的内容就能置换成正确的标签元素', function() {
                var element = $compile("<hello></hello>")($rootScope);
                $rootScope.$digest();
                expect(element.html()).toContain("Hi Hello指令");
            });
        });
    });
});