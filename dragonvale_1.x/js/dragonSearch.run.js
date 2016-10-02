/**
 * @fileoverview
 *
 * This file contains the run blocks for this
 * website AngularJS module, particularly
 * polyfill loading through AJAX and Modernizr.
 */

;(function(angular, Modernizr) {

angular.module('dragonSearch')

/*
	This constant is only used here by now,
	and this situation very lileky to stay
	this way, so it's pointless to define
	it elsewhere.
*/
.constant('Modernizr', Modernizr)

/*
	This run block loads the polyfills needed
	by every component of the application,
	using Modernizr for feature detection and
	JSONP AJAX requests to retrieve shims.
*/
.run(['Modernizr', '$http', function(Modernizr, http) {
	if (!Modernizr.es6string)
		http.jsonp('/util/js/polyfills/String.startsWith.js');

	if (!Modernizr.es6array)
		http.jsonp('/util/js/polyfills/Array.findIndex.js');

	if (!Modernizr.es5array)
		http.jsonp('/util/js/polyfills/Array.map.js');
}]);

})(angular, Modernizr);
