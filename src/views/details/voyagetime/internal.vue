<template>
	<div class="det_foreign">
		<div class="foreign_bg">
			<div class="foreign">
				<div class="title">国内航次详情</div>
				<div class="issue_time">
					<span>发布时间</span>
					<span></span>
					<span>2022-01-04</span>
				</div>
				<div class="ship">
					<div class="ship_title">船舶信息</div>
					<div class="ship_cargo">
						<div class="ship_cont">
							<div class="ship_cont_nav">
								<span>船舶类型</span>
								<span>{{ titleCn }}</span>
							</div>
							<div class="ship_cont_nav">
								<span>吃水</span>
								<span>20米</span>
							</div>
							<div class="ship_cont_nav">
								<span>载重吨</span>
								<span>{{ acceptTon }}吨</span>
							</div>
							<div class="ship_cont_nav">
								<span>建造年份</span>
								<span>2007年</span>
							</div>
						</div>
						<div class="ship_cargo_r"><span></span><span>联系客服</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="transport">
			<div class="transport_title">运输需求</div>
			<div class="transport_begin">
				<span>起运港</span>
				<span></span>
				<span>{{ titleCNTwo }}</span>
			</div>
			<div class="transport_vertical"></div>
			<div class="transport_aim">
				<span>目的港</span>
				<span></span>
				<span>待定</span>
			</div>
			<div class="transport_cleanship">
				<span>空船日期</span>
				<span>{{ expectEndDate }} ~ {{ expectStartDate }}</span>
			</div>
			<div class="transport_across"></div>
			<div class="transpor_remark">
				<span>备注</span>
				<span
					>高级高科技设备使用特种钢材、运的时候需保护好，谢谢！属性用以表示哈哈哈 checkbox
					的不确定状态，一般用于实现全选的效果。</span
				>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				titleCn: "",
				expectEndDate: "",
				expectStartDate: "",
				acceptTon: "",
				titleCNTwo: "",
			};
		},
		mounted() {
			console.log(this.$route.query.data);
			let data = this.$route.query.data;
			this.titleCn = data.titleCn;
			this.expectEndDate = data.expectEndDate.replace("T", " ").replace(".000+0000", " ");
			this.expectStartDate = data.expectStartDate.replace("T", " ").replace(".000+0000", " ");
			this.acceptTon = data.acceptTon;
			this.titleCNTwo = data.voyageLine[0].titleCN;
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
			height: 330px;
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
						background: url("../../../assets/seckill/路径 4042@2x (1).png") no-repeat;
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
						justify-content: space-between;
						.ship_cont {
							display: flex;
							.ship_cont_nav {
								width: 140px;
								height: 68px;
								background: #f5f7fa;
								border-radius: 2px;
								margin-right: 12px;
								span {
									display: block;
									text-align: center;
								}
								span:nth-child(1) {
									margin: 14px 0 10px;
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
						.ship_cargo_r {
							display: flex;
							border-radius: 4px;
							height: 44px;
							background: #26a6e9;
							cursor: pointer;
							margin-top: 24px;
							span {
								display: block;
							}
							span:nth-child(1) {
								background: url("../../../assets/seckill/蒙版组 285@2x (1).png") no-repeat;
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
		.transport {
			box-sizing: border-box;
			width: 1164px;
			margin: 0 auto;
			background: #ffffff;
			border: 1px solid #ebeef5;

			padding: 27px 0 47px 34px;
			border-radius: 6px;
			.transport_title {
				font-size: 18px;
				font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				font-weight: 500;
				line-height: 18px;
				color: #303133;
				margin-bottom: 31px;
			}
			.transport_begin {
				display: flex;
				align-items: center;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
					margin-right: 118px;
				}
				span:nth-child(2) {
					background: url("../../../assets/voyagetime/蒙版组 179@2x.png") no-repeat;
					width: 20px;
					height: 20px;
					background-size: 100% 100%;
					margin-right: 12px;
				}
				span:nth-child(3) {
					font-size: 22px;
					font-weight: 500;
					line-height: 22px;
					color: #303133;
					font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				}
			}
			.transport_vertical {
				margin-left: 170px;
				width: 0px;
				height: 16px;
				border-right: 1px dashed #c0c4cc;
			}
			.transport_aim {
				display: flex;
				align-items: center;
				margin-bottom: 44px;
				span {
					display: block;
				}
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 400;
					line-height: 14px;
					color: #909399;
					margin-right: 118px;
				}
				span:nth-child(2) {
					background: url("../../../assets/voyagetime/蒙版组 180@2x (1).png") no-repeat;
					width: 20px;
					height: 20px;
					background-size: 100% 100%;
					margin-right: 12px;
				}
				span:nth-child(3) {
					font-size: 22px;
					font-weight: 500;
					line-height: 22px;
					color: #303133;
					font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
				}
			}
			.transport_cleanship {
				display: flex;
				align-items: center;
				margin-bottom: 30px;
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
				}
			}
			.transport_across {
				margin-bottom: 30px;
				border-bottom: 1px dashed #dcdfe6;
				height: 0;
				width: 100%;
			}
			.transpor_remark {
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
					line-height: 18px;
					color: #303133;
				}
			}
		}
	}
</style>
