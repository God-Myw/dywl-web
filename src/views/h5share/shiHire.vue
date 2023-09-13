<template>
	<div class="shiHire" v-if="dataList.shipSellerDto" :class="{ intervoyageinland: clientSide }">
		<div class="shiHire-swipe">
			<van-swipe @change="onChange" height="280">
				<van-swipe-item v-for="(item, index) in dataList.shipPhotos" :key="index">
					<img
						:src="'http://58.33.34.10:10443/images/shipzl/' + item.fileName"
						style="object-fit: cover"
						alt=""
				/></van-swipe-item>
				<template #indicator>
					<div class="custom-indicator">{{ current + 1 }}/{{ dataList.shipPhotos.length }}</div>
				</template>
			</van-swipe>
		</div>
		<div class="shiHire-title">
			<div class="title-top">
				<div class="title-top-left">{{ dataList.shipSellerDto.shipType }}</div>
				<!--   -->
				<div class="title-top-right">
					<div></div>
					<div>
						{{ dataList.shipSellerDto.price }}
					</div>
					<div class="price_interview" v-if="Number(dataList.shipSellerDto.price)">
						<div v-if="dataList.shipSellerDto.priceType == 0">万美元</div>
						<div v-if="dataList.shipSellerDto.priceType == 1">万元</div>
						<div v-if="dataList.shipSellerDto.priceType == 2">万欧元</div>
					</div>
				</div>
			</div>
			<div class="title-bottom">
				<div>
					<p>挂牌编号：{{ dataList.shipSellerDto.orderNumber }}</p>
					<p>
						预计空出日期:
						{{ dataList.shipSellerDto.sellingDate.replace("T", " ").replace(".000+0000", "") }}
					</p>
					<p>预计空出地点: {{ dataList.shipSellerDto.sellingAddress }}</p>
					<p>
						{{ dataList.shipSellerDto.intentionSum }}人有意向/{{ dataList.shipSellerDto.views }}
						浏览
					</p>
				</div>
				<div style="color: red; font-size: 15px">
					出租类型: {{ dataList.shipSellerDto.sellingType == 1 ? "TC" : "TCT" }}
				</div>
			</div>
		</div>
		<!-- 船舶档案 -->
		<div class="shiHire-record">
			<div class="record-title">船舶档案</div>
			<div class="record-nav">
				<div class="record-item" v-if="dataList.shipSellerDto.classificationSociety">
					<div>船级社</div>
					<div>{{ dataList.shipSellerDto.classificationSociety }}</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.voyageArea">
					<div>航区</div>
					<div>{{ dataList.shipSellerDto.voyageArea }}</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.dwt">
					<div>载重吨</div>
					<div>{{ dataList.shipSellerDto.dwt }}吨</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.draft">
					<div>吃水</div>
					<div>{{ dataList.shipSellerDto.draft }}米</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.netWeight">
					<div>空船重量</div>
					<div>{{ dataList.shipSellerDto.netWeight }}吨</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.hatchesNumber">
					<div>舱口数量</div>
					<div>{{ dataList.shipSellerDto.hatchesNumber }}个</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.seat">
					<div>客位</div>
					<div>{{ dataList.shipSellerDto.seat }}个</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.carSeat">
					<div>汽车位</div>
					<div>{{ dataList.shipSellerDto.carSeat }}个</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.truckSeat">
					<div>卡车位</div>
					<div>{{ dataList.shipSellerDto.truckSeat }}个</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.liftingCapacity">
					<div>起重能力</div>
					<div>{{ dataList.shipSellerDto.liftingCapacity }}</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.span">
					<div>跨度</div>
					<div>{{ dataList.shipSellerDto.span }}米</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.craneHeightMax">
					<div>最大吊高</div>
					<div>{{ dataList.shipSellerDto.craneHeightMax }}米</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.isAutopilot">
					<div>是否自航</div>
					<div>
						{{ dataList.shipSellerDto.isAutopilot }}
					</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.intermediateDate">
					<div>中间检验</div>
					<div>
						{{ this.renderTime(dataList.shipSellerDto.intermediateDate) }}
					</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.specialInspectionDate">
					<div>特检</div>
					<div>
						{{ this.renderTime(dataList.shipSellerDto.specialInspectionDate) }}
					</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.buildParticularYear">
					<div>建造年份</div>
					<div>{{ dataList.shipSellerDto.buildParticularYear }}</div>
				</div>
				<div class="record-item" v-if="dataList.shipSellerDto.buildAddress">
					<div>建造地点</div>
					<div>{{ dataList.shipSellerDto.buildAddress }}</div>
				</div>
			</div>
		</div>
		<!-- 备注 -->
		<div class="shiHire-remark" style="margin-bottom: 10px">
			<div class="remark-title">备注</div>
			<div class="remark-cont" v-if="dataList.shipSellerDto.remark">
				{{ dataList.shipSellerDto.remark }}
			</div>
			<div class="remark-cont" v-else>无</div>
		</div>
		<!-- 油耗 -->
		<div class="shiHire-remark">
			<div class="remark-title">油耗</div>
			<div class="remark-cont" v-if="dataList.shipSellerDto.oilConsumption">
				{{ dataList.shipSellerDto.oilConsumption }}
			</div>
			<div class="remark-cont" v-else>无</div>
		</div>
		<div class="relation">
			<div class="phone" @click="teleDig = true">
				<div></div>
				<div>拨打400热线</div>
			</div>
			<div class="service" @click="teleDig = true">咨询客服</div>
			<div class="intention" @click="openApp">我有意向买</div>
		</div>
		<van-dialog v-model="teleDig" title="拨打客服电话" :show-confirm-button="false">
			<div class="teletxt">
				我们即将为您拨打<span style="color: #4088f4; padding-left: 10px">400-9009-618</span>
			</div>
			<div class="telebtn">
				<div @click="teleDig = false">取消</div>
				<div @click="Calltele">立即拨打</div>
			</div>
		</van-dialog>
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
						<script type="text/wxtag-template">
							<style>.btn { color: #fff;padding: 6px 38px;border: 1px solid #4088F4;background: #4088F4;font-size: 16px; border-radius: 18px;}</style>
							<div class="btn">确定</div>
						</script>
					</wx-open-launch-app>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Button, Swipe, SwipeItem } from "vant";
	Vue.use(Button).use(Swipe).use(SwipeItem);
	import CallApp from "callapp-lib";
	import axios from "axios";
	import { webGetWXDetail } from "../../api/h5share";
	// import axios from 'axios'
	export default {
		data() {
			return {
				clientSide: false,
				current: 0,
				teleDig: false,
				dataList: [],
				show: false,
			};
		},
		mounted() {
			this.getList();
			this.getweChatPay(this.getQueryVariable("token"), this.getQueryVariable("sellerGuid"));
		},
		created() {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				// console.log('这是移动')
				this.clientSide = false;
			} else {
				this.clientSide = true;
			}
			// 设置单个页面的body的背景色
		},
		methods: {
			openApp() {
				this.show = true;
			},
			handleErrorFn() {
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
			handleLaunchFn() {
				this.show = false;
			},
			btndis() {
				this.show = false;
			},
			// 转化时间格式
			renderTime(date) {
				let dateee = new Date(date).toJSON();
				let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
					.toISOString()
					.replace(/T/g, " ")
					.replace(/\.[\d]{3}Z/, "");
				return /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
			},
			// 截取app传的token和参数
			getQueryVariable(variable) {
				// 获取？后参数的位置截取
				var query = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return false;
			},
			onChange(index) {
				this.current = index;
			},
			Calltele() {
				window.location.href = "tel://400-9009-618";
			},
			async getweChatPay(token, sellerGuid) {
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
							var s_title = "道裕物流—船舶挂牌出售", // 分享标题
								s_link =
									"https://www.dylnet.cn/h5share/shiHire?token=" +
									token +
									"&sellerGuid=" +
									sellerGuid, // 分享链接
								s_desc = "船舶卖家向全球买家自主发布国内、国际热销船舶出售信息。", //分享描述
								s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 329.png"; // 分享图标
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
			async getList() {
				let res = await axios.get(
					"https://www.dylnet.cn/api/business/shipSellingZl/getShipSellingDetailForAppZl",
					{
						headers: {
							token: this.getQueryVariable("token"),
						},
						params: {
							sellerGuid: this.getQueryVariable("sellerGuid"),
						},
					},
				);
				if (res.data.code == "0000") {
					this.dataList = res.data.data;
				} else {
					this.dataList = [];
				}
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
	.van-swipe-item {
		img {
			width: 100%;
			height: 100%;
		}
	}
	.custom-indicator {
		position: absolute;
		right: 5px;
		bottom: 5px;
		padding: 4px 7px;
		font-size: 12px;
		color: #ffffff;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.6);
	}
	.shiHire {
		.shiHire-title {
			margin: 10px;
			padding: 22px 16px;
			background: #ffffff;
			border-radius: 6px;
			.title-top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 8px;
				.title-top-left {
					height: 33px;
					line-height: 33px;
					font-size: 24px;
					font-family: "tyzt-zht", Arial;
					color: #333333;
				}
				.title-top-right {
					display: flex;
					div:nth-child(1) {
						padding-top: 10px;
						height: 33px;
						font-size: 14px;
						color: #333333;
					}
					div:nth-child(2) {
						height: 33px;
						font-size: 28px;
						font-family: "d-din-bold", Arial;
						color: #e6531d;
						margin: 0 4px 0 6px;
					}
					.price_interview {
						div {
							padding-top: 10px;
							height: 33px;
							font-size: 14px;
							font-family: "tyzt-zht", Arial;
							color: #e6531d;
						}
					}
				}
			}
			.title-bottom {
				display: flex;
				justify-content: space-between;
				div {
					// height: 17px;
					line-height: 17px;
					font-size: 12px;
					color: #999999;
					p {
						margin: 3px 0px;
					}
				}
			}
		}
		.shiHire-record {
			margin: 10px;
			padding: 16px 18px;
			background: #ffffff;
			border-radius: 6px;
			.record-title {
				height: 22px;
				line-height: 22px;
				font-size: 16px;
				font-family: "tyzt-zht", Arial;
				color: #333333;
				margin-bottom: 20px;
			}
			.record-nav {
				display: flex;
				flex-wrap: wrap;

				.record-item {
					width: 104px;
					margin: 0 1px;
					margin-bottom: 14px;
					div:nth-child(1) {
						height: 17px;
						line-height: 17px;
						font-size: 12px;
						color: #999999;
					}
					div:nth-child(2) {
						height: 20px;
						font-size: 14px;
						line-height: 20px;
						color: #333333;
					}
				}
			}
		}
		.shiHire-remark {
			margin: 10px;
			padding: 20px 18px 28px;
			background: #ffffff;
			border-radius: 6px;
			margin-bottom: 150px;
			.remark-title {
				height: 22px;
				line-height: 22px;
				font-size: 16px;
				font-family: "tyzt-zht", Arial;
				color: #333333;
				margin-bottom: 16px;
			}
			.remark-cont {
				font-size: 14px;
				line-height: 20px;
				color: #333333;
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
			.service {
				padding: 9px 28px;
				background: linear-gradient(90deg, #43bef5 0%, #3680ff 100%);
				border-radius: 6px;
				font-size: 16px;
				color: #ffffff;
			}
			.intention {
				background: linear-gradient(90deg, #ff8947 0%, #ff5555 100%);
				padding: 9px 28px;
				border-radius: 6px;
				font-size: 16px;
				color: #ffffff;
			}
		}
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
	.teletxt {
		text-align: center;
		margin: 12px 0 20px 0;
		font-size: 14px;
	}
	.telebtn {
		display: flex;
		justify-content: center;
		margin-bottom: 17px;
		div {
			border-radius: 18px;
			// height: 28px;
			font-size: 14px;
			line-height: 28px;
		}
		div:nth-child(1) {
			margin-right: 28px;
			padding: 0 36px;
			color: #4088f4;
			border: 1px solid #4088f4;
		}
		div:nth-child(2) {
			color: #fff;
			padding: 0 23px;
			background: #4088f4;
		}
	}
	.intervoyageinland {
		width: 375px;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
