'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

var paths = {
    main: ['./src/js/main.jsx'],
    js: ['./src/**/*.jsx'],
};

gulp.task('js', function() {
    // Browserify/bundle the JS.
    browserify(paths.main)
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    livereload: true
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['connect', 'watch', 'js']);