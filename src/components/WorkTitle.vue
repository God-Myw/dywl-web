<template>
  <div class="reSpart">
    <div>{{ this.$props.title }}</div>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      // title: "船舶备件商品列表",
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.reSpart {
  display: inline-block;
  height: 100px;
  line-height: 100px;
  font-size: 21px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #333333;
}
</style>