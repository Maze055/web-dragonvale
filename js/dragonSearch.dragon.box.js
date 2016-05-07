/**
 * @fileoverview
 *
 * This component is made up of the pictures
 * of a dragon in its adult stage and its egg,
 * followed by dragons name and hatching time,
 * and finally by the elemental flag pictures
 * of its elements.
 *
 * The input is a Dragon instance, whose data
 * will be rendered.
 *
 * The output is a callback, onClick, fired on
 * the namesake event: an 'id' argument is
 * passed, holding the represented dragon id.
 *
 * @see Dragon
 */

(function(angular) {

angular.module('dragonSearch')

.component('dragonBox', {
	controllerAs: 'model',
	templateUrl: '../html/dragon-box.html',

	bindings: {
		dragon: '<',

		onClick: '&'
	},

	controller: ['image', function(image) {
		this.eggImgURL = image.getEggImg(this.dragon.name);
		this.dragonImgURL = image.getDragonImg(this.dragon.name);
		this.elemsImgsURLs = [];
		angular.forEach(this.dragon.elems, (function(elem) {
			this.elemsImgsURLs.push(image.getElemFlagImg(elem));
		}).bind(this));
	}]
});

})(angular);