<template>
  <div class="shipDeal" :class="{ intervoyageinland: clientSide }">
    <div class="shipDeal_header">
      <van-dropdown-menu active-color="#4486F6">
        <van-dropdown-item :title="shiptitle" ref="item">
          <div class="ship_type">
            <span
              v-for="item in navigating"
              :key="item.code"
              @click="shipclick(item.code)"
              >{{ item.textValue }}</span
            >
          </div>
        </van-dropdown-item>
        <van-dropdown-item
          v-model="navalue"
          :options="navoyage"
          :title="navtitle"
          @change="navClick"
        />
        <van-dropdown-item
          v-model="loadvalue"
          :options="shipload"
          :title="loadtitle"
          @change="loadClick"
        />
      </van-dropdown-menu>
    </div>
    <div class="shipDeal_cont">
      <div
        class="cont_item"
        v-for="(item, index) in dataList"
        :key="index"
        @click="openApp"
      >
        <div class="item_l"></div>
        <div class="item_r">
          <div class="item_r_name">
            <div>{{ item.shipType }}</div>
            <div>船级社：{{ item.classificationSociety }}</div>
            <div>船龄：{{ item.shipAge }}</div>
            <div>航区：{{ item.voyageArea }}</div>
          </div>
          <div class="item_r_price">
            <div class="item_r_price_rmb" v-if="item.budgetType == 1">
              <span>{{ item.budgetType }}</span>
              <span>万元</span>
            </div>
            <div class="item_r_price_without" v-if="item.budgetType == 2">
              面议
            </div>
            <div class="item_r_price_budget">买船预算</div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="是否打开道裕物流App"
      :show-confirm-button="false"
    >
      <div class="btnCs">
        <div class="btn-left" @click="btndis">取消</div>

        <div>
          <wx-open-launch-app
            id="launch-btn"
            @error="handleErrorFn"
            @launch="handleLaunchFn"
            appid="wx03327e343064e998"
          >
            <script type="text/wxtag-template">
              <style>.btn { color: #fff;padding: 6px 38px;border: 1px solid #4088F4;background: #4088F4;font-size: 16px; border-radius: 18px;}</style>
              <div class="btn">确定</div>
            </script>
          </wx-open-launch-app>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Swipe, SwipeItem, DropdownMenu, DropdownItem } from "vant";
Vue.use(Button).use(Swipe).use(SwipeItem).use(DropdownMenu).use(DropdownItem);
import CallApp from "callapp-lib";
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
export default {
  data() {
    return {
      clientSide: false,
      current: "",
      shiptitle: "船舶类型",
      navalue: "",
      navtitle: "航区",
      loadvalue: "",
      loadtitle: "载重吨",
      navigating: [{ textValue: "不限", code: "" }],
      navoyage: [{ text: "不限", value: 99 }],
      shipload: [
        { text: "不限", value: 1 },
        { text: "1601-4000吨", value: 2 },
        { text: "4001-7000吨", value: 3 },
        { text: "7001-14000吨", value: 4 },
        { text: "14001-20000吨", value: 5 },
        { text: "20001-30000吨", value: 6 },
        { text: "30000吨以上", value: 7 },
      ],
      dwt: "",
      dwtMax: "",
      dataList: [],
      shipType: "",
      voyageArea: "",
      show: false,
    };
  },
  mounted() {
    this.goodstype();
    this.goodsvoyage();
    this.getList();
    this.getweChatPay(this.getQueryVariable("token"));
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log('这是移动')
      this.clientSide = false;
    } else {
      this.clientSide = true;
    }
    // 设置单个页面的body的背景色
  },
  methods: {
    openApp() {
      this.show = true;
    },
    handleErrorFn() {
      const options = {
        scheme: {
          // 用来配置 URL Scheme 所必须的那些字段
          protocol: "DYLogisticsApp://", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
        },
        appstore: "https://apps.apple.com/cn/app/id1493154544", // appstore的下载地址
        yingyongbao:
          "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 应用宝的下载地址
        fallback:
          "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 唤端失败后跳转的地址
      };
      new CallApp(options).open({ path: "" });
    },
    handleLaunchFn() {
      this.show = false;
    },
    btndis() {
      this.show = false;
    },
    // 截取app传的token和参数
    getQueryVariable(variable) {
      // 获取？后参数的位置截取
      var query = window.location.href.substring(
        window.location.href.lastIndexOf("?") + 1
      );
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    async goodstype() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=ship_type"
      );
      if (res.data.code == "0000") {
        this.navigating = this.navigating.concat(res.data.data.zh[0].items);
      } else {
        this.navigating = [];
      }
    },
    async goodsvoyage() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=voyage_area"
      );
      if (res.data.code == "0000") {
        res.data.data.zh[0].items.map((item) => {
          let obj = {
            text: item.textValue,
            value: item.code,
          };
          this.navoyage.push(obj);
        });
      } else {
        this.navoyage = [];
      }
    },
    async getweChatPay(token) {
      webGetWXDetail({
        url: window.location.href.split("#")[0],
      }).then((res) => {
        if (res.code == "0000") {
          //通过config接口注入权限验证配置
          // eslint-disable-next-line no-undef
          wx.config({
            debug: false,
            appId: "wx3c5d7c6f964f3094",
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
            openTagList: ["wx-open-launch-app"],
          });
          // eslint-disable-next-line no-undef
          wx.ready(function () {
            var s_title = "道裕物流—船舶求购", // 分享标题
              s_link =
                "https://www.dylnet.cn/h5share/shipTobuy?token=" + token, // 分享链接
              s_desc = "全球买家发布国内、国际船舶求购信息。", //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 330.png"; // 分享图标
            // eslint-disable-next-line no-undef
            wx.updateAppMessageShareData({
              title: s_title, // 分享标题
              desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {},
            });
            // eslint-disable-next-line no-undef
            wx.updateTimelineShareData({
              title: s_desc, // 分享标题
              // desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {
                // 设置成功
              },
            });
          });
        }
      });
    },
    async getList() {
      if (this.shiptitle == "船舶类型" || this.shiptitle == "不限") {
        this.shipType = "";
      } else {
        this.shipType = this.shiptitle;
      }
      if (this.navtitle == "航区" || this.navtitle == "不限") {
        this.voyageArea = "";
      } else {
        this.voyageArea = this.navtitle;
      }
      let res = await axios.get(
        "https://www.dylnet.cn/api/business/ShipTransactionBuyer/getShipPurchaseListForApp",
        {
          headers: {
            token: this.getQueryVariable("token"),
          },
          params: {
            currentPage: "1",
            pageSize: "10",
            shipType: this.shipType,
            voyageArea: this.voyageArea,
            dwt: this.dwt,
            dwtMax: this.dwtMax,
          },
        }
      );
      if (res.data.code == "0000") {
        this.dataList = res.data.data.result;
      } else {
        this.dataList = [];
      }
    },
    onChange(index) {
      this.current = index;
    },
    shipclick(value) {
      this.navigating.map((item) => {
        if (item.code === value) {
          this.shiptitle = item.textValue;
        }
      });
      if (this.shiptitle == "不限") {
        this.shiptitle = "船舶类型";
      }
      this.$refs.item.toggle();
      this.getList();
    },
    navClick(value) {
      this.navoyage.map((item) => {
        if (item.value === value) {
          this.navtitle = item.text;
        }
      });
      if (this.navtitle == "不限") {
        this.navtitle = "航区";
      }
      this.getList();
    },
    loadClick(value) {
      switch (value) {
        case 1:
          this.dwt = "";
          this.dwtMax = "";
          break;
        case 2:
          this.dwt = 1601;
          this.dwtMax = 4000;
          break;
        case 3:
          this.dwt = 4001;
          this.dwtMax = 7000;
          break;
        case 4:
          this.dwt = 7001;
          this.dwtMax = 14000;
          break;
        case 5:
          this.dwt = 14001;
          this.dwtMax = 20000;
          break;
        case 6:
          this.dwt = 20001;
          this.dwtMax = 30000;
          break;
      }
      this.shipload.map((item) => {
        if (item.value === value) {
          this.loadtitle = item.text;
        }
      });
      if (this.loadtitle == "不限") {
        this.loadtitle = "载重吨";
      }
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 4px 7px;
  font-size: 12px;
  color: #ffffff;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
}
.custom-p {
  position: absolute;
  left: 15px;
  font-size: 14px;
  bottom: 5px;
  color: #ffffff;
}
.shipDeal {
  .shipDeal_header {
    height: 40px;
    position: fixed;
    top: 0;
    width: 100%;
    .van-dropdown-item {
      .ship_type {
        padding: 7px;
        span {
          box-sizing: border-box;
          display: inline-block;
          margin: 5px;
          border: 1px solid #fff;
          padding: 4px 14px;
          font-size: 14px;
          color: #666666;
          text-align: center;
          background: #f1f3f5;
          border-radius: 4px;
          &:hover {
            border: 1px solid #74a7ff;
            background: #eef6ff;
            color: #4486f6;
          }
        }
      }
    }
  }
  .shipDeal_cont {
    margin-top: 60px;
    .cont_item {
      background: #ffffff;
      border-radius: 6px;
      margin: 10px 10px 0 10px;
      padding: 20px 16px 20px;
      display: flex;
      .item_l {
        margin-top: 2px;
        margin-right: 8px;
        background: url("../../assets/container/组 10225@2x.png") no-repeat;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
      }
      .item_r {
        flex: 1;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        .item_r_name {
          div:nth-child(1) {
            font-size: 18px;
            font-family: "tyzt-zht", Arial;
            height: 25px;
            line-height: 25px;
            color: #333333;
            margin-bottom: 4px;
          }
          div:nth-child(2) {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            color: #666666;
            margin-bottom: 4px;
          }
          div:nth-child(3) {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            color: #666666;
            margin-bottom: 4px;
          }
          div:nth-child(4) {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            color: #666666;
          }
        }
        .item_r_price {
          padding-top: 23px;
          .item_r_price_rmb {
            span:nth-child(1) {
              font-family: "d-din-bold", Arial;
              font-size: 24px;
              color: #e6531d;
            }
            span:nth-child(2) {
              font-size: 14px;
              font-family: "tyzt-zht", Arial;
              color: #e6531d;
            }
          }
          .item_r_price_without {
            height: 25px;
            line-height: 25px;
            font-family: "tyzt-zht", Arial;
            font-size: 18px;
            color: #4486f6;
          }
          .item_r_price_budget {
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #666666;
            text-align: right;
          }
        }
      }
    }
  }
}
.btnCs {
  display: flex;
  margin: 20px 0 28px 0;
  justify-content: center;
  .btn-left {
    margin-right: 32px;
    font-size: 14px;
    line-height: 32px;
    border-radius: 18px;
    padding: 0 36px;
    color: #4088f4;
    border: 1px solid #4088f4;
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
