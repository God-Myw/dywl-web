<template>
	<div id="app">
		<div class="swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="item in lists.picList" :key="item">
					<img :src="item" alt="#" />
				</van-swipe-item>
				<!-- <template #indicator="{ active, total }">
					<div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
				</template> -->
			</van-swipe>
		</div>
		<div class="info">
			<div class="name box">
				<p>
					￥{{ lists.money }}<span>{{ lists.views }} 浏览</span>
				</p>
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
						<span
							>信用评级
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
	import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
	import axios from "axios";
	export default {
		components: { Editor, Toolbar },
		data() {
			return {
				editor: null,
				lists: {
					picList: [],
					money: "",
					tradeName: "",
					placeOf: "",
					storeName: "",
					brand: "",
					views: 0,
					type: "1",
					model: "",
					partExplain: "",
					details: "",
				},
			};
		},
		mounted() {
			this.getData();
		},
		methods: {
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
			async getData() {
				let token = this.getQueryVariable("token");
				let guid = new URLSearchParams(window.location.href.split("?")[1]).get("guid");
				let res = await axios({
					method: "get",
					url: `https://www.dylnet.cn/api/business/spart/getSpartById?guid=${this.getQueryVariable(
						"guid",
					)}`,
					headers: {
						token: token || "dcd43c33-2fb9-4f66-b1a3-a5ab027e9ce1",
					},
				});
				if (res.data.code == "0000") {
					let data = res.data.data;
					this.increment(data);
				}
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
			increment(data) {
				let picList = [];
				let partExplain = data.partExplain
					.split("/")
					.filter(Boolean)
					.map((v) => {
						return v;
					});
				this.lists.money = data.money || "";
				this.lists.views = data.views || 0;
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
				if (data.picList) {
					picList = data.picList.map((v) => {
						return v.source == 1
							? "http://58.33.34.10:10443/images/spart/" + v.fileName
							: "http://39.105.35.83:10443/images/spart/" + v.fileName;
					});
				}
				this.lists.picList = picList || [];
				this.editor.disable();
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
		},
	};
</script>

<style lang="scss" scoped>
	#app {
		position: relative;
		width: 100vw;
	}

	.swiper {
		width: 100%;
	}

	.swiper img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #f1f3f5;
		width: 100%;
		padding: 0px 1rem 75px 1rem;
		box-sizing: border-box;
	}

	.info p {
		font-size: 16px;
		margin: 20px 0px;
		white-space: pre-wrap;
	}

	.info .box {
		margin: 8px 0px 0px 0px;
		width: 97vw;
		background: #ffffff;
		border-radius: 10px 10px 10px 10px;
		padding: 10px;
	}

	.info .name p:nth-child(1) {
		position: relative;
		font-size: 20px;
		font-family: "D-DIN Exp-DINExp-Bold, D-DIN Exp-DINExp";
		font-weight: 700;
		color: #e6531d;
	}

	.info .name p:nth-child(2) {
		margin-top: -10px;
		font-size: 17px;
		font-family: "苹方-简-中粗体, 苹方-简";
		font-weight: 700;
		color: #333333;
	}

	.info .name p:nth-child(1) span {
		position: absolute;
		right: 10px;
		top: 10px;
		margin-top: -10px;
		font-size: 14px;
		font-family: "苹方-简-中粗体, 苹方-简";
		font-weight: 500;
		color: #999999;
	}

	.info .placeOfOrigin,
	.info .explain {
		font-family: "苹方-简-常规体, 苹方-简";
		font-weight: normal;
		color: #666666;
		display: flex;
	}

	.info .placeOfOrigin .divl p,
	.info .explain .divl p {
		width: 45px !important;
		white-space: nowrap;
	}

	.info .explain .divR img {
		vertical-align: bottom;
		margin: 0px 5px -2px 5px;
		width: 18px;
		height: 18px;
	}

	.info .verify {
		padding: 20px;
		height: 105px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.info .verify .limg {
		margin: 0px 22px;
		width: 75px;
		height: 75px;
		border-radius: 80px;
		overflow: hidden;
	}

	.info .verify .limg img {
		width: 100%;
		height: 100%;
	}

	.info .verify .rinfo {
		height: 70%;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
	}

	.info .verify .rinfo .score {
		width: 21px;
		height: 20px;
		font-size: 17px;
		font-family: 苹方-简-中黑体, 苹方-简;
		font-weight: normal;
		color: #fd7b05;
		line-height: 0px;
		/* -webkit-text-fill-color: transparent; */
	}

	.info .verify img {
		vertical-align: text-bottom;
		width: 21px;
		height: 21px;
	}

	.info .commodityDetails {
		font-size: 14px;
		font-family: "苹方-简-常规体, 苹方-简";
		font-weight: normal;
		color: #333333;
	}

	.info .commodityDetails p:nth-child(1) {
		font-size: 20px;
		font-family: "苹方-简-中黑体, 苹方-简";
		font-weight: normal;
		color: #333333;
	}

	.info .commodityDetails img {
		width: 100%;
		height: 125px;
	}

	.actionBar {
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

	.actionBar .phone {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.actionBar .phone img {
		width: 24px;
		height: 24px;
	}

	.actionBar .phone p {
		margin: 0;
		width: 75px;
		height: 14px;
		font-size: 10px;
		font-family: "苹方-简-中黑体, 苹方-简";
		font-weight: normal;
		color: #333333;
	}

	.actionBar button {
		cursor: pointer;
		border: none;
		color: #ffffff;
		width: 244px;
		height: 40px;
		background: linear-gradient(90deg, #ff6536 0%, #f23434 100%);
		border-radius: 20px 20px 20px 20px;
	}

	.van-dialog__footer .van-dialog__cancel {
		background: #ffffff;
		border-radius: 16px 16px 16px 16px;
		border: 1px solid #4088f4;
		background: #4088f4 !important;
	}

	.van-dialog__footer .van-dialog__confirm {
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
