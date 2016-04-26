(function(angular) {

angular.module('dragonSearch')

.component('elemBox', {
	controllerAs: 'model',
	templateUrl: '../html/elem-box.html',

	bindings: {
		name: '<'
	},

	controller: ['images', function(images) {
		this.imgURL = images.getElemFlagImg(this.name);
	}]
});

})(angular);