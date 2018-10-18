const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')

sass.compiler = require('node-sass')

gulp.task('sass', function () {
    return gulp.src('../src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(rename('v5.css'))
        .pipe(gulp.dest('../dist'))
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 sass 任务
gulp.task('default', ['sass'])