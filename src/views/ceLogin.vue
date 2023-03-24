<template>
	<div class="login">
		<!-- #region -->
		<!-- #endregion -->

		<el-table
			highlight-current-row
			ref="multipleTableFlush"
			max-height="180"
			@row-click="FlushitemClick"
			style="margin-bottom: 10px"
			class="tableClass"
			border
			:data="PipeFlushList"
		>
			<el-table-column
				label="模型ID"
				prop="ElementId"
				:align="'center'"
			></el-table-column>

			<el-table-column label="目标流速(m/s)" :align="'center'">
				<template slot-scope="scope">
					<el-row style="width: 100%">
						<el-input
							v-model="scope.row.targetFlow"
							oninput="value=value.replace(/[^\d.-]/g,'')"
							@click.stop.native="inputBlur(scope.row)"
						></el-input>
					</el-row>
				</template>
			</el-table-column>

			<el-table-column
				label="实际流速(m/s)"
				prop="actualFlow"
				:align="'center'"
			></el-table-column>

			<el-table-column
				label="管径(mm)"
				prop="PipeDiameter"
				:align="'center'"
			></el-table-column>

			<el-table-column
				label="管长(m)"
				prop="PipeLength"
				:align="'center'"
			></el-table-column>

			<el-table-column label="删除" width="50" :align="'left'">
				<template slot-scope="scope">
					<el-row style="width: 100%">
						<i
							class="iconfontZt iconzt_lajitong buttonIcon"
							title="删除"
							@click.stop="FlushDeleteClick(scope.row)"
						></i>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				PipeFlushList: [
					{
						ElementId: "Q1",
						PipeDiameter: 250,
						PipeLength: "83.64",
						actualFlow: 0,

						targetFlow: "1.0",
					},
					{
						ElementId: "Q1",
						PipeDiameter: 250,
						PipeLength: "83.64",
						actualFlow: 0,

						targetFlow: "1.0",
					},
					{
						ElementId: "Q1",
						PipeDiameter: 250,
						PipeLength: "83.64",
						actualFlow: 0,

						targetFlow: "1.0",
					},
				],
			};
		},
		mounted() {},
		methods: {
			inputBlur(row) {},
			FlushitemClick(row, column, event) {
				console.log(column);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
