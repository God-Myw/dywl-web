<template>
	<div class="contBookingDetail" @click="openApp">
		<div class="search">
			<div class="search-o">
				<div>{{ startPortEn }}</div>
				<div>{{ endPortEn }}</div>
			</div>
			<div class="search-t">
				<div>{{ startPortCn }}</div>
				<div class="cc-nav-t-c">
					<div class="cc-nav-c-r tyzt-zht">
						<p>{{ voyage }}天 航程</p>
					</div>
				</div>
				<div>{{ endPortCn }}</div>
			</div>
			<div class="cc-szr">
				<p>船期</p>
				<p class="tyzt-zht">{{ sailingTimeString }}</p>
				<p class="tyzt-zht">{{ sailingTimeWeek }}</p>
			</div>
			<div class="cc-nav-c-rs">
				<img v-if="shipCompanyLogo" :src="shipCompanyLogo" alt="" />
			</div>
		</div>
		<div class="demand">
			<div class="name">
				<p class="nameTitle">订舱需求</p>
				<p>编号：{{ dyNumber }}</p>
			</div>
			<div class="title">
				<p>箱型</p>
				<p>海运费(单价)</p>
				<p>选择舱位</p>
			</div>
			<div class="content" v-for="item in demandList" :key="item.name">
				<p>{{ item.name }}</p>
				<p>{{ item.value }}</p>
				<p><van-stepper v-model="stepperValue" min="0" disable-plus/></p>
			</div>
		</div>
		<div class="remark">
			<div class="nameTitle">备注</div>
			<div class="content">{{ remark }}</div>
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
				<div class="table" v-for="item in otherList" :key="item.name">
					<p>{{ item.name }}</p>
					<p>￥{{ item.value[0] || "--" }}</p>
					<p>￥{{ item.value[1] || "--" }}</p>
					<p>￥{{ item.value[2] || "--" }}</p>
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
	import { webGetWXDetail, getShipBookingDetailsForApp } from "../../api/h5share";
	import Vue from "vue";
	import { Stepper } from "vant";
	Vue.use(Stepper);
	import CallApp from "callapp-lib";
	export default {
		data() {
			return {
				stepperValue: "0",
				demandList: [],
				otherList: [],
				startPortCn: "",
				startPortEn: "",
				endPortCn: "",
				endPortEn: "",
				voyage: "",
				sailingTimeString: "",
				sailingTimeWeek: "",
				shipCompanyLogo: "",
				dyNumber: "",
				remark: "",
			};
		},
		mounted() {
			this.getweChatPay();
			this.getData();
		},
		methods: {
			getData() {
				let guid = new URLSearchParams(window.location.href.split("?")[1]).get("guid") || "";
				getShipBookingDetailsForApp({ guid: guid }).then((res) => {
					if (res.code == "0000") {
						let data = res.data;
						this.shipCompanyLogo = data.shipCompanyLogo
							? `http://58.33.34.10:10443/images/shipCompany/` + data.shipCompanyLogo
							: "";
						this.dyNumber = data.dyNumber;
						this.sailingTimeString = data.sailingTimeString;
						this.sailingTimeWeek = data.sailingTimeWeek;
						this.startPortCn = data.startPortCn;
						this.startPortEn = data.startPortEn;
						this.endPortCn = data.endPortCn;
						this.endPortEn = data.endPortEn;
						this.demandList = [
							{ name: "20GP", value: data.haiyunFortyGpTejia },
							{ name: "40GP", value: data.haiyunFortyHqTejia },
							{ name: "40HQ", value: data.haiyunTwentyGpTejia },
						];
						this.voyage = data.voyage;
						this.remark = data.remark;
						this.otherList = [
							{
								name: "文件费",
								value: [data.wenjianFortyGp, data.wenjianTwentyGp, data.wenjianFortyHq],
							},
							{
								name: "订舱费",
								value: [data.dingcangFortyGp, data.dingcangTwentyGp, data.dingcangFortyHq],
							},
							{
								name: "船代操作费",
								value: [data.caozuoFortyGp, data.caozuoTwentyGp, data.caozuoFortyHq],
							},
							{
								name: "EIR",
								value: [data.eirFortyGp, data.eirTwentyGp, data.eirFortyHq],
							},
							{
								name: "THC",
								value: [data.thcFortyGp, data.thcTwentyGp, data.thcFortyHq],
							},
							{
								name: "封志费",
								value: [data.fengzhiFortyGp, data.fengzhiFortyHq, data.fengzhiTwentyGp],
							},
							{
								name: "舱单费",
								value: [data.chuandanFortyGp, data.chuandanTwentyGp, data.chuandanFortyHq],
							},
						];
					}
				});
			},
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
							var s_title = "全球集装箱班轮订舱", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/contBookingDetail", // 分享链接
								s_desc = `(${this.startPortEn})+${this.startPortCn} — (${this.endPortEn})+${this.endPortCn} 集装箱班轮订舱`, //分享描述
								s_imgUrl = "http://58.33.34.10:10443/images/financial/1682567526426.png"; // 分享图标
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
		width: 375px;
		margin: 0 auto;
		padding: 20px 10px 80px 10px;
		background: linear-gradient(0deg, #f1f3f5, 90%, #005cfa);
		.search,
		.demand,
		.remark,
		.other {
			position: relative;
			margin: 0 0 12px 0;
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
					margin: 10px 0px;
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
						width: 23%;
					}
				}
				.table {
					width: 100%;
					display: flex;
					justify-content: space-between;
					p {
						padding: 3px 8px;
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #666666;
						text-align: center;
					}
					p:nth-child(1) {
						padding-left: 0;
						text-align: left;
						width: 23%;
						white-space: nowrap;
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
			left: 50%;
			transform: translateX(-50%);
			padding: 20px 24px 20px 24px;
			width: 375px;
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
