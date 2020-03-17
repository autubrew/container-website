const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
                .loader("@kazupon/vue-i18n-loader")
                .end()
            .use('yaml')
                .loader('yaml-loader')
                .end();
        config.plugin('webpack-bundle-analyzer')
            .use(new BundleAnalyzerPlugin({
                openAnalyzer: true
            }))
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png|\.svg|\.ttf/, // 压缩的文件类型
                        threshold: 1024, // 阈值，超过大小就压缩，单位：B
                        deleteOriginalAssets: false // 是否删除原文件
                    })
                ]
            }
        }
    },
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/variables.scss";`
            }
        }
    },
    productionSourceMap: false,
};