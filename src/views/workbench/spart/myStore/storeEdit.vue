<template>
	<div class="storeEdit">
		<div class="box">
			<div class="info">
				<el-form ref="form" :rules="rules" :model="form" label-width="200px" labelPosition="left">
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="店铺头像" prop="storePic">
								<el-upload
									:action="
										source == 1
											? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
											: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
									"
									list-type="picture-card"
									:on-success="handleSuccess"
									:limit="1"
									:file-list="fileList"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24" v-if="type == 1">
						<el-col :span="10">
							<el-form-item label="公司名称" prop="storeName">
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
							<el-form-item label="联系人" prop="contacter">
								<el-input
									v-model="form.contacter"
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
					<el-row :gutter="24" v-if="type == 1">
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
					</el-row>
					<el-row :gutter="24" v-if="type == 1">
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
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="店铺简介（选填）" prop="storeRemark">
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
					<el-button style="margin: 0 auto" type="primary" size="default" @click="submit(form)"
						>确认提交</el-button
					>
					<el-button style="margin-left: 20px" size="default" @click="cancel()">取消</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import Worktitle from "../../../../components/WorkTitle.vue";
	import { getMerchantByCreater, saveMerchant } from "../../../../api/workbench";
	export default {
		props: ["editShow"],
		data() {
			return {
				type: 1,
				source: "",
				creater: "",
				storePic: "",
				fileList: [],
				form: {
					storePic: "",
					storeName: "",
					contacter: "",
					phoneNumber: "",
					customerPhoneNumber: "",
					companyAddress: "",
					storeRemark: "",
				},
				rules: {
					storePic: [
						{
							required: true,
							trigger: "blur",
							validator: (rule, value, callback) => {
								if (this.form.storePic == "") {
									callback(new Error("请上传图片"));
								} else {
									callback();
								}
							},
						},
					],
					storeName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
					contacter: [{ required: true, message: "请输入联系人", trigger: "blur" }],
					phoneNumber: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
					customerPhoneNumber: [{ required: true, message: "请输入客服电话", trigger: "blur" }],
					companyAddress: [{ required: true, message: "请输入公司地址", trigger: "blur" }],
					storeRemark: [{ required: true, message: "请输入店铺简介", trigger: "blur" }],
				},
			};
		},
		components: { Worktitle },
		mounted() {
			this.source = localStorage.getItem("source");
			this.getData();
		},
		methods: {
			async getData() {
				let res = await getMerchantByCreater();
				if (res.code == "0000") {
					this.storePic = res.data.attachmentsDtos[0].fileName;
					this.fileList = [
						{
							url: `http://58.33.34.10:10443/images/spart/${res.data.attachmentsDtos[0].fileName}`,
						},
					];
					this.form.storePic =
						`http://58.33.34.10:10443/images/spart/${res.data.attachmentsDtos[0].fileName}` || "";
					this.form.storeName = res.data.merchantDto.storeName || "";
					this.form.type = res.data.merchantDto.type || "";
					this.form.storeName = res.data.merchantDto.storeName || "";
					this.form.contacter = res.data.merchantDto.contacter || "";
					this.form.phoneNumber = res.data.merchantDto.phoneNumber || "";
					this.form.customerPhoneNumber = res.data.merchantDto.customerPhoneNumber || "";
					this.form.companyAddress = res.data.merchantDto.companyAddress || "";
					this.form.storeRemark = res.data.merchantDto.storeRemark || "";
					this.guid = res.data.merchantDto.guid || "";
				}
			},
			handleSuccess(response, file, fileList) {
				this.form.storePic = response.data.fileName;
			},
			submit() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let params = {
							guid: this.guid,
							storeName: this.form.storeName,
							contacter: this.form.contacter,
							phoneNumber: this.form.phoneNumber,
							customerPhoneNumber: this.form.customerPhoneNumber,
							companyAddress: this.form.companyAddress,
							storeRemark: this.form.storeRemark,
						};
						saveMerchant(params);
						this.getData();
						this.$emit("editShow", true);
					} else {
						return false;
					}
				});
			},
			cancel() {
				this.$emit("editShow", true);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.storeEdit {
		width: 1620px;
		.box {
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			background-color: #ffffff;
			width: 100%;
			box-shadow: 0px 0px 5px rgb(235, 227, 227);
			img {
				width: 147px;
				height: 130px;
			}
			.info {
				text-align: center;
			}
		}
	}
</style>
