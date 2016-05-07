/**
 * @fileoverview
 *
 * This component is made up of two checkboxes
 * that manipulate hatching times of an array
 * of dragon objects using timeTweak service.
 *
 * The only input is an array of Dragon instances,
 * whose hatching times will be manipulated.
 *
 * The outputs are two callbacks, onReduChange
 * and onDdChange, fired on every value change
 * of reduced and displayDays respectively:
 * the former has the new value in key 'redu',
 * the latter in 'dd'. They are also called in
 * initializaton phase with initial values.
 *
 * @see Dragon
 */

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
		this.reduced = false;		// Reduced time checkbox
		this.displayDays = false;	// Display days checkbox

		// Parent initialization
		this.onReduChange({redu: this.reduced});
		this.onDdChange({dd: this.displayDays});

		/**
		 * This method reduces/increases all times
		 * in dragons array basing on the value of
		 * this.reduced.
		 */
		this.tweakTimes = function() {
			var method = this.reduced ? 'reduce' : 'increase';

			angular.forEach(this.dragons, (function(dragon) {
				dragon.time = timeTweak[method](dragon.time,
						this.displayDays);
			}).bind(this));
		};

		/**
		 * This method changes the format of all times
		 * in dragons array basing on the value of
		 * this.displayDays.
		 */
		this.toggleFormat = function() {
			var method = this.displayDays ? 'putDays' : 'convertDays';

			angular.forEach(this.dragons, function(dragons) {
				dragons.time = timeTweak[method](dragons.time);
			});
		};
	}]
});

})(angular);