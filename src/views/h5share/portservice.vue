<template>
  <div class="portservice" :class="{ intervoyageinland: clientSide }">
    <div class="service_bg">
      <div class="nav-box" @click="openApp">
        <div class="box-select">
          <div class="select">
            <div class="sele-l">*</div>
            <div class="sele-c">
              <div style="font-size: 12px">Please Select a Port</div>
              <div style="font-size: 20px; line-height: 28px; height: 28px">
                请选择港口
              </div>
            </div>
          </div>
          <div class="sele-r"></div>
        </div>
        <div class="box-select">
          <div class="select">
            <div class="sele-l">*</div>
            <div class="sele-c">
              <div>Inbound & Outbound</div>
              <div>进港出港</div>
            </div>
          </div>
          <div class="btn-r">
            <div>进口</div>
            <div>出口</div>
          </div>
        </div>
        <div class="box-select">
          <div class="select">
            <div class="sele-l">*</div>
            <div class="sele-c">
              <div>Name of Cargo</div>
              <div>货物名称</div>
            </div>
          </div>
          <div class="goods-r">请填写货物名称</div>
        </div>
        <div class="box-select">
          <div class="select">
            <div class="sele-l">*</div>
            <div class="sele-c">
              <div>Weight</div>
              <div>重量</div>
            </div>
          </div>
          <div class="goods-r">
            请输入重量 <span style="color: #333333">吨</span>
          </div>
        </div>
        <div class="box-select">
          <div class="select">
            <div class="sele-l">*</div>
            <div class="sele-c">
              <div>Volume</div>
              <div>体积</div>
            </div>
          </div>
          <div class="goods-r">
            请输入体积 <span style="color: #333333">m³</span>
          </div>
        </div>
      </div>
      <div class="Packing-box" @click="openApp">
        <div class="Packing-time">
          <div class="time">
            <div class="time-l">
              <div>Estimated Operation Date</div>
              <div>预计操作时间</div>
            </div>
            <div class="time-r">
              <div>选择日期</div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="Packing-time">
          <div class="time">
            <div class="time-l">
              <div>Packing List</div>
              <div>箱单</div>
            </div>
            <div class="time-list">
              <div>添加箱单</div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="Packing-time">
          <div class="time">
            <div class="time-l">
              <div>Remarks</div>
              <div>备注</div>
            </div>
            <div class="time-list">
              <div>填写备注</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-box" @click="openApp">
        <div class="box-contact">
          <div class="contact">
            <div class="contact-l">*</div>
            <div class="contact-c">
              <div>Contacts</div>
              <div>联系人</div>
            </div>
          </div>
          <div class="contact-r">请填写姓名</div>
        </div>
        <div class="box-contact">
          <div class="contact">
            <div class="contact-l">*</div>
            <div class="contact-c">
              <div>Contact</div>
              <div>联系电话</div>
            </div>
          </div>
          <div class="phone-r">
            <div>+86</div>
            <div>填写手机号</div>
          </div>
        </div>
        <div class="box-contact">
          <div class="contact">
            <div class="contact-l" style="color: #fff">*</div>
            <div class="contact-c">
              <div>Email</div>
              <div>邮箱</div>
            </div>
          </div>
          <div class="contact-r">请填写邮箱</div>
        </div>
      </div>
      <div class="box-sign">
        <i style="color: red">*</i> 基于港口报价，道裕只收代理费1元/计费吨
      </div>
      <div class="box"></div>
    </div>
    <div class="relation">
      <div class="phone" @click="teleDig = true">
        <div></div>
        <div>拨打400热线</div>
      </div>
      <div class="intention" @click="openApp">Inquiry Now / 立即询价</div>
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
import { Field } from "vant";
Vue.use(Field);
import { webGetWXDetail } from "../../api/h5share";
export default {
  data() {
    return {
      clientSide: false,
      dataList: [],
      teleDig: false,
      show: false,
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
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
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
            var s_title = "道裕物流—集港/地面服务", // 分享标题
              s_link = "https://www.dylnet.cn/h5share/portservice", // 分享链接
              s_desc =
                "为全球货主提供从货物出库到港口、地面及航运等全方位的货物运输服务", //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 348.png"; // 分享图标
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
/deep/.van-dialog {
  border-radius: 5px;
}
.portservice {
  .service_bg {
    background: url("../../assets/container/蒙版组 350.png") no-repeat;
    background-size: 100% 232px;
    width: 100%;
    height: 232px;
    padding: 148px 10px 0;
    .bg-title {
      margin: 0 0 16px 10px;
      height: 25px;
      line-height: 25px;
      font-size: 18px;
      color: #ffffff;
    }
    .nav-box {
      border-radius: 6px;
      box-sizing: border-box;
      padding: 18px 16px 14px 6px;
      background: #ffffff;
      margin-bottom: 8px;
      .box-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .select {
          display: flex;
          align-items: center;
          .sele-l {
            height: 20px;
            font-size: 16px;
            padding-top: 10px;
            line-height: 20px;
            color: #fc6e6e;
            margin-right: 4px;
          }
          .sele-c {
            div:nth-child(1) {
              height: 14px;
              font-size: 10px;
              line-height: 14px;
              color: #666666;
            }
            div:nth-child(2) {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              font-family: "tyzt-zht", Arial;
              color: #666666;
            }
          }
        }
        .sele-r {
          width: 6px;
          height: 10px;
          background: url("../../assets/container/路径 3466@2x.png") no-repeat;
          background-size: 6px 10px;
          padding-top: 5px;
        }
        .btn-r {
          display: flex;
          padding-top: 5px;
          div:nth-child(1) {
            padding: 6px 16px;
            font-size: 12px;
            color: #666666;
            background: #eef2f6;
            border-radius: 4px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            padding: 6px 16px;
            font-size: 12px;
            color: #ffffff;
            background: #5a97ff;
            border-radius: 4px;
          }
        }
        .goods-r {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #cccccc;
          padding-top: 5px;
        }
      }
    }
    .Packing-box {
      border-radius: 6px;
      box-sizing: border-box;
      padding: 18px 16px 14px 16px;
      background: #ffffff;
      margin-bottom: 8px;
      .Packing-time {
        .time {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .time-l {
            div:nth-child(1) {
              height: 14px;
              font-size: 10px;
              line-height: 14px;
              color: #666666;
            }
            div:nth-child(2) {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              font-family: "tyzt-zht", Arial;
              color: #666666;
            }
          }
          .time-r {
            display: flex;
            align-items: center;
            div:nth-child(1) {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              color: #cccccc;
              margin-right: 8px;
            }
            div:nth-child(2) {
              background: url("../../assets/container/蒙版组 288@2x.png")
                no-repeat;
              background-size: 16px 16px;
              width: 16px;
              height: 20px;
            }
          }
          .time-list {
            display: flex;
            align-items: center;
            div:nth-child(1) {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              color: #cccccc;
              margin-right: 8px;
            }
            div:nth-child(2) {
              background: url("../../assets/container/路径 3466@2x.png")
                no-repeat;
              background-size: 6px 10px;
              width: 6px;
              height: 14px;
            }
          }
        }
      }
    }
    .contact-box {
      border-radius: 6px;
      box-sizing: border-box;
      padding: 18px 16px 14px 6px;
      background: #ffffff;
      margin-bottom: 14px;
      .box-contact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .contact {
          display: flex;
          .contact-l {
            height: 20px;
            font-size: 16px;
            line-height: 20px;
            color: #fc6e6e;
            margin-right: 4px;
            padding-top: 16px;
          }
          .contact-c {
            div:nth-child(1) {
              height: 14px;
              font-size: 10px;
              line-height: 14px;
              color: #666666;
            }
            div:nth-child(2) {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              font-family: "tyzt-zht", Arial;
              color: #666666;
            }
          }
        }
        .contact-r {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #cccccc;
        }
        .phone-r {
          display: flex;
          div:nth-child(1) {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
          div:nth-child(2) {
            margin-left: 50px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #cccccc;
          }
        }
      }
    }
    .box-sign {
      font-size: 14px;
      line-height: 20px;
      color: #666666;
      text-align: center;
    }
    .box {
      height: 120px;
    }
  }
  .relation {
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    padding: 10px 10px 40px 16px;
    align-items: center;
    justify-content: space-between;
    .phone {
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-child(1) {
        background: url("../../assets/container/组 10346@2x.png") no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
      div:nth-child(2) {
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        font-family: "tyzt-zht", Arial;
        color: #333333;
      }
    }
    .intention {
      line-height: 22px;
      font-size: 16px;
      padding: 9px 37px;
      color: #ffffff;
      background: linear-gradient(90deg, #17b8ff 0%, #2e79f8 100%);
      border-radius: 20px;
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
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
