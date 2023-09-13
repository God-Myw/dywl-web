<template>
	<div class="myStore">
		<!-- <Worktitle title="工作台首页"></Worktitle> -->
		<div class="box roleinfo">
			<div class="first">
				<div class="l">
					<img src="https://www.oym56lm.com/api/avatar/default.jpg?v=1692588575" alt="" />
				</div>
				<div class="r">
					<p>{{ name }} ({{ accountId }})</p>
					<p>{{ phoneNumber }}</p>
					<p>{{ userType }}</p>
				</div>
			</div>
			<div class="second">
				<p>我的账户 : ￥{{ moneySum }}</p>
				<p>&nbsp;</p>
				<p>我的下级 : 总人数 {{ userRebate }}人</p>
			</div>
			<div class="three">
				<ul>
					<li>
						<div class="top">新会话</div>
						<div class="foot">0</div>
					</li>
					<li>
						<div class="top">新消息</div>
						<div class="foot">0</div>
					</li>
					<li>
						<div class="top">可用资金</div>
						<div class="foot">￥{{ moneySum }}</div>
					</li>
					<li>
						<div class="top">锁定资金</div>
						<div class="foot">0</div>
					</li>
					<li>
						<div class="top">商品数量</div>
						<div class="foot">{{ spartNum }}</div>
					</li>
				</ul>
			</div>
			<div class="four">
				<ul>
					<li v-for="item in storeList" :key="item.guid">
						<div class="top">
							<img
								:src="
									source == 1
										? 'http://58.33.34.10:10443/images/spart/' + item.fileName
										: 'http://39.105.35.83:10443/images/spart/' + item.fileName
								"
							/>
						</div>
						<div class="foot">{{ item.tradeName }}</div>
					</li>
				</ul>
			</div>
		</div>
		<ul>
			<li style="background: #27a9e3" @click="bulkCargo">
				<div class="iconfont icon-NaviLeft-3-release" style="margin-right: 9px"></div>
				发布散杂货
			</li>
			<li style="background: #28b779; width: 30%" @click="reSpart">
				<div class="iconfont icon-NaviLeft-10-attachment" style="margin-right: 9px"></div>
				发布船舶供应
			</li>
			<li style="background: #ffb848" @click="spartList">
				<div class="iconfont icon-NaviLeft-4-order" style="margin-right: 9px"></div>
				船舶供应商品列表
			</li>
			<li style="background: #da542e" @click="myStore">
				<div class="iconfont icon-NaviLeft-10-attachment" style="margin-right: 9px"></div>
				我的店铺
			</li>
			<li style="background: #2255a4" @click="spartOrder">
				<div class="iconfont icon-NaviLeft-4-order" style="margin-right: 9px"></div>
				订单管理
			</li>
			<li style="background: #da542e">
				<div class="iconfont icon-NaviLeft-5-bill" style="margin-right: 9px"></div>
				发票管理
			</li>
			<li style="background: #9954a4" @click="userMessage">
				<div class="iconfont icon-NaviLeft-6-message" style="margin-right: 9px"></div>
				消息区
			</li>
			<li style="background: #95a9e3; width: 30%">
				<div class="iconfont icon-NaviLeft-8-account" style="margin-right: 9px"></div>
				账号管理
			</li>
			<li style="background: #05a9e3" @click="dataVerify">
				<div class="iconfont iconfont icon-NaviLeft-2-material"></div>
				资料认证
			</li>
			<li style="background: #28b779">
				<div class="iconfont icon-NaviLeft-1-home" style="margin-right: 9px"></div>
				首页
			</li>
		</ul>
		<div class="box zixun">
			<div class="title">
				<img
					src="https://www.oym56lm.com/file/static/skin/aoma_v2/images/member-business-icon.png"
				/>
				<span>专属业务顾问</span>
			</div>
			<div class="adviser-menu">
				<div class="l">
					<img src="/img/蒙版组 257@2x.c5bac97f.png" alt="" />
				</div>
				<div class="r">
					<p>上海道裕物流科技有限公司</p>
					<p>电话:(+86) 400-9009-618</p>
					<p>邮箱:lhsco@luhaisco.com</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Worktitle from "../../../components/WorkTitle.vue";
	import axios from "axios";
	import { getSpartList } from "../../../api/workbench";
	export default {
		data() {
			return {
				name: "",
				accountId: "",
				phoneNumber: "",
				userType: "",
				moneySum: "",
				spartNum: "",
				storeList: [],
				userMessag: [],
				source: 1,
				userRebate: 0,
			};
		},
		components: { Worktitle },
		mounted() {
			this.source = localStorage.getItem("source");
			let roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
			this.name = roleinfo.name;
			this.accountId = roleinfo.accountId;
			this.phoneNumber = roleinfo.phoneNumber;
			this.userType = roleinfo.userType == 4 ? "货主" : "船东";
			this.getData();
		},
		methods: {
			async getData() {
				//我的账户
				let moneySum = await axios({
					method: "get",
					url: "/api/business/userRebate/getUserRebateList",
					params: {
						currentPage: 1,
						pageSize: 10,
					},
					headers: {
						token: localStorage.getItem("token") || "dcd43c33-2fb9-4f66-b1a3-a5ab027e9ce1",
					},
				});
				this.moneySum = moneySum.data.data.moneySum.toFixed(3);
				//我的下级
				let userRebate = await axios({
					method: "get",
					url: "/api/sys/user/getUserPromotionList",
					headers: {
						token: localStorage.getItem("token") || "dcd43c33-2fb9-4f66-b1a3-a5ab027e9ce1",
					},
				});
				this.userRebate = userRebate.data.data.userRebate || 0;
				//新消息
				let userMessag = await axios({
					method: "get",
					url: "/api/business/messageMould/getUserMessage",
					params: {
						currentPage: 1,
						pageSize: 10,
					},
					headers: {
						token: localStorage.getItem("token") || "dcd43c33-2fb9-4f66-b1a3-a5ab027e9ce1",
					},
				});
				this.userMessag = userMessag.data.data.result || 0;
				let params = {
					number: "",
					tradeName: "",
					oneLevelId: "",
					twoLevelId: "",
					shelf: "",
					currentPage: 1,
					pageSize: 10,
				};
				//商品列表
				getSpartList(params).then((res) => {
					if (res.status == 200) {
						this.spartNum = res.data.total;
						this.storeList = res.data.records.splice(0, 6);
					}
				});
			},
			bulkCargo() {
				this.$router.push("/workbench/release/bulkCargo");
			},
			reSpart() {
				this.$router.push("/workbench/spart/reSpart");
			},
			spartList() {
				this.$router.push("/workbench/spart/spartList");
			},
			myStore() {
				this.$router.push("/workbench/spart/myStore");
			},
			spartOrder() {
				this.$router.push("/workbench/spartOrder");
			},
			userMessage() {
				this.$router.push("/workbench/UserMessage");
			},
			dataVerify() {
				this.$router.push("/workbench/dataVerify");
			},
			tohome() {
				this.$router.push("/index");
			},
		},
	};
</script>
<style lang="scss" scoped>
	.box {
		padding: 20px;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color: #ffffff;
		width: 100%;
		box-shadow: 0px 0px 5px rgb(235, 227, 227);
	}
	.roleinfo {
		display: grid;
		height: 320px;
		grid-template-columns: repeat(2, 50%);
		grid-template-rows: 50% 50%;
		.first {
			display: flex;
			.r {
				margin-left: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
		.second {
			padding-left: 20px;
			border-left: rgb(199, 193, 193) 2px dotted;
		}
		.three,
		.four {
			padding-top: 20px;
			border-top: rgb(211, 204, 204) 1px solid;
		}
		.three {
			background: url("https://www.oym56lm.com/file/static/skin/aoma_v2/images/member-center-index-bgpic.png")
				0% 50% no-repeat;
			background-size: 100%;
			ul {
				display: flex;
				justify-content: space-between;
				li {
					height: 100%;
					color: #333;
					.top {
						margin-bottom: 10px;
					}
				}
			}
		}
		.four {
			ul {
				margin: 0;
				display: flex;
				justify-content: space-between;
				li {
					margin: 0;
					text-align: center;
					.top {
						margin: 0 auto 10px;
						height: 70px;
						width: 70px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.foot {
						color: rgb(0, 0, 0);
					}
				}
			}
		}
		p {
			color: #333;
			font-size: 15px;
			font-weight: bold;
		}
	}
	ul {
		margin: 10px 0px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		li {
			width: 15%;
			height: 120px;
			margin: 20px 10px;
			color: #fff;
			font-size: 18px;
			text-align: center;
			cursor: pointer;
			.iconfont {
				margin-bottom: 10px;
				margin-top: 30px;
			}
		}
	}
	.zixun {
		.title {
			img {
				vertical-align: top;
				margin-right: 10px;
			}
			span {
				color: #333;
				font-size: 20px;
				font-weight: bold;
			}
		}
		.adviser-menu {
			display: flex;
			padding-top: 50px;
			.l {
				img {
					width: 100px;
					height: 100px;
					border-radius: 100px;
				}
			}
			.r {
				margin-left: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				p {
					color: #333;
					font-size: 15px;
					font-weight: bold;
				}
			}
		}
	}
</style>
