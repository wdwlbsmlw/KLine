# KLine

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# 对插件进行如下修改，使得引用资源文件的url得以如下变换：
#  "/css/base-f7e3192318.css" >> "/css/base.css?v=f7e3192318"

gulp-rev 1.0.5
node_modules\gulp-rev\index.js
144 manifest[originalFile] = revisionedFile; => manifest[originalFile] = originalFile + '?v=' + file.revHash;

gulp-rev 1.0.5
node_modules\gulp-rev\node_modules\rev-path\index.js
10 return filename + '-' + hash + ext; => return filename + ext;

gulp-rev-collector 7.1.0
node_modules\gulp-rev-collector\index.js
31 if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) { =>
if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
