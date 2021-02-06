var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var strip       = require('gulp-strip-comments');
var minify      = require('gulp-minify');

// Local static server then watch scss/html files then reload
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: "http://zbframe2021.local/",
        port: 5645
    });
    // gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'htdocs/scss/*.scss'], ['sass']);

    gulp.watch(['source/js/*.js'], ['js']);
    gulp.watch(['source/scss/*.scss'], ['sass']);
    gulp.watch("templates/**").on('change', browserSync.reload);
});

// Compile sass into CSS and shovel into browsers
gulp.task('sass', function() {
    console.log("task activated");
  
    // Take the node_modules bootstrap.scss & then styles.scss
    // return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'source/scss/*.scss'])
    
    return gulp.src(['source/scss/*.scss'])
        // Log error
        .pipe(sass().on("error", sass.logError))        
        // Add it to the css folder       
        .pipe(gulp.dest("htdocs/css"))
        // Then update browser and reload.
        .pipe(browserSync.stream());        
});


// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    // Do the same as above but with JS files...
    // return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper/dist/js/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'source/js/scripts.js'])
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            // './node_modules/slick-carousel/slick/slick.min.js',
            './source/js/scripts.js'
        ])
        .pipe(concat('scripts.min.js'))     
        .pipe(gulp.dest("htdocs/js"))
        .pipe(browserSync.stream());
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// When you type gulp start server and run js
gulp.task('default', ['js','serve']);