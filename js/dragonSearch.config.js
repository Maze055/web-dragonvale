/**
 * @fileoverview
 *
 * This file contains the configuration blocks
 * for this website AngularJS module.
 */

;(function(angular) {

angular.module('dragonSearch')

// Global configuration of ui-select plugin
.config(['uiSelectConfig', function(uiSelect) {
	uiSelect.appendToBody = false;
	uiSelect.resetSearchInput = true;
	uiSelect.searchEnabled = true;
	uiSelect.theme = 'select2';
}]);

})(angular);
