/**
 * @fileoverview
 *
 * This service manages an array of Hint objects:
 * this includes tasks such as AJAX retrieval and
 * local recycle.
 * Also, new dragons are added to TimesManager,
 * since the time they carry ought to be tweakable.
 *
 * @see Hint
 * @see TimeManager
 */

;(function(angular) {

angular.module('dragonSearch')

.service('BreedingHints', ['$http', 'TimeManager', function(http, times) {
	var vm = this;

	/**
	 * @summary Array of managed Hints objects.
	 *
	 * @private
	 * @memberof BreedingHints#
	 */
	vm.hints = [];

	/**
	 * This method performs an AJAX request to get the breeding
	 * hint of the dragon whose id has been passed, placing it
	 * straight at the beginning of hints array. Also, hatching
	 * times of the required dragon and its possible parents are
	 * added to TimeMaganer. Returning an AngularJS promise
	 * instance, this method is chainable.
	 *
	 * @summary Requests a breeding hint through AJAX and places
	 * it at the top of hints array.
	 *
	 * @private
	 * @memberof BreedingHints.
	 *
	 * @param {int} id - Id of the dragon whose breeding hint will be retrieved.
	 * @param {boolean} reduced - When true, dragons hatching times will be reduced.
	 * @param {boolean} displayDays - When true, dragons hatching times will display days.
	 * @return {$q} AngularJS promise instance, to allow chaining.
	 *
	 * @see Hint
	 */
	var requestHint = function(id, reduced, displayDays) {
		return http.get('ajax.php', {params: {request: 'breed',
					id: id, reduced: reduced, displayDays: displayDays}})
			.success(function(hint) {

				// hint is expected to be an instance of Hint.
				vm.hints.unshift(hint);

				times.addTime(hint, reduced, displayDays);
				if (hint.parent1)
					times.addTime(hint.parent1, reduced, displayDays);
				if (hint.parent2)
					times.addTime(hint.parent2, reduced, displayDays);
			});
	};

	/**
	 * This method requests the breeding hint of a dragon:
	 * if it has been required previously, it's just moved
	 * to the top position, otherwise an AJAX request to
	 * get it is performed. This method is chainable, since
	 * it returns this instance.
	 *
	 * @summary Retrieves the breeding hint of the passed/selected
	 * dragon through AJAX, or moves it to the top if existing.
	 *
	 * @memberof BreedingHints#
	 *
	 * @param {int} id - Id of the dragon whose breeding hint will be retrieved.
	 * @param {boolean} reduced - When true, dragons hatching times will be reduced.
	 * @param {boolean} displayDays - When true, dragons hatching times will display days.
	 * @return {BreedingHints} This instance.
	 *
	 * @see Hint
	 */
	vm.newHint = function(id, reduced, displayDays) {
		var hintIndex = vm.hints.findIndex(function(hint) {
				return id == hint.id;
			});

		// Hint not found, requesting it through AJAX
		if (hintIndex == -1)
			requestHint(id, reduced, displayDays);

		// Hint found, but not first: moving to top
		else if (hintIndex)
			vm.hints.unshift(vm.hints.splice(hintIndex, 1)[0]);

		return vm;
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
	 * @memberof BreedingHints#
	 *
	 * @param {Hint} hint - The input breeding hint.
	 * @return {boolean} True when the passed hint is a basic breeding rule one.
	 */
	vm.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};

	/**
	 * @summary Getter for hints property.
	 *
	 * @memberof BreedingHints#
	 *
	 * @return {Hint[]} hints property of this instance.
	 *
	 * @see Hint
	 */
	vm.getHints = function() {
		return vm.hints;
	};
}]);

})(angular);
