<template>
	<div class="contBooking-cont" :class="{ contBooking: clientSide }" ref="backH">
		<div class="cc-header">
			<div class="cc-h-t">
				<span class="h-t-img1"></span>
				<span class="h-t-img2"></span>
			</div>
			<div class="cc-h-b">
				<div>
					今日<span>{{ getDay }}</span
					>{{ dateDate }}
				</div>
			</div>
		</div>

		<div class="search" @click="openApp">
			<div class="search-o">
				<div>请选择</div>
				<div>请选择</div>
			</div>
			<div class="search-t">
				<div>起始港</div>
				<div><i></i></div>
				<div>目的港</div>
			</div>
			<div class="search-f">
				<div><i></i><span>请选择运输日期</span></div>
				<div><i></i></div>
			</div>
			<div class="search-c">
				<div><i></i><span>请选择船公司</span></div>
				<div><i></i></div>
			</div>
			<div class="search-btn">舱位查询</div>
		</div>

		<div v-for="(item, index) in dataList" :key="index">
			<div class="cc-nav" @click="openApp">
				<div class="cc-nav-t">
					<div class="cc-nav-t-l tyzt-zht">
						<div>{{ item.startPortEn }}</div>
						<div>{{ item.startPortCn }}</div>
					</div>
					<div class="cc-nav-t-c">
						<div class="cc-nav-c-r tyzt-zht">
							<p>{{ item.voyage }}天 航程</p>
						</div>
					</div>
					<div class="cc-nav-t-l tyzt-zht">
						<div>{{ item.endPortEn }}</div>
						<div>{{ item.endPortCn }}</div>
					</div>
				</div>
				<div class="cc-nav-c">
					<div class="cc-nav-c-l">
						<!-- <div class="cc-szr">
							<p>截关时间</p>
							<p class="tyzt-zht">{{ item.closingTimeWeek }}</p>
							<p class="tyzt-zht">{{ item.closingTimeString }}</p>
						</div> -->
						<div class="cc-szr">
							<p>船期</p>
							<p class="tyzt-zht">{{ item.sailingTimeString }}</p>
							<p class="tyzt-zht">{{ item.sailingTimeWeek }}</p>
						</div>
						<div class="cc-gp">
							<div class="cc-hq">
								<p>20GP</p>
								<p>{{ item.haiyunFortyGpTejia }}</p>
							</div>
							<span></span>
							<div class="cc-hq">
								<p>40GP</p>
								<p>{{ item.haiyunTwentyGpTejia }}</p>
							</div>
							<span></span>
							<div class="cc-hq">
								<p>40HQ</p>
								<p>{{ item.haiyunFortyHqTejia }}</p>
							</div>
						</div>
					</div>
					<div class="cc-nav-c-r tyzt-zht">
						<img
							v-if="item.shipCompanyLogo"
							:src="`http://58.33.34.10:10443/images/shipCompany/${item.shipCompanyLogo}`"
							alt=""
						/>
						<!-- <p>{{ item.voyage }}天 航程</p>
						<p></p> -->
					</div>
				</div>
				<div class="cc-nav-b">
					<div v-for="(ite, idx) in item.lables" :key="idx">
						<span v-if="ite != ''" class="cc-b-o">{{ ite }}</span>
					</div>
				</div>
			</div>
		</div>
		<van-pagination
			v-model="currentPage"
			:total-items="1282"
			:show-page-size="8"
			:items-per-page="pageSize"
		>
			<template #prev-text>
				<van-icon name="arrow-left" />
			</template>
			<template #next-text>
				<van-icon name="arrow" />
			</template>
			<template #page="{ text }">{{ text }}</template>
		</van-pagination>
		<van-dialog v-model="show" title="是否打开道裕物流App" :show-confirm-button="false">
			<div class="btnCs">
				<div class="btn-left" @click="btndis">取消</div>
				<div>
					<wx-open-launch-app
						id="launch-btn"
						@error="handleErrorFn"
						@launch="handleLaunchFn"
						appid="wx03327e343064e998"
					>
						<div class="btn-left" @click="handleErrorFn">确定</div>
					</wx-open-launch-app>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
	// import moment from "moment";
	import Vue from "vue";
	import CallApp from "callapp-lib";
	import { Dialog, Tab, Tabs, Icon, ActionSheet, Pagination } from "vant";
	import { webGetWXDetail } from "../../api/h5share";
	import axios from "axios";
	Vue.use(Dialog).use(Icon).use(ActionSheet).use(Pagination);
	Vue.use(Tab);
	Vue.use(Tabs);
	export default {
		data() {
			return {
				dataList: [],
				dateDate: "",
				getDay: "",
				show: false,
				clientSide: false,
				pageSize: 6,
				currentPage: 1,
			};
		},
		created() {
			// 判断当前是什么端
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				// console.log('这是移动')
				this.clientSide = false;
			} else {
				this.clientSide = true;
			}
		},
		mounted() {
			this.getList();
			this.getdate();
			this.getweChatPay();
		},
		methods: {
			handleErrorFn(e) {
				// alert(JSON.stringify(e))
				const options = {
					scheme: {
						// 用来配置 URL Scheme 所必须的那些字段
						protocol: "DYLogisticsApp://", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
					},
					appstore: "https://apps.apple.com/cn/app/id1493154544", // appstore的下载地址
					yingyongbao: "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 应用宝的下载地址
					fallback: "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 唤端失败后跳转的地址
				};
				new CallApp(options).open({ path: "" });
			},
			handleLaunchFn(e) {
				this.show = false;
			},
			btndis() {
				this.show = false;
			},
			async getweChatPay() {
				webGetWXDetail({
					url: window.location.href.split("#")[0],
				}).then((res) => {
					if (res.code == "0000") {
						// 9c0c7938213dde425ba71a8b318bf96f
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
								s_link = "https://www.dylnet.cn/h5share/contBooking", // 分享链接
								s_desc = "汇集全球知名船公司，可运到世界各港口的集装箱班轮订舱", //分享描述
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
			openApp() {
				this.show = true;
			},
			getdate() {
				let date = new Date();
				let dateWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				this.dateDate = date.getMonth() + 1 + "月" + date.getDate() + "日";
				this.getDay = dateWeek[date.getDay()];
			},
			// 列表数据
			async getList() {
				let res = await axios.get(
					"/api/business/shipBooking/getShipBookingListForApp?pageSize=" +
						this.pageSize +
						"&currentPage=" +
						this.currentPage,
				);
				if (res.data.data) {
					this.dataList = res.data.data.shipBookings;
				} else {
					this.dataList = [];
					this.$nextTick(() => {
						this.$refs.backH.style = "height:100%";
					});
				}
			},
		},
		watch: {
			currentPage() {
				this.getList();
			},
		},
	};
</script>
<style lang="scss" scoped>
	/deep/.van-dialog {
		border-radius: 5px;
	}
	.btnCs {
		display: flex;
		margin: 20px 0 28px 0;
		justify-content: center;
		.btn-left {
			margin-right: 32px;
			font-size: 14px;
			line-height: 32px;
			border-radius: 18px;
			padding: 0 36px;
			color: #4088f4;
			border: 1px solid #4088f4;
		}
	}
	.tyzt-zht {
		font-family: "tyzt-zht", Arial;
	}
	.contBooking-cont {
		background: url("../../assets/container/蒙版组 86@2x.png") no-repeat;
		background-color: rgba(68, 134, 246, 1);
		background-position: 100% 5%; /*no*/
		background-size: 200px 200px;
		padding: 0 10px 30px;
		.cc-header {
			padding: 0 0 27px 10px;
			.cc-h-t {
				display: flex;
				align-items: center;
				height: 60px;
				padding-top: 25px;
				.h-t-img1 {
					display: block;
					margin-right: 5px;
					width: 24px;
					height: 24px;
					background: url("../../assets/container/组 5386@2x.png") no-repeat;
					background-size: cover;
				}
				.h-t-img2 {
					display: block;
					width: 150px;
					height: 48px;
					background: url("../../assets/container/Schedule@2x.png") no-repeat;
					background-size: cover;
				}
			}
			.cc-h-b {
				font-size: 18px;
				color: #ffffff;
				margin-top: 5px;
				span {
					font-size: 24px;
					margin: 0 8px;
				}
			}
		}
		.search {
			margin: 0 0 24px 0;
			padding: 20px 24px 20px 24px;
			background: #fff;
			border-radius: 12px;
			div {
				display: flex;
			}
			.search-o {
				justify-content: space-between;
				font-family: "tyzt-zht", Arial;
				line-height: 21px;
				height: 21px;
				color: #888888;
				font-size: 14px;
			}
			.search-t {
				justify-content: space-between;
				align-items: center;
				font-family: "tyzt-zht", Arial;
				height: 28px;
				font-size: 20px;
				line-height: 28px;
				color: #888888;
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
			}
			.search-f {
				align-items: center;
				justify-content: space-between;
				margin-bottom: 26px;
				div:nth-child(1) {
					i {
						display: block;
						margin: 0;
						width: 20px;
						height: 20px;
						background: url("../../assets/container/蒙版组 289@2x.png") no-repeat;
						background-size: 20px 20px;
					}
					span {
						height: 21px;
						font-size: 16px;
						line-height: 21px;
						color: rgba(136, 136, 136, 0.8);
						margin-left: 16px;
					}
				}
				div:nth-child(2) {
					i {
						display: block;
						margin: 0;
						width: 20px;
						height: 20px;
						background: url("../../assets/container/蒙版组 288@2x.png") no-repeat;
						background-size: 20px 20px;
					}
				}
			}
			.search-c {
				align-items: center;
				justify-content: space-between;
				margin-bottom: 26px;
				div:nth-child(1) {
					i {
						display: block;
						margin: 0;
						width: 20px;
						height: 20px;
						background: url("../../assets/container/蒙版组 291@2x.png") no-repeat;
						background-size: 20px 20px;
					}
					span {
						height: 21px;
						font-size: 16px;
						line-height: 21px;
						color: rgba(136, 136, 136, 0.8);
						margin-left: 16px;
					}
				}
				div:nth-child(2) {
					i {
						display: block;
						margin: 0;
						width: 10px;
						height: 10px;
						background: url("../../assets/container/289@2x.png") no-repeat;
						background-size: 8px 10px;
					}
				}
			}
			.search-s {
				align-items: center;
				justify-content: space-between;
				margin-bottom: 26px;
				div:nth-child(1) {
					i {
						display: block;
						margin: 0;
						width: 20px;
						height: 20px;
						background: url("../../assets/container/蒙版组 291@2x.png") no-repeat;
						background-size: 20px 20px;
					}
					span {
						height: 21px;
						font-size: 16px;
						line-height: 21px;
						color: rgba(136, 136, 136, 0.8);
						margin-left: 16px;
					}
				}
				div:nth-child(2) {
					i {
						display: block;
						margin: 0;
						width: 6px;
						height: 10px;
						background: url("../../assets/container/289@2x.png") no-repeat;
						background-size: 6px 10px;
					}
				}
			}
			.search-btn {
				justify-content: center;
				align-items: center;
				height: 44px;
				text-align: center;
				color: #fff;
				font-size: 20px;
				background: linear-gradient(87deg, #44bff6 0%, #4486f6 100%);
				border-radius: 22px;
			}
		}
		.cc-nav {
			background: #fff;
			border-radius: 6px;
			margin-bottom: 16px;
			padding-bottom: 20px;
			.cc-nav-t {
				display: flex;
				justify-content: space-between;
				padding: 20px 24px;
				.cc-nav-t-l {
					font-size: 20px;
					font-weight: 550;
					color: #303030;
					text-align: center;
					div:nth-child(1) {
						font-size: 16px;
						font-weight: 500;
					}
				}
				.cc-nav-t-c {
					position: relative;
					margin-top: 32px;
					width: 60px;
					height: 6px;
					background: url("../../assets/container/组 3785.png") no-repeat;

					.cc-nav-c-r {
						position: absolute;
						top: 0;
						transform: translate(0%, -120%);
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
			.cc-nav-c {
				padding: 0 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.cc-nav-c-l {
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
						p:nth-child(3) {
							font-size: 16px;
							font-weight: 550;
						}
						p:nth-child(2) {
							font-size: 16px;
							font-weight: 550;
						}
					}
					.cc-gp {
						display: flex;
						margin-top: 3px;
						.cc-hq {
							height: 37px;
							width: 50px;
							p {
								width: 100%;
								padding: 2px 0px 2px 4px;
							}
							p:nth-child(1) {
								font-size: 14px;
								font-family: 苹方-简-常规体, 苹方-简;
								font-weight: normal;
								color: #333333;
							}
							p:nth-child(2) {
								font-size: 16px;
								font-family: 苹方-简-中粗体, 苹方-简;
								font-weight: normal;
								color: #ff6851;
							}
						}
						span {
							margin: 8px 3px 0px;
							line-height: 26px;
							height: 26px;
							width: 1px;
							background-color: #dfdfdf;
						}
					}
				}
				.cc-nav-c-r {
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
					img {
						width: 77px;
						height: 24px;
					}
				}
			}
			.cc-nav-b {
				padding: 17px 20px 0;
				font-size: 10px;
				display: flex;
				div {
					span {
						padding: 2px 7px;
						border: 1px solid #ffab80;
						color: #ffab80;
						margin-right: 5px;
						border-radius: 4px;
					}
				}
				div:nth-child(1) span {
					border: 1px solid #ff6851;
					background: #ff6851;
					color: #fff;
				}
			}
		}
	}
	.contBooking {
		width: 375px;
		left: 0;
		right: 0;
		margin: auto;
	}
	.van-pagination {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
	}
</style>
