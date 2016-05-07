module.exports = function (grunt) {

	/*
		Tasks configuration object, to allow true
		pipelining of consecutive tasks
	*/
	var tasksConfig = {
		concat: {
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

		postcss: {
			index: {
				src: 'css/index.css'
			},

			breed: {
				src: 'css/breedingHints.css'
			}
		}
	};

	tasksConfig.postcss.index.dest = tasksConfig.postcss.index.src;
	tasksConfig.postcss.breed.dest = tasksConfig.postcss.breed.src;

	tasksConfig.uglify = {
		index: {
			src: tasksConfig.concat.index.dest,
			dest: tasksConfig.concat.index.dest
		},

		breed: {
			src: tasksConfig.concat.breed.dest,
			dest: tasksConfig.concat.breed.dest
		}
	};

	tasksConfig.watch = {
		index: {
			files: tasksConfig.concat.index.src,
			tasks: 'index:js'
		},

		breed: {
			files: tasksConfig.concat.breed.src,
			tasks: 'breed:js'
		}
	};

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

			index: tasksConfig.concat.index,

			breed: tasksConfig.concat.breed
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

			index: tasksConfig.uglify.index,

			breed: tasksConfig.uglify.breed
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')
				]
			},

			index: tasksConfig.postcss.index,

			breed: tasksConfig.postcss.breed
		},

		watch: {
			options: {
				event: 'all'
			},

//			index: tasksConfig.watch.index,

			breed: tasksConfig.watch.breed
		}
	});

	// Load plugins that actually provide tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Tasks
	var tasksNames = ['index', 'breed'];
	for (var key in tasksNames) {
		var task = tasksNames[key];
		grunt.registerTask(task, ['concat:' + task, 'uglify:' + task,
				'postcss:' + task]);
		grunt.registerTask(task + ':js', ['concat:' + task,
				'uglify:' + task]);
		grunt.registerTask(task + ':css', 'postcss:' + task);
	}
};
