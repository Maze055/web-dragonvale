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