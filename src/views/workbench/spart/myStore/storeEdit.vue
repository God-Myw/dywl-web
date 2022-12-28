<template>
  <div class="storeEdit">
    <div class="box">
      <Worktitle title="修改店铺LOGO /形象"></Worktitle>(选填)
      <br />
      <img
        src="http://58.33.34.10:10443/images/spart/1671190772217.png"
        alt=""
      />
      <br />
      <Worktitle title="修改其他信息"></Worktitle>
      <div class="info">
        <el-form
          ref="form"
          :model="form"
          label-width="200px"
          labelPosition="left"
        >
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="联系人" prop="name">
                <el-input
                  v-model="a"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" prop="name">
                <el-input
                  v-model="a"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="店铺名" prop="name">
                <el-input
                  v-model="a"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客服电话" prop="name">
                <el-input
                  v-model="a"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="店铺简介（选填）" prop="name">
                <el-input
                  v-model="a"
                  type="textarea"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系地址" prop="name">
                <el-input
                  v-model="a"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button
            style="margin: 0 auto"
            type="primary"
            size="default"
            @click="submit(form)"
            >确认提交</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
export default {
  props: ["editShow"],
  data() {
    return {
      a: "",
      form: {},
    };
  },
  components: { Worktitle },
  mounted() {},
  methods: {
    submit(info) {
      this.$emit("editShow", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.storeEdit {
  width: 1620px;
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
    img {
      width: 147px;
      height: 130px;
    }
    .info {
      text-align: center;
    }
  }
}
</style>