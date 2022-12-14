<template>
  <div class="prodetails">
    <div class="prodetails_bg">
      <div class="prodetails_cont">
        <div class="prodetails_name">
          <div>{{ basicData.portName }}</div>
          <div>{{ basicData.portCountry }}</div>
        </div>
        <div class="prodetails_port">
          <div>港口代码</div>
          <div>{{ basicData.unLocode }}</div>
        </div>
        <div class="prodetails_longitude">
          <div>经维度</div>
          <div>{{ basicData.lat }}</div>
          <div>{{ basicData.lng }}</div>
        </div>
      </div>
    </div>
    <div class="prodetails_tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="港口介绍" name="second"></el-tab-pane>
        <el-tab-pane label="联系信息" name="third"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 'first'" class="essential">
        <div class="essential_location">
          <div>lncluding</div>
          <div>{{ basicData.lncluding }}</div>
        </div>
        <div class="essential_location">
          <div>Max Size</div>
          <div>{{ basicData.maxSize }}</div>
        </div>
        <div class="essential_location">
          <div>Airport</div>
          <div>
            {{ basicData.airport }}
          </div>
        </div>
        <div class="essential_location">
          <div>Repairs/Drydocks Restrictions</div>
          <div>
            {{ basicData.repairsDrydocks }}
          </div>
        </div>
        <div class="essential_location">
          <div>Restrictions</div>
          <div>
            {{ basicData.restrictions }}
          </div>
        </div>
        <div class="essential_location">
          <div>Location</div>
          <div>{{ basicData.location }}</div>
        </div>
        <div class="essential_location">
          <div>Pilotage</div>
          <div>
            {{ basicData.pilotage }}
          </div>
        </div>
        <div class="essential_location">
          <div>Anchorages</div>
          <div>
            {{ basicData.anchorages }}
          </div>
        </div>
        <div class="essential_location">
          <div>Pratique</div>
          <div>
            {{ basicData.pratique }}
          </div>
        </div>
        <div class="essential_location">
          <div>VHF/Radar/VTS</div>
          <div>
            {{ basicData.radarVts }}
          </div>
        </div>
        <div class="essential_location">
          <div>Tugs</div>
          <div>
            {{ basicData.tugs }}
          </div>
        </div>
        <div class="essential_location">
          <div>Berthing</div>
          <div>
            {{ basicData.berthing }}
          </div>
        </div>
        <div class="essential_location">
          <div>Bulk Cargo</div>
          <div>
            {{ basicData.bulkCargo }}
          </div>
        </div>
        <div class="essential_location">
          <div>Fuel</div>
          <div>
            {{ basicData.fuel }}
          </div>
        </div>
        <div class="essential_location">
          <div>Fresh Water</div>
          <div>
            {{ basicData.freshWater }}
          </div>
        </div>
        <div class="essential_location">
          <div>Waste Disposal Slops</div>
          <div>
            {{ basicData.wasteDisposalSlops }}
          </div>
        </div>
        <div class="essential_location">
          <div>Medical</div>
          <div>
            {{ basicData.medical }}
          </div>
        </div>
        <div class="essential_location">
          <div>Weather/Tide</div>
          <div>
            {{ basicData.weather }}
          </div>
        </div>
        <div class="essential_location">
          <div>Web Site</div>
          <div>
            {{ basicData.web1 }}
          </div>
        </div>
      </div>
      <div v-if="activeName == 'second'" class="portintroduce">
        {{ basicData.overview }}
      </div>
      <div v-if="activeName == 'third'" class="contactmess">
        {{ basicData.authority }}
      </div>
    </div>
  </div>
</template>

<script>
import { getPortListById } from "../../api/tollportmessage";
export default {
  data() {
    return {
      activeName: "first",
      basicData: [],
    };
  },
  mounted() {
    getPortListById({ id: this.$route.query.id }).then((res) => {
      if (res.code == "0000") {
        this.basicData = res.data.portListDtos;
      } else {
        this.basicData = [];
      }
    });
  },

  methods: {
    handleClick(tab) {},
  },
};
</script>

<style lang="scss" scoped>
.prodetails {
  .prodetails_bg {
    background: url("../../assets/toll/toll-det-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 200px;
    margin-bottom: 34px;
    .prodetails_cont {
      margin: 0 auto;
      width: 1164px;
      .prodetails_name {
        display: flex;
        margin-bottom: 24px;
        padding-top: 47px;
        div:nth-child(1) {
          font-size: 36px;
          line-height: 36px;
          color: #ffffff;
          margin-right: 24px;
        }
        div:nth-child(2) {
          padding-top: 8px;
          font-size: 28px;
          font-weight: 400;
          line-height: 28px;
          color: #97afdf;
        }
      }
      .prodetails_port {
        display: flex;
        margin-bottom: 17px;
        div:nth-child(1) {
          font-size: 16px;
          line-height: 27px;
          color: #ffffff;
          width: 80px;
          margin-right: 20px;
        }
        div:nth-child(2) {
          font-size: 16px;
          font-weight: 400;
          line-height: 27px;
          color: #ffffff;
        }
      }
      .prodetails_longitude {
        display: flex;
        div:nth-child(1) {
          font-size: 16px;
          line-height: 27px;
          color: #ffffff;
          width: 80px;
          margin-right: 20px;
        }
        div:nth-child(2) {
          font-size: 16px;
          color: #ffffff;
          font-weight: 400;
          line-height: 27px;
          margin-right: 10px;
        }
        div:nth-child(3) {
          font-size: 16px;
          color: #ffffff;
          font-weight: 400;
          line-height: 27px;
        }
      }
    }
  }
  .prodetails_tabs {
    margin: 0 auto;
    width: 1164px;
  }
  .essential {
    padding-top: 46px;
    margin-bottom: 100px;
    .essential_location {
      display: flex;
      margin-bottom: 30px;
      div:nth-child(1) {
        width: 100px;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #909399;
        margin-right: 96px;
      }
      div:nth-child(2) {
        width: 576px;
        word-break: break-all;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #333333;
      }
    }
  }
  .portintroduce {
    width: 772px;
    padding-top: 46px;
    margin-bottom: 420px;
    font-size: 14px;
    line-height: 20px;
    color: #303133;
  }
  .contactmess {
    width: 772px;
    padding-top: 46px;
    margin-bottom: 420px;
    font-size: 14px;
    line-height: 20px;
    color: #303133;
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
