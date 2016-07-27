var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var shell = require('gulp-shell');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var sequence = require('gulp-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var named = require('vinyl-named');
var config = require('./config/build');
var webpackConfig = require('./webpack.config.js');

gulp.task('clean', function(){
    return gulp.src(config.distBase, {read:false})
        .pipe(clean());
});

// 拷贝静态文件
gulp.task('copy', function() {
    return gulp.src([config.clientBase + '/assets/**'], {
        base: config.clientBase + '/assets'
    }).pipe(gulp.dest(config.distBase+'/assets'));
});

// 执行webpack
gulp.task('webpack', function(){
    gulp.src([
        config.clientBase + '/pages/index.js',
        config.clientBase + '/pages/main.js'
    ])
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.distBase + '/js'))
    .on("error", function(err){
      throw err
    })
});

// MCSS编译
gulp.task('mcss', shell.task(['mcss -c webapp/mcss/mcss.json']) );

// gulp.task('miniJs', function(){
//     return gulp.src(config.distBase + '/js')
//     .pipe(gulpif(true, uglify()))
//     .pipe(rev())
//     .pipe(gulp.dest(config.distBase))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest(config.distBase+'/rev/js'))
// });
//
gulp.task('client', function(done) {
    sequence(['copy', 'webpack', 'mcss'], done);
});

// 监听
gulp.task('watch', function() {
    gulp.watch(['webapp/pages/**'], ['webpack']);
    gulp.watch(['webapp/mcss/**'], ['mcss']);
    gulp.watch(['webapp/assets/**'], ['copy']);
});

//顺序执行任务
gulp.task('dev', function(done){
    sequence('clean',['copy', 'webpack', 'mcss'], 'watch', done);

});

gulp.task('default', ['dev'])
