<template>
	<div>
		<div class="empty" v-if="!empty">
			<img src="../../../../assets/workbench/发送成功.png" alt="" />
			<p>恭喜您，您已申请成功开船舶备件在线商店！</p>
			<p>您可立即上传发布船舶备件商品，尽快帮您成交。</p>
			<el-button
				size="medium"
				@click="
					() => {
						this.$router.push('/workbench/spart/reSpart');
					}
				"
				>新增备件商品</el-button
			>
		</div>
		<div v-if="empty" class="realNameAut">
			<div class="header">
				<Worktitle title="申请开店" />
				<p>
					如您需申请船舶备件在线商店，请先填写实名认证信息，待系统审核通过后，即可发布和管理船舶备件商品。
				</p>
			</div>
			<div class="info">
				<Worktitle title="选择身份" blueSty="store" />
				<br />
				<el-button
					:class="act == '个人' ? 'active' : ''"
					size="mini"
					@click="
						act = '个人';
						form.type = 1;
					"
					>个人</el-button
				>
				<el-button
					:class="act == '公司' ? 'active' : ''"
					size="mini"
					@click="
						act = '公司';
						form.type = 2;
					"
					>公司</el-button
				>
				<br />
				<Worktitle
					:title="act == '个人' ? '上传身份证' : '上传营业执照'"
					blueSty="store"
				/>
				<el-form
					ref="form"
					:rules="rules"
					:model="form"
					label-width="200px"
					labelPosition="left"
				>
					<el-row :gutter="24">
						<el-col :span="10">
							<div class="idCard">
								<el-form-item
									v-show="!frontCard.length && act == '个人'"
									prop="frontCard"
								>
									<el-upload
										:action="
											source == 1
												? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
												: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
										"
										list-type="picture-card"
										:on-change="idCardChange"
										:file-list="frontCard"
										:limit="1"
										:showFileList="false"
									>
										<img
											@click="id_card_side = 'front'"
											src="@/assets/workbench/身份证人像页.png"
										/>
									</el-upload>
								</el-form-item>
								<div
									v-show="frontCard.length && act == '个人'"
									class="idCardPic"
								>
									<img :src="frontCard.length ? frontCard[0].url : ''" alt="" />
									<div class="mask">
										<i @click="frontCard = []" class="el-icon-delete"></i>
									</div>
								</div>
								<el-form-item
									v-show="!backCard.length && act == '个人'"
									prop="backCard"
								>
									<el-upload
										:action="
											source == 1
												? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
												: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
										"
										list-type="picture-card"
										:on-change="idCardChange"
										:file-list="backCard"
										:limit="1"
									>
										<img
											@click="id_card_side = 'back'"
											src="@/assets/workbench/身份证国徽页.png"
											alt=""
										/>
									</el-upload>
								</el-form-item>
								<div
									v-show="backCard.length && act == '个人'"
									class="idCardPic"
								>
									<img :src="backCard.length ? backCard[0].url : ''" alt="" />
									<div class="mask">
										<i @click="backCard = []" class="el-icon-delete"></i>
									</div>
								</div>
								<el-form-item
									v-show="!license.length && act == '公司'"
									prop="license"
								>
									<el-upload
										:action="
											source == 1
												? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
												: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
										"
										list-type="picture-card"
										:on-change="licenseChange"
										:file-list="license"
										:limit="1"
									>
										<img
											@click="id_card_side = 'back'"
											src="@/assets/workbench/上传营业执照.png"
											alt=""
										/>
									</el-upload>
								</el-form-item>
								<div v-show="license.length" class="idCardPic">
									<img :src="license.length ? license[0].url : ''" alt="" />
									<div class="mask">
										<i @click="license = []" class="el-icon-delete"></i>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
					<Worktitle title="店铺LOGO /形象" blueSty="store" />
					<div class="idCard">
						<el-form-item prop="picStore">
							<el-upload
								:action="
									source == 1
										? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
										: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
								"
								list-type="picture-card"
								:on-remove="handleRemove"
								:on-change="handleChange"
								:limit="1"
								:file-list="picStore"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
					</div>
					<Worktitle title="其它信息" blueSty="store" />
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="联系人" prop="contacter">
								<el-input
									v-model="form.contacter"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="店铺简介" prop="storeRemark">
								<el-input
									v-model="form.storeRemark"
									type="textarea"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="店铺名" prop="storeName">
								<el-input
									v-model="form.storeName"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="联系电话" prop="phoneNumber">
								<el-input
									v-model="form.phoneNumber"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24" v-if="act == '公司'">
						<el-col :span="10">
							<el-form-item label="客服电话" prop="customerPhoneNumber">
								<el-input
									v-model="form.customerPhoneNumber"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="公司地址" prop="companyAddress">
								<el-input
									v-model="form.companyAddress"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="foot">
				<el-checkbox v-model="checked"
					><div :class="isChecked ? '' : 'ischecked'">
						同意备件商品成交后，每单收取成交金额
						<span>平台服务费3%</span>
					</div></el-checkbox
				>
				<el-button
					style="margin: 0 auto; background-color: #0052d9"
					type="primary"
					size="default"
					@click="submit(form)"
					>确认提交</el-button
				>
				<el-button style="margin-left: 20px" size="default" @click="cancel()"
					>取消</el-button
				>
			</div>
		</div>
	</div>
</template>
<script>
	import { stringify } from "qs";
	import {
		getAccessToken,
		identification,
		businessLicense,
		saveMerchant,
	} from "../../../../api/workbench";
	import Worktitle from "../../../../components/WorkTitle.vue";
	export default {
		data() {
			return {
				act: "个人",
				source: 1,
				form: {
					type: 1,
					contacter: "",
					storeRemark: "",
					storeName: "",
					phoneNumber: "",
					customerPhoneNumber: "",
					idCardDetails: "",
					idCardDetailsOther: "",
					companyAddress: "",
					picList: [],
				},
				rules: {
					frontCard: [
						{
							required: this.act == "个人" ? true : false,
							validator: (rule, value, callback) => {
								if (
									(this.frontCard.length &&
										this.frontCard[0].name != "识别错误") ||
									this.act == "公司"
								) {
									callback();
								} else {
									callback(new Error("请上传正确的图片"));
								}
							},
							trigger: "blur",
						},
					],
					backCard: [
						{
							required: this.act == "个人" ? true : false,
							trigger: "blur",
							validator: (rule, value, callback) => {
								if (
									(this.backCard.length &&
										this.backCard[0].name != "识别错误") ||
									this.act == "公司"
								) {
									callback();
								} else {
									callback(new Error("请上传正确的图片"));
								}
							},
						},
					],
					license: [
						{
							required: this.act == "公司" ? true : false,
							validator: (rule, value, callback) => {
								if (
									(this.license.length && this.license[0].name != "识别错误") ||
									this.act == "个人"
								) {
									callback();
								} else {
									callback(new Error("请上传正确的图片"));
								}
							},
							trigger: "blur",
						},
					],
					picStore: [
						{
							required: true,
							validator: (rule, value, callback) => {
								if (this.form.picList.length) {
									callback();
								} else {
									callback(new Error("请上传正确的图片"));
								}
							},
							trigger: "blur",
						},
					],
					contacter: [
						{ required: true, message: "请输入联系人", trigger: "blur" },
					],
					storeRemark: [
						{ required: true, message: "请输入店铺简介", trigger: "blur" },
					],
					storeName: [
						{ required: true, message: "请输入店铺名", trigger: "blur" },
					],
					phoneNumber: [
						{ required: true, message: "请输入联系电话", trigger: "blur" },
					],
					customerPhoneNumber: [
						{ required: true, message: "请输入联系电话", trigger: "blur" },
					],
					companyAddress: [
						{ required: true, message: "请输入联系电话", trigger: "blur" },
					],
				},
				checked: false,
				isChecked: true,
				id_card_side: "",
				empty: true,
				frontCard: [],
				backCard: [],
				license: [],
				picStore: [],
			};
		},
		mounted() {
			this.source = localStorage.getItem("source");
			getAccessToken().then((res) => {
				localStorage.setItem("access_token", res.access_token);
			});
		},
		methods: {
			// 身份证识别
			idCardChange(file, fileList) {
				let id_card_side = this.id_card_side || "";
				if (file.status == "success" && file.response.code == "0000") {
					let cardUrl =
						this.source == 1
							? "http://58.33.34.10:10443/images/spart/" +
							  file.response.data.fileName
							: "http://39.105.35.83:10443/images/spart/" +
							  file.response.data.fileName;
					let params = {
						access_token: localStorage.getItem("access_token"),
						id_card_side: id_card_side,
						url: cardUrl,
					};
					identification(params).then((res) => {
						let statusObj = {
							normal: "识别正常",
							reversed_side: "身份证正反面颠倒",
							non_idcard: "上传的图片中不包含身份证",
							blurred: "身份证模糊",
							other_type_card: "其他类型证照",
							over_exposure: "身份证关键字段反光或过曝",
							over_dark: "身份证欠曝（亮度过低）",
							unknown: "未知状态",
						};
						if (res.image_status == "normal") {
							if (id_card_side == "front") {
								this.frontCard = [
									{ name: file.response.data.fileName, url: file.url },
								];
								this.form.picList.push({
									fileLog: 50,
									fileName: file.response.data.fileName,
									type: "merchant",
									source: this.source,
								});
							} else if (id_card_side == "back") {
								this.backCard = [
									{ name: file.response.data.fileName, url: file.url },
								];
								this.form.picList.push({
									fileLog: 50,
									fileName: file.response.data.fileName,
									type: "merchant",
									source: this.source,
								});
							}
							this.form.idCardDetails = JSON.stringify(res.words_result) || "";
							this.form.idCardDetailsOther =
								JSON.stringify(res.words_result) || "";
						} else {
							if (id_card_side == "front") {
								this.frontCard = [
									{
										name: "识别错误",
										url: require("@/assets/workbench/识别错误.png"),
									},
								];
							} else {
								this.backCard = [
									{
										name: "识别错误",
										url: require("@/assets/workbench/识别错误.png"),
									},
								];
							}
						}
					});
				}
			},
			// 营业执照识别
			licenseChange(file, fileList) {
				if (file.status == "success" && file.response.code == "0000") {
					let cardUrl =
						this.source == 1
							? "http://58.33.34.10:10443/images/spart/" +
							  file.response.data.fileName
							: "http://39.105.35.83:10443/images/spart/" +
							  file.response.data.fileName;
					let params = {
						access_token: localStorage.getItem("access_token"),
						url: cardUrl,
					};
					businessLicense(params).then((res) => {
						if (!res.error_msg) {
							this.license = [
								{ name: file.response.data.fileName, url: file.url },
							];
							this.form.picList.push({
								fileLog: 51,
								fileName: file.response.data.fileName,
								type: "merchant",
								source: this.source,
							});
							this.form.idCardDetails = JSON.stringify(res.words_result) || "";
							this.form.idCardDetailsOther =
								JSON.stringify(res.words_result) || "";
						} else {
							this.license = [
								{
									name: "识别错误",
									url: require("@/assets/workbench/识别错误.png"),
								},
							];
						}
					});
				}
			},
			handleRemove() {
				this.form.picList =
					this.form.picList.filter((el) => el.fileLog !== 52) || [];
			},
			handleChange(file, fileList) {
				if (file.status == "success") {
					this.picStore.push({
						fileName: file.response.data.fileName,
						url: file.url,
					});
					this.form.picList.push({
						fileLog: 52,
						fileName: file.response.data.fileName,
						type: "merchant",
						source: this.source,
					});
				}
			},
			submit(form) {
				if (this.checked) {
					this.$refs["form"].validate((valid) => {
						if (valid) {
							this.$confirm("您确认后,将上传商品信息", "确认提交", {
								confirmButtonText: "确定提交",
								cancelButtonText: "取消",
								type: "warning",
							})
								.then(() => {
									form = JSON.parse(JSON.stringify(form));
									saveMerchant(form).then((res) => {
										console.log(res);
									});
									this.empty = false;
									// console.log(form);
									this.$message({
										type: "success",
										message: "提交成功!",
									});
								})
								.catch(() => {
									this.$message({
										type: "info",
										message: "已取消",
									});
								});
						}
					});
				} else {
					this.isChecked = false;
					setTimeout(() => {
						this.isChecked = true;
					}, 1000);
				}
			},
		},
		destroyed() {},
		watch: {
			act(newV, oldV) {
				this.$refs["form"].resetFields();
				this.picStore = [];
				this.frontCard = [];
				this.backCard = [];
				this.license = [];
			},
		},
		components: { Worktitle },
	};
</script>
<style lang="scss" scoped>
	.realNameAut {
		padding: 20px;
		margin-bottom: 50px;
		border-radius: 5px;
		background-color: #ffffff;
		width: 100%;
		box-shadow: 0px 0px 5px rgb(235, 227, 227);
		.header {
			p {
				position: relative;
				top: -20px;
				font-size: 12px;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.3);
			}
		}
		.info {
			.el-button {
				width: 133px;
				font-size: 14px;
				height: 50px;
				border-radius: 5px;
				background-size: 100%;
				background-color: #f1f3f5;
			}
			.active {
				color: #0052d9;
				background-image: url("../../../../assets/workbench/选择身份.png");
			}
			.idCard {
				display: flex;
				/deep/.el-upload--picture-card,
				.idCardPic {
					position: relative;
					width: 201px;
					height: 139px;
					margin-right: 36px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.mask {
					position: absolute;
					display: grid;
					place-items: center;
					top: 0;
					opacity: 0;
					width: 100%;
					height: 100%;
					background-color: #0000007e;
					transition: all 0.5s;
					i {
						color: #ffffff;
						font-size: 30px;
						cursor: pointer;
					}
				}
				.idCardPic:hover .mask {
					opacity: 1;
				}
				/deep/.el-upload-list__item {
					width: 201px;
					height: 139px;
				}
				/deep/.el-form-item__content {
					margin-left: 0px !important;
				}
			}
		}
		.foot {
			position: fixed;
			padding: 10px 24px;
			width: 100%;
			bottom: 0;
			left: 232px;
			background-color: #ffffff;
			span {
				color: #0052d9;
				margin-right: 30px;
			}
			.ischecked {
				animation: slidein 0.3s;
				span {
					animation: slidein 0.3s;
				}
				@keyframes slidein {
					0% {
						color: red;
					}
					50% {
						font-size: 18px;
						color: red;
					}
					100% {
						font-size: 14px;
						color: red;
					}
				}
			}
			.el-button {
				height: 30px;
				line-height: 0px;
			}
			/deep/.el-checkbox__label {
				color: #0000007e;
			}
		}
	}

	.empty {
		padding: 20px;
		margin-bottom: 50px;
		border-radius: 5px;
		background-color: #ffffff;
		box-shadow: 0px 0px 5px rgb(235, 227, 227);
		width: 100%;
		height: 630px;
		display: grid;
		place-items: center;
		img {
			border: 3px #867f7f dotted;
			width: 381px;
			height: 381px;
		}
		p {
			font-size: 21px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: #37383b;
		}
		.el-button {
			font-size: 21px;
			width: 215px;
			height: 53px;
			background: #feffff;
			border-radius: 4px 4px 4px 4px;
		}
	}
</style>
