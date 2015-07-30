'use strict';

angular.module('companionApp')

.config(function($stateProvider) {
    $stateProvider
        .state('members', {
            url: '/members',
            parent: 'main',
            views: {
                content: {
                    templateUrl: 'app/members/members.html',
                    controller: 'MembersCtrl'
                }
            }
        });
});
