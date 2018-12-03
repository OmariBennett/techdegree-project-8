'use strict';
const gulp = require('gulp'),
	  concat = require('gulp-concat'),
	  maps = require('gulp-sourcemaps'),
	  uglify = require('gulp-uglify'),
	  rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  cleanCSS =require('gulp-clean-css'),
	  imagemin = require('gulp-imagemin'),
	  del = require('del'),
	  connect = require('gulp-connect');

sass.compiler = require('node-sass');

const options = { src: 'src', dist: 'dist' };

const scssFilePath = [`${options.src}/sass/**/*.scss`, `${options.src}/sass/**/**/*.sass`];

gulp.task('concatScripts', () => { 
//Concat the javaScripts files
	return gulp.src(`${options.src}/js/circle/*.js`)
				.pipe(concat('global.js'))
				.pipe(gulp.dest(`${options.src}/js`))
				.pipe(connect.reload());
})

gulp.task('scripts', ['concatScripts'], () => {
// minify javaScripts file and add the source map
	gulp.src(`${options.src}/js/*.js`)
		.pipe(maps.init())
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(maps.write(`./`))
		.pipe(gulp.dest(`${options.dist}/scripts`))
		.pipe(connect.reload());
});

gulp.task('sass', () => {
	return gulp.src(`${options.src}/sass/**/*.scss`)
		.pipe(sass())
		.pipe(gulp.dest(`${options.dist}/styles`))
		.pipe(connect.reload());
});

gulp.task('styles', () => {
// Compile SCSS into CSS with the source map
	gulp.src(`${options.src}/sass/global.scss`)
		.pipe(maps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(`${options.dist}/styles`))
		.pipe(connect.reload());
});

gulp.task('images', () => {
// Optimize the file size in the images folder
	gulp.src(`${options.src}/images/*`)
		.pipe(imagemin())
        .pipe(gulp.dest(`${options.dist}/content`))
});

gulp.task('html', () => {
// Place the HTML file in the dist folder
	gulp.src(`${options.src}/index.html`)
		.pipe(gulp.dest(options.dist))
		.pipe(connect.reload());
});

gulp.task('clean', () => {
// Delete the dist file or older build
	return del(options.dist);
});

gulp.task('watch', ['server'], () => {
//Wacth the HTML, javaScripts, and Sass files
	gulp.watch(scssFilePath , ['styles']);
	gulp.watch(`${options.src}/js/**/*.js`, ['scripts']);
	gulp.watch(`${options.src}/*.html`, ['html']);
});

gulp.task('server', () => { //localhost server
 	return connect.server({
    root: options.dist,
    port: 3000,
    livereload: true
  });
});

gulp.task('build', ['clean'], () => {
	gulp.start(['html', 'scripts', 'styles', 'images']);
});

gulp.task('default', ['build'], () => {
	gulp.start('watch');
});