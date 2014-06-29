var gulp      = require('gulp');
var gutil     = require('gulp-util');
var connect   = require('gulp-connect');
var gulpif    = require('gulp-if');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');
var tplCache  = require('gulp-angular-templatecache');
var jade      = require('gulp-jade');
var less      = require('gulp-less');
var watch     = require('gulp-watch');

gulp.task('appJS', function() {
  // concatenate compiled .coffee files and js files
  // into build/app.js
  gulp.src(['./app/**/*.js','./app/**/*.coffee'])
    .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', gutil.log)))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('testJS', function() {
  // Compile JS test files. Not compiled.
  gulp.src([
      './test/**/*_test.js',
      './test/**/*_test.coffee'
    ])
    .pipe(
      gulpif(/[.]coffee$/,
        coffee({bare: true})
        .on('error', gutil.log)
      )
    )
    .pipe(gulp.dest('./build'))
});

gulp.task('templates', function() {
  // combine compiled Jade and html template files into 
  // build/template.js
  gulp.src(['!./app/index.jade', '!./app.index.html',
      './app/**/*.html', './app/**/*.jade'])
      .pipe(gulpif(/[.]jade$/, jade().on('error', gutil.log)))
      .pipe(tplCache('templates.js',{standalone:true}))
      .pipe(gulp.dest('./build'))
});

gulp.task('appCSS', function() {
  // concatenate compiled Less and CSS
  // into build/app.css
  gulp
    .src([
      './app/**/*.less',
      './app/**/*.css'
    ])
    .pipe(
      gulpif(/[.]less$/,
        less({
          paths: [
            './bower_components/bootstrap/less'
          ]
        })
        .on('error', gutil.log))
    )
    .pipe(
      concat('app.css')
    )
    .pipe(
      gulp.dest('./build')
    )
});

gulp.task('libJS', function() {
  // concatenate vendor JS into build/lib.js
  gulp.src([
    './bower_components/lodash/dist/lodash.js',
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-bootstrap/ui-bootstrap.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/react/react-with-addons.js'
    ]).pipe(concat('lib.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('libCSS',
  function() {
  // concatenate vendor css into build/lib.css
  gulp.src(['!./bower_components/**/*.min.css',
      './bower_components/**/*.css'])
      .pipe(concat('lib.css'))
      .pipe(gulp.dest('./build'));
});

gulp.task('index', function() {
  gulp.src(['./app/index.jade', './app/index.html'])
    .pipe(gulpif(/[.]jade$/, jade().on('error', gutil.log)))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch',function() {

  // reload connect server on built file change
  watch({
    'glob': [
      'build/**/*.html',        
      'build/**/*.js',
      'build/**/*.css'
    ]})
    .pipe(connect.reload());

  // Watch files to build

  // App
  watch({
    'glob': [
      'app/**/*.coffee', '!app/**/*_test.coffee',
      'app/**/*.js', '!app/**/*_test.js'
    ]}
  , function() {
    gulp.start('appJS');
  });

  // Test
  watch({
    'glob': [
      'test/**/*_test.coffee', 'test/**/*_test.js'
    ]}
  , function() {
    gulp.start('testJS');
  });

  // Templates
  watch({
    'glob': [
      '!app/index.jade', '!app/index.html',
      'app/**/*.jade', 'app/**/*.html'
    ]}
  , function() {
    gulp.start('templates');
  });

  // Stylesheets
  watch({
    'glob': [
      'app/**/*.less',
      'app/**/*.css'
    ]}
  , function() {
    gulp.start('appCSS');
  });

  watch({
    'glob': [
      'app/index.jade',
      'app/index.html'
    ]}
  , function() {
    gulp.start('index');
  });
});

gulp.task('connect', connect.server({
  root: ['build'],
  port: 9000,
  livereload: true
}));

gulp.task('default', ['connect', 'appJS', 'testJS', 'templates', 'appCSS', 'index', 'libJS', 'libCSS', 'watch']);