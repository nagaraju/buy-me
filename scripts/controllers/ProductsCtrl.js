(function () {
    'use strict';

    angular.module('buy-me').controller('ProductsCtrl', [ '$scope', function($scope) {
        $scope.rating = 0;
        $scope.ratings = [{
            current: 5,
            max: 10
        }, {
            current: 3,
            max: 5
        }];

        $scope.getSelectedRating = function (rating) {
            console.log(rating);
        }
    }]);
})();