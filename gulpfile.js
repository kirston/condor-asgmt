var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var frontnote = require('gulp-frontnote');
var cleanCss = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// compile bootstrap sass into css
gulp.task('bootstrap-sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
		.pipe(sass())
		.pipe(gulp.dest("src/css"))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

// move javascript files into /src/js and /dist/js directories
gulp.task('scripts', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest("src/js"))
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

// complie sass to css, rename (style to main) and minify 
gulp.task('sass', function() {
    gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(frontnote({
            out: 'docs/css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
});

// rename (custom to main) and minify custom js
gulp.task('js', function() {
    gulp.src(['src/js/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(jshint())
          .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
});

// minify html
gulp.task('html', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
});


// minify images
gulp.task('images', function() {
    return gulp.src(['src/images/**/*'])

        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream())
});

// static server and watch files
gulp.task('default', function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/images/**/*',['images']);
});