"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var ttf2woff = require('gulp-ttf2woff');
var ttf2woff2 = require('gulp-ttf2woff2');

gulp.task("ttf2woff2", function(){
  return gulp.src(["source/fonts/*.ttf"])
    .pipe(ttf2woff2())
    .pipe(gulp.dest("source/fonts/"));
});

gulp.task("ttf2woff", function(){
  return gulp.src(["source/fonts/*.ttf"])
    .pipe(ttf2woff())
    .pipe(gulp.dest("source/fonts/"));
});

gulp.task("ttf-convert", gulp.series(
  "ttf2woff",
  "ttf2woff2"
));

gulp.task("html-include", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
 });

gulp.task("js-copy", function () {
  return gulp.src([
    "source/js/**"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html-include", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js-copy", "refresh"));
  gulp.watch("source/*.html", gulp.series("html-include", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html-include"
));

gulp.task("start", gulp.series("build", "server"));
