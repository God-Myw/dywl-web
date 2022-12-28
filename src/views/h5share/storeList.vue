<template>
  <div class="storeList">
    <div class="header">
      <div class="limg">
        <img
          src="http://58.33.34.10:10443/images/spart/1672124394838.png"
          alt=""
        />
      </div>
      <div class="rinfo">
        <div>
          <span>岚梅斯泰备件</span>
          <img
            src="http://58.33.34.10:10443/images/spart/1670924635524.png"
            alt=""
          />
          <!-- &nbsp;&nbsp;
          <img
            src="http://58.33.34.10:10443/images/spart/1670924637144.png"
            alt=""
          /> -->
        </div>
        <div>
          <span
            >信用评级
            <img
              v-for="(item, index) in 6"
              src="http://58.33.34.10:10443/images/spart/1670924109041.png"
              :key="index"
            />
          </span>
          <span class="score">5.0</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="hotbj">
          <ul>
            <li v-for="v in list" :key="v">
              <img :src="v.imgurl" alt="" />
              <p>{{ v.name }}</p>
              <p>{{ v.price }}</p>
              <p>{{ v.info }}</p>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="电子系统">电子系统</van-tab>
      <van-tab title="发动机">发动机</van-tab>
      <van-tab title="通讯系统">通讯系统</van-tab>
      <van-tab title="照明灯">照明灯</van-tab>
      <van-tab title="维修工程">维修工程</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import "vant/lib/button/style";
import { webGetWXDetail } from "../../api/h5share";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      clientSide: false,
      active: 0,
      list: [
        {
          imgurl: require("@/assets/home/img1.png"),
          name: "船舶太阳能定位器汽无12...",
          price: "￥3550.50",
          info: "zs195手摇（12马力）",
        },
        {
          imgurl: require("@/assets/home/img2.png"),
          name: "革泰品宁船用gps1定位器...",
          price: "￥6700.00",
          info: "品宁V6（船专用）+防水壳+fa...",
        },
        {
          imgurl: require("@/assets/home/img3.png"),
          name: "定制常州单杠柴油发动机...",
          price: "￥3100.00",
          info: "zs195手摇（12马力）、zs195...",
        },
        {
          imgurl: require("@/assets/home/img4.png"),
          name: "YAMABISI雅玛贝斯船外...",
          price: "￥2899.90",
          info: "四冲程8马力【长袖】、四冲...",
        },
        {
          imgurl: require("@/assets/home/img5.png"),
          name: "YAMABISI雅玛贝斯船外...",
          price: "￥2899.90",
          info: "四冲程8马力【长袖】、四冲...",
        },
        {
          imgurl: require("@/assets/home/img6.png"),
          name: "YAMABISI雅玛贝斯船外...",
          price: "￥2899.90",
          info: "四冲程8马力【长袖】、四冲...",
        },
      ],
    };
  },
  mounted() {
    // this.getList();
    this.getweChatPay();
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
    async getweChatPay() {
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
            var s_title = "宁波银行抗疫助企一站式全线上", // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/bank", // 分享链接
              s_desc =
                "外汇交易送补济/薪酬代发有福利日常结算领惊喜/各项优惠等您领取截图微信扫码，在线申请", //分享描述
              s_imgUrl =
                "https://www.dylnet.cn/container/img/0787cec42a2fc0e983282c9d359368a.png"; // 分享图标
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
  },
};
</script>

<style lang="scss" scoped>
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.storeList {
  background-color: #ffffff;
  .header {
    width: 230px;
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .limg {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rinfo {
      div:nth-child(1) {
        margin: 12px 0px;
        span {
          font-size: 20px;
          font-family: 苹方-简-中粗体, 苹方-简;
          font-weight: normal;
          color: #333333;
        }
        img {
          vertical-align: text-bottom;
          width: 20px;
          height: 20px;
        }
      }
      div:nth-child(2) {
        span {
          font-size: 12px;
          font-family: 苹方-简-常规体, 苹方-简;
          font-weight: normal;
          color: #999999;
        }
        img {
          // vertical-align: text-bottom;
          width: 12px;
          height: 12px;
        }
        .score {
          vertical-align: baseline;
          margin-left: 3px;
          color: #fd7b05;
        }
      }
    }
  }
  .hotbj {
    padding: 0px 10px 0px 10px;
    /deep/ .van-tab__text {
      width: 72px;
      height: 25px;
      font-size: 18px;
      font-family: "苹方-简-中粗体, 苹方-简";
      font-weight: normal;
      color: #333333;
      z-index: 3;
    }
    /deep/ .van-tabs__line {
      top: 20px;
      width: 72px;
      height: 10px;
      background: linear-gradient(90deg, #bbe2ff 0%, #5aa7ff 100%);
      border-radius: 0px 0px 0px 0px !important;
      opacity: 1;
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: #f1f3f5;
      li {
        width: 49%;
        margin: 10px 0px 0px 0px;
        width: 173px;
        height: 253px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        cursor: pointer;
        img {
          width: 100%;
        }
        p {
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
        p:nth-of-type(1) {
          font-size: 15px;
          font-family: "苹方-简-中黑体, 苹方-简";
          font-weight: normal;
          color: #333333;
          height: 22px;
        }
        p:nth-of-type(2) {
          font-size: 20px;
          font-family: "D-DIN Exp-DINExp-Bold, D-DIN Exp-DINExp";
          font-weight: bold;
          color: #e6531d;
          height: 25px;
        }
        p:nth-of-type(3) {
          width: 157px;
          height: 19px;
          font-size: 11px;
          font-family: "苹方-简-常规体, 苹方-简";
          font-weight: normal;
          color: #999999;
        }
      }
    }
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
