<template>
	<div class="det_internal">
		<div class="internal_bg">
			<div class="internal">
				<div class="title">国际货运详情</div>
				<div class="issue_time">
					<span>发布时间</span>
					<span></span>
					<span>{{ detailData.create_date | renderTimeY }}</span>
				</div>
				<div class="transport">
					<div class="transport_title">Shipping Details</div>
					<div class="transport_cont">
						<div class="transport_cont_l">
							<div>
								<span>L/port</span>
								<span></span>
								<span>{{ detailData.titleCnStart }}</span>
							</div>
							<div></div>
							<div>
								<span>D/port</span>
								<span></span>
								<span>{{ detailData.titleCnDes }}</span>
							</div>
							<div>
								<span>Laycan</span>
								<span>{{ detailData.loadDate | renderTimeY }}</span>
							</div>
							<div>
								<span>Laycan</span>
								<span>{{ detailData.endDate | renderTimeY }}</span>
							</div>
						</div>
						<div class="transport_cont_r">
							<div><span></span><span>Contact us</span></div>
							<div>Booking</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cargo">
			<div class="cargo_title">
				<span>cargo details</span>
				<span class="cargo_title_great" v-if="detailData.majorParts == 1"
					>重大件</span
				>
				<span class="cargo_title_risk" v-if="detailData.goodsProperty == 1"
					>危险品</span
				>
				<span class="cargo_title_risk" v-if="detailData.goodsProperty == 2"
					>化学品</span
				>
				<span class="cargo_title_risk" v-if="detailData.goodsProperty == 3"
					>散装</span
				>
				<span class="cargo_title_risk" v-if="detailData.goodsProperty == 4"
					>袋装</span
				>
			</div>
			<div class="cargo_name">
				<span>Cargo name</span>
				<span>{{ detailData.titleCnPallet }}</span>
			</div>
			<div class="cargo_info">
				<div class="cargo_info_l">
					<div class="cargo_number">
						<span>Cargo code</span>
						<span>{{ detailData.palletNumber }}</span>
					</div>
					<div class="cargo_location">
						<span>Position</span>
						<span v-if="detailData.location == 0">舱内</span>
						<span v-if="detailData.location == 1">甲板</span>
						<span v-if="detailData.location == 2">舱内/甲板</span>
					</div>
				</div>
				<div class="cargo_info_r">
					<div class="cargo_weight">
						<span>Cargo weight</span>
						<span>{{ detailData.goodsWeight }}吨</span>
					</div>
					<div class="cargo_volume">
						<span>Cargo cbm</span>
						<span>{{ detailData.goodsVolume }}m³</span>
					</div>
					<div class="cargo_character">
						<span>packing</span>
						<span v-if="detailData.goodsProperty == 0">通货物</span>
						<span v-if="detailData.goodsProperty == 1">危险品</span>
						<span v-if="detailData.goodsProperty == 2">化学品</span>
						<span v-if="detailData.goodsProperty == 3">散装</span>
						<span v-if="detailData.goodsProperty == 4">袋装</span>
					</div>
				</div>
			</div>
			<div class="cargo_brokerage">
				<span>Commission</span>
				<span
					>Add.com
					<i style="color: #4791ff">{{ detailData.addCommission }}</i> + com
					<i style="color: #4791ff">{{ detailData.commission }}</i></span
				>
			</div>
			<div class="transport_remark">
				<span>remark</span>
				<span v-if="detailData.remark">{{ detailData.remark }}</span>
				<span v-else>无</span>
			</div>
			<div class="transport_cargolist">
				<div class="cargolist_title">Cargolist</div>
				<div class="cargolist_img">
					<div class="img_border" v-if="srcList.length != 0">
						<el-image
							style="width: 100px; height: 100px"
							v-for="(ite, idx) in srcList"
							:key="idx"
							:src="ite"
							:preview-src-list="ite.split()"
						>
						</el-image>
					</div>
					<el-image v-else>
						<div slot="error" class="image-slot">
							<i
								class="el-icon-picture-outline"
								style="font-size: 30px; color: #c4c5c8; padding: 35px 35px"
							></i>
						</div>
					</el-image>
				</div>
			</div>
		</div>
		<div class="intention">
			<div class="intention_title">chrtr's fixing idea & L/D term</div>
			<div class="intention_price">
				<span>Chrtr'sfixingidea</span>
				<span
					><i style="color: #4791ff">${{ detailData.intentionMoney }}</i>
					USD</span
				>
			</div>
			<div class="intention_price">
				<span>L/Dterm</span>
				<span>{{ detailData.intentClause }}</span>
			</div>
			<div class="intention_price">
				<span>L/rate</span>
				<span>{{ detailData.loadingRate }}%</span>
			</div>
			<div class="intention_price">
				<span>D/rate</span>
				<span>{{ detailData.unloadingRate }}%</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { getSharetPalletInfo } from "../../../api/pallet";
	export default {
		data() {
			return {
				detailData: [],
				srcList: [],
				// srcList: [
				//   require("../../../assets/voyagetime/24be2e0fb78fccebeaaf28720b9ec7c.jpg"),
				//   require("../../../assets/voyagetime/498529453a2c2c95ee5d0a59b5a14e8.jpg"),
				// ],
			};
		},
		mounted() {
			this.getDetail();
		},
		methods: {
			getDetail() {
				getSharetPalletInfo(this.$route.query.guid).then((res) => {
					if (res.code == "0000") {
						this.detailData = res.data.pallet;
						res.data.palletFileList.map((item) => {
							this.srcList.push(
								"http://58.33.34.10:10443/images/" +
									item.type +
									"/" +
									item.fileName,
							);
						});
					} else {
					}
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	/deep/ .el-image {
		border: 1px solid #edf0f6;
		border-radius: 4px;
		margin-right: 12px;
		width: 100px;
		height: 100px;
		position: relative;
		cursor: pointer;
	}
	/deep/ .el-image:hover::after {
		content: "";
		background: url("../../../assets/voyagetime/组 8213@2x.png") no-repeat;
		background-size: 100% 100%;
		width: 32px;
		height: 32px;
		position: absolute;
		right: 6px;
		top: 6px;
	}
	.det_internal {
		background: #f5f7f9;
		padding-bottom: 100px;
		.internal_bg {
			background: #f5f7f9 url("../../../assets/seckill/组 8098.jpg") no-repeat;
			background-size: 100% 200px;
			width: 100%;
			// height: 348px;
			margin-bottom: 8px;
			.internal {
				width: 1164px;
				margin: 0 auto;
				.title {
					font-size: 32px;
					font-weight: 400;
					line-height: 32px;
					color: #ffffff;
					padding: 66px 0 14px;
				}
				.issue_time {
					display: flex;
					flex-direction: row-reverse;
					margin-bottom: 12px;
					span {
						display: block;
						font-size: 14px;
						font-weight: 400;
						line-height: 14px;
						color: #ffffff;
						opacity: 0.8;
					}
					span:nth-child(2) {
						background: url("../../../assets/seckill/路径 4042@2x (1).png")
							no-repeat;
						background-size: 100% 100%;
						width: 14px;
						height: 14px;
						margin: 0 6px 0 10px;
					}
				}
				.transport {
					box-sizing: border-box;
					background: rgb(255, 255, 255);
					border: 1px solid #ebeef5;
					border-radius: 6px;
					width: 1164px;
					margin: 0 auto;
					padding: 0 39px 19px 35px;
					.transport_title {
						font-size: 18px;
						font-weight: 500;
						line-height: 18px;
						height: 18px;
						color: #303133;
						margin: 27px 0 31px 0;
						font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
					}
					.transport_cont {
						display: flex;
						justify-content: space-between;
						.transport_cont_l {
							div:nth-child(1) {
								display: flex;
								span {
									display: block;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 118px;
									padding: 5px 0 3px 0;
								}
								span:nth-child(2) {
									background: url("../../../assets/homepage/蒙版组 179@2x.png")
										no-repeat;
									background-size: 100% 100%;
									width: 20px;
									height: 20px;
									margin: 1px 0 1px 0;
									margin-right: 12px;
								}
								span:nth-child(3) {
									font-size: 22px;
									font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
										Arial;
									font-weight: 500;
									line-height: 22px;
									color: #303133;
								}
							}
							div:nth-child(2) {
								width: 0px;
								height: 14px;
								border-left: 1px dashed #c0c4cc;
								margin-left: 170px;
							}
							div:nth-child(3) {
								display: flex;
								margin-bottom: 43px;
								span {
									display: block;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 118px;
									padding: 5px 0 3px 0;
								}
								span:nth-child(2) {
									background: url("../../../assets/homepage/蒙版组 180@2x.png")
										no-repeat;
									background-size: 100% 100%;
									width: 20px;
									height: 20px;
									margin: 1px 0 1px 0;
									margin-right: 12px;
								}
								span:nth-child(3) {
									font-size: 22px;
									font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
										Arial;
									font-weight: 500;
									line-height: 22px;
									color: #303133;
								}
							}
							div:nth-child(4) {
								display: flex;
								position: relative;
								margin-bottom: 18px;
								span {
									display: flex;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 122px;
								}
								span:nth-child(2) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #303133;
								}
							}
							div:nth-child(4)::after {
								content: "";
								width: 14px;
								height: 40px;
								background: url("../../../assets/voyagetime/蒙版组 289@2x.png")
									no-repeat;
								background-size: 100% 100%;
								position: absolute;
								top: 4px;
								left: 160px;
							}
							div:nth-child(5) {
								display: flex;
								margin-bottom: 29px;
								span {
									display: block;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 122px;
								}
								span:nth-child(2) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #303133;
								}
							}
						}
						.transport_cont_r {
							display: flex;
							margin-top: 102px;
							div:nth-child(1) {
								display: flex;
								border: 1px solid #dcdfe6;
								border-radius: 4px;
								height: 42px;
								cursor: pointer;
								span {
									display: block;
								}
								span:nth-child(1) {
									background: url("../../../assets/seckill/蒙版组 285@2x.png")
										no-repeat;
									background-size: 100% 100%;
									width: 20px;
									height: 20px;
									margin: 11px 8px 11px 18px;
								}
								span:nth-child(2) {
									font-size: 16px;
									font-weight: 400;
									line-height: 20px;
									color: #606266;
									margin: 11px 18px 11px 0;
								}
								&:hover {
									background: #dcdfe6;
								}
							}
							div:nth-child(2) {
								margin-left: 12px;
								border-radius: 4px;
								height: 42px;
								background: #4791ff;
								padding: 14px 40px;
								font-size: 16px;
								font-weight: 400;
								line-height: 16px;
								color: #ffffff;
								cursor: pointer;
								&:hover {
									background: #33b9ff;
								}
							}
						}
					}
				}
			}
		}
		.cargo {
			width: 1164px;
			margin: 0 auto;
			box-sizing: border-box;
			border: 1px solid #ebeef5;
			background: #fff;
			border-radius: 6px;
			padding: 0 36px 48px 35px;
			margin-bottom: 10px;
			.cargo_title {
				margin: 26px 0 29px 0;
				display: flex;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 18px;
					font-weight: 500;
					line-height: 20px;
					font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
					color: #303133;
					margin-right: 18px;
				}
				.cargo_title_great {
					border: 1px solid #51aeff;
					border-radius: 4px;
					font-size: 12px;
					font-weight: 400;
					line-height: 12px;
					padding: 3px 4px;
					color: #4791ff;
					margin-right: 8px;
				}
				.cargo_title_risk {
					border: 1px solid #ff6851;
					border-radius: 4px;
					font-size: 12px;
					font-weight: 400;
					line-height: 12px;
					padding: 3px 4px;
					color: #ff6851;
				}
			}
			.cargo_name {
				display: flex;
				margin-bottom: 18px;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					height: 14px;
					color: #909399;
					padding: 5px 0 3px 0;
					margin-right: 104px;
				}
				span:nth-child(2) {
					font-size: 22px;
					font-weight: 500;
					line-height: 22px;
					height: 22px;
					font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
					color: #303133;
				}
			}
			.cargo_info {
				display: flex;
				margin-bottom: 18px;
				.cargo_info_l {
					margin-right: 12px;
					.cargo_number {
						display: flex;
						margin-bottom: 18px;
						span {
							display: block;
						}
						span:nth-child(1) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							margin-right: 104px;
						}
						span:nth-child(2) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #303133;
							width: 184px;
						}
					}
					.cargo_location {
						display: flex;

						span {
							display: block;
						}
						span:nth-child(1) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							margin-right: 76px;
						}
						span:nth-child(2) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #303133;
							width: 184px;
						}
					}
				}
				.cargo_info_r {
					display: flex;
					.cargo_weight {
						margin-right: 28px;
						span {
							display: block;
							width: 124px;
							text-align: center;
						}
						span:nth-child(1) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							margin-bottom: 18px;
						}
						span:nth-child(2) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #303133;
						}
					}
					.cargo_volume {
						margin-right: 28px;
						span {
							display: block;
							width: 124px;
							text-align: center;
						}
						span:nth-child(1) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							margin-bottom: 18px;
						}
						span:nth-child(2) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #303133;
						}
					}
					.cargo_character {
						span {
							display: block;
							width: 124px;
							text-align: center;
						}
						span:nth-child(1) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							margin-bottom: 18px;
						}
						span:nth-child(2) {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #303133;
						}
					}
				}
			}
			.cargo_brokerage {
				display: flex;
				height: 44px;
				border-bottom: 1px dashed #dcdfe6;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
					margin-right: 132px;
				}
				span:nth-child(2) {
					width: 478px;
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					color: #303133;
				}
			}
			.transport_remark {
				margin-top: 29px;
				margin-bottom: 40px;
				display: flex;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
					margin-right: 132px;
				}
				span:nth-child(2) {
					width: 478px;
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					color: #303133;
				}
			}
			.transport_cargolist {
				display: flex;
				.cargolist_title {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
					margin-right: 104px;
				}
				// .cargolist_img {
				//   .img_border {
				//   }
				// }
			}
		}
		.intention {
			width: 1164px;
			margin: 0 auto;
			box-sizing: border-box;
			border: 1px solid #ebeef5;
			background: #fff;
			border-radius: 6px;
			padding: 0 36px 30px 35px;
			.intention_title {
				margin: 26px 0 34px 0;
				font-size: 18px;
				font-weight: 500;
				line-height: 20px;
				font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				color: #303133;
			}
			.intention_price {
				display: flex;
				margin-bottom: 18px;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					height: 14px;
					color: #909399;
					width: 56px;
					margin-right: 104px;
				}
				span:nth-child(2) {
					font-size: 14px;
					font-weight: 500;
					line-height: 14px;
					height: 14px;
					color: #303133;
				}
			}
		}
	}
</style>
