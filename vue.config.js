module.exports = {
	lintOnSave: false,

	devServer: {
		port: 9527,
		open: true,
		proxy: {
			"/api": {
				target: "http://39.105.35.83:10443/api", //API服务器的地址
				changeOrigin: true, //是否跨域
				pathRewrite: {
					"^/api": "",
				},
			},
			"/baiduApi": {
				target: "https://aip.baidubce.com",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					"^/baiduApi": "",
				},
			},
		},
	},
	productionSourceMap: false,
};
