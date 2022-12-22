<template>
  <div class="reSpart">
    <div class="box" v-if="!reStatus">
      <Worktitle title="新增商品信息"></Worktitle>
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
              <!-- <el-input
                disabled
                size="small"
                placeholder="请选择上传图片"
              ></el-input> -->
              <el-upload
                action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
                list-type="picture-card"
                accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
                :on-change="upLoadChange"
                :on-remove="upLoadChange"
                :file-list="form.picList"
                :limit="5"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="" prop="name"> </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="20">
            <el-form-item label="商品型号/价格" prop="name">
              <el-table :data="form.spartParts" style="width: 100%">
                <el-table-column label="" width="260">
                  <template slot-scope="scope">
                    <div @click="upLoadBefore(scope)">
                      <el-upload
                        v-show="!scope.row.partPicList[0]"
                        action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
                        list-type="picture-card"
                        accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
                        :on-change="upLoadStore"
                        :file-list="scope.row.partPicList"
                        :limit="1"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <img
                        v-show="scope.row.partPicList[0]"
                        class="storeImg"
                        :src="
                          scope.row.partPicList[0]
                            ? scope.row.partPicList[0].url
                            : ''
                        "
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        placeholder="请填写型号名"
                        v-model="scope.row.model"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        placeholder="请填写价格"
                        v-model="scope.row.spartMoney"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        placeholder="请填写库存数"
                        v-model="scope.row.quantity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="">
                  <template slot-scope="scope">
                    <div>
                      <i
                        style="font-size: 27px; margin-left: 20px"
                        class="el-icon-delete"
                        @click="storeDelete(scope)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                style="display: inline-block; width: 100%; border: 1px dashed"
                size="default"
                @click="storeListAdd"
              >
                <i class="el-icon-plus">添加型号</i>
              </el-button>
            </el-form-item>
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
                :placeholder="
                  index == 0
                    ? '说明一(品牌宣传语)'
                    : index == 1
                    ? '说明二(售后服务等)'
                    : ''
                "
              ></el-input>
              <el-button
                icon="el-icon-plus"
                size="small"
                style="width: 100%; border: 1px dashed"
                @click="partExplainAdd"
                >添加说明</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label=""> </el-form-item>
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
          <el-col :span="8">
            <el-form-item> </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button style="margin-right: 50px">取消</el-button>
              <el-button type="primary" @click="onSubmit(form)"
                >确认提交</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <ReSuccess v-show="reStatus"></ReSuccess>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
import ReSuccess from "./reSuccess.vue";
import { saveSpart } from "../../../../api/workbench";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Worktitle, Editor, Toolbar, ReSuccess },
  data() {
    return {
      index: 0,
      reStatus: false,
      form: {
        guid: "",
        tradeName: "",
        brand: "",
        picList: [],
        spartParts: [
          {
            partPicList: [],
            model: "",
            spartMoney: "",
            quantity: "",
          },
        ],
        partExplain: ["", ""],
        details: "",
      },
      picList2: [],
      rules: {
        // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: "http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart",
            fieldName: "file",
            headers: {
              // accept: ".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff",
              token: String(localStorage.getItem("token")),
            },
            // maxFileSize: 10 * 1024 * 1024, // 10M
            // base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
            customInsert(res, insertFn) {
              // res 即服务端的返回结果
              let url = `http://58.33.34.10:10443/images/spart/${res.data.fileName}`;
              let alt = "";
              let href = "";
              insertFn(url, alt, href);
            },
            onBeforeUpload(file) {
              return file;
            },
            onProgress(progress) {},
            onSuccess(file, res) {},
          },
        },
      },
      mode: "default",
    };
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    upLoadBefore(index) {
      this.index = index.$index;
    },
    upLoadStore(info) {
      if (info.status == "success") {
        this.form.spartParts[this.index].partPicList = [
          {
            fileName: info.response.data.fileName,
            type: "spart",
            fileLog: 49,
            url: `http://58.33.34.10:10443/images/spart/${info.response.data.fileName}`,
          },
        ];
      }
    },
    upLoadChange(info, list) {
      if (info.status == "success") {
        this.picList2 = list.map((item) => {
          return {
            fileName: item.response.data.fileName,
            type: "spart",
            fileLog: 48,
          };
        });
      }
    },
    storeDelete(info) {
      let arr = [...this.form.spartParts];
      this.form.spartParts = arr.filter((item, index) => index != info.$index);
    },
    storeListAdd() {
      let index = this.index++;
      this.form.spartParts.push({
        partPicList: [],
        model: "",
        spartMoney: "",
        quantity: "",
      });
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
    reStatusChange(status) {
      this.reStatus = status;
    },
    onSubmit(info) {
      let params = { ...info } || {};
      params.partExplain = [...new Set(params.partExplain)].join("/");
      params.picList = this.picList2;
      saveSpart(params).then((res) => {
        if (res.status == 200) {
          // this.$router.push("/workbench/spart/spartList");
          this.reStatus = true;
        }
      });
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.reSpart {
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 99%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
  }
  .el-upload {
    .el-icon-plus::after {
      margin: 0 auto;
      margin-top: 10%;
      font-size: 13px;
      content: "点击上传图片";
      display: table;
    }
  }
  .storeImg {
    width: 150px;
    height: 150px;
  }
  /deep/.cell .el-upload--picture-card {
    // line-height: 120px;
    // width: 120px;
    // height: 120px;
  }
  /deep/.el-table__header-wrapper {
    height: 1px;
  }
}
</style>