<template>
	<div class="h5Editor">
		<div class="content">
			<h1>招考内河一级游艇证B1A</h1>
			<img src="@/assets/h5share/分割线.png" alt="" />
			<Editor
				style="height: 100%; overflow-y: auto; padding-left: 10px"
				v-model="html"
				:defaultConfig="editorConfig"
				mode="default"
				min-height="500px"
				@onCreated="editorCreated"
			/>
		</div>
	</div>
</template>
<script>
	import { Editor } from "@wangeditor/editor-for-vue";
	export default {
		data() {
			return {
				editor: null,
				html: "",
				editorConfig: {
					readOnly: true,
				},
			};
		},
		mounted() {
			setTimeout(() => {
				this.editor.setHtml(
					"<p><span style='color: rgb(225, 60, 57)'>电子海图引擎 NR2008 ECDIS Kernel</span></p><img src='https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png' alt='' />",
				);
				this.editor.disable();
			}, 0);
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
			padding-top: 10px;
			margin: -20px auto;
			background-color: #ffffff;
			width: 95%;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
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
		}
		.foot {
			text-align: center;
			line-height: 44px;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			font-size: 18px;
			font-family: 苹方-简-中粗体, 苹方-简;
			font-weight: normal;
			color: #333333;
			width: 168px;
			height: 44px;
			background: #70dcff;
			border-radius: 22px;
		}
	}
</style>
