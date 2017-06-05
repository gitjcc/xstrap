// 引用webpack.prod.config的配置。
// webpack.prod.config导出的其实就是一个配置对象。
var config = require('./webpack.prod.config');
var path = require('path');
// 使用opn这个库来在浏览器打开url：http://localhost:9100
var opn = require('opn');
// 使用copy-dir这个库来复制dist目录
var copyDir = require('copy-dir');
// 从from目录复制到to目录，from对应根目录下的dist，to对应docs下的dist，两个dist的文件一样
var from = path.resolve(__dirname, '../dist');
var to   = path.resolve(__dirname, '../docs/dist');

config.watch = true;
config.output.path = path.resolve(__dirname,'../dist');
config.output.publicPath = path.resolve(__dirname,'../dist/');

copyDir(from, to, function (err, res){
  if(err) console.log(err);
});

opn('http://localhost:9100');

// config其实是我们docs修改过后的webpack config文件。
// 其实webpack.config.js 导出的就是一个对象。用这个对象很容易进行修改，就像上面这样。
module.exports = config;
