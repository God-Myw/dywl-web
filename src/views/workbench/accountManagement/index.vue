<template>
	<div class="message">
		<div class="myaccount">
			<div class="title">我的账户</div>
			<div class="moneySum">￥{{ moneySum.toFixed(3) }}</div>
		</div>
		<ul>
			<li v-for="item in userRebateList" :key="item.accountId + item.phoneNumber">
				<p>
					账户返利 ({{ item.phoneNumber }})
					<span style="float: right; color: red">+ {{ item.money }}</span>
				</p>
				<p>
					流水号 : {{ item.serialNumber }}
					<span style="float: right">{{
						item.createDate.replace("T", " ").replace(".000+0000", " ")
					}}</span>
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
				userRebateList: [],
				pageSize: 10,
				moneySum: 0,
			};
		},
		async mounted() {
			//新消息
			let userRebateList = await axios({
				method: "get",
				url: "/api/business/userRebate/getUserRebateList",
				params: {
					currentPage: 1,
					pageSize: this.pageSize,
				},
				headers: {
					token: localStorage.getItem("token") || "",
				},
			});
			this.moneySum = userRebateList.data.data.moneySum;
			this.userRebateList = userRebateList.data.data.userRebateList || 0;
		},
		methods: {
			async getMore() {
				this.pageSize += 5;
				let userRebateList = await axios({
					method: "get",
					url: "/api/business/userRebate/getUserRebateList",
					params: {
						currentPage: 1,
						pageSize: this.pageSize,
					},
					headers: {
						token: localStorage.getItem("token") || "",
					},
				});
				this.userRebateList = userRebateList.data.data.userRebateList || 0;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.message {
		display: flex;
		flex-direction: column;
		justify-content: center;
		.myaccount {
			text-align: center;
			background-color: rgb(5, 169, 227);
			color: #ffffff;
			font-weight: bold;
			padding: 20px 0px;
			.title {
				font-size: 20px;
				margin-bottom: 20px;
			}
			.moneySum {
				font-size: 30px;
			}
		}
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
