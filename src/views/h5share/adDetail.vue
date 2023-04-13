<template>
	<div class="adDetail">
		<div class="header">
			<img src="@/assets/h5share/组_12261@2x.png" alt="" />
			<img src="@/assets/h5share/组_12201@2x.png" @click="app" alt="" />
		</div>
		<div class="pic">
			<el-carousel height="150px">
				<el-carousel-item v-for="item in companypic" :key="item.fileName">
					<img :src="`http://58.33.34.10:10443/images/${item.type}/${item.fileName}`" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="content">
			<div class="name menu">
				<div class="logo">
					<img :src="`http://58.33.34.10:10443/images/companylogo/${companylogo}`" alt="" />
				</div>
				<div class="gsname">
					<p>{{ companyName }}</p>
					<p>{{ contacts }}</p>
				</div>
			</div>
			<div class="intr menu">
				<div class="title">公司简介</div>
				<div class="deinfo">
					{{ companyRemark }}
				</div>
			</div>
			<div class="info menu">
				<div class="title">商家信息</div>
				<div class="in">
					<ul class="first">
						<li>主营业务</li>
						<li>企业地址</li>
						<li>联系人</li>
						<li>联系电话</li>
						<li>查看地图</li>
					</ul>
					<ul class="second">
						<li>{{ companyBusiness }}</li>
						<li>{{ address }}</li>
						<li>{{ contacts }}</li>
						<li>{{ phoneCode + phoneNumber }}</li>
						<li @click="mapShow = true">点击查看 ></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="foot">
			<img src="@/assets/h5share/组_12256@2x.png" @click="phone" alt="" />
		</div>
		<div class="closeMap" v-show="mapShow">
			<baidu-map class="mapBaidu" v-show="mapShow" :center="center" :zoom="zoom"></baidu-map>
			<van-icon name="cross" @click="mapShow = false" />
		</div>
	</div>
</template>
<script>
	import { webGetWXDetail, getAdsById } from "../../api/h5share";
	import CallApp from "callapp-lib";
	export default {
		data() {
			return {
				clientSide: false,
				show: false,
				mapShow: false,
				companypic: [],
				companylogo: [],
				companyName: "",
				contacts: "",
				companyRemark: "",
				companyBusiness: "",
				address: "",
				contacts: "",
				phoneCode: "",
				phoneNumber: "",
				center: "",
				zoom: 15,
			};
		},
		mounted() {
			let guid = new URLSearchParams(window.location.href.split("?")[1]).get("guid") || false;
			this.getweChatPay();
			getAdsById(guid).then((res) => {
				if ((res.code = "0000")) {
					this.companypic = res.data.companypic;
					this.companylogo = res.data.companylogo[0] ? res.data.companylogo[0].fileName : "";
					this.companyName = res.data.adsDto.companyName;
					this.contacts = res.data.adsDto.contacts;
					this.companyRemark = res.data.adsDto.companyRemark;
					this.companyBusiness = res.data.adsDto.companyBusiness;
					this.address = res.data.adsDto.address;
					this.contacts = res.data.adsDto.contacts;
					this.phoneNumber = res.data.adsDto.phoneNumber;
					this.phoneCode = res.data.adsDto.phoneCode;
					this.center = res.data.adsDto.address || "上海";
				}
			});
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
						// eslint-disable-next-line no-undef
						wx.config({
							debug: false,
							appId: "wx3c5d7c6f964f3094",
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.sign,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["wx-open-launch-app"],
						});
						// eslint-disable-next-line no-undef
						wx.ready(function () {
							var title = "道裕物流联合各金融机构助力航运和物流企业", // 分享标题
								link = "https://www.dylnet.cn/h5share/applyFinanc", // 分享链接
								desc =
									"道裕物流联合各金融机构为航运、物流企业；为船东提供买/造船舶、在航抵押融资和海运垫付服务", //分享描述
								imgUrl = "https://www.dylnet.cn/images/spart/1679656260837.png"; // 分享图标
							// eslint-disable-next-line no-undef
							wx.updateAppMessageShareData({
								title: title, // 分享标题
								desc: desc, // 分享描述
								link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: imgUrl, // 分享图标
								success: function () {
									console.log("s");
								},
								cancel: function () {
									console.log("f");
								},
							});
							wx.updateTimelineShareData({
								title: title, // 分享标题
								desc: desc, // 分享描述
								link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: imgUrl, // 分享图标
								success: function () {
									console.log("s");
								},
								cancel: function () {
									console.log("f");
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
	.header {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		align-items: center;
		height: 48px;
		img {
			height: 85%;
			margin: 0px 10px;
		}
	}
	.pic {
		height: 209px;
		.el-carousel {
			position: relative;
			height: 100%;
			/deep/.el-carousel__container {
				top: 0;
				height: 85% !important;
			}
			/deep/.el-carousel__indicators {
				padding-right: 12px;
				position: relative;
				text-align: right;
				.el-carousel__indicator {
					.el-carousel__button {
						width: 9px;
						background: #000000;
						height: 5px;
					}
				}
				.is-active {
					.el-carousel__button {
						width: 9px;
						background: #ffffff;
						height: 5px;
					}
				}
			}
		}
		.el-carousel__item {
			height: 209px;
			background-color: black;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-bottom: 90px;
		.menu {
			width: 96%;
			border-radius: 8px;
			background-color: #ffffff;
			margin: 12px 0px 0px 0px;
			padding: 12px;
			.title {
				font-size: 16px;
				font-family: 苹方-简-中粗体, 苹方-简;
				font-weight: normal;
				color: #000000;
				padding: 12px 12px 12px 0px;
			}
		}
		.name {
			display: flex;
			justify-content: space-between;
			.logo {
				width: 64px;
				height: 64px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.gsname {
				width: 240px;
				p:nth-of-type(1) {
					font-size: 17px;
					font-family: 苹方-简-中黑体, 苹方-简;
					font-weight: normal;
					color: #333333;
				}
				p:nth-of-type(2) {
					font-size: 12px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #666666;
				}
			}
		}
		.intr {
			.deinfo {
				font-size: 14px;
				font-family: 苹方-简-常规体, 苹方-简;
				font-weight: normal;
				color: #333333;
			}
		}
		.info {
			.in {
				display: flex;
				ul {
					li {
						padding: 12px 12px 12px 0px;
					}
				}
				.first {
					li {
						height: 40px;
						width: 76px;
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #999999;
					}
				}
				.second {
					li {
						height: 40px;
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #333333;
					}
				}
			}
		}
	}
	.foot {
		height: 78px;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: #ffffff;
		img {
			margin-top: 10px;
			width: 90%;
		}
	}
	.closeMap {
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 99;
		top: 0;
		.mapBaidu {
			width: 100%;
			height: 100vh;
		}
		.van-icon {
			background-color: #ffffff;
			border-radius: 50px;
			position: absolute;
			font-size: 20px;
			padding: 5px;
			top: 10px;
			right: 10px;
		}
	}
</style>
