const path = require('path');

module.exports = {
    mode: 'development', // or 'production' for production builds
    entry: {
        main: './public/main.ts', // Entry point of the main application
        editor: './public/editor.ts', // Entry point of the default editor page
        visualgo: './public/visualgo.ts', // Entry point of the visualgo graph editor
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
