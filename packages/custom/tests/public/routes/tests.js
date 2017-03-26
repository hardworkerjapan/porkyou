(function() {
    'use strict';

    function Tests($stateProvider) {
        $stateProvider.state('tests example page', {
            url: '/tests/example',
            templateUrl: 'tests/views/index.html'
        }).state('tests circles example', {
            url: '/tests/example/:circle',
            templateUrl: 'tests/views/example.html'
        });
    }

    angular
        .module('mean.tests')
        .config(Tests);

    Tests.$inject = ['$stateProvider'];

})();
