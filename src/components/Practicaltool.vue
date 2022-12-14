<template>
  <div class="Practical_tool">
    <div class="tool_title">实用工具</div>
    <div class="tool_nav">
      <ul>
        <li @click="goportmessage()">
          <a>
            <div class="tool_nav_image">
              <img src="../assets/homepage/组 7935@2x.png" alt="" />
            </div>
            <div class="tool_nav_title">港口查询</div>
          </a>
        </li>
        <li v-for="(item, index) in toolData" :key="index">
          <a :href="item.linkurl" target="_blank">
            <div class="tool_nav_image"><img :src="item.image" alt="" /></div>
            <div class="tool_nav_title">{{ item.title }}</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      toolData: [
        // {
        //   title: "港口查询",
        //   image: require("../assets/homepage/组 7935@2x.png"),
        //   // linkurl: "#",
        // },
        {
          title: "BDI指数",
          image: require("../assets/homepage/组 7937@2x.png"),
          linkurl: "http://www.dylnet.cn/BDI.html",
        },
        {
          title: "全球气象",
          image: require("../assets/homepage/组 7931@2x.png"),
          linkurl: "https://www.ventusky.com",
        },
        {
          title: "海洋气象",
          image: require("../assets/homepage/组 7932@2x.png"),
          linkurl: "https://www.windy.com",
        },
        {
          title: "潮汐查询",
          image: require("../assets/homepage/组 7929@2x.png"),
          linkurl: "https://www.cnss.com.cn/html/tideWechatNew.html",
        },
        {
          title: "全球海况",
          image: require("../assets/homepage/组 7938@2x.png"),
          linkurl: "https://www.passageweather.com/mini",
        },
        {
          title: "船位查询",
          image: require("../assets/homepage/组 7933@2x.png"),
          linkurl: "http://weixin.shipxy.com/shipxy/map",
        },
        {
          title: "航程计算",
          image: require("../assets/homepage/组 7934@2x.png"),
          linkurl: "https://sea-distances.org",
        },

        {
          title: "集装箱尺寸",
          image: require("../assets/homepage/组 7936@2x.png"),
          linkurl: "http://www.dylnet.cn/123/jzxcc_wep.html",
        },
        {
          title: "船价指数",
          image: require("../assets/homepage/组 7930@2x.png"),
          linkurl: "http://wx.csi.com.cn/app/HYZX/CJZS.aspx?view=1",
        },
      ],
    };
  },
  components: {},
  mounted() {},
  methods: {
    ...mapMutations(["product"]),
    // 港口信息
    goportmessage() {
      this.popoverStuts = false;
      this.product(3);
      this.$router.push({
        path: "/tool/portmessage",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Practical_tool {
  margin: 0 auto;
  width: 1164px;
  box-sizing: border-box;
  .tool_title {
    padding: 24px 0;
    font-size: 16px;
    line-height: 24px;
    color: #303133;
    font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
  }
  .tool_nav {
    ul {
      display: flex;
      justify-content: center;
      li {
        margin: 0 25px;
        cursor: pointer;
        a {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 70px;
          .tool_nav_image {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .tool_nav_title {
            font-size: 14px;
            line-height: 24px;
            color: #606266;
          }
          &:hover {
            .tool_nav_title {
              color: #5197ff;
            }
          }
        }
      }
    }
  }
}
</style>