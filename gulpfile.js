var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('huopu/*.png').pipe(spritesmith({
    imgName: 'huopu.png',
    cssName: 'sprite.css',
    padding: 4,
    cssTemplate: 'handlebarsStr.css.handlebars',
    cssHandlebarsHelpers: {
      half: function (num) { return `${num / 2}px`; }
    }
  }));
  return spriteData.pipe(gulp.dest('output/'));
});