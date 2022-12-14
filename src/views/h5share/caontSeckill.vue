<template>
  <div
    class="contIntpallet-cont"
    :class="{ intervoyageinland: clientSide }"
    ref="intervoyageinland"
  >
    <div class="mbg">
      <div class="cip-header">
        <p>集装箱现舱秒杀</p>
      </div>

      <div class="search" @click="openApp">
        <div class="search-o">
          <div>请选择</div>
          <div>请选择</div>
        </div>
        <div class="search-t">
          <div>起始港</div>
          <div><i></i></div>
          <div>目的港</div>
        </div>
        <div class="search-f">
          <div><i></i><span>请选择运输日期</span></div>
          <div><i></i></div>
        </div>
        <div class="search-s">
          <div><i></i><span>请选择船公司</span></div>
          <div><i></i></div>
        </div>
        <div class="search-btn">舱位查询</div>
      </div>

      <div
        class="cab-cont"
        v-for="(item, index) in dataList"
        :key="index"
        @click="openApp"
      >
        <div class="cab-cont-header">
          <div class="cab-cont-l">
            <div class="carriage-t">
              <div class="carriage-t-start">
                <div><i></i></div>
                <div>
                  <p class="tyzt-zht">{{ item.startPortCn }}</p>
                  <p>{{ item.startPortEn }}</p>
                </div>
              </div>
              <div class="carriage-t-end">
                <div><i></i></div>
                <div>
                  <p class="tyzt-zht">{{ item.endPortCn }}</p>
                  <p>{{ item.endPortEn }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cab-cont-r">
            <div>
              <span>截关</span>
              <span class="tyzt-zht">{{ item.closingTimeWeek }}</span>
              <span>{{ item.closingTime }}</span>
            </div>
            <div>
              <span>开船</span>
              <span class="tyzt-zht">{{ item.sailingTimeWeek }}</span>
              <span>{{ item.sailingTime }}</span>
            </div>
            <div>航程 {{ item.voyage }} 天</div>
          </div>
        </div>
        <div class="cab-cont-bott">
          <div class="cab-cont-bott-t">
            <div><i></i></div>
            <div class="cab-bott-t-gp tyzt-zht">
              <span v-for="ite in item.boxs" :key="ite.guid">
                <span>{{ ite.boxType }}</span>
                <span class="spandisp"> / </span>
              </span>
            </div>
          </div>
          <div class="cab-cont-bott-b">
            <div><i></i></div>
            <div class="cab-bott-t-moy tyzt-zht" v-if="item.boxs.length == '1'">
              <div style="font-size: 14px">秒杀价</div>

              <div style="margin-top: -1px">
                <span
                  >{{
                    item.boxs[0].moneyType == 0
                      ? "¥"
                      : item.boxs[0].moneyType == 1
                      ? "$"
                      : "€"
                  }}{{ item.boxs[0].teJia }}</span
                >
              </div>
              <div
                v-if="item.type == 1"
                style="
                  font-size: 14px;
                  margin-left: 16px;
                  margin-right: 10px;
                  color: #333;
                "
              >
                当前价
              </div>
              <div style="color: #333" v-if="item.type == 1">
                <span
                  >{{
                    item.boxs[0].moneyType == 0
                      ? "¥"
                      : item.boxs[0].moneyType == 1
                      ? "$"
                      : "€"
                  }}{{ item.boxs[0].yuanJia }}</span
                >
              </div>
            </div>
            <div class="cab-bott-t-moy tyzt-zht" v-if="item.boxs.length != '1'">
              <div style="font-size: 14px">秒杀价</div>
              <div
                style="margin-top: -1px"
                v-for="ite2 in item.boxs"
                :key="ite2.guid"
              >
                <span
                  >{{
                    ite2.moneyType == 0 ? "¥" : ite2.moneyType == 1 ? "$" : "€"
                  }}{{ ite2.teJia }}</span
                >
                <span style="padding: 0 6px 0 6px" class="spandisp">/</span>
              </div>
            </div>
          </div>
          <div
            class="cab-cont-bott-y"
            v-if="item.type == 1 && item.boxs.length != '1'"
          >
            <div class="cab-bott-t-y tyzt-zht">
              <div>当前价</div>
              <div v-for="ite2 in item.boxs" :key="ite2.guid">
                <span
                  >{{
                    ite2.moneyType == 0 ? "¥" : ite2.moneyType == 1 ? "$" : "€"
                  }}{{ ite2.yuanJia }}</span
                >
                <span style="padding: 0 6px 0 6px" class="spandisp">/</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 预告中 -->
        <div class="foreshowing-time">
          <div class="foreshowing-l" v-if="item.type == 2">
            <div class="tyzt-zht">距结束</div>
            <van-count-down
              v-if="item.endTimeFormat - new Date().getTime() >= 0"
              :time="item.endTimeFormat - new Date().getTime()"
              format="DD 天 HH 时 mm 分 ss 秒"
            >
              <template #default="timeData">
                <span style="font-size: 14px; color: #333; margin-right: 4px"
                  >{{ timeData.days }}天</span
                >
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
          <div class="foreshowing-t" v-if="item.type == 1">
            <div class="tyzt-zht">
              <span>{{ item.startTime }}开始</span>
            </div>
          </div>
          <div
            v-if="item.type == 1"
            class="foreshowing-btn"
            style="background: linear-gradient(87deg, #44bff6 0%, #4486f6 100%)"
          >
            查看详情
          </div>
          <div v-if="item.type == 2" class="foreshowing-btn">立即抢舱</div>
        </div>
        <!-- 秒杀中 -->
        <div v-if="item.type == 2" class="auctioning-tal"></div>
        <!-- 预告中 -->
        <div v-if="item.type == 1" class="foreshowing-tal"></div>
      </div>
      <!-- </van-list> -->
      <div style="height: 20px"></div>
    </div>
    <!-- <div class="telephone" @click="teleDig = true"></div> -->
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
import { webGetWXDetail, getContainerSpikeList } from "../../api/h5share";

import {
  Dialog,
  Tab,
  Tabs,
  Icon,
  ActionSheet,
  ImagePreview,
  NoticeBar,
  Swipe,
  SwipeItem,
  CountDown,
  List,
} from "vant";

Vue.use(Dialog)
  .use(Icon)
  .use(ActionSheet)
  .use(ImagePreview)
  .use(CountDown)
  .use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
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
    async getweChatPay() {
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
            var s_title = "集装箱现舱秒杀", // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/caontSeckill", // 分享链接
              s_desc = "卖家自主发布全球集装箱现舱，买家限时秒杀抢低价舱位。", //分享描述
              s_imgUrl =
                "https://www.dylnet.cn/container/img/20211102162112.jpg"; // 分享图标
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
    // 转化时间格式
    renderTime(date) {
      let dateee = new Date(date).toJSON();
      let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
    },
    openApp() {
      this.show = true;
    },
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
    // 列表数据
    async getList() {
      getContainerSpikeList({
        currentPage: 1,
        pageSize: 10,
      }).then((res) => {
        if (res.data.result) {
          this.dataList = res.data.result;
          // 分享
          this.getweChatPay();
        } else {
          this.dataList = [];
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.van-dialog {
  border-radius: 5px;
}
/deep/ .van-swipe-item {
  font-size: 13px;
}
/deep/ .van-notice-bar {
  height: 56px;
  line-height: 56px;
}
.notice-swipe {
  height: 56px;
  line-height: 56px;
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
  top: 70%;
  width: 59px;
  height: 52px;
  background: url("../../assets/container/组 5967@2x.png") no-repeat;
  background-size: 59px 52px;
}
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.contIntpallet-cont {
  position: relative;
  .mbg {
    width: 100%;
    height: 213px;
    background: linear-gradient(180deg, #4486f5 0%, #f1f3f5 100%);
    .cip-header {
      padding: 20px 0 16px 20px;
      font-size: 18px;
      height: 20px;
      line-height: 20px;
      color: #ffffff;
    }
    .search {
      margin: 0 10px 24px 10px;
      padding: 20px 24px 20px 24px;
      background: #fff;
      border-radius: 12px;
      div {
        display: flex;
      }
      .search-o {
        justify-content: space-between;
        font-family: "tyzt-zht", Arial;
        line-height: 21px;
        height: 21px;
        color: #888888;
        font-size: 14px;
      }
      .search-t {
        justify-content: space-between;
        align-items: center;
        font-family: "tyzt-zht", Arial;
        height: 28px;
        font-size: 20px;
        line-height: 28px;
        color: #888888;
        margin-bottom: 20px;
        div:nth-child(2) {
          i {
            display: block;
            margin: 0;
            width: 44px;
            height: 6px;
            background: url("../../assets/container/组 3785@2x.png") no-repeat;
            background-size: 44px 6px;
          }
        }
      }
      .search-f {
        align-items: center;
        justify-content: space-between;
        margin-bottom: 26px;
        div:nth-child(1) {
          i {
            display: block;
            margin: 0;
            width: 20px;
            height: 20px;
            background: url("../../assets/container/蒙版组 289@2x.png")
              no-repeat;
            background-size: 20px 20px;
          }
          span {
            height: 21px;
            font-size: 16px;
            line-height: 21px;
            color: rgba(136, 136, 136, 0.8);
            margin-left: 16px;
          }
        }
        div:nth-child(2) {
          i {
            display: block;
            margin: 0;
            width: 20px;
            height: 20px;
            background: url("../../assets/container/蒙版组 288@2x.png")
              no-repeat;
            background-size: 20px 20px;
          }
        }
      }
      .search-s {
        align-items: center;
        justify-content: space-between;
        margin-bottom: 26px;
        div:nth-child(1) {
          i {
            display: block;
            margin: 0;
            width: 20px;
            height: 20px;
            background: url("../../assets/container/蒙版组 291@2x.png")
              no-repeat;
            background-size: 20px 20px;
          }
          span {
            height: 21px;
            font-size: 16px;
            line-height: 21px;
            color: rgba(136, 136, 136, 0.8);
            margin-left: 16px;
          }
        }
        div:nth-child(2) {
          i {
            display: block;
            margin: 0;
            width: 6px;
            height: 10px;
            background: url("../../assets/container/289@2x.png") no-repeat;
            background-size: 6px 10px;
          }
        }
      }
      .search-btn {
        justify-content: center;
        align-items: center;
        height: 44px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: linear-gradient(87deg, #44bff6 0%, #4486f6 100%);
        border-radius: 22px;
      }
    }
    .cab-cont {
      margin: 0 10px 16px 10px;
      border-radius: 6px;
      background: #fff;
      padding: 22px 24px 20px 24px;
      position: relative;
      .cab-cont-header {
        display: flex;
        .cab-cont-l {
          flex: 1;
          .carriage-t-start {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            div:nth-child(1) {
              i {
                display: block;
                margin: 0;
                width: 20px;
                height: 20px;
                background: url("../../assets/container/蒙版组 179@2x.png")
                  no-repeat;
                background-size: 20px 20px;
              }
            }
            div:nth-child(2) {
              p {
                font-size: 17px;
                line-height: 24px;
                color: #303030;
                margin-left: 10px;
              }
              p:nth-child(2) {
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // height: 17px;
                font-size: 12px;
                line-height: 17px;
                color: #303030;
              }
            }
          }
          .carriage-t-end {
            display: flex;
            align-items: center;
            div:nth-child(1) {
              i {
                display: block;
                margin: 0;
                width: 20px;
                height: 20px;
                background: url("../../assets/container/蒙版组 180@2x.png")
                  no-repeat;
                background-size: 20px 20px;
              }
            }
            div:nth-child(2) {
              p {
                // height: 24px;
                font-size: 17px;
                line-height: 24px;
                color: #303030;
                margin-left: 10px;
              }
              p:nth-child(2) {
                // height: 17px;
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                line-height: 17px;
                color: #303030;
              }
            }
          }
        }
        .cab-cont-r {
          flex: 1;
          margin-left: 10px;
          div:nth-child(1),
          div:nth-child(2) {
            // display: flex;
            margin: 6px 8px 6px 0;
            span {
              height: 22px;
              font-size: 14px;
              line-height: 22px;
              color: #303030;
            }
            span:nth-child(2) {
              font-size: 16px;
              margin: 0 6px 0 8px;
            }
            span:nth-child(3) {
              font-size: 12px;
              color: #333333;
            }
          }
          div:nth-child(3) {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            // margin-bottom: 13px;
          }
        }
      }
      .cab-cont-bott {
        margin-top: 6px;
        .cab-cont-bott-t {
          display: flex;
          margin-bottom: 4px;
          div:nth-child(1) {
            i {
              display: block;
              margin: 0;
              margin-top: -1px;
              width: 20px;
              height: 20px;
              background: url("../../assets/container/蒙版组 256@2x.png")
                no-repeat;
              background-size: 20px 20px;
            }
          }
          .cab-bott-t-gp {
            margin-left: 10px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            span:nth-last-child(1) {
              .spandisp {
                display: none;
              }
            }
          }
        }
        .cab-cont-bott-b {
          display: flex;
          margin-bottom: 2px;
          div:nth-child(1) {
            i {
              display: block;
              margin: 0;
              width: 20px;
              height: 20px;
              background: url("../../assets/container/蒙版组 250@2x.png")
                no-repeat;
              background-size: 20px 20px;
            }
          }
          .cab-bott-t-moy {
            margin-left: 10px;
            font-size: 16px;
            display: flex;
            align-items: center;
            color: #ef3440;
            div:nth-child(1) {
              margin-right: 10px;
            }
            div:nth-last-child(1) {
              .spandisp {
                display: none;
              }
            }
          }
        }
        .cab-cont-bott-y {
          display: flex;

          .cab-bott-t-y {
            margin-left: 30px;
            font-size: 14px;
            display: flex;
            align-items: center;
            color: #333333;
            div:nth-child(1) {
              margin-right: 10px;
            }
            div:nth-last-child(1) {
              .spandisp {
                display: none;
              }
            }
          }
        }
      }
      .foreshowing-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        .foreshowing-l {
          display: flex;
          align-items: center;
          div:nth-child(1) {
            height: 17px;
            font-size: 12px;
            line-height: 17px;
            color: #999999;
            margin-right: 6px;
          }
        }
        .foreshowing-t {
          span {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #999999;
            margin-right: 6px;
          }
        }
        .foreshowing-btn {
          // width: 110px;
          font-size: 16px;
          color: #ffffff;
          box-sizing: border-box;
          border-radius: 22px;
          text-align: center;
          padding: 7px 23px;
          background: linear-gradient(270deg, #ff5567 0%, #ff8581 100%);
          // background: linear-gradient(92deg, #FF9F57 0%, #FF6B4E 100%);
        }
      }
      .auctioning-tal {
        position: absolute;
        right: 0;
        top: 0;
        width: 54px;
        height: 20px;
        background: url("../../assets/container/组 6947@2x.png") no-repeat;
        background-size: 54px 20px;
      }
      .foreshowing-tal {
        position: absolute;
        right: 0;
        top: 0;
        width: 54px;
        height: 20px;
        background: url("../../assets/container/组 6999@2x.png") no-repeat;
        background-size: 54px 20px;
      }
    }
  }
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #000;
  font-size: 20px;
}
.block {
  display: inline-block;
  width: 24px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 3px 0;
  background-color: rgba(68, 134, 246, 1);
  border-radius: 6px;
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
