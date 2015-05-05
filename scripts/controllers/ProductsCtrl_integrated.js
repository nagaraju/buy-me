(function () {
    'use strict';

    angular.module('buy-me').controller('ProductsCtrl', [ '$scope', '$http', '$interval',
        function($scope, Server, $interval) {

        $scope.ramnum = 0;
        var productIdUrl = 'mock/productId.json';
        var productsData = 'mock/products.json';
        $scope.productIds = [];
        // Utility function for HTTP GET
        var httpGet = function (url, success, failure) {
            Server.get(url).success(success).error(failure);
        };

        // Utility function for HTTP POST
        var httpPost = function (url, data, success, failure) {
            Server.get(url, data).success(success).error(failure);
        };

        $scope.getSelectedRating = function (rating) {
            console.log(rating);
        };

        $scope.getProductId = function () {
            httpGet(productIdUrl, getProductIdSuccess, getProductIdFailure);
        };

        var getProductIdSuccess = function (data, status, headers, config) {
            console.debug("Product ID :: " + parseInt(data['id']));
            if ($scope.productIds.length > 0) {
                console.debug($scope.productIds[$scope.productIds.length-1] + " :: " + parseInt(data['id']))
                if ($scope.productIds[$scope.productIds.length] === parseInt(data['id'])) {
                    console.debug('returning');
                    return;
                }
            }
            $scope.productIds.push(parseInt(data['id']));
            updateProductInfo();
        };

        var getProductIdFailure = function (data, status, headers, config) {
            console.debug("Unable to fetch the Product ID")
        };

        var updateProductInfo = function () {
            httpGet(productsData, getProductsDataSuccess, getProductsDataFailure);
        };

        var getProductsDataSuccess = function (data, status, headers, config) {
			if($scope.ramnum > 1) {
				$scope.ramnum = 0;
			}
            updateProductDetails(data[$scope.ramnum]);
			$scope.ramnum++

        };

        var getProductsDataFailure = function (data, status, headers, config) {
             console.debug("Error while getting the products Data")
        };

        var updateProductDetails = function (productObj) {
            $scope.title = productObj['title'];
            $scope.image = productObj['previewImage'];
            $scope.rating = productObj['rating'];
            $scope.info = productObj['description'];
            $scope.offers = productObj['offers'];
            $scope.sellers = productObj['sellers'];
            $scope.specifications = productObj['specifications'];
            $scope.reviews = productObj['sellers'];
        };

//        $interval($scope.getProductId, 30000);
		console.log("My server IP: "+document.location.host);
    var exampleSocket = new WebSocket("ws://10.0.0.6:8081", "protocolOne");

    // When the connection is open, send some data to the server
    exampleSocket.onopen = function (event) {
        exampleSocket.send("Here's some text that the server is urgently awaiting!");
        console.log("i am conectd to server.....");
		window.setInterval(function () {exampleSocket.send("Ping")}, 900);
    };

    exampleSocket.onmessage = function (event) {
        console.log("Server : "+event.data);
		console.log(event.data.indexOf('Hello'));
		if (event.data.indexOf('Hello') > 0)
		{
			return;
		}
		if ($scope.productIds.length > 0) {
			console.debug($scope.productIds[$scope.productIds.length-1] + " :: " + event.data)
			if ($scope.productIds[$scope.productIds.length-1] === event.data) {
				console.debug('returning');
				return;
			}
		}
		$scope.productIds.push(event.data);
		updateProductInfo();
    }

    // Log errors
    exampleSocket.onerror = function (error) {
        console.log('WebSocket Error %0',  error);
    };

    }]);
})();