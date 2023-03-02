<template>
  <div class="shipDeal" :class="{ intervoyageinland: clientSide }">
    <div class="askbuy">
      <div class="askbuy_bg">
        <div class="bg_title">船舶求购需求</div>
        <div class="bg_cont">
          <div class="bg-name">
            <div>{{ dataList.shipType }}</div>
            <div>买家求购船型</div>
          </div>
          <div>
            <div class="bg-price">
              <div class="price_rmb" v-if="dataList.budgetType == 1">
                <div>{{ dataList.budget }}</div>
                <div>万元</div>
              </div>
              <div class="price_interview" v-if="dataList.budgetType == 2">
                <div>{{ dataList.budget }}</div>
              </div>
              <div class="price_budget">买船预算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="askbuy_demand">
      <div class="demand_title">
        <div></div>
        <div>求购需求</div>
      </div>
      <div class="demand_load">
        <div>船龄</div>
        <div>{{ dataList.shipAge }}</div>
      </div>
      <div class="demand_load">
        <div>船级社</div>
        <div>{{ dataList.classificationSociety }}</div>
      </div>
      <div class="demand_load">
        <div>航区</div>
        <div>{{ dataList.voyageArea }}</div>
      </div>
      <div class="demand_load">
        <div>载重吨</div>
        <div>{{ dataList.dwt }}吨</div>
      </div>
    </div>
    <div class="askbuy_remark">
      <div class="remark_title">
        <div></div>
        <div>备注</div>
      </div>
      <div class="remark_cont" v-if="dataList.remark">
        {{ dataList.remark }}
      </div>
      <div class="remark_cont" v-else>无</div>
    </div>
    <div class="telephone" @click="teleDig = true"></div>
    <div class="downAPP">
      <div @click="openApp">下载App了解更多</div>
      <div></div>
    </div>
    <van-dialog
      v-model="teleDig"
      title="拨打客服电话"
      :show-confirm-button="false"
    >
      <div class="teletxt">
        我们即将为您拨打<span style="color: #4088f4; padding-left: 10px"
          >400-9009-618</span
        >
      </div>
      <div class="telebtn">
        <div @click="teleDig = false">取消</div>
        <div @click="Calltele">立即拨打</div>
      </div>
    </van-dialog>
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
import CallApp from "callapp-lib";
import { webGetWXDetail } from "../../api/h5share";
import { Button, Swipe, SwipeItem, DropdownMenu, DropdownItem } from "vant";
Vue.use(Button).use(Swipe).use(SwipeItem).use(DropdownMenu).use(DropdownItem);
import axios from "axios";
// import axios from 'axios'
export default {
  data() {
    return {
      clientSide: false,
      teleDig: false,
      dataList: [],
      show: false,
    };
  },
  mounted() {
    this.getList();
    this.getweChatPay(
      this.getQueryVariable("token"),
      this.getQueryVariable("buyerGuid")
    );
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
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
    async getweChatPay(token, buyerGuid) {
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
                "https://www.dylnet.cn/h5share/askbuy?token=" +
                token +
                "&buyerGuid=" +
                buyerGuid, // 分享链接
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
      let res = await axios.get(
        "https://www.dylnet.cn/api/business/ShipTransactionBuyer/getShipPurchaseDetailForApp",
        {
          headers: {
            token: this.getQueryVariable("token"),
          },
          params: {
            buyerGuid: this.getQueryVariable("buyerGuid"),
          },
        }
      );
      if (res.data.code == "0000") {
        this.dataList = res.data.data;
      } else {
        this.dataList = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.askbuy {
  margin-bottom: 20px;
  .askbuy_bg {
    background: url("../../assets/container/矩形 3135.png") no-repeat;
    background-size: 100% 140px;
    width: 100%;
    height: 140px;
    padding: 14px 10px;
    margin-bottom: 10px;
    .bg_title {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      height: 22px;
      padding-left: 10px;
      margin-bottom: 14px;
    }
    .bg_cont {
      background: #ffffff;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      padding: 25px 20px 22px;

      .bg-name {
        div:nth-child(1) {
          height: 33px;
          font-size: 24px;
          font-family: "tyzt-zht", Arial;
          margin-bottom: 2px;
          color: #333333;
          line-height: 33px;
        }
        div:nth-child(2) {
          height: 20px;
          font-size: 14px;
          color: #999999;
          line-height: 20px;
        }
      }
      .bg-price {
        .price_rmb {
          padding-top: 5px;
          display: flex;
          margin-bottom: 3px;
          div:nth-child(1) {
            height: 30px;
            font-size: 28px;
            font-family: "d-din-bold", Arial;
            color: #e6531d;
            line-height: 30px;
            margin-right: 4px;
          }
          div:nth-child(2) {
            padding-top: 7px;
            height: 20px;
            font-size: 14px;
            font-family: "tyzt-zht", Arial;
            color: #e6531d;
            line-height: 20px;
          }
        }
        .price_interview {
          height: 25px;
          font-size: 18px;
          font-family: "tyzt-zht", Arial;
          color: #4486f6;
          line-height: 25px;
        }
        .price_budget {
          height: 17px;
          font-size: 12px;
          color: #666666;
          line-height: 17px;
          text-align: right;
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
.askbuy_demand {
  margin: 10px;
  background: #ffffff;
  border-radius: 6px;
  padding: 20px 20px 12px 20px;
  .demand_title {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    div:nth-child(1) {
      width: 4px;
      height: 14px;
      background: url("../../assets/container/矩形 1465@2x.png") no-repeat;
      background-size: 4px 14px;
      margin-right: 8px;
    }
    div:nth-child(2) {
      height: 22px;
      font-size: 16px;
      font-family: "tyzt-zht", Arial;
      color: #000000;
      line-height: 22px;
    }
  }
  .demand_load {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    div:nth-child(1) {
      width: 72px;
      height: 20px;
      font-size: 14px;
      color: #999999;
      line-height: 20px;
    }
    div:nth-child(2) {
      height: 20px;
      font-size: 14px;
      font-family: "tyzt-zht", Arial;
      color: #333333;
      line-height: 20px;
    }
  }
}
.askbuy_remark {
  margin: 10px;
  background: #ffffff;
  border-radius: 6px;
  padding: 20px 20px 12px 20px;
  .remark_title {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    div:nth-child(1) {
      width: 4px;
      height: 14px;
      background: url("../../assets/container/矩形 1465@2x.png") no-repeat;
      background-size: 4px 14px;
      margin-right: 8px;
    }
    div:nth-child(2) {
      height: 22px;
      font-size: 16px;
      font-family: "tyzt-zht", Arial;
      color: #000000;
      line-height: 22px;
    }
  }
  .remark_cont {
    font-size: 14px;
    color: #333333;
    line-height: 18px;
  }
}
.telephone {
  position: fixed;
  right: 0;
  top: 75%;
  width: 59px;
  height: 52px;
  background: url("../../assets/container/组 5967@2x.png") no-repeat;
  background-size: 59px 52px;
}
.teletxt {
  text-align: center;
  margin: 12px 0 20px 0;
  font-size: 14px;
}
.telebtn {
  display: flex;
  justify-content: center;
  margin-bottom: 17px;
  div {
    border-radius: 18px;
    // height: 28px;
    font-size: 14px;
    line-height: 28px;
  }
  div:nth-child(1) {
    margin-right: 28px;
    padding: 0 36px;
    color: #4088f4;
    border: 1px solid #4088f4;
  }
  div:nth-child(2) {
    color: #fff;
    padding: 0 23px;
    background: #4088f4;
  }
}
.downAPP {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #ffffff;
  padding: 10px 40px;

  div:nth-child(1) {
    background: #4486f6;
    border-radius: 20px;
    padding: 9px 0;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
  }
  div:nth-child(2) {
    height: 33px;
    width: 100%;
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
