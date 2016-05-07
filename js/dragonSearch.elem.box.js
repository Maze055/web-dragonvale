/**
 * @fileoverview
 *
 * This component is made up of a picture of
 * an element and its English name below.
 *
 * The input is an English element name, given
 * as a plain string. There are no outputs.
 */

(function(angular) {

angular.module('dragonSearch')

.component('elemBox', {
	controllerAs: 'model',
	templateUrl: '../html/elem-box.html',

	bindings: {
		name: '<'
	},

	controller: ['image', function(image) {
		this.imgURL = image.getElemFlagImg(this.name);
	}]
});

})(angular);