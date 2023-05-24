<template>
	<div id="spartEdit">
		<div class="swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="item in lists.picList" :key="item">
					<img :src="item" alt="#" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="info">
			<div class="name box">
				<p>￥{{ lists.money }}</p>
				<p>{{ lists.tradeName }}</p>
			</div>
			<div class="placeOfOrigin box">
				<div class="divl">
					<p>产地:</p>
					<p>品牌:</p>
					<p>型号:</p>
				</div>
				<div>
					<p>中国</p>
					<p>{{ lists.brand }}</p>
					<p>{{ lists.model }}</p>
				</div>
			</div>
			<div class="explain box">
				<div class="divl">
					<p>说明:</p>
				</div>
				<div class="divR">
					<p v-for="item in lists.partExplain" :key="item">
						<img src="http://58.33.34.10:10443/images/spart/1670551173075.png" alt="" />
						<span> {{ item }} </span>
					</p>
				</div>
			</div>
			<div class="verify box" v-if="lists.storeName">
				<div class="limg">
					<img :src="`http://58.33.34.10:10443/images/spart/${lists.storeLogo}`" alt="" />
				</div>
				<div class="rinfo">
					<div>
						<span>{{ lists.storeName }}</span>
						<img
							v-show="lists.type == '1'"
							src="http://58.33.34.10:10443/images/spart/1670924635524.png"
							alt=""
						/>
						<!-- &nbsp;&nbsp; -->
						<img
							v-show="lists.type == '2'"
							src="http://58.33.34.10:10443/images/spart/1670924637144.png"
							alt=""
						/>
					</div>
					<div>
						<span>
							信用评级
							<img
								v-for="(item, index) in 5"
								src="http://58.33.34.10:10443/images/spart/1670924109041.png"
								:key="index"
							/>
						</span>
						<span class="score">5.0</span>
					</div>
				</div>
			</div>
			<div class="commodityDetails box">
				<p>商品详情</p>
				<Editor style="min-height: auto" @onCreated="editorCreated" />
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
	import axios from "axios";
	import { Swipe, SwipeItem } from "vant";
	Vue.use(Swipe).use(SwipeItem);
	import { webGetWXDetail } from "../../api/h5share";
	export default {
		data() {
			return {
				lists: {
					picList: [],
					money: "",
					tradeName: "",
					placeOf: "",
					storeName: "",
					brand: "",
					type: "1",
					model: "",
					partExplain: "",
					details: "",
				},
				editor: null,
			};
		},
		mounted() {
			// this.isShare =
			// 	new URLSearchParams(window.location.href.split("?")[1]).get(
			// 		"isShare",
			// 	) || false;
			this.getData();
			this.getweChatPay();
		},
		components: { Editor, Toolbar },
		methods: {
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
			getData() {
				let guid = new URLSearchParams(window.location.href.split("?")[1]).get("guid");
				axios({
					method: "get",
					url: `https://www.dylnet.cn/api/business/spart/getSpartById?guid=` + guid,
				}).then((res) => {
					if (res.data.code == "0000") {
						let data = res.data.data;
						this.increment(data);
					}
				});
			},
			dialogShow(title, message, confirmButtonText) {
				vant
					.showConfirmDialog({
						title: title,
						message: message,
						confirmButtonText: confirmButtonText,
					})
					.then(() => {
						if (title == "拨打客服电话") window.location.href = "tel:400-9009-618";
						else {
							var u = navigator.userAgent;
							var isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
							var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
							var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
							// 微信内
							if (isWeixin) {
								alert("请在浏览器上打开");
							} else {
								let timer;
								//android端
								if (isAndroid) {
									//安卓app的scheme协议
									window.location.href = "DYLogisticsApp://"; //打开道裕app
									let hidden =
										window.document.hidden ||
										window.document.mozHidden ||
										window.document.msHidden ||
										window.document.webkitHidden;
									timer = setTimeout(function () {
										axios
											.get("http://39.105.35.83:10443/api/sys/version/1")
											.then(function (res) {
												window.location.href = res.data.data.downloadAddr;
											})
											.catch(function (err) {
												console.log(err);
											});
									}, 3000);
									if (hidden) {
										clearTimeout(timer);
									}
								}
								//ios端
								if (isIOS) {
									//ios的scheme协议
									window.location.href = "DYLogisticsApp://";
									let hidden =
										window.document.hidden ||
										window.document.mozHidden ||
										window.document.msHidden ||
										window.document.webkitHidden;
									timer = setTimeout(function () {
										axios
											.get("http://39.105.35.83:10443/api/sys/version/2")
											.then(function (res) {
												window.location.href = res.data.data.downloadAddr;
											})
											.catch(function (err) {
												console.log(err);
											});
									}, 3000);
									if (hidden) {
										clearTimeout(timer);
									}
								}
							}
						}
					})
					.catch(() => {
						// on cancel
					});
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
							jsApiList: ["checkJsApi", "updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["wx-open-launch-app"],
						});
						// eslint-disable-next-line no-undef
						wx.ready(function () {
							var s_title = "道裕物流联合各金融机构助企", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/assistance", // 分享链接
								s_desc = "道裕物流联合各金融机构助力全国和上海各物流企业", //分享描述
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
			increment(data) {
				let picList = data.picList.map((v) => {
					return v.source == 1
						? "http://58.33.34.10:10443/images/spart/" + v.fileName
						: "http://39.105.35.83:10443/images/spart/" + v.fileName;
				});
				let partExplain = data.partExplain
					.split("/")
					.filter(Boolean)
					.map((v) => {
						return v;
					});
				this.lists.picList = picList || [];
				this.lists.money = data.money || "";
				this.lists.type = data.type || "";
				this.lists.storeLogo = data.storeLogo || "1682241015756.png";
				this.lists.tradeName = data.tradeName || "";
				this.lists.storeName = data.storeName || "";
				this.lists.brand = data.brand || "";
				this.lists.placeOf = data.placeOf || "";
				this.lists.model = 
					data.models
						.split("，")
						.filter((item) => item != "null")
						.toString() || "";
				this.lists.partExplain = partExplain || "";
				this.editor.setHtml(data.details);
				this.editor.disable();
			},
		},
	};
</script>

<style lang="scss" scoped>
	#spartEdit {
		position: relative;
		width: 100vw;
		font-size: 16px;
	}

	#spartEdit .swiper {
		width: 100%;
	}

	#spartEdit .swiper img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
	}

	#spartEdit .swiper .custom-indicator {
		position: absolute;
		color: #fff;
		right: 20px;
		bottom: 20px;
		padding: 2px 5px;
		font-size: 16px;
		width: 25px;
		height: 20px;
		background: #000000;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.5);
	}

	#spartEdit .info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #f1f3f5;
		width: 100%;
		padding: 0px 10px 75px 10px;
		box-sizing: border-box;
	}

	#spartEdit .info p {
		white-space: pre-wrap;
		margin: 10px 0px;
	}

	#spartEdit .info .box {
		margin: 6px 0px 6px 0px;
		width: 93vw;
		background: #ffffff;
		border-radius: 10px 10px 10px 10px;
		padding: 10px;
	}

	#spartEdit .info .name p:nth-child(1) {
		font-size: 20px;
		font-family: "D-DIN Exp-DINExp-Bold, D-DIN Exp-DINExp";
		font-weight: 700;
		color: #e6531d;
	}

	#spartEdit .info .name p:nth-child(2) {
		font-size: 17px;
		font-family: "苹方-简-中粗体, 苹方-简";
		font-weight: 700;
		color: #333333;
	}

	#spartEdit .info .placeOfOrigin,
	#spartEdit .info .explain {
		font-family: "苹方-简-常规体, 苹方-简";
		font-weight: normal;
		color: #666666;
		display: flex;
	}

	#spartEdit .info .placeOfOrigin .divl p,
	#spartEdit .info .explain .divl div {
		width: 45px !important;
		white-space: nowrap;
		vertical-align: text-bottom;
	}

	#spartEdit .info .explain .divR img {
		vertical-align: text-bottom;
		margin: 0px 5px 0px 5px;
		width: 18px;
		height: 18px;
	}

	#spartEdit .info .verify {
		padding: 20px;
		height: 105px;
		// display: flex;
		// justify-content: start;
		// align-items: center;
	}

	#spartEdit .info .verify .limg {
		margin: 0px 22px;
		width: 75px;
		height: 75px;
		border-radius: 80px;
		overflow: hidden;
	}

	#spartEdit .info .verify .limg img {
		width: 100%;
		height: 100%;
	}

	#spartEdit .info .verify .rinfo {
		height: 70%;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
	}

	#spartEdit .info .verify .rinfo .score {
		width: 21px;
		height: 20px;
		font-size: 17px;
		font-family: "苹方-简-中黑体, 苹方-简";
		font-weight: normal;
		color: #fd7b05;
		line-height: 0px;
		/* -webkit-text-fill-color: transparent; */
	}

	#spartEdit .info .verify img {
		vertical-align: text-bottom;
		width: 21px;
		height: 21px;
	}

	#spartEdit .actionBar {
		width: 100vw;
		height: 60px;
		position: fixed;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		bottom: 0;
		right: 0;
		left: 0;
		background: #ffffff;
		padding: 0px 15px;
	}

	#spartEdit .actionBar .phone {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#spartEdit .actionBar .phone img {
		width: 24px;
		height: 24px;
	}

	#spartEdit .actionBar .phone p {
		margin: 0;
		width: 75px;
		height: 14px;
		font-size: 10px;
		font-family: "苹方-简-中黑体, 苹方-简";
		font-weight: normal;
		color: #333333;
	}

	#spartEdit .actionBar button {
		cursor: pointer;
		border: none;
		color: #ffffff;
		width: 244px;
		height: 40px;
		background: linear-gradient(90deg, #ff6536 0%, #f23434 100%);
		border-radius: 20px 20px 20px 20px;
	}

	#spartEdit .van-dialog__footer .van-dialog__cancel {
		background: #ffffff;
		border-radius: 16px 16px 16px 16px;
		border: 1px solid #4088f4;
		background: #4088f4 !important;
	}

	#spartEdit .van-dialog__footer .van-dialog__confirm {
		width: 100px;
		height: 32px;
		background: #4088f4;
		border-radius: 16px 16px 16px 16px;
	}

	#editor—wrapper {
		border: none;
		z-index: 100;
		/* 按需定义 */
	}

	#toolbar-container {
		border-bottom: none;
	}
</style>
