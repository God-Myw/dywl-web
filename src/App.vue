<template>
	<div id="app">
		<router-view v-if="isRouterAlive" />
	</div>
</template>
<script>
	// import axios from 'axios'
	export default {
		provide() {
			return {
				reload: this.reload,
			};
		},
		data() {
			return {
				clientSide: true,
				isRouterAlive: true,
			};
		},
		created() {
			// 判断当前是什么端
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				document
					.querySelector("body")
					.setAttribute("style", "font-family:' tyzt-public', Arial;background: #F1F3F5;");
				// document
				//   .querySelector("body")
				//   .setAttribute("style", "background: #f5f1f2;");
			} else {
				document.querySelector("body").setAttribute("style", "min-width: 1140px;");
			}
		},
		mounted() {},
		methods: {
			// 刷新当前页面
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function () {
					this.isRouterAlive = true;
				});
			},
		},
	};
</script>
<style lang="scss">
	body,
	ul,
	li,
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	img {
		padding: 0;
		margin: 0;
	}
	body {
		// min-width: 1140px; /*no*/
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
			"微软雅黑", Arial, sans-serif;
	}
	#app {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		li {
			list-style-type: none;
		}
		a {
			text-decoration: none;
		}
		i {
			font-style: normal;
		}
	}
</style>
