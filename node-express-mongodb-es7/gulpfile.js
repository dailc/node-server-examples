const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

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

gulp.task('babel_sourcemaps', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest/'));
});

gulp.task('lint', ['eslint_js']);

gulp.task('default', ['lint', 'babel_sourcemaps']);

// 看守
gulp.task('watch', function() {

    gulp.watch('./src/**/*', ['default']);

});