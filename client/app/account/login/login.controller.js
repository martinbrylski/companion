'use strict';

angular.module('companionApp')

.controller('LoginCtrl', function($scope, $state, $window, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
        $scope.submitted = true;

        if (form.$valid) {
            Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    // Logged in, redirect to home
                    $state.go('');
                })
                .catch(function(err) {
                    $scope.errors.other = err.message;
                });
        }
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
});
