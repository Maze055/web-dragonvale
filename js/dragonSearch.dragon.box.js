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