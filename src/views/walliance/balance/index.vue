<template>
  <div class="userlist">
    <div class="user-title">账户余额</div>
    <div class="user-cont">
      <div class="cont-input">
        <div>累计返利</div>
        <div>{{ moneySum }}</div>
        <div>元</div>
        <div>下级用户手机号：</div>
        <div>
          <t-input
            style="width: 240px"
            v-model="subordinate"
            clearable
            placeholder="请填写您要搜索的下级用户手机号"
          />
        </div>
        <div><t-button @click="inquire">查询</t-button></div>
        <div><t-button @click="reset" variant="outline">重置</t-button></div>
      </div>
      <div class="cont-table">
        <div class="cont-table-down">
          <div>账户余额</div>
          <div>
            <download-excel
              class="export-excel-wrapper"
              :data="dataList"
              :fields="json_fields"
              name="账户余额.xls"
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
          <template #create_date="{ row }">
            <p>{{ row.create_date | renderTimeY }}</p>
          </template>
          <template #application="{ row }">
            <p v-if="row.pay_type == 1">加油返利</p>
          </template>
          <template #name="{ row }">
            <p>{{ row.first_name }}{{ row.last_name }}</p>
          </template>
          <template #money="{ row }">
            <p class="account-c">{{ row.money }}</p>
          </template>
        </t-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "tdesign-icons-vue";
import { applyAebate } from "../../../api/walliance.js";
export default {
  components: { Icon },
  data() {
    return {
      // excel表
      json_fields: {
        日期: "create_date",
        下级用户名: "name",
        返利类型: "pay_type",
        下级用户手机号: "phone_number",
        "返利金额(元)": "money",
      },
      json_data: [],
      subordinate: "",
      moneySum: "",
      dataList: [],
      // 表头
      columns: [
        {
          colKey: "create_date",
          title: "日期",
          ellipsis: true,
          className: "custom-class-th",
        },
        {
          colKey: "name",
          title: "下级用户名",
          className: "custom-class-th",
        },
        {
          colKey: "application",
          title: "返利类型",
          className: "custom-class-th",
        },
        {
          colKey: "phone_number",
          title: "下级用户手机号",
          className: "custom-class-th",
        },
        {
          colKey: "money",
          title: "返利金额(元)",

          align: "right",
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
        phoneNumber: this.subordinate,
        currentPage: this.pagination.defaultCurrent,
        pageSize: this.pagination.defaultPageSize,
      };
      applyAebate(prams).then((res) => {
        if (res.code == "0000") {
          this.dataList = res.data.userRebateList;
          this.moneySum = res.data.moneySum;
          this.pagination.total = res.data.total;
          // 下载excel表
          this.json_data = res.data.userRebateList;
          this.json_data.map((item) => {
            if (item.pay_type == 1) {
              item.pay_type = "加油返利";
            }
            item.name = item.first_name + item.last_name;

            let dateee = new Date(item.create_date).toJSON();
            let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
            item.create_date = /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
          });
        } else {
          this.dataList = [];
        }
      });
    },
    reset() {
      this.subordinate = "";
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
        color: #666666;
        margin-right: 32px;
      }
      div:nth-child(2) {
        font-family: "d-din-bold", Arial;
        font-size: 28px;
        color: #333333;
      }
      div:nth-child(3) {
        font-size: 18px;
        margin: 0 126px 0 5px;
      }
      div:nth-child(4) {
        font-size: 14px;
      }
      div:nth-child(6) {
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
