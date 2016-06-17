'use strict'

var gulp = require("gulp");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("autoprefixer");
var bs = require("browser-sync").create();
var mqpacker = require('css-mqpacker');
var cssdeclsort = require('css-declaration-sorter');


/* --- plugins setup --- */
var reload = bs.reload;

var paths = {
	style_src: "./assets/scss/**/*.scss",
	style_dest: "./public/css/",
	js_src: "./assets/js/**/*.js",
	js_dest: "./public/js/",
	html_src: "./assets/*.html",
	html_dest: "./public/"
}

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

/* --- html --- */
gulp.task('html', function(){
	return gulp.src(paths.html_src)
	.pipe(gulp.dest(paths.html_dest));
});

/* --- sass --- */
gulp.task('sass', function(){
	return gulp.src(paths.style_src)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(postcss([
		autoprefixer(),
		mqpacker({
			sort: true
			}),
		cssdeclsort({
			order: 'smacss'
			}),
		]))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.style_dest));
});

/* --- javascripts --- */
gulp.task('js', function(){
	return gulp.src(paths.js_src)
	.pipe(sourcemaps.init())
	.pipe(concat('index.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.js_dest));
});


/* --- static server --- */
gulp.task('serve', ['html', 'sass', 'js'], function() {
	bs.init([paths.style_dest, paths.js_dest, paths.html_dest],{
		server: "./public/"
	}); 
});

/* --- default task --- */
gulp.task('default', ['serve'], function() {
	gulp.watch(paths.style_src, ['sass']);
	gulp.watch(paths.js_src, ['js']);
	gulp.watch(paths.html_src, ['html']);
});
