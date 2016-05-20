/**
 * @fileoverview
 */

(function(angular) {

angular.module('dragonSearch')

.service('dragonsPaginator', function() {
	this.cursor = 0;
	this.pageLength = 10;
	this.ids = [];

	var circularlyMove = function(amount) {
		this.cursor = (this.cursor + amount % this.ids.length
				+ this.ids.length) % this.ids.length;
	};

	var getCurrentElement = function() {
		return this.ids[this.cursor];
	};

	var getCurrentPage = function() {
		var page = this.ids.slice(this.cursor, Math.min(this.ids.length,
				this.cursor + this.pageLength) - 1);

		var lengthDiff = this.pageLength - page.length;
		if (lengthDiff > 0)
			page = page.concat(this.ids.slice(0, lengthDiff - 1));

		return page;
	};

	this.addId = function(id) {
		this.ids.push(id);

		return this;
	};

	this.prev = function() {
		circularlyMove(-1);

		return getCurrentElement();
	};

	this.next = function() {
		circularlyMove(1);

		return getCurrentElement();
	};

	this.prevPage = function() {
		circularlyMove(-this.pageLength);

		return getCurrentPage();
	};

	this.nextPage = function() {
		circularlyMove(this.pageLength);

		return getCurrentPage();
	};

	this.setCursor = function(position) {
		this.cursor = 0;
		circularlyMove(position);

		return this;
	};

	this.moveCursor = function(position) {
		circularlyMove(position);

		return this;
	};

	this.setPageLength = function(length) {
		if (length < 1)
			throw new RangeError("Page length can't be zero or negative");

		this.pageLength = length;

		return this;
	};

});

})(angular);