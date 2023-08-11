<template>
	<div class="spartEdit">
		<div class="product_bg">
			<div class="voyagetime">
				<div class="voyagetime_title">船舶供应</div>
			</div>
		</div>
		<div class="box">
			<Worktitle title="船舶供应详情"></Worktitle>
			<div class="header">
				<el-carousel style="width: 350px" height="350px">
					<el-carousel-item v-for="item in spartParts" :key="item">
						<img style="width: 100%; height: 100%" :src="item.partPicList[0].url" alt="" />
					</el-carousel-item>
				</el-carousel>
				<div class="right">
					<p class="title">
						{{ tradeName }}
					</p>
					<div class="price">
						¥<span>{{ money }}</span>
					</div>
					<div class="productCount">
						数量&nbsp;&nbsp;&nbsp;
						<el-input-number
							v-model="productCount"
							@change="productCountChange"
							:min="1"
							:max="10"
							label="描述文字"
						></el-input-number>
					</div>
					<div class="partExplain">
						说明&nbsp;&nbsp;&nbsp;
						<span style="margin-right: 30px" v-for="item in partExplain" :key="item">{{
							item
						}}</span>
					</div>
					<el-button type="danger" round>立即下单</el-button>
				</div>
			</div>
			<div class="info">
				<h2>宝贝详情</h2>
				<div class="infoBody">
					<div>
						一级分类: <span>{{ oneLevelId }}</span>
					</div>
					<div>
						二级分类: <span>{{ twoLevelId }}</span>
					</div>
					<div>
						商品名称: <span>{{ tradeName }}</span>
					</div>
					<div>
						商品品牌: <span>{{ brand }}</span>
					</div>
				</div>
			</div>
			<div class="foot">
				<h2>详情描述</h2>
				<Editor style="min-height: auto" @onCreated="editorCreated" />
			</div>
		</div>
		<div class="back" @click="back"><i class="el-icon-close"></i></div>
	</div>
</template>
<script>
	import Worktitle from "../../../components/WorkTitle.vue";
	import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
	import { getSpartById } from "../../../api/workbench";
	export default {
		components: { Worktitle, Editor, Toolbar },
		data() {
			return {
				editor: null,
				index: 0,
				source: 1,
				oneLev: [],
				twoLev: [],
				guid: "",
				oneLevelId: "",
				twoLevelId: "",
				tradeName: "",
				brand: "",
				picList: [],
				spartParts: [
					{
						partPicList: [],
						model: "",
						spartMoney: "",
						quantity: "",
					},
				],
				partExplain: [],
				details: "",
				deliveryMethod: 1,
				addressMoneyType: 1,
				addressMoneyMould: "",
				picList2: [],
				html: "",
				centerDialogVisible: false,
				toolbarConfig: {},
				brandAddName: "",
				brandAddNameList: [],
				mouldList: [],
				productCount: "",
				addressMoneyType_1: "",
				addressMoneyType_2: "",
				addressMoneyMould_1: "",
				addressMoneyMould_2: "",
			};
		},
		mounted() {
			this.source = localStorage.getItem("source");
			let params = { guid: this.$route.query.guid };
			this.getData(params);
		},
		methods: {
			editorCreated(editor) {
				this.editor = Object.seal(editor);
			},
			getData(params) {
				getSpartById(params).then((res) => {
					if (res.status == 200) {
						if (res.data.picList) {
							var picList = res.data.picList.map((item) => {
								return {
									response: {
										data: {
											fileName: item.fileName,
										},
									},
									url:
										this.source == 1
											? "http://58.33.34.10:10443/images/spart/" + item.fileName
											: "http://39.105.35.83:10443/images/spart/" + item.fileName,
								};
							});
						}
						if (res.data.spartParts) {
							res.data.spartParts.map((item, index, arr) => {
								if (item.partPicList) {
									arr[index].partPicList[0].url =
										this.source == 1
											? "http://58.33.34.10:10443/images/spart/" + item.partPicList[0].fileName
											: "http://39.105.35.83:10443/images/spart/" + item.partPicList[0].fileName;
								}
							});
						}
						let partExplain = res.data.partExplain.split("/").filter(Boolean);
						this.guid = res.data.guid || "";
						this.money = res.data.money || "";
						this.tradeName = res.data.tradeName || "";
						this.oneLevelId = res.data.oneLevelId || "";
						this.twoLevelId = res.data.twoLevelId || "";
						this.brand = res.data.brand || "";
						this.picList = picList || [];
						this.picList2 = res.data.picList || [];
						this.spartParts = res.data.spartParts || [];
						this.partExplain = partExplain || "";
						this.details = res.data.details || "";
						this.deliveryMethod = res.data.deliveryMethod || "";
						console.log(this.editor);
						this.editor.setHtml(res.data.details);
						this.editor.disable();
					}
				});
			},
			productCountChange() {},
			back() {
				this.$router.push({ path: "/product/shipSpart" });
			},
		},
	};
</script>
<style lang="scss" scoped>
	.spartEdit {
		position: relative;
		.product_bg {
			background: url("../../../assets/seckill/组 8492.png") no-repeat;
			background-size: cover;
			width: 100%;
			height: 164px;
			margin-bottom: 90px;
			.voyagetime {
				width: 1164px;
				margin: 0 auto;
				.voyagetime_title {
					padding: 48px 0 28px 0;
					font-size: 28px;
					font-weight: 400;
					line-height: 28px;
					color: #ffffff;
				}
				.vouagetime_seach {
					width: 1164px;
					height: 98px;
					backdrop-filter: blur(25px);
					background: rgba(250, 250, 250, 0.3);
					border-radius: 4px;
					padding: 21px 32px;
					box-sizing: border-box;
					display: flex;
					.home_search_input {
						width: 856px;
						height: 56px;
						flex-shrink: 0;
						background: #ffffff;
						border-radius: 6px 0px 0px 6px;
						display: flex;
						align-items: center;
						.search_input_launch {
							display: flex;
							.search_input_recoin {
								input {
									width: 80px;
									font-size: 16px;
									font-weight: 400;
									line-height: 24px;
									color: #909399;
									border: none;
									padding: 0;
								}
								input::-webkit-input-placeholder {
									color: #909399;
								}
								input:-moz-placeholder {
									/* FF 4-18 */
									color: #909399;
								}
								input::-moz-placeholder {
									/* FF 19+ */
									color: #909399;
								}
								input:focus {
									color: #909399;
									outline: none;
									background-color: transparent;
								}
							}
							i {
								width: 24px;
								height: 24px;
								margin: 0 10px 0 24px;
								background: url("../../../assets/seckill/蒙版组 294@2x.png") no-repeat;
								background-size: cover;
								display: inline-block;
							}
						}
						.search_input_arrows {
							margin-left: 78px;
							padding: 7px 4px 7px 8px;
							i {
								width: 52px;
								height: 6px;
								display: block;
								background: url("../../../assets/homepage/组 3785.png") no-repeat;
								background-size: cover;
							}
						}
						.search_input_terminus {
							display: flex;
							margin-left: 38px;
							// 处理input框
							.search_input_recoin {
								input {
									width: 80px;
									font-size: 16px;
									font-weight: 400;
									line-height: 24px;
									color: #909399;
									border: none;
									padding: 0;
								}
								input::-webkit-input-placeholder {
									color: #909399;
								}
								input:-moz-placeholder {
									/* FF 4-18 */
									color: #909399;
								}
								input::-moz-placeholder {
									/* FF 19+ */
									color: #909399;
								}
								input:focus {
									color: #909399;
									outline: none;
									background-color: transparent;
								}
							}
							i {
								width: 24px;
								height: 24px;
								margin-right: 10px;
								background: url("../../../assets/seckill/蒙版组 293@2x.png") no-repeat;
								background-size: cover;
								display: inline-block;
							}
						}
						.search_input_rectangle {
							width: 1px;
							height: 44px;
							background: #e2e2e2;
							margin: 0 68px 0 113px;
						}
						.search_input_elapsedtime {
							display: flex;
							div {
								font-size: 16px;
								font-weight: 400;
								line-height: 24px;
								color: #909399;
								cursor: pointer;
							}
							i {
								width: 24px;
								height: 24px;
								margin-right: 10px;
								background: url("../../../assets/seckill/蒙版组 297@2x.png") no-repeat;
								background-size: cover;
								display: inline-block;
							}
						}
					}
					.home_search_btn {
						background: #4791ff;
						border-radius: 0px 6px 6px 0px;
						padding: 18px 46px;
						font-size: 20px;
						font-weight: 400;
						line-height: 20px;
						color: #ffffff;
						cursor: pointer;
					}
				}
			}
		}
		.back {
			cursor: pointer;
			font-size: 30px;
			position: absolute;
			padding: 0px 2px;
			right: 10%;
			top: 10%;
			background-color: #bcbdc0;
			border-radius: 40px;
		}
		.box {
			margin: 0 auto;
			position: relative;
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			background-color: #ffffff;
			width: 70%;
			.header {
				display: flex;
				.right {
					margin-left: 20px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #7f7f7f;
					line-height: 18px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						color: #000;
						letter-spacing: 0;
						font-size: 20px;
						font-family: PingFang SC;
						font-weight: 900;
					}
					.price {
						color: #ff5000;
						font-size: 14px;
						span {
							font-size: 28px;
						}
					}
				}
			}
			.info {
				margin-top: 30px;
				.infoBody {
					width: 60%;
					margin: 0 auto;
					margin-top: 30px;
					font-family: PingFang SC;
					font-size: 14px;
					display: grid;
					grid-template-columns: repeat(3, 33%);
					grid-template-rows: repeat(2, 60px);
				}
			}
			.foot {
				h2 {
					margin-bottom: 30px;
				}
			}
		}
	}

	#editor—wrapper {
		border: none;
		z-index: 100;
		/* 按需定义 */
	}

	#toolbar-container {
		border-bottom: none;
	}
</style>
