/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
	imageminSvgo = require('imagemin-svgo'),
	pngquant = require('imagemin-pngquant'),
	svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

// configuration des plugins
var imageminConfig = {
	progressive: true,
	use: [pngquant()],
	svgoPlugins: [
		{
			removeViewBox: false,
		}, {
			cleanupIDs: false,
		}
	]
};

var svgConfig = {
	shape               : {
		dimension       : {         // Set maximum dimensions
			maxWidth    : 32,
			maxHeight   : 32
		},
		spacing         : {         // Add padding
			padding     : 0
		}
	},
	mode                : {
		view            : {         // Activate the «view» mode
			bust        : false,
			render      : {
				scss    : true      // Activate Sass output (with default options)
			}
		},
		symbol          : true      // Activate the «symbol» mode
	}
};

// Styles
gulp.task('styles', function() {
  return sass('styles//**/*.scss', { style: 'expanded' })
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('scripts/src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin(imageminConfig)))
    .pipe(gulp.dest('dist/images'))
});

// About svgs
gulp.task('build_svg', function () {
	return gulp.src('images/svg/icons/*')
		.pipe(svgSprite(svgConfig))
		.pipe(gulp.dest('dist/images/svg'));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});