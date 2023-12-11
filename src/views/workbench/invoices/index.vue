<template>
	<div class="message">
		<ul>
			总人数 :
			{{
				total
			}}
			<li v-for="item in parentPromotionNumberList" :key="item.accountId + item.phoneNumber">
				<div class="type">
					<img
						v-if="item.userType == 4"
						src="../../../assets/login/组 8641@2x.png"
						alt=""
						srcset=""
					/>
					<img v-else src="../../../assets/login/组 8646@2x.png" alt="" srcset="" />
				</div>
				<div>
					<p>
						{{ item.accountId }}
					</p>
					<p>
						{{ item.phoneNumber }}
						<span style="float: right">{{
							item.loginTime.replace(".000+0000", " ").replace("T", " ")
						}}</span>
					</p>
				</div>
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
				parentPromotionNumberList: [],
				pageSize: 10,
				total: 0,
			};
		},
		async mounted() {
			//新消息
			let parentPromotionNumberList = await axios({
				method: "get",
				url: "/api/sys/user/getUserPromotionList",
				params: {
					currentPage: 1,
					pageSize: this.pageSize,
				},
				headers: {
					token: localStorage.getItem("token") || "",
				},
			});
			this.total = parentPromotionNumberList.data.data.sum
			this.parentPromotionNumberList =
				parentPromotionNumberList.data.data.parentPromotionNumberList || 0;
		},
		methods: {
			async getMore() {
				this.pageSize += 5;
				let parentPromotionNumberList = await axios({
					method: "get",
					url: "/api/sys/user/getUserPromotionList",
					params: {
						currentPage: 1,
						pageSize: this.pageSize,
					},
					headers: {
						token: localStorage.getItem("token") || "",
					},
				});
				this.parentPromotionNumberList =
					parentPromotionNumberList.data.data.parentPromotionNumberList || 0;
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
			font-size: 16px;
			li {
				display: flex;
				padding: 20px;
				border-radius: 5px;
				margin: 30px auto;
				background-color: #ffffff;
				box-shadow: 0px 0px 5px rgb(235, 227, 227);
				.type {
					margin-right: 20px;
				}
				p:nth-child(1) {
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 20px;
				}
				p:nth-child(2) {
					font-size: 16px;
				}
				div:nth-child(2) {
					width: 100%;
				}
			}
		}
		.el-button {
			margin: 0px auto;
		}
	}
</style>
