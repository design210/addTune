const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin"); //코드압축
const PrerenderSpaPlugin = require("prerender-spa-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //변수명 단순화
const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, "dist"),
    routes: ["/service/addtune", "/ad/adMain", "/report", "/main"],
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: "#app",
      headless: true,
    }),
  }),
];
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
                       @import "@/styles/mixin.scss";
                       @import "@/styles/common.scss";
                       @import "@/styles/reset.scss";
                   `,
      },
    },
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.plugin("html").tap(args => {
        args[0].template = "public/index_dev.html";
        return args;
      });
    }
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");

    config.optimization.minimizer([
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            //warnings: false, //      ，
            drop_debugger: true, //   debugger
            drop_console: true, //  console
            pure_funcs: ["console.log"],
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ]);
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(...productionPlugins);
    }
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, //                 10240
        minRatio: 0.8, //
        deleteOriginalAssets: false, //
      }),
    );
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1, //모듈이 분할 전에 청크간에 공유되어야 하는 최소 시간
            maxInitialRequests: 5, //엔트리 포인트의 최대 병렬 요청 수
            priority: 100,
            minSize: 700000,
            maxSize: 800000,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            priority: 60,
            minSize: 700000,
            maxSize: 800000,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest",
            minSize: 700000,
            maxSize: 800000,
          },
        },
      },
    };
  },
};
