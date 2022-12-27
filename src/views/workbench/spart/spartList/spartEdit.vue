<template>
  <div class="spartEdit">
    <div class="box">
      <Worktitle title="编辑船舶备件"></Worktitle>
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
                v-model="form.oneLev"
                placeholder=""
              >
                <el-option label="1级分类" value="1级分类"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="二级分类" prop="name">
              <el-select
                style="width: 100%"
                size="small"
                v-model="form.twoLev"
                placeholder=""
              >
                <el-option label="2级分类" value="2级分类"></el-option>
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
                      <div
                        class="storeImgBox"
                        v-show="scope.row.partPicList[0]"
                      >
                        <img
                          class="storeImg"
                          :src="
                            scope.row.partPicList[0]
                              ? scope.row.partPicList[0].url
                              : ''
                          "
                        />
                        <i
                          class="el-icon-delete"
                          @click="storeImgDel(scope)"
                        ></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        placeholder="请填写型号名"
                        size="small"
                        v-model="scope.row.model"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div class="yuan">
                      <el-input
                        placeholder="请填写价格"
                        size="small"
                        v-model="scope.row.spartMoney"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        placeholder="请填写库存数"
                        size="small"
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
        <el-row :gutter="24" class="demo-autocomplete submitFix">
          <el-col :span="6">
            <el-form-item> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                style="margin-right: 50px"
                @click="
                  () => {
                    this.$router.push('/workbench/spart/spartList');
                  }
                "
                >取消</el-button
              >
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
      index: 0,
      form: {
        guid: "",
        oneLev: "1级分类",
        twoLev: "2级分类",
        tradeName: "",
        brand: "",
        picList: [],
        spartParts: [
          {
            partPicList: [{}],
            model: "",
            spartMoney: "",
            quantity: "",
          },
        ],
        partExplain: [],
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
  mounted() {
    getSpartLevel().then((res) => {
      if (res.code == "0000") {
        res.data.map((item) => {});
      }
      this.form.oneLev = res.data[0].oneLevelName;
      this.form.twoLev = res.data[1].oneLevelName;
    });
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
          if (res.data.spartParts) {
            res.data.spartParts.map((item, index, arr) => {
              if (item.partPicList) {
                arr[
                  index
                ].partPicList[0].url = `http://58.33.34.10:10443/images/spart/${item.partPicList[0].fileName}`;
              }
            });
          }
          let partExplain = res.data.partExplain.split("/").filter(Boolean);
          this.form.guid = res.data.guid || "";
          this.form.tradeName = res.data.tradeName || "";
          this.form.brand = res.data.brand || "";
          this.form.picList = picList || [];
          this.picList2 = res.data.picList || [];
          this.form.spartParts = res.data.spartParts || [];
          this.form.partExplain = partExplain || "";
          this.form.details = res.data.details || "";
          this.editor.setHtml(res.data.details);
        }
      });
    },
    upLoadBefore(index) {
      this.index = index.$index;
    },

    storeImgDel(index) {
      let obj = { ...this.form.spartParts[index.$index] };
      obj.partPicList = [];
      this.$set(this.form.spartParts, index.$index, obj);
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
    position: relative;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
    .yuan {
      position: relative;
    }
    .yuan::after {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      content: "元";
      display: table;
    }
    .submitFix {
      width: 100%;
      position: fixed;
      bottom: 0;
      background-color: #ffffff;
    }
  }
  /deep/.el-upload {
    .el-icon-plus::after {
      margin: 0 auto;
      margin-top: 10%;
      font-size: 13px;
      content: "点击上传图片";
      display: table;
    }
  }
  .storeImgBox {
    display: grid;
    place-items: center;
    width: 150px;
    height: 150px;
    z-index: 9;
    .storeImg {
      width: 150px;
      height: 150px;
    }
    i {
      position: absolute;
      font-size: 26px;
      display: none;
      cursor: pointer;
    }
  }
  .storeImgBox:hover .el-icon-delete {
    display: block;
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