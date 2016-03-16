/**
 * @fileoverview
 *
 * This file contains all the necessary functions to
 * update the result table with {@link jQuery-AjaxTable}.
 */

/**
 * These two variables are global just because
 * splitting code into two files is comfortable.
 *
 * dragonRows contains the function that updates
 *		the result table with ajax call result.
 * resultTimes holds all times in the second column
 *		of the result table as a jQuery object of
 *		td elements.
 */
var dragonRows, resultTimes;

(function($) {

/*
	Empty jQuery object at initialization,
	to avoid method call failures.
*/
resultTimes = $();

/**
 * Returns the URL of the passed file name on Dragonvale
 * Wiki: since the url uses the first two chars of
 * file name md5 checksum, an external library is used
 * to compute it.
 *
 * @summary Returns Dragonvale Wiki URL of the given
 * file name.
 *
 * @param {String} fileName - The file name whose URL on Dragonvale Wiki is returned.
 * @returns {String} URL on Dragonvale Wiki of fileName.
 */
var getDragonvaleWikiImg = function(fileName) {
	fileName = fileName.replace(/ /g, '');
	var md5 = CryptoJS.MD5(fileName).toString();
	return '//vignette3.wikia.nocookie.net/dragonvale/images/' +
			md5[0] + '/' + md5.substr(0, 2) + '/' + fileName;
};

/**
 * @summary Seasons names, sorted by year's quarters.
 */
var seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

/**
 * @summary Returns the season name of the passed date.
 *
 * @param {moment} [date=moment()] - The date whose season will be returned.
 * @returns {String} - The season name of the provided date.
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
var getDragonImg = {

	/**
	 * @summary Returns Dragonvale Wiki picture URL
	 * for Snowflake/Monolith dragons.
	 *
	 * @param {string} name - Either 'Snowflake' or 'Monolith' followed by a number between 1 and 5.
	 * @param {string} eggName - Either 'Snowflake' or 'Monolith'.
	 * @returns {string} Dragonvale Wiki picture URL of given Snowflake/Monolith dragon.
	 */
	Snowflake: function(name, eggName) {
		return getDragonvaleWikiImg(eggName + 'DragonAdult' + name.slice(-1) + '.png');
	},

	/**
	 * @summary Returns Dragonvale Wiki picture URL for
	 * Seasonal dragon in the season of a provided date.
	 *
	 * @param {moment} [date=moment()] - The date that is used to get the season.
	 * @returns {String} Dragonvale Wiki picture URL of Seasonal dragon in the season of the passed date.
	 */
	Seasonal: function(date) {
		return getDragonvaleWikiImg(getSeason(date) + 'SeasonalDragonAdult.png');
	}
};

/**
 * @borrows getDragonImg.Snowflake as getDragonImg.Monolith
 */
getDragonImg.Monolith = getDragonImg.Snowflake;

/**
 * Returns the table cell for a dragon's name, containing
 * also both adult dragon and egg pictures.
 *
 * @summary Returns the table cell for a dragon's name.
 *
 * @param {string} name - The dragon's name.
 * @returns {jQuery} A td element containing also two img, for both dragon and egg.
 */
var makeDragonCell = function(name) {
	var cell = $('<td></td>', {text: name});

	/*
		Seasonal, Snowflake and Monolith dragons have
		different names for dragon and egg images.
	*/
	var eggName = name.match(/(Seasonal|Snowflake|Monolith)/);
	eggName = eggName ? eggName[0] : name;

	cell.prepend($('<img />', {src: getDragonvaleWikiImg(eggName
				+ 'DragonEgg.png')}));
	return cell.prepend($('<img />', {src: getDragonImg[eggName]
			? getDragonImg[eggName](name, eggName)
			: getDragonvaleWikiImg(name + 'DragonAdult.png')}));
};

/**
 * Returns a the table cell for a dragon's element,
 * having its icon and name, or a string if it's null.
 *
 * @summary Returns a the table cell for a dragon's element.
 *
 * @param {string|null} elem - The element name.
 * @returns {jQuery} A td element containing also an img when elem is not null.
 */
var makeElemCell = function(elem) {
	if (elem == null)
		return $('<td></td>', {text: 'Nessuno'});

	var elemCell = $('<td></td>', {text: elem});
	return elemCell.prepend($('<img />', {src: getDragonvaleWikiImg('Icon_'
				+ elem + '.png')}));
};

/**
 * Represents the data needed to display a dragon
 * in a row of the results table.
 *
 * @summary Holds necessary data about a dragon.
 *
 * @typedef {Object} DragonData
 * @property {string} name - Dragon's name.
 * @property {string} time - Dragon's hatching time, in the required format.
 * @property {string} elem1 - Dragon's first element.
 * @property {(string|null)} elem2 - Dragon's second element.
 * @property {(string|null)} elem3 - Dragon's third element.
 * @property {(string|null)} elem4 - Dragon's fourth element.
 */

/**
 * @summary Updates the passed table with JSON data fetched
 * by an ajax call.
 *
 * @param {jQuery} table - The table/tbody the new rows will be appended to.
 * @param {(DragonData[]|string)} data - JSON data fetched by ajax.
 */
dragonRows = function(table, data) {

	// Data is neither an Object, nor an Array, nor a string
	if (!data.length) {
		table.append('<tr><td colspan="6">Nessun drago trovato</td></tr>');
		return;
	}

	for (var k = 0; k < data.length; ++k) {
		var cells = data[k];
		var row = $('<tr></tr>');

		row.append(makeDragonCell(cells.name));
		row.append($('<td></td>', {text: cells.time}));
		row.append(makeElemCell(cells.elem1));
		row.append(makeElemCell(cells.elem2));
		row.append(makeElemCell(cells.elem3));
		row.append(makeElemCell(cells.elem4));

		table.append(row);
	}

	resultTimes = table.find('td:nth-of-type(2)');
};

})(jQuery);
