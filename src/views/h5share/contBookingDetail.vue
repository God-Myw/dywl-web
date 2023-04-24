<template>
	<div class="contBookingDetail" @click="openApp">
		<div class="search">
			<div class="search-o">
				<div>请选择</div>
				<div>请选择</div>
			</div>
			<div class="search-t">
				<div>起始港</div>
				<div class="cc-nav-t-c">
					<div class="cc-nav-c-r tyzt-zht">
						<p>1天 航程</p>
					</div>
				</div>
				<div>目的港</div>
			</div>
			<div class="cc-szr">
				<p>船期</p>
				<p class="tyzt-zht">{{ "8月14日" }}</p>
				<p class="tyzt-zht">{{ "周六" }}</p>
			</div>
			<div class="cc-nav-c-rs">
				<img src="../../assets/container/班轮订舱MAERSK.png" alt="" />
			</div>
		</div>
		<div class="demand">
			<div class="name">
				<p class="nameTitle">订舱需求</p>
				<p>编号：DYSH001004591</p>
			</div>
			<div class="title">
				<p>箱型</p>
				<p>海运费(单价)</p>
				<p>选择舱位</p>
			</div>
			<div class="content" v-for="value in demandList" :key="value">
				<p>{{ value }}</p>
				<p>$800</p>
				<p><van-stepper v-model="stepperValue" /></p>
			</div>
		</div>
		<div class="remark">
			<div class="nameTitle">备注</div>
			<div class="content">
				美国船东，美国国旗；
				美国休斯敦自有码头；重吊，一装一载直达休斯敦、航速快;本船为MPP船，可载件杂货、重大件（Max800吨）如有需求请致电
				13262688288
			</div>
		</div>
		<div class="other">
			<div class="nameTitle">其他费用</div>
			<div class="content">
				<div class="gp">
					<p></p>
					<p>20GP</p>
					<p>40GP</p>
					<p>40HQ</p>
				</div>
				<div class="table" v-for="value in otherList" :key="value">
					<p>{{ value }}</p>
					<p>￥450/票</p>
					<p>￥450/票</p>
					<p>￥450/票</p>
				</div>
			</div>
		</div>
		<div class="foot">
			<div class="price">
				<p><span>合计海运费:</span> <span>$0.00</span></p>
				<p><i>*</i> 海运费线下交易支付</p>
			</div>
			<div class="app">APP内订舱</div>
		</div>
	</div>
</template>

<script>
	import { webGetWXDetail } from "../../api/h5share";
	import Vue from "vue";
	import { Stepper } from "vant";
	Vue.use(Stepper);
	import CallApp from "callapp-lib";
	export default {
		data() {
			return {
				stepperValue: 0,
				demandList: ["20GP", "40GP", "40HQ"],
				otherList: ["文件费", "订舱费", "船代操作费", "EIR", "THC", "封志费", "舱单费"],
			};
		},
		mounted() {
			this.getweChatPay();
		},
		methods: {
			openApp() {
				const options = {
					scheme: {
						protocol: "DYLogisticsApp://", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["wx-open-launch-app"],
						});
						wx.ready(function () {
							var s_title = "集装箱订舱详情", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/contBooking", // 分享链接
								s_desc = "国际、国内集装箱现舱限时特价抢舱。", //分享描述
								s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 180.png"; // 分享图标

							wx.updateAppMessageShareData({
								title: s_title, // 分享标题
								desc: s_desc, // 分享描述
								link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: s_imgUrl, // 分享图标
								success: function () {
									// 设置成功
								},
							});
							wx.updateTimelineShareData({
								title: s_title, // 分享标题
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
	.contBookingDetail {
		padding: 20px 20px 80px 20px;
		background: linear-gradient(0deg, #f1f3f5, 90%, #005cfa);
		.search,
		.demand,
		.remark,
		.other {
			position: relative;
			margin: 0 0 24px 0;
			padding: 20px 24px 20px 24px;
			background: #fff;
			border-radius: 12px;
		}
		.search {
			div {
				display: flex;
			}
			.search-o {
				justify-content: space-between;
				font-family: "tyzt-zht", Arial;
				line-height: 21px;
				height: 21px;
				color: #333333;
				font-size: 14px;
			}
			.search-t {
				justify-content: space-between;
				align-items: center;
				font-family: "tyzt-zht", Arial;
				height: 28px;
				font-size: 20px;
				line-height: 28px;
				color: #333333;
				margin-bottom: 20px;
				div:nth-child(2) {
					i {
						display: block;
						margin: 0;
						width: 44px;
						height: 6px;
						background: url("../../assets/container/组 3785@2x.png") no-repeat;
						background-size: 44px 6px;
					}
				}
				.cc-nav-t-c {
					position: relative;
					width: 60px;
					height: 6px;
					background: url("../../assets/container/组 3785.png") no-repeat;
					.cc-nav-c-r {
						position: absolute;
						top: 0;
						transform: translate(0%, -110%);
						font-size: 13px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #999999;
						display: flex;
						align-items: center;
						p:nth-child(2) {
							width: 20px;
							height: 20px;
							background: url("../../assets/container/蒙版组 78@2x.png") no-repeat;
							background-size: cover;
						}
					}
				}
			}
			.cc-szr {
				display: flex;
				align-items: center;
				height: 26px;
				font-size: 14px;
				color: #303030;
				p {
					margin: 0 5px;
					font-size: 16px;
				}
				p:nth-child(3),
				p:nth-child(2) {
					font-weight: 550;
				}
			}
			.cc-nav-c-rs {
				position: absolute;
				right: 20px;
				bottom: 20px;
				img {
					width: 80px;
					height: 26px;
				}
			}
		}
		.demand {
			div {
				display: flex;
				justify-content: space-between;
			}
			.name {
				display: flex;
				justify-content: space-between;
				p:nth-child(2) {
					font-size: 12px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #999999;
				}
			}
			.title {
				p {
					font-size: 12px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #999999;
				}
			}
			.content {
				padding: 20px 0px;
				border-bottom: #ebdddd 1px solid;
				p:nth-child(1) {
					font-size: 16px;
					font-family: 苹方-简-中黑体, 苹方-简;
					font-weight: normal;
					color: #333333;
				}
				p:nth-child(2) {
					margin-left: 25px;
					font-size: 18px;
					font-family: 苹方-简-中黑体, 苹方-简;
					font-weight: normal;
					color: #ff6851;
				}
			}
			.content:nth-child(5) {
				border-bottom: none;
			}
		}
		.remark {
			.content {
				font-size: 14px;
				font-family: 苹方-简-常规体, 苹方-简;
				font-weight: normal;
				color: #666666;
			}
		}
		.other {
			.content {
				div {
					margin: 20px 0px;
				}
				.gp {
					width: 100%;
					display: flex;
					justify-content: space-between;
					p {
						background-color: #3d91ff;
						border-radius: 10px;
						padding: 3px 8px;
						line-height: 15px;
						color: #ffffff;
						text-align: center;
					}
					p:nth-child(1) {
						background-color: #ffffff;
						width: 26%;
					}
				}
				.table {
					width: 100%;
					display: flex;
					justify-content: space-between;
					p {
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #666666;
						text-align: center;
					}
					p:nth-child(1) {
						text-align: left;
						width: 26%;
						color: #000000;
					}
				}
			}
		}
		.foot {
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20px 24px 20px 24px;
			width: 100%;
			background-color: #ffffff;
			.price {
				p:nth-child(1) {
					span:nth-child(1) {
						font-size: 12px;
						font-family: 苹方-简-中黑体, 苹方-简;
						font-weight: normal;
						color: #333333;
						margin-right: 5px;
					}
					span:nth-child(2) {
						font-size: 20px;
						font-family: D-DIN DIN-Bold, D-DIN DIN;
						font-weight: bold;
						color: #ff6851;
					}
				}
				p:nth-child(2) {
					margin: 5px 0px;
					font-size: 10px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #666666;
					i {
						color: #ff6851;
					}
				}
			}
			.app {
				width: 134px;
				height: 40px;
				background: #4486f6;
				border-radius: 22px 22px 22px 22px;
				color: #ffffff;
				font-size: 16px;
				text-align: center;
				line-height: 40px;
			}
		}
		.nameTitle {
			font-size: 16px;
			font-family: 苹方-简-中黑体, 苹方-简;
			font-weight: normal;
			color: #000000;
			margin-bottom: 20px;
		}
	}
</style>
