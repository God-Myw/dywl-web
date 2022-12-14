<template>
  <div class="workbench">
    <t-layout>
      <t-header>
        <t-head-menu value="item1" height="120px">
          <img
            slot="logo"
            class="logo"
            src="../../assets/workbench/组件 9 – 1.png"
            style="margin-left: 10px"
            alt="logo"
          />
          <div
            class="goback"
            @click="gohome"
            style="
              width: 54px;
              height: 20px;
              display: flex;
              align-items: center;
              cursor: pointer;
            "
          >
            <img
              style="width: 100%; height: 100%"
              src="../../assets/workbench/组 7333@2x.png"
              alt=""
            />
          </div>

          <template #operations>
            <!-- 登录成功头像 -->
            <HeaderLoginImg></HeaderLoginImg>
            <div class="header_message">
              <t-badge :count="9">
                <div class="iconfont icon-NaviLeft-6-message"></div>
              </t-badge>
            </div>
          </template>
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside style="border-top: 1px solid var(--component-border)">
          <t-menu @change="changeHandler" :defaultValue="defaultValue">
            <t-menu-item value="homepage">
              <template #icon>
                <div
                  class="iconfont icon-NaviLeft-1-home"
                  style="margin-right: 8px"
                ></div>
              </template>
              工作台首页
            </t-menu-item>
            <t-menu-item value="userlist">
              <template #icon>
                <div
                  class="iconfont icon-NaviLeft-9-lower1"
                  style="margin-right: 9px"
                ></div>
              </template>
              用户列表
            </t-menu-item>

            <t-menu-item value="balance">
              <template #icon>
                <div
                  class="iconfont icon-NaviLeft-9-remain"
                  style="margin-right: 9px"
                ></div>
              </template>
              账户余额
            </t-menu-item>

            <t-menu-item value="personage">
              <template #icon>
                <div
                  class="iconfont icon-NaviLeft-8-account"
                  style="margin-right: 9px"
                ></div>
              </template>
              个人中心
            </t-menu-item>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            <router-view></router-view>
          </t-content>
        </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
// import { Icon } from 'tdesign-icons-vue'
import { mapMutations } from "vuex";
import HeaderLoginImg from "../../components/HeaderLoginImg.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      defaultValue: "homepage",
    };
  },
  components: {
    HeaderLoginImg,
  },
  created() {},
  mounted() {
    this.defaultValue = this.$route.name;
  },

  methods: {
    ...mapMutations(["product"]),

    gohome() {
      this.$router.push("/");
      this.product(1);
    },
    changeHandler(active) {
      if (active == "walliance") {
        this.$router.push({
          path: "/walliance",
        });
      } else {
        this.$router.push({
          path: `/walliance/${active}`,
        });
      }

      // switch (active) {
      //   case "bulkCargo":
      //     this.$router.push({
      //       path: "/workbench/bulkCargo",
      //     });
      //     break;
      //   case "workbench":
      //     this.$router.push({
      //       path: "/workbench",
      //     });
      //     break;
      //   default:
      // }
    },
  },
};
</script>
<style lang="scss">
.el-popper {
  padding: 0;
  .portrait_menu {
    cursor: pointer;
    padding: 28px 8px 15px;
    .portrait_hader {
      display: flex;
      .portrait_hader_img {
        width: 40px;
        height: 40px;
        margin: 0 12px 12px 12px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          border: 1px solid #efefef;
          display: block;
        }
      }
      .portrait_hader_r {
        padding-top: 3px;
        margin-right: 12px;
        .portrait_r_name {
          font-size: 14px;
          font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
          line-height: 14px;
          color: #303133;
          margin-bottom: 7px;
        }
        .portrait_r_states {
          display: flex;
          div:nth-child(1) {
            font-size: 12px;
            line-height: 16px;
            color: #909399;
          }
          .portrait_r_states_attes {
            margin-left: 8px;
            width: 48px;
            height: 16px;
            background: url("../../assets/login/蒙版组 334@2x.png") no-repeat;
            background-size: 48px 16px;
          }
        }
      }
    }
    .portrait_line {
      margin: 0 12px 14px;
      height: 1px;
      background: #ebeef5;
    }
    .portrait_fun {
      ul {
        li {
          display: flex;
          padding: 10px 0 10px 15px;
          width: 200px;
          cursor: pointer;
          box-sizing: border-box;
          div:nth-child(1) {
            width: 20px;
            height: 20px;

            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #303133;
          }
          &:hover {
            background: #f3f3f3;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.workbench {
  /deep/.t-menu__operations-icon {
    margin-right: 0px;
  }
  .t-layout {
    .t-layout__header {
      .t-menu {
        /deep/.t-head-menu__inner {
          box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
        }
        /deep/.t-menu__logo {
          margin-right: 18px;
        }
        /deep/.t-menu__operations-icon {
          padding: 6px 8px 8px 8px;
          cursor: pointer;
        }
        .t-menu__operations {
          .header_message {
            margin-right: 72px;
            margin-left: 38px;
            cursor: pointer;
            /deep/ .t-badge--circle {
              height: 14px;
              width: 16px;
              line-height: 12px;
              top: 23px;
            }
          }
        }
      }
    }
    .t-layout__sider {
      .t-default-menu {
        /deep/.t-menu__item {
          height: 48px;
        }
      }
    }
  }
}
/deep/.t-layout {
  background: #f5f7fa;
}
.t-layout__sider {
  height: calc(100vh - 70px);

  margin-top: 6px;
}
</style>
