(function(angular) {

angular.module('dragonSearch')

.service('images', ['md5', function(md5) {
	var baseURL = '//vignette3.wikia.nocookie.net/dragonvale/images';
	var seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

	var getSeason = function(date) {
		if (!(date instanceof moment))
			date = moment();

		return seasons[date.quarter() - 1];
	};

	var getWeirdDragonImg = {
		Snowflake: function(name, eggName) {
			return this.getImg(eggName + 'DragonAdult' + name.slice(-1) + '.png');
		},

		Seasonal: function(date) {
			return this.getImg(getSeason(date) + 'SeasonalDragonAdult.png');
		}
	};
	getWeirdDragonImg.Monolith = getWeirdDragonImg.Snowflake;

	var getEggName = function(name) {
		/*
			Seasonal, Snowflake and Monolith dragons have
			different names for dragon and egg images.
		*/
		var eggName = name.match(/(Seasonal|Snowflake|Monolith)/);
		return eggName ? eggName[0] : name;
	};

	this.getImg = function(fileName) {
		fileName = fileName.replace(/ /g, '');
		var checkSum = md5.createHash(fileName);
		return [baseURL, checkSum[0], checkSum.substr(0, 2),
				fileName].join('/');
	};

	this.getEggImg = function(name) {
		return this.getImg(getEggName(name) + 'DragonEgg.png');
	};

	this.getDragonImg = function(name) {
		var eggName = getEggName(name);
		return getWeirdDragonImg[eggName]
			? getWeirdDragonImg[eggName](name, eggName)
			: this.getImg(name + 'DragonAdult.png');
	};

	this.getElemFlagImg = function(elem) {
		return this.getImg(elem + '_Flag.png');
	};

}]);

})(angular);