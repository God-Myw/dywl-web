<template>
	<div class="h5Editor">
		<div class="content">
			<h1>{{ title }}</h1>
			<img src="@/assets/h5share/分割线.png" alt="" />
			<Editor
				style="height: 100%; overflow-y: auto; padding-left: 10px"
				v-model="html"
				:defaultConfig="editorConfig"
				mode="default"
				min-height="500px"
				@onCreated="editorCreated"
			/>
			<div class="foot">立即报名</div>
		</div>
	</div>
</template>
<script>
	import { Editor } from "@wangeditor/editor-for-vue";
	import { webGetWXDetail, getCultivateById } from "../../api/h5share";
	export default {
		data() {
			return {
				editor: null,
				html: "",
				title: "",
				guid: "",
				editorConfig: {
					readOnly: true,
				},
			};
		},
		mounted() {
			this.guid = new URLSearchParams(window.location.href.split("?")[1]).get("guid");
			let params = { guid: this.guid };
			 getCultivateById(params).then((res) => {
				if (res.code == "0000") {
					this.title = res.data.title;
					this.editor.setHtml(res.data.content);
				}
			});
		},
		methods: {
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
		},
		beforeDestroy() {
			const editor = this.editor;
			if (editor == null) return;
			editor.destroy(); // 组件销毁时，及时销毁编辑器
		},
		components: { Editor },
	};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
	.h5Editor {
		.header {
			background: url("../../assets/h5share/船员培训.png");
			background-size: 100%;
			height: 270px;
			img {
				width: 100%;
			}
		}
		.content {
			position: relative;
			padding: 10px 0px 30px;
			margin: auto;
			background-color: #ffffff;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
			}
			h1 {
				margin-left: 20px;
				font-size: 17px;
				font-family: Alimama ShuHeiTi-Bold, Alimama ShuHeiTi;
				font-weight: bold;
				color: #333333;
			}
			.foot {
				text-align: center;
				line-height: 28px;
				position: absolute;
				right: 18px;
				bottom: 18px;
				font-size: 14px;
				font-family: 苹方-简-中粗体, 苹方-简;
				font-weight: 700;
				color: #333333;
				width: 94px;
				height: 28px;
				background: #70dcff;
				border-radius: 22px;
			}
		}
	}
</style>
