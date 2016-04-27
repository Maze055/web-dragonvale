(function(angular) {

angular.module('dragonSearch')

.controller('BreedingHintsController',
		['$http', 'timeTweak', function(ajax, timeTweak) {
	var vm = this;

	vm.reduced = false;
	vm.displayDays = false;
	vm.hints = [];

	ajax.get('../php/ajax.php', {params: {request: 'breedInit'}})
	.then(function(data) {
		vm.names = data.data;
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

	vm.tweakTimes = function() {
		var method = vm.reduced ? 'reduce' : 'unReduce';

		angular.forEach(vm.hints, function(hint) {
			hint.time = timeTweak[method](hint.time, vm.displayDays);
		});
	};

	vm.toggleFormat = function() {
		angular.forEach(vm.hints, function(hint) {
			hint.time = timeTweak.format(hint.time, vm.displayDays);
		});
	};
}]);

})(angular);
