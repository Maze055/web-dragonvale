/**
 * @fileoverview
 *
 * This service defines methods that operate with
 * time durations: they can be reduced/increased
 * by 20% and days can be separetely displayed or
 * added to hours. All this is achieved thanks to
 * {@link http://momentjs.com/docs/#/durations/ moment.js duration class}
 * and {@link https://github.com/alexei/sprintf.js sprintf.js}.
 */

(function(angular) {

angular.module('dragonSearch')

.service('timeTweak', ['sprintfFilter', 'moment', function(sprintf, moment) {

	/**
	 * @summary sprintf format that displays days.
	 *
	 * @private
	 */
	var daysfulFormat = '%02d:%02d:%02d:%02d';

	/**
	 * @summary sprintf format that doesn't display days.
	 *
	 * @private
	 */
	var dayslessFormat = '%02d:%02d:%02d';

	/**
	 * This method creates a moment.duration instance
	 * from a colon-separed time duration string, in
	 * either 'dd:HH:mm:ss' or 'HH:mm:ss' format. If
	 * the input already is a moment.duration object,
	 * it is left untouched.
	 *
	 * @summary Creates a moment.duration object from
	 * a time duration string.
	 *
	 * @private
	 *
	 * @param {string|moment.duration} time - Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
	 * @return {moment.duration} A moment.duration instance derived from input.
	 *
	 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
	 */
	var makeDuration = function(time) {
		if (moment.isDuration(time))
			return time;

		/*
			Days are present, so transforming string
			according to moment.js specifications.
			http://momentjs.com/docs/#/durations/creating/
		*/
		if (typeof(time) == 'string' && time.length > 8)
			time = time.replace(':', '.');

		return moment.duration(time);
	};

	/**
	 * This method formats a time duration to either
	 * 'dd:HH:mm:ss' or HH:mm:ss' format: in other
	 * words days are either displayed or converted
	 * to hours.
	 *
	 * @summary Formats a time duration to either
	 * 'dd:HH:mm:ss' or HH:mm:ss' format.
	 *
	 * @private
	 *
	 * @param {string|moment.duration} time - Input time duration: when string, only 'dd:HH:mm:ss' and 'HH:mm:ss' format are accepted.
	 * @param {boolean} putDays - When true, the result will be in 'dd:HH:mm:ss' format, but days will be hidden if none. When false, 'HH:mm:ss' format will be used.
	 * @return {string} Time duration string in either 'dd:HH:mm:ss' or HH:mm:ss' format.
	 *
	 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
	 */
	var format = function(time, putDays) {
		time = makeDuration(time);

		/*
			moment.duration().as*() methods all return
			doubles: truncation is handled by sprintf
			due to %d format.
		*/
		var daysCount = time.asDays();
		if (putDays && daysCount >= 1)
			return sprintf(daysfulFormat, daysCount, time.hours(),
					time.minutes(), time.seconds());
		return sprintf(dayslessFormat, time.asHours(),
				time.minutes(), time.seconds());
	};

	/**
	 * This method multiplies the provided time duration
	 * by a given value, then displays result as specified.
	 *
	 * @summary Multiplies time durations by a value and
	 * handles formatting.
	 *
	 * @param {string|moment.duration} time - Input time duration: when string, only 'dd:HH:mm:ss' and 'HH:mm:ss' format are accepted.
	 * @param {number} multiplier - Value the time duration will be multiplied by.
	 * @param {boolean} putDays - If true, days will be displayed in the result, if any.
	 * @return {string} The new time duration, varied and formatted as specified.
	 */
	var tweakTime = function(time, multiplier, putDays) {
		return format(moment.duration(makeDuration(time)
				.asMilliseconds() * multiplier), putDays);
	};

	/**
	 * This method accepts a colon-separed time duration
	 * string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format,
	 * and returns another one of the same duration but
	 * with days displayed, that is the former format, only
	 * when there is at least one.
	 *
	 * @summary Displays days in the passed time duration string.
	 *
	 * @param {string} time - Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
	 * @return {string} Time duration string in 'dd:HH:mm:ss' format, with no days if none in input.
	 */
	this.putDays = function(time) {
		return format(time, true);
	};

	/**
	 * This method accepts a colon-separed time duration
	 * string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format,
	 * and returns another one of the same duration but
	 * with days converted to hours, that is the latter format.
	 *
	 * @summary Convert days into hours in the provided
	 * time duration string.
	 *
	 * @param {string} time - Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
	 * @return {string} Time duration string in 'HH:mm:ss' format.
	 */
	this.convertDays = function(time) {
		return format(time, false);
	};

	/**
	 * This method accepts a colon-separed time duration
	 * string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format,
	 * and returns another reduced by 20%, displaying
	 * days as specified.
	 *
	 * @summary Reduces a time duration by 20%.
	 *
	 * @param {string} time - Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
	 * @param {boolean} putDays - If true, days will be displayed in the result, if any.
	 * @return {string} Time duration string reduced by 20%.
	 */
	this.reduce = function(time, putDays) {
		return tweakTime(time, 0.8, putDays);
	};

	/**
	 * This method accepts a colon-separed time duration
	 * string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format,
	 * and returns another increased by 20%, displaying
	 * days as specified.
	 *
	 * @summary Increases a time duration by 20%.
	 *
	 * @param {string} time - Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
	 * @param {boolean} putDays - If true, days will be displayed in the result, if any.
	 * @return {string} Time duration string increased by 20%.
	 */
	this.increase = function(time, putDays) {
		return tweakTime(time, 1.25, putDays);
	};
}]);

})(angular);