var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync');

var homePath = './assets',
    stylePath = homePath+'/css';


// Compile LESS & auto-inject into browsers
gulp.task('styles', function () {
    return gulp.src(stylePath+'/*.less')
        .pipe(less())
        .pipe(gulp.dest(stylePath))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('styles-dev', function () {
    return gulp.src(stylePath+'/*.less')
        .pipe(less())
        .pipe(gulp.dest(stylePath));
        // .pipe(browserSync.reload({stream:true}));
});

// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch-dev', function(){
    gulp.watch(stylePath+'/*.less', ['styles']);
    // gulp.watch(homePath+'*.html', ['bs-reload']);
});

gulp.task('watch', function(){
    gulp.watch(stylePath+'/*.less', ['styles']);
    gulp.watch(homePath+'*.html', ['bs-reload']);
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('dev', [
    'styles-dev',
    // 'browser-sync',
    'watch',
]);

gulp.task('default', [
    'styles',
    'browser-sync',
    'watch',
]);
