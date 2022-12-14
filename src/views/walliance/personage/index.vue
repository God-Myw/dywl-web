<template>
  <div class="personage">
    <div class="per-title">个人中心</div>
    <div class="per-cont">
      <t-tabs v-model="value">
        <t-tab-panel :value="1" label="基础信息">
          <t-loading size="medium" :loading="infoloading" showOverlay>
            <div
              v-if="CheckStatus == 2"
              style="
                font-size: 14px;
                color: #00a870;
                margin-top: 30px;
                line-height: 20px;
              "
            >
              <icon
                name="check-circle-filled"
                size="20px"
                style="color: #00a870"
              />
              基础信息审核已通过
            </div>
            <div
              v-if="CheckStatus == 1"
              style="
                font-size: 14px;
                color: #ed7b2f;
                margin-top: 30px;
                line-height: 20px;
              "
            >
              <icon
                name="info-circle-filled"
                size="20px"
                style="color: #ed7b2f"
              />
              基础信息正在审核中
            </div>
            <div style="margin-top: 32px">
              <t-form
                :data="formData"
                ref="informationform"
                :rules="rules"
                :disabled="formDisabled"
                labelWidth="140px"
                @submit="onSubmit"
              >
                <div v-if="roleinfo.applyType == 2">
                  <t-form-item label="公司名称" name="companyName">
                    <t-input
                      v-model="formData.companyName"
                      style="width: 400px"
                      clearable
                      placeholder="请填写公司名称"
                    ></t-input>
                  </t-form-item>
                  <t-form-item label="公司类型" name="companyType">
                    <t-input
                      v-model="formData.companyType"
                      style="width: 400px"
                      clearable
                      placeholder="请填写公司类型"
                    ></t-input>
                  </t-form-item>
                  <t-form-item label="统一社会信用代码" name="creditCode">
                    <t-input
                      v-model="formData.creditCode"
                      style="width: 400px"
                      clearable
                      placeholder="请填写信用代码"
                    ></t-input>
                  </t-form-item>
                  <t-form-item label="成立日期" name="setDate">
                    <t-date-picker
                      v-model="formData.setDate"
                      style="width: 400px"
                      mode="date"
                      clearable
                    />
                  </t-form-item>

                  <t-form-item label="公司地址" name="shippingAddress">
                    <t-cascader
                      v-model="formData.shippingAddress"
                      :options="shipAddress"
                      clearable
                      valueType="full"
                      style="width: 400px; background: #fff"
                      class="t-demo-cascader"
                      trigger="hover"
                      placeholder="所在地区（省 / 市 / 区）"
                      :keys="{ label: 'label', value: 'label' }"
                    ></t-cascader>
                  </t-form-item>
                  <t-form-item label="详细地址" name="receivingAddressDetails">
                    <t-textarea
                      v-model="formData.receivingAddressDetails"
                      style="width: 400px"
                      placeholder="请填写详细地址"
                      :autosize="{ minRows: 3, maxRows: 3 }"
                    />
                  </t-form-item>
                </div>

                <t-form-item label="法定代表人" name="representa">
                  <t-input
                    v-model="formData.representa"
                    style="width: 400px"
                    clearable
                    placeholder="请填写姓名"
                  ></t-input>
                </t-form-item>
                <t-form-item label="联系方式" name="contact">
                  <t-input
                    v-model="formData.contact"
                    style="width: 400px"
                    clearable
                    placeholder="请填写联系方式"
                  ></t-input>
                </t-form-item>

                <t-form-item
                  label="上传营业执照"
                  name="license"
                  v-if="roleinfo.applyType == 2"
                >
                  <t-upload
                    class="certificate"
                    action="https://www.dylnet.cn/api/sys/file/upLoadFuJian/pallet"
                    v-model="formData.license"
                    theme="image"
                    multiple
                    accept="image/*"
                  ></t-upload>
                </t-form-item>

                <t-form-item
                  class="identity"
                  style="margin-bottom: 20px"
                  label="上传法人身份证"
                  name="identityfront"
                >
                  <t-upload
                    class="identity_front"
                    action="https://www.dylnet.cn/api/sys/file/upLoadFuJian/pallet"
                    v-model="formData.identityfront"
                    theme="image"
                    accept="image/*"
                    :max="1"
                  ></t-upload>
                  <t-upload
                    class="identity_behind"
                    action="https://www.dylnet.cn/api/sys/file/upLoadFuJian/pallet"
                    v-model="formData.identitybehind"
                    theme="image"
                    accept="image/*"
                    :max="1"
                  ></t-upload>
                </t-form-item>
                <t-form-item label="上传其他证件">
                  <t-upload
                    class="certificate"
                    action="https://www.dylnet.cn/api/sys/file/upLoadFuJian/pallet"
                    v-model="formData.otherpapers"
                    theme="image"
                    multiple
                    accept="image/*"
                  ></t-upload>
                </t-form-item>
              </t-form>
              <div style="margin: 24px 0 164px 140px; margin-top: 24px">
                <t-button
                  @click="getAudit"
                  :disabled="formDisabled"
                  style="padding: 0 69px; font-size: 16px; height: 40px"
                  >提交审核</t-button
                >
              </div>
            </div>
          </t-loading>
        </t-tab-panel>
        <t-tab-panel :value="2" label="隐私">
          <div style="margin-top: 32px">
            <t-form
              :data="privacyData"
              ref="privacyform"
              :rules="rules"
              labelWidth="140px"
              @submit="changecode"
            >
              <t-form-item label="修改密码" name="passWord">
                <t-input
                  v-model="privacyData.passWord"
                  style="width: 400px"
                  clearable
                  placeholder="请填写密码"
                ></t-input>
              </t-form-item>
              <t-form-item label="再次确认修改" name="repetition">
                <t-input
                  v-model="privacyData.repetition"
                  style="width: 400px"
                  clearable
                  placeholder="再次填写密码"
                ></t-input>
              </t-form-item>
            </t-form>
            <div style="margin: 24px 0 164px 140px; margin-top: 24px">
              <t-button
                @click="alterword"
                style="padding: 0 69px; font-size: 16px; height: 40px"
                >确认修改</t-button
              >
            </div>
          </div>
        </t-tab-panel>
      </t-tabs>
    </div>
    <t-dialog
      theme="success"
      header="成功"
      body="提交成功，待系统审核资料"
      :visible.sync="auditStutas"
      :footer="false"
      :onClose="onClose"
    />
  </div>
</template>

<script>
import shipAddress from "../../../assets/area.json";
import { Icon } from "tdesign-icons-vue";
import {
  information,
  changepwd,
  getPersonalCenter,
} from "../../../api/walliance.js";
export default {
  data() {
    return {
      value: 1,
      formDisabled: false,
      auditStutas: false,
      infoloading: false,
      roleinfo: [],
      picList: [],
      formData: {
        companyName: "",
        companyType: "",
        creditCode: "",
        setDate: [],
        shippingAddress: [],
        receivingAddressDetails: "",
        representa: "",
        contact: "",
        license: [],
        identityfront: [],
        identitybehind: [],
        otherpapers: [],
      },
      CheckStatus: "",
      shipAddress: [],
      privacyData: {
        passWord: "",
        repetition: "",
      },
      rules: {
        companyName: [{ required: true, message: "请填写公司名称" }],
        companyType: [{ required: true, message: "请填写公司类型" }],
        creditCode: [{ required: true, message: "请填写信用代码" }],
        setDate: [{ required: true, message: "请选中成立日期" }],
        shippingAddress: [{ required: true, message: "请选择属于地区" }],
        receivingAddressDetails: [
          { required: true, message: "请填写详情地址" },
        ],

        representa: [{ required: true, message: "请填写姓名" }],
        contact: [{ required: true, message: "请填写联系方式" }],

        license: [{ required: true, message: "请上传营业执照" }],
        identityfront: [
          { required: true, message: "请上传法人身份证" },
          {
            validator: this.identitybehind,
            message: "请上传法人身份证背面",
          },
        ],
        passWord: [{ required: true, message: "请填写密码" }],
        repetition: [
          { required: true, message: "请填写二次密码" },
          {
            validator: this.repetition,
            message: "两次密码不一致",
          },
        ],
      },
    };
  },
  components: { Icon },
  computed: {
    behind() {
      return this.formData.identitybehind;
    },
  },
  watch: {
    behind() {
      if (
        this.formData.identityfront.length != 0 &&
        this.formData.identitybehind.length != 0
      ) {
        document
          .getElementsByClassName("identity ")[0]
          .getElementsByClassName("t-input__extra")[0].style.display = "none";
      } else {
        document
          .getElementsByClassName("identity ")[0]
          .getElementsByClassName("t-input__extra")[0].style.display = "block";
      }
    },
  },

  methods: {
    gettext() {
      document
        .getElementsByClassName("identity_front")[0]
        .getElementsByClassName("t-size-s")[0].innerHTML = "上传身份证正面";
      document
        .getElementsByClassName("identity_behind")[0]
        .getElementsByClassName("t-size-s")[0].innerHTML = "上传身份证背面";
      document
        .getElementsByClassName("certificate")[0]
        .getElementsByClassName("t-size-s")[0].innerHTML = "上传其他证件";
    },
    // 自定义检验规则
    identitybehind() {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve(
            this.formData.identityfront.length != 0 &&
              this.formData.identitybehind.length != 0
          );
          clearTimeout(timer);
        });
      });
    },
    getAudit() {
      this.$refs.informationform.submit();
    },
    onSubmit({ validateResult }) {
      if (validateResult === true) {
        this.formData.license.map((item) => {
          this.picList.push({
            fileName: item.response.data.fileName,
            type: "apply",
            filelog: "45",
          });
        });
        this.picList.push({
          fileName: this.formData.identityfront[0].response.data.fileName,
          type: "apply",
          filelog: "46",
        });
        this.picList.push({
          fileName: this.formData.identitybehind[0].response.data.fileName,
          type: "apply",
          filelog: "46",
        });
        this.formData.otherpapers.map((item) => {
          this.picList.push({
            fileName: item.response.data.fileName,
            type: "apply",
            filelog: "47",
          });
        });

        let data = {
          applyConmpanyAddress: this.formData.companyName,
          applyConmpanyType: this.formData.companyType,
          creditCode: this.formData.creditCode,
          lncorporation: this.formData.setDate,
          applyAddress: this.formData.shippingAddress.toString(),
          companyAddress: this.formData.receivingAddressDetails,
          picList: this.picList,
          representativeName: this.formData.representa,
          applyPhoneNumber: this.formData.contact,
        };
        this.infoloading = true;
        information(data).then((res) => {
          if (res.code == "0000") {
            this.infoloading = false;
            this.auditStutas = true;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    onClose() {
      this.auditStutas = true;
    },
    repetition() {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve(this.privacyData.passWord === this.privacyData.repetition);
          clearTimeout(timer);
        });
      });
    },
    alterword() {
      this.$refs.privacyform.submit();
    },
    changecode({ validateResult }) {
      if (validateResult === true) {
        let data = {
          newPassword: this.privacyData.passWord,
          repeatPassword: this.privacyData.repetition,
        };
        changepwd(data).then((res) => {
          if (res.code == "0000") {
            this.privacyData.repetition = "";
            this.privacyData.passWord = "";
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    getperList() {
      getPersonalCenter().then((res) => {
        if (res.code == "0000") {
          // console.log(res);
          if (res.data.applyDetailDto) {
            this.formDisabled = true;
          }

          this.formData.companyName =
            res.data.applyDetailDto.applyConmpanyAddress;
          this.formData.companyType = res.data.applyDetailDto.applyConmpanyType;
          this.formData.creditCode = res.data.applyDetailDto.creditCode;
          this.formData.setDate = res.data.applyDetailDto.lncorporation;
          this.formData.shippingAddress =
            res.data.applyDetailDto.applyAddress.split(",");
          this.formData.receivingAddressDetails =
            res.data.applyDetailDto.companyAddress;
          this.formData.representa = res.data.applyDetailDto.representativeName;
          this.formData.contact = res.data.applyDetailDto.applyPhoneNumber;
          this.CheckStatus = res.data.applyDetailDto.applyCheckStatus;
        }
      });
    },
  },
  mounted() {
    // 设置上传文字
    this.gettext();
  },
  created() {
    this.shipAddress = shipAddress;
    if (JSON.parse(localStorage.getItem("roleinfo"))) {
      this.roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
    }
    // 获取列表
    this.getperList();
  },
};
</script>

<style lang="scss" scoped>
.personage {
  background: #f5f7fa;
  height: 100%;

  .per-title {
    width: 100%;
    height: 48px;
    background: #e6e9ee;
    padding-left: 28px;
    line-height: 48px;
    font-size: 16px;
    color: #333333;
    font-family: "SourceHanSansCN-Medium", Arial;
    margin-bottom: 24px;
  }
  .per-cont {
    margin: 0 24px;
    height: calc(100% - 104px);
    background: #fff;
    .t-tabs {
      padding: 12px 32px;
      .identity_front {
        margin-right: 12px;
      }
    }
  }
}
</style>
