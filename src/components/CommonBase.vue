<template>
  <div class="CommonBase">
    <div class="Base_content">
      <div class="Base_content_relation">
        <div class="relation_title">联系信息</div>
        <div class="relation_address">
          地址： 上海市宝山区友谊路钢领2号楼1503-1504
        </div>
        <div class="relation_tel">电 话：(+86) 400-9009-618</div>
        <div class="relation_mailbox">邮 箱： lhsco@luhaisco.com</div>
      </div>
      <div class="Base_content_serve">
        <div class="serve_title">产品服务</div>
        <div class="serve_alike">海运整箱</div>
        <div class="serve_alike">集装箱买卖</div>
        <div class="serve_alike">散杂货运输</div>
      </div>
      <div class="Base_content_About">
        <div class="About_title">关于我们</div>
        <div class="About_alike">公司动态</div>
        <div class="About_alike">行业资讯</div>
      </div>
      <div class="Base_content_labourWx">
        <div class="labourWx_title">客服微信</div>
        <div class="labourWx_img">
          <img src="../assets/homepage/图像 52@2x.png" alt="" />
        </div>
        <div class="labourWx_txt">扫描二维码添加客服微信</div>
      </div>
      <div class="Base_content_labourWx">
        <div class="labourWx_title">微信公众号</div>
        <div class="labourWx_img">
          <img src="../assets/homepage/组 7906@2x.png" alt="" />
        </div>
        <div class="labourWx_txt">扫描二维码关注我们</div>
      </div>
    </div>
    <div class="Base_bottom">
      COPYRIGHT &copy; 2021 上海道裕物流科技有限公司.
      <a href="https://beian.miit.gov.cn" target="_blank"
        >沪ICP备18047720号-2</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.CommonBase {
  width: 100%;
  background: #253650;
  .Base_content {
    box-sizing: border-box;
    height: 480px;
    padding-top: 78px;
    width: 1164px;
    margin: 0 auto;
    display: flex;
    .Base_content_relation {
      .relation_title {
        font-size: 16px;
        line-height: 16px;
        font-weight: 400;
        color: #5197ff;
        margin-bottom: 24px;
      }
      .relation_address {
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 28px;
      }
      .relation_tel {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #ffffff;
        margin-bottom: 28px;
      }
      .relation_mailbox {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #ffffff;
        margin-bottom: 28px;
      }
    }
    .Base_content_serve {
      margin-left: 80px;
      .serve_title {
        font-size: 16px;
        line-height: 16px;
        font-weight: 400;
        color: #5197ff;
        margin-bottom: 24px;
      }
      .serve_alike {
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 28px;
        position: relative;
        padding-left: 12px;
        cursor: pointer;
        &:hover {
          color: #5197ff;
        }
      }
      .serve_alike::after {
        content: "";
        width: 8px;
        height: 8px;
        background: url("../assets/homepage/蒙版组 263@2x.png") no-repeat;
        background-size: 8px 8px;
        position: absolute;
        display: block;
        top: 50%;
        margin-top: -4px;
        left: 0;
      }
      .serve_alike:hover::after {
        background: url("../assets/homepage/蒙版组 263@2x (1).png") no-repeat;
        background-size: 8px 8px;
      }
    }
    .Base_content_About {
      margin-left: 114px;
      .About_title {
        font-size: 16px;
        font-weight: 400;
        color: #5197ff;
        line-height: 16px;
        margin-bottom: 24px;
      }
      .About_alike {
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 28px;
        position: relative;
        padding-left: 12px;
        cursor: pointer;
        &:hover {
          color: #5197ff;
        }
      }
      .About_alike::after {
        content: "";
        width: 8px;
        height: 8px;
        background: url("../assets/homepage/蒙版组 263@2x.png") no-repeat;
        background-size: 8px 8px;
        position: absolute;
        display: block;
        top: 50%;
        margin-top: -4px;
        left: 0;
      }
      .About_alike:hover::after {
        background: url("../assets/homepage/蒙版组 263@2x (1).png") no-repeat;
        background-size: 8px 8px;
      }
    }
    .Base_content_labourWx {
      margin-left: 124px;
      .labourWx_title {
        font-size: 16px;
        line-height: 16px;
        font-weight: 400;
        color: #5197ff;
        margin-bottom: 24px;
      }
      .labourWx_img {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .labourWx_txt {
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .Base_bottom {
    text-align: center;
    height: 40px;
    background: #202f44;
    font-size: 12px;
    line-height: 40px;
    color: #ffffff;
    a {
      color: #ffffff;
    }
  }
}
</style>
