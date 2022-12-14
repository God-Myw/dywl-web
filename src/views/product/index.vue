<template>
  <div class="product">
    <div class="product_bg">
      <div class="voyagetime">
        <div class="voyagetime_title" v-if="activeName == 'first'">
          现舱秒杀
        </div>
        <div class="voyagetime_title" v-if="activeName == 'second'">
          现舱竞拍
        </div>
        <div class="voyagetime_title" v-if="activeName == 'third'">
          集装箱订舱
        </div>
        <div class="vouagetime_seach">
          <div class="home_search_input">
            <div class="search_input_launch">
              <i></i>
              <div class="search_input_recoin">
                <input
                  v-model="bookingStart"
                  type="text"
                  placeholder="请选择起始港"
                />
              </div>
            </div>
            <div class="search_input_arrows"><i></i></div>
            <div class="search_input_terminus">
              <i></i>
              <div class="search_input_recoin">
                <input
                  v-model="bookingEnd"
                  type="text"
                  placeholder="请选择目的港"
                />
              </div>
            </div>
            <div class="search_input_rectangle"></div>
            <div class="search_input_elapsedtime">
              <i></i>
              <div>运输日期</div>
            </div>
          </div>
          <div class="home_search_btn" @click="gohint">搜 索</div>
        </div>
      </div>
    </div>
    <div class="product_tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="全部" name="zero"></el-tab-pane> -->
        <el-tab-pane label="现舱秒杀" name="first"></el-tab-pane>
        <el-tab-pane label="现舱竞拍" name="second"></el-tab-pane>
        <el-tab-pane label="集装箱订舱" name="third"></el-tab-pane>
      </el-tabs>
      <!-- 现仓秒杀 -->
      <div v-if="activeName == 'first'" class="product_seckill">
        <ul v-loading="loading">
          <li v-for="item in seckillData" :key="item.guid">
            <div
              class="product_item_zero"
              @click="SeckillDetails(item.type, item.guid)"
            >
              <div class="product_item_one">
                <div class="product_item_one_start">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.startPortCn }}</div>
                    <div>{{ item.startPortEn }}</div>
                  </div>
                </div>
                <div class="product_item_one_end">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.endPortCn }}</div>
                    <div>{{ item.endPortEn }}</div>
                  </div>
                </div>
              </div>
              <div class="product_item_two">
                <div class="item_two_Closing">
                  <span>截关</span>
                  <span>{{ item.closingTimeWeek }}</span>
                  <span>{{ item.closingTime }}</span>
                </div>
                <div class="item_two_sail">
                  <span>开船</span>
                  <span>{{ item.sailingTimeWeek }}</span>
                  <span>{{ item.sailingTime }}</span>
                </div>
                <div class="item_two_voyage">
                  <span>航程</span>
                  <span>{{ item.voyage }}天</span>
                </div>
              </div>
              <div class="product_item_three">
                <div class="item_three_box">
                  <div></div>
                  <div>箱型</div>
                  <div>
                    <span v-for="ite in item.boxs" :key="ite.guid">
                      {{ ite.boxType }}</span
                    >
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 2">--</span>
                  </div>
                </div>
                <div class="item_three_seckill">
                  <div></div>
                  <div>秒杀价</div>
                  <div>
                    <span v-for="ite in item.boxs" :key="ite.guid">
                      <i v-if="ite.moneyType == 0">￥</i>
                      <i v-if="ite.moneyType == 1">$</i>
                      <i v-if="ite.moneyType == 2">€</i>{{ ite.teJia }}</span
                    >
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 2">--</span>
                  </div>
                </div>
                <div class="item_three_original">
                  <div>原价</div>
                  <div>
                    <span v-for="ite in item.boxs" :key="ite.guid">
                      <i v-if="ite.moneyType == 0">￥</i>
                      <i v-if="ite.moneyType == 1">$</i>
                      <i v-if="ite.moneyType == 2">€</i>{{ ite.yuanJia }}</span
                    >
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 1">--</span>
                    <span v-if="item.boxs.length == 2">--</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="product_item_four">
              <div class="item_four_top">
                <!-- <span @click="SeckillDetails(item.type, item.guid)"
                  >查看详情</span
                > -->
                <span @click="gohint">查看详情</span>
                <span
                  v-if="item.type == 2"
                  @click="gohint"
                  class="item_four_top_once"
                  >立即抢舱</span
                >
                <span
                  v-if="item.type == 1"
                  @click="gohint"
                  class="item_four_top_remind"
                  >提醒我</span
                >
              </div>
              <div v-if="item.type == 2" class="item_four_bottom">
                <span></span>
                <span>秒杀中</span>
                <span>距结束</span>
                <CountDownP :endDate="item.endTimeFormat"></CountDownP>
              </div>
              <div v-if="item.type == 1" class="item_four_bottom_foreshow">
                <span></span>
                <span>预告中</span>
                <span>{{ item.startTime }}</span>
                <span>开始</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 现舱竞拍 -->
      <div v-if="activeName == 'second'" class="product_auction">
        <ul v-loading="loading">
          <li v-for="item in newauctioData" :key="item.guid">
            <div class="product_item_zero">
              <div class="product_item_one">
                <div class="product_item_one_start">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.startPortCn }}</div>
                    <div>{{ item.startPortEn }}</div>
                  </div>
                </div>
                <div class="product_item_one_end">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.endPortCn }}</div>
                    <div>{{ item.endPortEn }}</div>
                  </div>
                </div>
              </div>
              <div class="product_item_two">
                <div class="item_two_Closing">
                  <span>截关</span>
                  <span>{{ item.closingTimeWeek }}</span>
                  <span>{{ item.closingTime }}</span>
                </div>
                <div class="item_two_sail">
                  <span>开船</span>
                  <span>{{ item.sailingTimeWeek }}</span>
                  <span>{{ item.sailingTime }}</span>
                </div>
                <div class="item_two_voyage">
                  <span>航程</span>
                  <span>{{ item.voyage }}天</span>
                </div>
              </div>
              <div class="product_item_three">
                <div class="item_three_box">
                  <span></span>
                  <span>箱型</span>
                  <span>{{ item.BoxType }}</span>
                  <span>数量 {{ item.boxSum }}</span>
                </div>
                <div class="item_three_present">
                  <span></span>
                  <span>当前价</span>
                  <span>
                    <i v-if="item.seaFreightType == 0">￥</i>
                    <i v-if="item.seaFreightType == 1">$</i>
                    <i v-if="item.seaFreightType == 2">€</i
                    >{{ item.currentPrice }}</span
                  >
                  <span>↑</span>
                </div>
                <div class="item_three_start">
                  <span>起拍价</span>
                  <span>
                    <i v-if="item.seaFreightType == 0">￥</i>
                    <i v-if="item.seaFreightType == 1">$</i>
                    <i v-if="item.seaFreightType == 2">€</i
                    >{{ item.seaFreight }}</span
                  >
                </div>
              </div>
            </div>
            <div class="product_item_four">
              <div class="item_four_top">
                <span @click="gohint">查看详情</span>
                <span @click="gohint" class="item_four_top_once">立即报名</span>
              </div>
              <div v-if="item.type == 1" class="item_four_bottom_foreshow">
                <span></span>
                <span>预告中</span>
                <span>{{ item.startTime }}</span>
                <span>开始</span>
              </div>
              <div v-if="item.type == 2" class="item_four_bottom">
                <span></span>
                <span>竞拍中</span>
                <span>距结束</span>
                <CountDownP :endDate="item.endTimeFormat"></CountDownP>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 集装箱订舱 -->
      <div v-if="activeName == 'third'" class="product_container">
        <ul v-loading="loading">
          <li v-for="item in bookingData" :key="item.guid">
            <div class="product_item_zero">
              <div class="product_item_one">
                <div class="product_item_one_start">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.startPortCn }}</div>
                    <div>{{ item.startPortEn }}</div>
                  </div>
                </div>
                <div class="product_item_one_end">
                  <i></i>
                  <div class="item_one_all_r">
                    <div>{{ item.endPortCn }}</div>
                    <div>{{ item.endPortEn }}</div>
                  </div>
                </div>
              </div>
              <div class="product_item_two">
                <div class="item_two_Closing">
                  <span>截关</span>
                  <span>{{ item.closingTimeWeek }}</span>
                  <span>{{ item.closingTimeString }}</span>
                </div>
                <div class="item_two_sail">
                  <span>开船</span>
                  <span>{{ item.sailingTimeWeek }}</span>
                  <span>{{ item.sailingTimeString }}</span>
                </div>
                <div class="item_two_voyage">
                  <span>航程</span>
                  <span>{{ item.voyage }}天</span>
                </div>
              </div>
              <div class="product_item_three">
                <div class="item_three_box">
                  <div></div>
                  <div>箱型</div>
                  <div>
                    <span>20GP</span>
                    <span>40GP</span>
                    <span>40HQ</span>
                  </div>
                </div>
                <div class="item_three_seckill">
                  <div></div>
                  <div>限时价</div>
                  <div>
                    <span v-if="item.haiyunTwentyGpTejia">{{
                      item.haiyunTwentyGpTejia
                    }}</span>
                    <span v-else>--</span>
                    <span v-if="item.haiyunFortyGpTejia">{{
                      item.haiyunFortyGpTejia
                    }}</span>
                    <span v-else>--</span>
                    <span v-if="item.haiyunFortyHqTejia">{{
                      item.haiyunFortyHqTejia
                    }}</span>
                    <span v-else>--</span>
                  </div>
                </div>
                <div class="item_three_original">
                  <div>原价</div>
                  <div>
                    <span v-if="item.haiyunTwentyGpYuanjia">{{
                      item.haiyunTwentyGpYuanjia
                    }}</span>
                    <span v-else>--</span>
                    <span v-if="item.haiyunFortyGpYuanjia">{{
                      item.haiyunFortyGpYuanjia
                    }}</span>
                    <span v-else>--</span>
                    <span v-if="item.haiyunFortyHqYuanjia">{{
                      item.haiyunFortyHqYuanjia
                    }}</span>
                    <span v-else>--</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="product_item_four">
              <div class="item_four_top">
                <span @click="gohint">查看详情</span>
                <span @click="gohint" class="item_four_top_once">立即抢舱</span>
              </div>
              <div class="item_four_bottom">
                <span v-for="(itm, idx) in item.lables">{{ itm }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="productBtn" class="product_btn" @click="addContainerList">
      <span>查看更多</span>
    </div>
    <div v-else class="product_zw">已加载全部内容</div>
    <Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
  </div>
</template>
<script>
import CountDownP from "../../components/countDown_product.vue";
import {
  getContainerSpikeList,
  getAuctionCustomerList,
  getShipBookingList,
} from "../../api/activity.js";
import Hint from "../../components/hint.vue";
export default {
  data() {
    return {
      loading: false,
      hintStutas: false,
      bookingStart: "",
      bookingEnd: "",
      activeName: "first",
      seckillData: [],
      auctioData: [],
      bookingData: [],
      productBtn: true,
      pagedata: {
        currentPage: 1,
        pageSize: 10,
      },
      firstpageSize: 10,
      secondpageSize: 10,
      thirdpageSize: 10,
    };
  },
  components: {
    CountDownP,
    Hint,
  },
  mounted() {
    if (this.$route.query.active) {
      this.activeName = this.$route.query.active;
    } else {
      this.activeName = this.$route.query.active;
      // this.activeName = "zero";
    }
    this.nowContainer();
  },
  watch: {
    $route(to, from) {
      this.activeName = to.query.active;
      this.nowContainer();
    },
  },
  computed: {
    newauctioData() {
      return this.auctioData.filter((item) => {
        return item.type != 0; //返回type==0的项，添加到newauctioData数组
      });
    },
  },
  methods: {
    dighintStutas(stats) {
      this.hintStutas = stats;
    },
    gohint() {
      this.hintStutas = true;
    },
    handleClick(tab) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.active = this.activeName;
      this.$router.push({ path: this.$route.path, query });
    },
    nowContainer() {
      this.firstpageSize = 10;
      this.secondpageSize = 10;
      this.thirdpageSize = 10;
      this.productBtn = true;
      switch (this.activeName) {
        case "first":
          this.containerseckill();
          break;
        case "second":
          this.containerauctio();
          break;
        case "third":
          this.containerbooking();
          break;
      }
    },
    containerseckill() {
      this.loading = true;
      getContainerSpikeList(this.pagedata).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.seckillData = res.data.result;
        } else {
          this.seckillData = [];
        }
      });
    },
    containerauctio() {
      this.loading = true;
      getAuctionCustomerList(this.pagedata).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.auctioData = res.data.result;
        } else {
          this.auctioData = [];
        }
      });
    },
    containerbooking() {
      this.loading = true;
      getShipBookingList().then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.bookingData = res.data.shipBookings.slice(0, 10);
        } else {
          this.bookingData = [];
        }
      });
    },
    addcontainerseckill() {
      let SpikeList = {
        currentPage: 1,
        pageSize: this.firstpageSize,
      };
      this.loading = true;
      getContainerSpikeList(SpikeList).then((res) => {
        if (res.code == "0000") {
          this.loading = false;
          this.seckillData = res.data.result;
          if (res.data.total <= this.firstpageSize) {
            this.productBtn = false;
          }
        } else {
          this.seckillData = [];
        }
      });
    },
    addcontainerauctio() {
      let SpikeList = {
        currentPage: 1,
        pageSize: this.secondpageSize,
      };
      this.loading = true;
      getAuctionCustomerList(SpikeList).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.auctioData = res.data.result;
          if (res.data.total <= this.secondpageSize) {
            this.productBtn = false;
          }
        } else {
          this.auctioData = [];
        }
      });
    },
    addcontainerbooking() {
      this.loading = true;
      getShipBookingList().then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.bookingData = res.data.shipBookings.slice(0, this.thirdpageSize);
          if (res.data.shipBookings.length <= this.thirdpageSize) {
            this.productBtn = false;
          }
        } else {
          this.bookingData = [];
        }
      });
    },
    // 秒杀详情
    SeckillDetails(id, guid) {
      // if (id == 2) {
      //   this.$router.push({
      //     path: "/product/seckillDet",
      //     query: { guid: guid },
      //   });
      // } else if (id == 1) {
      //   this.$router.push({
      //     path: "/product/foreshow",
      //     query: { guid: guid },
      //   });
      // }
    },
    // 查看更多
    addContainerList() {
      switch (this.activeName) {
        case "first":
          this.firstpageSize += 8;
          this.addcontainerseckill();
          break;
        case "second":
          this.secondpageSize += 8;
          this.addcontainerauctio();
          break;
        case "third":
          this.thirdpageSize += 8;
          this.addcontainerbooking();
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  .product_bg {
    background: url("../../assets/seckill/组 8492.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 164px;
    margin-bottom: 90px;
    .voyagetime {
      width: 1164px;
      margin: 0 auto;
      .voyagetime_title {
        padding: 48px 0 28px 0;
        font-size: 28px;
        font-weight: 400;
        line-height: 28px;
        color: #ffffff;
      }
      .vouagetime_seach {
        width: 1164px;
        height: 98px;
        backdrop-filter: blur(25px);
        background: rgba(250, 250, 250, 0.3);
        border-radius: 4px;
        padding: 21px 32px;
        box-sizing: border-box;
        display: flex;
        .home_search_input {
          width: 856px;
          height: 56px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 6px 0px 0px 6px;
          display: flex;
          align-items: center;
          .search_input_launch {
            display: flex;
            .search_input_recoin {
              input {
                width: 80px;
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                color: #909399;
                border: none;
                padding: 0;
              }
              input::-webkit-input-placeholder {
                color: #909399;
              }
              input:-moz-placeholder {
                /* FF 4-18 */
                color: #909399;
              }
              input::-moz-placeholder {
                /* FF 19+ */
                color: #909399;
              }
              input:focus {
                color: #909399;
                outline: none;
                background-color: transparent;
              }
            }
            i {
              width: 24px;
              height: 24px;
              margin: 0 10px 0 24px;
              background: url("../../assets/seckill/蒙版组 294@2x.png")
                no-repeat;
              background-size: cover;
              display: inline-block;
            }
          }
          .search_input_arrows {
            margin-left: 78px;
            padding: 7px 4px 7px 8px;
            i {
              width: 52px;
              height: 6px;
              display: block;
              background: url("../../assets/homepage/组 3785.png") no-repeat;
              background-size: cover;
            }
          }
          .search_input_terminus {
            display: flex;
            margin-left: 38px;
            // 处理input框
            .search_input_recoin {
              input {
                width: 80px;
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                color: #909399;
                border: none;
                padding: 0;
              }
              input::-webkit-input-placeholder {
                color: #909399;
              }
              input:-moz-placeholder {
                /* FF 4-18 */
                color: #909399;
              }
              input::-moz-placeholder {
                /* FF 19+ */
                color: #909399;
              }
              input:focus {
                color: #909399;
                outline: none;
                background-color: transparent;
              }
            }
            i {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              background: url("../../assets/seckill/蒙版组 293@2x.png")
                no-repeat;
              background-size: cover;
              display: inline-block;
            }
          }
          .search_input_rectangle {
            width: 1px;
            height: 44px;
            background: #e2e2e2;
            margin: 0 68px 0 113px;
          }
          .search_input_elapsedtime {
            display: flex;
            div {
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              color: #909399;
              cursor: pointer;
            }
            i {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              background: url("../../assets/seckill/组 7895@2x.png") no-repeat;
              background-size: cover;
              display: inline-block;
            }
          }
        }
        .home_search_btn {
          background: #4791ff;
          border-radius: 0px 6px 6px 0px;
          padding: 18px 46px;
          font-size: 20px;
          font-weight: 400;
          line-height: 20px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
  .product_tabs {
    width: 1164px;
    margin: 0 auto;
    .product_seckill {
      margin-bottom: 50px;
      ul {
        li {
          width: 1164px;
          height: 140px;
          margin-top: 12px;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid #ebeef5;
          box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          padding: 0 34px;
          .product_item_zero {
            display: flex;
            cursor: pointer;
            .product_item_one {
              margin: 31px 12px 0 0;
              .product_item_one_start {
                display: flex;
                margin-bottom: 10px;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 179@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
              .product_item_one_end {
                display: flex;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 180@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
            }
            .product_item_two {
              margin: 31px 0 0 0;
              .item_two_Closing {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_sail {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_voyage {
                display: flex;
                span {
                  display: block;
                  font-size: 14px;
                  line-height: 14px;
                  height: 14px;
                  font-weight: 400;
                  color: #606266;
                  margin-right: 8px;
                }
              }
            }
            .product_item_three {
              margin: 31px 0 0 87px;
              .item_three_box {
                display: flex;
                margin-bottom: 12px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 256@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div:nth-child(2) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 20px;
                  color: #303133;
                }
                div:nth-child(3) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    font-size: 16px;
                    line-height: 20px;
                    margin-right: 16px;
                    color: #303133;
                  }
                }
              }
              .item_three_seckill {
                display: flex;
                margin-bottom: 13px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 250@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div:nth-child(2) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 20px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                  color: #e95b5b;
                }
                div:nth-child(3) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    font-size: 18px;
                    line-height: 20px;
                    color: #e95b5b;
                    margin-right: 16px;
                    font-family: "d-din-bold", "Microsoft YaHei", Arial;
                  }
                }
              }
              .item_three_original {
                display: flex;
                margin: 0 0 0 30px;
                div:nth-child(1) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 16px;
                  color: #909399;
                }
                div:nth-child(2) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    line-height: 16px;
                    margin-right: 16px;
                    color: #909399;
                    font-family: "d-din", "Microsoft YaHei", Arial;
                    font-size: 16px;
                    font-weight: 400;
                    text-decoration: line-through;
                  }
                }
              }
            }
          }
          .product_item_four {
            margin: 40px 0 0 0;
            .item_four_top {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 20px;
              span {
                display: block;
                background: #ffffff;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #606266;
                padding: 10px 20px;
                cursor: pointer;
              }
              .item_four_top_once {
                background: #e95b5b;
                border: 1px solid #e95b5b;
                cursor: pointer;
                color: #ffffff;
                margin-left: 12px;
              }
              .item_four_top_remind {
                background: #4791ff;
                color: #ffffff;
                margin-left: 12px;
                padding: 10px 27px;
              }
            }
            .item_four_bottom {
              display: flex;
              justify-content: flex-end;
              span {
                display: block;
              }
              span:nth-child(1) {
                flex-shrink: 0;
                width: 14px;
                height: 14px;
                background: url("../../assets/homepage/蒙版组 284@2x.png")
                  no-repeat;
                background-size: cover;
              }
              span:nth-child(2) {
                margin: 0 10px 0 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #e95b5b;
              }
              span:nth-child(3) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 4px;
              }
            }
            .item_four_bottom_foreshow {
              display: flex;
              justify-content: flex-end;
              span {
                display: block;
              }
              span:nth-child(1) {
                flex-shrink: 0;
                width: 14px;
                height: 14px;
                background: url("../../assets/homepage/蒙版组 259@2x.png")
                  no-repeat;
                background-size: cover;
              }
              span:nth-child(2) {
                margin: 0 12px 0 5px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #4791ff;
              }
              span:nth-child(3) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #4791ff;
              }
              span:nth-child(4) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-left: 8px;
              }
            }
          }
        }
      }
    }
    .product_auction {
      margin-bottom: 50px;
      ul {
        li {
          width: 1164px;
          height: 140px;
          margin-top: 12px;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid #ebeef5;
          box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          padding: 0 34px;
          .product_item_zero {
            display: flex;
            cursor: pointer;
            .product_item_one {
              margin: 31px 12px 0 0;
              .product_item_one_start {
                display: flex;
                margin-bottom: 10px;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 179@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
              .product_item_one_end {
                display: flex;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 180@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
            }
            .product_item_two {
              margin: 31px 0 0 0;
              .item_two_Closing {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_sail {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_voyage {
                display: flex;
                span {
                  display: block;
                  font-size: 14px;
                  line-height: 14px;
                  height: 14px;
                  font-weight: 400;
                  color: #606266;
                  margin-right: 8px;
                }
              }
            }
            .product_item_three {
              margin: 30px 0 0 87px;
              .item_three_box {
                display: flex;
                margin-bottom: 12px;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 256@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 20px;
                  width: 48px;
                  color: #303133;
                }
                span:nth-child(3) {
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 20px;
                  color: #303133;
                  width: 72px;
                  margin: 0 0 0 28px;
                }
                span:nth-child(4) {
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 20px;
                  color: #4791ff;
                }
              }
              .item_three_present {
                display: flex;
                margin-bottom: 13px;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 201@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  font-weight: 500;
                  line-height: 20px;
                  width: 48px;
                  color: #ff6851;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 18px;
                  line-height: 20px;
                  color: #ff6851;
                  width: 72px;
                  margin: 0 0 0 28px;

                  font-family: "d-din-bold", "Microsoft YaHei", Arial;
                }
                span:nth-child(4) {
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 16px;
                  color: #ff6851;
                }
              }
              .item_three_start {
                display: flex;
                margin-left: 30px;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 16px;
                  font-weight: 500;
                  line-height: 20px;
                  color: #909399;
                  width: 48px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(2) {
                  font-size: 18px;
                  line-height: 20px;
                  color: #909399;
                  margin: 0 0 0 28px;
                  width: 72px;
                  font-family: "d-din-bold", "Microsoft YaHei", Arial;
                }
              }
            }
          }
          .product_item_four {
            margin: 40px 0 0 0;
            .item_four_top {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 20px;
              span {
                display: block;
                background: #ffffff;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #606266;
                padding: 10px 20px;
                cursor: pointer;
              }
              .item_four_top_once {
                background: #ff6851;
                border: 1px solid #ff6851;
                color: #ffffff;
                margin-left: 12px;
                cursor: pointer;
              }
              .item_four_top_remind {
                background: #4791ff;
                color: #ffffff;
                margin-left: 12px;
                padding: 10px 27px;
              }
            }
            .item_four_bottom {
              display: flex;
              justify-content: flex-end;
              span {
                display: block;
              }
              span:nth-child(1) {
                flex-shrink: 0;
                width: 14px;
                height: 14px;
                background: url("../../assets/homepage/蒙版组 284@2x.png")
                  no-repeat;
                background-size: cover;
                margin-left: 16px;
              }
              span:nth-child(2) {
                margin: 0 10px 0 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #e95b5b;
              }
              span:nth-child(3) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-right: 4px;
              }
            }
            .item_four_bottom_foreshow {
              display: flex;
              justify-content: flex-end;
              span {
                display: block;
              }
              span:nth-child(1) {
                flex-shrink: 0;
                width: 14px;
                height: 14px;
                background: url("../../assets/homepage/蒙版组 259@2x.png")
                  no-repeat;
                background-size: cover;
              }
              span:nth-child(2) {
                margin: 0 12px 0 5px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #4791ff;
              }
              span:nth-child(3) {
                font-size: 14px;
                font-weight: 400;
                line-height: 15px;
                color: #4791ff;
              }
              span:nth-child(4) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #909399;
                margin-left: 8px;
              }
            }
          }
        }
      }
    }
    .product_container {
      margin-bottom: 50px;
      ul {
        li {
          width: 1164px;
          height: 140px;
          margin-top: 12px;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid #ebeef5;
          box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          padding: 0 34px;
          .product_item_zero {
            display: flex;
            cursor: pointer;
            .product_item_one {
              margin: 31px 12px 0 0;
              .product_item_one_start {
                display: flex;
                margin-bottom: 10px;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 179@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
              .product_item_one_end {
                display: flex;
                i {
                  display: block;
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 180@2x (1).png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                .item_one_all_r {
                  div {
                    width: 164px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                      Arial;
                    font-size: 18px;
                    line-height: 18px;
                    color: #303133;
                    margin-bottom: 4px;
                  }
                  div:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #909399;
                  }
                }
              }
            }
            .product_item_two {
              margin: 31px 0 0 0;
              .item_two_Closing {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_sail {
                margin-bottom: 16px;
                display: flex;
                span {
                  display: block;
                }
                span:nth-child(1) {
                  font-size: 14px;
                  font-weight: 400;
                  color: #909399;
                  line-height: 14px;
                  padding-top: 2px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #303030;
                  margin: 0 6px 0 8px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                }
                span:nth-child(3) {
                  font-size: 14px;
                  line-height: 14px;
                  padding-top: 2px;
                  font-weight: 400;
                  color: #303133;
                }
              }
              .item_two_voyage {
                display: flex;
                span {
                  display: block;
                  font-size: 14px;
                  line-height: 14px;
                  height: 14px;
                  font-weight: 400;
                  color: #606266;
                  margin-right: 8px;
                }
              }
            }
            .product_item_three {
              margin: 31px 0 0 87px;
              .item_three_box {
                display: flex;
                margin-bottom: 12px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 256@2x.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div:nth-child(2) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 20px;
                  color: #303133;
                }
                div:nth-child(3) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    font-size: 16px;
                    line-height: 20px;
                    margin-right: 16px;
                    color: #303133;
                  }
                }
              }
              .item_three_seckill {
                display: flex;
                margin-bottom: 13px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/homepage/蒙版组 74.png")
                    no-repeat;
                  background-size: cover;
                  margin-right: 10px;
                }
                div:nth-child(2) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 20px;
                  font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                    Arial;
                  color: #ff7c41;
                }
                div:nth-child(3) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    font-size: 18px;
                    line-height: 20px;
                    color: #ff7c41;
                    margin-right: 16px;
                    font-family: "d-din-bold", "Microsoft YaHei", Arial;
                  }
                }
              }
              .item_three_original {
                display: flex;
                margin: 0 0 0 30px;
                div:nth-child(1) {
                  font-size: 16px;
                  width: 48px;
                  margin-right: 28px;
                  font-weight: 400;
                  line-height: 16px;
                  color: #909399;
                }
                div:nth-child(2) {
                  display: flex;
                  span {
                    text-align: center;
                    display: block;
                    width: 72px;
                    line-height: 16px;
                    margin-right: 16px;
                    color: #909399;
                    font-family: "d-din", "Microsoft YaHei", Arial;
                    font-size: 16px;
                    font-weight: 400;
                    text-decoration: line-through;
                  }
                }
              }
            }
          }
          .product_item_four {
            margin: 40px 0 0 0;
            .item_four_top {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 20px;
              span {
                display: block;
                background: #ffffff;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #606266;
                padding: 10px 20px;
                cursor: pointer;
              }
              .item_four_top_once {
                background: #ff7c41;
                border: 1px solid #ff7c41;
                color: #ffffff;
                margin-left: 12px;
                cursor: pointer;
              }
            }
            .item_four_bottom {
              display: flex;
              justify-content: flex-end;
              span {
                margin-left: 8px;
                display: block;
                border: 1px solid #91c1ff;
                font-size: 12px;
                font-weight: 400;
                line-height: 12px;
                color: #4791ff;
                border-radius: 4px;
                padding: 3px 4px;
              }
            }
          }
        }
      }
    }
  }
  .product_btn {
    width: 1164px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 80px;
    span {
      display: inline-block;
      border: 1px solid #4791ff;
      border-radius: 6px;
      color: #4791ff;
      font-size: 16px;
      line-height: 16px;
      font-weight: 400;
      padding: 13px 157px;
      cursor: pointer;
      &:hover {
        background: #4791ff;
        color: #fff;
      }
    }
  }
  .product_zw {
    width: 1164px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 80px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #909399;
  }
}
/deep/ .el-loading-spinner {
  top: 15%;
}

/deep/.el-tabs__item {
  font-size: 16px;
  padding: 0 33px;
  color: #606266;
}
/deep/.el-tabs__item:hover {
  color: #3b7cfb;
}
/deep/.el-tabs__item.is-active {
  color: #3b7cfb;
}
/deep/.el-tabs__active-bar {
  background: #3b7cfb;
}

/deep/ .el-tabs__nav {
  margin-left: 20px;
}
</style>
