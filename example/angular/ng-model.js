define('ng-model', function (require) {
    return {
        firstName: "conghui",
        lastName: "shen",
        age: 100,
        fullName: function() {
            return this.firstName + " " + this.lastName;
        },
        getNgVersion: function() {
            return angular.version.full;
        }
    };
});
