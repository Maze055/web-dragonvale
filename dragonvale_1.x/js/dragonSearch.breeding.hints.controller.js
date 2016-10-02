/**
 * @fileoverview
 *
 * This file contains the definition of the controller
 * for breeding hints page, BreedingHintsController.
 *
 * @see BreedingHints
 */

;(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController',
		['$http', 'BreedingHints', function(http, hints) {
	var vm = this;

	vm.reduced;						// Reduced time checkbox
	vm.displayDays;					// Display days checkbox
	vm.names;						// List of dragon names to populate the menu
	vm.dragon;						// Selected dragon
	vm.hints = hints.getHints();	// Currently loaded hints
	vm.currentHint = 0;				// Index of the first hint to be displayed
	vm.pageLength = 10;				// Hint page length

	// AJAX request to populate dragon names menu
	http.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.success(function(names) {

		// names element are expected to have 'id' and 'name' properties.
		vm.names = names;
	});

	/**
	 * This method adds/moves to the top of hints collection
	 * the breeding hint of the passed/selected dragon,
	 * bringing it into view by setting its index as the
	 * currently displayed one.
	 *
	 * @summary Adds the breeding hint of the passed/selected
	 * dragon and brings it to view.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {int} [id=vm.dragon.id] - Id of the dragon whose breeding hint will be retrieved.
	 * @return {BreedingHintsController} This instance.
	 *
	 * @see Hint
	 * @see BreedingHints#requestHint
	 */
	vm.addHint = function(id) {
		hints.newHint(id || vm.dragon.id, vm.reduced,
				vm.displayDays);
		vm.setCurrentHint(0);
		return vm;
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
		return vm;
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
		return vm;
	};

	/**
	 * This method is a simple setter for the currentHint property.
	 * Since it returns this instance, it is chainable.
	 *
	 * @summary Setter for currentHint property.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {int} position - The new value of currentHint property.
	 * @return {BreedingHintsController} This instance.
	 */
	vm.setCurrentHint = function(position) {
		vm.currentHint = position;
		return vm;
	};

	/**
	 * This method is a simple setter for the pageLength property.
	 * Since it returns this instance, it is chainable.
	 *
	 * @summary Setter for pageLength property.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {int} length - The new value of pageLength property.
	 * @return {BreedingHintsController} This instance.
	 */
	vm.setPageLength = function(length) {
		vm.pageLength = length;
		return vm;
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
	vm.isBasicBreedingRule = angular.bind(hints, hints.isBasicBreedingRule);
}]);

})(angular);
