const inlineNg2Template = require('gulp-inline-ng2-template');
const htmlMinifier = require('html-minifier');
const cleanCss = require('clean-css');
const gulp = require('gulp');
const clean = require('gulp-clean');

const tmpDir = './tmp';
const distDir = './dist';

function minifyTemplate(path, ext, file, callback) {
    try {
        const minifiedFile = htmlMinifier.minify(file, {
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeRedundantAttributes: true,
            preserveLineBreaks: false,
        });

        callback(null, minifiedFile);
    }
    catch (error) {
        callback(error);
    }
}

function minifyCss(path, ext, file, callback) {
    try {
        new cleanCss().minify(file, function (error, output) {
            callback(null, output.styles);
        });
    }
    catch (error) {
        callback(error);
    }
}

gulp.task('inline-templates', ['clean-tmp'], function () {
    return gulp.src('./src/**/*.ts')
        .pipe(inlineNg2Template({
            base: '/src',
            target: 'es6',
            useRelativePaths: true,
            templateProcessor: minifyTemplate,
            styleProcessor: minifyCss,
            removeLineBreaks: true,
        }))
        .pipe(gulp.dest(tmpDir));
});

gulp.task('clean-tmp', function () {
    return gulp.src(tmpDir, { read: false })
        .pipe(clean());
});

gulp.task('clean-dist', function () {
    return gulp.src(distDir, { read: false })
        .pipe(clean());
});

gulp.task('copy-package-json', function () {
    return gulp.src('package.json')
        .pipe(gulp.dest(distDir));
});

gulp.task('copy-misc-files', function () {
    return gulp.src(['README.MD', 'LICENSE', 'CHANGELOG.MD'])
        .pipe(gulp.dest(distDir));
});

gulp.task('copy-all', ['copy-package-json', 'copy-misc-files']);
