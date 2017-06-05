const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const exec = require('child_process').exec();

// multiple extract instances
var extractCSS = new ExtractTextPlugin('[name].css');
var extractLESS = new ExtractTextPlugin('[name].less');

module.exports = {
	watch: true,
	entry: {
		xstarp: path.resolve(__dirname, '../src/xstarp.js'),
    demo: path.resolve(__dirname, '../src/xstarp.js')
	},
	output: {
		path: path.resolve(__dirname,'../dist'),
		publicPath: path.resolve(__dirname,'../dist/'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css','sass'])
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract(['css'])
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=40000'
			}
		]
	},
	devtool: 'eval-source-map',
	externals: {
		jquery: 'window.$', // 暴露全局jQuery变量
		$: 'window.$', // 暴露全局jQuery变量
		moment: 'window.moment'
	},

	plugins: [
		extractCSS,
		extractLESS,
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			if (percentage==0) {
				console.log('开始编译');
			}

			if (percentage==1) {
				console.log('结束编译');
			}
		})
	]
};

function copyDistToDocs() {
	// windows 复制文件夹命令 xcopy . - bobWu 的 学习日记 - 博客频道 - CSDN.NET  http://blog.csdn.net/bobwu/article/details/6605248
	var copyCmd = 'xcopy ';
	exec();
}
