/**
 * Created by Piranha on 29.10.2014.
 */
var appModule = angular.module('app', ['ngTable']);

appModule.filter('isForwarded', function() {
    return function(input) {
        return (input === false) ? '' : 'yes';
    };
});

appModule.filter('addTag', function() {
    return function(input) {
        return input ? (input + ':') : '';
    };
});

appModule.factory('output', ['$q', '$http', function($q, $http) {
    var output = {
        fetch: function() {
            var deferred = $q.defer();

            $http.get('output.json').success(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return output;
}]);

appModule.controller('fileController', ['$scope', 'output', function($scope, output) {
    $scope.scan = [];

    output.fetch().then(function(data) {
        $scope.scan = data;
    });
}]);