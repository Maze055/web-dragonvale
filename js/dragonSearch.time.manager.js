/**
 * @fileoverview
 *
 * This service performs time durations tasks,
 * by means of timeTweak service, on an array
 * of Time objects. Said tasks are only carried
 * out once, sice the results are cached.
 *
 * @see timeTweak
 * @see Time
 */

;(function(angular) {

angular.module('dragonSearch')

.service('TimeManager', ['TimeTweak', function(timeTweak) {
	var vm = this;

	/**
	 * @class
	 *
	 * @summary Constructs a new Data object with given
	 * time duration string and initial status.
	 *
	 * @classdesc This class holds all data necessary
	 * for TimeManager class to perform tasks, namely
	 * time status and cache.
	 *
	 * @private
	 * @memberof TimeManager.
	 *
	 * @prop {boolean} reduced - Indicates the current reduced/full status of the time duration.
	 * @prop {boolean} displayDays - Indicates whether the time currently shows days.
	 *
	 * @param {string} time - Time duration string to be cached.
	 * @param {boolean} reduced - True if the duration is reduced, will be set as initial status.
	 * @param {boolean} displayDays - True if the duration shows days, will be set as initial status.
	 */
	var Data = function(time, reduced, displayDays) {
		this.reduced = reduced;
		this.displayDays = displayDays;
		this.cache = {};

		this.addToCache(time);
	};

	/**
	 * @summary Returns cache keys for the current status.
	 *
	 * @private
	 *
	 * @typedef {object} CacheKeys
	 * @prop {string} duration - First-level-of-nesting cache key.
	 * @prop {string} format - Second-level-of-nesting cache key.
	 *
	 * @return {CacheKeys} An object containing both cache keys.
	 */
	Data.prototype.getCurrentCacheKeys = function() {
		return {
			duration: this.reduced ? 'reduced' : 'full',
			format: this.displayDays ? 'days' : 'noDays'
		};
	};

	/**
	 * This method adds a time string to the cache,
	 * indexing it basing on current status: the
	 * insertion is actually performed only if said
	 * index has no value. The cached time string
	 * is the first argument itself when it is the
	 * only one, otherwise it is retrieved by calling
	 * the supplied method of timeTweak with the
	 * first argument.
	 *
	 * @summary Adds a time string to the cache only when
	 * not already present.
	 *
	 * @param {string} sourceTime - The duration time string that will be cached when it's the only argument, the input of timeTweak method when there are two.
	 * @param {string} [method] - When provided, it's the timeTweak method that will be called to generate the cached time string.
	 * @return {TimeManager.Data} This instance, to allow chaining.
	 *
	 * @see timeTweak
	 */
	Data.prototype.addToCache = function(sourceTime, method) {
		var keys = this.getCurrentCacheKeys();

		// The first level of nesting is the duration, reduced/full
		if (!this.cache[keys.duration])
			this.cache[keys.duration] = {};

		// The second level of nesting is the format, days/noDays
		if (!this.cache[keys.duration][keys.format])
			this.cache[keys.duration][keys.format] = timeTweak[method] ?
					timeTweak[method](sourceTime) : sourceTime;

		return this;
	};

	/**
	 * @summary Returns the cached time corresponding
	 * to the current status.
	 *
	 * @return {string} The cached time of the current status.
	 */
	Data.prototype.getCurrentCachedTime = function() {
		var keys = this.getCurrentCacheKeys();

		return this.cache[keys.duration][keys.format];
	};

	/**
	 * @summary The Time object array all operations
	 * are performed on.
	 *
	 * @private
	 * @memberof TimeManager#
	 *
	 * @type {Time[]}
	 */
	vm.times = [];

	/**
	 * @summary Attaches a new TimeManager.Data object to a Time instance.
	 *
	 * @private
	 * @memberof TimeManager.
	 *
	 * @param {boolean} reduced - True if the duration is reduced, will be set as initial status.
	 * @param {boolean} displayDays - True if the duration shows days, will be set as initial status.
	 * @param {Time} time - Time instance data will be added to.
	 * @return {Time} The very same input Time instance, but with TimeManager data attached.
	 *
	 * @see TimeManager.Data
	 */
	var addData = function(reduced, displayDays, time) {
		return Object.defineProperty(time, 'TimeManager', {
			__proto__: null,
			configurable: false,
			enumarable: false,
			writable: false,
			value: new Data(time.time, reduced, displayDays)
		});
	};

	/**
	 * This method updates a status key of every Time
	 * instance of the internal collection to a new
	 * value. Consequently, the time duration string
	 * is updated, either by retrieving a cached value
	 * or by generating it using the supplied method
	 * of timeTweak service.
	 *
	 * @summary Updates status and time string duration
	 * of all internal Time instances.
	 *
	 * @private
	 * @memberof TimeManager#
	 *
	 * @param {string} method - The timeTweak method to call if the new time duration string is not cached.
	 * @param {string} status - The status key whose value will be updated.
	 * @param {boolean} newStatus - The new value of the status key.
	 *
	 * @see timeTweak
	 */
	var forEachTime = function(method, status, newStatus) {
		angular.forEach(vm.times, function(item) {
			var data = item.TimeManager;

			if (data[status] == newStatus)
				return;

			data[status] = newStatus;
			data.addToCache(item.time, method);

			item.time = data.getCurrentCachedTime();
		});
	};

	/**
	 * This method adds an array of Time instances to
	 * the internal collection. To allow some degree
	 * of flexibility, it can be also called with a
	 * single Time instances, that resolves to calling
	 * addTime() method. Finally, since it returns
	 * this instance, it is chainable.
	 *
	 * @summary Adds an array of Time instances to the array.
	 *
	 * @memberof TimeManager#
	 *
	 * @param {Time[]|Time} times - The times object that will be added. If a single one is passed, addTime() method is called.
	 * @param {boolean} reduced - When True, it means that all the passed durations are reduced.
	 * @param {boolean} displayDays - When True, it means that all the passed durations show days.
	 * @return {TimeManager} This instance.
	 */
	vm.addTimes = function(times, reduced, displayDays) {
		if (!angular.isArray(times))
			return vm.addTime(times, reduced, displayDays);

		vm.times = vm.times.concat(times.map(angular.bind(
					undefined, addData, reduced, displayDays)));
		return vm;
	};

	/**
	 * This method adds a single Time instance to the
	 * internal collection. To allow some degree of
	 * flexibility, it can be also called with an array
	 * of Time instances, that resolves to calling
	 * addTimes() method. Finally, since it returns
	 * this instance, it is chainable.
	 *
	 * @summary Adds a single Time instance to the array.
	 *
	 * @memberof TimeManager#
	 *
	 * @param {Time|Time[]} time - The time object that will be added. If an array is passed, addTimes() method is called.
	 * @param {boolean} reduced - True if the passed time is reduced.
	 * @param {boolean} displayDays - True if the passed time shows days.
	 * @return {TimeManager} This instance.
	 */
	vm.addTime = function(time, reduced, displayDays) {
		if (angular.isArray(time))
			return vm.addTimes(time, reduced, displayDays);

		vm.times.push(addData(reduced, displayDays, time));
		return vm;
	};

	/**
	 * @summary Reduces all durations by 20%, provided they are not already.
	 *
	 * @memberof TimeManager#
	 *
	 * @return {TimeManager} This instance.
	 */
	vm.reduce = function() {
		forEachTime('reduce', 'reduced', true);
		return vm;
	};

	/**
	 * @summary Increases all durations by 20%, provided they are not already.
	 *
	 * @memberof TimeManager#
	 *
	 * @return {TimeManager} This instance.
	 */
	vm.increase = function() {
		forEachTime('increase', 'reduced', false);
		return vm;
	};

	/**
	 * @summary Displays days on all durations, provided one lasts at least one.
	 *
	 * @memberof TimeManager#
	 *
	 * @return {TimeManager} This instance.
	 */
	vm.displayDays = function() {
		forEachTime('displayDays', 'displayDays', true);
		return vm;
	};

	/**
	 * @summary Converts days to hours on all durations.
	 *
	 * @memberof TimeManager#
	 *
	 * @return {TimeManager} This instance.
	 */
	vm.convertDays = function() {
		forEachTime('convertDays', 'displayDays', false);
		return vm;
	};
}]);

})(angular);
