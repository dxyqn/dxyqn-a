'use strict'
const port = process.env.port || process.env.npm_config_port || 81 // 端口
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

function resolve(dir) {
	return path.join(__dirname, dir)
}
const externals = {
	'vue': 'Vue',
	'vue-router': 'VueRouter',
	'vuex': 'Vuex',
	'axios': 'axios',
	'element-ui':'ELEMENT',
	// "highlight.js":"highlight.js"
}
const cdn = {
	// 开发环境
	dev: {
		css: [

		],
		js: [

		]
	},
	// 生产环境
	build: {
		css: [
           // "http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css"
		],
		js: [
			"https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js",
			"https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.6/vue-router.min.js",
			"https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js",
			"https://cdn.bootcdn.net/ajax/libs/axios/0.20.0/axios.min.js",
			"https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js",
			// "http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"
		]
	}
}
module.exports = {
	chainWebpack(config) {
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test
		config.plugin('html').tap(args => {
			if (process.env.NODE_ENV === 'production') {
				args[0].cdn = cdn.build
			}
			if (process.env.NODE_ENV === 'development') {
				args[0].cdn = cdn.dev
			}
			return args
		})
		// config.optimization
  //     .minimizer('terser')
  //     .tap(args => {
  //       Object.assign(args[0].terserOptions.compress, { // 生产模式 console.log 去除
  //         // warnings: false , // 默认 false
  //         // drop_console:  ,
  //         // drop_debugger: true, // 默认也是true 
  //         pure_funcs: ['console.log']
  //       })
  //       return args
  //     })
		// config.plugin('webpack-bundle-analyzer')
		//       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
	},
	configureWebpack: config => {
		config.optimization.minimizer[0].options.terserOptions.compress.drop_console = process.env.NODE_ENV ===
			'production'
		// provide the app's title in webpack's name field, so that
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			//externals里的模块不打包
			Object.assign(config, {
				externals: externals
			})
		} else {
			// 为开发环境修改配置...
		}
		/* 压缩文件 */
		// gzip压缩
		const productionGzipExtensions = ['html', 'js', 'css']
		config.plugins.push(
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp(
					'\\.(' + productionGzipExtensions.join('|') + ')$'
				),
				threshold: 10240, // 只有大小大于该值的资源会被处理 10240
				minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
				deleteOriginalAssets: false // 删除原文件
			})
		)
		// 公共代码抽离
		config.optimization = {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'all',
						test: /node_modules/,
						name: 'vendor',
						minChunks: 1,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 100
					},
					common: {
						chunks: 'all',
						test: /[\\/]src[\\/]js[\\/]/,
						name: 'common',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 60
					},
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true
					},
					runtimeChunk: {
						name: 'manifest'
					}
				}
			}
		}
	},

	// configureWebpack: {
	// 	name: "Dlog",
	// 	resolve: {
	// 		alias: {
	// 			'@': resolve('src')
	// 		}
	// 	},
	// 	//注释console
	// 	config: {
	// 		optimization: {
	// 			minimizer: [{
	// 				options: {
	// 					terserOptions: {
	// 						compress: {
	// 							warnings: false,
	// 							drop_console: false,
	// 							drop_debugger: false,
	// 							pure_funcs: ['console.log']
	// 						},
	// 					},
	// 				}
	// 			}],
	// 		},
	// 		}
	// 	},
	// publicPath: "/web/",
	publicPath: "/",
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: 'static',
	// 是否开启eslint保存检测，有效值：ture | false | 'error'
	// lintOnSave: process.env.NODE_ENV === 'development',
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	devServer: {
		host: '0.0.0.0',
		port: port,
		open: true,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			[process.env.VUE_APP_BASE_API]: {
				target: `http://localhost:8130/apis/app/`,
				changeOrigin: true,
				// pathRewrite: {
				//   ['^' + process.env.VUE_APP_BASE_API]: ''
				// }
			}
		},
		disableHostCheck: true
	},
}
