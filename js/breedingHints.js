(function($) {

$(function() {

var app = angular.module('breedingHints', []);

app.controller('breedingHintsCtrl', ['$scope', function(scope) {
	scope.dragonId = 0;
	scope.reduced = false;
	scope.displayDays = false;
}]);

/****************************************

jQuery plugins stuff

****************************************/

var chosenTargets = $('select');

/****************************************

Plugins initialization

****************************************/

chosenTargets.addClass('chosen');

chosenTargets.chosen({
	inherit_select_classes: true,
	no_results_text: 'Niente che inizi con '
});

});

})(jQuery);