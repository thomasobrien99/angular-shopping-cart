var app = angular.module('ShoppingCart', ['ngRoute'])

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/about', {
			templateUrl: 'partials/about.html'
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html'
		})
		.when('/checkout', {
			templateUrl: 'partials/checkout.html'
		})
		.otherwise({
			redirectTo: '/'
		})
	$locationProvider.html5Mode(true);
})