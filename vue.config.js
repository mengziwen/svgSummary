const path = require('path');
module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://192.168.6.211/',
        changeOrigin: false,
        pathRewrite: {
          '^/api/': ''
        }
      },
      '/api2/': {
        target: 'http://192.168.6.211:8019/',
        changeOrigin: false,
        pathRewrite: {
          '^/ap2/': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/index.less')
      ]
		},
		electronBuilder: {
      builderOptions: {
        win: {
          icon: './public/icon/logo.ico',
        },
        mac: {
          icon: './public/icon/logo.icns',
        },
      },
    },
  }
}
