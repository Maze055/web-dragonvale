/**
 * @fileoverview
 *
 * This file contains the definition of
 * the controller for breeding hints page,
 * BreedingHintsController
 */

(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController',
		['$http', 'timeTweak', function(ajax) {
	var vm = this;

	vm.reduced;				// Reduced time checkbox
	vm.displayDays;			// Display days checkbox
	vm.names;				// List of dragon names to populate the menu
	vm.dragon;				// Selected dragon
	vm.hints = [];			// Currently loaded hints
	vm.dragonBoxes = [];	// All displayed dragon boxes, for timeTweakBox

	// AJAX request to populate dragon names menu
	ajax.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.then(function(data) {

		// data.data is expected to have 'id' and 'name' properties.
		vm.names = data.data;
	});

	vm.findHintById = function(id) {
		for (var index in vm.hints)
			if (vm.hints[index].id == id)
				return index;
		return -1;
	};

	/**
	 * This method requests the breeding hint of either the
	 * passed dragon or the selected one in vm.dragon: if it
	 * has been required previously, it's just moved to the
	 * top position of vm.hints, otherwise an AJAX request
	 * to get it is performed, and the result is placed
	 * straight at the beginning of vm.hints. In this latter
	 * case vm.dragonBoxes is also updated with Dragon
	 * instances of the required dragon and its possible
	 * parents. When performing AJAx request, this method is
	 * chainable, since it returns an AngularJS $q instance.
	 *
	 * @summary Retrieves the breeding hint of the passed/selected
	 * dragon through AJAX, or moves it to the top if existing.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {int} [id=vm.dragon.id] - Id of the dragon whose breeding hint will be retrieved.
	 * @return {$q} AngularJS promise instance, to allow methods chaining.
	 *
	 * @see Hint
	 */
	vm.requestHint = function(id) {

		// Setting default value for id
		id = id || vm.dragon.id;

//		var index = vm.hints.findIndex(function(dragon) {
//				return dragon.id == id;
//			});

		var hintIndex = vm.findHintById(id);

		// Hint not found, requesting it through AJAX
		if (hintIndex == -1)
			return ajax.get('../php/ajax.php', {params: {request: 'breed', id: id,
					reduced: vm.reduced, displayDays: vm.displayDays}})
			.then(function(data) {

				// data.data is expected to be an instance of Hint.
				vm.hints.unshift(data.data);

				vm.dragonBoxes.push(data.data);
				if (data.data.parent1)
					vm.dragonBoxes.push(data.data.parent1);
				if (data.data.parent2)
					vm.dragonBoxes.push(data.data.parent2);
			});

		// Hint found, but not first: moving to top
		if (hintIndex)
			vm.hints.unshift(vm.hints.splice(hintIndex, 1)[0]);
	};

	/**
	 * This method returns true when substring is the
	 * beginning of string; the comparison is case-
	 * insensitive and no value and empty string are
	 * considered a successful match. Basically, it is
	 * an implementation of the namesake String method
	 * of ES6 specification.
	 *
	 * @summary Checks if string begins with substring.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {string} string - The string that will be scanned.
	 * @param {string} [substring] - The string that will be searched for.
	 * @returns {boolean} True if string starts with substring.
	 */
	vm.startsWith = function(string, substring) {
		if (!substring)
			return true;

		string = string.toLowerCase();
		substring = substring.toLowerCase();
		return string.indexOf(substring) === 0;
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
	 * @returns {BreedingHintsController} This instance.
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
	 * @returns {BreedingHintsController} This instance.
	 */
	vm.setDisplayDays = function(displayDays) {
		vm.displayDays = displayDays;
		return this;
	};

	/**
	 * This method returns true when the passed breeding hint
	 * is a basic breeding rule one: this is the default case,
	 * in other words no notes, no required breed elements and
	 * no parents.
	 *
	 * @summary Checks whether basic breeding rule is to be
	 * applied for the provided breeding hint.
	 *
	 * @memberof BreedingHintsController#
	 *
	 * @param {Hint} hint - The input breeding hint.
	 * @returns {boolean} True when the passed hint is a basic breeding rule one.
	 */
	vm.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};
}]);

})(angular);
