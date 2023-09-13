<template>
	<div class="workbench">
		<t-layout>
			<t-header>
				<t-head-menu value="item1" height="120px">
					<img
						slot="logo"
						class="logo"
						src="../../assets/workbench/sound.png"
						style="margin-left: 10px"
						alt="logo"
					/>
					<div
						class="goback"
						@click="gohome"
						style="width: 54px; height: 20px; display: flex; align-items: center; cursor: pointer"
					>
						<img
							style="width: 100%; height: 100%"
							src="../../assets/workbench/组 7333@2x.png"
							alt=""
						/>
					</div>
					<template #operations>
						<HeaderLoginImg></HeaderLoginImg>
						<div class="header_message">
							<t-badge :count="9">
								<div class="iconfont icon-NaviLeft-6-message"></div>
							</t-badge>
						</div>
					</template>
				</t-head-menu>
			</t-header>
			<t-layout>
				<t-aside style="border-top: 1px solid var(--component-border)">
					<t-menu @change="changeHandler">
						<!-- <div class="icon-NaviLeft-1-workbench">
							<div
								class="iconfont icon-NaviLeft-1-home"
								style="margin-right: 8px"
							>
								货主/货代工作台
							</div>
						</div> -->
						<t-menu-item value="workbench">
							<template #icon>
								<div class="iconfont icon-NaviLeft-1-home" style="margin-right: 8px"></div>
							</template>
							工作台首页
						</t-menu-item>
						<t-menu-item value="dataVerify">
							<template #icon>
								<div class="iconfont icon-NaviLeft-2-material" style="margin-right: 9px"></div>
							</template>
							资料认证
						</t-menu-item>
						<t-submenu title="我要发布" value="我要发布">
							<template #icon>
								<div class="iconfont icon-NaviLeft-3-release" style="margin-right: 9px"></div>
							</template>
							<!-- <t-menu-item value="release">我要发布</t-menu-item> -->
							<t-menu-item value="bulkCargo">发布散杂货</t-menu-item>
							<t-menu-item value="spart" v-if="status == 1">发布船舶供应</t-menu-item>
						</t-submenu>
						<!-- v-if="status == 1" -->
						<t-submenu title="船舶供应" value="船舶供应">
							<template #icon>
								<div class="iconfont icon-NaviLeft-10-attachment" style="margin-right: 9px"></div>
							</template>
							<t-menu-item v-if="status !== 1" value="applyStore">申请开店</t-menu-item>
							<t-menu-item v-if="status == 1" value="reSpart">发布船舶供应</t-menu-item>
							<t-menu-item v-if="status == 1" value="spartList">船舶供应商品列表</t-menu-item>
							<t-menu-item v-if="status == 1" value="myStore">我的店铺</t-menu-item>
						</t-submenu>
						<t-submenu title="订单列表" value="bulkShip">
							<template #icon>
								<div class="iconfont icon-NaviLeft-4-order" style="margin-right: 9px"></div>
							</template>
							<t-menu-item value="bulkShip">散杂货订单</t-menu-item>
							<t-menu-item value="container">集装箱订单</t-menu-item>
							<t-menu-item value="spartOrder">船舶供应订单</t-menu-item>
						</t-submenu>
						<t-menu-item value="发票管理">
							<template #icon>
								<div class="iconfont icon-NaviLeft-5-bill" style="margin-right: 9px"></div>
							</template>
							发票管理
						</t-menu-item>
						<t-menu-item value="userMessage">
							<template #icon>
								<div class="iconfont icon-NaviLeft-6-message" style="margin-right: 9px"></div>
							</template>
							消息区
						</t-menu-item>
						<t-menu-item value="在线留言">
							<template #icon>
								<div class="iconfont icon-NaviLeft-7-news" style="margin-right: 9px"></div>
							</template>
							在线留言
						</t-menu-item>
						<t-menu-item value="账号管理">
							<template #icon>
								<div class="iconfont icon-NaviLeft-8-account" style="margin-right: 9px"></div>
							</template>
							账号管理
						</t-menu-item>
					</t-menu>
				</t-aside>
				<t-layout>
					<t-content class="content">
						<div>
							<router-view></router-view>
						</div>
					</t-content>
				</t-layout>
			</t-layout>
		</t-layout>
	</div>
</template>

<script>
	// import { Icon } from 'tdesign-icons-vue'
	import { mapMutations } from "vuex";
	import { getIsMerchant } from "../../api/workbench";

	import HeaderLoginImg from "../../components/HeaderLoginImg.vue";
	export default {
		inject: ["reload"],
		data() {
			return {
				status: 0,
				accountId: "",
			};
		},
		components: {
			HeaderLoginImg,
		},
		created() {},
		mounted() {
			this.accountId = JSON.parse(localStorage.getItem("roleinfo")).accountId;
			getIsMerchant().then((res) => {
				this.status = res.data || 0;
			});
		},

		methods: {
			...mapMutations(["product"]),

			gohome() {
				this.$router.push("/");
				this.product(1);
			},
			changeHandler(active) {
				switch (active) {
					case "workbench":
						this.$router.push({
							path: "/workbench",
						});
						break;
					case "dataVerify":
						this.$router.push({
							path: "/workbench/dataVerify",
						});
						break;
					case "release":
						this.$router.push({
							path: "/workbench/release",
						});
						break;
					case "bulkCargo":
						this.$router.push({
							path: "/workbench/release/bulkCargo",
						});
						break;
					case "applyStore":
						this.$router.push({
							path: "/workbench/spart/realNameAut",
						});
						break;
					case "reSpart":
						this.$router.push({
							path: "/workbench/spart/reSpart",
						});
						break;
					case "spartList":
						this.$router.push({
							path: "/workbench/spart/spartList",
						});
						break;
					case "myStore":
						this.$router.push({
							path: "/workbench/spart/myStore",
						});
						break;
					case "bulkShip":
						this.$router.push({
							path: "/workbench/orderList/bulkShip",
						});
						break;
					case "container":
						this.$router.push({
							path: "/workbench/orderList/container",
						});
						break;
					case "userMessage":
						this.$router.push({
							path: "/workbench/UserMessage",
						});
						break;
					case "spartOrder":
						this.$router.push({
							path: "/workbench/spartOrder",
						});
						break;

					default:
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.workbench {
		.box {
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			background-color: #ffffff;
			width: 100%;
			box-shadow: 0px 0px 5px rgb(235, 227, 227);
		}
		/deep/.t-menu__operations-icon {
			margin-right: 0px;
		}
		.content {
			padding: 24px;
			.contentTitle {
				height: 100px;
				line-height: 100px;
				font-size: 22px;
			}
		}
		.icon-NaviLeft-1-workbench {
			background-color: #1890ff;
			height: 70px;
			font-size: 19px;
			color: #f5f7fa;
			text-align: center;
			line-height: 70px;
			border-radius: 5px;
			.icon-NaviLeft-1-home {
				font-size: 20px;
			}
		}
		.t-layout {
			// margin-top: 64px;
			/deep/.t-menu__item {
				height: 48px;
			}
			/deep/.t-menu__item--plain {
				height: 36px;
			}
			/deep/.t-default-menu {
				position: fixed;
			}
			.t-layout__sider {
				min-width: 232px;
			}
			.t-layout__header {
				z-index: 9;
				height: 64px;
				.t-menu {
					/deep/.t-head-menu__inner {
						position: fixed;
						width: 100%;
						background-color: #ffffff;
						box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
					}
					/deep/.t-menu__logo {
						margin-right: 18px;
					}
					/deep/.t-menu__operations-icon {
						padding: 6px 8px 8px 8px;
						cursor: pointer;
					}
					.t-menu__operations {
						.header_message {
							margin-left: 38px;
							margin-right: 72px;
							cursor: pointer;
							/deep/ .t-badge--circle {
								height: 14px;
								width: 16px;
								line-height: 12px;
								top: 23px;
							}
						}
					}
				}
			}
		}
	}
	/deep/.t-layout {
		background: #f5f7fa;
	}
	.t-layout__sider {
		height: calc(100vh - 70px);
		margin-top: 6px;
	}
</style>
