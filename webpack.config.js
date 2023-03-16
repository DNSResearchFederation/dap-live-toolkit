const path = require('path');
const ROOT = path.resolve(__dirname, 'ts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'DAPLiveToolkit': 'toolkit.ts'
    },
    plugins: [new MiniCssExtractPlugin()],

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
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: ["/node_modules/"],
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },

    output: {
        library: '[name]',
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

