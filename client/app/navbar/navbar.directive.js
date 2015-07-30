'use strict';

angular.module('companionApp')
    .directive('navbar', function($state, $location, $mdSidenav, Auth) {
        return {
            templateUrl: 'app/navbar/navbar.html',
            restrict: 'EA',
            replace: true,
            link: function(scope, element, attrs) {
                scope.state = $state;
                scope.isLoggedIn = Auth.isLoggedIn;
                scope.isAdmin = Auth.isAdmin;
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.logout = function() {
                    Auth.logout();
                    $location.path('/login');
                };

                scope.toggleSidenav = function() {
                    $mdSidenav('left').toggle();
                };

                scope.navigateBack = function() {
                    history.goBack();
                };

                scope.handleNavigation = function() {
                    if (scope.isBackNavigationAvailable) {
                        scope.navigateBack();
                    } else {
                        scope.toggleSidenav();
                    }
                };
            }
        };
    });
