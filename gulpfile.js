var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

var spritesmith = require('gulp.spritesmith');

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    cssTemplate: function (data) {
      var arr = [];
      data.sprites.forEach(function (sprite) {
        arr.push(`
        .icon-${sprite.name} {
          background-image: image_url("${sprite.escaped_image}");
          background-position: ${sprite.offset_x / 2}px ${sprite.offset_y / 2}px;
          background-size: ${sprite.total_width / 2}px ${sprite.total_height / 2}px;
          width: ${sprite.width / 2}px;
          height: ${sprite.height / 2}px;
        }
        `.trim())
      });

      return arr.join('');
    }
  }));
  return spriteData.pipe(gulp.dest('output/'));
});