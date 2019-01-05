var path = require('path');

const FRONTEND_ROOT = path.resolve(__dirname, '../../');

var stats = {
    warningsFilter: /System.import/
};

// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    mode: 'development',
    
    output: {
        filename: '[name]-[hash:6].js',
        sourceMapFilename: '[name]-[hash:6].map',
        chunkFilename: '[id]-[hash:6].chunk.js'
    },
    
    resolve: {
        modules: [
            path.join(FRONTEND_ROOT, 'node_modules'),
            path.join(FRONTEND_ROOT, 'src'),
            path.join(FRONTEND_ROOT, 'public/assets')
        ],
        extensions: ['.ts', '.js']
    },
    
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        module: false,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    },
    
    stats,
    devServer: {
        stats
    }
};
module.exports = defaultConfig;
