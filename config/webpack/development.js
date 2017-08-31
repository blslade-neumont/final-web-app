let { ContextReplacementPlugin, DefinePlugin } = require('webpack');
let path = require('path');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./common');
let clientConfig = require('./client-config');
let HTMLWebpackPlugin = require('html-webpack-plugin');

const FRONTEND_ROOT = path.resolve(__dirname, '../../');

//Loaders
let $style = {
    loader: 'style-loader'
};
let $toString = {
    loader: 'to-string-loader'
};
let $raw = {
    loader: 'raw-loader'
};
let $trim = {
    loader: 'trim-loader'
};
let $pug = {
    loader: 'pug-loader'
};
let $css = {
    loader: 'css-loader'
};
let $sass = {
    loader: 'sass-loader',
    options: {
        includePaths: [
            path.resolve(FRONTEND_ROOT, 'public/assets/styles'),
            path.resolve(FRONTEND_ROOT, 'src/styles')
        ]
    }
};
let $awesomeTypescript = {
    loader: 'awesome-typescript-loader'
};
let $angular2Template = {
    loader: 'angular2-template-loader'
};
let $angularRouter = {
    loader: 'angular-router-loader',
    options: {
        debug: false
    }
};

let devConfig = {
    entry: {
        'main':   './src/main.browser.ts',
        'import': './src/styles/styles.scss'
    },
    
    output: {
        path: path.resolve(__dirname, '../../www')
    },
    
    plugins: [
        new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(FRONTEND_ROOT, 'src')),
        new DefinePlugin(clientConfig),
        new HTMLWebpackPlugin({
            title: 'Vector Editor',
            filename: 'index.html',
            template: path.resolve(FRONTEND_ROOT, 'src/index.html.pug'),
            inject: false
        })
    ],
    
    module: {
        loaders: [
            { test: /\.ts$/, loaders: [$awesomeTypescript, $angular2Template, $angularRouter], exclude: /\.spec\.ts$/ },
            { test: /\.css$/, loaders: [$toString, $css] },
            { test: /\.md$/, loaders: [$raw] },
            { test: /\.html$/, loaders: [$trim] },
            { test: /\.pug$/, loaders: [$pug] },
            { test: /\.scss$/, loaders: [$style, $trim, $sass], exclude: /src\/(app|modules|shared)\/./ },
            { test: /src\/(app|modules|shared)\/.+\.scss$/, loaders: [$toString, $trim, $sass] }
        ]
    },
    
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};

module.exports = webpackMerge(commonConfig, devConfig);
