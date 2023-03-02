<template>
  <div class="homepage">
    <div class="homepage-head">
      <div class="head-order">
        <ul>
          <li v-for="item in hometit" :key="item.id">
            <div class="li-left">
              <div class="li-left-t">{{ item.title }}</div>
              <div class="li-left-b">
                <div>{{ item.num }}</div>
                <div>{{ item.unit }}</div>
              </div>
            </div>
            <div class="li-img">
              <img :src="item.img" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div class="head-popularize">
        <div class="popularize-title">我要推广</div>
        <div class="popularize-bg">
          <div class="popularize_qrcode">
            <div id="qrcode" ref="qrcode"></div>
            <!-- <img src="../../../assets/container/组 11911@2x.png" alt="" /> -->
          </div>
        </div>
        <div class="popularize-tag">保存图片进行分享推广</div>
      </div>
    </div>
    <div class="homepage-data">
      <div class="data-title">
        <div class="title-left">
          <div></div>
          <div>订单数据统计</div>
        </div>
        <div class="title-right">
          <div></div>
          <div>注册量统计</div>
        </div>
      </div>
      <div class="data-cont">
        <div class="data-cont-l">
          <t-table
            row-key="index"
            size="medium"
            :data="dataList"
            :columns="columnsl"
          />
        </div>
        <div class="data-cont-r">
          <t-table
            row-key="index"
            size="medium"
            :data="dataList"
            :columns="columnsr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { getHomeInformation } from "../../../api/walliance.js";
export default {
  data() {
    return {
      hometit: [
        {
          title: "累计订单数",
          id: 1,
          num: "",
          unit: "笔",
          img: require("../../../assets/container/组 11911@2x.png"),
        },
        {
          title: "累计订单金额",
          id: 2,
          num: "",
          unit: "元",
          img: require("../../../assets/container/组 11912@2x.png"),
        },
        {
          title: "累计返利总额",
          id: 3,
          num: "",
          unit: "元",
          img: require("../../../assets/container/组 11906@2x.png"),
        },
        {
          title: "累计注册企业",
          id: 4,
          num: "",
          unit: "家",
          img: require("../../../assets/container/组 11918@2x.png"),
        },
        {
          title: "加盟费",
          id: 5,
          num: "",
          unit: "元",
          img: require("../../../assets/container/组 11908@2x.png"),
        },
        {
          title: "账户返利",
          id: 6,
          num: "",
          unit: "元",
          img: require("../../../assets/container/组 11907@2x.png"),
        },
      ],
      dataList: [],
      // 表头
      columnsl: [
        {
          colKey: "date",
          title: "时间",
          // 对齐方式
          align: "left",
          width: "140",
          className: "custom-class-index",
        },
        {
          colKey: "orlder",
          title: "订单数(笔)",
          // 对齐方式
          align: "right",
          width: "200",
        },
        {
          colKey: "jine",
          title: "订单金额(元)",
          // 对齐方式
          align: "right",
          width: "200",
        },
      ],
      columnsr: [
        {
          colKey: "date",
          title: "时间",
          // 对齐方式
          align: "left",
          width: "140",
          className: "custom-class-index",
        },
        {
          colKey: "ren",
          title: "注册数(人)",
          // 对齐方式
          align: "right",
          width: "200",
        },
        {
          colKey: "orlder",
          title: "订单数(笔)",
          // 对齐方式
          align: "right",
          width: "200",
        },
      ],
      promotionNumber: "",
    };
  },
  created() {
    this.inquire();
  },
  mounted() {
    this.qrcode();
  },
  methods: {
    // 动态生成二维码
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 116, // 设置宽度，单位像素
        height: 116, // 设置高度，单位像素
        text:
          "https://www.dylnet.cn/h5share/h5register?InvitationCode=" +
          this.promotionNumber, // 设置二维码内容或跳转地址
      });
    },
    inquire() {
      getHomeInformation().then((res) => {
        if (res.code == "0000") {
          this.dataList = res.data.arraylist;
          this.promotionNumber = res.data.promotionNumber;
          this.hometit.map((item) => {
            switch (item.id) {
              case 1:
                item.num = res.data.integer;
                break;
              case 2:
                item.num = res.data.jins;
                break;
              case 3:
                item.num = res.data.jin;
                break;
              case 4:
                item.num = res.data.user;
                break;
              case 5:
                item.num = res.data.jmf;
                break;
              case 6:
                item.num = res.data.jin;
                break;

              default:
                break;
            }
          });
        } else {
          this.dataList = [];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.homepage {
  padding: 17px 23px 17px;
  font-family: "SourceHanSansCN", Arial;
  .homepage-head {
    display: flex;
    margin: 0 auto;
    width: 1164px;
    margin-bottom: 7px;
    .head-order {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          background: #fff;
          width: 280px;
          border-radius: 8px;
          padding: 34px 24px;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          margin: 7px 14px 7px 0;
          cursor: pointer;
          .li-left {
            .li-left-t {
              font-size: 14px;
              line-height: 14px;
              color: #999999;
              margin-bottom: 8px;
            }
            .li-left-b {
              display: flex;

              div:nth-child(1) {
                font-size: 24px;
                font-family: "d-din-bold", Arial;
                color: #333333;
                line-height: 26px;
                margin-right: 6px;
              }
              div:nth-child(2) {
                font-size: 20px;
                line-height: 26px;
                font-family: "SourceHanSansCN-Medium", Arial;
                color: #333333;
              }
            }
          }
          .li-img {
            width: 48px;
            height: 48px;
            img {
              width: 100%;
              height: 100%;
              display: flex;
            }
          }
        }
      }
    }
    .head-popularize {
      border-radius: 8px;
      flex-shrink: 0;
      margin-top: 7px;
      width: 280px;
      height: 246px;
      background: #fff;
      .popularize-title {
        padding: 24px 0 0 24px;
        font-size: 16px;
        font-family: "SourceHanSansCN-Medium", Arial;
        color: #333333;
      }
      .popularize-bg {
        background: url("../../../assets/container/矩形 4363@2x.png") no-repeat;
        background-size: 146px 146px;
        width: 146px;
        height: 146px;
        margin: 0 auto;
        padding-top: 10px;
        .popularize_qrcode {
          width: 116px;
          height: 116px;
          margin: 0 auto;
          // img {
          //   width: 100%;
          //   height: 100%;
          //   display: block;
          // }
        }
      }
      .popularize-tag {
        padding-top: 12px;
        font-size: 14px;
        color: rgba(51, 51, 51, 0.6);
        font-weight: 400;
        text-align: center;
      }
    }
  }
  .homepage-data {
    width: 1164px;
    background: #fff;
    margin: 0 auto;
    padding: 34px 24px;
    .data-title {
      display: flex;
      margin-bottom: 22px;
      justify-content: space-between;
      .title-left {
        width: 540px;
        display: flex;
        align-items: center;
        div:nth-child(1) {
          background: url("../../../assets/container/蒙版组 266@2x.png")
            no-repeat;
          background-size: 20px 20px;
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
        div:nth-child(2) {
          font-size: 16px;
          font-family: "SourceHanSansCN-Medium", Arial;
          line-height: 20px;
          color: #333333;
        }
      }
      .title-right {
        width: 540px;
        display: flex;
        align-items: center;
        div:nth-child(1) {
          background: url("../../../assets/container/组 11917@2x.png") no-repeat;
          background-size: 20px 20px;
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
        div:nth-child(2) {
          font-size: 16px;
          font-family: "SourceHanSansCN-Medium", Arial;
          line-height: 20px;
          color: #333333;
        }
      }
    }
    .data-cont {
      display: flex;
      justify-content: space-between;
      .data-cont-l {
        width: 540px;
        /deep/.t-table__header {
          tr {
            background: #f1f2f5;
          }
        }
        /deep/.t-table__body {
          .custom-class-index {
            color: #0052d9;
          }
        }
      }
      .data-cont-r {
        width: 540px;
        /deep/.t-table__header {
          tr {
            background: #f1f2f5;
          }
        }
        /deep/.t-table__body {
          .custom-class-index {
            color: #0052d9;
          }
        }
      }
    }
  }
}
</style>
