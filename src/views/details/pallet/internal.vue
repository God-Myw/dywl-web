<template>
  <div class="det_internal">
    <div class="internal_bg">
      <div class="internal">
        <div class="title">国内货运详情</div>
        <div class="issue_time">
          <span>发布时间</span>
          <span></span>
          <span>{{ detailData.create_date | renderTimeY }}</span>
        </div>
        <div class="transport">
          <div class="transport_title">运输需求</div>
          <div class="transport_cont">
            <div class="transport_cont_l">
              <div>
                <span>始发港</span>
                <span></span>
                <span>{{ detailData.titleCnStart }}</span>
              </div>
              <div></div>
              <div>
                <span>目的港</span>
                <span></span>
                <span>{{ detailData.titleCnDes }}</span>
              </div>
              <div>
                <span>装货日期</span>
                <span>{{ detailData.loadDate | renderTimeY }}</span>
                <span>+{{ detailData.shipLoadDay }}天</span>
              </div>
              <div>
                <span>所需船舶吨位</span>
                <span
                  >{{ detailData.goodsWeight }} -
                  {{ detailData.goodsMaxWeight }} 吨</span
                >
              </div>
              <div>
                <span>所需船舶数量</span>
                <span>{{ detailData.shipSum }} 艘</span>
              </div>
            </div>
            <div class="transport_cont_r">
              <div><span></span><span>联系客服</span></div>
              <div>立即抢单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cargo">
      <div class="cargo_title">货物信息</div>
      <div class="cargo_name">
        <span>货物名称</span>
        <span>{{ detailData.titleCnPallet }}</span>
      </div>
      <div class="cargo_number">
        <span>货物编号</span>
        <span>{{ detailData.palletNumber }}</span>
      </div>
      <div class="cargo_weight">
        <span>货物重量</span>
        <span>{{ detailData.goodsWeight }}吨</span>
      </div>
      <div class="cargo_intention">
        <span>意向价</span>
        <span
          ><i style="color: #4791ff">${{ detailData.intentionMoney }}</i>
          USD</span
        >
      </div>

      <div class="cargo_unloaddata">
        <span>卸载天数</span>
        <span>{{ detailData.shipLoadUnloadDay }}天</span>
      </div>
      <div class="cargo_exceed">
        <span>超期费</span>
        <span>{{ detailData.overdueFee }}</span>
      </div>
      <div class="cargo_freight">
        <span>运费结算</span>
        <span v-if="detailData.freightType == 1">有定金</span>
        <span v-if="detailData.freightType == 2">卸前付清</span>
        <span v-if="detailData.freightType == 3">有定金、卸前付清</span>
      </div>
      <div class="cargo_remark">
        <span>备注</span>
        <span v-if="detailData.remark">{{ detailData.remark }}</span>
        <span v-else>无</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getSharetPalletInfo } from "../../../api/pallet";
export default {
  data() {
    return {
      detailData: [],
    };
  },
  mounted() {},
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getSharetPalletInfo(this.$route.query.id).then((res) => {
        if (res.code == "0000") {
          this.detailData = res.data.pallet;
        } else {
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.det_internal {
  background: #f5f7f9;
  padding-bottom: 100px;
  .internal_bg {
    background: #f5f7f9 url("../../../assets/seckill/组 8098.jpg") no-repeat;
    background-size: 100% 200px;
    width: 100%;
    // height: 380px;
    margin-bottom: 8px;
    .internal {
      width: 1164px;
      margin: 0 auto;
      .title {
        font-size: 32px;
        font-weight: 400;
        line-height: 32px;
        color: #ffffff;
        padding: 66px 0 14px;
      }
      .issue_time {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 12px;
        span {
          display: block;
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #ffffff;
          opacity: 0.8;
        }
        span:nth-child(2) {
          background: url("../../../assets/seckill/路径 4042@2x (1).png")
            no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
          margin: 0 6px 0 10px;
        }
      }
      .transport {
        border: 1px solid #ebeef5;
        box-sizing: border-box;
        background: rgb(255, 255, 255);
        border-radius: 6px;
        padding: 28px 39px 19px 35px;
        .transport_title {
          font-size: 18px;
          font-weight: 500;
          line-height: 18px;
          height: 18px;
          color: #303133;
          margin: 0 0 31px 0;
          font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
        }
        .transport_cont {
          display: flex;
          justify-content: space-between;
          .transport_cont_l {
            div:nth-child(1) {
              display: flex;
              span {
                display: block;
              }
              span:nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 118px;
                padding: 5px 0 3px 0;
              }
              span:nth-child(2) {
                background: url("../../../assets/homepage/蒙版组 179@2x.png")
                  no-repeat;
                background-size: 100% 100%;
                width: 20px;
                height: 20px;
                margin: 1px 0 1px 0;
                margin-right: 12px;
              }
              span:nth-child(3) {
                font-size: 22px;
                font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
                font-weight: 500;
                line-height: 22px;
                color: #303133;
              }
            }
            div:nth-child(2) {
              width: 0px;
              height: 14px;
              border-left: 1px dashed #c0c4cc;
              margin-left: 170px;
            }
            div:nth-child(3) {
              display: flex;
              margin-bottom: 43px;
              span {
                display: block;
              }
              span:nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 118px;
                padding: 5px 0 3px 0;
              }
              span:nth-child(2) {
                background: url("../../../assets/homepage/蒙版组 180@2x.png")
                  no-repeat;
                background-size: 100% 100%;
                width: 20px;
                height: 20px;
                margin: 1px 0 1px 0;
                margin-right: 12px;
              }
              span:nth-child(3) {
                font-size: 22px;
                font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
                font-weight: 500;
                line-height: 22px;
                color: #303133;
              }
            }
            div:nth-child(4) {
              display: flex;
              margin-bottom: 18px;
              span {
                display: flex;
              }
              span:nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 104px;
              }
              span:nth-child(2) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #303133;
                margin-right: 2px;
              }
              span:nth-child(3) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #3b7cfb;
              }
            }
            div:nth-child(5) {
              display: flex;
              margin-bottom: 18px;
              span {
                display: block;
              }
              span:nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 76px;
              }
              span:nth-child(2) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #303133;
              }
            }
            div:nth-child(6) {
              display: flex;
              margin-bottom: 29px;
              span {
                display: block;
              }
              span:nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 76px;
              }
              span:nth-child(2) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #303133;
              }
            }
          }
          .transport_cont_r {
            display: flex;
            margin-top: 102px;
            div:nth-child(1) {
              display: flex;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              height: 42px;
              cursor: pointer;
              span {
                display: block;
              }
              span:nth-child(1) {
                background: url("../../../assets/seckill/蒙版组 285@2x.png")
                  no-repeat;
                background-size: 100% 100%;
                width: 20px;
                height: 20px;
                margin: 11px 8px 11px 18px;
              }
              span:nth-child(2) {
                font-size: 16px;
                font-weight: 400;
                line-height: 20px;
                color: #606266;
                margin: 11px 18px 11px 0;
              }
              &:hover {
                background: #dcdfe6;
              }
            }
            div:nth-child(2) {
              margin-left: 12px;
              border-radius: 4px;
              height: 42px;
              background: #26a6e9;
              padding: 14px 40px;
              font-size: 16px;
              font-weight: 400;
              line-height: 16px;
              color: #ffffff;
              cursor: pointer;
              &:hover {
                background: #33b9ff;
              }
            }
          }
        }
      }
    }
  }
  .cargo {
    box-sizing: border-box;
    padding: 28px 39px 48px 35px;
    border: 1px solid #ebeef5;
    width: 1164px;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;

    .cargo_title {
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      height: 18px;
      color: #303133;
      margin: 27px 0 30px 0;
      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
    }
    .cargo_name {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        height: 14px;
        color: #909399;
        padding: 5px 0 3px 0;
        margin-right: 104px;
      }
      span:nth-child(2) {
        font-size: 22px;
        font-weight: 500;
        line-height: 22px;
        height: 22px;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
        color: #303133;
      }
    }
    .cargo_number {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
        height: 14px;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 104px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_weight {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 104px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_intention {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 116px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_unloaddata {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 104px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_exceed {
      display: flex;
      margin-bottom: 18px;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 116px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_freight {
      display: flex;
      margin-bottom: 47px;
      height: 44px;
      border-bottom: 1px dashed #dcdfe6;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 104px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
      }
    }
    .cargo_remark {
      margin-top: 29px;
      display: flex;
      span {
        display: block;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #909399;
        margin-right: 132px;
      }
      span:nth-child(2) {
        width: 478px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: #303133;
      }
    }
  }
}
</style>
