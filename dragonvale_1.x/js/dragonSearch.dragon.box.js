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

;(function(angular) {

angular.module('dragonSearch')

.component('dragonBox', {
	controllerAs: 'model',
	templateUrl: '../html/dragon-box.html',

	bindings: {
		dragon: '<',

		onClick: '&'
	},

	controller: ['Image', function(image) {
		var vm = this;

		vm.eggImgURL = image.getEggImg(vm.dragon.name);
		vm.dragonImgURL = image.getDragonImg(vm.dragon.name);
		vm.elemsImgsURLs = [];
		angular.forEach(vm.dragon.elems, function(elem) {
			vm.elemsImgsURLs.push(image.getElemFlagImg(elem));
		});
	}]
});

})(angular);
