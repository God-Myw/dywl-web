<template>
  <div class="aboutUs">
    <div class="aboutUs_bg">
      <div class="aboutUs_bg_cont">
        <div class="aboutUs_font_y">ABOUT US</div>
        <div class="aboutUs_font_z">关于我们</div>
        <div class="aboutUs_font_b">
          <div class="aboutUs_l">
            <p>道裕物流专业从事线上物流运输服务交易平台，</p>
            <p>
              业务涵盖国内、国际海运，租船运输、集装箱运输、集装箱租赁和买卖、
            </p>
            <p>卡车运输、铁路运输、相关附加服务等，</p>
            <p>通过“互联网＋物流”，为客服和物流企业提供无缝对接的服务。</p>
            <p>沟通成本减少50%，物流成本节约20%，市场潜力增长120%。</p>
            <p>让天下没有难运的货物！</p>
          </div>
          <div class="aboutUs_r">
            <video width="478px" height="264px" controls>
              <source
                src="https://www.dylnet.cn/video/dywl_video.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
    <div class="incident">
      <div class="incident_l">
        <div class="incident_l_header">平台大事记</div>
        <ul>
          <li v-for="(item, index) in incidentList" :key="index">
            <div>{{ item.year }}</div>
            <div></div>
            <div>{{ item.even }}</div>
          </li>
        </ul>
      </div>
      <div class="incident_r">
        <img src="../../assets/seckill/蒙版组 304.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      incidentList: [
        { year: "2021年12月", even: "加油和代理功能上线发布" },
        { year: "2021年10月", even: "中国首个集装箱现舱秒杀功能上线发布" },
        { year: "2021年9月", even: "中国首个集装箱现舱竞拍功能上线发布" },
        { year: "2021年8月", even: "集装箱现舱在线预订功能上线发布" },
        { year: "2020年9月", even: "V1.0.0正式版上线发布" },
        { year: "2020年8月", even: "V1.0.0内部试运营版上线发布" },
      ],
    };
  },
  components: {},

  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.aboutUs {
  .aboutUs_bg {
    background: url("../../assets/seckill/组 8505.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 572px;
    margin-bottom: 100px;
    .aboutUs_bg_cont {
      margin: 0 auto;
      width: 1164px;
      .aboutUs_font_y {
        font-size: 44px;
        font-weight: 400;
        line-height: 44px;
        color: #ffffff;
        padding: 96px 0 24px;
      }
      .aboutUs_font_z {
        font-size: 44px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 20px;
      }
      .aboutUs_font_b {
        display: flex;
        justify-content: space-between;
        .aboutUs_l {
          margin-top: 40px;
          p {
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            color: #ffffff;
            margin-bottom: 24px;
          }
        }
        // .aboutUs_r {
        // }
      }
    }
  }
  .incident {
    margin: 0 auto;
    width: 1164px;
    display: flex;
    justify-content: space-between;
    .incident_l {
      .incident_l_header {
        font-size: 28px;
        font-weight: 500;
        line-height: 28px;
        color: #303133;
        margin-bottom: 40px;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
      }
      ul {
        li {
          display: flex;
          margin-bottom: 4px;
          div:nth-child(1) {
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            height: 20px;
            color: #3b7cfb;
            font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
            width: 87px;
          }
          div:nth-child(2) {
            background: url("../../assets/seckill/组 8497@2x.png") no-repeat;
            background-size: 20px 84px;
            width: 20px;
            height: 84px;
            margin: 0 18px 0 12px;
          }
          div:nth-child(3) {
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            height: 20px;
            color: #303133;
          }
        }
      }
    }
    .incident_r {
      width: 478px;
      height: 640px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
