<template>
  <div class="portmessage">
    <div class="portmessage_bg">
      <div class="portmessage_span">
        <span>海量港口</span>
        <span>信息查询</span>
      </div>
    </div>
    <div class="portmessage_cont">
      <div class="cont_nav">
        <div class="cont_nav_t">
          <span>港口</span>
          <span>(5000+)</span>
        </div>
        <div class="cont_nav_seach">
          <el-autocomplete
            v-model="portdata"
            style="width: 856px"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索港口查询港口信息"
            @select="handleSelect"
          ></el-autocomplete>
          <div class="cont_nav_btn">搜 索</div>
        </div>
        <div class="cont_nav_relevancy">
          <div class="relev_tit">相关搜索：</div>
          <ul>
            <li
              v-for="item in portHotSearchDtos"
              :key="item.id"
              @click="goPortdet(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPortListOnlyPortName,
  getHotSearch,
} from "../../api/tollportmessage";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      portdata: "",
      restaurants: [],
      portHotSearchDtos: [],
    };
  },
  mounted() {
    getHotSearch().then((res) => {
      if (res.code == "0000") {
        this.portHotSearchDtos = res.data.portHotSearchDtos;
      } else {
        this.portHotSearchDtos = [];
      }
    });
  },

  methods: {
    ...mapMutations(["product"]),
    async querySearchAsync(queryString, cb) {
      await getPortListOnlyPortName({ name: this.portdata }).then((res) => {
        if (res.code == "0000") {
          this.restaurants = res.data.portListDtos.map((item) => {
            return {
              id: item.id,
              value: new RegExp("[\\u4E00-\\u9FFF]", "g").test(this.portdata)
                ? item.portNameCn
                : item.portName,
            };
          });
        } else {
          this.restaurants = [];
        }
      });
      var results = queryString
        ? this.restaurants.filter(this.createStateFilter(queryString))
        : this.restaurants;
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.product(3);
      this.$router.push({
        path: "/portmessage/details",
        query: { id: item.id },
      });
    },
    goPortdet(id) {
      this.product(3);
      this.$router.push({
        path: "/portmessage/details",
        query: { id: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  height: 56px;
  font-size: 18px;
  color: #909399;
}
.portmessage {
  .portmessage_bg {
    background: url("../../assets/toll/toll-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 240px;
    .portmessage_span {
      margin: 0 auto;
      width: 1164px;
      padding-top: 104px;
      display: flex;
      span {
        display: block;
        font-size: 36px;
        line-height: 36px;
        font-weight: 400;
        color: #ffffff;
        margin-right: 46px;
      }
    }
  }
  .portmessage_cont {
    height: 220px;
    background: #f5f7f9;
    margin-bottom: 480px;
    .cont_nav {
      margin: 0 auto;
      width: 1164px;
      padding-top: 36px;
      .cont_nav_t {
        width: 112px;
        box-sizing: border-box;
        height: 32px;
        padding-left: 14px;
        background: #4791ff;
        border-radius: 2px;
        font-size: 14px;
        line-height: 32px;
        color: #ffffff;
        display: flex;
        margin-bottom: 18px;
        span {
          display: block;
          margin-right: 10px;
        }
      }
    }
    .cont_nav_seach {
      display: flex;
      margin-bottom: 28px;
      .cont_nav_btn {
        width: 136px;
        height: 56px;
        background: #4791ff;
        border-radius: 0px 6px 6px 0px;
        font-size: 20px;
        font-weight: 400;
        line-height: 56px;
        color: #ffffff;
        text-align: center;
      }
    }
    .cont_nav_relevancy {
      display: flex;
      .relev_tit {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #909399;
        margin-right: 12px;
      }
      ul {
        display: flex;
        li {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: #909399;
          margin-right: 20px;
          &:hover {
            color: #4791ff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
