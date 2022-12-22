<template>
  <div class="myStore">
    <Worktitle title="发布船舶备件"></Worktitle>
    <div class="box">
      <div class="icon box2"><i class="el-icon-check"></i></div>
      <div class="msg box2">恭喜，您的船舶备件已发布成功！</div>
      <div class="button box2">
        <el-button plain type="primary" size="default" @click="goList"
          >返回备件管理</el-button
        ><el-button plain type="primary" size="default" @click="relase"
          >继续发布备件</el-button
        >
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
  methods: {
    goList() {
      this.$router.push("/workbench/spart/spartList");
    },
    relase() {
      this.$router.go(0);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  width: 99%;
  box-shadow: 0px 0px 5px rgb(235, 227, 227);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  .box2 {
    margin: 20px 0px;
  }
  .icon {
    display: grid;
    place-items: center;
    background-color: #4486f6;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    font-size: 35px;
    color: #ffffff;
  }
  .msg {
    font-size: 13px;
  }
}
</style>