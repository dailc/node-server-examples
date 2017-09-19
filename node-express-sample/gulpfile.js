const gulp = require('gulp');
const eslint = require('gulp-eslint');


// eslint代码检查，方便调试
gulp.task('eslint_js', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint({
            // fix: true
        }))
        .pipe(eslint.format());
        // 开启后如果报错会退出
        //.pipe(eslint.failAfterError());
});

gulp.task('lint', ['eslint_js']);

// 看守
gulp.task('watch', function() {

    gulp.watch('./src/**/*', ['lint']);

});