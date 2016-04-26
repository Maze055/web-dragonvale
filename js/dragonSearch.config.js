(function(angular) {

angular.module('dragonSearch')

.config(['uiSelectConfig', function(uiSelectConf) {
	uiSelectConf.appendToBody = false;
	uiSelectConf.resetSearchInput = true;
	uiSelectConf.searchEnabled = true;
	uiSelectConf.theme = 'select2';
}]);

})(angular);