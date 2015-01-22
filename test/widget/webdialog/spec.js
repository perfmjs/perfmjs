define('webdialog-test-spec', ['utils', 'webdialog'], function (utils, webdialog) {
    describe("测试webdialog功能", function() {
        beforeEach(function() {
        });

        it("webdialog功能应能正常运行", function() {
            expect(utils.isFunction(webdialog)).toEqual(true);
        });

    });
});