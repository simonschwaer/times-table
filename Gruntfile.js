module.exports = function (grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					importPath: 'bower_components/bootstrap-sass-official/assets/stylesheets'
				}
			}
		},
		autoprefixer: {
			options: {
				// browsers: ['last 2 versions', 'ie 8', 'ie 9'],
				cascade: false
			},
			main: {
				src: 'css/*.css'
			},
		},
		uglify: {
			options: {
				mangle: false,
				beautify: false,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapName: 'js/<%= pkg.name %>.map'
			},
			build: {
				files: {
					'js/<%= pkg.name %>.min.js': [
						'bower_components/jquery/dist/jquery.js',
						// 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',

						'js/vendor/*.js',
						'js/components/*.js',
						'js/main.js'
					]
				}
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'js/main.js'
			],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			html: {
				files: ['index.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'uglify'],
				options: {
					livereload: true
				}
			},
			css: {
				files: [
					'scss/*.scss'
				],
				tasks: ['compass', 'autoprefixer'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['compass', 'autoprefixer', 'jshint', 'uglify']);
};