<template>
  <div class="homesearch">
    <!-- 海运订舱 -->
    <div class="home_search_frame">
      <div class="home_search_input" v-show="current != 2">
        <div class="search_input_launch">
          <i></i>
          <div class="search_input_recoin">
            <!-- 海运订舱 current == 0 -->
            <el-select
              v-model="booking.portStart"
              filterable
              clearable
              placeholder="请选择起始港"
            >
              <el-option
                v-for="item in startPortList"
                :key="item.code"
                :label="item.textValue"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <!-- 散杂货 current == 1 -->
          </div>
        </div>
        <div class="search_input_arrows"><i></i></div>
        <div class="search_input_terminus">
          <i></i>
          <div class="search_input_recoin">
            <!-- v-if="current == 1" -->
            <el-select
              v-model="booking.portEnd"
              filterable
              clearable
              placeholder="请选择目的港"
            >
              <el-option
                v-for="item in endtPortList"
                :key="item.code"
                :label="item.textValue"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search_input_rectangle"></div>
        <div class="search_input_elapsedtime">
          <i></i>
          <div>
            <el-date-picker
              v-model="booking.transportDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="运输日期"
              clearable
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <!-- 集装箱买卖 -->
      <div class="home_search_input" v-show="current == 2">
        <div class="search_input_deal">
          <i></i>
          <div class="search_input_recoin">
            <input
              v-model="bookingEnd"
              type="text"
              placeholder="请选择购箱港口城市"
            />
          </div>
        </div>
      </div>
      <div class="home_search_btn" @click="gohint()">搜 索</div>
    </div>
    <Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Hint from "../components/hint.vue";
import axios from "axios";
export default {
  props: ["current"],
  data() {
    return {
      hintStutas: false,
      bookingStart: "",
      bookingEnd: "",
      startPortList: [],
      endtPortList: [],
      booking: {
        portStart: "",
        portEnd: "",
        transportDate: "",
      },
    };
  },
  components: {
    Hint,
  },
  created() {},
  mounted() {
    // 起始港
    this.getBegList();
  },
  methods: {
    dighintStutas(stats) {
      this.hintStutas = stats;
    },
    gohint() {
      this.hintStutas = true;
      // console.log(this.booking);
    },
    ...mapMutations(["product"]),
    // 搜索
    searchdetails() {
      // this.product(2);
      // this.$router.push({
      //   path: "/product/containerdeal",
      // });
    },
    async getBegList() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=port"
      );
      if (res.data.code == "0000") {
        this.startPortList = res.data.data.zh[0].items;
        this.endtPortList = res.data.data.zh[0].items;
      } else {
        this.startPortList = [];
        this.endtPortList = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.homesearch {
  .home_search_frame {
    display: flex;
    justify-content: center;
    .home_search_input {
      width: 856px;
      flex-shrink: 0;
      height: 56px;
      background: #ffffff;
      border-radius: 6px 0px 0px 6px;
      display: flex;
      align-items: center;
      .search_input_launch {
        display: flex;
        .search_input_recoin {
          /deep/.el-input__inner {
            width: 176px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            color: #909399;
            border: none;
            padding: 0;
          }
          /deep/input::-webkit-input-placeholder {
            color: #909399;
          }
        }
        i {
          width: 24px;
          height: 24px;
          margin: 8px 10px 0 24px;
          background: url("../assets/homepage/蒙版组 56@2x.png") no-repeat;
          background-size: cover;
          display: inline-block;
        }
      }
      .search_input_arrows {
        // margin-left: 78px;
        padding: 7px 4px 7px 8px;
        i {
          width: 52px;
          height: 6px;
          display: block;
          background: url("../assets/homepage/组 3785.png") no-repeat;
          background-size: cover;
        }
      }
      .search_input_terminus {
        display: flex;
        margin-left: 38px;
        // 处理input框
        .search_input_recoin {
          /deep/.el-input__inner {
            width: 176px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            color: #909399;
            border: none;
            padding: 0;
          }
          /deep/input::-webkit-input-placeholder {
            color: #909399;
          }
        }
        i {
          margin-top: 8px;
          width: 24px;
          height: 24px;
          margin-right: 10px;
          background: url("../assets/homepage/蒙版组 56@2x (1).png") no-repeat;
          background-size: cover;
          display: inline-block;
        }
      }
      .search_input_rectangle {
        width: 1px;
        height: 44px;
        background: #e2e2e2;
        margin: 0 68px 0 16px;
      }
      .search_input_elapsedtime {
        display: flex;

        i {
          width: 24px;
          height: 24px;
          margin-top: 8px;
          margin-right: 10px;
          background: url("../assets/homepage/组 7895@2x.png") no-repeat;
          background-size: cover;
          display: inline-block;
        }
        div {
          /deep/.el-input {
            width: 140px;
          }
          /deep/.el-input__inner {
            border: none;
            padding: 0;
            width: 140px;
            font-size: 16px;
            color: #909399;
          }
          /deep/input::-webkit-input-placeholder {
            color: #909399;
          }
          /deep/.el-input__prefix {
            display: none;
          }
        }
      }
    }
    .home_search_input {
      width: 856px;
      flex-shrink: 0;
      height: 56px;
      background: #ffffff;
      border-radius: 6px 0px 0px 6px;
      display: flex;
      align-items: center;
      .search_input_deal {
        display: flex;
        i {
          width: 24px;
          height: 24px;
          margin: 0 10px 0 24px;
          background: url("../assets/homepage/组 8287@2x.png") no-repeat;
          background-size: cover;
          display: inline-block;
        }
        .search_input_recoin {
          input {
            width: 300px;
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
      }
    }

    .home_search_btn {
      box-sizing: border-box;
      flex-shrink: 0;
      width: 136px;
      height: 56px;
      background: #ff7c41;
      border-radius: 0px 6px 6px 0px;
      font-size: 22px;
      text-align: center;
      font-weight: 400;
      line-height: 56px;
      color: #ffffff;
      cursor: pointer;
      &:hover {
        background: #ff8f5d;
      }
    }
  }
}
</style>
