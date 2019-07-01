const fs = require('fs-extra')
const path = require('path')
const { src, dest, series } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const rimraf = require('rimraf')

sass.compiler = require('node-sass')

function css() {
    let files = fs.readdirSync('../src/styles/components')

    files.map(function (name) {
        let fileName = name.slice(0, -5)

        return src(path.join('../src/styles/components/', name))
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie > 8']
            }))
            .pipe(rename('index.css'))
            .pipe(dest(`../lib/components/${fileName}`))
    })
}

function html (cb) {
    let files = fs.readdirSync('../src/components')

    files.map(file => {
        return src(path.join('../src/components/', file, `${file}.vue`))
            .pipe(rename('index.vue'))
            .pipe(dest(`../lib/components/${file}`))
    })

    cb()
}

function init (cb) {

    rimraf('../lib', err => {
        if (err) throw Error(err)
        cb()
    })

}

exports.default = series(init, html, css )