<template>
	<div class="det_foreign">
		<div class="foreign_bg">
			<div class="foreign">
				<div class="title">International Voyage Details</div>
				<div class="issue_time">
					<span>Release time</span>
					<span></span>
					<span>{{ createDate }}</span>
				</div>
				<div class="ship">
					<div class="ship_title">Ship Information</div>
					<div class="ship_cargo">
						<div class="ship_cargo_l">
							<div class="ship_cargo_left_t">
								<span>Ship Type</span>
								<span>单夹板</span>
							</div>
							<div class="ship_cargo_left_c">
								<span>Ship Kinds</span>
								<span>{{ titleCn }}</span>
							</div>
							<div class="ship_cargo_left_b">
								<span>Year of Construction</span>
								<span>2017年</span>
							</div>
						</div>
						<div class="ship_cargo_c">
							<div class="ship_cargo_c_t">
								<span>Draft</span>
								<span>12米</span>
							</div>
							<div class="ship_cargo_c_c">
								<span>Dwt</span>
								<span>55500吨</span>
							</div>
							<div class="ship_cargo_c_b">
								<span>Ship Cranes</span>
								<span>{{ shipCrane }}个</span>
							</div>
						</div>
						<div class="ship_cargo_r"><span></span><span>ContactUs</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="accept_info">
			<div class="accept_title">Tonnage Details</div>
			<div class="accept_cont">
				<div class="accept_cont_l">
					<span>Voyage Periods</span>
					<span>{{ shipVoyage }}天</span>
				</div>
				<div class="accept_cont_c">
					<span>Accepted Weight</span>
					<span>5500吨</span>
				</div>
				<div class="accept_cont_r">
					<span>Accepted Volume</span>
					<span>55000m³</span>
				</div>
			</div>
		</div>
		<div class="flight_course">
			<div class="flight_title">Tonnage Itinerary</div>
			<div class="flight_box_header">
				<span> L/D Port</span>
				<span>ETA</span>
				<span>ETD</span>
			</div>
			<div class="flight_box_cont">
				<ul>
					<li v-for="item in voyageLine" :key="item.guid">
						<div></div>
						<div>{{ item.titleCN }}</div>
						<div></div>
						<div>{{ item.via_id }}</div>
						<div></div>
						<div>{{ item.voyage_id }}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				titleCn: "",
				voyageLine: "",
				shipCrane: "",
				createDate: "",
				shipVoyage: "",
			};
		},
		mounted() {
			console.log(this.$route.query.data);
			let data = this.$route.query.data;
			this.titleCn = data.titleCn;
			this.voyageLine = data.voyageLine;
			this.shipCrane = data.shipCrane;
			this.shipVoyage = data.shipVoyage;
			this.createDate = data.createDate
				.replace("T", " ")
				.replace(".000+0000", " ");
		},

		methods: {},
	};
</script>
<style lang="scss" scoped>
	.det_foreign {
		background: #f5f7f9;
		padding-bottom: 100px;
		.foreign_bg {
			background: #f5f7f9 url("../../../assets/seckill/组 8098.jpg") no-repeat;
			background-size: 100% 200px;
			width: 100%;
			height: 340px;
			margin-bottom: 8px;
			.foreign {
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
				.ship {
					box-sizing: border-box;
					background: #ffffff;
					border: 1px solid #ebeef5;
					border-radius: 6px;
					padding: 27px 35px 47px;
					.ship_title {
						font-size: 18px;
						font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
						font-weight: 500;
						line-height: 18px;
						color: #303133;
						margin-bottom: 30px;
					}
					.ship_cargo {
						display: flex;
						.ship_cargo_l {
							margin-right: 12px;
							.ship_cargo_left_t {
								margin-bottom: 18px;
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
									flex-shrink: 0;
								}
								span:nth-child(2) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #303133;
									width: 184px;
								}
							}
							.ship_cargo_left_c {
								margin-bottom: 18px;
								display: flex;
								span {
									display: block;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 104px;
									flex-shrink: 0;
								}
								span:nth-child(2) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #303133;
									width: 184px;
								}
							}
							.ship_cargo_left_b {
								display: flex;
								span {
									display: block;
								}
								span:nth-child(1) {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									margin-right: 104px;
									flex-shrink: 0;
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
						.ship_cargo_c {
							margin-top: 32px;
							display: flex;
							.ship_cargo_c_t {
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
							.ship_cargo_c_c {
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
							.ship_cargo_c_b {
								margin-right: 179px;
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
						.ship_cargo_r {
							display: flex;
							border-radius: 4px;
							height: 44px;
							background: #4791ff;
							cursor: pointer;
							margin-top: 34px;
							span {
								display: block;
							}
							span:nth-child(1) {
								background: url("../../../assets/seckill/蒙版组 285@2x (1).png")
									no-repeat;
								background-size: 100% 100%;
								width: 20px;
								height: 20px;
								margin: 12px 8px 12px 19px;
							}
							span:nth-child(2) {
								font-size: 16px;
								font-weight: 400;
								line-height: 20px;
								color: #ffffff;
								margin: 12px 19px 12px 0;
								width: 64px;
							}
							&:hover {
								background: #33b9ff;
							}
						}
					}
				}
			}
		}
		.accept_info {
			box-sizing: border-box;
			width: 1164px;
			margin: 0 auto;
			background: #ffffff;
			border: 1px solid #ebeef5;
			padding: 27px 0 46px 34px;
			border-radius: 6px;
			margin-bottom: 8px;
			.accept_title {
				font-size: 18px;
				font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				font-weight: 500;
				line-height: 18px;
				color: #303133;
				margin-bottom: 29px;
			}
			.accept_cont {
				display: flex;

				.accept_cont_l {
					width: 141px;
					height: 70px;
					background: #f5f7fa;
					border-radius: 2px;
					margin-right: 13px;
					span {
						display: block;
						text-align: center;
					}
					span:nth-child(1) {
						margin: 15px 0 10px;
						font-size: 14px;
						font-weight: 400;
						line-height: 14px;
						color: #909399;
					}
					span:nth-child(2) {
						font-size: 16px;
						font-weight: 400;
						line-height: 16px;
						color: #303133;
					}
				}
				.accept_cont_c {
					width: 141px;
					height: 70px;
					background: #f5f7fa;
					border-radius: 2px;
					margin-right: 13px;
					span {
						display: block;
						text-align: center;
					}
					span:nth-child(1) {
						margin: 15px 0 10px;
						font-size: 14px;
						font-weight: 400;
						line-height: 14px;
						color: #909399;
					}
					span:nth-child(2) {
						font-size: 16px;
						font-weight: 400;
						line-height: 16px;
						color: #303133;
					}
				}
				.accept_cont_r {
					width: 141px;
					height: 70px;
					background: #f5f7fa;
					border-radius: 2px;
					span {
						display: block;
						text-align: center;
					}
					span:nth-child(1) {
						margin: 15px 0 10px;
						font-size: 14px;
						font-weight: 400;
						line-height: 14px;
						color: #909399;
					}
					span:nth-child(2) {
						font-size: 16px;
						font-weight: 400;
						line-height: 16px;
						color: #303133;
					}
				}
			}
		}
		.flight_course {
			box-sizing: border-box;
			width: 1164px;
			margin: 0 auto;
			background: #ffffff;
			border: 1px solid #ebeef5;
			padding: 27px 0 47px 34px;
			border-radius: 6px;
			.flight_title {
				font-size: 18px;
				font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				font-weight: 500;
				line-height: 18px;
				color: #303133;
				margin-bottom: 30px;
			}
			.flight_box_header {
				padding: 22px 0 12px 36px;
				background: #f5f7fa;
				display: flex;
				span {
					display: block;
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
				}
				span:nth-child(1) {
					margin-right: 166px;
				}
				span:nth-child(2) {
					margin-right: 172px;
				}
			}
			.flight_box_cont {
				ul {
					li {
						display: flex;
						align-items: center;
						padding: 20px 0 18px 36px;
						border-bottom: 1px solid #f5f7fa;
						div:nth-child(1) {
							width: 8px;
							height: 8px;
							background: #4791ff;
							border-radius: 50%;
							margin-right: 10px;
						}
						div:nth-child(2) {
							font-size: 16px;
							font-weight: 500;
							line-height: 16px;
							color: #303133;
							font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
							width: 145px;
							margin-right: 60px;
						}
						div:nth-child(3) {
							background: url("../../../assets/seckill/蒙版组 288@2x.png")
								no-repeat;
							width: 14px;
							height: 14px;
							background-size: 100% 100%;
							margin-right: 8px;
						}
						div:nth-child(4) {
							font-size: 14px;
							width: 72px;
							margin-right: 104px;
							font-weight: 400;
							line-height: 14px;
							color: #606266;
						}
						div:nth-child(5) {
							background: url("../../../assets/seckill/蒙版组 288@2x.png")
								no-repeat;
							width: 14px;
							height: 14px;
							background-size: 100% 100%;
							margin-right: 8px;
						}
						div:nth-child(6) {
							font-size: 14px;
							width: 72px;
							font-weight: 400;
							line-height: 14px;
							color: #606266;
						}
						&:hover {
							background: #f5f7fa;
						}
					}
				}
			}
		}
	}
</style>
