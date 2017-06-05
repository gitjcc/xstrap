## Webpack内参
> 欲练此功，必先...

### base

- entry
- output
- module

### Webpack 无刷新服务器如何实现的？

这里三个方法：
- Webpack-dev-server
- Webpack-dev-middleware + Webpack-hot-middleware + express
- BrowserSync + Webpack(开启watch: true)

### Webpack 如何按需打包(此处说的是只打包指定的插件和文件)

1.webpack.prod.config.js 的 entry 设置多个入口文件
2.webpack.prod.config.js 的 output 设置多个入口文件
3.在src里新建一个特定的js文件，用来require你想打包的插件

### Webpack 的 loader 和 Plugin 有什么区别

- loader 主要用在加载资源文件，专注于转化文件（transform）
- plugin 主要用在拓展Webpack的功能，它直接作用于 webpack

### Webpack 的 config 中的 plugins 是干啥吃的

- extractCSS(对应插件：extract-text-webpack-plugin) 分离css文件
- ProgressPlugin，是Webpack提供的一个打包过程的Plugin，可以接收打包的进度

### Webpack 的 config 中的 externals 是干啥吃的

- externals 这个配置是为了将jQuery声明为全局的变量。声明以后，在模块中使用$和jQuery这两个变量就不用再require了。  
此外，moment也声明了全局变量~

### Webpack.dev.config.js 和 Webpack.prod.config.js 又有啥区别？

**dev**
- 开发服务版本
- 没有实际的文件。都保存在server的内存中。

**prod**
- 生产版本
- 有实际的文件。
  - 最小化过。
  - 去掉注释。
- js和css文件分离。

### 可参考的资源

- [webpack 构建性能优化策略小结](https://segmentfault.com/a/1190000007891318#articleHeader7)
- [webpack2 终极优化](http://imweb.io/topic/5868e1abb3ce6d8e3f9f99bb)


