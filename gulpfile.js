var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('css', function() {
  return gulp.src('./css/style.css')
    .pipe($.sass({
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./web/css'));
});
gulp.task('js-vendor', function(){
    return gulp.src([
            './bower_components/jquery/dist/jquery.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./web/js/'));
});
//
// gulp.task('js-app',['js-vendor'], function(){
//     return gulp.src('./js/app.js')
//         .pipe(gulp.dest('./web/js/'));
// });

gulp.task('copy-png',function(){
    return gulp.src('./images').pipe(gulp.dest('./web/images'));
});

// gulp.task('copy-assets', 'copy-png', function(){});

gulp.task('minify-css',['css'],function(){
    return gulp.src('./web/css/app.css')
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./web/css/'));
});
//
// gulp.task('minify-js',['js-vendor','js-app'],function(){
//     return gulp.src('./web/js/*')
//         .pipe(uglify())
//         .pipe(gulp.dest('./web/js/'));
// });


gulp.task('default',['copy-png','minify-css'],function(){});
