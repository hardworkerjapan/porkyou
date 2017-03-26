(function() {
    'use strict';

    function Tests($http, $q) {
        return {
            name: 'tests',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/tests/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.tests')
        .factory('Tests', Tests);

    Tests.$inject = ['$http', '$q'];

})();
