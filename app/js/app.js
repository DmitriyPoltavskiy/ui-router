angular.module('app', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				template: '<h1>home</h1>'
			})
			.state('about', {
				url: '/about',
				template: '<h1>about</h1>'
			})
			.state('contacts', {
				url: '/contacts',
				template: '<h1>contacts</h1>'
			});
	});
