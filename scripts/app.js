(function() {
    'use strict';

    angular.module('buy-me', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/products', {
                    templateUrl: 'views/products.html',
                    controller: 'ProductsCtrl'
                })
				/*.when('/firmware', {
                    templateUrl: 'views/firmwareGrps.html',
                    controller: 'FirmwareCtrl'
                })
                .when('/xre', {
                    templateUrl: 'views/xreGrps.html',
                    controller: 'XreCtrl'
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchCtrl'
                })*/
                // Default
                .otherwise({
                    redirectTo: '/products'
                });
    }]);
})();