(function () {
	'use strict';

	angular
		.module('travelFilter.nav', ['ui.router'])
		.controller('NavController', NavController);

	NavController.$inject = [];

	function NavController() {
		var vm = this;
		vm.title = 'NavController';


	}
})();