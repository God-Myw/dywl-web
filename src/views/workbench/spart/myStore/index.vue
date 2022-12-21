<template>
  <div class="myStore">
    <div class="tabs">
      <div
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
      </div>
      <!-- <Worktitle title="我的店铺"></Worktitle>
      <span style="margin-left: 100px"></span>
      <Worktitle title="店铺信息"></Worktitle> -->
    </div>
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
  </div>
</template>
<script>
import Worktitle from "../../../../components/WorkTitle.vue";
export default {
  data() {
    return {
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
  components: { Worktitle },
  mounted() {},
  methods: {
    tabsChange(name) {
      this.tabsStatus = name;
    },
  },
};
</script>
<style lang="scss" scoped>
.myStore {
  .tabs {
    display: flex;
    div {
      display: inline-block;
      font-size: 20px;
      font-weight: 200;
      margin: 50px 30px;
      cursor: pointer;
    }
    .active {
      font-size: 22px;
      font-weight: 700;
      border-bottom: 5px #1890ff solid;
    }
  }
  .box {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    width: 99%;
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
    .coEquipment {
      margin-top: 50px;
    }
  }
}
</style>