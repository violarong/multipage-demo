/**
 * Webpack打包配置
 * @author  capasky(hzyangzhouzhi@corp.netease.com)
 */

const webpack = require('webpack');

//注意，由于使用 gulp 进行webpack打包任务，配置中并未提供 entry 参数
module.exports = {
    debug: true, //开启调试模式
    devtool: 'eval', //在开发阶段使用 eval 模式提供sourcemap功能
    output: {
        pathinfo: true,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                cacheDirectory: false,
                presets: ['es2015']
            }
        }, {
                test: /\.html$/,
                loader: 'html-loader?attrs=false'//模板文件使用 html-loader 处理成字符串
            }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"core", /* filename= */"core.js"
        )
    ]
};
