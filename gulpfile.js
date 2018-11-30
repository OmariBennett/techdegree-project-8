'use strict';
const gulp = require('gulp'),
	  concat = require('gulp-concat'),
	  maps = require('gulp-sourcemaps'),
	  uglify = require('gulp-uglify'),
	  rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  cleanCSS =require('gulp-clean-css'),
	  imagemin = require('gulp-imagemin'),
	  del = require('del');

sass.compiler = require('node-sass');

const options = { src: 'src', dist: 'dist' };

gulp.task('concatScripts', () => { 
//Concat the javaScripts files
	return gulp.src(`${options.src}/js/circle/*.js`)
				.pipe(concat('global.js'))
				.pipe(gulp.dest(`${options.src}/js`));
})

gulp.task('scripts', ['concatScripts'], () => {
// minify javaScripts file and add the source map
	gulp.src(`${options.src}/js/*.js`)
		.pipe(maps.init())
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(maps.write(`./`))
		.pipe(gulp.dest(`${options.dist}/scripts`));
});

gulp.task('sass', () => {
	return gulp.src(`${options.src}/sass/**/*.scss`)
		.pipe(sass())
		.pipe(gulp.dest(`${options.dist}/styles`));
});

gulp.task('styles', () => {
// Compile SCSS into CSS with the source map
	gulp.src(`${options.src}/sass/global.scss`)
		.pipe(maps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(`${options.dist}/styles`));
});

gulp.task('images', () => {
// Optimize the file size in the images folder
	gulp.src(`${options.src}/images/*`)
		.pipe(imagemin())
        .pipe(gulp.dest(`${options.dist}/content`))
});

gulp.task('watch', () => {
//Wacth the javaScripts and Sass files
	gulp.watch(`${options.src}/sass/**/*.scss`, ['styles']);
	gulp.watch(`${options.src}/js/**/*.js`, ['scripts']);
});

gulp.task('clean', () => {
// Delete the dist file or older build
	return del(options.dist);
});

gulp.task('build', ['clean'], () => {
	gulp.start(['scripts', 'styles', 'images']);
});

gulp.task('default', ['build'], () => {
	gulp.start('watch');
});