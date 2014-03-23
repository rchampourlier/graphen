var gulp      = require('gulp');
var gutil     = require('gulp-util');
var connect   = require('gulp-connect');
var gulpif    = require('gulp-if');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');
var tplCache  = require('gulp-angular-templatecache');
var jade      = require('gulp-jade');
var less      = require('gulp-less');

gulp.task('js', function() {
  // concatenate compiled .coffee files and js files
  // into build/app.js
  gulp.src(['!./app/**/*_test.js','./app/**/*.js','!./app/**/*_test.coffee','./app/**/*.coffee'])
    .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', gutil.log)))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('templates', function() {
  // combine compiled Jade and html template files into 
  // build/template.js
  gulp.src(['!./app/index.jade', '!./app.index.html',
      './app/**/*.html', './app/**/*.jade'])
      .pipe(gulpif(/[.]jade$/, jade()))
      .pipe(tplCache('templates.js',{standalone:true}))
      .pipe(gulp.dest('./build'));
});

gulp.task('css', function() {
  // concatenate compiled Less and CSS
  // into build/app.css
  gulp.src(['./app/**/*.less', './app/**/*.css'])
    .pipe(gulpif(/[.]less$/, less()))    
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('vendorJS', function() {
  // concatenate vendor JS into build/lib.js
  gulp.src(['!./bower_components/**/*.min.js',
      './bower_components/**/*.js'])
      .pipe(concat('lib.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('vendorCSS', function() {
  // concatenate vendor css into build/lib.css
  gulp.src(['!./bower_components/**/*.min.css',
      './bower_components/**/*.css'])
      .pipe(concat('lib.css'))
      .pipe(gulp.dest('./build'));
});


gulp.task('index', function() {
  gulp.src(['./app/index.jade', './app/index.html'])
    .pipe(gulpif(/[.]jade$/, jade()))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch',function() {

  // reload connect server on built file change
  gulp.watch([
      'build/**/*.html',        
      'build/**/*.js',
      'build/**/*.css'        
  ], function(event) {
      return gulp.src(event.path)
          .pipe(connect.reload());
  });

  // watch files to build
  gulp.watch(['./app/**/*.coffee', './app/**/*.js'], ['js']);
  gulp.watch(['!./app/index.jade', '!./app/index.html', './app/**/*.jade', './app/**/*.html'], ['templates']);
  gulp.watch(['./app/**/*.less', './app/**/*.css'], ['css']);
  gulp.watch(['./app/index.jade', './app/index.html'], ['index']);
});

gulp.task('connect', connect.server({
  root: ['build'],
  port: 9000,
  livereload: true
}));

gulp.task('default', ['connect', 'js', 'templates', 'css', 'index', 'vendorJS', 'vendorCSS', 'watch']);