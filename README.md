gulp-serviceworker
=================

Generate a Service Worker to make your app work offline.

[![Build Status](https://travis-ci.org/marco-c/gulp-serviceworker.svg?branch=master)](https://travis-ci.org/marco-c/gulp-serviceworker)
[![dependencies](https://david-dm.org/marco-c/gulp-serviceworker.svg)](https://david-dm.org/marco-c/gulp-serviceworker)
[![devdependencies](https://david-dm.org/marco-c/gulp-serviceworker/dev-status.svg)](https://david-dm.org/marco-c/gulp-serviceworker#info=devDependencies)

# Usage

The plugin has the following options:
- rootDir: defines the root directory where the resources to be cached are and where the service worker script will be generated.

# Example

```JavaScript
var gulpServiceWorker = require('gulp-serviceworker');

gulp.task('generate-service-worker', ['build'], function() {
  return gulp.src(['dist/*'])
  .pipe(gulpServiceWorker({
    rootDir: 'dist/',
  }));
});
```

You also need to register the generated service worker in your pages. Something like:
```JavaScript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('offline-worker.js')
  .then(function(registration) {
    console.log('offline worker registered');
  });
}
```
