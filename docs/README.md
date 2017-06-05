# xstrap
xstrap webpack 模块化版本

## 工程化思路
**features**
- 模块化开发。和写nodejs一样写js。
- 性能要好。模块那么多，需要按需打包
- 组件化开发，一个组件的js、css、模版最好都在一个目录维护
- sass写css
- 压缩图片
- 图片小于8K，base64引入（base64 支持IE8）；css sprite
- autoprefix自动添加前缀解决兼容样式，postcss对css进行后处理
- js、css、图片压缩
- 自刷新 
- 本地服务器？这个可以用 express 整一个
- 部署？hash版本号。

### 目录结构
```bash
|---- root
  |---- build
  |---- dest 压缩源（src）文件，生成压缩包到（dest）
  |---- dist 是编译后的文件，压缩版
  |---- src 源文件
    |---- asset 静态资源
    |---- components 组件
    |---- util 工具js
    |---- styles 样式
      |---- common 公用的部分，图标字体文件可放到这个文件夹
      |---- components style组件
      |---- mixins 公用的scss
      |---- themes UI 主题
      |---- index.scss 样式入口文件，负责将所有styles里面的样式都打包到这里面
  |---- test 单元测试目录
  |---- examples 项目示例专用存放目录
```
dist是编译后的文件，压缩版； 
src是源码文件；

压缩源（src）文件，生成压缩包到（dest），dest一般和src配对出现。

### 构建工具
- 使用webpack 对代码进行编译构建、模块打包
- 开发环境（dev），生成环境（prod）分别打包
- 特殊需求单独打包，写一个数组，把用到的插件、组件、模块名放进去，webpack构建一下就可以生成所需要的bundle的了
- gulp可能用的上，用来执行简单任务

### 编码规范
airbnb JavaScript 编码规范
js doc 规范。Why js doc？ phpStorm 能够检查传参类型
[Use JSDoc: Getting Started with JSDoc 3](http://usejsdoc.org/about-getting-started.html#getting-started)

### 代码审查
代码质量检查：ESLint

### 单元测试
对于复杂度较高的模块，需要单元测试，进行质量控制
[mochajs](https://mochajs.org/)
[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

## 模块化思路
CMD规范 目前
ES6 规范，将来；with babel

js：
vendor.js [vendor lib]
xstrap.js [module bundle]

写webpack配置文件，打包指定模块的文件

## 自动化思路
### webpack-dev-server
### browser-sync
```bash
$ browser-sync start --server --files "**/*.css, **/*.html, **/*.js"
```
### 其他自动化

## 组件化思路
```bash
|---- components_name 组件件/模块名
  |---- components_name.js js文件
  |---- components_name.scss 组件强依赖文件 
  |---- components_name.pug 组件模板，也可以html，handlebar什么的
```
每一个组件都在自己的目录进行维护，保持结构清晰；
如果多个模块都引用了同一个模块，打包的时候webpack会把这个模块提取出来，只用一份

## 文档规范


## 其他问题
- css的输出问题；
    - 是否需要分成一个base.css + 增量css，base.css 单独文件形式可利于缓存。
- npm 依赖版本号问题
    - yarn 模块来lock依赖版本号
    - e.g. jquery2.0以下才能兼容在IE8
- 字体文件，logo这些静态资源如何组织？资源文件，充分利用缓存
- lazyload 所有文件打在一个包里之后，有的代码对首屏渲染没有任何帮助，可以lazyload


## 参考文章
[基于webpack搭建前端工程解决方案探索](https://github.com/chemdemo/chemdemo.github.io/issues/10)
[webpack自动雪碧图生成 - 推酷](http://www.tuicool.com/articles/YZfeeu7)
资源集合[前端构建工具 - SegmentFault](https://segmentfault.com/bookmark/1230000007618309)
[Scrat - webapp模块化开发体系](http://scrat.io/#!/index)
[base64图片在各种浏览器的兼容性处理 - 小化·较瘦 - 博客园  ](http://www.cnblogs.com/murphyzhou/p/base64-image-compatible.html)
[fouber/blog: 没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！](https://github.com/fouber/blog)



