/**
 * @fileoverview
 *
 * This filter is meant as a circular version of
 * AngularJS built-in limitTo filter: when one
 * end of the input array is reached, but less
 * elements than requested would be returned,
 * it just gets them wrapping to the other end,
 * stopping where it begun at most.
 *
 * Mind that this is still a filter, so an array
 * having more elements than the input, meaning
 * that it has duplicates, will never be returned.
 * For example, asking for 7 elements when source
 * only has 3 will return a 3-element-long array.
 *
 * @see {https://docs.angularjs.org/api/ng/filter/limitTo AngularJS built-in limitTo filter}.
 */

(function(angular) {

angular.module('dragonSearch')

.filter('circularLimitTo', ['limitToFilter', function(limitTo) {
	return function(input, limit, begin) {
		var subInput = limitTo(input, limit, begin);

		// Limit can be negative
		var absLimit = Math.abs(limit);

		/*
			This also handles the case in which begin is 0,
			regardless of limit, because, if starting from 0,
			limitTo returns when either all or enough elements
			are taken from input, that is the if condition;
			moreover, the case when limit is negative and begin
			is positive is included too, due to limitTo setting
			the latter to 0.
		*/
		if (subInput.length == absLimit
				|| subInput.length == input.length)
			return subInput;

		/*
			Math.min us used to avoid taking more elements
			than input actually holds.
		*/
		var missingCount = Math.min(absLimit, input.length)
				- subInput.length;

		/*
			When limit is negative it must wrap to the end
			of the array, that is achieved via passing down
			to limitTo a negative second argument
		*/
		return subInput.concat(limitTo(input, limit < 0 ?
				-missingCount : missingCount));
	};
}]);

})(angular);