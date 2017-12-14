'use strict';
// plugins for development

var gulp = require('gulp'),
    rimraf = require('rimraf'),
	jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    del = require('del'),
	browserSync = require('browser-sync').create();

// plugins for build
var mqpacker = require('css-mqpacker'),
    uglify = require('gulp-uglifyjs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
    //csso = require('gulp-csso');

// plugins for svg
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

var srcDir = 'src/';
var outputDir = 'dist/';

// for build folder
gulp.task('cleanOutputDir', function () {
    return del('dist');
});

gulp.task('sass', function () {
	return gulp.src(srcDir + 'styles/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'sass',
                    message: err.message
                };
            })
        }))
        .pipe(sourcemaps.init())
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
        //.pipe(csso())
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir + 'styles/'))
		.pipe(notify('Sass is compile!'));
});

gulp.task('jade', function(){
    return gulp.src(srcDir + '*.jade')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(outputDir)); // Выводим сгенерированные HTML-файлы в корневую папку
});

gulp.task('jsSync', function () {
    return gulp.src(srcDir + 'js/*.js')
        .pipe(plumber())
        .pipe(concat('index.js', {newLine: ';'}))
        //.pipe(uglify())
        .pipe(gulp.dest(outputDir + 'js/'));
});

gulp.task('imageSync', function () {
         return gulp.src(srcDir + 'img/**/*.*')
         .pipe(imagemin({
             progressive: true,
             svgPlugins: [{removeViewBox: false}],
             use: [pngquant()]
         }))
         .pipe(gulp.dest(outputDir + 'img/'));
});

gulp.task('fontsSync', function () {
    return gulp.src(srcDir + 'fonts/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest(outputDir + 'fonts/'));
});

gulp.task('bower', function() {
    //return gulp.src(mainBowerFiles('**/*.js' ,{debugging:true}))
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui-slider/jquery-ui.js',
        'bower_components/twbs-pagination/jquery.twbsPagination.js',
        'bower_components/swiper/dist/js/swiper.min.js'
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
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))*/
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

gulp.task('build', gulp.series(
    'cleanOutputDir',
    gulp.parallel('sass', 'jade', 'bower', 'jsSync', 'imageSync', 'fontsSync', 'svgSpriteBuild'))
);

gulp.task('watch', function(){
    gulp.watch(srcDir + '**/*.jade', gulp.series('jade'));
    gulp.watch(srcDir +'styles/**/*.scss', gulp.series('sass'));
    gulp.watch(srcDir + 'js/*.js', gulp.series('jsSync'));
    gulp.watch(srcDir + 'img/**/*', gulp.series('imageSync'));
    gulp.watch(srcDir + 'fonts/**/*', gulp.series('fontsSync'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/',
            index: "home.html"
        }
    });
    browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});


gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);




