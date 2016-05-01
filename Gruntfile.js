module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		concat: {
			options: {
				banner: '(function(angular) {\n\n',
				footer: ';\n\n})(angular);',

				/*
					Removes IIFE and AngularJS module retrieval,
					to create an unique chained module declaration
				*/
				process: function(src) {
					return src.replace(/\(function\(.*\)\s*{\s*/, '')
							.replace(/;?\s*\}\)\(.*\);\s*$/g, '')
							.replace(/angular.module\(["']dragonSearch["']\)\n/g, '');
				}
			},

			index: {
				src: [],
				dest: 'js/lindex.js'
			},

			breed: {
				src: ['js/dragonSearch.module.js',
						'js/dragonSearch.config.js',
						'js/dragonSearch.breeding.hints.controller.js',
						'js/dragonSearch.time.tweak.js',
						'js/dragonSearch.time.tweak.box.js',
						'js/dragonSearch.image.js',
						'js/dragonSearch.dragon.box.js',
						'js/dragonSearch.elem.box.js'
				],
				dest: 'js/breedingHints.js'
			}
		},

		uglify: {
			options: {
				mangle: true,
				compress: {
					unsafe: true,
					collapse_vars: true,
					pure_getters: true,
					keep_fargs: false,
					angular: true
				},
				quoteStyle: 3
			},

			breed: {
				src: 'js/breedingHints.js',
				dest: 'js/breedingHints.js'
			},

			index: {
				src: 'js/index.js',
				dest: 'js/index.js'
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')
				]
			},

			breed: {
				src: 'css/breedingHints.css',
				dest: 'css/breedingHints.css'
			}
		}
	});

	// Load plugins that provide the "concat", "uglify" and "autoprefixer" tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');

	// Tasks
	grunt.registerTask('index', ['concat:index'/*, 'uglify:index'*/]);
	grunt.registerTask('breed', ['concat:breed', 'uglify:breed', 'postcss:breed']);
};
