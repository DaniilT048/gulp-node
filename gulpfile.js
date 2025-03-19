const { src, dest, watch, task, } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const fileinclude = require('gulp-file-include');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');

const PATH = {
    scssSource: './src/**/*.scss',
    htmlSource: './*.html',
    htmlDest: './**/*.html',
    projectDest: './assets',
    jsSource: './src/**/*.js',
}

const browserSync = require('browser-sync').create();
const plugins = [
    mqpacker({ sort: sortCSSmq }),
    cssnano({ preset: ['default', { mergeLonghand: false }]})
]

function scssMin() {
    return src(PATH.scssSource, { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(browserSync.stream())
        .pipe(dest(PATH.projectDest, { sourcemaps: true }))
}

function parseHtml() {
    return src(PATH.htmlSource)
        .pipe(fileinclude())
        .pipe(dest(PATH.projectDest));
}

function syncInit() {
    browserSync.init({
        server: {
            baseDir: PATH.projectDest
        }
    });
}

async function sync() {
    browserSync.reload();
}

function watchFiles() {
    syncInit();
    scssMin();
    watch(PATH.scssSource, scssMin);
    watch(PATH.scssSource, sync);
    watch(PATH.htmlSource, parseHtml);
    watch(PATH.htmlDest, sync);
    watch(PATH.jsSource, sync);
}

task('watch', watchFiles);