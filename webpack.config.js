const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = env => ({
        entry: {
                'index': path.resolve(__dirname, 'src', 'js', 'script.js'),
        },
        output: {
                path: path.resolve(__dirname, 'docs'),
                filename: 'js/login.js',
                publicPath: eval(env.production) ? '/bejelentkezes' : '/',
        },
        resolve: {
                extensions: ['.js', '.scss', '.css'],
                modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules'), path.resolve(__dirname)],
        },
        module: {
                rules: [{
                        exclude: /node_modules/,
                        test: /\.js$/,
                        use: {
                                loader: 'babel-loader',
                                options: {
                                        'presets': [
                                                [
                                                        '@babel/preset-env',
                                                        {
                                                                'useBuiltIns': 'usage',
                                                                'targets': '> 0.25%, not dead'
                                                        }
                                                ]
                                        ],
                                        // Más plugin kell, ha production
                                        // https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html
                                        'plugins': ['@babel/plugin-transform-runtime']
                                },
                        },
                }, {
                        exclude: /node_modules/,
                        test: /\.s?css$/,
                        use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                {
                                        loader: 'postcss-loader',
                                        options: {
                                                ident: 'postcss-scss',
                                                plugins: () => [
                                                        postcssPresetEnv()
                                                ]
                                        },
                                },
                                'sass-loader',
                        ],
                }, {
                        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                        use: [{
                                loader: 'file-loader',
                                options: {
                                        name: '[name].[ext]',
                                        outputPath: 'fonts/'
                                }
                        }]
                },
                {
                        test: /\.(gif|png|jpe?g|svg)$/i,
                        use: [{
                                loader: 'file-loader',
                                options: {
                                        name: '[name].[ext]',
                                        outputPath: 'images/',
                                        publicPath: url => eval(env.production) ? `/bejelentkezes/images/${url}` : `../images/${url}`,
                                }
                        },
                        {
                                loader: 'image-webpack-loader',
                                options: {
                                        disable: true,
                                },
                        },
                        ],
                }
                ],
        },
        plugins: [
                new HtmlWebpackPlugin({
                        title: 'Aloha Informatika Kft.',
                        template: 'src/index.html'
                }),
                new MiniCssExtractPlugin({
                        filename: 'css/custom.css',
                }),
        ],
        mode: eval(env.production) ? 'production' : 'development',
        watch: !eval(env.production),
});
module.exports = config;
