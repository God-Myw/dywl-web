module.exports = {
	lintOnSave: false,

	devServer: {
		port: 9527,
		open: true,
		proxy: {
			//   '/api': {
			//     target: 'http://192.168.10.134:8086', //API服务器的地址
			//     changeOrigin: true, //是否跨域
			//     pathRewrite: {
			//       '^/api': ''
			//     }
			//   }
			"/baiduApi": {
				target: "https://aip.baidubce.com", //API服务器的地址
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					"^/baiduApi": "",
				},
			},
		},
	},
	productionSourceMap: false,
};
