<template>
  <div class="spartList">
    <div class="box shaixuan">
      <el-row :gutter="20">
        <el-col :span="5">
          <span>商品编号</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="5">
          <span>商品名称</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="5">
          <span>商品类目</span>
          <el-select v-model="input" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span>商品状态</span>
          <el-select v-model="input" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box list">
      <Worktitle title="船舶备件商品列表" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="
          () => {
            this.$router.push('/workbench/spart/reSpart');
          }
        "
      >
        发布新商品
      </el-button>
      &nbsp;&nbsp;
      <el-button icon="el-icon-refresh" @click="getData()"></el-button>
      <el-table :data="spartList" style="width: 100%">
        <el-table-column prop="number" label="商品编号" />
        <el-table-column prop="fileName" label="商品图片">
          <template slot-scope="scope">
            <img
              :src="
                'http://58.33.34.10:10443/images/spart/' + scope.row.fileName
              "
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="tradeName" label="商品名称" />
        <!-- <el-table-column prop="" label="所属类目" /> -->
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="money" label="价格(元)" />
        <el-table-column prop="quantitySum" label="库存" />
        <el-table-column prop="shlef" label="状态">
          <template slot-scope="scope">
            <div>
              <p
                class="shlefColor"
                :style="
                  scope.row.shlef == 1
                    ? 'background: #04AB75'
                    : 'background: #98979A'
                "
              ></p>
              {{ scope.row.shlef == 1 ? "已上架" : "未上架" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="guid" label="操作">
          <template slot-scope="scope">
            <div class="listEdit">
              <el-button
                :type="scope.row.shlef2 == '上架' ? 'text' : 'text'"
                @click="shelfChange(scope.row.guid)"
              >
                {{ scope.row.shlef2 }}
              </el-button>
              <el-button type="text" @click="getSpartById(scope.row.guid)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDelete(scope.row.guid)">
                删除
              </el-button>
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
import { getSpartList, shelfChange } from "../../../../api/workbench";

export default {
  data() {
    return {
      input: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: [
        {
          value: "发电机",
          label: "发电机",
        },
      ],
      spartList: [],
    };
  },
  components: { Worktitle },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      getSpartList(params).then((res) => {
        let spartList = [];
        if (res.status == 200) {
          res.data.records.map((item) => {
            let obj = {};
            obj.guid = item.guid || "";
            obj.number = item.number || "";
            obj.fileName = item.fileName || "";
            obj.tradeName = item.tradeName || "";
            obj.brand = item.brand || "";
            obj.money = item.money || "";
            obj.quantitySum = item.quantitySum || "";
            obj.shlef = item.shlef == 1 ? "已上架" : "未上架";
            obj.shlef2 = item.shlef2 == 1 ? "下架" : "上架";
            spartList.push(obj);
          });
        }
        this.spartList = spartList || [];
        this.total = res.data.total || 0;
      });
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    handleSizeChange(handleSizeChange) {
      this.pageSize = handleSizeChange;
      this.getData();
    },
    handleDelete(guid) {
      this.$confirm("您确认后,现有商品将删除", "确认删除商品", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    shelfChange(guid) {
      let params = { guid: guid };
      shelfChange(params).then((res) => {
        if (res.status == 200) {
          this.getData();
        }
      });
    },
    getSpartById(guid) {
      this.$router.push({
        path: `/workbench/spart/spartEdit`,
        query: {
          guid: guid,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.spartList {
  max-width: 1834px;
  /deep/.el-button--primary {
    background-color: #0052db;
  }
  .box {
    position: relative;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
  }
  .shaixuan {
    .el-col {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 15px;
        width: 30%;
      }
      .el-input,
      .el-select {
        width: 70%;
      }
    }
  }
  .list {
    position: relative;
    /deep/.cell {
      text-align: center;
      img {
        width: 70px;
        height: 50px;
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
    .shlefColor {
      display: inline-block;
      margin-right: 5px;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      // background-color: red;
    }
    .pagination {
      span {
        font-size: 15px;
      }
      margin-top: 20px;
      display: flex;
      justify-content: right;
      align-items: center;
      // transform: translateX(-110%);
      // left: 100%;
    }
    .listEdit {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>
