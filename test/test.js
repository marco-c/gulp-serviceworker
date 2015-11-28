var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var temp = require('temp').track();
var through2 = require('through2');

var serviceWorker = require('../index.js');

// Needed to make the stream emit the 'finish' event.
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
      rootDir: '.',
    }))
    .pipe(sink())
    .on('finish', function() {
      assert.doesNotThrow(fs.accessSync.bind(fs, 'offline-worker.js'));
      done();
    });
  });

  it('should generate a service worker script if the rootDir option isn\'t specified', function(done) {
    fs.writeFileSync(path.join('prova.js'), 'something');

    var stream = gulp.src(['prova.js'])
    .pipe(serviceWorker())
    .pipe(sink())
    .on('finish', function() {
      assert.doesNotThrow(fs.accessSync.bind(fs, 'offline-worker.js'));
      done();
    });
  });

  it('should generate a service worker script if the rootDir option isn\'t the default and doesn\'t exist', function(done) {
    fs.writeFileSync(path.join('prova.js'), 'something');

    var stream = gulp.src(['prova.js'])
    .pipe(serviceWorker({
      rootDir: 'dist/',
    }))
    .pipe(sink())
    .on('finish', function() {
      assert.doesNotThrow(fs.accessSync.bind(fs, 'dist/offline-worker.js'));
      done();
    });
  });

  it('should generate a service worker script if the rootDir option isn\'t the default and already exists', function(done) {
    fs.writeFileSync(path.join('prova.js'), 'something');
    fs.mkdirSync('dist');

    var stream = gulp.src(['prova.js'])
    .pipe(serviceWorker({
      rootDir: 'dist/',
    }))
    .pipe(sink())
    .on('finish', function() {
      assert.doesNotThrow(fs.accessSync.bind(fs, 'dist/offline-worker.js'));
      done();
    });
  });

  it('should emit an error if rootDir isn\'t a directory', function(done) {
    fs.writeFileSync(path.join('prova.js'), 'something');

    var stream = gulp.src(['prova.js'])
    .pipe(serviceWorker({
      rootDir: 'prova.js',
    }))
    .on('error', function(err) {
      assert(err);
      done();
    })
    .pipe(sink())
    .on('finish', function() {
      assert(false);
    });
  });
});
