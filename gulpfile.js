const { src, dest, watch, task, series, parallel } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

const PATH = {
    scssRootFile: 'src/**/*.scss',
    cssFolder: 'assets/styles',
}

function compileScss(){
    return src(PATH.scssRootFile)
        .pipe(sass().on('error', sass.logError))
        .pipe(browserSync.stream())
        .pipe(dest(PATH.cssFolder));
}



function syncInit() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

async function sync() {
    browserSync.reload();
}

function watchFiles() {
    syncInit();
    watch(PATH.scssRootFile, series(compileScss));
}