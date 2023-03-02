<template>
  <div class="hom-content" :class="{ contIntpallet: clientSide }">
    <div class="img1">
      <img src="../../assets/img/租箱子_01.jpg" alt="" />
    </div>
    <div class="img2">
      <img src="../../assets/img/租箱子_02.jpg" alt="" />
    </div>
    <div class="img3" @click="openApp">
      <img src="../../assets/img/租箱子_03.jpg" alt="" />
    </div>
    <div class="img4">
      <img src="../../assets/img/租箱子_04.jpg" alt="" />
    </div>
    <div class="img5" @click="openApp">
      <img src="../../assets/img/租箱子_05.jpg" alt="" />
    </div>
    <div class="img6">
      <img src="../../assets/img/租箱子_06.jpg" alt="" />
    </div>
    <div class="img7" @click="openApp">
      <img src="../../assets/img/租箱子_07.jpg" alt="" />
    </div>
    <div class="img8">
      <img src="../../assets/img/租箱子_08.jpg" alt="" />
    </div>
    <div class="img9" @click="openApp">
      <img src="../../assets/img/租箱子_09.jpg" alt="" />
    </div>
    <div class="img11">
      <img src="../../assets/img/租箱子_10.jpg" alt="" />
    </div>
    <div class="img10" @click="openApp">
      <img src="../../assets/img/button2.png" alt="" />
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
import { Dialog } from "vant";
import CallApp from "callapp-lib";
import { webGetWXDetail } from "../../api/h5share";
Vue.use(Dialog);

export default {
  data() {
    return {
      show: false,
      clientSide: false,
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
    this.getweChatPay();
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
            var s_title = "中国-北美线集装箱租赁", // 分享标题
              s_link = "https://www.dylnet.cn/h5share/WeCatpa", // 分享链接
              s_desc = "出租：中国各大主港；还箱：美国、加拿大各大主港", //分享描述
              s_imgUrl =
                "https://www.dylnet.cn/container/img/20210805152547.png"; // 分享图标

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
.hom-content {
  width: 100%;
  position: relative;
  background: #eee;
  .img1 {
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .imgbtn {
    position: absolute;
    width: 100%;
    top: 15.5%;
    img {
      margin: 0 auto;
      width: 80%;
      display: block;
    }
  }
  .img2 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img3 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img4 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img5 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img6 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img7 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img8 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img9 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img11 {
    img {
      width: 100%;
      display: block;
    }
  }
  .img10 {
    width: 100%;
    position: absolute;
    bottom: 3%;
    img {
      margin: 0 auto;
      width: 80%;
      display: block;
    }
  }
}
.contIntpallet {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
