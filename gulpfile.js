"use strict";

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const csso 		   = require('gulp-csso');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');
const sourcemaps   = require('gulp-sourcemaps');

// convert sass to css and minify theme
gulp.task('sass', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(sass.sync().on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(csso())
		.pipe(sourcemaps.write('../sourcemaps'))
		.pipe(gulp.dest('dist/css'));
});

// watch changes in 'sass' task
gulp.task('sass-watch', function() {
	gulp.watch('src/sass/*/*.scss', ['sass']);
});

// copy jquery.js bootstrap.js popper.js from
// node_modules to dist folder
gulp.task('dep-js', function() {
	return gulp.src(['node_modules/jquery/jquery.min.js', 
					 'node_modules/bootstrap/dist/js/bootstrap.min.js', 
					 'node_modules/popper.js/dist/umd/popper.min.js'
					])
		.pipe(gulp.dest('dist/js'));
});

// minify custom js files 
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

// watch changes in custom js files
gulp.task('scripts-watch', function() {
	gulp.watch('src/js/*.js', ['scripts']);
});

// run all tasks on start and watch for them
gulp.task('default', ['sass', 'sass-watch', 'dep-js', 'scripts', 'scripts-watch']);