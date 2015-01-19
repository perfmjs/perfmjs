define('ngDirectives', ['utils', 'ng-model'],  function(utils, ngModel) {
    return function(ngApp) {
        ngApp.directive("changeNameButton", function(personService) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.bind("click", function() {
                        personService.changeName('tony123');
                    });
                }
            }
        }).directive('hello', function() {
            return {
                restrict: 'E',
                template: '<div>Hi Hello指令</div>',
                replace: true
            };
        });;
    };
});