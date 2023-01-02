const path = require("path");

module.exports = {

    mode: "production",

    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        libraryTarget: "umd",
        globalObject: "this",
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },

    target: "web",

    devServer: {
        static: path.join(__dirname, "."),
        compress: true,
        port: 3000,
    }
};
