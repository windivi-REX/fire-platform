const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const zopfli = require("@gfx/zopfli");
// const BrotliPlugin = require("brotli-webpack-plugin");
// const AliOssPlugin = require('webpack-oss')

const path = require('path');
// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')

const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// 添加stylus规则
// const addStylusResource = rule => {
// rule
// .use('style-resouce')
// .loader('style-resources-loader')
// .options({
// patterns: [resolve('src/assets/stylus/variable.styl')]
// })
// }

module.exports = {
  publicPath: './',
  // outputDir:"dist",
  assetsDir: 'static',
  // indexPath:"index.html",
  filenameHashing: true,
  // pages:undefined,
  lintOnSave: false,
  runtimeCompiler: true,
  // transpileDependencies: [],
  productionSourceMap: false,
  // crossorigin: undefined,
  // integrity: false,
  configureWebpack: config => {
    // cdn引用时配置externals
    // config.externals = {
    // 'vue': 'Vue',
    // 'element-ui': 'ELEMENT',
    // 'vue-router': 'VueRouter',
    // 'vuex': 'Vuex',
    // 'axios': 'axios'
    // }
    if (IS_PROD) {
      const plugins = [];

      // 去除多余css
      // plugins.push(
      // new PurgecssPlugin({
      // paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
      // extractors: [
      // {
      // extractor: class Extractor {
      // static extract(content) {
      // const validSection = content.replace(
      // /<style([\s\S]*?)<\/style>+/gim,
      // ""
      // );
      // return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
      // }
      // },
      // extensions: ['html', 'vue']
      // }
      // ],
      // whitelist: ["html", "body"],
      // whitelistPatterns: [/el-.*/],
      // whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
      // })
      // );

      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
          sourceMap: false,
          parallel: true,
        }),
      );
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );

      // 上传文件到oss
      // if (process.env.ACCESS_KEY_ID || process.env.ACCESS_KEY_SECRET || process.env.REGION || process.env.BUCKET || process.env.PREFIX) {
      // plugins.push(
      // new AliOssPlugin({
      // accessKeyId: process.env.ACCESS_KEY_ID,
      // accessKeySecret: process.env.ACCESS_KEY_SECRET,
      // region: process.env.REGION,
      // bucket: process.env.BUCKET,
      // prefix: process.env.PREFIX,
      // exclude: /.*\.html$/,
      // deleteAll: false
      // })
      // );
      // }

      // Zopfli压缩，需要响应VC库 https://webpack.js.org/plugins/compression-webpack-plugin/
      // plugins.push(
      // new CompressionWebpackPlugin({
      // algorithm(input, compressionOptions, callback) {
      // return zopfli.gzip(input, compressionOptions, callback);
      // },
      // compressionOptions: {
      // numiterations: 15
      // },
      // minRatio: 0.99,
      // test: productionGzipExtensions
      // })
      // );
      // plugins.push(
      // new BrotliPlugin({
      // test: productionGzipExtensions,
      // minRatio: 0.99
      // })
      // );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 修复Lazy loading routes Error： Cyclic dependency [https://github.com/vuejs/vue-cli/issues/1669]
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
    }
    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'));
    // 压缩图片
    // config.module
    // .rule("images")
    // .use("image-webpack-loader")
    // .loader("image-webpack-loader")
    // .options({
    // mozjpeg: { progressive: true, quality: 65 },
    // optipng: { enabled: false },
    // pngquant: { quality: "65-90", speed: 4 },
    // gifsicle: { interlaced: false },
    // webp: { quality: 75 }
    // });

    // stylus
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type =>
    // addStylusResource(config.module.rule('stylus').oneOf(type))
    // )

    // 多页面配置，为js添加hash
    // config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

    // 修改图片输出路径
    // config.module
    // .rule('images')
    // .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
    // .use('url-loader')
    // .loader('url-loader')
    // .options({
    // name: path.join('../assets/', 'img/[name].[ext]')
    // })
  },
  css: {
    modules: false,
    extract: IS_PROD,
    // 为css后缀添加hash
    // extract: {
    // filename: 'css/[name].[hash:8].css',
    // chunkFilename: 'css/[name].[hash:8].css'
    // }，
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        // data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
        // data: `$src: "${process.env.VUE_APP_SRC}";`
      },
      // px转换为rem
      // postcss: {
      // plugins: [
      // require('postcss-pxtorem')({
      // rootValue : 1, // 换算的基数
      // selectorBlackList : ['weui', 'el'], // 忽略转换正则匹配项
      // propList : ['*']
      // })
      // ]
      // }
    },
  },
  pluginOptions: {
    // 安装vue-cli-plugin-style-resources-loader插件
    // 添加全局样式global.scss
    // "style-resources-loader": {
    // preProcessor: "scss",
    // patterns: [
    // resolve(__dirname, "./src/scss/scss/variables.scss")
    // ]
    // }
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/proxy': {
        target: `${process.env.VUE_APP_API}`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '',
        },
      },
    },
    before: app => {},
  },
};
