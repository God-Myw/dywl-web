<template>
  <div class="bank" :class="{ intervoyageinland: clientSide }">
    <img
      src="../../assets/container/12a4ca29abd2658477d8c4eda2baecb.jpg"
      alt=""
    />
  </div>
</template>

<script>
import Vue from "vue";
import { webGetWXDetail } from "../../api/h5share";

export default {
  data() {
    return {
      clientSide: false,
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
              s_link = "https://www.dylnet.cn/h5share/bank", // 分享链接
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
.bank {
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
