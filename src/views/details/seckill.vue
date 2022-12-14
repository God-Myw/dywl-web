<template>
  <div class="seckill_det">
    <div class="seckill_bg">
      <div class="seckill_header">
        <div class="seckill_title">现舱秒杀</div>
        <div class="seckill_top">
          <div class="seckill_top_l">
            <div class="seckill_list_l">
              <div class="start_l_from">
                <div class="start_l_from_china">
                  <i></i>
                  <div>杭州港萧山联运专术属港区</div>
                </div>
                <div class="start_l_from_eng">
                  Houston of Langzhou port of o Xiaoshan area laa
                </div>
              </div>
              <div class="start_l_end">
                <div class="end_l_from_china">
                  <i></i>
                  <div>杭州港</div>
                </div>
                <div class="end_l_from_eng">Hangzhou</div>
              </div>
            </div>
            <div class="seckill_list_r">
              <div class="start_r_Closing">
                <span>截关</span>
                <span>周四</span>
                <span>12月12日</span>
              </div>
              <div class="start_r_sail">
                <span>开船</span>
                <span>周六</span>
                <span>12月14日</span>
              </div>
              <div class="start_r_voyage">
                <span>航程</span>
                <span>24天</span>
              </div>
            </div>
            <div class="seckill_list_t">
              <div class="seckill_time_l">
                <div class="seckill_time_l_name">秒杀时间</div>
                <div class="seckill_time_l_time">
                  <div>2020-10-27 09:00</div>
                  <div>2020-10-28 09:30</div>
                </div>
              </div>
              <div class="seckill_time_r">
                <span>已售</span>
                <span>20人</span>
                <span>关注</span>
                <span>30人</span>
                <span>围观</span>
                <span>384人</span>
              </div>
            </div>
          </div>
          <div class="seckill_list_count">
            <div class="seckill_list_count_i"></div>
            <div class="seckill_list_count_c">秒杀中</div>
            <div class="seckill_list_count_e">距结束</div>
            <div>
              <CountDownP
                @openactivity="activitystate"
                :endDate="endDate"
              ></CountDownP>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="seckill_rob">
      <div class="seckill_rob_h">
        <div>秒杀抢舱</div>
        <div>限时特价</div>
        <div>可载重大件</div>
        <div>可载重大件</div>
      </div>
      <div class="seckill_rob_table">
        <div class="seckill_table_header">
          <div>箱型</div>
          <div>舱位</div>
          <div>海运费（秒杀单价）</div>
          <div>海运费（原价）</div>
          <div>选择数量</div>
        </div>
        <div class="seckill_table_list">
          <div class="seckill_table_li">
            <div class="seckill_table_li_f">20HQ</div>
            <div><i></i>6</div>
            <div><i></i><span>秒杀价</span><span>$7800</span></div>
            <div>$7700</div>
            <div>
              <el-input-number
                v-model="num"
                size="small"
                :min="0"
                step-strictly
              ></el-input-number>
            </div>
          </div>
          <div class="seckill_table_li">
            <div class="seckill_table_li_f">40HQ</div>
            <div><i></i>6</div>
            <div><i></i><span>秒杀价</span><span>$7800</span></div>
            <div>$7700</div>
            <div>
              <el-input-number
                v-model="num"
                size="small"
                :min="0"
                step-strictly
              ></el-input-number>
            </div>
          </div>
        </div>
        <div class="seckill_table_bottom">
          <div class="seckill_table_bottom_l">
            <span>合计海运费：</span><span>请选择购买箱型</span>
          </div>
          <div class="seckill_table_bottom_r">
            <span><i>*</i> 海运费线下交易支付</span><span>立即抢舱</span>
          </div>
        </div>
      </div>
    </div>
    <div class="seckill_service_charge">
      <div class="service_charge_title">其它服务费</div>
      <div class="service_box">
        <div class="service_box_header">
          <div>箱型</div>
          <div>码头费</div>
          <div>AMS</div>
          <div>文件费</div>
          <div>THC</div>
          <div>改单费</div>
        </div>
        <div class="service_box_list">
          <div class="service_box_list_li">
            <div>20HQ</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
          </div>
          <div class="service_box_list_li">
            <div>40HQ</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
            <div>$7800</div>
          </div>
        </div>
      </div>
    </div>
    <div class="seckill_message">
      <div class="seckill_message_title">其他信息</div>
      <div class="seckill_message_cont">
        <div class="seckill_message_cont_o">
          <div>船公司</div>
          <div>所属公司</div>
        </div>
        <div class="seckill_message_cont_t">
          <div>上海完美时空软件有限公司</div>
          <div>上海道裕物流科技有限公司（宝山分公司）</div>
        </div>
        <div class="seckill_message_cont_h">秒杀须知</div>
        <div class="seckill_message_cont_f">
          <div>1. 美国船东，美国国旗；美国自有码头；</div>
          <div>2. 重吊，一装一卸直达休斯敦、航速快；</div>
          <div>3. 本船为MPP船，可载件杂货、重大件。</div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="activityEnd"
      width="424px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="30vh"
    >
      <div class="dialog_cont">
        本场秒杀活动<span style="color: #f56c6c">已结束</span
        >，看看其他最新的秒杀吧
      </div>
      <div class="dialog_cont_btn" @click="goProduct">立即查看</div>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import CountDownP from "../../components/countDown.vue";
import { getContainerSpikeById } from "../../api/details";
export default {
  components: {
    CountDownP,
  },
  data() {
    return {
      num: "0",
      endDate: "2022-01-5 14:09:00",
      activityEnd: false,
    };
  },
  mounted() {
    // console.log(this.$route.query.guid);
    this.initiate()
  },

  methods: {
    ...mapMutations(["product"]),
    goProduct() {
      this.product(2);
      this.$router.push({
        path: "/product",
        query: { active: "first" },
      });
    },
    activitystate(state) {
      this.activityEnd = state;
    },
    initiate() {

    }
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog {
  border-radius: 6px;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 40px 32px 28px;
    .dialog_cont {
      font-size: 18px;
      font-weight: 400;
      line-height: 18px;
      color: #303133;
      margin-bottom: 30px;
    }
    .dialog_cont_btn {
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 44px;
      background: #4791ff;
      color: #fff;
      width: 130px;
      height: 44px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background: #51aeff;
      }
    }
  }
}
.seckill_det {
  background: rgb(245, 247, 249);
  padding-bottom: 78px;
  .seckill_bg {
    background: rgb(245, 247, 249) url("../../assets/seckill/组 8098.jpg")
      no-repeat;
    background-size: 100% 200px;
    width: 100%;
    .seckill_header {
      width: 1164px;
      margin: 0 auto;
      padding-bottom: 12px;
      .seckill_title {
        font-size: 32px;
        font-weight: 400;
        line-height: 32px;
        color: #fff;
        padding: 66px 0 40px 0;
      }
      .seckill_top {
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ebeef5;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        padding: 36px;
        .seckill_top_l {
          display: flex;
          .seckill_list_l {
            margin-right: 28px;
            .start_l_from {
              margin-bottom: 18px;
              .start_l_from_china {
                display: flex;
                margin-bottom: 6px;
                i {
                  flex-shrink: 0;
                  display: block;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 179@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div {
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                  width: 200px;
                  font-size: 22px;
                  line-height: 28px;
                  font-weight: 500;
                  margin-top: -3px;
                  color: #303133;
                }
              }
              .start_l_from_eng {
                width: 200px;
                font-size: 14px;
                line-height: 16px;
                font-weight: 400;
                color: #909399;
                margin-left: 30px;
              }
            }
            .start_l_end {
              .end_l_from_china {
                display: flex;
                margin-bottom: 6px;
                i {
                  flex-shrink: 0;
                  display: block;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 180@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div {
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                  width: 200px;
                  font-size: 22px;
                  line-height: 28px;
                  font-weight: 500;
                  margin-top: -3px;
                  color: #303133;
                }
              }
              .end_l_from_eng {
                width: 200px;
                font-size: 14px;
                line-height: 16px;
                font-weight: 400;
                color: #909399;
                margin-left: 30px;
              }
            }
          }
          .seckill_list_r {
            margin-right: 65px;
            .start_r_Closing {
              margin-bottom: 22px;
              display: flex;
              span {
                display: block;
                font-size: 18px;
                line-height: 18px;
              }
              span:nth-child(1) {
                font-weight: 400;
                color: #909399;
              }
              span:nth-child(2) {
                font-weight: 500;
                color: #303030;
                padding: 0 10px 0 10px;
                font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
              }
              span:nth-child(3) {
                font-weight: 400;
                color: #303133;
              }
            }
            .start_r_sail {
              display: flex;
              span {
                display: block;
                font-size: 18px;
                line-height: 18px;
              }
              margin-bottom: 24px;
              span:nth-child(1) {
                font-size: 18px;
                font-weight: 400;
                color: #909399;
                line-height: 18px;
              }
              span:nth-child(2) {
                font-weight: 500;
                color: #303030;
                padding: 0 10px 0 10px;
                font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
              }
              span:nth-child(3) {
                font-weight: 400;
                color: #303133;
              }
            }
            .start_r_voyage {
              span {
                font-size: 18px;
                line-height: 18px;
                font-weight: 400;
                color: #606266;
                margin-right: 10px;
              }
            }
          }
          .seckill_list_t {
            .seckill_time_l {
              display: flex;
              margin-bottom: 32px;
              .seckill_time_l_name {
                font-size: 14px;
                line-height: 20px;
                color: #303133;
                margin-right: 35px;
              }
              .seckill_time_l_time {
                font-size: 14px;
                line-height: 20px;
                color: #303133;
                div:nth-child(1) {
                  margin-bottom: 6px;
                }
              }
            }
            .seckill_time_r {
              span {
                font-size: 14px;
                line-height: 20px;
                display: inline-block;
                color: #303133;
              }
              span:nth-child(even) {
                color: #4486f6;
                padding: 0 28px 0 4px;
              }
            }
          }
        }
        .seckill_list_count {
          display: flex;
          .seckill_list_count_i {
            background: url("../../assets/homepage/蒙版组 284@2x.png") no-repeat;
            background-size: 14px 14px;
            width: 14px;
            height: 14px;
            margin-top: 8px;
          }
          .seckill_list_count_c {
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            height: 14px;
            color: #e95b5b;
            margin: 0 10px 0 6px;
            margin-top: 8px;
          }
          .seckill_list_count_e {
            font-size: 12px;
            font-weight: 400;
            line-height: 14px;
            height: 14px;
            color: #909399;
            margin-right: 8px;
            margin-top: 8px;
          }
        }
      }
    }
  }
  .seckill_rob {
    width: 1164px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    margin-bottom: 12px;
    padding: 25px 36px 40px 36px;
    .seckill_rob_h {
      display: flex;
      margin-bottom: 21px;
      div:nth-child(1) {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        color: #303133;
        margin-right: 20px;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
      }
      div:nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        padding: 5px;
        border: 1px solid #4791ff;
        color: #fff;
        background: #4791ff;
        border-radius: 4px;
        margin-right: 8px;
      }
      div:nth-child(3) {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        padding: 5px;
        border: 1px solid #b3d8ff;
        color: #4791ff;
        border-radius: 4px;
        margin-right: 8px;
      }
      div:nth-child(4) {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        padding: 5px;
        border: 1px solid #b3d8ff;
        color: #4791ff;
        border-radius: 4px;
      }
    }
    .seckill_rob_table {
      .seckill_table_header {
        padding: 22px 0 12px 40px;
        display: flex;
        background: #f5f7fa;
        div {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #606266;
        }
        div:nth-child(1) {
          flex: 2;
        }
        div:nth-child(2) {
          flex: 2;
        }
        div:nth-child(3) {
          flex: 3;
        }
        div:nth-child(4) {
          flex: 3;
        }
        div:nth-child(5) {
          flex: 3;
        }
      }
      .seckill_table_list {
        margin-bottom: 33px;
        .seckill_table_li {
          padding-left: 36px;
          display: flex;
          height: 72px;
          align-items: center;
          border-bottom: 1px solid #ebeef5;
          .seckill_table_li_f {
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            color: #303133;
            flex: 2;
          }
          div:nth-child(2) {
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            color: #303133;
            flex: 2;
            display: flex;
            i {
              background: url("../../assets/homepage/蒙版组 256.png") no-repeat;
              display: block;
              background-size: 20px 20px;
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
          div:nth-child(3) {
            display: flex;
            flex: 3;
            i {
              background: url("../../assets/homepage/蒙版组 250@2x.png")
                no-repeat;
              display: block;
              background-size: 20px 20px;
              width: 20px;
              height: 20px;
            }
            span:nth-child(2) {
              display: block;
              font-size: 16px;
              font-weight: 500;
              line-height: 20px;
              color: #e95b5b;
              font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
              margin: 0 14px 0 10px;
            }
            span:nth-child(3) {
              display: block;
              font-size: 18px;
              font-weight: normal;
              line-height: 20px;
              color: #e95b5b;
              font-family: "d-din-bold", "Microsoft YaHei", Arial;
            }
          }
          div:nth-child(4) {
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            color: #909399;
            text-decoration: line-through;
            flex: 3;
          }
          div:nth-child(5) {
            flex: 3;
          }
          &:hover {
            background: #f5f7fa;
          }
        }
      }
      .seckill_table_bottom {
        display: flex;
        justify-content: space-between;
        .seckill_table_bottom_l {
          span {
            display: inline-block;
            font-size: 16px;
            font-weight: 400;
            line-height: 44px;
            color: #303133;
          }
          span:nth-child(2) {
            color: #909399;
          }
        }
        .seckill_table_bottom_r {
          span:nth-child(1) {
            font-size: 14px;
            line-height: 44px;
            margin-right: 25px;
            color: #666666;
            i {
              color: #ee424e;
            }
          }
          span:nth-child(2) {
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            color: #ffffff;
            background: #e95b5b;
            padding: 14px 33px;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background: #f56c6c;
            }
          }
        }
      }
    }
  }
  .seckill_service_charge {
    width: 1164px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    margin-bottom: 12px;
    padding: 25px 36px 41px 36px;
    .service_charge_title {
      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #303133;
      margin-bottom: 24px;
    }
    .service_box {
      .service_box_header {
        display: flex;
        padding: 22px 0 12px 36px;
        background: #f5f7fa;
        div {
          width: 132px;
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #606266;
        }
      }
      .service_box_list {
        .service_box_list_li {
          display: flex;
          border-bottom: 1px solid #ebeef5;
          padding: 20px 0 18px 36px;
          div {
            width: 132px;
            font-size: 16px;
            font-weight: 400;
            line-height: 17px;
            color: #606266;
            font-family: "D-DINxp", "Microsoft YaHei", Arial;
          }
          div:nth-child(1) {
            color: #303133;
            font-family: "SourceHanSansCN-Regular", "Microsoft YaHei", Arial;
          }
        }
      }
    }
  }
  .seckill_message {
    width: 1164px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 6px;

    padding: 28px 36px 40px 36px;

    .seckill_message_title {
      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #303133;
      margin-bottom: 24px;
    }
    .seckill_message_cont {
      border: 1px solid #ebeef5;
      display: flex;
      .seckill_message_cont_o {
        div {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #606266;
          padding: 25px 36px 25px 20px;
          background: #f5f7fa;
        }
        div:nth-child(1) {
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
        }
        div:nth-child(2) {
          border-right: 1px solid #ebeef5;
        }
      }
      .seckill_message_cont_t {
        div {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #303133;
          width: 358px;
          padding: 25px 0 25px 32px;
        }
        div:nth-child(1) {
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
        }
        div:nth-child(2) {
          border-right: 1px solid #ebeef5;
        }
      }
      .seckill_message_cont_h {
        font-size: 14px;
        padding: 57px 21px 56px;
        font-weight: 400;
        line-height: 14px;
        color: #606266;
        background: #f5f7fa;
        border-right: 1px solid #ebeef5;
      }
      .seckill_message_cont_f {
        padding: 28px 0 0 32px;
        div {
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