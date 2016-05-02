/**
 * @fileoverview
 *
 * This service provides methods that generate
 * Dragonvale Wiki image URLs of generic files,
 * eggs, adult dragons and elemental flags.
 */

(function(angular) {

angular.module('dragonSearch')

.service('image', ['md5', 'moment', function(md5, moment) {

	/**
	 * @summary Initial part of any returned URL.
	 */
	var baseURL = '//vignette3.wikia.nocookie.net/dragonvale/images';

	/**
	 * @summary Seasons names, sorted by year's quarters.
	 */
	var seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

	/**
	 * This function returns the capitalized english
	 * season name of the specified date, defaulting
	 * to current, with some approximations.
	 *
	 * @summary Returns the season name of the passed date.
	 *
	 * @param {moment} [date=moment()] - The date whose season will be returned.
	 * @return {String} Capitalized english season name of the provided date.
	 *
	 * @see {@link http://momentjs.com/docs moment.js documentation}
	 */
	var getSeason = function(date) {
		if (!(date instanceof moment))
			date = moment();

		return seasons[date.quarter() - 1];
	};

	/**
	 * Object of functions to get the dragon pictures for
	 * Snowflake, Monolith and Seasonal dragons, since
	 * they're not the same ass the egg name: Seasonal
	 * has seasons in dragon picture, while Snowflake
	 * and Monolith share the same egg for all five of
	 * a kind.
	 *
	 * @summary Object of functions to get the dragon
	 * pictures for Snowflake, Monolith and Seasonal dragons.
	 */
	var getWeirdDragonImg = {

		/**
		 * @summary Returns Dragonvale Wiki picture URL
		 * for Snowflake/Monolith dragons.
		 *
		 * @param {string} name - Either 'Snowflake' or 'Monolith' followed by a number between 1 and 5.
		 * @param {string} eggName - Either 'Snowflake' or 'Monolith'.
		 * @return {string} Dragonvale Wiki picture URL of given Snowflake/Monolith dragon.
		 */
		Snowflake: (function(name, eggName) {
			return this.getImg(eggName + 'DragonAdult' + name.slice(-1) + '.png');
		}).bind(this),

		/**
		 * @summary Returns Dragonvale Wiki picture URL for
		 * Seasonal dragon in the season of a provided date.
		 *
		 * @param {moment} [date=moment()] - The date that is used to get the season.
		 * @return {String} Dragonvale Wiki picture URL of Seasonal dragon in the season of the passed date.
		 *
		 * @see {@link http://momentjs.com/docs moment.js documentation}
		 */
		Seasonal: (function(date) {
			return this.getImg(getSeason(date) + 'SeasonalDragonAdult.png');
		}).bind(this)
	};

	/**
	 * @borrows getWeirdDragonImg.Snowflake as getWeirdDragonImg.Monolith
	 */
	getWeirdDragonImg.Monolith = getWeirdDragonImg.Snowflake;

	/**
	 * This function derives the egg name from the
	 * one of the passed dragon. It is useful due
	 * to Seasonal, Snowflake and Monolith dragons
	 * having different names for dragon and egg images.
	 *
	 * @summary Returns the egg name of the passed dragon.
	 *
	 * @param {string} name - The name of the dragon.
	 * @return {string} The egg name of the passed dragon.
	 */
	var getEggName = function(name) {
		var eggName = name.match(/(Seasonal|Snowflake|Monolith)/);
		return eggName ? eggName[0] : name;
	};

	/**
	 * @summary Returns the Dragonvale Wiki URL of
	 * the passed file name.
	 *
	 * @param {string} fileName - Input filename.
	 * @return {stirng} URL of fileName on Dragonvale WIki.
	 */
	this.getImg = function(fileName) {
		fileName = fileName.replace(/ /g, '');
		var checkSum = md5.createHash(fileName);
		return [baseURL, checkSum[0], checkSum.substr(0, 2),
				fileName].join('/');
	};

	/**
	 * @summary Returns the Dragonvale Wiki image URL
	 * of the egg having the passed name.
	 *
	 * @param {string} name - The name of the egg.
	 * @return {stirng} URL of the egg image on Dragonvale WIki.
	 */
	this.getEggImg = function(name) {
		return this.getImg(getEggName(name) + 'DragonEgg.png');
	};

	/**
	 * @summary Returns the Dragonvale Wiki image URL
	 * of the adult dragon having the passed name.
	 *
	 * @param {string} name - The name of the dragon.
	 * @return {stirng} URL of the adult dragon image on Dragonvale WIki.
	 */
	this.getDragonImg = function(name) {
		var eggName = getEggName(name);
		return getWeirdDragonImg[eggName]
			? getWeirdDragonImg[eggName](name, eggName)
			: this.getImg(name + 'DragonAdult.png');
	};

	/**
	 * @summary Returns the Dragonvale Wiki image URL
	 * of the elemental flag having the passed element name.
	 *
	 * @param {string} name - The name of the element.
	 * @return {stirng} URL of the elemental flag image on Dragonvale WIki.
	 */
	this.getElemFlagImg = function(elem) {
		return this.getImg(elem + '_Flag.png');
	};

}]);

})(angular);