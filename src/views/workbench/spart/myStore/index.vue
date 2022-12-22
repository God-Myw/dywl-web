<template>
  <div class="myStore">
    <div class="tabs">
      <!-- <div
        :class="tabsStatus == '我的店铺' ? 'active' : ''"
        @click="tabsChange('我的店铺')"
      >
        我的店铺
      </div>
      <div
        :class="tabsStatus == '店铺信息' ? 'active' : ''"
        @click="tabsChange('店铺信息')"
      >
        店铺信息
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的店铺" name="myStore">
          <div class="box">
            <div class="header">
              <div class="storeImg">
                <img
                  src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                  alt=""
                />
              </div>
              <div class="storeName">
                <p>
                  店铺名称
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt=""
                  />
                </p>
                <p>
                  信用评级
                  <img
                    :key="iu"
                    v-for="iu in 5"
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt=""
                  />
                  4.5
                </p>
              </div>
            </div>
            <div class="electricalSys">
              <Worktitle title="电器系统"></Worktitle>
              <ul>
                <li :key="index" v-for="(item, index) in info">
                  <img :src="item.url" />
                  <p>{{ item.name }}</p>
                  <p>{{ item.model }}</p>
                  <p>¥{{ item.price }}</p>
                </li>
              </ul>
            </div>
            <div class="coEquipment">
              <Worktitle title="通信设备"></Worktitle>
              <ul>
                <li :key="index" v-for="(item, index) in info">
                  <img :src="item.url" />
                  <p>{{ item.name }}</p>
                  <p>{{ item.model }}</p>
                  <p>¥{{ item.price }}</p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="店铺信息" name="storeInfo">
          <div class="box" v-show="this.status">
            <div class="header">
              <div class="storeImg">
                <img
                  src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                  alt=""
                />
              </div>
              <div class="storeName">
                <p>
                  店铺名称
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt=""
                  />
                </p>
                <p>
                  信用评级
                  <img
                    :key="iu"
                    v-for="iu in 5"
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt=""
                  />
                  4.5
                </p>
              </div>
            </div>
            <div class="body">
              <div class="storeInfo authentication">
                <Worktitle title="认证身份"></Worktitle>
                <span>公司店铺</span>
              </div>
              <div class="storeInfo license">
                <Worktitle title="营业证照"></Worktitle>
                <div>
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="storeInfo otherInfo">
                <Worktitle title="其他信息"></Worktitle>
                <p>公司名称 <span>上海道裕科技有限公司</span></p>
                <p>联系人&nbsp;&nbsp;&nbsp; <span>王路</span></p>
                <p>联系电话 <span>1895555888</span></p>
                <p>客服电话 <span>1856445699</span></p>
                <p>公司地址 <span>上海市宝山区友谊路钢领2号楼1503</span></p>
                <p>
                  店铺简介
                  <span
                    >道裕物流专业从事线上物流运输服务交易平台，业务涵盖国内、国际海运，租船运输、集装箱运输、集装箱租赁和买</span
                  >
                </p>
              </div>
            </div>
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="medium"
              style="
                width: 220px;
                height: 46px;
                font-size: 20px;
                margin: 40px 30px;
              "
              @click="storeEdit(false)"
              >修改店铺信息</el-button
            >
          </div>
          <StoreEdit v-if="!this.status" @editShow="storeEdit"></StoreEdit>
        </el-tab-pane>
      </el-tabs>
      <!-- <Worktitle title="我的店铺"></Worktitle>
      <span style="margin-left: 100px"></span>
      <Worktitle title="店铺信息"></Worktitle> -->
    </div>
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
import StoreEdit from "./storeEdit.vue";
export default {
  data() {
    return {
      status: true,
      activeName: "myStore",
      tabsStatus: "我的店铺",
      info: [
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
        {
          url: "http://58.33.34.10:10443/images/spart/1671190772217.png",
          name: "CPP调距桨电力推进系统",
          model: "HYCP38-1",
          price: "12680",
        },
      ],
    };
  },
  components: { Worktitle, StoreEdit },
  mounted() {},
  methods: {
    tabsChange(name) {
      this.tabsStatus = name;
    },
    handleClick(tab, event) {
    },
    storeEdit(statu) {
      this.status = statu || false;
    },
  },
};
</script>
<style lang="scss" scoped>
.myStore {
  // border: 1px solid red;
  position: relative;
  .tabs {
    display: flex;
    /deep/.el-tabs {
      width: 100%;
    }
    /deep/.el-tabs__item {
      // display: inline-block;
      overflow: hidden;
      padding: 0;
      font-size: 20px;
      font-weight: 200;
      margin: 50px 30px;
      cursor: pointer;
    }
    /deep/.is-active {
      font-size: 22px;
      font-weight: 700;
      border-bottom: 5px #1890ff solid;
    }
    /deep/.el-tabs__active-bar {
      display: none;
    }
  }
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0px 0px 5px rgb(235, 227, 227);
    .header {
      width: 360px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .storeImg {
        border-radius: 90px;
        display: grid;
        place-items: center;
        width: 100px;
        height: 100px;
        background-color: red;
      }
      .storeName {
        font-size: 18px;
        p:nth-child(1) img {
          vertical-align: bottom;
          width: 30px;
          height: 30px;
        }
        p:nth-child(2) img {
          vertical-align: bottom;
          width: 24px;
          height: 24px;
        }
      }
    }
    .electricalSys,
    .coEquipment {
      margin-top: 50px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin: 8px;
          border: 1px solid rgb(153, 151, 151);
          width: 258px;
          height: 290px;
          p {
            margin: 8px 0px 8px 0px;
            padding-left: 15px;
          }
          p:nth-of-type(1) {
            font-size: 17px;
          }
          p:nth-of-type(2) {
            font-size: 11px;
          }
          p:nth-of-type(3) {
            font-size: 16px;
            color: red;
          }
          img {
            width: 100%;
            height: 190px;
            border-bottom: 1px solid rgb(216, 212, 212);
          }
        }
      }
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      .storeInfo {
        width: 40%;
        span {
          font-size: 15px;
          margin-left: 20px;
        }
      }

      .authentication {
        height: 100px;
      }
      .license {
        display: flex;
        img {
          margin-left: 20px;
          width: 180px;
          height: 229px;
        }
      }
      .otherInfo {
        margin-top: -170px;
        p {
          margin: 10px 0px;
          font-size: 18px;
          font-weight: 100;
          span {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>