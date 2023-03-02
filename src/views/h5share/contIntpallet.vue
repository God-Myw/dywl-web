<template>
  <div
    class="contIntpallet-cont"
    v-if="dataList.pallet"
    :class="{ contIntpallet: clientSide }"
    ref="contIntpallet"
  >
    <div class="mbg">
      <div class="cip-header">
        <p>国际货盘详情</p>
        <p>发布时间：{{ renderTime(dataList.pallet.create_date) }}</p>
      </div>
      <!-- 货物信息 -->
      <div class="goodsinf">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">货物信息</div>
          </div>
          <div class="goodsinf-1-r">
            <span v-if="dataList.pallet.isSuperposition == 1">可以叠加</span>
            <span v-if="dataList.pallet.majorParts == 0">非重大件</span>
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
        <div class="goodsinf-same">
          <div>货物存放位置</div>
          <div v-if="dataList.pallet.location == 0">舱内</div>
          <div v-if="dataList.pallet.location == 1">甲板</div>
          <div v-if="dataList.pallet.location == 2">舱内/甲板</div>
        </div>
        <div class="goodsinf-same" v-if="dataList.pallet.superposition">
          <div>叠高</div>
          <div>{{ dataList.pallet.superposition }}个高</div>
        </div>
        <div
          class="goodsinf-same"
          v-if="dataList.pallet.addCommission || dataList.pallet.commission"
        >
          <div>佣金</div>
          <div>
            <span v-if="dataList.pallet.addCommission">Add.com</span>
            <span style="color: #4486f6; padding: 0 4px">{{
              dataList.pallet.addCommission
            }}</span>
            <span
              v-if="dataList.pallet.addCommission && dataList.pallet.commissio"
              >+</span
            >
            <span v-if="dataList.pallet.commission">com</span>
            <span style="color: #4486f6; padding: 0 4px">{{
              dataList.pallet.commission
            }}</span>
          </div>
        </div>
        <div class="goodsinf-2">
          <div>
            <p>
              {{ dataList.pallet.goodsWeight }}-{{
                dataList.pallet.goodsMaxWeight
              }}
              吨
            </p>
            <p>货物重量</p>
          </div>
          <div>
            <p
              v-if="
                dataList.pallet.goodsVolume || dataList.pallet.goodsVolume == 0
              "
            >
              {{ dataList.pallet.goodsVolume }} m³
            </p>
            <p v-else>- m³</p>
            <p>货物体积</p>
          </div>
          <div>
            <p v-if="dataList.pallet.goodsProperty == 0">通货物</p>
            <p v-if="dataList.pallet.goodsProperty == 1">危险品</p>
            <p v-if="dataList.pallet.goodsProperty == 2">化学品</p>
            <p v-if="dataList.pallet.goodsProperty == 3">散装</p>
            <p v-if="dataList.pallet.goodsProperty == 4">袋装</p>
            <p>货物性质</p>
          </div>
        </div>
        <div class="goodsinf-same">
          <div style="padding: 2px 0">备注</div>
        </div>
        <div class="goodsinf-3">
          <div v-if="dataList.pallet.remark">{{ dataList.pallet.remark }}</div>
          <div else>无</div>
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
            <div>{{ dataList.startPort.title_cn }}</div>
          </div>
          <div class="carriage-t-end">
            <div><i></i></div>
            <div>{{ dataList.destinationPort.title_cn }}</div>
          </div>
        </div>
        <div class="goodsinf-same">
          <div>受载日期</div>
          <div>{{ renderTime(dataList.pallet.loadDate) }}</div>
        </div>
        <div class="goodsinf-same">
          <div>截止日期</div>
          <div>{{ renderTime(dataList.pallet.endDate) }}</div>
        </div>
      </div>
      <!-- 货物清单 -->
      <div class="freight goodsinf" v-if="!listData.length == 0">
        <div class="goodsinf-1">
          <div class="goodsinf-1-l">
            <i></i>
            <div class="tyzt-zht">货物清单</div>
          </div>
        </div>
        <div class="freight-img">
          <div class="img" v-for="(item, index) in listData" :key="index">
            <img
              v-if="item"
              :src="item"
              @click="getImg(listData, index)"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 其他服务 -->
      <div
        class="services goodsinf"
        v-if="
          dataList.pallet.insuranceHaiyun ||
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
            dataList.pallet.insuranceHaiyun || dataList.pallet.insuranceKache
          "
        >
          保险服务
        </div>
        <div class="ins-ser-c">
          <div class="ins-ser-item" v-if="dataList.pallet.insuranceHaiyun">
            <div class="tick"></div>
            <div class="ins-item-b">
              <div>海运险</div>
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
    <div class="single" @click="openApp">立即抢单</div>
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
import { Dialog, Tab, Tabs, Icon, ActionSheet, ImagePreview } from "vant";
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
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
      title: "",
      show: false,
      listData: [],
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
    // 打开app失败跳转页
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
    // 分享
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
              s_link = "https://www.dylnet.cn/h5share/contIntpallet?" + id, // 分享链接
              s_desc = "起始港、目的港:" + beg + "→" + end, //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/组 5715@2x.png"; // 分享图标

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
    // 转化时间格式
    renderTime(date) {
      let dateee = new Date(date).toJSON();
      let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0];
    },
    getImg(images, index) {
      ImagePreview({
        images: this.listData,
        showIndex: true,
        loop: false,
        startPosition: index,
      });
    },
    // 拨打电话
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
    // 列表数据
    async getList() {
      // 获取链接后的参数
      let index = window.location.href.lastIndexOf("?");
      this.id = window.location.href.substring(
        index + 1,
        window.location.href.length
      );
      let res = await axios.get(
        `https://www.dylnet.cn/api/business/pallet/getSharetPalletInfo/${this.id}`
      );
      if (res.data.data) {
        this.dataList = res.data.data;
        let title = this.dataList.goodsName.title_cn;
        let beg = this.dataList.startPort.title_cn;
        let end = this.dataList.destinationPort.title_cn;
        // 分享
        this.getweChatPay(title, beg, end, this.id);
        res.data.data.palletFileList.map((item) => {
          this.listData.push(
            "http://58.33.34.10:10443/images/" + item.type + "/" + item.fileName
          );
        });
      } else {
        this.dataList = [];
      }
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
    background: #4486f6;
    border-radius: 22px;
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
          span:nth-child(2) {
            margin-left: 8px;
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
          div:nth-child(1) {
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
          div:nth-child(2) {
            padding-top: 2px;
            margin-left: 16px;
            flex: 1;
            font-size: 16px;
            line-height: 20px;
            color: #333333;
          }
        }
        .carriage-t-end {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0 15px 0;
          div:nth-child(1) {
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
          div:nth-child(2) {
            padding-top: 2px;
            margin-left: 16px;
            flex: 1;
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
.contIntpallet {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
