<template>
	<div class="storeEdit">
		<div class="box">
			<Worktitle blueSty="store" title="修改店铺LOGO /形象"></Worktitle>(选填)
			<br />
			<el-upload
				action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
				list-type="picture-card"
				:on-preview="handlePictureCardPreview"
				:on-remove="handleRemove"
				limit="1"
			>
				<i class="el-icon-plus"></i>
			</el-upload>
			<br />
			<Worktitle blueSty="store" title="修改其他信息"></Worktitle>
			<div class="info">
				<el-form
					ref="form"
					:rules="rules"
					:model="form"
					label-width="200px"
					labelPosition="left"
				>
					<el-row :gutter="24" v-if="type == 1">
						<el-col :span="10">
							<el-form-item label="公司名称" prop="name">
								<el-input
									v-model="a"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="联系人" prop="name">
								<el-input
									v-model="a"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="联系电话" prop="name">
								<el-input
									v-model="a"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24" v-if="type == 1">
						<el-col :span="10">
							<el-form-item label="客服电话" prop="name">
								<el-input
									v-model="a"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24" v-if="type == 1">
						<el-col :span="10">
							<el-form-item label="公司地址" prop="name">
								<el-input
									v-model="a"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="10">
							<el-form-item label="店铺简介（选填）" prop="jj">
								<el-input
									v-model="a"
									type="textarea"
									placeholder=""
									size="normal"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-button
						style="margin: 0 auto"
						type="primary"
						size="default"
						@click="submit(form)"
						>确认提交</el-button
					>
					<el-button style="margin-left: 20px" size="default" @click="cancel()"
						>取消</el-button
					>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import Worktitle from "../../../../components/WorkTitle.vue";
	export default {
		props: ["editShow"],
		data() {
			return {
				type: 1,
				a: "",
				form: {},
				rules: {
					name: [
						{ required: true, message: "请输入活动名称", trigger: "blur" },
					],
				},
			};
		},
		components: { Worktitle },
		mounted() {},
		methods: {
			submit(form) {
				this.$emit("editShow", true);
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
