const path = require('path');

module.exports = {
    mode: 'development', // or 'production' for production builds
    entry: {
        main: './public/main.ts', // Entry point of your main application
        editor: './public/editor.ts', // Entry point of your editor page
    },
    devtool: 'inline-source-map', // Source maps support
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js', // Output bundle files
        path: path.resolve(__dirname, 'public'), // Output directory
    },
};
