<template>
  <div>
    <!-- 头部 -->
    <div v-if="isRouterHeader">
      <CommonHeader></CommonHeader>
    </div>
    <!-- 内容 -->
    <div class="box-body">
      <router-view></router-view>
    </div>
    <div>
      <CommonBase></CommonBase>
    </div>
    <!-- 底部 -->
  </div>
</template>

<script>
import CommonBase from "../components/CommonBase";
import CommonHeader from "../components/CommonHeader";
export default {
  provide() {
    return {
      reloadHeader: this.reloadHeader,
    };
  },
  data() {
    return {
      isRouterHeader: true,
    };
  },
  components: {
    CommonBase,
    CommonHeader,
  },
  computed: {},
  mounted() {},
  methods: {
    // 刷新当前头部
    reloadHeader() {
      this.isRouterHeader = false;
      this.$nextTick(function () {
        this.isRouterHeader = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box-body {
  margin-top: 80px;
}
</style>
