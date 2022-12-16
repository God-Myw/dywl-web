<template>
  <div class="spartEdit">
    <Worktitle title="编辑船舶备件"></Worktitle>
    <div class="box">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="200px"
        labelPosition="left"
      >
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="一级分类" prop="name">
              <el-select
                style="width: 100%"
                size="small"
                v-model="form.region"
                placeholder=""
                disabled
              >
                <el-option label="热销备件" value="shanghai"></el-option>
                <el-option label="最新备件" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="二级分类" prop="name">
              <el-select
                disabled
                style="width: 100%"
                size="small"
                v-model="form.region"
                placeholder=""
              >
                <el-option label="热销备件" value="shanghai"></el-option>
                <el-option label="最新备件" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="商品名称" prop="name">
              <el-input size="small" v-model="form.tradeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="商品品牌" prop="name">
              <el-input size="small" v-model="form.brand"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="商品轮播图" prop="name">
              <el-input
                disabled
                size="small"
                placeholder="请选择上传图片"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="" prop="name">
              <el-upload
                action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
                list-type="picture-card"
                accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
                :on-change="upLoadChange"
                :on-remove="upLoadChange"
                :file-list="form.picList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="24">
            <el-form-item label="商品型号/价格" prop="name">
              <el-table :data="form.spartParts" style="width: 100%">
                <el-table-column prop="partPicList" label="型号图片">
                  <template slot-scope="scope">
                    <div>
                      <el-upload
                        action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
                        list-type="picture-card"
                        accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
                        :on-change="(info, list) => {}"
                        :file-list="
                          form.spartParts[scope.$index].partPicList || []
                        "
                        :limit="1"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="model" label="型号">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.spartParts[scope.$index].model"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="spartMoney" label="价格">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.spartParts[scope.$index].spartMoney"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" label="库存">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.spartParts[scope.$index].quantity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="">
                  <template slot-scope="scope">
                    <div>
                      <i
                        style="font-size: 30px"
                        class="el-icon-delete"
                        @click="storeDelete(scope)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-button
              style="position: relative; left: 40vw; display: inline-block"
              type="primary"
              size="default"
              @click="storeListAdd"
            >
              <i class="el-icon-plus"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="说明" prop="name">
              <el-input
                style="display: inline-block"
                v-for="(item, index) in form.partExplain"
                size="small"
                v-model="form.partExplain[index]"
                :key="index"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="partExplainAdd"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="24">
            <el-form-item label="商品详情描述" prop="name">
              <div style="border: 1px solid #ccc">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 500px; overflow-y: hidden"
                  v-model="html"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="editorCreated"
                  @onChange="editorChange"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交 -->
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="12">
            <el-form-item>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="onSubmit(form)"
                >确认提交</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
import { getSpartById, saveSpart } from "../../../../api/workbench";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Worktitle, Editor, Toolbar },
  data() {
    return {
      form: {
        // region: "",
        guid: "",
        tradeName: "",
        brand: "",
        picList: [],
        spartParts: [
          { partPicList: [{}], model: "", spartMoney: "", quantity: "" },
        ],
        partExplain: [],
        details: "",
      },
      picList2: [],
      rules: {
        // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
    };
  },
  mounted() {
    let params = { guid: this.$route.query.guid };
    this.getData(params);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    getData(params) {
      getSpartById(params).then((res) => {
        if (res.status == 200) {
          if (res.data.picList) {
            var picList = res.data.picList.map((item) => {
              return {
                response: {
                  data: {
                    fileName: item.fileName,
                  },
                },
                url: `http://58.33.34.10:10443/images/spart/${item.fileName}`,
              };
            });
          }
          let partExplain = res.data.partExplain.split("/").filter(Boolean);
          this.form.guid = res.data.guid || "";
          this.form.tradeName = res.data.tradeName || "";
          this.form.brand = res.data.brand || "";
          this.form.picList = picList || [];
          this.form.spartParts = res.data.spartParts || "";
          this.form.partExplain = partExplain || "";
          this.form.details = res.data.details || "";
          this.editor.setHtml(res.data.details);
        }
      });
    },
    upLoadChange(info, list) {
      if (info.status == "success") {
        let arr = [];
        list.map((item) => {
          let obj = {};
          obj.fileName = item.response.data.fileName;
          obj.type = "spart";
          obj.fileLog = 48;
          arr.push(obj);
        });
        this.picList2 = arr;
      }
    },
    storeDelete(info) {
      let arr = [...this.form.spartParts];
      this.form.spartParts = arr.filter((item, index) => index != info.$index);
    },
    storeListAdd() {
      this.form.spartParts.push("");
    },
    partExplainAdd() {
      this.form.partExplain.push("");
    },
    editorCreated(editor) {
      this.editor = Object.seal(editor);
    },
    editorChange(editor) {
      this.form.details = editor.getHtml();
    },
    onSubmit(info) {
      let params = { ...info } || {};
      params.partExplain = [...new Set(params.partExplain)].join("/");
      params.picList = this.picList2;
      saveSpart(params).then((res) => {
        if (res.status == 200) this.$router.push("/workbench/spart/spartList");
      });
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.spartEdit {
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 99%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
  }
  /deep/.cell .el-upload--picture-card {
    line-height: 90px;
    width: 80px;
    height: 80px;
  }
}
</style>