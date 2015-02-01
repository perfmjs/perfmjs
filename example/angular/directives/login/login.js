//https://github.com/binocarlos/login-form-for-angular
define('ng-directive-login', function(require) {
    return function(ngApp) {
        ngApp.directive('loginDirective', function() {
            //field.required && showvalidate && containerForm[field.name].$invalid
            return {
                restrict:'EA',
                scope:true,
                transclude:true,
                replace:true,
                //template:'<div>\n  <ul class="nav nav-tabs" id="loginFormTab">\n    <li ng-class="{active:mode==\'login\'}"><a href="#" ng-click="setmode(\'login\')">Login</a></li>\n    <li ng-hide="loginonly" ng-class="{active:mode==\'register\'}"><a href="#" ng-click="setmode(\'register\')">Create Account</a></li>\n  </ul>\n  <div id="myTabContent" class="tab-content">\n\n    <div ng-class="{active:mode==\'login\', in:mode==\'login\', fade:mode!=\'login\'}" class="tab-pane" id="login" style="margin-top:20px;">\n\n      <form class="form-horizontal" name="loginForm" role="form">\n  \n        <div class="form-group" ng-class="{error: showloginvalidate && loginForm.username.$invalid}">\n          <label for="inputEmail1" class="col-md-2 control-label">Email</label>\n          <div class="col-md-8">\n            <input type="text" class="form-control" id="username" name="username" placeholder="Email" ng-model="login.username" required>\n          </div>\n        </div>\n        <div class="form-group" ng-class="{error: showloginvalidate && loginForm.password.$invalid}">\n          <label for="inputPassword1" class="col-md-2 control-label">Password</label>\n          <div class="col-md-8">\n            <input type="password" class="form-control" id="password" name="password" placeholder="Password" ng-model="login.password" required>\n          </div>\n        </div>\n\n\n        <div ng-show="loginmessage" class="help-inline" style="margin-bottom:10px;"><div class="label label-danger">{{ loginmessage }}</div></div>\n        <div ng-show="postregistermessage" class="help-inline" style="margin-bottom:10px;"><div class="label label-info">{{ postregistermessage }}</div></div>\n\n        <div class="form-group">\n          <div class="col-md-offset-2 col-md-8">\n            <button type="submit" class="btn btn-default" ng-click="loginSubmit();">Sign in</button>\n          </div>\n        </div>\n      </form>\n            \n    </div>\n\n    <div ng-hide="loginonly" ng-class="{active:mode==\'register\', in:mode==\'register\', fade:mode!=\'register\'}" class="tab-pane" id="create" style="margin-top:20px;">\n\n      <form class="form-horizontal" name="registerForm" role="form">\n\n          <div class="form-group" ng-class="{error: showregistervalidate && registerForm.username.$invalid}">\n            <!-- Email -->\n            <label class="col-md-2 control-label"  for="username">Email</label>\n            <div class="col-md-8">\n              <input type="email" class="form-control" id="username" name="username" placeholder="Email" ng-model="register.username" required>\n            </div>\n          </div>\n\n          <div class="form-group" ng-class="{error: showregistervalidate && registerForm.password.$invalid}">\n            <!-- Password -->\n            <label class="col-md-2 control-label"  for="password">Password</label>\n            <div class="col-md-8">\n              <input type="password" class="form-control" id="password" name="password" placeholder="Password" ng-model="register.password" required>\n            </div>\n          </div>      \n\n          <div class="form-group" ng-class="{error: showregistervalidate && registerForm.password.$invalid}">\n            <!-- Password -->\n            <label class="col-md-2 control-label"  for="password2">Confirm</label>\n            <div class="col-md-8">\n              <input type="password" class="form-control" id="password2" name="password2" placeholder="Confirm Password" ng-model="register.password2" required>\n            </div>\n          </div>       \n\n\n          <div ng-show="registermessage" class="help-inline"><span class="label label-danger">{{ registermessage }}</span></div>\n\n          <div class="form-group">\n            <!-- Button -->\n            <div class="col-md-offset-2 col-md-8">\n              <button class="btn btn-default" ng-class="{disabled:isactive}" ng-click="registerSubmit();">Create</button>\n            </div>\n          </div>\n\n        </fieldset>\n\n      </form>\n    </div>\n  </div>\n</div>',
                templateUrl: 'directives/login/template.html',
                controller:function($scope){
                    $scope.mode = 'login';
                    $scope.setmode = function(mode){
                        $scope.mode = mode;
                    };
                    $scope.$on('login:mode', function(ev, mode){
                        $scope.setmode(mode);
                    });
                    $scope.login = {
                        username:'',
                        password:''
                    };
                    $scope.register = {
                        username:'',
                        password:'',
                        fullname:'',
                        email:''
                    };
                    $scope.active = true;
                    $scope.showloginvalidate = false;
                    $scope.loginSubmit = function(){
                        $scope.active = true;
                        $scope.showloginvalidate = true;
                        if(!$scope.loginForm.$valid){
                            return;
                        }
                        $scope.$emit('loginForm:login', $scope.login, function(error, message){
                            if(error){
                                $scope.loginmessage = error;
                            }
                        });
                        return false;
                    };

                    $scope.showregistervalidate = false;
                    $scope.registerSubmit = function(){
                        $scope.active = true;
                        $scope.showregistervalidate = true;
                        if(!$scope.registerForm.$valid){
                            return;
                        }
                        if(!$scope.register.password){
                            $scope.registermessage = 'please enter a password';
                            return;
                        }
                        if($scope.register.password!=$scope.register.password2){
                            $scope.registermessage = 'the 2 passwords do not match';
                            return;
                        }

                        var data = {};
                        Object.keys($scope.register || {}).forEach(function(p){
                            data[p] = $scope.register[p];
                        });

                        delete(data.password2);
                        $scope.$emit('loginForm:register', data, function(error, message){
                            if(error){
                                $scope.registermessage = error;
                                return;
                            }
                            $scope.registermessage = '';
                            $scope.postregistermessage = message || '';
                            $scope.login.username = $scope.register.username;
                            $scope.setmode('login');
                        });
                        return false;
                    }
                },
                link: function($scope, iElm, iAttrs, controller) {
                    console.log('=====login directives link');
                }
            }
        });
    };
});