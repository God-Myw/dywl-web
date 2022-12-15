<template>
  <div class="reSpart">
    <Worktitle title="发布船舶备件"></Worktitle>
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