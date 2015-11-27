var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var temp = require('temp').track();
var through2 = require('through2');

var serviceWorker = require('../index.js');

function sink() {
  return through2.obj(function(file, enc, callback) {
    callback();
  });
}

describe('gulp-serviceworker', function() {
  var oldWd = process.cwd();

  beforeEach(function() {
    process.chdir(temp.mkdirSync('gulp-serviceworker'));
  });

  afterEach(function() {
    process.chdir(oldWd);
  });

  it('should generate a service worker script', function(done) {
    fs.writeFileSync(path.join('prova.js'), 'something');

    var stream = gulp.src(['prova.js'])
    .pipe(serviceWorker({
      rootDir: '.'
    }))
    .pipe(sink())
    .on('finish', function() {
      assert.doesNotThrow(fs.accessSync.bind(fs, 'offline-worker.js'));
      done();
    });
  });
});
