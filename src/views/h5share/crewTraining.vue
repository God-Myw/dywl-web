<template>
	<div class="crewTraining">
		<div class="header"></div>
		<div class="content" v-for="item in crewList" :key="item.guid">
			<h1>{{ item.title }}</h1>
			<img src="@/assets/h5share/分割线.png" alt="" />
			<Editor
				style="height: 100%; overflow-y: auto; padding-left: 10px"
				v-model="item.content"
				:defaultConfig="editorConfig"
				mode="default"
				min-height="500px"
				@onCreated="editorCreated"
			/>
		</div>
		<div class="foot" @click="app">APP内报名</div>
	</div>
</template>
<script>
	import { Editor } from "@wangeditor/editor-for-vue";
	import { webGetWXDetail, getCultivateList } from "@/api/h5share";
	import CallApp from "callapp-lib";
	export default {
		data() {
			return {
				editor: null,
				title: "",
				crewList: [],
				html: "",
				editorConfig: {
					readOnly: true,
				},
			};
		},
		mounted() {
			let params = { currentPage: 1, pageSize: 999 };
			getCultivateList(params).then((res) => {
				if (res.code == "0000") {
					this.crewList = res.data.records;
				}
			});
			this.getweChatPay();
		},
		methods: {
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
			app() {
				const options = {
					scheme: {
						// 用来配置 URL Scheme 所必须的那些字段
						protocol: "tencent1110877537://", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
					},
					intent: {
						package: "com.luhaisco.dywl",
						scheme: "tencent1110877537://",
					},
					appstore: "https://apps.apple.com/cn/app/id1493154544", // appstore的下载地址
					yingyongbao: "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 应用宝的下载地址
					fallback: "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 唤端失败后跳转的地址
				};
				new CallApp(options).open({ path: "" });
			},
			async getweChatPay() {
				webGetWXDetail({
					url: window.location.href.split("#")[0],
				}).then((res) => {
					if (res.code == "0000") {
						//通过config接口注入权限验证配置
						// afa(res).then((res) => console.log(res));
						wx.config({
							debug: false,
							appId: "wx3c5d7c6f964f3094",
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.sign,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "chooseWXPay"],
							openTagList: ["wx-open-launch-app"],
						});
						// eslint-disable-next-line no-undef
						wx.ready(function () {
							var s_title = "船员培训正在火热报名中", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/crewTraining", // 分享链接
								s_desc =
									"环游世界的同时，享受大海的浩瀚， 同时又拥有一份报酬高、包吃住、有年假的稳定工作。", //分享描述
								s_imgUrl = "http://39.105.35.83:10443/images/financial/1681370808216.png"; // 分享图标
							// eslint-disable-next-line no-undef
							wx.updateAppMessageShareData({
								title: s_title, // 分享标题
								desc: s_desc, // 分享描述
								link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: s_imgUrl, // 分享图标
								success: function () {},
							});
							wx.updateTimelineShareData({
								title: s_desc, // 分享标题
								// desc: s_desc, // 分享描述
								link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: s_imgUrl, // 分享图标
								success: function () {
									// 设置成功
								},
							});
						});
					}
				});
			},
		},
		beforeDestroy() {
			const editor = this.editor;
			if (editor == null) return;
			editor.destroy(); // 组件销毁时，及时销毁编辑器
		},
		components: { Editor },
	};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
	.crewTraining {
		.header {
			background: url("../../assets/h5share/船员培训.png");
			background-size: 100%;
			height: 270px;
			img {
				width: 100%;
			}
		}
		.content {
			padding-top: 10px;
			margin: -20px auto;
			background-color: #ffffff;
			width: 95%;
			border-radius: 10px;
			margin-bottom: 30px;
			// border-top-right-radius: 10px;
			// height: 100%;
			img {
				width: 100%;
			}
			h1 {
				margin-left: 20px;
				font-size: 17px;
				font-family: Alimama ShuHeiTi-Bold, Alimama ShuHeiTi;
				font-weight: bold;
				color: #333333;
			}
		}
		.foot {
			text-align: center;
			line-height: 44px;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			font-size: 18px;
			font-family: 苹方-简-中粗体, 苹方-简;
			font-weight: normal;
			color: #333333;
			width: 168px;
			height: 44px;
			background: #70dcff;
			border-radius: 22px;
		}
	}
</style>
