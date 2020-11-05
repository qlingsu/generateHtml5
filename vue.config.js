var appConfig = require("./public/appConfig")
var styleVariables = appConfig.style;

module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        port: appConfig.port
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.scss$/,
                use: [{
                    loader: 'sass-loader',
                    options: {
                        additionalData: Object.keys(styleVariables)
                            .map(k => `\$${k}: ${styleVariables[k]};`)
                            .join('\n')
                    }
                }]
            }]
        }
    },
}