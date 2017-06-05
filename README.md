# xstrap
xstrap webpack 模块化版本

## 安装
```bash
$ npm install 
$ npm i webpack -g
$ npm i docsify-cli -g

// 如果node-sass没有安装成功则运行下面这个命令
$ cnpm install --save-dev node-sass
```

## 使用
tip: 这些命令都是写在package.json里面的。

- **开发**
```bash
$ npm run dev
```
> 项目根目录为开发服务器根目录。可静态访问所有资源。默认打开examples文件夹下面的index.html

- **构建**

输出生产环境文件到dist文件夹
```bash
$ npm run build
```

- **写文档**

在dosc里面写相应组件的markdown文件，文件名为<code>[你的模块名].md</code>

- **查看文档**
```bash
$ npm run docs
```
线上访问：http://localhost:6000/modeleName （你的模块名，不要加md后缀） [端口号暂定6000，运行命令后控制台将显示]；这个地址对应的实际上访问的是：modeleName.md这个文件

### 目录结构 
```bash
|---- root
  |---- build webpack配置文件构建相关
  |---- dist 是编译后的文件，压缩版
      |---- vendor 第三方大包，直接放在这里，不参与打包
  |---- docs 存放使用文档
    |---- dist
    |---- doc 组件文档都放在这里
    |---- vendor docsify这个包自带的一些引用文件
    |---- index.html docsify这个包入口页面
    |---- README.md docsify这个包默认的首页
  |---- src 源文件
    |---- common 公用js文件
      |---- js 通用js文件
      |---- styles 样式
        |---- common 公用的部分
        |---- mixins 公用的scss
        |---- themes UI 主题
        |---- index.scss 样式入口文件，负责将所有styles里面的样式都打包到这里面
    |---- components 组件
    |---- util 工具js
    |---- vendor 有些东西不得不放在外面，没有这样的文件的时候这个文件夹是空的
    |---- develop.js 开发用的出口，对应webpack.dev.config.js中的entry
    |---- xstarp.js 构建用的出口，对应webpack.prod.config.js中的entry
  |---- test 测试文件、代码测试、测试数据目录
    |---- common 
  |---- server.js 开发服务器入口文件
```
- dist是编译后的文件，压缩版； 
- src是源码文件；
- 压缩源（src）文件，生成压缩包到（dest），dest一般和src配对出现。


## 组件化结构
```bash
|---- components_name 组件件/模块名
	|---- images 如果有，则建这个文件夹。文件夹名字无所谓。本组件需要的放在这里。
  |---- components_name.js js文件
  |---- components_name.scss 组件强依赖文件 
  |---- components_name.pug 组件模板，也可以html，handlebar什么的
  |---- index.js 组件入口，供出口文件调用。统一index.js名，容易调用
```


- 如何

## 功能点
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

#### src目录详细

### 构建工具
- 使用webpack 对代码进行编译构建、模块打包
- 开发环境（dev），生成环境（prod）分别打包
- 特殊需求单独打包，写一个数组，把用到的插件、组件、模块名放进去，webpack构建一下就可以生成所需要的bundle
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
- CMD规范 目前
- ES6 规范，将来；with babel

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
### webpack-dev-middleware && webpack-hot-middleware
为了以后可以支持定制，采用这种方式，而且可以减少开启的服务器数量。

### 其他自动化


- 每一个组件都在自己的目录进行维护，保持结构清晰；
- 如果多个模块都引用了同一个模块，打包的时候webpack会把这个模块提取出来，只用一份；
[地址](http://www.zcfy.cc/article/getting-started-with-webpack-2-thinking-in-code-2110.html)

## 文档规范
[docsify](https://docsify.js.org/)


## 其他问题
- css的输出问题；
    - 是否需要分成一个base.css + 增量css，base.css 单独文件形式可利于缓存。
- npm 依赖版本号问题
    - yarn 模块来lock依赖版本号
    - e.g. jquery2.0以下才能兼容在IE8
- 字体文件，logo这些静态资源如何组织？资源文件，充分利用缓存
- lazyload 所有文件打在一个包里之后，有的代码对首屏渲染没有任何帮助，可以lazyload
- markrun 会产生一个标题id，示例代码里面不要设一样的id，否则会错乱
- 减少冗余代码

## 参考文章
- [基于webpack搭建前端工程解决方案探索](https://github.com/chemdemo/chemdemo.github.io/issues/10)
- [webpack自动雪碧图生成 - 推酷](http://www.tuicool.com/articles/YZfeeu7)
- 资源集合[前端构建工具 - SegmentFault](https://segmentfault.com/bookmark/1230000007618309)
- [Scrat - webapp模块化开发体系](http://scrat.io/#!/index)
- [base64图片在各种浏览器的兼容性处理 - 小化·较瘦 - 博客园  ](http://www.cnblogs.com/murphyzhou/p/base64-image-compatible.html)
- [fouber/blog: 没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！](https://github.com/fouber/blog)
- [webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？ - 实用至上 SegmentFault  ](https://segmentfault.com/a/1190000006887523#articleHeader8)
- [webpack进阶教程（二）——webpack引入jquery多种方法探究](https://segmentfault.com/a/1190000007249293)
- [webpack在多页面中路径输出问题 - SegmentFault](https://segmentfault.com/q/1010000002607794)
- [webpack使用优化 | Web前端 腾讯AlloyTeam Blog | 愿景: 成为地球卓越的Web团队！](http://www.alloyteam.com/2016/01/webpack-use-optimization/)

## 用到的东西
- [webpack css 输出独立文件-插件](https://github.com/webpack/extract-text-webpack-plugin)
- [Webpack-前端资源模块化加载打包工具 - IT笔录](https://itbilu.com/nodejs/npm/Vy6BnJkY-.html)


