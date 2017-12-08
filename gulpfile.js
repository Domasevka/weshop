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
    uglify = require('gulp-uglifyjs'),
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

// for build folder
gulp.task('cleanBuildDir', function (cb) {
    rimraf(outputDir, cb);
});

gulp.task('jade', function(){
    return gulp.src(srcDir + '*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(outputDir)) // Выводим сгенерированные HTML-файлы в корневую папку
        .pipe(browserSync.stream())
		.pipe(notify('Jade is compile!'));
});

gulp.task('sass', function () {
	return gulp.src(srcDir + 'styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 3 versions', "> 2%"],
			cascade: false
		}))
        .pipe(postcss([
            mqpacker({
                sort: true
            })
        ]))
        .pipe(csso())
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir + 'styles/'))
        .pipe(browserSync.stream())
        //.pipe(browserSync.reload({stream: true}))
		.pipe(notify('Sass is compile!'));
});

gulp.task('jsSync', function () {
    return gulp.src(srcDir + 'js/*.js')
        .pipe(plumber())
        .pipe(concat('index.js', {newLine: ';'}))
        //.pipe(uglify())
        .pipe(gulp.dest(outputDir + 'js/'))
        .pipe(browserSync.stream());
});

/*gulp.task('jsConcat', function () {
    return gulp.src(srcDir + 'js/all/!**!/!*.js')
        .pipe(concat('all.js', {newLine: ';'}))
        .pipe(gulp.dest(outputDir + 'js/'))
        .pipe(browserSync.stream());
});*/

gulp.task('imageSync', function () {
         return gulp.src(srcDir + 'img/**/*.*')
         .pipe(imagemin({
             progressive: true,
             svgPlugins: [{removeViewBox: false}],
             use: [pngquant()]
         }))
         .pipe(dirSync(srcDir + 'img/', outputDir + 'img/', {printSummary: true}))
         .pipe(browserSync.stream());
});

gulp.task('fontsSync', function () {
    return gulp.src(srcDir + 'fonts/**/*.*')
        .pipe(plumber())
        .pipe(dirSync(srcDir + 'fonts/', outputDir + 'fonts/', {printSummary: true}))
        .pipe(browserSync.stream());
});

gulp.task('bower', function() {
    //return gulp.src(mainBowerFiles('**/*.js' ,{debugging:true}))
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui-slider/jquery-ui.js',
        'bower_components/twbs-pagination/jquery.twbsPagination.js',
        'bower_components/swiper/dist/js/swiper.min.js',
        'bower_components/slick-carousel/slick/slick.min.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest(outputDir + 'js/')); // Выгружаем в папку
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



gulp.task('watch', function(){
    gulp.watch(srcDir + '**/*.jade', ['jade']);
    gulp.watch(srcDir +'styles/**/*.scss', ['sass']);
    gulp.watch(srcDir + 'js/*.js', ['jsSync']);
    gulp.watch(srcDir + 'img/**/*', ['imageSync']);
    gulp.watch(srcDir + 'fonts/**/*', ['fontsSync']);
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

//minify images
/*gulp.task('imgBuild', function () {
    return gulp.src(outputDir + 'img/!**!/!*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildDir + 'img/'))
});*/


/*//copy html
gulp.task('htmlBuild', function () {
    return gulp.src(outputDir + '**!/!*.html')
        .pipe(gulp.dest(buildDir))
});*/

//copy and minify js
/*gulp.task('jsBuild', function () {
    return gulp.src(outputDir + 'js/!**!/!*')
        .pipe(uglify('index.js'))
        .pipe(gulp.dest(outputDir + 'js/'))
});*/

//copy, minify css

/*gulp.task('cssBuild', function () {
     return gulp.src(srcDir + 'css/!**!/!*')
         .pipe(postcss([
             mqpacker({
                sort: true
            })
         ]))
         .pipe(csso())
         .pipe(concat("style.css"))
         .pipe(gulp.dest(outputDir + 'styles/'))
 });*/


gulp.task('build', function (callback) {
     runSequence('cleanBuildDir',
        ['jade', 'sass', 'bower', 'jsSync', 'imageSync', 'fontsSync', 'svgSpriteBuild'],
     callback);
 });

/*gulp.task('build', function (callback) {
    runSequence('cleanBuildDir',
        ['bower', 'imgBuild', 'fontsBuild', 'htmlBuild', 'jsBuild', 'cssBuild','svgSpriteBuild'],
        callback);
});*/


gulp.task('default', function (callback) {
    runSequence('build', 'watch', 'browser-sync', callback);
});

gulp.task('default', ['jade', 'sass', 'bower', 'jsSync', 'imageSync', 'fontsSync', 'svgSpriteBuild', 'watch', 'browser-sync']);


