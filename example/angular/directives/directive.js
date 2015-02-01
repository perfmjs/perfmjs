define('ng-directive', ['utils', 'ng-model'],  function(utils, ngModel) {
    return function(ngApp) {
        ngApp.directive("changeNameButton", ['personService', function(personService) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.bind("click", function() {
                        personService.changeName('tony123');
                    });
                }
            }
        }]).directive('hello', function() {
            return {
                restrict: 'E',
                template: '<div>Hi Hello指令</div>',
                replace: true
            };
        }).directive('myCustomer', function() {
            return {
                templateUrl: 'my-customer.html'
            };
        });
    };
});