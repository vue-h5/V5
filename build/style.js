const { src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const importOnce = require('node-sass-import-once')

sass.compiler = require('node-sass')

exports.default = function () {
    return src('../src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            importer: importOnce
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'ie > 8']
        }))
        .pipe(rename('v5.css'))
        .pipe(dest('../dist'))
}