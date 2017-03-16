'use strict'

var gulp = require('gulp')

var env = process.env.NODE_ENV || 'development'
/*
var defaultTasks = ['clean', 'jshint', 'csslint','serve','watch'] // initialize with development settings
if (env === 'production') { var defaultTasks = ['clean', 'cssmin', 'uglify', 'serve', 'watch'];}
if (env === 'test')       { var defaultTasks = ['env:test', 'karma:unit', 'mochaTest'];}
*/
// read gulp directory contents for the tasks...
require('require-dir')('./gulp')
console.log('Invoking gulp -', env)
gulp.task('default', ['clean'], function (defaultTasks) {
  // run with paramater
  gulp.start(env)
})

// bowerのスクリプトをHTMLに埋め込む
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  return gulp
    .src(['./packages/custom/porkyou/server/views/includes/head.html', './packages/custom/porkyou/server/views/includes/foot.html'])
    .pipe(wiredep({
      ignorePath: '../../../../../../bower_components/',
      exclude: [
          'angular.js',
      ],
      fileTypes: {
        html: {
          replace: {
            js: '<script src="/bower_components/{{filePath}}"></script>',
            css: '<link rel="stylesheet" href="/bower_components/{{filePath}}" />'
          }
        }
      }
    }))
// wiredep bower dependencies
//    .pipe($.inject(gulp.src(['./packages/custom/porkyou/server/views/includes/*.js', './packages/custom/porkyou/server/views/includes/*.css']), {
//      relative: true // no need for the './src/client' part
//    }))    
    .pipe(gulp.dest('./packages/custom/porkyou/server/views/includes')) // output the index.html
})