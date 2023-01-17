<template>
  <div class="myStore">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的店铺" name="myStore">
          <div class="box">
            <div class="header">
              <div class="storeInfo">
                <div class="storeImg">
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt="" />
                </div>
                <div class="storeName">
                  <p>
                    店铺名称
                    <img
                      v-if="storeType == 1"
                      src="http://58.33.34.10:10443/images/spart/1670924635524.png"
                      alt="" />
                    <img
                      v-if="storeType !== 2"
                      src="http://58.33.34.10:10443/images/spart/1670924637144.png"
                      alt="" />
                  </p>
                  <p>
                    信用评级
                    <img
                      :key="iu"
                      v-for="iu in 5"
                      src="http://58.33.34.10:10443/images/spart/1670924109041.png"
                      alt="" />
                    5.0
                  </p>
                </div>
              </div>
              <div class="search">
                <el-input
                  v-model="s"
                  placeholder="搜索船舶备件"
                  size="normal"
                  clearable
                  @change="() => {}" />
                <el-button
                  style="background-color: #0052d9"
                  type="primary"
                  size="default"
                  @click="() => {}">
                  搜本店</el-button
                >
              </div>
            </div>
          </div>
          <div class="box">
            <div class="spartInfo">
              <div class="storeClass">
                <div class="cla">
                  <p>商品分类</p>
                </div>
                <el-menu @open="handleOpen" @close="handleClose">
                  <el-menu-item index="1">
                    <span slot="title">电子系统</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <span slot="title">通信设备</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <span slot="title">电子海图</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <span slot="title">螺旋机</span>
                  </el-menu-item>
                  <el-menu-item index="5">
                    <span slot="title">船用灯具</span>
                  </el-menu-item>
                </el-menu>
              </div>
              <div class="electricalSys">
                <el-radio-group
                  v-model="spartActive"
                  :style="{
                    visibility: false ? 'hidden' : 'visible ',
                    marginLeft: '7px',
                  }">
                  <el-radio-button label="top">热销备件</el-radio-button>
                  <el-radio-button label="right">二手备件</el-radio-button>
                  <el-radio-button label="bottom">自营备件</el-radio-button>
                </el-radio-group>
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
            <div class="pagination">
              <span>总共{{ Math.ceil(total / 10) }}页记录每页显示10条记录</span>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="currentChange"
                :page-sizes="[5, 12, 15, 20]"
                :page-size="12"
                layout="total,sizes,prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="店铺信息" name="storeInfo">
          <div class="box" v-show="this.status">
            <div class="header">
              <div class="storeInfo">
                <div class="storeImg">
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt="" />
                </div>
                <div class="storeName">
                  <p>
                    店铺名称
                    <img
                      src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                      alt="" />
                  </p>
                  <p>
                    信用评级
                    <img
                      :key="iu"
                      v-for="iu in 5"
                      src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                      alt="" />
                    4.5
                  </p>
                </div>
              </div>
              <div class="search">
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="medium"
                  style="
                    width: 220px;
                    height: 46px;
                    font-size: 20px;
                    margin: 40px 30px;
                    background-color: #0052d9;
                  "
                  @click="storeEdit(false)"
                  >修改店铺信息</el-button
                >
              </div>
            </div>
            <div class="body">
              <div class="storeInfo authentication">
                <Worktitle title="认证身份"></Worktitle>
                <p>认证身份<span>公司店铺</span></p>
              </div>
              <div class="storeInfo license">
                <Worktitle title="营业证照"></Worktitle>
                <div>
                  <img
                    src="http://58.33.34.10:10443/images/spart/1671190772217.png"
                    alt="" />
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
          </div>
          <StoreEdit v-if="!this.status" @editShow="storeEdit"></StoreEdit>
        </el-tab-pane>
      </el-tabs>
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
      activeName2: "hotSpart",
      spartActive: "",
      tabsStatus: "我的店铺",
      total: 15,
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
      ],
    };
  },
  components: { Worktitle, StoreEdit },
  mounted() {},
  methods: {
    tabsChange(name) {
      this.tabsStatus = name;
    },
    handleClick(tab, event) {},
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
    .el-tabs {
      width: 100%;
      /deep/.el-tabs__item {
        // display: inline-block;
        overflow: hidden;
        padding: 0;
        font-size: 20px;
        font-weight: 200;
        margin: 10px 60px 0px 0px;
        cursor: pointer;
      }
      /deep/.is-active {
        font-size: 22px;
        font-weight: 700;
        color: black;
        border-bottom: 5px #1890ff solid;
      }
      /deep/.el-tabs__active-bar {
        display: none;
      }
      /deep/.el-tabs__nav-wrap::after {
        display: none;
      }
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
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .storeInfo {
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
          margin-left: 30px;
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
      .search {
        margin-right: 40px;
        display: flex;
      }
    }
    .spartInfo {
      display: flex;
      width: 100%;
      .storeClass {
        width: 10%;
        margin: 100px 40px;
        .cla {
          // border-bottom: 1px solid rgb(179, 179, 179);
          padding-bottom: 30px;
          p {
            font-size: 23px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.9);
          }
        }
        .el-menu {
          border-right: none;
          .el-menu-item {
            height: 44px;
            line-height: 44px;
            min-width: 0px;
            border-bottom: 1px solid rgba(179, 179, 179, 0.466);
          }
        }
        .is-active {
          font-size: 14px;
          font-weight: 500;
          color: black;
          background-color: #eeeeee;
          border-bottom: none;
        }
      }
      .electricalSys {
        ul {
          margin-top: 20px;
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
        /deep/.is-active {
          border-bottom: none;
        }
        /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
          color: rgba(0, 0, 0, 0.9);
          background-color: #eeeeee;
          border-color: #eeeeee;
          box-shadow: none;
        }
        /deep/.el-radio-button__inner {
          vertical-align: baseline;
        }
      }
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      .storeInfo {
        width: 40%;
        p {
          margin: 10px 0px;
          font-size: 18px;
          font-weight: 100;
          span {
            font-weight: 500;
            font-size: 15px;
            margin-left: 20px;
          }
        }
      }
      .authentication {
        height: 100px;
        display: flex;
        flex-direction: column;
      }
      .license {
        display: flex;
        flex-direction: column;
        img {
          margin-left: 20px;
          width: 180px;
          height: 229px;
        }
      }
      .otherInfo {
        margin-top: -170px;
      }
    }

    .pagination {
      span {
        font-size: 15px;
      }
      margin-top: 20px;
      display: flex;
      justify-content: right;
      align-items: center;
      // transform: translateX(-110%);
      // left: 100%;
    }
  }
}
</style>
