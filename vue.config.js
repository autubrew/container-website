const path = require('path');

const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        // 移除 prefetch 插件，减少首屏加载负担
        config.plugins.delete('prefetch');
        // i18n 国际化
        config.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
                .loader('@kazupon/vue-i18n-loader')
                .end()
            .use('yaml')
                .loader('yaml-loader')
                .end();
        // 配置 svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
        // 打包分析插件
        if (env === 'production') {
            config.plugin('webpack-bundle-analyzer')
                .use(new BundleAnalyzerPlugin({
                    openAnalyzer: true
                }))
        }
    },
    configureWebpack: () => {
        // gzip压缩优化，服务端需配合开启
        if (env === 'production') {
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
                prependData: `@import "@/styles/variables.scss";`
            }
        }
    },
    productionSourceMap: false,
};
