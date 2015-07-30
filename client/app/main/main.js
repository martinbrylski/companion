'use strict';

angular.module('companionApp')

.config(function($stateProvider) {
    $stateProvider
        .state('main', {
            abstract: true,
            title: 'Übersicht',
            views: {
                main: {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl'
                }
            }
        });
});
