<template>
  <div class="reSpart">
    <Worktitle title="发布船舶备件"></Worktitle>
    <div v-if="reStauts" class="box spartInfo">
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
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="商品品牌" prop="name">
              <el-input size="small" v-model="form.name"></el-input>
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
                v-model="form.name"
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
                :file-list="form.fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="24">
            <el-form-item label="商品型号/价格" prop="name">
              <el-table :data="form.storeTable" style="width: 100%">
                <el-table-column prop="date" label="型号图片">
                  <template slot-scope="scope">
                    <div>
                      <el-upload
                        action="http://58.33.34.10:10443/api/sys/file/upLoadFuJian/spart"
                        list-type="picture-card"
                        accept=".gif,.bmp,.png,.img,.jpeg,.jpg,.tiff"
                        :on-change="upLoadChange"
                        :file-list="form.storeTable[0].fileList"
                        :limit="1"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="型号">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.storeTable.name"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="价格">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.storeTable.name"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="库存">
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        size="small"
                        v-model="form.storeTable.name"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="">
                  <template slot-scope="scope">
                    <div>
                      <i class="el-icon-delete" @click="storeDelete"></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="demo-autocomplete">
          <el-col :span="10">
            <el-form-item label="说明" prop="name">
              <el-input
                style="display: inline-block"
                v-for="(item, index) in exPlainArr"
                size="small"
                v-model="form.name"
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
                @click="exAdd"
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
                  @onCreated="onCreated"
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
    <div v-else class="box reSuccess">
      <div>
        <i class="el-icon-check"></i>
      </div>
      <div>恭喜,你的备件已发布成功!</div>
      <div>
        <el-button
          type="primary"
          plain
          @click="
            () => {
              this.$router.push('/workbench/release');
            }
          "
          >返回备件管理
        </el-button>
        <el-button
          type="primary"
          plain
          @click="
            () => {
              this.reStauts = !this.reStauts;
            }
          "
          >继续发布备件</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { saveSpart } from "../../../../api/workbench";
import Worktitle from "../../../../components/WorkTitle.vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Worktitle, Editor, Toolbar },
  data() {
    return {
      form: {
        region: "",
        name: "",
        fileList: [],
        storeTable: [{ name: "", fileList: [] }],
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      exPlainArr: [1, 2],
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
      reStauts: true,
    };
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    getData() {},
    upLoadChange(info) {},
    storeDelete(guid) {},
    exAdd() {
      this.exPlainArr.push(1);
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onSubmit(info) {
      let params = {
        tradeName: "商品名称",
        brand: "商品品牌",
        placeOf: "产地",
        picList: [
          {
            fileName: "轮播图1",
            type: "spart",
            fileLog: 48,
          },
          {
            fileName: "轮播图2",
            type: "spart",
            fileLog: 48,
          },
        ],
        spartParts: [
          {
            partPicList: [
              {
                fileName: "详情图1",
                type: "spart",
                fileLog: 49,
              },
            ],
            model: "商品型号",
            spartMoney: "125.51",
            quantity: 12,
          },
          {
            partPicList: [
              {
                fileName: "详情图2",
                type: "spart",
                fileLog: 49,
              },
            ],
            model: "商品型号",
            spartMoney: "5641.49",
            quantity: 23,
          },
        ],
        partExplain: "说明",
        details: "详情",
      };
      saveSpart(params).then((res) => {
        console.log(res);
      });
      // this.reStauts = !this.reStauts;
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
  /deep/.cell .el-upload--picture-card {
    line-height: 90px;
    width: 80px;
    height: 80px;
  }
  .reSuccess {
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      margin: 10px 0px;
    }
    div:nth-child(1) {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      display: grid;
      place-items: center;
      background-color: #4486f6;
      i {
        border-radius: 50px;
        font-size: 40px;
        color: #ffffff;
        background-color: #4486f6;
      }
    }
    div:nth-child(2) {
      font-size: 16px;
      font-weight: 10;
    }
  }
}
</style>