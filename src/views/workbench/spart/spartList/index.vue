<template>
  <div class="spartList">
    <Worktitle title="船舶备件商品列表" />
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
          <el-button type="primary" plain>重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box list">
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
        <el-table-column prop="" label="所属商品类目" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="money" label="价格" />
        <el-table-column prop="quantitySum" label="库存" />
        <el-table-column prop="shlef" label="状态" />
        <el-table-column prop="guid" label="地址" min-width="200">
          <template slot-scope="scope">
            <div class="listEdit">
              <el-button
                :type="scope.row.shlef2 == '上架' ? 'primary' : 'info'"
                @click="shelfChange(scope.row.guid)"
              >
                {{ scope.row.shlef2 }}
              </el-button>
              <el-button
                type="primary"
                plain
                @click="getSpartById(scope.row.guid)"
              >
                编辑
              </el-button>
              <el-button type="danger" @click="handleDelete(scope.row.guid)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <span>总共{{ Math.ceil(total / 10) }}页记录每页显示10条记录</span>
        <el-pagination
          hide-on-single-page
          @current-change="currentChange"
          layout="prev, pager, next, jumper"
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
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 90%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
  }
  .shaixuan {
    .el-col {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 15px;
        width: 20%;
      }
      .el-input,
      .el-select {
        width: 80%;
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
      font-size: 20px;
      color: black;
      text-align: center;
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
