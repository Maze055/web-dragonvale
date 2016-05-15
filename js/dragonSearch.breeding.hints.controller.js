/**
 * @fileoverview
 *
 * This file contains the definition of the controller
 * for breeding hints page, BreedingHintsController.
 *
 * @see BreedingHints
 */

(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController',
		['$http', 'BreedingHints', function(http, hints) {
	var vm = this;

	vm.reduced;								// Reduced time checkbox
	vm.displayDays;							// Display days checkbox
	vm.names;								// List of dragon names to populate the menu
	vm.dragon;								// Selected dragon
	vm.hints = hints.getHints();			// Currently loaded hints

	// AJAX request to populate dragon names menu
	http.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.then(function(data) {

		// data.data is expected to have 'id' and 'name' properties.
		vm.names = data.data;
	});

	/**
	 * @summary Adds the breeding hint of the passed/selected
	 * dragon.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {int} [id=vm.dragon.id] - Id of the dragon whose breeding hint will be retrieved.
	 * @return {$q} AngularJS promise instance, to allow methods chaining.
	 *
	 * @see Hint
	 * @see BreedingHints#requestHint
	 */
	vm.addHint = function(id) {
		return hints.requestHint(id || vm.dragon.id, vm.reduced,
				vm.displayDays);
	};

	/**
	 * @summary Case-insensitive version of startsWith()
	 * method of JavaScript built-in String object.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {string} string - The string that will be scanned.
	 * @param {string} [substring] - The string that will be searched for.
	 * @return {boolean} True if string starts with substring.
	 */
	vm.startsWithCi = function(string, substring) {
		return string.toLowerCase().startsWith(
				substring.toLowerCase());
	};

	/**
	 * This method is a simple setter for the reduced property.
	 * Since it returns this instance, it is chainable.
	 *
	 * @summary Setter for reduced property.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {boolean} reduced - The new value of reduced property.
	 * @return {BreedingHintsController} This instance.
	 */
	vm.setReduced = function(reduced) {
		vm.reduced = reduced;
		return this;
	};

	/**
	 * This method is a simple setter for the displayDays property.
	 * Since it returns this instance, it is chainable.
	 *
	 * @summary Setter for displayDays property.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {boolean} displayDays - The new value of displayDays property.
	 * @return {BreedingHintsController} This instance.
	 */
	vm.setDisplayDays = function(displayDays) {
		vm.displayDays = displayDays;
		return this;
	};

	/**
	 * @summary Checks whether basic breeding rule is to be
	 * applied for the provided breeding hint.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {Hint} hint - The input breeding hint.
	 * @return {boolean} True when the passed hint is a basic breeding rule one.
	 *
	 * @see Hint
	 * @see BreedingHints#isBasicBreedingRule
	 */
	vm.isBasicBreedingRule = function(hint) {
		return hints.isBasicBreedingRule(hint);
	};
}]);

})(angular);
