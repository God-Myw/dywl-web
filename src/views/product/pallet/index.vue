<template>
	<div class="product">
		<div class="product_bg">
			<div class="voyagetime">
				<div class="voyagetime_title" v-if="activeName == 'internal'">
					国内货盘
				</div>
				<div class="voyagetime_title" v-else>国际货盘</div>
				<div class="vouagetime_seach">
					<div class="home_search_input">
						<div class="search_input_launch">
							<i></i>
							<div class="search_input_recoin">
								<input
									v-model="bookingStart"
									type="text"
									placeholder="从哪里起运"
								/>
							</div>
						</div>
						<div class="search_input_arrows"><i></i></div>
						<div class="search_input_terminus">
							<i></i>
							<div class="search_input_recoin">
								<input
									v-model="bookingEnd"
									type="text"
									placeholder="货到哪里去"
								/>
							</div>
						</div>
						<div class="search_input_rectangle"></div>
						<div class="search_input_elapsedtime">
							<i></i>
							<div>货物名称</div>
						</div>
					</div>
					<div class="home_search_btn" @click="gohint">搜 索</div>
				</div>
			</div>
		</div>
		<div class="product_tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="Global Shipping" name="foreign"></el-tab-pane>
				<el-tab-pane label="国内货盘" name="internal"></el-tab-pane>
			</el-tabs>
			<!-- 国际货盘 -->
			<div v-if="activeName == 'foreign'" class="product_international">
				<ul v-loading="loading">
					<li v-for="(item, index) in foreignData" :key="item.guid">
						<div class="inter_item">
							<div class="inter_header">
								<div class="inter_header_l">
									<span class="inter_header_l_no"
										>Shipping No{{ item.palletNumber }}</span
									>
									<span class="inter_header_l_big" v-if="item.majorParts == 1"
										>重大件</span
									>
									<span
										class="inter_header_l_risk"
										v-if="item.goodsProperty == 1"
										>危险品</span
									>
									<span
										class="inter_header_l_chemicla"
										v-if="item.goodsProperty == 2"
										>化学品</span
									>
									<span
										class="inter_header_l_risk"
										v-if="item.goodsProperty == 3"
										>散装</span
									>
									<span
										class="inter_header_l_risk"
										v-if="item.goodsProperty == 4"
										>袋装</span
									>
								</div>
								<div class="inter_header_r">
									<span></span>
									<span>{{ item.createDate | renderTimeY }}</span>
								</div>
							</div>
							<div class="inter_list">
								<div class="inter_list_left" @click="toDetforeign(item.guid)">
									<div class="inter_list_z">
										<div>
											<span>Lay</span>
											<span>{{ item.loadDate | renderTime }}</span>
										</div>
										<div>
											<span>can</span>
											<span>{{ item.endDate | renderTime }}</span>
										</div>
									</div>
									<div class="inter_list_f"></div>
									<div class="inter_list_se">
										<div>
											<span></span>
											<span>{{ item.titleCnStart }}</span>
										</div>
										<div>
											<span></span>
											<span>{{ item.titleCnDes }}</span>
										</div>
									</div>
									<div class="inter_list_t">
										<div>Cargo name</div>
										<div>{{ item.titleCnPallet }}</div>
									</div>
									<div class="inter_list_o">
										<div>Cargo cbm</div>
										<div v-if="item.goodsVolume">{{ item.goodsVolume }}m³</div>
										<div v-else>--</div>
									</div>
									<div class="inter_list_s">
										<div>Cargo weight</div>
										<div v-if="item.goodsWeight">{{ item.goodsWeight }}吨</div>
										<div v-else>--</div>
									</div>
									·
								</div>

								<div class="inter_list_e">
									<div @click="toDetforeign(item.guid)">Details</div>
									<!-- <div @click="gohint">查看详情</div> -->
									<div @click="gohint">Booking</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!-- 国内货盘 -->
			<div v-if="activeName == 'internal'" class="product_domestic">
				<ul v-loading="loading">
					<li v-for="item in intePalletData" :key="item.guid">
						<div class="inter_item">
							<div class="inter_header">
								<div class="inter_header_l">
									<span class="inter_header_l_no"
										>货物编号：{{ item.palletNumber }}</span
									>
								</div>
								<div class="inter_header_r">
									<span></span>
									<span>{{ item.createDate | renderTimeY }}</span>
								</div>
							</div>
							<div class="inter_list">
								<div class="inter_list_left" @click="toDetinternal(item.guid)">
									<div class="inter_list_z">
										<div>
											<span>装货</span>
											<span>{{ item.loadDate | renderTime }}</span>
										</div>
										<div>
											<span>日期</span>
											<span>{{ item.endDate | renderTime }}</span>
										</div>
									</div>
									<div class="inter_list_f"></div>
									<div class="inter_list_se">
										<div>
											<span></span>
											<span>{{ item.titleCnStart }}</span>
										</div>
										<div>
											<span></span>
											<span>{{ item.titleCnDes }}</span>
										</div>
									</div>
									<div class="inter_list_t">
										<div>货物名称</div>
										<div>{{ item.titleCnPallet }}</div>
									</div>
									<div class="inter_list_s">
										<div>货物重量</div>
										<div v-if="item.goodsWeight">
											{{ item.goodsWeight }}-{{ item.goodsMaxWeight }}吨
										</div>
										<div v-else>--</div>
									</div>
								</div>

								<div class="inter_list_e">
									<div @click="toDetinternal(item.guid)">查看详情</div>
									<!-- <div @click="gohint">查看详情</div> -->
									<div @click="gohint">立即抢单</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="productBtn" class="product_btn" @click="addContainerList">
			<span>More</span>
		</div>
		<div v-else class="product_zw">已加载全部内容</div>
		<Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
	</div>
</template>
<script>
	import { getPalletListByWeb } from "../../../api/pallet";
	import Hint from "../../../components/hint.vue";
	export default {
		data() {
			return {
				loading: false,
				hintStutas: false,
				bookingStart: "",
				bookingEnd: "",
				activeName: "foreign",
				seckillData: [],
				productBtn: true,
				intePalletData: [],
				foreignData: [],
				pagedata: {
					currentPage: 1,
					pageSize: 10,
				},
				foreignpageSize: 10,
				internalpageSize: 10,
			};
		},
		components: {
			Hint,
		},
		mounted() {
			this.activeName = this.$route.query.active;
			this.nowpallet();
		},
		watch: {
			$route(to, from) {
				this.activeName = to.query.active;
				this.nowpallet();
			},
		},
		methods: {
			dighintStutas(stats) {
				this.hintStutas = stats;
			},
			gohint() {
				this.hintStutas = true;
			},
			handleClick(tab) {
				const query = JSON.parse(JSON.stringify(this.$route.query));
				query.active = this.activeName;
				this.$router.push({ path: this.$route.path, query });
			},
			nowpallet() {
				this.foreignpageSize = 10;
				this.internalpageSize = 10;
				this.productBtn = true;
				switch (this.activeName) {
					case "foreign":
						this.getPalletListfor();
						break;
					case "internal":
						this.getPalletListint();
						break;
				}
			},
			// 国内数据
			getPalletListint() {
				let Palletinternal = Object.assign(
					{
						keyword: "",
						internationalTransport: 0,
					},
					this.pagedata,
				);
				this.loading = true;
				getPalletListByWeb(Palletinternal).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						this.intePalletData = res.data.palletListByWeb.records;
					} else {
						this.intePalletData = [];
					}
				});
			},
			// 国外数据
			getPalletListfor() {
				let Palletforeign = Object.assign(
					{
						keyword: "",
						internationalTransport: 1,
					},
					this.pagedata,
				);
				this.loading = true;
				getPalletListByWeb(Palletforeign).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						this.foreignData = res.data.palletListByWeb.records;
					} else {
						this.foreignData = [];
					}
				});
			},
			// 查看更多
			addContainerList() {
				switch (this.activeName) {
					case "foreign":
						this.foreignpageSize += 8;
						this.addgetPalletListfor();
						break;
					case "internal":
						this.internalpageSize += 8;
						this.addgetPalletListint();
						break;
				}
			},
			addgetPalletListfor() {
				let Palletforeign = {
					keyword: "",
					internationalTransport: 1,
					currentPage: 1,
					pageSize: this.foreignpageSize,
				};
				this.loading = true;
				getPalletListByWeb(Palletforeign).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						this.foreignData = res.data.palletListByWeb.records;
						if (res.data.palletListByWeb.total <= this.foreignpageSize) {
							this.productBtn = false;
						}
					} else {
						this.foreignData = [];
					}
				});
			},
			addgetPalletListint() {
				let Palletforeign = {
					keyword: "",
					internationalTransport: 0,
					currentPage: 1,
					pageSize: this.internalpageSize,
				};
				this.loading = true;
				getPalletListByWeb(Palletforeign).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						this.intePalletData = res.data.palletListByWeb.records;
						if (res.data.palletListByWeb.total <= this.internalpageSize) {
							this.productBtn = false;
						}
					} else {
						this.intePalletData = [];
					}
				});
			},
			// 国内货盘详情
			toDetinternal(id) {
				this.$router.push({
					path: "/details/pallet/internal",
					query: { id: id },
				});
			},
			// 国际货盘详情
			toDetforeign(guid) {
				this.$router.push({
					path: "/details/pallet/foreign",
					query: { guid: guid },
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.product {
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
								background: url("../../../assets/seckill/蒙版组 294@2x.png")
									no-repeat;
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
								background: url("../../../assets/homepage/组 3785.png")
									no-repeat;
								background-size: cover;
							}
						}
						.search_input_terminus {
							display: flex;
							margin-left: 38px;
							// 处理input框
							.search_input_recoin {
								input {
									width: 120px;
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
								background: url("../../../assets/seckill/蒙版组 293@2x.png")
									no-repeat;
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
								background: url("../../../assets/seckill/组 8338@2x.png")
									no-repeat;
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
		.product_tabs {
			width: 1164px;
			margin: 0 auto;
			.product_international {
				margin-bottom: 50px;
				ul {
					li {
						box-sizing: border-box;
						border: 1px solid #ebeef5;
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						border-radius: 6px;
						margin-top: 12px;
						.inter_item {
							.inter_header {
								background: #f5f9ff;
								border-bottom: 1px solid #ebeef5;
								border-radius: 5px 5px 0px 0px;
								display: flex;
								justify-content: space-between;
								.inter_header_l {
									padding: 13px 0 6px 34px;
									display: flex;
									span {
										display: block;
									}
									.inter_header_l_no {
										font-size: 14px;
										font-weight: 400;
										line-height: 20px;
										color: #303133;
										margin-right: 28px;
									}
									.inter_header_l_big {
										border: 1px solid #51aeff;
										border-radius: 4px;
										padding: 3px 5px;
										font-size: 12px;
										font-weight: 400;
										line-height: 12px;
										color: #4791ff;
										margin-right: 8px;
									}
									.inter_header_l_risk {
										border: 1px solid #ff8f5d;
										border-radius: 4px;
										padding: 3px 5px;
										font-size: 12px;
										font-weight: 400;
										line-height: 12px;
										color: #ff6851;
										margin-right: 8px;
									}
									.inter_header_l_chemicla {
										border: 1px solid #ff84ce;
										border-radius: 4px;
										padding: 3px 5px;
										font-size: 12px;
										font-weight: 400;
										line-height: 12px;
										color: #e95bb0;
									}
								}
								.inter_header_r {
									padding: 18px 34px 7px 0;
									display: flex;
									span:nth-child(1) {
										display: block;
										background: url("../../../assets/voyagetime/4042@2x.png")
											no-repeat;
										background-size: 14px 14px;
										width: 14px;
										height: 14px;
										margin-right: 6px;
									}
									span:nth-child(2) {
										display: block;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #909399;
									}
								}
							}
							.inter_list {
								display: flex;
								justify-content: space-between;
								.inter_list_left {
									display: flex;
									cursor: pointer;
									.inter_list_z {
										padding: 20px 36px 32px 34px;
										div:nth-child(1) {
											display: flex;
											margin-bottom: 16px;
											span {
												display: block;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
											}
											span:nth-child(1) {
												color: #909399;
												margin-right: 16px;
											}
											span:nth-child(2) {
												color: #303133;
											}
										}
										div:nth-child(2) {
											display: flex;
											span {
												display: block;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
											}
											span:nth-child(1) {
												color: #909399;
												margin-right: 16px;
											}
											span:nth-child(2) {
												color: #303133;
											}
										}
									}
									.inter_list_f {
										width: 1px;
										height: 44px;
										background: #e4e7ed;
										margin: 25px 0 31px;
									}
									.inter_list_se {
										padding: 20px 0 28px 36px;
										div:nth-child(1) {
											display: flex;
											margin-bottom: 12px;
											span {
												display: block;
											}
											span:nth-child(1) {
												background: url("../../../assets/homepage/蒙版组 179@2x.png")
													no-repeat;
												background-size: 20px 20px;
												width: 20px;
												height: 20px;
												margin-right: 12px;
											}
											span:nth-child(2) {
												font-size: 18px;
												font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
													Arial;
												font-weight: 500;
												line-height: 20px;
												color: #303133;
												width: 162px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
											}
										}
										div:nth-child(2) {
											display: flex;
											span {
												display: block;
											}
											span:nth-child(1) {
												background: url("../../../assets/voyagetime/蒙版组 180@2x.png")
													no-repeat;
												background-size: 20px 20px;
												width: 20px;
												height: 20px;
												margin-right: 12px;
											}
											span:nth-child(2) {
												font-size: 18px;
												font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
													Arial;
												font-weight: 500;
												line-height: 20px;
												color: #303133;
												width: 162px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
											}
										}
									}
									.inter_list_t {
										padding: 23px 24px 29px 47px;
										div {
											width: 128px;
											text-align: center;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
										}
										div:nth-child(1) {
											font-size: 14px;
											font-weight: 400;
											line-height: 14px;
											color: #909399;
											margin-bottom: 18px;
										}
										div:nth-child(2) {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
										}
									}
									.inter_list_o {
										padding: 23px 24px 29px 0;
										div {
											width: 128px;
											text-align: center;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
										}
										div:nth-child(1) {
											font-size: 14px;
											font-weight: 400;
											line-height: 14px;
											color: #909399;
											margin-bottom: 18px;
										}
										div:nth-child(2) {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
										}
									}
									.inter_list_s {
										padding: 23px 0 29px 0;
										div {
											width: 128px;
											text-align: center;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
										}
										div:nth-child(1) {
											font-size: 14px;
											font-weight: 400;
											line-height: 14px;
											color: #909399;
											margin-bottom: 18px;
										}
										div:nth-child(2) {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
										}
									}
								}
								.inter_list_e {
									height: 36px;
									margin: 27px 34px 37px 0;
									display: flex;
									div:nth-child(1) {
										padding: 10px 20px;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #606266;
										cursor: pointer;
										margin-right: 12px;
										border-radius: 4px;
										border: 1px solid #dcdfe6;
										&:hover {
											background: #f5f9ff;
										}
									}
									div:nth-child(2) {
										background: #4791ff;
										padding: 11px 21px;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #ffffff;
										cursor: pointer;
										border-radius: 4px;
										&:hover {
											background: #3db4f2;
										}
									}
								}
							}
						}
					}
				}
			}
			.product_domestic {
				margin-bottom: 50px;
				ul {
					li {
						box-sizing: border-box;
						border: 1px solid #ebeef5;
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						border-radius: 6px;
						margin-top: 12px;
						.inter_item {
							.inter_header {
								background: #f5f9ff;
								border-bottom: 1px solid #ebeef5;
								border-radius: 5px 5px 0px 0px;
								display: flex;
								justify-content: space-between;
								.inter_header_l {
									padding: 13px 0 6px 34px;
									display: flex;
									span {
										display: block;
									}
									.inter_header_l_no {
										font-size: 14px;
										font-weight: 400;
										line-height: 20px;
										color: #303133;
										margin-right: 28px;
									}
								}
								.inter_header_r {
									padding: 18px 34px 7px 0;
									display: flex;
									span:nth-child(1) {
										display: block;
										background: url("../../../assets/voyagetime/4042@2x.png")
											no-repeat;
										background-size: 14px 14px;
										width: 14px;
										height: 14px;
										margin-right: 6px;
									}
									span:nth-child(2) {
										display: block;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #909399;
									}
								}
							}
							.inter_list {
								display: flex;
								justify-content: space-between;
								.inter_list_left {
									display: flex;
									cursor: pointer;
									.inter_list_z {
										padding: 20px 36px 32px 34px;
										div:nth-child(1) {
											display: flex;
											margin-bottom: 16px;
											span {
												display: block;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
											}
											span:nth-child(1) {
												color: #909399;
												margin-right: 16px;
											}
											span:nth-child(2) {
												color: #303133;
											}
										}
										div:nth-child(2) {
											display: flex;
											span {
												display: block;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
											}
											span:nth-child(1) {
												color: #909399;
												margin-right: 16px;
											}
											span:nth-child(2) {
												color: #303133;
											}
										}
									}
									.inter_list_f {
										width: 1px;
										height: 44px;
										background: #e4e7ed;
										margin: 25px 0 31px;
									}
									.inter_list_se {
										padding: 20px 0 28px 36px;
										div:nth-child(1) {
											display: flex;
											margin-bottom: 12px;
											span {
												display: block;
											}
											span:nth-child(1) {
												background: url("../../../assets/homepage/蒙版组 179@2x.png")
													no-repeat;
												background-size: 20px 20px;
												width: 20px;
												height: 20px;
												margin-right: 12px;
											}
											span:nth-child(2) {
												font-size: 18px;
												font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
													Arial;
												font-weight: 500;
												line-height: 20px;
												color: #303133;
												width: 162px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
											}
										}
										div:nth-child(2) {
											display: flex;
											span {
												display: block;
											}
											span:nth-child(1) {
												background: url("../../../assets/voyagetime/蒙版组 180@2x.png")
													no-repeat;
												background-size: 20px 20px;
												width: 20px;
												height: 20px;
												margin-right: 12px;
											}
											span:nth-child(2) {
												font-size: 18px;
												font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
													Arial;
												font-weight: 500;
												line-height: 20px;
												color: #303133;
												width: 162px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
											}
										}
									}
									.inter_list_t {
										padding: 23px 68px 29px 47px;
										div {
											width: 128px;
											text-align: center;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
										}
										div:nth-child(1) {
											font-size: 14px;
											line-height: 14px;
											font-weight: 400;
											color: #909399;
											margin-bottom: 18px;
										}
										div:nth-child(2) {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
										}
									}
									.inter_list_s {
										padding: 23px 0 29px 0;
										div {
											width: 128px;
											text-align: center;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
										}
										div:nth-child(1) {
											font-size: 14px;
											font-weight: 400;
											line-height: 14px;
											color: #909399;
											margin-bottom: 18px;
										}
										div:nth-child(2) {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
										}
									}
								}
								.inter_list_e {
									height: 36px;
									margin: 27px 34px 37px 0;
									display: flex;
									div:nth-child(1) {
										padding: 10px 20px;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #606266;
										cursor: pointer;
										margin-right: 12px;
										border: 1px solid #dcdfe6;
										border-radius: 4px;
										&:hover {
											background: #f5f9ff;
										}
									}
									div:nth-child(2) {
										background: #26a6e9;
										padding: 11px 21px;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #ffffff;
										border-radius: 4px;
										cursor: pointer;
										&:hover {
											background: #3db4f2;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		.product_btn {
			width: 1164px;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 80px;
			span {
				display: inline-block;
				border: 1px solid #4791ff;
				border-radius: 6px;
				color: #4791ff;
				font-size: 16px;
				line-height: 16px;
				font-weight: 400;
				padding: 13px 157px;
				cursor: pointer;
				&:hover {
					background: #4791ff;
					color: #fff;
				}
			}
		}
		.product_zw {
			width: 1164px;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 80px;
			font-size: 14px;
			font-weight: 400;
			line-height: 14px;
			color: #909399;
		}
	}
	/deep/.el-tabs__item {
		font-size: 16px;
		padding: 0 33px;
		color: #606266;
	}
	/deep/.el-tabs__item:hover {
		color: #3b7cfb;
	}
	/deep/.el-tabs__item.is-active {
		color: #3b7cfb;
	}
	/deep/.el-tabs__active-bar {
		background: #3b7cfb;
	}
	/deep/ .el-tabs__nav {
		margin-left: 20px;
	}
</style>
