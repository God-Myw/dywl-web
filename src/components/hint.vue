<template>
  <div class="hint">
    <el-dialog
      :visible.sync="dighintStutas"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleClose"
      append-to-body
      width="520px"
      top="25vh"
    >
      <div class="diahit">
        <div class="diahit_left">
          <div>散杂货&集装箱发布、交易 等更多功能请使用道裕app</div>
          <div><img src="../assets/seckill/组 8467.png" alt="" /></div>
          <div>道裕智慧物流APP</div>
          <div>扫描上方二维码下载</div>
        </div>
        <div class="diahit_right">
          <img src="../assets/seckill/蒙版组 299.png" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["hintStutas"],
  data() {
    return {
      dighintStutas: false,
    };
  },
  created() {},
  mounted() {},
  watch: {
    hintStutas() {
      this.dighintStutas = this.hintStutas;
    },
  },

  methods: {
    handleClose(done) {
      this.$emit("dighintStutas", false);
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
    .diahit {
      display: flex;
      .diahit_left {
        width: 240px;
        height: 346px;
        box-sizing: border-box;
        background: #e6f2ff;
        border-radius: 5px 0px 0px 5px;
        padding: 42px 29px 48px;
        div:nth-child(1) {
          width: 182px;
          font-size: 15px;
          font-weight: 400;
          line-height: 22px;
          color: #303133;
          margin-bottom: 20px;
        }
        div:nth-child(2) {
          width: 140px;
          height: 140px;
          margin: 0 0 12px 21px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        div:nth-child(3) {
          text-align: center;
          font-size: 15px;
          font-weight: 400;
          line-height: 15px;
          color: #4791ff;
          margin-bottom: 7px;
        }
        div:nth-child(4) {
          text-align: center;
          font-size: 15px;
          font-weight: 400;
          line-height: 15px;
          color: #303133;
        }
      }
      .diahit_right {
        margin-top: 41px;
        width: 247px;
        height: 305px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
