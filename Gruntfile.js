module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		concat: {
			options: {
				banner: '(function(angular) {\n\n',
				footer: ';\n\n})(angular);',
				process: function(src, filePath) {
					return src.replace(/\(function\(.*\)\s*{\s*/, '')
							.replace(/;?\s*\}\)\(.*\);\s*$/g, '')
							.replace(/angular.module\(["']dragonSearch["']\)\n/g, '');
				}
			},

			index: {
				src: ['js/*.js'],
				dest: 'lindex.js'
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('index', ['concat:index'/*, 'uglify:index'*/]);

	grunt.registerTask('breed', ['concat:breed'/*, 'uglify:breed'*/]);
};
