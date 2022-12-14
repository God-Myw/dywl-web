<template>
  <div
    class="contIntpallet-cont"
    :class="{ intervoyageinland: clientSide }"
    ref="intervoyageinland"
  >
    <div class="mbg">
      <div class="cip-header">
        <p>集装箱现舱竞拍</p>
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

        <div class="cab-starting">
          <div class="cab-starting-left">
            <div class="cab-cont-info-l">
              <span class="tyzt-zht">{{ item.BoxType }}</span>
              <span class="tyzt-zht">数量</span>
              <span class="tyzt-zht">{{ item.boxSum }}</span>
            </div>
            <div class="cab-cont-info-r">
              <div v-if="item.promotionLabelOne">
                <span>{{ item.promotionLabelOne }}</span>
              </div>
              <div v-if="item.promotionLabelTwo">
                <span>{{ item.promotionLabelTwo }}</span>
              </div>
            </div>
          </div>
          <div class="cab-starting-right">
            <div class="cab-starting-right-s">
              <div style="margin-right: 12px">起拍价</div>
              <div class="tyzt-zht">
                {{
                  item.seaFreightType == 0
                    ? "¥"
                    : item.seaFreightType == 1
                    ? "$"
                    : "€"
                }}{{ item.seaFreight }}
              </div>
            </div>
            <div v-if="item.type == 0" class="cab-starting-right-s">
              <div style="margin-right: 12px">成交价</div>
              <div class="tyzt-zht">
                {{
                  item.seaFreightType == 0
                    ? "¥"
                    : item.seaFreightType == 1
                    ? "$"
                    : "€"
                }}{{ item.currentPrice }}
              </div>
            </div>
            <div v-if="item.type == 2" class="cab-starting-right-s">
              <div style="margin-right: 12px">当前价</div>
              <div class="tyzt-zht">
                {{
                  item.seaFreightType == 0
                    ? "¥"
                    : item.seaFreightType == 1
                    ? "$"
                    : "€"
                }}{{ item.currentPrice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 预告中 -->
        <div class="foreshowing-time">
          <div class="foreshowing-l" v-if="item.type == 2">
            <div class="tyzt-zht">距结束</div>
            <!-- <div>{{  item.endTimeFormat - new Date().getTime() }}</div> -->
            <van-count-down
              v-if="item.endTimeFormat - new Date().getTime() >= 0"
              :time="item.endTimeFormat - new Date().getTime()"
              format="DD 天 HH 时 mm 分 ss 秒"
            >
              <template #default="timeData">
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
              <!-- <span>10:00开始</span> -->
            </div>
          </div>
          <!-- <div class="foreshowing-btn" @click="openApp">立即参与</div> -->
          <div v-if="item.type !== 0" class="foreshowing-btn">立即参与</div>
        </div>
        <!-- 已结束 -->
        <div v-if="item.type == 0" class="tally"></div>
        <!-- 竞拍中 -->
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
import { webGetWXDetail, getAuctionCustomerList } from "../../api/h5share";
import axios from "axios";
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
      // loading: false,
      // finished: false,
      // currentPage: '1',
      dataList: [],
      dateDate: "",
      getDay: "",
      id: "",
      id2: "",
      show: false,
      clientSide: false,
      teleDig: false,
      lables: ["美西包船", "可载重大件"],
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
    // 截取app传的token和参数
    // let index = window.location.href.lastIndexOf("\?token=");
    // let index2 = window.location.href.lastIndexOf("\&id=");
    // console.log(index,index2)
    // this.id = window.location.href.substring(index+7,index2);
    // this.id2 = window.location.href.substring(index2+4,window.location.href.length);
    // console.log(this.id)
    // console.log(this.id2)
  },
  methods: {
    async onLoad() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/business/auctionCustomer/getAuctionCustomerList",
        {
          headers: {
            token: "d0e1ee6b-7bbe-4135-9129-8cbb6c15ea85",
          },
          params: {
            currentPage: this.currentPage++,
            pageSize: 10,
          },
        }
      );
      if (res.data.data) {
        this.dataList = this.dataList.concat(res.data.data.result);
        // this.loading = false
      } else {
        this.finished = true;
      }
    },
    handleErrorFn(e) {
      const options = {
        scheme: {
          // 用来配置 URL Scheme 所必须的那些字段
          protocol: "", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
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
            var s_title = "集装箱现舱竞拍", // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/caontAuction", // 分享链接
              s_desc = "卖家自主发布全球集装箱舱位，买家限时抢超低价舱位。", //分享描述
              s_imgUrl =
                "https://www.dylnet.cn/container/img/7dd00d8c9699b98687c0d7a8369b3d1.jpg"; // 分享图标
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
      getAuctionCustomerList({
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
        // justify-content: space-between;
        .cab-cont-l {
          width: 54%;
          .carriage-t-start {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            // width: 150px;
            div {
              i {
                display: block;
                margin: 0;
                width: 20px;
                height: 20px;
                background: url("../../assets/container/蒙版组 56@2x.png")
                  no-repeat;
                background-size: 20px 20px;
              }
            }
            div {
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
          .carriage-t-end {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            // width: 150px;
            div {
              i {
                display: block;
                margin: 0;
                width: 20px;
                height: 20px;
                background: url("../../assets/container/蒙版组 56@2x (1).png")
                  no-repeat;
                background-size: 20px 20px;
              }
            }
            div {
              p {
                // height: 24px;
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
        }
        .cab-cont-r {
          width: 45%;
          // margin-left: 10px;
          div:nth-child(1),
          div:nth-child(2) {
            // display: flex;
            margin: 6px 0px 8px 0;
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
            color: #4486f6;
            margin-bottom: 13px;
          }
        }
      }
      .cab-starting {
        display: flex;
        // justify-content: space-between;
        margin-bottom: 10px;
        .cab-starting-left {
          width: 54%;
          .cab-cont-info-l {
            margin-bottom: 12px;
            span {
              height: 22px;
              font-size: 16px;
              line-height: 22px;
              color: #333333;
            }
            span:nth-child(2) {
              margin: 0 4px 0 16px;
            }
            span:nth-child(3) {
              color: #4486f6;
            }
          }
          .cab-cont-info-r {
            font-size: 10px;
            display: flex;

            div {
              margin: 0;
              span {
                padding: 3px 9px;
                border: 1px solid #ffab80;
                color: #ef6a25;
                border-radius: 6px;
                margin-right: 8px;
              }
            }
            div:nth-child(1) span {
              padding: 3px 4px;
              border: 1px solid #ff6851;
              background: #ff6851;
              color: #fff;
            }
          }
        }
        .cab-starting-right {
          // margin-right: 10px;
          width: 45%;
          .cab-starting-right-s {
            display: flex;
            div {
              height: 22px;
              line-height: 22px;
            }
            div:nth-child(1) {
              font-size: 12px;
              color: #999999;
            }
            div:nth-child(2) {
              font-size: 14px;
              padding-right: 2px;
              color: #e6531d;
            }
            div:nth-child(3) {
              font-size: 16px;
              color: #e6531d;
            }
          }
        }
      }
      .foreshowing-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .foreshowing-l {
          display: flex;
          align-items: center;
          div:nth-child(1) {
            height: 17px;
            font-size: 12px;
            line-height: 17px;
            color: #999999;
            margin-right: 20px;
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
          background: linear-gradient(92deg, #ff9f57 0%, #ff6b4e 100%);
        }
      }
      .tally {
        position: absolute;
        right: 0;
        top: 0;
        width: 54px;
        height: 20px;
        background: url("../../assets/container/组 6535@2x.png") no-repeat;
        background-size: 54px 20px;
      }
      .auctioning-tal {
        position: absolute;
        right: 0;
        top: 0;
        width: 54px;
        height: 20px;
        background: url("../../assets/container/组 6487@2x.png") no-repeat;
        background-size: 54px 20px;
      }
      .foreshowing-tal {
        position: absolute;
        right: 0;
        top: 0;
        width: 54px;
        height: 20px;
        background: url("../../assets/container/组 6534@2x.png") no-repeat;
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
