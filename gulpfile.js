const { src, dest, watch, task, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();


const PATH = {
    scssRootFile: 'src/**/*.scss',
    cssFolder: 'assets/',
    htmlRootFile: './*.html',
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
    compileScss()
    watch(PATH.scssRootFile, series(compileScss));
    watch(PATH.htmlRootFile, sync);
}

task('watch', watchFiles);