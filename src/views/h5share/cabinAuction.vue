<template>
  <div
    class="contIntpallet-cont"
    :class="{ intervoyageinland: clientSide }"
    ref="intervoyageinland"
  >
    <!-- 竞拍中 -->
    <!-- <div class="auction-over">
        <div class="auction-over-t">
          <div>距结束</div>
          <van-count-down :time="time" format="HH 时 mm 分 ss 秒">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="auction-over-b">
          <div>
            <span>当前价</span>
            <span>￥</span>
            <span>256250.34</span>
          </div>
        </div>
      </div> -->
    <div class="mbg">
      <!-- 竞拍中 -->
      <!-- <div style="height:80px"></div> -->
      <div class="cip-header">
        <p>现舱竞拍详情</p>
      </div>
      <div class="cab-cont">
        <div class="cab-cont-header">
          <div class="cab-cont-l">
            <div class="carriage-t">
              <div class="carriage-t-start">
                <div><i></i></div>
                <div>
                  <p class="tyzt-zht">宁波港</p>
                  <p>Ningbo</p>
                </div>
              </div>
              <div class="carriage-t-end">
                <div><i></i></div>
                <div>
                  <p class="tyzt-zht">杭州港</p>
                  <p>Hangzhou</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cab-cont-r">
            <div>
              <p>截关</p>
              <p class="tyzt-zht">周四</p>
              <p>8月12日</p>
            </div>
            <div>
              <p>开船</p>
              <p class="tyzt-zht">周六</p>
              <p>8月14日</p>
            </div>
            <div>航程24天</div>
          </div>
        </div>
        <div class="cab-cont-info">
          <div class="cab-cont-info-l">
            <span class="tyzt-zht">20GP</span>
            <span class="tyzt-zht">数量</span>
            <span class="tyzt-zht">23</span>
          </div>
          <div class="cab-cont-info-r">
            <div v-for="(ite, idx) in lables" :key="idx">
              <span v-if="ite != ''">{{ ite }}</span>
            </div>
          </div>
        </div>
        <!-- 预告中 -->
        <div class="foreshowing-time">
          <div class="tyzt-zht">距开始</div>
          <van-count-down :time="time" format="HH 时 mm 分 ss 秒">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="cab-cont-nav">
          <!-- 已结束 -->
          <!-- <div class="cab-nav-item">
              <i></i>
              <div class="tyzt-zht">成交价</div>
              <div class="tyzt-zht">￥&nbsp;50000.00</div>
            </div> -->
          <div class="cab-nav-itemt">
            <div class="tyzt-zht">海运费起拍价</div>
            <div class="tyzt-zht">￥&nbsp;25000.00</div>
          </div>
          <div class="cab-nav-itemt">
            <div class="tyzt-zht">一次加价</div>
            <div class="tyzt-zht">￥&nbsp;50.00</div>
            <div
              class="tyzt-zht"
              style="
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                color: #333333;
                margin-left: 4px;
              "
            >
              起
            </div>
          </div>
          <div
            class="tyzt-zht"
            style="
              font-size: 14px;
              height: 20px;
              line-height: 24px;
              color: #333333;
              margin-bottom: 12px;
            "
          >
            其他费用
          </div>
          <div class="cab-nav-itemtw">
            <div>THC</div>
            <div>￥&nbsp;625.24</div>
          </div>
          <div class="cab-nav-itemtw">
            <div>文件费</div>
            <div>￥&nbsp;4625.00</div>
          </div>
          <div class="cab-nav-itemtw">
            <div>订舱费</div>
            <div>￥&nbsp;50000.27</div>
          </div>
          <div class="cab-nav-itemtw">
            <div>EDI</div>
            <div>￥&nbsp;325.22</div>
          </div>
          <div class="cab-nav-itemtw">
            <div>分单/并单/电放</div>
            <div>￥&nbsp;3000.04</div>
          </div>
          <div class="cab-nav-itemtw">
            <div>AMS</div>
            <div>￥&nbsp;24000.24</div>
          </div>
        </div>
        <div class="tally"></div>
        <!-- 竞拍中 -->
        <div class="auctioning-tal"></div>
        <!-- 预告中 -->
        <div class="foreshowing-tal"></div>
      </div>
      <div class="cab-cont-t">
        <div>
          <van-notice-bar
            :scrollable="false"
            background="#EEF7FF"
            color="#333333"
          >
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="4000"
              :show-indicators="false"
            >
              <van-swipe-item
                >2020-10-27 10:00 用户 132****1067 加价
                <span style="color: #e6531d">￥ 5000</span></van-swipe-item
              >
              <van-swipe-item
                >2020-10-27 11:00 用户 132****1067 加价
                <span style="color: #e6531d">￥ 6000</span></van-swipe-item
              >
            </van-swipe>
          </van-notice-bar>
        </div>
        <div class="cab-cont-bidd">
          <div>竞价时间</div>
          <div>
            <p>2020-10-27 09:00</p>
            <p>2020-10-27 09:00</p>
          </div>
          <div><i></i><span>关注</span></div>
        </div>
        <div class="cab-cont-heat">
          <div>
            <span>报名</span>
            <span style="color: #4486f6; padding-left: 6px">20人</span>
          </div>
          <div>
            <span>关注</span>
            <span style="color: #4486f6; padding-left: 6px">20人</span>
          </div>
          <div>
            <span>围观</span>
            <span style="color: #4486f6; padding-left: 6px">20人</span>
          </div>
        </div>
      </div>
      <div class="cab-cont-f">
        <div class="cab-cont-virtue">
          <div>船公司</div>
          <div>上海完美时空软件有限公司</div>
        </div>
        <div class="cab-cont-virtue">
          <div>所属公司</div>
          <div>南京去哪儿道裕物流科技有限公司宝山分公司</div>
        </div>
        <div class="cab-cont-vir">班轮优势</div>
        <div class="cab-cont-virp">
          <p>1. 美国船东，美国国旗；美国自有码头；</p>
          <p>2. 重吊，一装一卸直达休斯敦、航速快；</p>
          <p>3. 本船为MPP船，可载件杂货、重大件。</p>
        </div>
      </div>
      <div style="height: 100px"></div>
    </div>

    <!-- <div class="single" @click="openApp">查看更多竞猜</div> -->
    <!-- 竞拍中 -->
    <!-- <div class="auctioning" @click="openApp">
        <div class="cb-r">
          <i class="cb-r-img" @click="openApp"></i>
          <div class="cb-r-p tyzt-zht">￥50</div>
          <i class="cb-r-img2" @click="openApp"></i>
        </div>
        <div class="auctioning-btn">
          立即加价
        </div>
      </div> -->
    <!--  预告中 -->
    <!-- <div class="foreshowing" @click="openApp">
        <div class="foreshowing-l">
          <span>保证金</span>
          <span class="tyzt-zht">￥500</span>
        </div>
        <div class="foreshowing-btn">
          立即报名
        </div>
      </div> -->
    <div class="foreshowed">
      <div class="tyzt-zht">距开始</div>
      <van-count-down :time="time" format="HH 时 mm 分 ss 秒">
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
      <div><i></i></div>
      <div>
        <p>您已成功报名</p>
        <p>可在开始后参与竞拍</p>
      </div>
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
} from "vant";
import { webGetWXDetail, getAuctionCustomerById } from "../../api/h5share";
Vue.use(Dialog).use(Icon).use(ActionSheet).use(ImagePreview).use(CountDown);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  data() {
    return {
      time: 60 * 60 * 1000,
      dataList: [],
      dateDate: "",
      getDay: "",
      id: "",
      show: false,
      clientSide: false,
      teleDig: false,
      lables: ["美西包船", "限时特价"],
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
    async getweChatPay(title, beg, end, id) {
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
            var s_title = "船舶类型:" + title, // 分享标题
              s_link =
                "https://www.dylnet.cn/h5share/intervoyageinland?" + id, // 分享链接
              s_desc = "航线:" + beg + "→" + end, //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/组 5714.png"; // 分享图标
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
              title: s_desc + ";" + s_title, // 分享标题
              // desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://www.dylnet.cn/container/img/8b84e7bb3bbfa8be6c500e77acd1255.jpg", // 分享图标
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
      let index = window.location.href.lastIndexOf("?");
      this.id = window.location.href.substring(
        index + 1,
        window.location.href.length
      );
      getAuctionCustomerById({
        guid: this.id,
      }).then((res) => {
        if (res.data) {
          // console.log(res.data.data)
          this.dataList = res.data;
          // 分享
          // this.getweChatPay(title,beg,end,this.id)
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
    height: 28px;
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
  .single {
    left: 0;
    right: 0;
    bottom: 36px;
    position: fixed;
    margin: auto;
    font-size: 16px;
    color: #ffffff;
    width: 280px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    // padding: 11px 107px;
    background: linear-gradient(92deg, #ff9f57 0%, #ff6b4e 100%);
    border-radius: 22px;
  }
  .auctioning {
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    padding: 10px 20px 10px 24px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(239, 239, 239, 1);
    .cb-r {
      display: flex;
      .cb-r-img {
        display: block;
        margin: 0;
        width: 28px;
        height: 28px;
        background: url("../../assets/container/组 5068@2x.png") no-repeat;
        background-size: 28px 28px;
      }
      .cb-r-p {
        margin: 0 18px;
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        color: #e6531d;
      }
      .cb-r-img2 {
        display: block;
        margin: 0;
        width: 28px;
        height: 28px;
        background: url("../../assets/container/组 5067@2x.png") no-repeat;
        background-size: 28px 28px;
      }
    }
    .auctioning-btn {
      width: 164px;
      font-size: 18px;
      color: #ffffff;
      box-sizing: border-box;
      border-radius: 22px;
      text-align: center;
      padding: 8px 46px;
      background: linear-gradient(92deg, #ff9f57 0%, #ff6b4e 100%);
    }
  }
  .foreshowing {
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    padding: 10px 20px 10px 24px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(239, 239, 239, 1);
    .foreshowing-l {
      span:nth-child(1) {
        height: 22px;
        font-size: 16px;
        line-height: 22px;
        color: #333333;
        margin-right: 16px;
      }
      span:nth-child(2) {
        height: 25px;
        font-size: 18px;
        line-height: 25px;
        color: #e6531d;
      }
    }
    .foreshowing-btn {
      width: 164px;
      font-size: 18px;
      color: #ffffff;
      box-sizing: border-box;
      border-radius: 22px;
      text-align: center;
      padding: 8px 46px;
      background: linear-gradient(92deg, #ff9f57 0%, #ff6b4e 100%);
    }
  }
  .foreshowed {
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    padding: 10px 20px 10px 24px;
    background: #ffffff;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(239, 239, 239, 1);
    div:nth-child(1) {
      height: 17px;
      font-size: 12px;
      line-height: 17px;
      color: #333333;
      margin-right: 10px;
    }
    div:nth-child(3) {
      margin-left: 26px;
      margin-right: 12px;
      i {
        display: inline-block;
        margin: 0;
        width: 20px;
        height: 20px;
        background: url("../../assets/container/蒙版组 200@2x.png") no-repeat;
        background-size: 20px 20px;
      }
    }
    div:nth-child(4) {
      p:nth-child(1) {
        font-size: 16px;
        color: #333333;
        margin-bottom: 2px;
      }
      p:nth-child(2) {
        font-size: 12px;
        color: #333333;
      }
    }
  }
  .auction-over {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(180deg, #d5e7ff 0%, #ffffff 49%, #ffffff 100%);
    box-shadow: 2px 2px 2px rgba(176, 196, 222, 0.1);
    position: fixed;
    top: 0;
    padding: 9px 30px 10px 25px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    .auction-over-t {
      div:nth-child(1) {
        height: 17px;
        font-size: 12px;
        line-height: 17px;
        color: #333333;
        margin-bottom: 5px;
      }
      // div:nth-child(2) {}
    }
    .auction-over-b {
      margin-top: 12px;
      div {
        span:nth-child(1) {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
        span:nth-child(2) {
          height: 21px;
          font-size: 15px;
          line-height: 21px;
          padding: 0 4px 0 8px;
          color: #e6531d;
        }
        span:nth-child(3) {
          height: 33px;
          font-size: 24px;
          line-height: 33px;
          color: #e6531d;
        }
      }
    }
  }
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
    .cab-cont {
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: #fff;
      padding: 22px 23px 22px 24px;
      position: relative;
      .cab-cont-header {
        display: flex;
        justify-content: space-between;
        .cab-cont-l {
          .carriage-t-start {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
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
                height: 24px;
                font-size: 17px;
                line-height: 24px;
                color: #303030;
                margin-left: 10px;
              }
              p:nth-child(2) {
                height: 17px;
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
                height: 24px;
                font-size: 17px;
                line-height: 24px;
                color: #303030;
                margin-left: 10px;
              }
              p:nth-child(2) {
                height: 17px;
                font-size: 12px;
                line-height: 17px;
                color: #303030;
              }
            }
          }
        }
        .cab-cont-r {
          div:nth-child(1),
          div:nth-child(2) {
            display: flex;
            margin: 6px 8px 8px 0;
            p {
              height: 22px;
              font-size: 14px;
              line-height: 22px;
              color: #303030;
            }
            p:nth-child(2) {
              font-size: 16px;
              margin: 0 6px 0 8px;
            }
            p:nth-child(3) {
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
      .cab-cont-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 26px;
        .cab-cont-info-l {
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
              margin-left: 8px;
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
      .foreshowing-time {
        display: flex;
        align-items: center;
        div:nth-child(1) {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          margin-right: 20px;
        }
        margin-bottom: 30px;
      }
      .cab-cont-nav {
        .cab-nav-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          i {
            margin: 0;
            display: block;
            width: 20px;
            height: 20px;
            background: url("../../assets/container/蒙版组 201@2x.png")
              no-repeat;
            background-size: 20px 20px;
          }
          div:nth-child(2) {
            height: 22px;
            font-size: 16px;
            line-height: 22px;
            color: #333333;
            margin: 0 66px 0 8px;
          }
          div:nth-child(3) {
            height: 25px;
            font-size: 18px;
            line-height: 25px;
            color: #e6531d;
          }
        }
        .cab-nav-itemt {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          div:nth-child(1) {
            width: 100px;
            height: 22px;
            font-size: 14px;
            line-height: 22px;
            color: #333333;
            margin: 0 42px 0 0;
          }
          div:nth-child(2) {
            height: 25px;
            font-size: 16px;
            line-height: 25px;
            color: #e6531d;
          }
        }
        .cab-nav-itemtw {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          div:nth-child(1) {
            width: 100px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            margin: 0 42px 0 0;
          }
          div:nth-child(2) {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
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
    .cab-cont-t {
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: #fff;
      padding: 24px 10px 22px 10px;
      .cab-cont-bidd {
        margin: 12px 14px 0 14px;
        display: flex;
        justify-content: space-between;
        div:nth-child(1) {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          margin-top: 2px;
        }
        div:nth-child(2) {
          margin-right: 20px;
          p {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            margin-bottom: 4px;
          }
        }
        div:nth-child(3) {
          margin-top: 12px;
          margin-right: 10px;
          display: flex;
          i {
            display: block;
            margin: 0;
            width: 20px;
            height: 20px;
            background: url("../../assets/container/蒙版组 181@2x.png")
              no-repeat;
            background-size: 20px 20px;
          }
          span {
            height: 20px;
            padding-left: 8px;
            color: #4486f6;
            font-size: 14px;
          }
        }
      }
      .cab-cont-heat {
        margin: 20px 14px 12px 14px;
        display: flex;
        div {
          margin-right: 16px;
          span {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
        }
      }
    }
    .cab-cont-f {
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: #fff;
      padding: 22px 23px 22px 24px;
      .cab-cont-virtue {
        display: flex;
        margin-bottom: 16px;
        div:nth-child(1) {
          width: 56px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
        div:nth-child(2) {
          margin-left: 20px;
          width: 220px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
      }
      .cab-cont-vir {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 8px;
        color: #333333;
      }
      .cab-cont-virp {
        p {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
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
