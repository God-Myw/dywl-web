<template>
  <div class="product">
    <div class="product_bg">
      <div class="voyagetime">
        <div class="voyagetime_title" v-if="activeName == 'internal'">
          国内航次
        </div>
        <div class="voyagetime_title" v-else>国际航次</div>
        <div class="vouagetime_seach">
          <div class="home_search_input">
            <div class="search_input_launch">
              <i></i>
              <div class="search_input_recoin">
                <input
                  v-model="bookingStart"
                  type="text"
                  placeholder="从哪里起运"
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
                  placeholder="货到哪里去"
                />
              </div>
            </div>
            <div class="search_input_rectangle"></div>
            <div class="search_input_elapsedtime">
              <i></i>
              <div>起运时间</div>
            </div>
          </div>
          <div class="home_search_btn" @click="gohint">搜 索</div>
        </div>
      </div>
    </div>
    <div class="product_tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="国际航次" name="foreign"></el-tab-pane>
        <el-tab-pane label="国内航次" name="internal"></el-tab-pane>
      </el-tabs>
      <!-- 国际航次 -->
      <div v-if="activeName == 'foreign'" class="product_international">
        <ul v-loading="loading">
          <li v-for="item in forVoyageData" :key="item.guid">
            <div class="inter_item">
              <div class="inter_header">
                <div class="inter_header_l">{{ item.voyageLineName }}</div>
                <div class="inter_header_r">
                  <span></span>
                  <span>{{ item.expectEndDate | renderTimeY }}</span>
                </div>
              </div>
              <div class="inter_list">
                <div class="inter_list_left">
                  <div class="inter_list_z">
                    <div>
                      <span>ETA</span>
                      <span>{{ item.expectStartDate | renderTime }}</span>
                    </div>
                    <div>
                      <span>ETD</span>
                      <span>{{ item.expectEndDate | renderTime }}</span>
                    </div>
                  </div>
                  <div class="inter_list_f"></div>
                  <div class="inter_list_se">
                    <div>
                      <span></span>
                      <span v-if="item.voyageLine.length > 0">{{
                        item.voyageLine[0].titleCN
                      }}</span>
                    </div>
                    <div>
                      <span></span>
                      <span v-if="item.voyageLine.length > 0">
                        <i
                          class="voyageend"
                          v-for="(ite, idx) in item.voyageLine"
                          :key="idx"
                          >{{ ite.titleCN }}<i class="oyagenum">、</i></i
                        ></span
                      >
                    </div>
                  </div>
                  <div class="inter_list_t">
                    <div>船舶类型</div>
                    <div>{{ item.titleCn }}</div>
                  </div>
                  <div class="inter_list_o">
                    <div>可接受吨位</div>
                    <div v-if="item.acceptTon">{{ item.acceptTon }}吨</div>
                    <div v-else>--</div>
                  </div>
                  <div class="inter_list_s">
                    <div>可接受体积</div>
                    <div v-if="item.acceptCapacity">
                      {{ item.acceptCapacity }}m³
                    </div>
                    <div v-else>--</div>
                  </div>
                </div>
                <div class="inter_list_e" @click="toDetvoforeign()">
                  <div @click="gohint">查看详情</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 国内航次 -->
      <div v-if="activeName == 'internal'" class="product_domestic">
        <ul v-loading="loading">
          <li v-for="item in intVoyageData" :key="item.guid">
            <div class="inter_item">
              <div class="inter_header">
                <div class="inter_header_l"></div>
                <div class="inter_header_r">
                  <span></span>
                  <span>{{ item.expectEndDate | renderTimeY }}</span>
                </div>
              </div>
              <div class="inter_list">
                <div class="inter_list_left">
                  <div class="inter_list_z">
                    <div>
                      <span>空船</span>
                      <span>{{ item.expectStartDate | renderTime }}</span>
                    </div>
                    <div>
                      <span>日期</span>
                      <span>{{ item.expectEndDate | renderTime }}</span>
                    </div>
                  </div>
                  <div class="inter_list_f"></div>
                  <div class="inter_list_se">
                    <div>
                      <span></span>
                      <span>{{ item.voyageLine[0].titleCN }}</span>
                    </div>
                    <div>
                      <span></span>

                      <span v-if="item.voyageLine.length == 1">待定</span>
                      <span v-else>
                        <i
                          class="voyageend"
                          v-for="(ite, idx) in item.voyageLine"
                          :key="idx"
                          >{{ ite.titleCN }} <i class="oyagenum">、</i></i
                        >
                      </span>
                    </div>
                  </div>
                  <div class="inter_list_t">
                    <div>船舶类型</div>
                    <div>{{ item.titleCn }}</div>
                  </div>
                  <div class="inter_list_o">
                    <div>载重吨</div>
                    <div>{{ item.acceptTon }}吨</div>
                  </div>
                </div>
                <div class="inter_list_e" @click="toDetvointernal()">
                  <div @click="gohint">查看详情</div>
                </div>
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
import { getVoyageListByWeb } from "../../../api/pallet";
import Hint from "../../../components/hint.vue";
export default {
  data() {
    return {
      loading: false,
      hintStutas: false,
      bookingStart: "",
      bookingEnd: "",
      activeName: "foreign",
      forVoyageData: [],
      intVoyageData: [],
      productBtn: true,
      pagedata: {
        currentPage: 1,
        pageSize: 10,
      },
      foreignpageSize: 10,
      internalpageSize: 10,
    };
  },
  components: {
    Hint,
  },
  mounted() {
    this.activeName = this.$route.query.active;
    this.nowvoyagetime();
  },
  watch: {
    $route(to, from) {
      this.activeName = to.query.active;
      this.nowvoyagetime();
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
    nowvoyagetime() {
      this.foreignpageSize = 10;
      this.internalpageSize = 10;
      this.productBtn = true;
      switch (this.activeName) {
        case "foreign":
          this.getVoyagefor();
          break;
        case "internal":
          this.getVoyageint();
          break;
      }
    },
    // 国际航次
    getVoyagefor() {
      this.loading = true;
      let voyageint = Object.assign(
        {
          keyword: "",
          internationalTransport: 1,
        },
        this.pagedata
      );
      getVoyageListByWeb(voyageint).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.forVoyageData = res.data.voyages.records;
        } else {
          this.forVoyageData = [];
        }
      });
    },
    getVoyageint() {
      let voyageint = Object.assign(
        {
          keyword: "",
          internationalTransport: 0,
        },
        this.pagedata
      );
      this.loading = true;
      getVoyageListByWeb(voyageint).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.intVoyageData = res.data.voyages.records;
        } else {
          this.intVoyageData = [];
        }
      });
    },
    // 查看更多
    addContainerList() {
      switch (this.activeName) {
        case "foreign":
          this.foreignpageSize += 8;
          this.addgetVoyagefor();
          break;
        case "internal":
          this.internalpageSize += 8;
          this.addgetVoyageint();
          break;
      }
    },
    addgetVoyagefor() {
      let Palletforeign = {
        keyword: "",
        internationalTransport: 1,
        currentPage: 1,
        pageSize: this.foreignpageSize,
      };
      this.loading = true;
      getVoyageListByWeb(Palletforeign).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.forVoyageData = res.data.voyages.records;
          if (res.data.voyages.total <= this.foreignpageSize) {
            this.productBtn = false;
          }
        } else {
          this.forVoyageData = [];
        }
      });
    },
    addgetVoyageint() {
      let Palletforeign = {
        keyword: "",
        internationalTransport: 0,
        currentPage: 1,
        pageSize: this.internalpageSize,
      };
      this.loading = true;
      getVoyageListByWeb(Palletforeign).then((res) => {
        this.loading = false;
        if (res.code == "0000") {
          this.intVoyageData = res.data.voyages.records;
          if (res.data.voyages.total <= this.internalpageSize) {
            this.productBtn = false;
          }
        } else {
          this.intVoyageData = [];
        }
      });
    },
    // 国内航次详情
    toDetvointernal() {
      // this.$router.push({
      //   path: "/details/voyagetime/internal",
      //   query: { id: 1 },
      // });
    },
    // 国际航次详情
    toDetvoforeign() {
      // this.$router.push({
      //   path: "/details/voyagetime/foreign",
      //   query: { id: 1 },
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  .product_bg {
    background: url("../../../assets/seckill/组 8492.png") no-repeat;
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
              background: url("../../../assets/seckill/蒙版组 294@2x.png")
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
              background: url("../../../assets/homepage/组 3785.png") no-repeat;
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
              background: url("../../../assets/seckill/蒙版组 293@2x.png")
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
              background: url("../../../assets/seckill/蒙版组 297@2x.png")
                no-repeat;
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
    .product_international {
      margin-bottom: 50px;
      ul {
        li {
          box-sizing: border-box;
          border: 1px solid #ebeef5;
          box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
          border-radius: 6px;
          margin-top: 12px;
          .inter_item {
            .inter_header {
              background: #f5f9ff;
              border-bottom: 1px solid #ebeef5;
              border-radius: 5px 5px 0px 0px;
              display: flex;
              justify-content: space-between;
              .inter_header_l {
                padding: 16px 0 9px 34px;
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #303133;
              }
              .inter_header_r {
                padding: 18px 34px 7px 0;
                display: flex;
                span:nth-child(1) {
                  display: block;
                  background: url("../../../assets/voyagetime/4042@2x.png")
                    no-repeat;
                  background-size: 14px 14px;
                  width: 14px;
                  height: 14px;
                  margin-right: 6px;
                }
                span:nth-child(2) {
                  display: block;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 14px;
                  color: #909399;
                }
              }
            }
            .inter_list {
              display: flex;
              justify-content: space-between;
              .inter_list_left {
                display: flex;
                cursor: pointer;
                .inter_list_z {
                  padding: 20px 36px 32px 34px;
                  div:nth-child(1) {
                    display: flex;
                    margin-bottom: 16px;
                    span {
                      display: block;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 16px;
                    }
                    span:nth-child(1) {
                      color: #909399;
                      margin-right: 20px;
                    }
                    span:nth-child(2) {
                      color: #303133;
                    }
                  }
                  div:nth-child(2) {
                    display: flex;
                    span {
                      display: block;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 16px;
                    }
                    span:nth-child(1) {
                      color: #909399;
                      margin-right: 20px;
                    }
                    span:nth-child(2) {
                      color: #303133;
                    }
                  }
                }
                .inter_list_f {
                  width: 1px;
                  height: 44px;
                  background: #e4e7ed;
                  margin: 25px 0 31px;
                }
                .inter_list_se {
                  padding: 20px 0 28px 36px;
                  div:nth-child(1) {
                    display: flex;
                    margin-bottom: 12px;
                    span {
                      display: block;
                    }
                    span:nth-child(1) {
                      background: url("../../../assets/homepage/蒙版组 179@2x.png")
                        no-repeat;
                      background-size: 20px 20px;
                      width: 20px;
                      height: 20px;
                      margin-right: 12px;
                    }
                    span:nth-child(2) {
                      font-size: 18px;
                      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                        Arial;
                      font-weight: 500;
                      line-height: 20px;
                      color: #303133;
                      width: 270px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                  }
                  div:nth-child(2) {
                    display: flex;
                    span {
                      display: block;
                    }
                    span:nth-child(1) {
                      background: url("../../../assets/voyagetime/蒙版组 180@2x.png")
                        no-repeat;

                      background-size: 20px 20px;
                      width: 20px;
                      height: 20px;
                      margin-right: 12px;
                    }
                    span:nth-child(2) {
                      font-size: 18px;
                      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                        Arial;
                      font-weight: 500;
                      line-height: 20px;
                      color: #303133;
                      width: 270px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      .voyageend:nth-child(1) {
                        display: none;
                      }
                      .voyageend:last-child {
                        .oyagenum {
                          display: none;
                        }
                      }
                    }
                  }
                }
                .inter_list_t {
                  padding: 23px 24px 29px 38px;
                  div {
                    width: 128px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #909399;
                    margin-bottom: 18px;
                  }
                  div:nth-child(2) {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #303133;
                  }
                }
                .inter_list_o {
                  padding: 23px 24px 29px 0;
                  div {
                    width: 128px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #909399;
                    margin-bottom: 18px;
                  }
                  div:nth-child(2) {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #303133;
                  }
                }
                .inter_list_s {
                  padding: 23px 0 29px 0;
                  div {
                    width: 128px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #909399;
                    margin-bottom: 18px;
                  }
                  div:nth-child(2) {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #303133;
                  }
                }
              }
              .inter_list_e {
                background: #4791ff;
                border-radius: 4px;
                height: 36px;
                margin: 27px 34px 37px 0;
                div {
                  padding: 11px 21px;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 14px;
                  color: #ffffff;
                  cursor: pointer;
                  &:hover {
                    background: #3db4f2;
                  }
                }
              }
            }
          }
        }
      }
    }
    .product_domestic {
      margin-bottom: 50px;
      ul {
        li {
          box-sizing: border-box;
          border: 1px solid #ebeef5;
          box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
          border-radius: 6px;
          margin-top: 12px;
          .inter_item {
            .inter_header {
              background: #f5fdff;
              border-bottom: 1px solid #ebeef5;
              border-radius: 5px 5px 0px 0px;
              display: flex;
              justify-content: space-between;
              .inter_header_r {
                padding: 18px 34px 7px 0;
                display: flex;
                span:nth-child(1) {
                  display: block;
                  background: url("../../../assets/voyagetime/4042@2x.png")
                    no-repeat;
                  background-size: 14px 14px;
                  width: 14px;
                  height: 14px;
                  margin-right: 6px;
                }
                span:nth-child(2) {
                  display: block;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 14px;
                  color: #909399;
                }
              }
            }
            .inter_list {
              display: flex;
              justify-content: space-between;
              .inter_list_left {
                display: flex;
                cursor: pointer;
                .inter_list_z {
                  padding: 20px 36px 32px 34px;
                  div:nth-child(1) {
                    display: flex;
                    margin-bottom: 16px;
                    span {
                      display: block;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 16px;
                    }
                    span:nth-child(1) {
                      color: #909399;
                      margin-right: 20px;
                    }
                    span:nth-child(2) {
                      color: #303133;
                    }
                  }
                  div:nth-child(2) {
                    display: flex;
                    span {
                      display: block;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 16px;
                    }
                    span:nth-child(1) {
                      color: #909399;
                      margin-right: 20px;
                    }
                    span:nth-child(2) {
                      color: #303133;
                    }
                  }
                }
                .inter_list_f {
                  width: 1px;
                  height: 44px;
                  background: #e4e7ed;
                  margin: 25px 0 31px;
                }
                .inter_list_se {
                  padding: 20px 0 28px 36px;
                  div:nth-child(1) {
                    display: flex;
                    margin-bottom: 12px;
                    span {
                      display: block;
                    }
                    span:nth-child(1) {
                      background: url("../../../assets/voyagetime/蒙版组 179@2x.png")
                        no-repeat;
                      background-size: 20px 20px;
                      width: 20px;
                      height: 20px;
                      margin-right: 12px;
                    }
                    span:nth-child(2) {
                      font-size: 18px;
                      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                        Arial;
                      font-weight: 500;
                      line-height: 20px;
                      color: #303133;
                      width: 270px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                  }
                  div:nth-child(2) {
                    display: flex;
                    span {
                      display: block;
                    }
                    span:nth-child(1) {
                      background: url("../../../assets/voyagetime/蒙版组 180@2x (1).png")
                        no-repeat;
                      background-size: 20px 20px;
                      width: 20px;
                      height: 20px;
                      margin-right: 12px;
                    }
                    span:nth-child(2) {
                      font-size: 18px;
                      font-family: "SourceHanSansCN-Medium", "Microsoft YaHei",
                        Arial;
                      font-weight: 500;
                      line-height: 20px;
                      color: #303133;
                      width: 270px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      .voyageend:nth-child(1) {
                        display: none;
                      }
                      .voyageend:last-child {
                        .oyagenum {
                          display: none;
                        }
                      }
                    }
                  }
                }
                .inter_list_t {
                  padding: 23px 68px 29px 38px;
                  div {
                    width: 128px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #909399;
                    margin-bottom: 18px;
                  }
                  div:nth-child(2) {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #303133;
                  }
                }
                .inter_list_o {
                  padding: 23px 0 29px 0;
                  div {
                    width: 128px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  div:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #909399;
                    margin-bottom: 18px;
                  }
                  div:nth-child(2) {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 16px;
                    color: #303133;
                  }
                }
              }
              .inter_list_e {
                background: #26a6e9;
                border-radius: 4px;
                height: 36px;
                margin: 27px 34px 37px 0;
                div {
                  padding: 11px 21px;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 14px;
                  color: #ffffff;
                  cursor: pointer;
                  &:hover {
                    background: #3db4f2;
                  }
                }
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
