/**
 * @fileoverview
 *
 * This file contains the definition of the
 * this website AngularJS module.
 */

;(function(angular) {

angular.module('l42y.sprintf', [
]).filter('sprintf', function (
	$window
) {
	return function () {
		return $window.sprintf.apply(this, arguments);
	};
}).filter('vsprintf', function (
	$window
) {
	return function (format, array) {
		return $window.vsprintf(format, array);
	};
});

angular.module('dragonSearch', [
	'ui.select',
	'ngSanitize',
	'angular-md5',
	'angularMoment',
	'l42y.sprintf',
	'pager'
]);

})(angular);
