<template>
	<div class="message">该功能升级维护中...</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				userMessag: [],
				pageSize: 10,
			};
		},
		mounted() {
			//新消息
		},
		methods: {},
	};
</script>

<style lang="scss" scoped>
	.message {
		font-size: 20px;
	}
</style>
