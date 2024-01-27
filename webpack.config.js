const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
        //This property defines where the application starts
        entry:'./allFiles/main.js',

        //This property defines the file path and the file name which will be used for deploying the bundled file
        output:{
                path: path.resolve(__dirname, 'output'),
                publicPath: '',
                filename: 'main.js'
        },

        //Setup loaders
        module: {
                rules: [
                        {
                                test: /\.js$/, 
                                exclude: /node_modules/,
                                use: {
                                        loader: 'babel-loader'
                                }
                        },
                        {
                                test: /\.css$/i,
                                exclude: /node_modules/,
                                use: ['style-loader', 'css-loader'],
                        },
                        {
                                test: /\.(png|jp(e*)g|svg|gif)$/,
                                exclude: /node_modules/,
                                use: 'file-loader',
                        },
                ]
        },

        // Setup plugin to use a HTML file for serving bundled js files
        plugins: [
                new HtmlWebpackPlugin({
                        template: './allFiles/index.html',
                        publicPath: '/',
                })
        ]
}
