const path = require('path');

module.exports = {
    entry: './src/index.ts', // Entry point for TypeScript
    output: {
        filename: 'bundle.js', // Output filename for the bundled JavaScript
        path: path.resolve(__dirname, 'public'), // Output directory
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve both .ts and .js files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Use ts-loader for .ts files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"], // Ensure PostCSS processes Tailwind
            },
        ],
    },
    devtool: 'source-map', // Optional: for debugging
};
