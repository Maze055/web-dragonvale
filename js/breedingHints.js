(function(angular) {

angular.module('dragonSearch', [
	'ui.select',
	'ngSanitize',
	'angular-md5',
	'angularMoment',
	'l42y.sprintf'
])

.config(['uiSelectConfig', function(uiSelectConf) {
	uiSelectConf.appendToBody = false;
	uiSelectConf.resetSearchInput = true;
	uiSelectConf.searchEnabled = true;
	uiSelectConf.theme = 'select2';
}])

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

	vm.toggleRed = function(reduced) {
		vm.reduced = reduced;
	};

	vm.toggleDd = function(displayDays) {
		vm.displayDays = displayDays;
	};

	vm.isBasicBreedingRule = function(hint) {
		return !hint.notes && !hint.breedElems
				&& !hint.parent1 && !hint.parent2;
	};
}])

.service('timeTweak', ['sprintfFilter', 'moment', function(sprintf, moment) {
	var daysfulFormat = '%02d:%02d:%02d:%02d';
	var dayslessFormat = '%02d:%02d:%02d';

	var makeDuration = function(time) {
		if (moment.isDuration(time))
			return time;

		if (typeof(time) == 'string' && time.length > 8)
			time = time.replace(':', '.');

		return moment.duration(time);
	};

	var tweakTime = (function(time, multiplier, putDays) {
		return this.format(moment.duration(makeDuration(time)
				.asMilliseconds() * multiplier), putDays);
	}).bind(this);

	this.format = function(time, putDays) {
		time = makeDuration(time);

		var daysCount = Math.floor(time.asDays());
		if (putDays && daysCount > 0)
			return sprintf(daysfulFormat, daysCount, time.hours(),
					time.minutes(), time.seconds());
		return sprintf(dayslessFormat, time.asHours(),
				time.minutes(), time.seconds());
	};

	this.reduce = function(time, putDays) {
		return tweakTime(time, 0.8, putDays);
	};

	this.unReduce = function(time, putDays) {
		return tweakTime(time, 1.25, putDays);
	};
}])

.component('timeTweakBox', {
	controllerAs: 'model',
	templateUrl: '../html/time-tweak-box.html',

	bindings: {
		dragons: '<',

		onReduChange: '&',
		onDdChange: '&'
	},

	controller: ['timeTweak', function(timeTweak) {
		this.reduced = false;
		this.displayDays = false;

		this.tweakTimes = function() {
			var method = this.reduced ? 'reduce' : 'unReduce';

			angular.forEach(this.dragons, (function(dragon) {
				dragon.time = timeTweak[method](dragon.time,
						this.displayDays);
			}).bind(this));
		};

		this.toggleFormat = function() {
			angular.forEach(this.dragons, (function(dragons) {
				dragons.time = timeTweak.format(dragons.time,
						this.displayDays);
			}).bind(this));
		};
	}]
})

.service('image', ['md5', 'moment', function(md5, moment) {
	var baseURL = '//vignette3.wikia.nocookie.net/dragonvale/images';
	var seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

	var getSeason = function(date) {
		if (!(date instanceof moment))
			date = moment();

		return seasons[date.quarter() - 1];
	};

	var getWeirdDragonImg = {
		Snowflake: (function(name, eggName) {
			return this.getImg(eggName + 'DragonAdult' + name.slice(-1) + '.png');
		}).bind(this),

		Seasonal: (function(date) {
			return this.getImg(getSeason(date) + 'SeasonalDragonAdult.png');
		}).bind(this)
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

}])

.component('dragonBox', {
	controllerAs: 'model',
	templateUrl: '../html/dragon-box.html',

	bindings: {
		dragon: '<',

		onClick: '&'
	},

	controller: ['image', function(image) {
		this.eggImgURL = image.getEggImg(this.dragon.name);
		this.dragonImgURL = image.getDragonImg(this.dragon.name);
		this.elemsImgsURLs = [];
		angular.forEach(this.dragon.elems, (function(elem) {
			this.elemsImgsURLs.push(image.getElemFlagImg(elem));
		}).bind(this));
	}]
})

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