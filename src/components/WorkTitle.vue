<template>
	<div class="reSpart">
		<div :class="this.$props.blueSty == 'store' ? 'title' : ''">
			{{ this.$props.title }}
		</div>
	</div>
</template>
<script>
	export default {
		props: ["title", "blueSty"],
		data() {
			return {};
		},
		mounted() {},
	};
</script>
<style lang="scss" scoped>
	.reSpart {
		display: inline-block;
		height: 100px;
		line-height: 100px;
		font-size: 21px;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
		font-weight: bold;
		color: #333333;
		.title {
			position: relative;
			padding-left: 11px;
			display: flex;
			align-items: center;
		}
		.title::before {
			position: absolute;
			left: 0;
			content: "";
			width: 5px;
			height: 21px;
			background: #0052d9;
			border-radius: 3px 3px 3px 3px;
		}
	}
</style>
