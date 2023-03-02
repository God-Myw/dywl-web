<template>
  <div class="oilstation-content" :class="{ intervoyageinland: clientSide }">
    <div class="garage_bg">
      <img src="../../assets/container/组 8230@2x.png" alt="" />
    </div>
    <div class="garage_cont">
      <div class="garage_address">
        <div class="garage_address_img">
          <img
            v-if="!dataList.logo"
            src="../../assets/container/组 7875@2x.png"
            alt=""
          />
          <img v-else :src="dataList.logo" alt="" />
        </div>
        <div class="garage_address_det">
          <div class="tyzt-zht">{{ dataList.stationName }}</div>
          <div>
            <span></span>
            <p>{{ dataList.address }}</p>
          </div>
          <div>
            <span></span>
            <p>营业时间：{{ dataList.openTime }}</p>
          </div>
        </div>
      </div>
      <div class="garage_nav">
        <div class="garage_nav_header">
          <div class="tyzt-zht garage_nav_header_l">油价列表</div>
          <div class="garage_nav_header_r">
            <div>{{ dataList.updateDate }}更新油价</div>
            <div>
              仅供参考以<span style="color: #cb9529">站内实际挂牌价</span>为准
            </div>
          </div>
        </div>
        <!-- 数据列表 -->
        <div class="garage_nav_list">
          <div
            class="garage_nav_list_item"
            v-for="(item, index) in dataList.fules"
            :key="index"
          >
            <div class="garage_item_l">
              <div class="garage_item_l_header">
                <span></span>
                <span class="tyzt-zht">{{ item.fuelName }}</span>
              </div>
              <div class="garage_item_l_bott">
                参考挂牌价 ￥{{ getNumber(item.originalPrice) }}/升
              </div>
            </div>
            <div class="garage_item_r">
              <span>优惠价</span>
              <span class="tyzt-zht">￥</span>
              <span class="d-din-bold garage_item_r_t">{{
                getNumber(Number(item.originalPrice) - Number(item.isDiscount))
              }}</span>
              <span class="tyzt-zht">元/升</span>
            </div>
          </div>
        </div>
      </div>
      <div class="garage_downloadApp" :class="{ downloadAppweb: clientSide }">
        <div class="downloadApp" @click="openApp()">
          <div class="downloadApp_l">
            <div class="downloadApp_l_img">
              <img src="../../assets/container/组 3268@2x.png" alt="" />
            </div>
            <div class="downloadApp_l_txt">
              <div>下载道裕物流App</div>
              <div>即刻享受加油返利优惠</div>
            </div>
          </div>
          <div class="downloadApp_r">
            <img src="../../assets/container/gogo.gif" alt="" />
          </div>
        </div>
      </div>
      <div class="telephone" @click="teleDig = true"></div>
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
import { Dialog } from "vant";
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
Vue.use(Dialog);
export default {
  data() {
    return {
      dataList: [],
      dateDate: "",
      getDay: "",
      id: "",
      show: false,
      clientSide: false,
      teleDig: false,
    };
  },
  created() {
    // 判断当前是什么端
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log('这是移动')
      this.clientSide = false;
    } else {
      this.clientSide = true;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 数字取两位小数自动补0
    getNumber(num) {
      return (Number(num) / 100).toFixed(2);
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
    handleErrorFn(e) {
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
    handleLaunchFn(e) {
      this.show = false;
    },
    btndis() {
      this.show = false;
    },
    async getweChatPay(token, oilGuid, lat, lng) {
      webGetWXDetail({
        url: window.location.href.split("#")[0],
      }).then((res) => {
        if (res.code == "0000") {
          //通过config接口注入权限验证配置
          wx.config({
            debug: false,
            appId: "wx3c5d7c6f964f3094",
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
            openTagList: ["wx-open-launch-app"],
          });
          wx.ready(function () {
            var s_title = "道裕物流", // 分享标题
              s_link =
                "https://www.dylnet.cn/h5share/oilstationdetail?token=" +
                token +
                "&oilGuid=" +
                oilGuid +
                "&lat=" +
                lat +
                "&lng=" +
                lng, // 分享链接
              s_desc = "道裕物流邀请您加油", //分享描述
              s_imgUrl =
                "https://www.dylnet.cn/container/img/oilstationdet.jpg"; // 分享图标

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
    openApp() {
      this.show = true;
    },
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
    // 列表数据
    async getList() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/business/oil/getOilDetailForApp",
        {
          headers: {
            token: this.getQueryVariable("token"),
          },
          params: {
            oilGuid: this.getQueryVariable("oilGuid"),
            lat: this.getQueryVariable("lat"),
            lng: this.getQueryVariable("lng"),
          },
        }
      );
      if (res.data.code == "0000") {
        this.dataList = res.data.data;
        // 分享
        this.getweChatPay(
          this.getQueryVariable("token"),
          this.getQueryVariable("oilGuid"),
          this.getQueryVariable("lat"),
          this.getQueryVariable("lng")
        );
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
.d-din-bold {
  font-family: "d-din-bold", Arial;
}
/deep/.van-dialog {
  border-radius: 5px;
}
.oilstation-content {
  position: relative;
  .garage_bg {
    width: 100%;
    height: 260px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .garage_cont {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 223px;
    background: #67b1ff;
    padding: 0 10px 10px 10px;
    .garage_address {
      background: #fff;
      display: flex;
      border-radius: 8px;
      padding: 18px;
      margin-bottom: 10px;
      .garage_address_img {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        background: rgba(0, 0, 0, 0);
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 4px;
          border: 1px solid #f1f3f5;
        }
      }
      .garage_address_det {
        div:nth-child(1) {
          margin-bottom: 6px;
          font-size: 18px;
          line-height: 25px;
          color: #333333;
        }
        div:nth-child(2) {
          margin-bottom: 2px;
          font-size: 12px;
          line-height: 18px;
          color: #888888;
          display: flex;
          span {
            display: block;
            flex-shrink: 0;
            margin-top: 2px;
            margin-right: 4px;
            width: 12px;
            height: 12px;
            background: url("../../assets/container/蒙版组 312@2x.png")
              no-repeat;
            background-size: 12px 12px;
          }
        }
        div:nth-child(3) {
          margin-bottom: 2px;
          font-size: 12px;
          line-height: 18px;
          color: #888888;
          display: flex;
          span {
            flex-shrink: 0;
            margin-top: 2px;
            margin-right: 4px;
            display: block;
            width: 12px;
            height: 12px;
            background: url("../../assets/container/蒙版组 313@2x.png")
              no-repeat;
            background-size: 12px 12px;
          }
        }
      }
    }
    .garage_nav {
      background: #fff;
      border-radius: 8px;
      margin-bottom: 120px;
      .garage_nav_header {
        display: flex;
        justify-content: space-between;
        padding: 15px 18px 9px 18px;
        .garage_nav_header_l {
          font-size: 17px;
          line-height: 24px;
          color: #333333;
        }
        .garage_nav_header_r {
          font-size: 10px;
          line-height: 14px;
          color: #999999;
          div:nth-child(1) {
            text-align: right;
            margin-bottom: 4px;
          }
        }
      }
      .garage_nav_list {
        .garage_nav_list_item {
          padding: 24px 18px 15px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .garage_item_l {
            .garage_item_l_header {
              display: flex;
              margin-bottom: 10px;
              span:nth-child(1) {
                display: block;
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                background: url("../../assets/container/蒙版组 333@2x.png")
                  no-repeat;
                background-size: 24px 24px;
              }
              span:nth-child(2) {
                font-size: 16px;
                margin-left: 8px;
                line-height: 24px;
                color: #333333;
              }
            }
            .garage_item_l_bott {
              font-size: 12px;
              line-height: 17px;
              color: #999999;
            }
          }
          .garage_item_r {
            font-size: 12px;
            color: #e6531d;
            display: flex;
            align-items: center;
            .garage_item_r_t {
              font-size: 28px;
              margin: 0 2px;
            }
          }
        }
      }
    }
  }
}
.garage_downloadApp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding-bottom: 20px;
  .downloadApp {
    padding: 11px 16px 13px 20px;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .downloadApp_l {
      display: flex;
      .downloadApp_l_img {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .downloadApp_l_txt {
        font-size: 12px;
        line-height: 18px;
        color: #333333;
      }
    }
    .downloadApp_r {
      width: 116px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        display: block;
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
    padding: 2px 36px;
    color: #4088f4;
    border: 1px solid #4088f4;
  }
  div:nth-child(2) {
    color: #fff;
    padding: 3px 23px;
    background: #4088f4;
  }
}
.telephone {
  position: fixed;
  right: 0;
  top: 75%;
  width: 59px;
  height: 52px;
  background: url("../../assets/container/组 5967-1@2x.png") no-repeat;
  background-size: 59px 52px;
}
.contIntpallet-cont {
  position: relative;
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
.downloadAppweb {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
