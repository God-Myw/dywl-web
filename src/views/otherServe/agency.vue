<template>
  <div class="otherServe-agency">
    <div class="bg-agency">
      <div class="agency">
        <div class="agency-title">加盟商申请</div>
        <div class="agency-nav">
          <t-tabs v-model="value">
            <t-tab-panel value="first" label="我要申请">
              <t-loading size="medium" :loading="loading" showOverlay>
                <div class="agency-submit">
                  <t-form
                    :data="formData"
                    :rules="rules"
                    @submit="onSubmit"
                    ref="form"
                  >
                    <t-form-item label="申请类型" name="applyType">
                      <t-radio-group v-model="formData.applyType">
                        <t-radio value="1">个人</t-radio>
                        <t-radio value="2">企业</t-radio>
                      </t-radio-group>
                    </t-form-item>
                    <t-form-item
                      v-if="formData.applyType == '2'"
                      label="企业名称"
                      name="enterprise"
                    >
                      <t-input
                        style="width: 400px"
                        v-model="formData.enterprise"
                        clearable
                        placeholder="请填写企业名称"
                      ></t-input>
                    </t-form-item>
                    <t-form-item label="联系人" name="relation">
                      <t-input
                        style="width: 400px"
                        v-model="formData.relation"
                        clearable
                        placeholder="请填写联系人"
                      ></t-input>
                    </t-form-item>
                    <t-form-item label="联系电话" name="phoneNumber">
                      <t-input
                        style="width: 400px"
                        clearable
                        v-model="formData.phoneNumber"
                        placeholder="请填写手机号"
                      ></t-input>
                    </t-form-item>
                    <t-form-item label="联系邮箱" name="mailbox">
                      <t-input
                        style="width: 400px"
                        clearable
                        v-model="formData.mailbox"
                        placeholder="请填写邮箱"
                      ></t-input>
                    </t-form-item>
                    <t-form-item label="所属地区" name="shippingAddress">
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
                    <t-form-item
                      label="详细地址"
                      name="receivingAddressDetails"
                    >
                      <t-textarea
                        v-model="formData.receivingAddressDetails"
                        style="width: 400px"
                        placeholder="请填写详细地址"
                        name="description"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                      />
                    </t-form-item>
                  </t-form>
                  <t-alert theme="info" style="width: 548px">
                    <div>1、申请后1-3个工作日由客服人员联系；</div>
                    <div>
                      2、申请通过后由道裕物流发放加盟商账号，重新以加盟商进行登录；
                    </div>
                    <div>3、第一次申请后，登录上传验证资质；</div>
                  </t-alert>
                  <div class="table-line"></div>
                  <div class="table-btn">
                    <t-button
                      @click="submit"
                      style="padding: 0 60px"
                      size="large"
                      >提交申请</t-button
                    >
                  </div>
                </div>
              </t-loading>
            </t-tab-panel>
            <t-tab-panel value="second" label="申请记录">
              <div class="nav-second" v-if="data">
                <t-table
                  rowKey="index"
                  :data="data"
                  :columns="columns"
                  :hover="true"
                  size="medium"
                >
                  <template #createDate="{ row }">
                    <p>{{ row.createDate | renderTimeY }}</p>
                  </template>
                  <template #jmsAccount="{ row }">
                    <p v-if="row.jmsAccount">{{ row.jmsAccount }}</p>
                    <p v-else>---</p>
                  </template>
                  <template #applyType="{ row }">
                    <p v-if="row.applyType == 1">个人</p>
                    <p v-if="row.applyType == 2">企业</p>
                  </template>
                  <template #checkStatus="{ row }">
                    <p v-if="row.checkStatus == 1" class="status">已通过</p>
                    <p v-if="row.checkStatus == 2" class="status warning">
                      待审核
                    </p>
                    <p v-if="row.checkStatus == 0" class="status unhealth">
                      不通过
                    </p>
                    <p v-if="row.checkStatus == 3" class="status normal">
                      已取消
                    </p>
                  </template>
                  <template #operation="{ row }">
                    <a
                      v-if="row.checkStatus == 2"
                      class="link"
                      @click="rehandleClickOp(row)"
                      >取消申请</a
                    >
                    <a v-else class="link">---</a>
                  </template>
                </t-table>
              </div>
              <div v-else class="agency-404"></div>
            </t-tab-panel>
          </t-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shipAddress from "../../assets/area.json";
import { saveUserApply, getUserApplyList } from "../../api/bulkCargo.js";
export default {
  data() {
    return {
      data: [],
      value: "first",
      loading: false,
      formData: {
        applyType: "1",
        enterprise: "",
        relation: "",
        phoneNumber: "",
        mailbox: "",
        shippingAddress: [],
        receivingAddressDetails: "",
      },
      shipAddress: [],
      rules: {
        applyType: [{ required: true, message: "请选择申请类型" }],
        relation: [{ required: true, message: "请填写联系人" }],
        mailbox: [{ required: false, message: "" }],
        shippingAddress: [{ required: true, message: "请选择属于地区" }],
        receivingAddressDetails: [
          { required: true, message: "请填写详情地址" },
        ],
        enterprise: [{ required: true, message: "请填写企业名称" }],
        phoneNumber: [
          { required: true, message: "请填写手机号" },
          { len: 11, message: "手机号格式错误" },
        ],
      },
      // 表头
      columns: [
        {
          colKey: "index",
          width: 48,
          title: "序号",
          // 对齐方式
          align: "center",
          className: "custom-class-index",
        },
        {
          colKey: "createDate",
          title: "申请日期",
          width: 136,
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "applyType",
          title: "类型",
          width: 66,
          className: "custom-class-th",
        },
        {
          colKey: "companyName",
          title: "企业名称",
          width: 150,
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "contacter",
          title: "联系人",
          width: 90,
          className: "custom-class-th",
        },
        {
          colKey: "phoneNumber",
          title: "联系电话",
          width: 128,
          className: "custom-class-th",
        },
        {
          colKey: "address",
          title: "所属地区",
          width: 172,
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "checkStatus",
          title: "申请状态",
          width: 94,
          className: "custom-class-th",
        },
        {
          colKey: "jmsAccount",
          title: "账号",
          width: 156,
          className: "custom-class-th",
        },
        {
          colKey: "operation",
          title: "操作",
          width: 104,
          cell: "operation",
          className: "custom-class-th",
        },
      ],
    };
  },
  created() {
    this.shipAddress = shipAddress;
    this.getList();
  },
  mounted() {},

  methods: {
    submit() {
      this.$refs.form.submit();
    },
    onSubmit({ validateResult }) {
      if (validateResult === true) {
        this.loading = true;
        saveUserApply({
          applyType: this.formData.applyType,
          contacter: this.formData.relation,
          companyName: this.formData.enterprise,
          phoneNumber: this.formData.phoneNumber,
          email: this.formData.mailbox,
          address: this.formData.shippingAddress.toString(),
          detailedAddress: this.formData.receivingAddressDetails,
        }).then((res) => {
          if (res.code == "0000") {
            this.$message.success("提交成功");
            this.loading = false;
            this.value = "second";
            this.getList();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    // 表格操作
    rehandleClickOp(row) {
      // console.log(row);
    },
    getList() {
      getUserApplyList().then((res) => {
        if (res.code == "0000") {
          res.data.map((item, index) => {
            item.index = index + 1;
          });
          this.data = res.data;
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.t-tabs__nav-item-wrapper {
  margin-left: 16px;
  margin-right: 16px;
}
/deep/.t-form__label {
  padding-right: 32px;
}
/deep/.t-alert--info {
  background-color: #eff5ff;
}
/deep/.custom-class-index {
  padding: 13px 10px 12px 10px;
}
/deep/.custom-class-th {
  padding: 13px 16px 12px 16px;
}
.link {
  cursor: pointer;
  color: #0052d9;
}
.status {
  position: relative;
  color: #00a870;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: "";
    background-color: #00a870;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: #e34d59;
  &::before {
    background-color: #e34d59;
  }
}
.status.warning {
  color: #ed7b2f;
  &::before {
    background-color: #ed7b2f;
  }
}
.status.normal {
  color: #999999;
  &::before {
    background-color: #999999;
  }
}
.otherServe-agency {
  .bg-agency {
    background: url("../../assets/otherServe/组 8098.png") no-repeat;
    background-size: 100% 200px;
    width: 100%;
    height: 100%;
    .agency {
      width: 1164px;
      margin: 0 auto;
      margin-bottom: 90px;
      .agency-title {
        padding: 66px 0 40px;
        font-size: 32px;
        color: #ffffff;
        line-height: 32px;
      }
      .agency-nav {
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 6px;
        padding-top: 10px;
        border: 1px solid #dddddd;
        .agency-submit {
          padding: 18px 33px 40px;
        }
        .table-line {
          margin: 25px 0 24px;
          border: 1px solid #eeeeee;
        }
        .nav-second {
          padding: 18px 0 40px 18px;
        }
        .agency-404 {
          background: url("../../assets/otherServe/组 8480.png") no-repeat;
          background-size: 284px 284px;
          width: 284px;
          height: 284px;
          margin: 60px auto;
          margin-bottom: 266px;
        }
      }
    }
  }
}
</style>
