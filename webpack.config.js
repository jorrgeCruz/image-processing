const path = require("path");

module.exports = {
    entry: "./dist/src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js"]
    }
}
