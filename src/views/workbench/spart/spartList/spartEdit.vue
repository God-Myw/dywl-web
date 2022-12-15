<template>
  <div class="spartEdit">
    <Worktitle title="编辑船舶备件"></Worktitle>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
import { getSpartById } from "../../../../api/workbench";
export default {
  components: { Worktitle },
  data() {
    return {
      input: "",
    };
  },
  mounted() {
    let params = { guid: this.$route.query.guid };
    this.getData(params);
  },
  methods: {
    getData(params) {
      getSpartById(params).then((res) => {
        if (res.status == 200) {
          console.log(res.data);
        }
      });
    },
  },
  
};
</script>
<style lang="scss" scoped>
</style>