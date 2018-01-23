var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3100
    },
    ignore: ['./node_modules/**']
  })
    .on('restart', function () {
      console.log('Restarting...');
    });
});
gulp.task('test', function () {
  gulp.src('./books/*.spec.js', { read: false })
    .pipe(gulpMocha({ reporter: 'nyan' }))
});