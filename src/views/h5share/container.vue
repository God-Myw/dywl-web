<template>
  <div class="container-cont" :class="{ container: clientSide }">
    <div class="header">
      <img src="../../assets/container/组 5551@2x.png" alt="" />
    </div>
    <div class="nav">
      <div class="nav-l"><i class="nav-l-img"></i></div>
      <van-tabs
        ref="tabs"
        v-model="active"
        color="rgba(68, 134, 246, 1)"
        @click="onClick"
      >
        <van-tab
          v-for="item in navList"
          :key="item.guid"
          :title="item.portName"
          :name="item.guid"
        >
        </van-tab>
      </van-tabs>
      <!-- <div class="menu" @click="showDig"><i class="nav-l-img2"></i></div> -->
    </div>
    <div class="cont">
      <div class="cont-head">
        <div class="ch-l tyzt-zht">买箱需求</div>
        <div class="ch-r">
          <img src="../../assets/container/组 5136@2x.png" alt="" />
        </div>
      </div>
      <div v-for="(item, index) in checkdata" :key="index">
        <div class="cont-body">
          <div class="cb-l">
            <i class="cb-l-img"></i>
            <div class="span1 tyzt-zht">{{ item.size }}</div>
            <div class="span2" v-if="item.type == 0">
              <img src="../../assets/container/组 5482@2x.png" alt="" />
            </div>
            <div class="span2" v-if="item.type == 1">
              <img src="../../assets/container/组 5527@2x.png" alt="" />
            </div>
          </div>
          <div class="cb-c">{{ item.money }}</div>
          <div class="cb-r">
            <i class="cb-r-img" @click="openApp"></i>
            <div class="cb-r-p">0</div>
            <i class="cb-r-img2" @click="openApp"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="explain">
      <div class="ex-t tyzt-zht">购买说明</div>
      <div class="ex-b">
        <p v-html="remark"></p>
        <!-- <p>1. 以上费用是买方自提箱费用；</p>
        <p>2. 上海宝山、临港等各大港口可提箱；</p>
        <p>3. 在线订购后，道裕客服会与您沟通提箱具体信息；</p>
        <p>4. 客服也可以另外帮您找车运箱，具体费用另计算。</p> -->
      </div>
    </div>
    <div class="btn-bot" @click="openApp">
      <div>立即买箱</div>
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
    <van-action-sheet v-model="showdig" title="港口选择">
      <div class="content">
        <span
          @click="close(item.guid)"
          v-for="item in navList"
          :key="item.guid"
          class="city-st"
          >{{ item.portName }}</span
        >
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Tab, Tabs, Icon, ActionSheet } from "vant";
import CallApp from "callapp-lib";
import {
  webGetWXDetail,
  getContainerTradingSecondary,
  getContainerTradingMainList,
} from "../../api/h5share";
import axios from "axios";
Vue.use(Dialog).use(Icon).use(ActionSheet);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      navList: [],
      checkdata: [],
      active: "",
      showdig: false,
      show: false,
      clientSide: false,
      remark: "",
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
    this.getweChatPay();
  },
  methods: {
    handleErrorFn(e) {
      // alert(JSON.stringify(e))
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
    getweChatPay() {
      webGetWXDetail({
        url: window.location.href.split("#")[0],
      }).then((res) => {
        if (res.code == "0000") {
          // 9c0c7938213dde425ba71a8b318bf96f
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
            var s_title = "全新、二手集装箱出售", // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/container", // 分享链接
              s_desc = "上海、天津、宁波、青岛、大连等各大港口自提箱", //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 178.png"; // 分享图标

            wx.updateAppMessageShareData({
              title: s_title, // 分享标题
              desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {
                // 设置成功
              },
            });
            wx.updateTimelineShareData({
              title: s_title, // 分享标题
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
    // 渲染列表
    getList() {
      getContainerTradingMainList().then((res) => {
        if (res.data) {
          this.navList = res.data;
          this.getCheckdata(this.navList[0].guid);
        } else {
          this.navList = [];
        }
      });
    },
    // 列表数据
    getCheckdata(val) {
      getContainerTradingSecondary({
        guid: val,
      }).then((res) => {
        if (res.data) {
          this.checkdata = res.data.containerTradingSecondaryDtos;
          // this.remark = res.data.data.remark
          let reg = new RegExp("\n", "g"); //g代表全部
          this.remark = res.data.remark.replace(reg, "<br/>");
        } else {
          this.checkdata = [];
        }
      });
    },
    onClick(name) {
      this.getCheckdata(name);
    },
    showDig() {
      this.showdig = true;
    },
    close(val) {
      this.showdig = false;
      this.active = val;
      this.getCheckdata(val);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.van-dialog {
  border-radius: 5px;
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
i {
  margin: 0;
  width: 22px;
  height: 48px;
}
/deep/.van-tab {
  font-size: 17px;
  margin: 0 20px 0 0;
}
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.content {
  padding: 16px 16px 160px;
  .city-st {
    display: inline-block;
    margin: 0 14px 16px 0;
    padding: 7px 22px;
    text-align: center;
    background: #f5f7f8;
    border-radius: 18px;
    font-size: 16px;
    color: #333333;
    &:hover {
      background: #4486f6;
      color: #fff;
    }
  }
}
.container-cont {
  background: #f1f3f5;
  width: 100%;
  padding-bottom: 14px;
  overflow: hidden;
  .header {
    width: 100%;
    height: 100px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .nav {
    height: 64px;
    background: #fff;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .nav-l {
      margin: 0 10px 0 10px;
      .nav-l-img {
        display: block;
        margin: 0;
        width: 30px;
        height: 30px;
        background: url("../../assets/container/蒙版组 98@2x.png") no-repeat;
        background-size: cover;
      }
    }
    .menu {
      margin: 0 15px 0 0;
      .nav-l-img2 {
        display: block;
        margin: 0;
        width: 64px;
        height: 64px;
        background: url("../../assets/container/组 5517@2x.png") no-repeat;
        background-size: cover;
      }
    }
  }
  .cont {
    margin: 14px;
    background: #fff;
    padding-bottom: 24px;
    .cont-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 21px;
      .ch-l {
        margin: 16px 0 0 16px;
        font-size: 18px;
        font-weight: 550;
        color: #000000;
      }
      .ch-r {
        width: 78px;
        height: 22px;
        margin-top: 12px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .cont-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 62px;
      margin: 0 10px;

      .cb-l {
        display: flex;
        align-items: center;
        .span1 {
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          margin: 0 6px;
          color: #333333;
          font-weight: 550;
        }
        .span2 {
          height: 16px;
          width: 28px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .cb-l-img {
          display: block;
          margin: 0;
          width: 20px;
          height: 20px;
          background: url("../../assets/container/蒙版组 75@2x.png") no-repeat;
          background-size: cover;
        }
      }
      .cb-c {
        font-size: 16px;
        font-weight: 550;
        color: #e6531d;
      }
      .cb-r {
        display: flex;
        .cb-r-img {
          display: block;
          margin: 0;
          width: 24px;
          height: 24px;
          background: url("../../assets/container/组 5068@2x.png") no-repeat;
          background-size: cover;
        }
        .cb-r-p {
          margin: 0 20px;
          font-weight: 550;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          color: #333333;
        }
        .cb-r-img2 {
          display: block;
          margin: 0;
          width: 24px;
          height: 24px;
          background: url("../../assets/container/组 5067@2x.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
  .explain {
    padding: 16px 0 36px 0;
    background: #fff;
    margin: 0 14px;
    .ex-t {
      margin: 0 0 7px 16px;
      font-size: 18px;
      font-weight: 550;
      color: #000000;
    }
    .ex-b {
      margin: 10px 20px 0;
      p {
        font-size: 14px;
        line-height: 28px;
        color: #666666;
      }
    }
  }
  .btn-bot {
    margin: 24px 40px 10px;
    div {
      margin: 0 auto;
      text-align: center;
      color: #fff;
      background-color: #4486f6;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      border-radius: 22px;
    }
  }
}
.container {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
