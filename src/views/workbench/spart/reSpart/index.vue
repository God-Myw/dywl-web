<template>
  <div class="reSpart">
    <Worktitle title="发布船舶备件"></Worktitle>
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
    <div class="box"></div>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
export default {
  data() {
    return {
      input: "",
      options: [
        {
          value: "发电机",
          label: "发电机",
        },
      ],
    };
  },
  components: { Worktitle },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.reSpart {
  .box {
    padding: 20px 0px 0px 20px;
    background-color: #ffffff;
    width: 90%;
    box-shadow: 1px;
  }
  .el-input,
  .el-select {
    width: 70%;
  }
  .shaixuan {
    .el-col {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 15px;
      }
    }
  }
}
</style>