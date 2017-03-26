(function() {
    'use strict';

    /* jshint -W098 */

    function TestsController($scope, Global, Tests, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'tests'
        };

        $scope.checkCircle = function() {
            Tests.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.tests')
        .controller('TestsController', TestsController);

    TestsController.$inject = ['$scope', 'Global', 'Tests', '$stateParams'];

})();
