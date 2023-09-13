<template>
	<div class="spartOrder">
		<div class="box">
			<Worktitle title="船舶供应订单"></Worktitle>
			<el-table :data="spartList" style="width: 100%">
				<el-table-column prop="number" label="商品编号" />
				<el-table-column prop="oneLevelId" label="商品类型" />
				<el-table-column prop="fileName" label="商品图片">
					<template slot-scope="scope">
						<img
							:src="
								source == 1
									? 'http://58.33.34.10:10443/images/spart/' + scope.row.fileName
									: 'http://39.105.35.83:10443/images/spart/' + scope.row.fileName
							"
							alt=""
						/>
					</template>
				</el-table-column>
				<el-table-column prop="tradeName" label="商品" />
				<el-table-column prop="twoLevelId" label="所属类目" />
				<el-table-column prop="brand" label="品牌" />
				<el-table-column prop="money" label="价格(元)" />
				<el-table-column prop="quantitySum" label="库存" />
				<el-table-column prop="shelf" label="状态">
					<template slot-scope="scope">
						<div>
							<p
								class="shelfColor"
								:style="scope.row.shelf == '已上架' ? 'background: #04AB75' : 'background: #98979A'"
							></p>
							{{ scope.row.shelf == "已上架" ? "已上架" : "未上架" }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="guid" label="操作">
					<template slot-scope="scope">
						<div class="listEdit">
							<el-button
								:type="scope.row.shelf2 == '上架' ? 'text' : 'text'"
								@click="shelfChange(scope.row.guid, scope.row.shelf2)"
							>
								{{ scope.row.shelf2 }}
							</el-button>
							<el-button type="text" @click="getSpartById(scope.row.guid)"> 编辑 </el-button>
							<el-button type="text" @click="handleDelete(scope.row.guid)"> 删除 </el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<!-- <span>总共{{ Math.ceil(total / 10) }}页记录每页显示10条记录</span> -->
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="currentChange"
					:page-sizes="[5, 12, 15, 20]"
					:page-size="12"
					layout="total,sizes,prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import Worktitle from "../../../../components/WorkTitle.vue";
	export default {
		data() {
			return {};
		},
		components: { Worktitle },
		mounted() {},
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
		/deep/.cell {
			text-align: center;
			img {
				width: 60px;
				height: 60px;
			}
		}
		/deep/.el-table th > .cell {
			font-size: 16px;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.9);
			text-align: center;
		}
		/deep/ .el-table .el-table__row .cell {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.pagination {
			span {
				font-size: 15px;
			}
			margin-top: 20px;
			display: flex;
			justify-content: right;
			align-items: center;
		}
	}
</style>
