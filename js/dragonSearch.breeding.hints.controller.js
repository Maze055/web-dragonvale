(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController',
		['$http', 'timeTweak', function(ajax, timeTweak) {
	var vm = this;

	vm.reduced = false;
	vm.displayDays = false;
	vm.hints = [];
	vm.dragons = [];

	ajax.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.then(function(data) {
		vm.names = data.data;
	});

	vm.requestHint = function(id) {
		return ajax.get('../php/ajax.php', {params: {request: 'breed', id: id || vm.dragon.id,
				reduced: vm.reduced ? 1 : 0, displayDays: vm.displayDays ? 1 : 0}})
		.then(function(data) {
			vm.hints.unshift(data.data);

			vm.dragons.push(data.data);
			if (data.data.parent1)
				vm.dragons.push(data.data.parent1);
			if (data.data.parent2)
				vm.dragons.push(data.data.parent2);
		});
	};

	vm.startsWith = function(string, substring) {
		if (!substring)
			return true;

		string = string.toLowerCase();
		substring = substring.toLowerCase();
		return string.indexOf(substring) === 0;
	};

	vm.toggleRedu = function(reduced) {
		vm.reduced = reduced;
	};

	vm.toggleDd = function(displayDays) {
		vm.displayDays = displayDays;
	};

	vm.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};
}]);

})(angular);
