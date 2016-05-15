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

(function(angular) {

angular.module('dragonSearch')

.service('BreedingHints', ['$http', 'TimeManager', function(http, times) {

	/**
	 * @summary Array of managed Hints objects.
	 *
	 * @private
	 */
	this.hints = [];

	/**
	 * This method requests the breeding hint of a dragon:
	 * if it has been required previously, it's just moved
	 * to the top position, otherwise an AJAX request to
	 * get it is performed, placing the result straight at
	 * the beginning. In this latter case, hatching times
	 * of the required dragon and its possible parents are
	 * added to TimeMaganer. When performing AJAx request,
	 * this method is chainable, since it returns an
	 * AngularJS $q instance.
	 *
	 * @summary Retrieves the breeding hint of the passed/selected
	 * dragon through AJAX, or moves it to the top if existing.
	 *
	 * @memberof BreedingHints#
	 *
	 * @param {int} id - Id of the dragon whose breeding hint will be retrieved.
	 * @param {boolean} reduced - When true, dragons hatching times will be reduced.
	 * @param {boolean} displayDays - When true, dragons hatching times will display days.
	 * @return {$q} AngularJS promise instance, to allow methods chaining.
	 *
	 * @see Hint
	 */
	this.requestHint = function(id, reduced, displayDays) {
		var hintIndex = this.hints.findIndex(function(hint) {
				return id == hint.id;
			});

		// Hint not found, requesting it through AJAX
		if (hintIndex == -1)
			return http.get('../php/ajax.php', {params: {request: 'breed',
					id: id, reduced: reduced, displayDays: displayDays}})
			.then((function(data) {

				// data.data is expected to be an instance of Hint.
				var hint = data.data;

				this.hints.unshift(hint);

				times.addTime(hint, reduced, displayDays);
				if (hint.parent1)
					times.addTime(hint.parent1, reduced, displayDays);
				if (hint.parent2)
					times.addTime(hint.parent2, reduced, displayDays);
			}).bind(this));

		// Hint found, but not first: moving to top
		if (hintIndex)
			this.hints.unshift(this.hints.splice(hintIndex, 1)[0]);
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
	this.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};

	/**
	 * @summary Getter for hints property.
	 *
	 * @return {Hint[]} hints property of this instance.
	 *
	 * @see Hint
	 */
	this.getHints = function() {
		return this.hints;
	};
}]);

})(angular);