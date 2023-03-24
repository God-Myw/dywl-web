<template>
	<div class="portservice" :class="{ intervoyageinland: clientSide }">
		<div :class="isShare ? 'isShare_bg' : 'service_bg'">
			<div @click="goapplyFinanc">
				<img src="../../assets/h5share/融资租赁.png" alt="" />
			</div>
			<div @click="gosea">
				<img src="../../assets/container/蒙版组 355@2x.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Field } from "vant";
	Vue.use(Field);
	import { webGetWXDetail } from "../../api/h5share";
	export default {
		data() {
			return {
				clientSide: false,
				dataList: [],
				teleDig: false,
				show: false,
				isShare: false,
			};
		},
		mounted() {
			this.isShare =
				new URLSearchParams(window.location.href.split("?")[1]).get(
					"isShare",
				) || false;
			this.getweChatPay();
		},
		created() {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				// console.log('这是移动')
				this.clientSide = false;
			} else {
				this.clientSide = true;
			}
		},
		methods: {
			btndis() {
				this.show = false;
			},
			// gobank() {
			// 	window.location.href = "https://www.dylnet.cn/h5share/bank";
			// },
			goapplyFinanc() {
				window.location.href = "https://www.dylnet.cn/h5share/applyFinanc";
			},
			gosea() {
				window.location.href = "https://www.dylnet.cn/h5share/hypothecate";
			},
			async getweChatPay() {
				webGetWXDetail({
					url: window.location.href.split("#")[0],
				}).then((res) => {
					if (res.code == "0000") {
						//通过config接口注入权限验证配置
						// eslint-disable-next-line no-undef
						wx.config({
							debug: false,
							appId: "wx3c5d7c6f964f3094",
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.sign,
							jsApiList: [
								"updateAppMessageShareData",
								"updateTimelineShareData",
							],
							openTagList: ["wx-open-launch-app"],
						});
						// eslint-disable-next-line no-undef
						wx.ready(function () {
							var s_title = "道裕物流联合各金融机构抗疫助企", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/assistance", // 分享链接
								s_desc = "道裕物流联合各金融机构抗疫助力全国和上海各物流企业", //分享描述
								s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 362.png"; // 分享图标
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
	};
</script>

<style lang="scss" scoped>
	.tyzt-zht {
		font-family: "tyzt-zht", Arial;
	}
	/deep/.van-dialog {
		border-radius: 5px;
	}
	.portservice {
		background: #e6f3ff;
		.service_bg {
			background: url("../../assets/h5share/noShare.png") no-repeat;
			background-size: 100% 367px;
			width: 100%;
			height: 367px;
			padding: 267px 0 0 0;
			div {
				height: 216px;
				margin-top: -10px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
		.isShare_bg {
			background: url("../../assets/h5share/isShare.png") no-repeat;
			background-size: 100% 367px;
			width: 100%;
			height: 367px;
			padding: 267px 0 0 0;
			div {
				height: 216px;
				margin-top: -10px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}

	.intervoyageinland {
		width: 375px;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
