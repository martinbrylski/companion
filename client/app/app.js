'use strict';

angular.module('companionApp', [
    'angular.filter',
    'angularMoment',
    'btford.socket-io',
    'cfp.hotkeys',
    'mdDataTable',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
])


.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('start');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
})

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

/**
 * Configures i18n.
 */
.run(function(amMoment) {
    // change locale
    amMoment.changeLocale('de');
})

.config(function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|sms|geo|content):|data:image\//);
})

.config(function($mdThemingProvider) {
    // $mdThemingProvider.alwaysWatchTheme(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('deep-orange');

    // $mdThemingProvider.theme('light-green')
    //     .primaryPalette('light-green')
    //     .accentPalette('deep-orange');
    // $mdThemingProvider.theme('red')
    //     .primaryPalette('red')
    //     .accentPalette('indigo');
    // $mdThemingProvider.theme('amber')
    //     .primaryPalette('amber')
    //     .accentPalette('indigo');   
    // $mdThemingProvider.theme('red')
    //     .primaryPalette('red')
    //     .accentPalette('blue');
    // $mdThemingProvider.theme('green')
    //     .primaryPalette('green')
    //     .accentPalette('brown');
    // $mdThemingProvider.theme('deep-orange')
    //     .primaryPalette('deep-orange')
    //     .accentPalette('light-blue');
    // $mdThemingProvider.theme('brown')
    //     .primaryPalette('brown')
    //     .accentPalette('green');
    // $mdThemingProvider.theme('blue-grey')
    //     .primaryPalette('blue-grey')
    //     .accentPalette('pink');
})

.config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet('action', 'assets/images/iconsets/action-icons.svg')
        .iconSet('alert', 'assets/images/iconsets/alert-icons.svg')
        .iconSet('av', 'assets/images/iconsets/av-icons.svg')
        .iconSet('communication', 'assets/images/iconsets/communication-icons.svg')
        .iconSet('content', 'assets/images/iconsets/content-icons.svg')
        .iconSet('device', 'assets/images/iconsets/device-icons.svg')
        .iconSet('editor', 'assets/images/iconsets/editor-icons.svg')
        .iconSet('file', 'assets/images/iconsets/file-icons.svg')
        .iconSet('hardware', 'assets/images/iconsets/hardware-icons.svg')
        .iconSet('icons', 'assets/images/iconsets/icons-icons.svg')
        .iconSet('image', 'assets/images/iconsets/image-icons.svg')
        .iconSet('maps', 'assets/images/iconsets/maps-icons.svg')
        .iconSet('navigation', 'assets/images/iconsets/navigation-icons.svg')
        .iconSet('notification', 'assets/images/iconsets/notification-icons.svg')
        .iconSet('social', 'assets/images/iconsets/social-icons.svg')
        .iconSet('toggle', 'assets/images/iconsets/toggle-icons.svg')
        .icon('ambulance', 'assets/images/svg/ambulance.svg')
        .icon('cart_outline', 'assets/images/svg/cart-outline.svg')
        .icon('clippy', 'assets/images/svg/clippy.svg')
        .icon('home_variant', 'assets/images/svg/home-variant.svg')
        .icon('logout', 'assets/images/svg/logout.svg')
        .icon('pill', 'assets/images/svg/pill.svg')
        .icon('readability', 'assets/images/svg/readability.svg')
        .icon('run', 'assets/images/svg/run.svg')
        .icon('scale_bathroom', 'assets/images/svg/scale-bathroom.svg')
        .icon('silverware_variant', 'assets/images/svg/silverware-variant.svg')
        .icon('theme_light_dark', 'assets/images/svg/theme-light-dark.svg')
        .icon('timelapse', 'assets/images/svg/timelapse.svg')
        .icon('timer_sand', 'assets/images/svg/timer-sand.svg')
        .icon('tshirt_crew', 'assets/images/svg/tshirt-crew.svg')
        .icon('heart_broken', 'assets/images/svg/heart-broken.svg')
        .icon('weather_night', 'assets/images/svg/weather-night.svg')
        .icon('weather_sunny', 'assets/images/svg/weather-sunny.svg')
        .icon('emoticon_cool', 'assets/images/svg/emoticon-cool.svg')
        .icon('emoticon_devil', 'assets/images/svg/emoticon-devil.svg')
        .icon('emoticon_happy', 'assets/images/svg/emoticon-happy.svg')
        .icon('emoticon_neutral', 'assets/images/svg/emoticon-neutral.svg')
        .icon('emoticon_sad', 'assets/images/svg/emoticon-sad.svg')
        .icon('bw_logo', 'assets/images/bw_logo.svg', 500)
        .iconSet('avatars', 'assets/images/avatars.svg', 128)
        .iconSet('avatar', 'assets/images/avatar-icons.svg', 128);
})

.run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    });
});
