// Gulp modules and plugins

var gulp = require('gulp');
var minifyHtml = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var minifyJs = require('gulp-uglify');
var replace = require('gulp-replace');
var modernizr = require('gulp-modernizr');
var src = require('gulp-add-src');
var cat = require('gulp-concat-util');

/***************************************

Utility declarations

***************************************/

// Utility variables

var utilPath = '../util/';
var buildPath = './build/';

// Source files

var pagerSrc = [
	'module',
	'circular.movements',
	'sequential.access.pager'
];
var breedingHintsSrc = [
	'module',
	'config',
	'run',
	'circular.limit.to',
	'time.tweak',
	'time.manager',
	'breeding.hints',
	'breeding.hints.controller',
	'time.tweak.box',
	'image',
	'dragon.box',
	'elem.box'
];

// Utility functions

var angularCat = function(src, filePath) {
	return src.replace(/(^|\n);[\(!]function\(.*?\)\s*{\s*/, '$1')
			.replace(/;?\s*\}\)?\(.*?\);\s*$/g, '')
			.replace(/angular.module\(["'].+?["']\)\n/g, '');
};

/***************************************

Tasks

***************************************/

gulp.task('build-js', function() {
	return gulp.src(buildPath + 'js/*.js')

			.pipe(minifyJs({
				mangle: true,
				compress: {
					unsafe: true
				}
			}))

			.pipe(gulp.dest(buildPath + 'js'));
});

// HTML task for breeding hints page

gulp.task('breed:html', function() {
	return gulp.src('./php/breedingHints.php')

			.pipe(replace(/\/build/g, ''))

			.pipe(minifyHtml({
				collapseWhitespace: true,
				customAttrCollapse: /.*/,
				minifyJs: true,
				decodeEntities: true,
				removeComments: true
			}))

			.pipe(gulp.dest(buildPath + 'php'));
});

// CSS task for breeding hints page

gulp.task('breed:css', function() {
	return gulp.src(buildPath + 'css/breedingHints.css')

			.pipe(autoprefixer())

			.pipe(gulp.dest(buildPath + 'css'));

});

// JavaScript task for breeding hints page

gulp.task('breed:js', function() {
	return gulp.src('./js/*.js')

		.pipe(modernizr())

		.pipe(src.append(utilPath + './js/pager/pager.{' + pagerSrc.join(',') + '}.js'))
		.pipe(cat('./pager.js', {process: angularCat}))
		.pipe(cat.footer(';\n\n'))

		.pipe(src.append('./js/dragonSearch.{' + breedingHintsSrc.join(',') + '}.js'))
		.pipe(cat('breedingHints.js', {process: angularCat}))
		.pipe(cat.header(';(function(window, document, angular) {\n\n'))
		.pipe(cat.footer(';\n\n})(window, document, angular);'))

		.pipe(gulp.dest(buildPath + 'js'));
});

// All-in-one task for breeding hints page

gulp.task('breed', gulp.parallel(
		'breed:html',
		'breed:css',
		gulp.series('breed:js', 'build-js')
));
