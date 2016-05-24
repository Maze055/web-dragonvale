/**
 * @fileoverview
 *
 * This component is roughly a GUI for TimeManager
 * service: it's made up of two checkboxes that
 * activate time reduction and days display when
 * checked.
 *
 * It has no explicit inputs, since it's actually
 * TimeManager that does the real work. The outputs
 * are two callbacks, onReduChange and onDdChange,
 * fired on every value change of reduced and
 * displayDays respectively: the former has the new
 * value in key 'redu', the latter in 'dd'. They
 * are also called in initializaton phase with
 * initial values.
 *
 * @see TimeManager
 */

(function(angular) {

angular.module('dragonSearch')

.component('timeTweakBox', {
	controllerAs: 'model',
	templateUrl: '../html/time-tweak-box.html',

	bindings: {
		onReduChange: '&',
		onDdChange: '&'
	},

	controller: ['TimeManager', function(times) {
		this.reduced = false;		// Reduced time checkbox
		this.displayDays = false;	// Display days checkbox

		// Parent initialization
		this.onReduChange({redu: this.reduced});
		this.onDdChange({dd: this.displayDays});

		/**
		 * This method reduces/increases all times
		 * in TimeManager basing on the value of
		 * this.reduced.
		 *
		 * @summary Reduces/increases TimeManager times.
		 *
		 * @memberof TimeTweakBox#
		 *
		 * @return {TimeTweakBox} This instance.
		 */
		this.tweakTimes = function() {
			if (this.reduced)
				times.reduce();
			else
				times.increase();
			return this;
		};

		/**
		 * This method changes the format of all times
		 * in TimeManager basing on the value of
		 * this.displayDays.
		 *
		 * @summary Changes the format of TimeManager times.
		 *
		 * @memberof TimeTweakBox#
		 *
		 * @return {TimeTweakBox} This instance.
		 */
		this.toggleFormat = function() {
			if (this.displayDays)
				times.displayDays();
			else
				times.convertDays();
			return this;
		};
	}]
});

})(angular);