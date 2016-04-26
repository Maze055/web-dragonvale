(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController', ['$http', function(ajax) {
	var vm = this;

	vm.reduced = false;
	vm.displayDays = false;
	vm.hints = [];

	ajax.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.then(function(data) {
		vm.names = data.data;
		vm.names.unshift({id: 0, name: 'Non specificato'});
		vm.dragon = vm.names[0];
	});


	vm.requestHint = function(id) {
		return ajax.get('../php/ajax.php', {params: {request: 'breed', id: id || vm.dragon.id,
				reduced: vm.reduced ? 1 : 0, displayDays: vm.displayDays ? 1 : 0}})
		.then(function(data) { vm.hints.unshift(data.data); });
	};

	vm.startsWith = function(string, substring) {
		if (!substring)
			return true;

		string = string.toLowerCase();
		substring = substring.toLowerCase();
		return string.indexOf(substring) === 0;
	};

	vm.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};
}]);

})(angular);
