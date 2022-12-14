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
div {
  height: 100px;
  line-height: 100px;
  font-size: 22px;
  font-weight: 700;
}
</style>