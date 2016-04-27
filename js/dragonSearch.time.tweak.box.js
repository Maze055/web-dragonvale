(function(angular) {

angular.module('dragonSearch')

.component('timeTweakBox', {
	controllerAs: 'model',
	templateUrl: '../html/time-tweak-box.html',

	bindings: {
		dragons: '<',

		onReduChange: '&',
		onDdChange: '&'
	},

	controller: ['timeTweak', function(timeTweak) {
		this.reduced = false;
		this.displayDays = false;

		this.tweakTimes = function() {
			var method = this.reduced ? 'reduce' : 'unReduce';

			angular.forEach(this.dragons, (function(dragon) {
				dragon.time = timeTweak[method](dragon.time,
						this.displayDays);
			}).bind(this));
		};

		this.toggleFormat = function() {
			angular.forEach(this.dragons, (function(dragons) {
				dragons.time = timeTweak.format(dragons.time,
						this.displayDays);
			}).bind(this));
		};
	}]
});

})(angular);