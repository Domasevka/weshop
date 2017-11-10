'use strict';
// plugins for development
var gulp = require('gulp'),
    rimraf = require('rimraf'),
	jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),
    dirSync = require('gulp-directory-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create();

// plugins for build
var mqpacker = require('css-mqpacker'),
    //uglify = require('gulp-uglifyjs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    csso = require('gulp-csso');

// plugins for svg
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

var srcDir = 'src/';
var outputDir = 'dist/';
var buildDir = 'build/';

gulp.task('jade', function(){
    return gulp.src(srcDir + 'jade/*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(outputDir)) // Выводим сгенерированные HTML-файлы в корневую папку
        .pipe(browserSync.stream())
		.pipe(notify('Jade is compile!'));
});

gulp.task('sass', function () {
	return gulp.src(srcDir + 'styles/**/*.scss')
		.pipe(plumber())
        .pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 3 versions', "> 2%"],
			cascade: false
		}))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir + 'styles/'))
        .pipe(browserSync.stream())
		.pipe(notify('Sass is compile!'));
});

gulp.task('jsConcat', function () {
    return gulp.src(srcDir + 'js/all/**/*.js')
        .pipe(concat('all.js', {newLine: ';'}))
        .pipe(gulp.dest(outputDir + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('imageSync', function () {
         return gulp.src(srcDir + 'img/**/*.*')
         .pipe(plumber())
         .pipe(dirSync(srcDir + 'img/', outputDir + 'img/', {printSummary: true}))
         .pipe(browserSync.stream());
});

gulp.task('fontsSync', function () {
    return gulp.src(srcDir + 'fonts/**/*.*')
        .pipe(plumber())
        .pipe(dirSync(srcDir + 'fonts/', outputDir + 'fonts/', {printSummary: true}))
        .pipe(browserSync.stream());
});

gulp.task('jsSync', function () {
    return gulp.src(srcDir + 'js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest(outputDir + 'js/'))
        .pipe(browserSync.stream());
});


gulp.task('watch', function(){
    gulp.watch(srcDir + 'jade/**/*.jade', ['jade']);
    gulp.watch(srcDir +'styles/**/*.scss', ['sass']);
    gulp.watch(srcDir + 'js/**/*.js', ['jsSync']);
    gulp.watch(srcDir + 'js/all/**/*.js', ['jsConcat']);
    gulp.watch(srcDir + 'img/**/*', ['imageSync']);
    gulp.watch(srcDir + 'fonts/**/*', ['fontsSync']);
});



gulp.task('svgSpriteBuild', function (){
    return gulp.src(srcDir + 'i/icons/*.svg')
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
       /* .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))*/
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            //dest:'../../../styles/components/_sprite.scss',
                            dest:srcDir + 'styles/components/_sprite.scss',
                            template:srcDir + "styles/templates/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
        //.pipe(gulp.dest(buildDir + 'i/sprite/'));
        .pipe(gulp.dest(outputDir + 'i/sprite/'));
});


// for build folder
gulp.task('cleanBuildDir', function (cb) {
    rimraf(buildDir, cb);
});

//minify images
gulp.task('imgBuild', function () {
    return gulp.src(outputDir + 'img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildDir + 'img/'))
});

//copy fonts
gulp.task('fontsBuild', function () {
    return gulp.src(outputDir + 'fonts/**/*')
        .pipe(gulp.dest(buildDir + 'fonts/'))
});

//copy html
gulp.task('htmlBuild', function () {
    return gulp.src(outputDir + '**/*.html')
        .pipe(gulp.dest(buildDir))
});

//copy and minify js
gulp.task('jsBuild', function () {
    return gulp.src(outputDir + 'js/**/*')
        //.pipe(uglify('index.min.js'))
        .pipe(gulp.dest(buildDir + 'js/'))
});

//copy, minify css
gulp.task('cssBuild', function () {
    return gulp.src(outputDir + 'styles/**/*')
        .pipe(postcss([
            mqpacker({
                sort: true
            })
        ]))
        .pipe(csso())
        .pipe(concat("style.css"))
        .pipe(gulp.dest(buildDir + 'styles/'))
});


gulp.task('build', function (callback) {
    runSequence('cleanBuildDir',
        ['imgBuild', 'fontsBuild', 'htmlBuild', 'jsBuild', 'cssBuild','svgSpriteBuild'],
        callback);
});


gulp.task('browser-sync', function () {
         browserSync.init({
         server: {
         baseDir: outputDir
         },
         host: 'localhost',
         port: 9000,
         injectChanges: true,
         logPrefix: 'App Front-End'
     });
 });


gulp.task('default', function (callback) {
    runSequence('build', 'watch', 'browser-sync', callback);
});

//gulp.task('default', ['jade', 'sass', 'imageSync', 'fontsSync', /*'jsConcat', 'jsSync',*/ 'watch', 'browser-sync']);


