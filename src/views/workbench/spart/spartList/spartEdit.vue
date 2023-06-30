<template>
	<div class="spartEdit">
		<div class="box">
			<Worktitle title="编辑船舶供应"></Worktitle>
			<el-form ref="form" :rules="rules" :model="form" label-width="200px" labelPosition="left">
				<el-row :gutter="24">
					<el-col :span="10">
						<el-form-item label="一级分类" prop="oneLevelId">
							<el-select
								style="width: 100%"
								size="small"
								filterable
								clearable
								v-model="form.oneLevelId"
								@change="oneLvChange"
								placeholder=""
							>
								<el-option
									v-for="(item, index) in oneLev"
									:label="item.oneLevelName"
									:value="item.oneLevelName"
									:key="index"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="10">
						<el-form-item label="二级分类" prop="twoLevelId">
							<el-select
								style="width: 100%"
								size="small"
								filterable
								clearable
								v-model="form.twoLevelId"
								placeholder=""
							>
								<el-option
									v-for="(item, index) in twoLev"
									:label="item.twoLevelName"
									:value="item.twoLevelName"
									:key="index"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="10">
						<el-form-item label="商品名称" prop="tradeName">
							<el-input size="small" v-model="form.tradeName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="10">
						<el-form-item label="商品品牌" prop="brand">
							<!-- <el-input size="small" v-model="form.brand"></el-input> -->
							<el-select
								style="width: 100%"
								v-model="form.brand"
								filterable
								clearable
								placeholder="请选择"
							>
								<div
									style="
										font-size: 14px;
										padding: 0 20px;
										margin: 5px 0px;
										position: relative;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										color: #606266;
										height: 34px;
										line-height: 34px;
										box-sizing: border-box;
										cursor: pointer;
									"
								>
									<el-input
										style="float: left; width: 35%"
										size="small"
										v-model="brandAddName"
										placeholder="请输入新增品牌名称"
									></el-input>
									<el-select
										disabled
										size="small"
										style="width: 40%"
										v-model="form.oneLevelId"
										placeholder="请选择一级分类"
									>
										<el-option
											v-for="(item, index) in oneLev"
											:label="item.oneLevelName"
											:value="item.guid"
											:key="index"
										></el-option>
									</el-select>
									<span
										@click="brandAdd"
										style="
											float: right;
											font-size: 12px;
											background: #409eff;
											color: #fff;
											border-radius: 5px;
											padding: 0px 10px;
										"
										><i class="el-icon-plus"></i> 新增品牌</span
									>
								</div>
								<el-option
									style="display: none"
									key="item.value"
									label="item.label"
									value="item.value"
								>
								</el-option>
								<el-option
									v-for="item in brandAddNameList"
									:key="item.brand + item.levelId"
									:label="item.brand"
									:value="item.brand"
								>
									<span style="font-size: 13px">{{ item.brand }}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="24">
						<el-form-item label="商品轮播图" prop="picList">
							<el-upload
								:action="
									source == 1
										? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
										: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
								"
								list-type="picture-card"
								accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
								:on-change="upLoadChange"
								:on-remove="upLoadChange"
								:file-list="form.picList"
								:limit="10"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="20">
						<el-form-item label="商品型号/价格" prop="spartParts">
							<el-table :data="form.spartParts" style="width: 100%">
								<el-table-column label="" width="260">
									<template slot-scope="scope">
										<div @click="upLoadBefore(scope)">
											<el-upload
												v-show="!scope.row.partPicList[0]"
												:action="
													source == 1
														? 'http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart'
														: 'https://www.dylnet.cn/api/sys/file/upLoadFuJian/spart'
												"
												list-type="picture-card"
												accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
												:on-change="upLoadStore"
												:file-list="scope.row.partPicList"
												:limit="1"
											>
												<i class="el-icon-plus"></i>
											</el-upload>
											<div class="storeImgBox" v-show="scope.row.partPicList[0]">
												<img
													class="storeImg"
													:src="scope.row.partPicList[0] ? scope.row.partPicList[0].url : ''"
												/>
												<div class="mask"></div>
												<i class="el-icon-delete" @click="storeImgDel(scope)"></i>
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="">
									<template slot-scope="scope">
										<div>
											<el-input
												placeholder="请填写型号名"
												size="small"
												v-model="scope.row.model"
											></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="">
									<template slot-scope="scope">
										<div class="yuan">
											<el-input
												placeholder="请填写价格"
												size="small"
												v-model="scope.row.spartMoney"
											></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="">
									<template slot-scope="scope">
										<div>
											<el-input
												placeholder="请填写库存数"
												size="small"
												v-model="scope.row.quantity"
											></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="address" label="">
									<template slot-scope="scope">
										<div>
											<i
												style="font-size: 27px; margin-left: 20px"
												class="el-icon-delete"
												@click="storeDelete(scope)"
											></i>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<el-button
								style="display: inline-block; width: 100%; border: 1px dashed"
								size="default"
								@click="storeListAdd"
							>
								<i class="el-icon-plus">添加型号</i>
							</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="10">
						<el-form-item label="说明" prop="partExplain">
							<el-input
								style="display: inline-block"
								v-for="(item, index) in form.partExplain"
								size="small"
								v-model="form.partExplain[index]"
								:key="index"
							></el-input>
							<el-button
								icon="el-icon-plus"
								size="small"
								style="width: 100%; border: 1px dashed"
								@click="partExplainAdd"
								>添加说明</el-button
							>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label=""> </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="24">
						<el-form-item label="商品详情描述" prop="details">
							<div style="border: 1px solid #ccc">
								<Toolbar
									style="border-bottom: 1px solid #ccc"
									:editor="editor"
									:defaultConfig="toolbarConfig"
									mode="default"
								/>
								<Editor
									style="height: 500px; overflow-y: hidden"
									v-model="html"
									:defaultConfig="editorConfig"
									mode="default"
									@onCreated="editorCreated"
									@onChange="editorChange"
								/>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="24">
						<el-form-item label="配送方式" prop="deliveryMethod">
							<el-radio-group v-model="form.deliveryMethod">
								<el-radio :label="1">快递发货</el-radio>
								<el-radio :label="2">商家自选</el-radio>
								<el-radio :label="3">委托道裕平台统一配送</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24" class="demo-autocomplete">
					<el-col :span="24">
						<el-form-item label="快递运费" prop="addressMoneyMould">
							<div class="tyyf" style="margin-bottom: 15px">
								<el-radio v-model="form.addressMoneyType" :label="1">统一运费</el-radio>
								<el-input
									:disabled="form.addressMoneyType == 2"
									style="width: 15%"
									type="number"
									v-model="addressMoneyMould_1"
									placeholder="请输入内容"
								></el-input>
								&nbsp;
								<span style="color: #606266">元</span>
							</div>
							<div class="yfmb">
								<el-radio v-model="form.addressMoneyType" :label="2">运费模板</el-radio>
								<el-select
									style="width: 15%"
									:disabled="form.addressMoneyType == 1"
									v-model="addressMoneyMould_2"
									placeholder="请选择"
								>
									<el-option
										v-for="item in mouldList"
										:key="item.guid"
										:label="item.remark"
										:value="item.guid"
									>
									</el-option>
								</el-select>
								&nbsp;
								<div
									@click="centerDialogVisible = form.addressMoneyType == 2 ? true : false"
									style="display: inline-block; cursor: pointer; color: #606266"
								>
									<i class="el-icon-plus" style="border: 2px solid #b2b1b2; padding: 7px"></i>
									&nbsp; 新建模板
								</div>
							</div>
							<el-dialog
								title="新建快递模板"
								:visible.sync="centerDialogVisible"
								width="21%"
								center
							>
								<el-form label-width="80px">
									<el-form-item label="运费">
										<el-col :span="18">
											<el-input
												type="number"
												placeholder="请输入运费和企额"
												v-model="addressMoneyType_1"
											></el-input> </el-col
										>&nbsp;元
									</el-form-item>
									<p style="height: 10px"></p>
									<el-form-item label="模板说明">
										<el-col :span="22">
											<el-input
												type="textarea"
												placeholder="清输入快递运界说明"
												v-model="addressMoneyType_2"
											></el-input>
											<p>请新增模板后再选择运费模板</p>
										</el-col>
									</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
									<el-button @click="centerDialogVisible = false">取 消</el-button>
									<el-button type="primary" @click="yfmbAdd">确 定</el-button>
								</span>
							</el-dialog>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 提交 -->
				<el-row :gutter="24" class="demo-autocomplete submitFix">
					<el-col :span="6">
						<el-form-item> </el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item>
							<el-button
								style="margin-right: 50px"
								@click="
									() => {
										this.$router.push('/workbench/spart/spartList');
									}
								"
								>取消</el-button
							>
							<el-button type="primary" @click="onSubmit(form)">确认提交</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
	import Worktitle from "../../../../components/WorkTitle.vue";
	import {
		getSpartById,
		saveSpart,
		getSpartLevel,
		getSpartTwoLevelAll,
		getSpartTwoLevel,
		getSpartBandList,
		saveSpartBand,
		saveAddressMould,
		getAddressMouldList,
	} from "../../../../api/workbench";
	import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
	import { stringify } from "qs";
	export default {
		components: { Worktitle, Editor, Toolbar },
		data() {
			var validatePicList = (rule, value, callback) => {
				let rules = this.picList2[0] != undefined;
				if (rules) {
					callback();
				} else {
					callback(new Error("请上传商品轮播图图片"));
				}
			};
			var validateSpartParts = (rule, value, callback) => {
				let rules = value.every((item) => {
					return (
						item.model != "" &&
						item.quantity != "" &&
						item.spartMoney != "" &&
						item.partPicList[0] != undefined
					);
				});
				if (rules) {
					callback();
				} else {
					callback(new Error("商品信息不能为空"));
				}
			};
			var validatePartExplain = (rule, value, callback) => {
				let rules = value.every((item) => {
					return item != "";
				});
				if (rules && value[0] != undefined) {
					callback();
				} else {
					callback(new Error("请输入说明"));
				}
			};
			var validateDetails = (rule, value, callback) => {
				let rules = this.editor.getText(value) != "";
				if (rules) {
					callback();
				} else {
					callback(new Error("请输入说明"));
				}
			};
			return {
				index: 0,
				source: 1,
				oneLev: [],
				twoLev: [],
				form: {
					guid: "",
					oneLevelId: "",
					twoLevelId: "",
					tradeName: "",
					brand: "",
					picList: [],
					spartParts: [
						{
							partPicList: [],
							model: "",
							spartMoney: "",
							quantity: "",
						},
					],
					partExplain: [],
					details: "",
					deliveryMethod: 1,
					addressMoneyType: 1,
					addressMoneyMould: "",
				},
				picList2: [],
				rules: {
					oneLevelId: [{ required: true, message: "请输入一级分类", trigger: "blur" }],
					twoLevelId: [{ required: true, message: "请输入二级分类", trigger: "blur" }],
					tradeName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
					brand: [
						{
							required: true,
							validator: (rule, value, callback) => {
								let rules = this.form.brand != "";
								if (rules) {
									callback();
								} else {
									callback(new Error("请输入说明"));
								}
							},
							message: "请输入商品品牌",
							trigger: "change",
						},
					],
					picList: [
						{
							required: true,
							validator: validatePicList,
							message: "请上传商品轮播图图片",
							trigger: "blur",
						},
					],
					spartParts: [
						{
							required: true,
							validator: validateSpartParts,
							message: "信息不能为空",
							trigger: "blur",
						},
					],
					partExplain: [
						{
							type: "array",
							validator: validatePartExplain,
							required: true,
							message: "请输入说明",
							trigger: "blur",
						},
					],
					details: [
						{
							required: true,
							validator: validateDetails,
							message: "请输入详情描述",
							trigger: "blur",
						},
					],
					deliveryMethod: [{ required: true, message: "请选择配送方式", trigger: "change" }],
					addressMoneyType: [{ required: true, message: "请选择快递运费", trigger: "change" }],
					addressMoneyMould: [{ required: true, message: "此处不能为空", trigger: "change" }],
				},
				editor: null,
				html: "",
				centerDialogVisible: false,
				toolbarConfig: {},
				brandAddName: "",
				brandAddNameList: [],
				editorConfig: {
					MENU_CONF: {
						uploadImage: {
							server: "http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart",
							fieldName: "file",
							headers: {
								// accept: ".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff",
								token: String(localStorage.getItem("token")),
							},
							// maxFileSize: 10 * 1024 * 1024, // 10M
							// base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
							customInsert(res, insertFn) {
								// res 即服务端的返回结果
								let url = `http://58.33.34.10:10443/images/spart/${res.data.fileName}`;
								let alt = "";
								let href = "";
								insertFn(url, alt, href);
							},
							onBeforeUpload(file) {
								return file;
							},
							onProgress(progress) {},
							onSuccess(file, res) {},
						},
					},
				},
				mouldList: [],
				addressMoneyType_1: "",
				addressMoneyType_2: "",
				addressMoneyMould_1: "",
				addressMoneyMould_2: "",
			};
		},
		mounted() {
			this.source = localStorage.getItem("source");
			getSpartLevel().then((res) => {
				if (res.code == "0000") {
					this.oneLev = res.data || [];
				}
			});
			getSpartTwoLevelAll().then((res) => {
				if (res.code == "0000") {
					this.twoLev = res.data || [];
				}
			});
			getAddressMouldList().then((res) => {
				if (res.code == "0000") {
					this.mouldList = res.data || [];
				}
			});
			this.getSpartBandList();
			let params = { guid: this.$route.query.guid };
			this.getData(params);
		},
		beforeDestroy() {
			const editor = this.editor;
			if (editor == null) return;
			editor.destroy(); // 组件销毁时，及时销毁编辑器
		},
		methods: {
			getSpartBandList(params) {
				getSpartBandList(params).then((res) => {
					if (res.code == "0000") {
						this.brandAddNameList = res.data || [];
					}
				});
			},
			oneLvChange(id) {
				id = this.oneLev.filter((item) => item.oneLevelName == id);
				let params = { level: id[0].guid };
				let paramsBand = { keyword: id[0].guid };
				getSpartTwoLevel(params).then((res) => {
					if (res.code == "0000") {
						this.twoLev = res.data || [];
					}
				});
				this.getSpartBandList(paramsBand);
			},
			brandAdd() {
				let f = this.brandAddNameList.every((v) => v.value != this.brandAddName);
				if (!this.form.oneLevelId) {
					this.$message.error("请选择一级分类");
				} else {
					if (this.brandAddName && f) {
						let levelId = this.oneLev.filter((item) => item.oneLevelName == this.form.oneLevelId)[0]
							.guid;
						let params = {
							brand: this.brandAddName,
							levelId: levelId || "",
						};
						saveSpartBand(params).then((res) => {
							if (res.code == "0000") {
								this.brandAddName = "";
							}
						});
						this.getSpartBandList();
						this.brandAddName = "";
					} else {
						this.$message.error("品牌名称不能重复或为空");
					}
				}
			},
			yfmbAdd() {
				let params = {
					money: this.addressMoneyType_1,
					remark: "运费" + this.addressMoneyType_1 + "元," + this.addressMoneyType_2,
				};
				saveAddressMould(params).then((res) => {
					if (res.code == "0000") {
						this.centerDialogVisible = false;

						getAddressMouldList().then((res) => {
							if (res.code == "0000") {
								this.mouldList = res.data || [];
							}
						});
					}
				});
			},
			getData(params) {
				getSpartById(params).then((res) => {
					if (res.status == 200) {
						if (res.data.picList) {
							var picList = res.data.picList.map((item) => {
								return {
									response: {
										data: {
											fileName: item.fileName,
										},
									},
									url:
										this.source == 1
											? "http://58.33.34.10:10443/images/spart/" + item.fileName
											: "http://39.105.35.83:10443/images/spart/" + item.fileName,
								};
							});
						}
						if (res.data.spartParts) {
							res.data.spartParts.map((item, index, arr) => {
								if (item.partPicList) {
									arr[index].partPicList[0].url =
										this.source == 1
											? "http://58.33.34.10:10443/images/spart/" + item.partPicList[0].fileName
											: "http://39.105.35.83:10443/images/spart/" + item.partPicList[0].fileName;
								}
							});
						}
						let partExplain = res.data.partExplain.split("/").filter(Boolean);
						this.form.guid = res.data.guid || "";
						this.form.tradeName = res.data.tradeName || "";
						this.form.oneLevelId = res.data.oneLevelId || "";
						this.form.twoLevelId = res.data.twoLevelId || "";
						this.form.brand = res.data.brand || "";
						this.form.picList = picList || [];
						this.picList2 = res.data.picList || [];
						this.form.spartParts = res.data.spartParts || [];
						this.form.partExplain = partExplain || "";
						this.form.details = res.data.details || "";
						this.form.deliveryMethod = res.data.deliveryMethod || "";
						this.form.addressMoneyType = res.data.addressMoneyType || "";
						if (res.data.addressMoneyType == 1) {
							this.addressMoneyMould_1 = res.data.addressMoneyMould;
						} else {
							this.addressMoneyMould_2 = res.data.addressMoneyMould * 1;
						}
						this.form.addressMoneyMould = res.data.addressMoneyMould || "";
						this.editor.setHtml(res.data.details);
					}
				});
			},
			upLoadBefore(index) {
				this.index = index.$index;
			},
			storeImgDel(index) {
				let obj = { ...this.form.spartParts[index.$index] };
				obj.partPicList = [];
				this.$set(this.form.spartParts, index.$index, obj);
			},
			upLoadStore(info) {
				if (info.status == "success") {
					this.form.spartParts[this.index].partPicList = [
						{
							fileName: info.response.data.fileName,
							type: "spart",
							fileLog: 49,
							url: info.url,
							source: this.source,
						},
					];
				}
			},
			upLoadChange(info, list) {
				if (info.status == "success") {
					this.picList2 = list.map((item) => {
						return {
							fileName: item.response.data.fileName,
							type: "spart",
							fileLog: 48,
							source: this.source,
						};
					});
				}
			},
			storeDelete(info) {
				let arr = [...this.form.spartParts];
				this.form.spartParts = arr.filter((item, index) => index != info.$index);
			},
			storeListAdd() {
				let index = this.index++;
				this.form.spartParts.push({
					partPicList: [],
					model: "",
					spartMoney: "",
					quantity: "",
				});
			},
			partExplainAdd() {
				this.form.partExplain.push("");
			},
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
			editorChange(editor) {
				this.form.details = editor.getHtml();
			},
			onSubmit(info) {
				this.$refs["form"].validate((valid) => {
					if (valid && this.form.addressMoneyMould) {
						let params = { ...info } || {};
						params.partExplain = [...new Set(params.partExplain)].join("/");
						params.picList = this.picList2;
						params.spartParts.map((el, i, arr) => {
							delete arr[i].partPicList[0].url;
							delete arr[i].partPicList[0].status;
							delete arr[i].partPicList[0].uid;
							// this.source == 1
							// 	? "http://58.33.34.10:10443/images/spart/" +
							// 	  arr[i].partPicList[0].fileName
							// 	: "http://39.105.35.83:10443/images/shiptrade/" +
							// 	  arr[i].partPicList[0].fileName;
						});
						saveSpart(params).then((res) => {
							if (res.status == 200) this.$router.push("/workbench/spart/spartList");
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
		},
		watch: {
			addressMoneyMould_1(v) {
				this.form.addressMoneyMould = v;
			},
			addressMoneyMould_2(v) {
				this.form.addressMoneyMould = v;
			},
			"form.addressMoneyType"(v) {
				if (v == 1) {
					this.addressMoneyMould_2 = "";
				} else {
					this.addressMoneyMould_1 = "";
				}
			},
		},
	};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
	.spartEdit {
		.box {
			position: relative;
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			background-color: #ffffff;
			width: 100%;
			box-shadow: 0px 0px 5px rgb(235, 227, 227);
			.yuan {
				position: relative;
			}
			.yuan::after {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				content: "元";
				display: table;
			}
			.submitFix {
				width: 100%;
				position: fixed;
				left: 239px;
				bottom: 0;
				background-color: #ffffff;
			}
		}
		/deep/.el-upload {
			.el-icon-plus::after {
				margin: 0 auto;
				margin-top: 10%;
				font-size: 13px;
				content: "点击上传图片";
				display: table;
			}
		}
		.storeImgBox {
			display: grid;
			place-items: center;
			width: 150px;
			height: 150px;
			z-index: 9;
			border-radius: 10px;
			overflow: hidden;
			.storeImg {
				width: 150px;
				height: 150px;
			}
			.mask {
				position: absolute;
				width: 150px;
				height: 150px;
				background-color: #00000080;
				border-radius: 10px;
				opacity: 0;
			}
			i {
				position: absolute;
				font-size: 26px;
				opacity: 0;
				color: #ffffff;
				cursor: pointer;
			}
		}
		.storeImgBox:hover .mask {
			background-color: #00000080;
			opacity: 1;
			transition: all 0.5s;
		}
		.storeImgBox:hover .el-icon-delete {
			opacity: 1;
		}
		/deep/.el-table__header-wrapper {
			height: 1px;
		}
	}
</style>
