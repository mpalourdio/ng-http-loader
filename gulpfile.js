const inlineNg2Template = require('gulp-inline-ng2-template');
const gulp = require('gulp');
const clean = require('gulp-clean');

const tmpDir = './tmp';
const distDir = './dist';

gulp.task('inline-templates', ['clean-tmp'], function () {
    return gulp.src('./src/**/*.ts')
        .pipe(inlineNg2Template({
            base: '/src',
            target: 'es6',
            useRelativePaths: true
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
    return gulp.src(['README.MD', 'LICENSE'])
        .pipe(gulp.dest(distDir));
});

gulp.task('copy-all', ['copy-package-json', 'copy-misc-files']);
