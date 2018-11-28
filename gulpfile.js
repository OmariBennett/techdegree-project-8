const gulp = require('gulp'),
	  useref = require('gulp-useref'),//delete this
	  gulpif = require('gulp-if'),
	  maps = require('gulp-sourcemaps'),
	  sass = require('gulp-sass'),
	  uglify = require('gulp-uglify'),
	  concat = require('gulp-concat'),
	  rename = require('gulp-rename'),
	  cleanCSS =require('gulp-clean-css'),
	  imagemin = require('gulp-imagemin');

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
		.pipe(gulp.dest(`${options.dist}/js`));
});

gulp.task('styles', () => {
// Compile SCSS into CSS with the source map
	gulp.src(`${options.src}/sass/global.scss`)
		.pipe(maps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(`${options.dist}/css`));
});

gulp.task('images', () => {
// Optimize the file size in the images folder
	gulp.src(`${options.src}/images/*`)
		.pipe(imagemin())
        .pipe(gulp.dest(`${options.dist}/images`))
});