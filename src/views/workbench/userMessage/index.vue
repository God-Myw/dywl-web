<template>
	<div class="message">
		<ul>
			<li v-for="item in userMessag" :key="item.content + item.endDateFormat">
				<p>
					{{ item.title }}
				</p>
				<p>
					{{ item.content }}
					<span style="float: right">{{ item.endDateFormat }}</span>
				</p>
			</li>
		</ul>
		<el-button type="primary" round @click="getMore">加载更多</el-button>
	</div>
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
		async mounted() {
			//新消息
			let userMessag = await axios({
				method: "get",
				url: "/api/business/messageMould/getUserMessage",
				params: {
					currentPage: 1,
					pageSize: this.pageSize,
				},
				headers: {
					token: localStorage.getItem("token") || "",
				},
			});
			this.userMessag = userMessag.data.data.result || 0;
		},
		methods: {
			async getMore() {
				this.pageSize += 5;
				let userMessag = await axios({
					method: "get",
					url: "/api/business/messageMould/getUserMessage",
					params: {
						currentPage: 1,
						pageSize: this.pageSize,
					},
					headers: {
						token: localStorage.getItem("token") || "",
					},
				});
				this.userMessag = userMessag.data.data.result || 0;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.message {
		display: flex;
		flex-direction: column;
		justify-content: center;
		ul {
			li {
				padding: 20px;
				border-radius: 5px;
				margin: 30px auto;
				background-color: #ffffff;
				box-shadow: 0px 0px 5px rgb(235, 227, 227);
				p:nth-child(1) {
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 20px;
				}
				p:nth-child(2) {
					font-size: 16px;
				}
			}
		}
		.el-button {
			margin: 0px auto;
		}
	}
</style>
