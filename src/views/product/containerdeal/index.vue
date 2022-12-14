<template>
  <div class="containerdeal">
    <div class="containerdeal_bg">
      <div class="city">
        <div class="title">集装箱买卖</div>
        <div class="city_cont">
          <ul>
            <li
              v-for="(item, index) in cityList"
              :key="index"
              @click="searchTab(index)"
              :class="{ city_nav_active: index == current }"
            >
              <span>{{ item.portName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="containerdeal_buy">
        <div class="title">我要购箱</div>
        <div class="box_header">
          <span>箱型</span>
          <span>新旧</span>
          <span>集装箱买箱价格</span>
          <span>选择数量</span>
        </div>
        <div
          class="box_cont"
          v-for="(item, index) in citydetList"
          :key="citydetList.guid"
        >
          <span>{{ item.size }}</span>
          <span v-if="item.type == 0">全新</span>
          <span v-if="item.type == 1">二手</span>
          <span>{{ item.money }}</span>
          <span>
            <Elinput></Elinput>
          </span>
        </div>

        <div class="box_total">
          <div class="box_total_l">
            <span>合计费用：</span>
            <span>{{ totalcost }}</span>
          </div>
          <div class="box_total_r">
            <div class="transport_cont_l"><i>*</i> 线下交易支付</div>
            <div class="transport_cont_r">
              <div @click="gohint"><span></span><span>联系客服</span></div>
              <div @click="gohint">立即买箱</div>
            </div>
          </div>
        </div>
        <div class="box_explain">
          <div class="title">购买说明</div>
          <div class="box_text">
            <p v-html="remark"></p>
          </div>
        </div>
      </div>
    </div>
    <Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
  </div>
</template>
<script>
import {
  getContainerTradingMainList,
  getContainerTradingSecondary,
} from "../../../api/containerdeal";
import Hint from "../../../components/hint.vue";
import Elinput from "../../../components/elinput.vue";
export default {
  data() {
    return {
      hintStutas: false,
      cityList: [],
      citydetList: [],
      totalcost: "请选择购买箱型",
      current: 0,
      remark: "",
    };
  },
  components: {
    Elinput,
    Hint,
  },
  mounted() {
    this.initial();
  },
  methods: {
    dighintStutas(stats) {
      this.hintStutas = stats;
    },
    gohint() {
      this.hintStutas = true;
    },
    searchTab(index) {
      this.current = index;
      getContainerTradingSecondary({ guid: this.cityList[index].guid }).then(
        (res) => {
          if (res.code == "0000") {
            this.citydetList = res.data.containerTradingSecondaryDtos;
            this.remark = res.data.remark;
            this.remark = this.remark.replace(/\n/g, "<br/><br/>");
          } else {
            this.citydetList = [];
          }
        }
      );
    },
    initial() {
      getContainerTradingMainList().then((res) => {
        if (res.code == "0000") {
          this.cityList = res.data;
          this.searchTab(this.current);
        } else {
          this.cityList = [];
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.containerdeal {
  background: #f5f7f9;
  padding-bottom: 100px;
  .containerdeal_bg {
    background: #f5f7f9 url("../../../assets/seckill/组 8098.jpg") no-repeat;
    background-size: 100% 200px;
    .city {
      width: 1164px;
      margin: 0 auto;
      margin-bottom: 8px;
      .title {
        font-size: 32px;
        font-weight: 400;
        line-height: 32px;
        color: #ffffff;
        padding: 66px 0 40px;
      }
      .city_cont {
        background: #ffffff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        padding: 34px 32px 22px 32px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 6px 16px;
            cursor: pointer;
            border-radius: 4px;
            margin-left: 16px;
            margin-bottom: 12px;
            span {
              display: block;
              font-size: 16px;
              font-weight: 400;
              line-height: 16px;
              color: #606266;
            }
            &:hover {
              background: #4791ff;
              span {
                color: #fff;
              }
            }
          }
          .city_nav_active {
            background: #4791ff;
            span {
              color: #fff;
            }
          }
        }
      }
    }
    .containerdeal_buy {
      box-sizing: border-box;
      width: 1164px;
      margin: 0 auto;
      padding: 35px;
      background: #ffffff;
      border: 1px solid #ebeef5;
      border-radius: 6px;
      .title {
        font-size: 18px;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
        font-weight: 500;
        line-height: 18px;
        color: #303133;
        margin-bottom: 24px;
      }
      .box_header {
        display: flex;
        background: #f5f7fa;
        padding: 22px 40px 12px;
        span {
          display: block;
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #606266;
        }
        span:nth-child(1) {
          margin-right: 190px;
        }
        span:nth-child(2) {
          margin-right: 266px;
        }
        span:nth-child(3) {
          margin-right: 274px;
        }
      }
      .box_cont {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        &:hover {
          background: #f5f7fa;
        }
        span {
          display: block;
          font-size: 18px;
          line-height: 18px;
          color: #303133;
          flex-shrink: 0;
        }
        span:nth-child(1) {
          width: 124px;
          margin: 18px 98px 19px 36px;
          font-size: 16px;
        }
        span:nth-child(2) {
          margin-right: 110px;
          font-size: 16px;
          width: 184px;
        }
        span:nth-child(3) {
          margin-right: 190px;
          width: 184px;
          color: #ff7c41;
          font-family: "d-din-bold", "Microsoft YaHei", Arial;
        }
      }
      .box_total {
        padding: 38px 0 30px;
        display: flex;
        height: 44px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dashed #dcdfe6;
        .box_total_l {
          display: flex;
          span {
            display: block;
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            color: #303133;
          }
          span:nth-child(2) {
            color: #909399;
          }
        }
        .box_total_r {
          display: flex;
          align-items: center;
          margin-right: 22px;
          .transport_cont_l {
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            margin-right: 27px;
            color: #666666;
            i {
              color: #ee424e;
            }
          }
          .transport_cont_r {
            display: flex;
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
              height: 16px;
              background: #4791ff;
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
      .box_explain {
        margin-bottom: 15px;
        .title {
          font-size: 18px;
          font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
          font-weight: 500;
          line-height: 18px;
          color: #303133;
          margin: 36px 0 30px;
        }
        .box_text {
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          color: #303133;
        }
      }
    }
  }
}
</style>
