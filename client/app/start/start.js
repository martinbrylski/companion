'use strict';

angular.module('companionApp')

.config(function($stateProvider) {
    $stateProvider
        .state('start', {
            url: '/start',
            parent: 'main',
            title: '',
            root: true,
            views: {
                content: {
                    templateUrl: 'app/start/start.html',
                    controller: 'StartCtrl'
                }
            }
        });
});
