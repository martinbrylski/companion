'use strict';

angular.module('companionApp')

.directive('sidebar', function($state, $mdMedia, Auth) {
    return {
        templateUrl: 'app/sidebar/sidebar.html',
        restrict: 'EA',
        replace: true,
        link: function(scope, element, attrs) {
            scope.menu = [{
                title: 'Kontakte',
                link: 'members',
                icon: 'communication:contacts'
            }];

            scope.$mdMedia = $mdMedia;
            scope.isLoggedIn = Auth.isLoggedIn;
            scope.isAdmin = Auth.isAdmin;
            scope.getCurrentUser = Auth.getCurrentUser;

            scope.logout = function() {
                Auth.logout();
                $state.go('login');
            };
        }
    };
});
