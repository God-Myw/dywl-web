<template>
  <div
    class="contIntpallet-cont"
    v-if="dataList.pallet"
    :class="{ inlandIntpallet: clientSide }"
    ref="inlandIntpallet"
  >
    <div class="mbg">
      <div class="cip-header">
        <p>国内货盘详情</p>
        <p>发布时间：{{ renderTime(dataList.pallet.create_date) }}</p>
      </div>
      <!-- 货物信息 -->
      <div class="goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">货物信息</div>
          </div>
        </div>
        <div class="goodsinf-same" v-if="dataList.goodsName.title_cn">
          <div>货物名称</div>
          <div>{{ dataList.goodsName.title_cn }}</div>
        </div>
        <div class="goodsinf-same" v-if="dataList.pallet.palletNumber">
          <div>货物编号</div>
          <div>{{ dataList.pallet.palletNumber }}</div>
        </div>
        <div
          class="goodsinf-same"
          v-if="dataList.pallet.goodsWeight || dataList.pallet.goodsMaxWeight"
        >
          <div>货物重量</div>
          <div>
            {{ dataList.pallet.goodsWeight }}-{{
              dataList.pallet.goodsMaxWeight
            }}
            吨
          </div>
        </div>
        <div class="goodsinf-same">
          <div style="padding: 2px 0">备注</div>
        </div>
        <div class="goodsinf-3">
          <div v-if="dataList.pallet.remark">{{ dataList.pallet.remark }}</div>
          <div v-else>无</div>
        </div>
      </div>
      <!-- 运输需求 -->
      <div class="carriage goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">运输需求</div>
          </div>
        </div>
        <div class="carriage-t">
          <div class="carriage-t-start">
            <div><i></i></div>
            <p>{{ dataList.startPort.title_cn }}</p>
          </div>
          <div class="carriage-t-end">
            <div><i></i></div>
            <p>{{ dataList.destinationPort.title_cn }}</p>
          </div>
        </div>
        <div class="goodsinf-same">
          <div>装货日期</div>
          <div>
            {{ renderTime(dataList.pallet.loadDate)
            }}<span style="color: #4486f6; padding: 0 4px"
              >+ {{ numberDate }}</span
            >天
          </div>
        </div>
        <div class="goodsinf-same">
          <div>所需船舶吨位</div>
          <div>
            {{ dataList.pallet.weightMin }}-{{ dataList.pallet.weightMax }} 吨
          </div>
        </div>
        <div class="goodsinf-same">
          <div>所需船舶数量</div>
          <div>
            <span v-if="dataList.pallet.shipLoadDay">
              装船天数{{ dataList.pallet.shipLoadDay }} 天;</span
            >

            {{ dataList.pallet.shipSum }} 艘
          </div>
        </div>
        <div class="goodsinf-same">
          <div>意向价</div>
          <div>{{ dataList.pallet.chargeTypeValue }} 元/吨</div>
        </div>
        <div class="goodsinf-same">
          <div>装卸天数</div>
          <div>{{ dataList.pallet.shipLoadUnloadDay }} 天</div>
        </div>
        <div class="goodsinf-same">
          <div>超期费</div>
          <div>{{ dataList.pallet.overdueFee }} 元/天</div>
        </div>
        <div class="goodsinf-same">
          <div>运费结算</div>
          <div>
            <span v-if="dataList.pallet.freightType == 1">有定金</span>
            <span v-if="dataList.pallet.freightType == 2">卸前付清</span>
            <span v-if="dataList.pallet.freightType == 3"
              >有定金、卸前付清</span
            >
          </div>
        </div>
      </div>

      <!-- 其他服务 -->
      <div
        class="services goodsinf"
        v-if="
          dataList.pallet.insuranceJiangyun ||
          dataList.pallet.insuranceKache ||
          dataList.pallet.unionTransport ||
          dataList.pallet.isBind ||
          dataList.pallet.isGangji
        "
      >
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">其他服务</div>
          </div>
        </div>
        <div class="ser-bot">
          <div class="ser-item" v-if="dataList.pallet.unionTransport">
            <div class="ser-item-t">
              <div>联合运输服务</div>
              <div></div>
            </div>
            <div class="ser-item-b">
              与货物航运配套的卡车运输、江运等联合运输
            </div>
          </div>
          <div class="ser-item" v-if="dataList.pallet.isBind">
            <div class="ser-item-t">
              <div>绑扎服务</div>
              <div></div>
            </div>
            <div class="ser-item-b">
              货物航运、卡车运输等绑扎，保证货物安全运输
            </div>
          </div>
          <div class="ser-item" v-if="dataList.pallet.isGangji">
            <div class="ser-item-t">
              <div>集港服务</div>
              <div></div>
            </div>
            <div class="ser-item-b">
              包含 港杂 港建 报关费 报检 临检 理货 提单 等服务
            </div>
          </div>
        </div>
        <div
          class="ins-ser"
          v-if="
            dataList.pallet.insuranceJiangyun || dataList.pallet.insuranceKache
          "
        >
          保险服务
        </div>
        <div class="ins-ser-c">
          <div class="ins-ser-item" v-if="dataList.pallet.insuranceJiangyun">
            <div class="tick"></div>
            <div class="ins-item-b">
              <div>江运海运险</div>
              <div>国内、国际海洋货物运输保险，费率低至万三</div>
            </div>
          </div>
          <div class="ins-ser-item" v-if="dataList.pallet.insuranceKache">
            <div class="tick"></div>
            <div class="ins-item-b">
              <div>卡车运输险</div>
              <div>卡车货物运输保险，全面保障，费率低至万三</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100px"></div>
    </div>

    <div class="btn">
      <div @click="openApp">立即抢单</div>
      <div @click="teleDig = true">电话咨询</div>
    </div>

    <!-- <div class="telephone" @click="teleDig = true"></div> -->
    <van-dialog v-model="teleDig" title="电话咨询" :show-confirm-button="false">
      <div class="teletxt">
        我们即将为您拨打<span style="color: #4088f4; padding-left: 10px">{{
          tellNum
        }}</span>
      </div>
      <div class="telebtn">
        <div @click="teleDig = false">取消</div>
        <div @click="tellconsult">立即拨打</div>
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
import { Dialog, Tab, Tabs, Icon, ActionSheet, ImagePreview } from "vant";
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
Vue.use(Dialog).use(Icon).use(ActionSheet).use(ImagePreview);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      dataList: [],
      dateDate: "",
      getDay: "",
      show: false,
      clientSide: false,
      teleDig: false,
      id: "",
      numberDate: "",
      tellNum: "",
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
            var s_title = "货物名称:" + title, // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/inlandIntpallet?" + id, // 分享链接
              s_desc = "起始港、目的港:" + beg + "→" + end, //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/组 5715.png"; // 分享图标
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
                "https://www.dylnet.cn/container/img/c38af57aaca6acb09454056333ce58a.jpg", // 分享图标
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
    tellconsult() {
      window.location.href = "tel://" + tellNum;
    },
    // 格式化时间
    renderTime(date) {
      let dateee = new Date(date).toJSON();
      let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      return days;
    },
    // 列表数据
    async getList() {
      let index = window.location.href.lastIndexOf("?");
      this.id = window.location.href.substring(
        index + 1,
        window.location.href.length
      );
      let res = await axios(
        `https://www.dylnet.cn/api/business/pallet/getSharetPalletInfo/${this.id}`
      );
      if (res.data.data) {
        this.dataList = res.data.data;
        // 机算当前天
        let loaddate = moment(
          this.renderTime(this.dataList.pallet.loadDate)
        ).valueOf();
        let enddate = moment(
          this.renderTime(this.dataList.pallet.endDate)
        ).valueOf();
        this.numberDate = this.formatDuring(enddate - loaddate);
        let title = this.dataList.goodsName.title_cn;
        let beg = this.dataList.startPort.title_cn;
        let end = this.dataList.destinationPort.title_cn;
        this.tellNum = res.data.data.pallet.contactPhone;
        // 分享
        this.getweChatPay(title, beg, end, this.id);
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
.telephone {
  position: fixed;
  right: 0;
  top: 70%;
  width: 59px;
  height: 52px;
  background: url("../../assets/container/组 5967@2x.png") no-repeat;
  background-size: 59px 52px;
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
.contIntpallet-cont {
  position: relative;
  .btn {
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 18px 11px 48px;
    background: #fff;
    div:nth-child(1) {
      padding: 8px 34px;
      background: #367ef9;
      border-radius: 6px;
      font-size: 18px;
      color: #ffffff;
    }
    div:nth-child(2) {
      background: #ff6c17;
      border-radius: 6px;
      padding: 8px 64px;
      font-size: 18px;
      color: #ffffff;
    }
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
      .goodsinf-3 {
        padding: 0 4px;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        margin-top: 10px;
      }
    }
    .carriage {
      .carriage-t {
        padding-top: 15px;
        .carriage-t-start {
          display: flex;
          align-items: center;
          margin-bottom: 14px;
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
          p {
            flex: 1;
            padding-top: 2px;
            margin-left: 16px;
            font-size: 16px;
            line-height: 20px;
            color: #333333;
          }
        }
        .carriage-t-end {
          display: flex;
          align-items: center;
          margin: 0 0 14px 0;
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
          p {
            flex: 1;
            padding-top: 2px;
            margin-left: 16px;
            font-size: 16px;
            line-height: 20px;
            color: #333333;
          }
        }
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
          img {
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    .services {
      .ser-bot {
        .ser-item {
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .ser-item-t {
            font-size: 14px;
            color: #333333;
            display: flex;
            justify-content: space-between;
            div:nth-child(2) {
              width: 18px;
              height: 18px;
              background: url("../../assets/container/组 5923@2x.png") no-repeat;
              background-size: cover;
            }
          }
          .ser-item-b {
            font-size: 12px;
            color: #999999;
          }
        }
      }
      .ins-ser {
        color: #333333;
        font-size: 14px;
        margin: 14px 0 17px 0;
      }
      .ins-ser-c {
        .ins-ser-item {
          display: flex;
          margin-bottom: 20px;
          .tick {
            width: 18px;
            height: 18px;
            background: url("../../assets/container/组 5923@2x.png") no-repeat;
            background-size: cover;
            margin-right: 12px;
          }
          .ins-item-b {
            font-size: 14px;
            color: #333333;
            div:nth-child(2) {
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
.inlandIntpallet {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
