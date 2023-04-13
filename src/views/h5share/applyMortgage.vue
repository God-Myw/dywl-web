<template>
	<div>
		<div class="menu">
			<img v-if="isShare == 'true'" src="@/assets/h5share/抵押外部.jpg" alt="" />
			<img v-else src="@/assets/h5share/抵押内部.jpg" alt="" />
			<div v-if="isShare == 'true'" class="box"></div>
		</div>
		<div v-if="isShare == 'true'" class="relation">
			<div class="phone" @click="phone">
				<div></div>
				<div>拨打400热线</div>
			</div>
			<div class="intention" @click="app">App内申请</div>
		</div>
	</div>
</template>
<script>
	import CallApp from "callapp-lib";
	import { webGetWXDetail } from "../../api/h5share";
	export default {
		data() {
			return {
				isShare: false,
			};
		},
		mounted() {
			this.isShare =
				new URLSearchParams(window.location.href.split("?")[1]).get("isShare") || false;
			this.getweChatPay();
		},
		methods: {
			phone() {
				window.location.href = "tel:400-9009-618";
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
							var s_title = "在航船融资抵押服务", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/applyFinanc", // 分享链接
								s_desc =
									"为服务于国内船舶物流企业，道裕联合第三方金融公司为船东人提供购买/建造船舶融资租赁服务。", //分享描述
								s_imgUrl = "http://39.105.35.83:10443/images/spart/1679656260837.png"; // 分享图标
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
	};
</script>
<style lang="scss" scoped>
	.menu {
		display: flex;
		flex-direction: column;
		img {
			width: 100%;
			margin: 0px;
			padding: 0px;
		}
		.box {
			height: 50px;
			width: 100%;
		}
	}
	.relation {
		position: fixed;
		width: 100%;
		background: #fff;
		bottom: 0;
		left: 0;
		display: flex;
		box-sizing: border-box;
		padding: 10px 10px 40px 16px;
		align-items: center;
		justify-content: space-between;
		.phone {
			display: flex;
			flex-direction: column;
			align-items: center;
			div:nth-child(1) {
				background: url("../../assets/container/组 10346@2x.png") no-repeat;
				background-size: 24px 24px;
				width: 24px;
				height: 24px;
			}
			div:nth-child(2) {
				height: 14px;
				line-height: 14px;
				font-size: 10px;
				font-family: "tyzt-zht", Arial;
				color: #333333;
			}
		}
		.intention {
			line-height: 22px;
			font-size: 16px;
			padding: 9px 95px;
			color: #ffffff;
			background: linear-gradient(270deg, #0762f5 0%, #219cff 100%);
			border-radius: 6px;
		}
	}
</style>
