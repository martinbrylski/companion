'use strict';

angular.module('companionApp')

.service('history', function($state, $rootScope) {
    var history = [];
    var service = {};

    /**
     * Adds a new state to the history stack.
     * @param  {[type]} state  ui-router state
     * @param  {[type]} params ui-router params
     */
    service.push = function(state, params) {
        if (state.abstract)
            return;

        if (state.root) {
            history.length = 0; // clear array
        }

        history.push({
            state: state,
            params: params
        });

        this.setIfBackIsAvailable();
    };

    /**
     * Sets if back navigation is available.
     * @return {boolean} if back navigation is available
     */
    service.setIfBackIsAvailable = function() {
        $rootScope.isBackNavigationAvailable = history.length > 1; // other states then root state
        return $rootScope.isBackNavigationAvailable;
    };

    /**
     * Goes a state back.
     */
    service.goBack = function() {
        var currentState = history.pop(); // ignore here
        var previousState = history.pop();

        this.setIfBackIsAvailable();

        if (previousState !== undefined) {
            return $state.go(previousState.state, previousState.params);
        }

        return false;
    };

    return service;
})

/**
 * Configures the history and hardware back button.
 */
.run(function($state, $rootScope, history) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        history.push(to, toParams);
    });

    history.push($state.current, $state.params);
});
