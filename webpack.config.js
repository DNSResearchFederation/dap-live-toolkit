const path = require('path');
const ROOT = path.resolve(__dirname, 'ts');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'DAPLiveToolkit': 'toolkit.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        "allowTsInNodeModules": true,
                        'configFile': 'tsconfig.json'
                    }

                },
                    'uglify-template-string-loader']
            }
        ]
    },

    output: {
        library: 'DAPLiveToolkit',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'dap-live-toolkit.js',
        path: DESTINATION
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    mode: "production"
};

