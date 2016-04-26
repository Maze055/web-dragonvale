(function(angular) {

angular.module('dragonSearch')

.component('dragonBox', {
	controllerAs: 'model',
	templateUrl: '../html/dragon-box.html',

	bindings: {
		dragon: '<',

		onClick: '&'
	},

	controller: ['images', function(images) {
		this.eggImgURL = images.getEggImg(this.dragon.name);
		this.dragonImgURL = images.getDragonImg(this.dragon.name);
		this.elemsImgsURLs = [];
		angular.forEach(this.dragon.elems, (function(elem) {
			this.elemsImgsURLs.push(images.getElemFlagImg(elem));
		}).bind(this));
	}]
});

})(angular);