module.exports = function (grunt) {

	/*
		Tasks configuration object, to allow true
		pipelining of consecutive tasks
	*/
	var tasksIO = {
		modernizr: {
			index: {
				dest: 'js/modernizr.index.js'
			},

			breed: {
				devFile: 'js/breedingHints.js',
				dest: 'js/modernizr.breed.js'
			}
		},

		postcss: {
			index: {
				src: 'css/index.css'
			},

			breed: {
				src: 'css/breedingHints.css'
			}
		}
	};

	tasksIO.postcss.index.dest = tasksIO.postcss.index.src;
	tasksIO.postcss.breed.dest = tasksIO.postcss.breed.src;

	tasksIO.concat = {
		index: {
			src: [],
			dest: 'js/lindex.js'
		},

		breed: {
			src: [tasksIO.modernizr.breed.dest,
				'js/dragonSearch.module.js',
				'js/dragonSearch.config.js',
				'js/dragonSearch.time.tweak.js',
				'js/dragonSearch.time.manager.js',
				'js/dragonSearch.breeding.hints.js',
				'js/dragonSearch.breeding.hints.controller.js',
				'js/dragonSearch.time.tweak.box.js',
				'js/dragonSearch.image.js',
				'js/dragonSearch.dragon.box.js',
				'js/dragonSearch.elem.box.js'
			],
			dest: 'js/breedingHints.js'
		}
	};

	tasksIO.uglify = {
		index: {
			src: tasksIO.concat.index.dest,
			dest: tasksIO.concat.index.dest
		},

		breed: {
			src: tasksIO.concat.breed.dest,
			dest: tasksIO.concat.breed.dest
		}
	};

	tasksIO.watch = {
		index: {
			files: tasksIO.concat.index.src,
			tasks: 'index:js'
		},

		breed: {
			files: tasksIO.concat.breed.src,
			tasks: 'breed:js'
		}
	};

	// Project configuration.
	grunt.initConfig({
		modernizr: {
			options: {
				options: [],
				uglify: false,
				files: {
					src: ['js/*.js']
				}
			},

			index: tasksIO.modernizr.index,

			breed: tasksIO.modernizr.breed
		},

		concat: {
			options: {
				banner: '(function(window, document, angular) {\n\n',
				footer: ';\n\n})(window, document, angular);',

				/*
					Removes IIFE and AngularJS module retrieval,
					to create an unique chained module declaration
				*/
				process: function(src) {
					return src.replace(/[\(!]function\(.*?\)\s*{\s*/, '')
							.replace(/;?\s*\}\)?\(.*?\);\s*$/g, '')
							.replace(/angular.module\(["']dragonSearch["']\)\n/g, '');
				}
			},

			index: tasksIO.concat.index,

			breed: tasksIO.concat.breed
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

			index: tasksIO.uglify.index,

			breed: tasksIO.uglify.breed
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')
				]
			},

			index: tasksIO.postcss.index,

			breed: tasksIO.postcss.breed
		},

		watch: {
			options: {
				event: 'all'
			},

//			index: tasksIO.watch.index,

			breed: tasksIO.watch.breed
		}
	});

	// Load plugins that actually provide tasks
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Web pages tasks
	var tasksNames = ['index', 'breed'];
	for (var key in tasksNames) {
		var task = tasksNames[key];
		var jsTask = task + ':js';
		var cssTask = task + ':css';

		grunt.registerTask(jsTask, ['modernizr:' + task,
				'concat:' + task]);
		grunt.registerTask(cssTask, 'postcss:' + task);
		grunt.registerTask(task, [jsTask, 'uglify:' + task,
				cssTask]);
	}
};
