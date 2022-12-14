<template>
  <div
    class="contIntpallet-cont"
    v-if="dataList.voyage"
    :class="{ intervoyage: clientSide }"
    ref="intervoyage"
  >
    <div class="mbg">
      <div class="cip-header">
        <p>国际航次详情</p>
        <p>发布时间：{{ renderTime(dataList.voyage.createDate) }}</p>
      </div>
      <!-- 船舶信息 -->
      <div class="goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">船舶信息</div>
          </div>
        </div>
        <div class="goodsinf-same" v-if="dataList.ship.shipDeckCN">
          <div>船型</div>
          <div>{{ dataList.ship.shipDeckCN }}</div>
        </div>
        <div class="goodsinf-same" v-if="dataList.ship.shipTypeCN">
          <div>船舶类型</div>
          <div>{{ dataList.ship.shipTypeCN }}</div>
        </div>
        <div class="goodsinf-same" v-if="dataList.ship.buildParticularYear">
          <div>建造年份</div>
          <div>{{ dataList.ship.buildParticularYear }}</div>
        </div>
        <div class="goodsinf-2">
          <div>
            <p>{{ dataList.ship.draft }} 米</p>
            <p>吃水</p>
          </div>
          <div>
            <p>{{ dataList.ship.tonNumber }} 吨</p>
            <p>载重吨</p>
          </div>
          <div>
            <p v-if="dataList.ship.shipCrane">
              {{ dataList.ship.shipCrane }} 个
            </p>
            <p v-else>无</p>
            <p>船吊</p>
          </div>
        </div>
      </div>
      <!-- 承运信息 -->
      <div class="goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">承运信息</div>
          </div>
        </div>
        <div class="goodsinf-same">
          <div>船舶航程</div>
          <div>{{ dataList.voyage.shipVoyage }} 天</div>
        </div>
        <div class="goodsinf-same" v-if="dataList.voyage.acceptTon">
          <div>可接受体积</div>
          <div>{{ dataList.voyage.acceptTon }} m³</div>
        </div>
        <div class="goodsinf-same">
          <div>可接受吨位</div>
          <div>{{ dataList.voyage.acceptCapacity }} 吨</div>
        </div>
      </div>
      <!-- 航线信息 -->
      <div class="goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">承运信息</div>
          </div>
        </div>
        <div class="goodsinf-same">
          <div>已定航线</div>
          <div>{{ dataList.voyageLineName }}</div>
        </div>
        <div class="goodsinf-te2">
          <div><p>停靠港口</p></div>
          <div><p>ETA</p></div>
          <div><p>ETD</p></div>
        </div>
        <div
          class="goodsinf-te"
          v-for="(item, index) in dataList.voyagePort"
          :key="index"
        >
          <div>
            <p>{{ item.portName }}</p>
          </div>
          <div>
            <p>{{ Timesta(item.arriveDate) }}</p>
          </div>
          <div>
            <p>{{ Timesta(item.leaveDate) }}</p>
          </div>
        </div>
      </div>
      <div style="height: 100px"></div>
    </div>
    <div class="single" @click="openApp">立即咨询</div>
    <div class="telephone" @click="teleDig = true"></div>
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
import moment from "moment";
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
import { Dialog, Tab, Tabs, Icon, ActionSheet, ImagePreview } from "vant";
Vue.use(Dialog).use(Icon).use(ActionSheet).use(ImagePreview);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      clientSide: false,
      teleDig: false,
      dataList: [],
      dateDate: "",
      getDay: "",
      id: "",
      show: false,
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
    async getweChatPay(title, beg, id) {
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
              s_link = "https://www.dylnet.cn/#/h5share/intervoyage?" + id, // 分享链接
              s_desc = "航线:" + beg, //分享描述
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
    openApp() {
      this.show = true;
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
    Timesta(value) {
      return moment(parseInt(value)).format("YYYY/MM/DD");
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
      let res = await axios.get(
        `https://www.dylnet.cn/api/business/voyage/getSharetVoyageInfo/${this.id}`
      );
      if (res.data.data) {
        this.dataList = res.data.data;
        let title = this.dataList.ship.shipTypeCN;
        let beg = this.dataList.voyageLineName;
        // 分享
        this.getweChatPay(title, beg, this.id);
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
.teletxt {
  text-align: center;
  margin: 12px 0 20px 0;
  font-size: 14px;
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
    background: #4486f6;
    border-radius: 22px;
  }
  .mbg {
    width: 100%;
    height: 213px;
    background: linear-gradient(180deg, #4486f5 0%, #f1f3f5 100%);
    .cip-header {
      padding: 20px 0 16px 20px;
      font-size: 18px;
      color: #ffffff;
      p:nth-child(2) {
        font-size: 12px;
        padding-top: 4px;
      }
    }
    .goodsinf {
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: #fff;
      padding: 0 20px 32px 20px;
      .goodsinf-1 {
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goodsinf-1-l {
          display: flex;
          i {
            display: block;
            margin: 0;
            margin-top: 4px;
            width: 4px;
            height: 14px;
            background: url("../../assets/container/矩形 1465@2x.png") no-repeat;
            background-size: 4px 14px;
          }
          div {
            font-size: 16px;
            color: #000000;
            padding-left: 8px;
          }
        }
        .goodsinf-1-r {
          span {
            padding: 3px 13px;
            background: rgba(68, 134, 246, 1);
            color: #fff;
            border-radius: 14px;
            font-size: 10px;
          }
          span:nth-child(1) {
            margin-right: 8px;
          }
        }
      }
      .goodsinf-same {
        height: 36px;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #999999;
        div:nth-child(2) {
          font-size: 14px;
          color: #333333;
        }
      }
      .goodsinf-2 {
        height: 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        div {
          font-size: 12px;
          color: #8d8d8d;
          p:nth-child(1) {
            font-size: 14px;
            color: #333333;
            margin-bottom: 2px;
          }
        }
      }
      .goodsinf-te2 {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        div {
          font-size: 12px;
          flex: 1;
          color: #8d8d8d;
          p:nth-child(1) {
            font-size: 14px;
            color: #333333;
            margin-bottom: 2px;
          }
        }
        div:nth-child(2) {
          margin: 0 20px;
        }
      }
      .goodsinf-te {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        div {
          font-size: 12px;
          flex: 1;
          color: #8d8d8d;
          p:nth-child(1) {
            font-size: 14px;
            color: #8d8d8d;
            margin-bottom: 2px;
          }
        }
        div:nth-child(2) {
          margin: 0 20px;
        }
      }
      .goodsinf-3 {
        height: 21px;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        margin-top: 10px;
      }
    }
    .freight {
      .freight-img {
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 80px;
          height: 80px;
          margin: 6px;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
}
.intervoyage {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
