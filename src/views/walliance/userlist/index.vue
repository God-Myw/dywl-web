<template>
  <div class="userlist">
    <div class="user-title">用户列表</div>
    <div class="user-cont">
      <div class="cont-input">
        <div>公司名称：</div>
        <div>
          <t-input
            style="width: 240px"
            v-model="company"
            clearable
            placeholder="请填写您要搜索的公司名"
          />
        </div>
        <div><t-button @click="inquire">查询</t-button></div>
        <div><t-button @click="reset" variant="outline">重置</t-button></div>
      </div>
      <div class="cont-table">
        <div class="cont-table-down">
          <div>用户列表</div>
          <div>
            <download-excel
              class="export-excel-wrapper"
              :data="json_data"
              :fields="json_fields"
              name="用户列表.xls"
            >
              <t-button variant="outline">
                <icon
                  name="download"
                  style="margin-right: 4px"
                />导出全部页excel
              </t-button>
            </download-excel>
          </div>
        </div>
        <t-table
          rowKey="index"
          :data="dataList"
          :columns="columns"
          :hover="true"
          size="medium"
          :pagination="pagination"
          @page-change="onPageChange"
        >
          <template #userType="{ row }">
            <p v-if="row.userType == 0">管理员</p>
            <p v-if="row.userType == 1">线上客服</p>
            <p v-if="row.userType == 2">线下客服</p>
            <p v-if="row.userType == 3">审核客服</p>
            <p v-if="row.userType == 4">货主</p>
            <p v-if="row.userType == 5">船东</p>
            <p v-if="row.userType == 6">服务商</p>
            <p v-if="row.userType == 7">推广人员</p>
          </template>
          <template #checkStatus="{ row }">
            <p v-if="row.checkStatus == 0" class="unhealth">未认证</p>
            <p v-if="row.checkStatus == 1" class="warning">待审核</p>
            <p v-if="row.checkStatus == 2" class="status">已认证</p>
            <p v-if="row.checkStatus == 3" class="unhealth">未通过</p>
          </template>
          <template #createDate="{ row }">
            <p>{{ row.createDate | renderTimeY }}</p>
          </template>
          <template #account="{ row }">
            <p class="account-c">{{ row.account }}</p>
          </template>
          <template #operation="{ row }">
            <t-popconfirm theme="default" content="确认删除订单吗">
              <a class="link" @click="rehandleClickOp(row)">解除关系</a>
            </t-popconfirm>
          </template>
        </t-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "tdesign-icons-vue";
import { getSubordinateList, updatejms } from "../../../api/walliance.js";
export default {
  data() {
    return {
      // excel表
      json_fields: {
        公司名称:'companyName',
        类型:'userType',
        认证状态:'checkStatus',
        "账户余额(元)": "yue",
        用户名:'lastName',
        创建时间:'createDate',
      },
      json_data: [],
      company: "",
      dataList: [],
      // 表头
      columns: [
        {
          colKey: "companyName",
          title: "公司名称",
          width: 252,
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "userType",
          title: "类型",
          width: 116,
          className: "custom-class-th",
        },
        {
          colKey: "checkStatus",
          title: "认证状态",
          width: 104,
          className: "custom-class-th",
        },
        {
          colKey: "yue",
          title: "账户余额(元)",
          width: 144,
          align: "right",
          className: "custom-class-th-t",
        },
        {
          colKey: "lastName",
          title: "用户名",
          width: 144,
          className: "custom-class-th",
        },
        {
          colKey: "createDate",
          title: "创建时间",
          width: 144,
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "operation",
          title: "操作",
          width: 144,
          cell: "operation",
          className: "custom-class-th",
        },
      ],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: 0,
        showJumper: true,
      },
    };
  },
  components: { Icon },
  created() {
    this.inquire();
  },
  methods: {
    inquire(val) {
      if (val != "page") {
        this.pagination.defaultCurrent = 1;
        this.pagination.defaultPageSize = 10;
      }
      let prams = {
        companyName: this.company,
        currentPage: this.pagination.defaultCurrent,
        pageSize: this.pagination.defaultPageSize,
      };
      getSubordinateList(prams).then((res) => {
        if (res.code == "0000") {
          this.dataList = res.data.users;
          this.pagination.total = res.data.total;
          // 下载excel表
          this.json_data = res.data.users;
          this.json_data.map((item) => {
            switch (item.userType) {
              case 0:
                item.userType = "管理员";
                break;
              case 1:
                item.userType = "线下客服";
                break;
              case 2:
                item.userType = "线下客服";
                break;
              case 3:
                item.userType = "审核客服";
                break;
              case 4:
                item.userType = "货主";
                break;
              case 5:
                item.userType = "船东";
                break;
              case 6:
                item.userType = "服务商";
                break;
              case 7:
                item.userType = "推广人员";
                break;

              default:
                break;
            }

            switch (item.checkStatus) {
              case 0:
                item.checkStatus = "未认证";
                break;
              case 1:
                item.checkStatus = "待审核";
                break;
              case 2:
                item.checkStatus = "已认证";
                break;
              case 3:
                item.checkStatus = "未通过";
                break;

              default:
                break;
            }

            let dateee = new Date(item.createDate).toJSON();
            let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
            item.createDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
          });
        } else {
          this.dataList = [];
        }
      });
    },
    reset() {
      this.company = "";
      this.inquire();
    },
    // 表格操作
    rehandleClickOp(row) {
      let data = {
        guid: row.guid,
      };
      updatejms(data).then((res) => {
        if (res.code == "0000") {
          // console.log(res.data);
          this.$message.success(res.message);
          this.inquire();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    onPageChange(pageInfo, newData) {
      this.pagination.defaultCurrent = pageInfo.current;
      this.pagination.defaultPageSize = pageInfo.pageSize;
      this.inquire("page");
    },
  },
};
</script>

<style lang="scss" scoped>
.userlist {
  background: #f5f7fa;
  padding-bottom: 80px;
  .user-title {
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
  .user-cont {
    .cont-input {
      padding: 0 20px;
      display: flex;
      height: 80px;
      align-items: center;
      width: 1164px;
      margin: 0 auto;
      background: #ffffff;
      margin-bottom: 12px;
      border-radius: 4px;
      div:nth-child(1) {
        font-size: 14px;
      }
      div:nth-child(3) {
        margin: 0 12px 0 32px;
      }
    }
    .cont-table {
      width: 1164px;
      padding: 0 20px 44px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 4px;
      .cont-table-down {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0 20px 0;
        div:nth-child(1) {
          font-family: "SourceHanSansCN-Medium", Arial;
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }
}
/deep/.custom-class-index {
  padding: 13px 10px 12px 10px;
}
/deep/.custom-class-th {
  padding: 13px 16px 12px 16px;
}
/deep/ .custom-class-th-t {
  padding: 13px 32px 12px 16px;
}
.account-c {
  color: #e34d59;
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
</style>
