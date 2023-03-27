<template>
	<div class="applyFinanc">
		<div class="content">
			<img v-if="isShare != -1" src="@/assets/h5share/app内部.png" alt="" />
			<img else src="@/assets/h5share/立即申请ddd.jpg" alt="" />
		</div>
		<div class="foot">
			<van-action-sheet v-model="show" title="申请融资">
				<div class="content">
					<van-form @submit="onSubmit" @failed="onFailed">
						<van-field
							@click="uploadType('营业执照')"
							name="license"
							:rules="[
								{
									validator: valicense,
									required: true,
									message: '请上传正确的营业执照',
								},
							]"
							label="请上传营业执照"
						>
							<template #input>
								<van-uploader
									v-model="license"
									:after-read="afterRead"
									:before-delete="delLicense"
									:max-count="1"
								>
									<img src="@/assets/h5share/上传营业执照.png" alt="" />
								</van-uploader>
							</template>
						</van-field>
						<van-field
							@click="uploadType('身份证')"
							name="fication"
							label="请上传身份证"
							:rules="[
								{
									validator: vafication,
									required: true,
									message: '请上传正确的身份证',
								},
							]"
						>
							<template #input>
								<div @click="id_card_side = 'front'">
									<van-uploader
										v-model="frontCard"
										:after-read="afterRead"
										:before-delete="delFrontCard"
										:max-count="1"
									>
										<img src="@/assets/workbench/身份证人像页.png" alt="" />
									</van-uploader>
								</div>
								<div @click="id_card_side = 'back'">
									<van-uploader
										v-model="backCard"
										:after-read="afterRead"
										:before-delete="delBackCard"
										:max-count="1"
									>
										<img src="@/assets/workbench/身份证国徽页.png" alt="" />
									</van-uploader>
								</div>
							</template>
						</van-field>
						<van-field
							@click="uploadType('财务报表')"
							name="ments"
							:rules="[
								{
									validator: vaMents,
									required: true,
									message: '请上传财务报表',
								},
							]"
							label="公司近三年财务报表"
						>
							<template #input>
								<van-uploader
									v-model="ments"
									:after-read="afterRead"
									:before-delete="delMents"
									:max-count="1"
								>
								</van-uploader>
							</template>
						</van-field>
						<van-field
							name="address"
							v-model="address"
							placeholder="请填写地址"
							:rules="[{ required: true }]"
							label="联系地址"
						/>
						<van-field
							name="contacter"
							v-model="contacter"
							placeholder="请填写姓名"
							label="联系人姓名"
							:rules="[{ required: true }]"
						/>
						<van-field
							name="phoneNumber"
							v-model="phoneNumber"
							placeholder="请填写电话"
							type="tel"
							label="联系人电话"
							:rules="[{ required: true }]"
						/>
						<van-field
							name="moneySum"
							v-model="moneySum"
							placeholder="请输入金额"
							type="number"
							label="希望融资金额"
							:rules="[{ required: true }]"
						/>
						<div class="su">
							<p><span>*</span>以上申请信息请真实填写，才能保证审核通过</p>
							<van-button
								:disabled="disabled"
								round
								block
								type="info"
								native-type="submit"
								>确认</van-button
							>
						</div>
					</van-form>
				</div>
			</van-action-sheet>
			<img
				class="apply"
				src="@/assets/h5share/立即申请.png"
				@click="show = true"
				alt=""
			/>
		</div>
		<van-overlay :show="maskShow">
			<div class="wrapper">
				<div class="block">识别中...</div>
			</div>
		</van-overlay>
	</div>
</template>
<script>
	import {
		upLoadFuJian,
		getAccessToken,
		businessLicense,
		identification,
	} from "@/api/workbench.js";
	import { saveFinancing } from "@/api/h5share.js";
	import { webGetWXDetail } from "../../api/h5share";

	export default {
		data() {
			return {
				source: 1,
				accessToken: "",
				maskShow: false,
				isShare: false,
				upType: "",
				show: false,
				disabled: false,
				license: [],
				id_card_side: "",
				frontCard: [],
				backCard: [],
				ments: [],
				picList: [],
				address: "",
				contacter: "",
				phoneNumber: "",
				moneySum: "",
				androidAttrs: null,
			};
		},
		mounted() {
			// this.isShare =
			// 	new URLSearchParams(window.location.href.split("?")[1]).get(
			// 		"isShare",
			// 	) || false;
			//是否在app内打开
			this.isShare =
				navigator.userAgent.toLowerCase().indexOf("110.0.5481.153") || -1;
			this.source = localStorage.getItem("source");
			getAccessToken().then((res) => {
				this.accessToken = res.access_token || "1";
			});
			this.getweChatPay();
		},
		methods: {
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
							var s_title = "购/造船融资租赁服务", // 分享标题
								s_link = "https://www.dylnet.cn/h5share/applyFinanc", // 分享链接
								s_desc =
									"为服务于国内船舶物流企业，道裕联合第三方金融公司为船东人提供购买/建造船舶融资租赁服务。", //分享描述
								s_imgUrl =
									"http://39.105.35.83:10443/images/spart/1679656260837.png"; // 分享图标
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
			valicense() {
				return this.picList.filter((item) => item.fileLog == 53).length != 0;
			},
			vafication() {
				return (
					this.picList.filter(
						(item) => item.fileLog == 54 || item.fileLog == 55,
					).length == 2
				);
			},
			vaMents() {
				return this.picList.filter((item) => item.fileLog == 56).length != 0;
			},
			uploadType(type) {
				this.upType = type;
			},
			afterRead(file) {
				this.maskShow = this.upType == "财务报表" ? false : true;
				const formData = new FormData();
				formData.append("file", file.file);
				upLoadFuJian(formData).then((res) => {
					let cardUrl =
						this.source == 1
							? "http://58.33.34.10:10443/images/financial/" + res.data.fileName
							: "http://39.105.35.83:10443/images/financial/" +
							  res.data.fileName;
					if (this.upType == "营业执照") {
						let params = {
							access_token: this.accessToken,
							url: cardUrl,
						};
						this.businessLicense(params, res.data.fileName);
					} else if (this.upType == "身份证") {
						let params = {
							access_token: this.accessToken,
							id_card_side: this.id_card_side,
							url: cardUrl,
						};
						this.identification(params, res.data.fileName);
					} else if (this.upType == "财务报表") {
						this.picList.push({
							fileName: res.data.fileName,
							fileType: "financial",
							fileLog: 56,
							source: this.source,
						});
					}
				});
			},
			//营业执照识别
			businessLicense(params, fileName) {
				businessLicense(params).then((res2) => {
					if (!res2.error_msg) {
						this.picList.push({
							fileLog: 53,
							fileName: fileName,
							fileType: "financial",
							source: this.source,
						});
						this.maskShow = false;
					} else {
						this.license = [
							{
								name: "识别错误",
								url: require("@/assets/workbench/识别错误.png"),
							},
						];
						this.maskShow = false;
					}
				});
			},
			//身份证识别
			identification(params, filName) {
				identification(params).then((res) => {
					if (res.image_status == "normal") {
						if (this.id_card_side == "front") {
							this.picList.push({
								fileLog: 54,
								fileName: filName,
								fileType: "financial",
								source: this.source,
							});
							this.maskShow = false;
						} else if (this.id_card_side == "back") {
							this.picList.push({
								fileLog: 55,
								fileName: filName,
								fileType: "financial",
								source: this.source,
							});
							this.maskShow = false;
						}
					} else {
						if (this.id_card_side == "front") {
							this.frontCard = [
								{
									name: "识别错误",
									url: require("@/assets/workbench/识别错误.png"),
								},
							];
							this.maskShow = false;
						} else {
							this.backCard = [
								{
									name: "识别错误",
									url: require("@/assets/workbench/识别错误.png"),
								},
							];
							this.maskShow = false;
						}
					}
				});
			},
			onSubmit(v) {
				let params = {
					picList: JSON.parse(JSON.stringify(this.picList)),
					address: v.address,
					contacter: v.contacter,
					phoneNumber: v.phoneNumber,
					moneySum: v.moneySum,
				};
				saveFinancing(params).then((res) => {
					if (res.status == "200") {
						this.show = false;
						this.$message({
							showClose: true,
							center: true,
							message: "申请成功",
							type: "success",
						});
						this.license = [];
						this.frontCard = [];
						this.backCard = [];
						this.ments = [];
						this.picList = [];
						this.address = "";
						this.contacter = "";
						this.phoneNumber = "";
						this.moneySum = "";
					} else {
						this.$message({
							showClose: true,
							center: true,
							message: "申请失败",
							type: "warning",
						});
					}
				});
			},
			onFailed(v) {
				let obj = {
					license: "营业执照",
					frontCard: "身份证人像页",
					backCard: "身份证国徽页",
					ments: "财务报表",
					address: "地址",
					contacter: "姓名",
					phoneNumber: "电话",
					moneySum: "融资金额",
				};
				// this.show = false;
			},

			delLicense() {
				this.license = [];
				this.picList = this.picList.filter((item) => item.fileLog != 53);
			},
			delFrontCard() {
				this.frontCard = [];
				this.picList = this.picList.filter((item) => item.fileLog != 54);
			},
			delBackCard() {
				this.backCard = [];
				this.picList = this.picList.filter((item) => item.fileLog != 55);
			},
			delMents() {
				this.ments = [];
				this.picList = this.picList.filter((item) => item.fileLog != 56);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 50px;
		img {
			width: 100%;
		}
	}
	.foot {
		width: 100%;
		border-top: #efefef 1px solid;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: #ffffff;
		.van-button {
			margin: 20px 0px;
			border-radius: 30px;
			width: 100%;
		}
		.van-action-sheet__content {
			position: relative;
			padding: 26px 26px 99px 26px;
			height: 100vh;
		}
		.content {
			text-align: center;
			/deep/.van-field__label,
			/deep/.van-field__value {
				font-size: 15px;
				font-family: "苹方-简-中黑体, 苹方-简";
				font-weight: normal;
				color: #333333;
				margin-bottom: 10px;
			}
			.van-field:nth-child(1),
			.van-field:nth-child(2),
			.van-field:nth-child(3) {
				display: flex;
				flex-direction: column;
				/deep/.van-field__label {
					width: 100%;
					font-size: 14px;
					font-family: "苹方-简-中黑体, 苹方-简";
					font-weight: normal;
					color: #333333;
					margin-bottom: 10px;
				}
				.van-field__value {
					img {
						width: 145px;
						height: 104px;
						margin-right: 10px;
					}
				}
				/deep/.van-uploader__preview-image {
					width: 145px;
					height: 104px;
				}
			}
			.van-field:nth-child(3) {
				/deep/.van-field__label {
					position: relative;
					margin-bottom: 20px;
					::after {
						content: "资产负债表、利润表、现金流量表";
						position: absolute;
						font-size: 11px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #999999;
						top: 60%;
						left: 0;
					}
				}
				/deep/.van-uploader__upload,
				/deep/.van-uploader__preview-image {
					width: 100px;
					height: 100px;
				}
				.van-field__value {
					img {
						width: 100px;
						height: 100px;
					}
				}
			}
			.van-field:nth-child(7) {
				/deep/.van-field__value {
					.van-field__control {
						font-size: 18px;
						font-family: 苹方-简-中粗体, 苹方-简;
						font-weight: normal;
						color: #e6531d;
					}
					.van-field__control::placeholder {
						font-size: 15px;
						font-weight: normal;
					}
					.van-field__body {
						width: 100px;
						height: 25px;
						background: #f1f3f5;
						border-radius: 4px 4px 4px 4px;
						.van-field__control {
							text-align: center;
						}
					}
					::after {
						position: absolute;
						left: 112px;
						content: "万元";
						display: block;
						font-size: 15px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #333333;
					}
				}
			}
			.van-field::after {
				content: "";
				display: none;
			}
			.su {
				z-index: 99999;
				position: fixed;
				bottom: 0px;
				left: 0px;
				padding: 0px 50px;
				width: 100vw;
				background-color: #ffffff;
				p {
					padding: 0;
					height: 0;
					font-size: 11px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #999999;
					span {
						color: #e6531d;
						margin-right: 10px;
					}
				}
			}
		}
		.apply {
			margin: 6px 0px 33px 0px;
			width: 80vw;
		}
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.block {
		color: #ffffff;
		font-size: 15px;
		font-family: 苹方-简-常规体, 苹方-简;
		font-weight: normal;
	}
</style>
