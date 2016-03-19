/**
 * @fiveoverview
 *
 * Main Javascript file for index.php. Deals
 * with event handlers and initialization of
 * plugins and other stuff, including initial
 * AJAX requests.
 */
(function($) {

/**
 * Creates a moment.duration object given a
 * time string in one of the accepted formats.
 *
 * @callback makeDuration
 *
 * @summary Creates a moment.duration instance
 * from a time string.
 *
 * @param {String} time - A valid time string.
 * @return {moment.duration} The moment.duration object resulting from input time string processing.
 *
 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}
 */

/**
 * This function changes the time represented by
 * the text inside every element of timesList.
 * The current time string is stored as a data
 * attribute for subsequent uses, and the new one
 * is hence newly created only the first time.
 *
 * @summary Changes time representation inside
 * the given elements in a specific way.
 *
 * @param {jQuery} timesList - Holds all elements whose time text should be changed.
 * @param {string} nextTime - The key the new time representation will be either stored with or retrieved as data attribute.
 * @param {string} currTime - The key the current time representation will be stored with as data attribute.
 * @param {boolean} putDays - Whether to display days in new time representation.
 * @param {makeDuration} makeDuration - Callback to create new moment.js duration object.
 *
 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}
 */
var changeTimes = function(timesList, nextTime, currTime, putDays, makeDuration) {

	/*
		Only need to check data attribute of the first
		element, assuming that times are tweaked by
		this function alone.
	*/
	if (timesList.eq(0).data(nextTime)) {
		timesList.each(function() {
			var $this = $(this);
			$this.data(currTime, $this.text());
			$this.text($this.data(nextTime));
		});
	}
	else {
		timesList.each(function() {
			var $this = $(this);
			var time = $this.text();
			$this.data(currTime, time);

			/*
				Days are displayed, so transforming string
				according to moment.js specifications.
				http://momentjs.com/docs/#/durations/creating/
			*/
			if (time.length > 8)
				time = time.replace(':', '.');

			time = makeDuration(time);
			var daysCount = Math.floor(time.asDays());
			if (putDays && daysCount > 0)
				$this.text(sprintf('%02d:%02d:%02d:%02d', daysCount, time.hours(),
						time.minutes(), time.seconds()));
			else
				$this.text(sprintf('%02d:%02d:%02d', time.asHours(),
						time.minutes(), time.seconds()));
		});
	}
};

/****************************************

OnLoad

****************************************/

$(function() {

var dragonsTable = $('tbody');
var form = $('form');
var id = $('select[name="id"]');
var checkBoxes = $('input[type="checkbox"]');
var idReqparams = id.add(checkBoxes);
var time = $('select[name="time"]');
var genericReqParams = time.add(checkBoxes)
		.add('select[name^="elem"], select[name^="parent"]');
var reduced = $('input[name="reduced"]');
var displayDays = $('input[name="displayDays"]');
var paramTimes;
var chosenTargets = $('select');

/****************************************

Form submssion

****************************************/

dragonsTable.ajaxTable({
	url: './php/ajax.php',
	makeRows: dragonRows,
	autoEmpty: true,
	pagination: paginationDefaults('Pagina non valida')
});

form.submit(function() {

	// If id is selected, ignoring other menus
	var params = id.val() != '0' ? idReqparams : genericReqParams;

	dragonsTable.ajaxTable('submit', params.activeCtrls({request: 'dragons'}));
	return false;
});

dragonsTable.ajaxTable('addPageCheckListener', 'page', 'change',
	function() { form.submit(); });

$('[type="submit"]').click(function() {
	dragonsTable.ajaxTable('pageChanged', false);
});

/****************************************

Event handlers

****************************************/

// Toggles reduced times in menù and results table
reduced.change(function() {
	if (reduced.prop('checked')) {
		var multiplier = 0.8;
		var nextTime = 'reduced';
		var currTime = 'full';
	}
	else {
		var multiplier = 1.25;
		var nextTime = 'full';
		var currTime = 'reduced';
	}

	if (displayDays.prop('checked')) {
		var putDays = true;
		nextTime += 'Days';
		currTime += 'Days';
	}
	else {
		var putDays = false;
		nextTime += 'NoDays';
		currTime += 'NoDays';
	}

	// Reduces or increases time spans, depending on multiplier value
	var makeDuration = function(time) {
		return moment.duration(moment.duration(time).asMilliseconds()
				* multiplier);
	};

	changeTimes(paramTimes, nextTime, currTime, putDays, makeDuration);
	time.trigger('chosen:updated');

	changeTimes(resultTimes, nextTime, currTime, putDays, makeDuration);
});

// Toggles days display of times in menù and results table
displayDays.change(function() {
	if (reduced.prop('checked')) {
		var nextTime = 'reduced';
		var currTime = 'reduced';
	}
	else {
		var nextTime = 'full';
		var currTime = 'full';
	}

	if (displayDays.prop('checked')) {
		var putDays = true;
		nextTime += 'Days';
		currTime += 'NoDays';
	}
	else {
		var putDays = false;
		nextTime += 'NoDays';
		currTime += 'Days';
	}

	changeTimes(paramTimes, nextTime, currTime, putDays, moment.duration);
	time.trigger('chosen:updated');

	changeTimes(resultTimes, nextTime, currTime, putDays, moment.duration);
});

/****************************************

Plugin initialization stuff

****************************************/

chosenTargets.addClass('chosen');

chosenTargets.chosen({
	inherit_select_classes: true,
	no_results_text: 'Niente che inizi con '
});

var initParams = {
	request: 'init',
	reduced: reduced.prop('checked') ? 1 : 0,
	displayDays: displayDays.prop('checked') ? 1 : 0
};

$.getJSON('./php/ajax.php', initParams, function(data) {
	for (var k = 0; k < data.length; ++k)
		time.append($('<option></option>', data[k]));
	time.trigger('chosen:updated');
	paramTimes = time.children('option:gt(0)');
});

});

})(jQuery);