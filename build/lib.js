const fs = require('fs-extra')
const path = require('path')
const { src, dest, series, parallel } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const rimraf = require('rimraf')

sass.compiler = require('node-sass')

function css(cb) {
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
            .pipe(rename('layout.css'))
            .pipe(dest(`../lib/components/${fileName}`))
    })

    cb()
}

// 为 index.vue 添加 layout.css
async function appendCss () {
    let files = fs.readdirSync('../lib/components')
    let all = []
    let appendData = '\n<style src="./layout.css"></style>'

    files.forEach(file => {
        if (fs.existsSync(`../lib/components/${file}/layout.css`)) {
            all.push(appendFile(`../lib/components/${file}/index.vue`, appendData))
        }
    })

    try {
        await Promise.all(all)
    } catch (err) {
        console.log('Append Css Error:', err)
    }
}

function getFiles (dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err)

            resolve({dir, files})
        })
    })
}

function appendFile (file, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, data, 'utf8', err => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        })
    })
}

async function html (cb) {
    let files = fs.readdirSync('../src/components')
    let arr = []
    let from = ''

    // 获取所有文件信息
    files.map(file => {
        from = path.join('../src/components/', file)
        arr.push(getFiles(from))
    })

    try {
        const allWillCopyFiles = await Promise.all(arr)

        allWillCopyFiles.forEach(data => {
            data.files.forEach(file => {
                // 过滤 index.js 文件
                if (file !== 'index.js') {
                    from = data.dir + '/' + file
                    let to = '../lib' + from.slice(6)
                    
                    arr.push(fs.copy(from, to))
                }
            })
        })

        await Promise.all(arr)
    } catch (err) {
        console.log(err)
    }
}

function emptyDir (cb) {
    return fs.emptyDir('../lib')
}

function copyMix(form, to) {
    return fs.copy('../src/mixins', '../lib/mixins')
}

exports.default = series(
    emptyDir, 
    html, css,
    copyMix,
    appendCss
)