><template>
  <div>
    <div class="CommonHeader_portrait" v-popover:popoverportrait>
      <img
        v-if="roleinfo.userType == '5'"
        src="../assets/login/组 8646@2x.png"
        alt=""
      />
      <img
        v-if="roleinfo.userType == '4'"
        src="../assets/login/组 8641@2x.png"
        alt=""
      />
      <img
        v-if="!roleinfo.userType"
        src="../assets/login/e8e0e8510d038407e269902a39cc577.png"
        alt=""
      />
    </div>
    <!-- 个人账号 -->
    <el-popover ref="popoverportrait" placement="bottom-end" trigger="hover">
      <div class="portrait_menu">
        <div class="portrait_hader">
          <div class="portrait_hader_img">
            <img
              v-if="this.roleinfo.userType == '5'"
              src="../assets/login/组 8646@2x.png"
              alt=""
            />
            <img
              v-if="this.roleinfo.userType == '4'"
              src="../assets/login/组 8641@2x.png"
              alt=""
            />
            <img
              v-if="!this.roleinfo.userType"
              src="../assets/login/e8e0e8510d038407e269902a39cc577.png"
              alt=""
            />
          </div>
          <div class="portrait_hader_r">
            <div class="portrait_r_name">{{ this.roleinfo.accountId }}</div>
            <div class="portrait_r_states">
              <div v-if="this.roleinfo.userType == '4'">货主</div>
              <div v-if="this.roleinfo.userType == '5'">船东</div>
              <div v-if="this.roleinfo.applyType == '1'">个人</div>
              <div v-if="this.roleinfo.applyType == '2'">企业</div>
              <div
                v-if="this.roleinfo.checkStatus == '2'"
                class="portrait_r_states_attes"
              ></div>
              <div
                v-else
                style="font-size: 12px; line-height: 16px; color: #909399"
              >
                -未认证
              </div>
            </div>
          </div>
        </div>
        <div class="portrait_line"></div>
        <div class="portrait_fun">
          <ul>
            <li>
              <div><img src="../assets/login/组 8636@2x.png" alt="" /></div>
              <div>资料认证</div>
            </li>
            <li>
              <div><img src="../assets/login/组 8616@2x.png" alt="" /></div>
              <div>账号设置</div>
            </li>
            <li @click="goout()">
              <div><img src="../assets/login/组 8613@2x.png" alt="" /></div>
              <div>退出账号</div>
            </li>
          </ul>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      roleinfo: [],
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("roleinfo"))) {
      this.roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
    }
  },
  methods: {
    ...mapMutations(["product"]),
    goout() {
      localStorage.removeItem("token");
      localStorage.removeItem("roleinfo");
      this.$router.push("/");
      this.product(1);
      this.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.CommonHeader_portrait {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid #efefef;
    border-radius: 20px;
  }
}
.portrait_menu {
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
          background: url("../assets/login/蒙版组 334@2x.png") no-repeat;
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
</style>