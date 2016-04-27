(function(angular) {

angular.module('dragonSearch')

.service('timeTweak', ['sprintfFilter', 'moment', function(sprintf, moment) {
	var daysfulFormat = '%02d:%02d:%02d:%02d';
	var dayslessFormat = '%02d:%02d:%02d';

	var makeDuration = function(time) {
		if (moment.isDuration(time))
			return time;

		if (typeof(time) == 'string' && time.length > 8)
			time = time.replace(':', '.');

		return moment.duration(time);
	};

	var tweakTime = (function(time, multiplier, putDays) {
		return this.format(moment.duration(makeDuration(time)
				.asMilliseconds() * multiplier), putDays);
	}).bind(this);

	this.format = function(time, putDays) {
		time = makeDuration(time);

		var daysCount = Math.floor(time.asDays());
		if (putDays && daysCount > 0)
			return sprintf(daysfulFormat, daysCount, time.hours(),
					time.minutes(), time.seconds());
		return sprintf(dayslessFormat, time.asHours(),
				time.minutes(), time.seconds());
	};

	this.reduce = function(time, putDays) {
		return tweakTime(time, 0.8, putDays);
	};

	this.unReduce = function(time, putDays) {
		return tweakTime(time, 1.25, putDays);
	};
}]);

})(angular);