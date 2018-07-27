var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('h5/*.png').pipe(spritesmith({
    imgName: 'sprite-h5.png',
    cssName: 'sprite.css',
    padding: 10,
    cssTemplate: function (data) {
      var arr = [];
      data.sprites.forEach(function (sprite) {
        arr.push(`
        .icon-${sprite.name} {
          background-image: image_url("${sprite.escaped_image}");
          background-position: ${Math.round(sprite.offset_x / 2)}px ${Math.round(sprite.offset_y / 2)}px;
          background-size: ${Math.round(sprite.total_width / 2)}px ${Math.round(sprite.total_height / 2)}px;
          width: ${Math.round(sprite.width / 2)}px;
          height: ${Math.round(sprite.height / 2)}px;
        }
        `.trim())
      });

      return arr.join('');
    }
  }));
  return spriteData.pipe(gulp.dest('output/'));
});