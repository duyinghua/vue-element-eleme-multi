var path = require('path')
var ROOT = path.resolve(__dirname)
var glob = require('glob');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

var entries = getEntry('src/**/*.js', 'src');
var chunks = Object.keys(entries);

var config = {
    entry: entries,
    output: {
        publicPath: "/cdn/",
        path: path.join(__dirname, 'dist'),
        filename: '[name].js?[hash]'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            /*{
             test: /\.html$/,
             loader: 'html-loader'
             },*/
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackHarddiskPlugin(),
        /* new HtmlWebpackPlugin({
         title: 'index',
         alwaysWriteToDisk: true,
         filename: ROOT + '/index.html',
         template: ROOT + '/tpl/index.html'
         }),*/
        new webpack.ProvidePlugin({
            $: 'Zepto'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        })
    ],
    externals: {
        Zepto: 'window.Zepto'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};
var pages = Object.keys(getEntry('tpl/**/*.html', 'tpl'));
var head = `<title> title</title>
<meta name="Keywords" content="CRM">
<meta name="Description" content="CRM">
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-store,no-cache">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
<meta name="format-detection" content="telephone=no"/>
<script type="text/javascript" src="http://pub.quanminxingtan.com/web/weixin/js/lib/zepto.min_e388b4e.js"></script>`;
pages.forEach(function (pathname) {
    console.log('==================', pathname)
    config.plugins.push(new HtmlWebpackPlugin({
        head: head,
        alwaysWriteToDisk: true,
        filename: path.join(ROOT, pathname + '.html'), //生成的html存放路径，相对于path
        template: path.join(ROOT, 'tpl', pathname + '.html')  //html模板路径
    }));
});
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = './' + entry;
    }
    return entries;
}


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports = config;