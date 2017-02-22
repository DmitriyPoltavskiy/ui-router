'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var eslint = require('gulp-eslint');

// eslint
gulp.task('lint', () => {
	return gulp.src(['app/js/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// server  
gulp.task('start', function() {
		gulp.src('.') // from
	.pipe(server({
		livereload: true,
		open: true
	}));
});

// sass
gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browserslist: {
			'ie': '>=10'
		}
	}))
	.pipe(gulp.dest('app/css'));
});


// build
gulp.task('build', function () {
	return gulp.src('index.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('public'));
});

// watch
gulp.task("watch", function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['start', 'watch']);