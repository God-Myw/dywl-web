<template>
  <div>
    <el-input-number
      v-model="inputNumber"
      size="small"
      :min="0"
      step-strictly
    ></el-input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputNumber: 0,
    };
  },
  created() {},
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
