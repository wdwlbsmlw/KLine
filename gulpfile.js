// cnpm i gulp del sequence gulp-less gulp-cached gulp-autoprefixer gulp-rename gulp-cssnano gulp-uglify gulp-imagemin gulp-htmlmin browser-sync babel-core gulp-babel gulp-rev gulp-rev-collector --save-dev
var gulp = require('gulp'),
    del = require("del"), // 删除
    sequence = require("gulp-sequence"),
    fileinclude  = require('gulp-file-include'),
    sass = require("gulp-sass"),  // sass 编译
    cached = require("gulp-cached"),  // 缓存
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'), // 重命名
    cssnano = require('gulp-cssnano'), // CSS 压缩
    uglify = require('gulp-uglify'), // js 压缩
    imagemin = require('gulp-imagemin'), // 图片优化
    miniHtml = require("gulp-htmlmin"),  //html压缩（js、css压缩）
    browserSync = require('browser-sync'), // 保存自动刷新
    babel = require('gulp-babel'), //babel 编译
    rev = require('gulp-rev'), //版本号记录
    revCollector = require('gulp-rev-collector'); // 版本

// 1. del
gulp.task('del', function () {
  return del(['dist/**/*', 'rev/**/*']);
});

// md5
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function() {
  return gulp.src('src/css/*')
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css/'))
});
gulp.task('revJs', function() {
  return gulp.src(['src/js/*'])
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js/'))
});

//版本替换
//Html更换css、js文件版本
gulp.task('revReHtml', function () {
 return gulp.src(['rev/**/*.json', 'src/template/*.html'])
   .pipe(revCollector())
   .pipe(gulp.dest('rev/page/'))
});

// 3. 压缩css
gulp.task('css', function () {
 return gulp.src('src/css/*')
   .pipe(cssnano())
   .pipe(rename({suffix: ''}))
   .pipe(gulp.dest('dist/css/'))
});

// 4. 压缩js
gulp.task('script', function() {
 return gulp.src('src/js/*')
   .pipe(cached('script'))
   // .pipe(uglify())
   .pipe(gulp.dest('dist/js/'))
});

// 5. html 压缩
gulp.task('html', function() {
 return gulp.src(['rev/page/*.html'])
   .pipe(miniHtml({
     removeComments: true,
     collapseWhitespace: true,
     collapseBooleanAttributes: true,
     removeEmptyAttributes: true,
     removeScriptTypeAttributes: true,
     removeStyleLinkTypeAttributes: true,
     minifyJS: true,
     minifyCSS: true
   }))
   .pipe(gulp.dest('dist'))
});

gulp.task('download', function () {
  return gulp.src('src/download/*')
    .pipe(gulp.dest('dist/download'))
});

gulp.task('font', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// images
gulp.task('imagemove', function () {
  return gulp.src('src/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(cached('image'))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('dev', sequence(
  // md5生成
  ['revCss', 'revJs'],
  // md5替换
  ['revReHtml'],
  // 开始压缩
  ['css', 'script'],
  ['html'],
  ['imagemove']
));

gulp.task("default", ["del"], function () {
  gulp.start('dev');
});

gulp.task("w", function () {
  gulp.watch(['src/js/*.js'], ['includeI18n'])
});
