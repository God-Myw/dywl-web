<template>
  <div class="leagueus" :class="{ intervoyageinland: clientSide }">
    <div class="leagueus-img1">
      <img src="../../assets/container/招商_01.jpg" alt="" />
    </div>
    <div class="leagueus-img2">
      <img src="../../assets/container/招商_02.jpg" alt="" />
    </div>
    <div class="leagueus-input">
      <div class="input-contact">
        <div>联系人：</div>
        <div>
          <input
            v-model="tellName"
            type="text"
            placeholder="请输入您的姓名或称呼"
          />
        </div>
      </div>
      <div class="input-tell">
        <div>联系方式：</div>
        <div>
          <input
            v-model="tellNumber"
            type="text"
            placeholder="请输入您的手机号"
          />
        </div>
      </div>
      <div class="input-agency">
        <div>代理类型：</div>
        <div>
          <van-field
            readonly
            clickable
            name="type"
            :value="agencyValue"
            placeholder="请选择代理类型"
            @click="agencyChange"
          />
        </div>
      </div>
      <div class="input-btn" @click="onSubmit"></div>
    </div>
    <div class="leagueus-img3">
      <img src="../../assets/container/招商_04.jpg" alt="" />
    </div>
    <div class="leagueus-img4">
      <img src="../../assets/container/招商_05.jpg" alt="" />
    </div>
    <van-action-sheet
      v-model="showType"
      title=""
      style="height: 40%; padding-bottom: 40px"
    >
      <div class="btn">
        <div @click="cancel" class="cancle">取消</div>
        <div @click="confirm" class="confirm">确定</div>
      </div>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in agencyList"
            clickable
            :key="index"
            :title="item.itemValue"
            @click="toggle(item, index)"
          >
            <template #right-icon>
              <van-checkbox :name="item.itemValue" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from "vue";

import {
  Dialog,
  Field,
  Button,
  Toast,
  ActionSheet,
  Search,
  Loading,
  CheckboxGroup,
  Checkbox,
} from "vant";
Vue.use(Dialog)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(ActionSheet)
  .use(Search)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Loading);
import { webGetWXDetail } from "../../api/h5share";
import axios from "axios";
export default {
  data() {
    return {
      clientSide: false,
      tellName: "",
      tellNumber: "",
      showType: false,
      result: [],
      agencyData: [],
      agencyValue: "",
      agencyList: [
        {
          itemCode: 1,
          itemValue: "船舶供应",
        },
        {
          itemCode: 2,
          itemValue: "航修服务",
        },
        {
          itemCode: 3,
          itemValue: "海运服务",
        },
        {
          itemCode: 4,
          itemValue: "其他服务",
        },
        {
          itemCode: 5,
          itemValue: "国外航空货代",
        },
        {
          itemCode: 6,
          itemValue: "国外海运货代",
        },
        {
          itemCode: 7,
          itemValue: "海外仓加盟商",
        },
        {
          itemCode: 8,
          itemValue: "国内仓加盟商",
        },
      ],
    };
  },
  mounted() {
    this.getweChatPay();

    if (this.getQueryVariable("contact")) {
      this.tellName = decodeURI(this.getQueryVariable("contact"));
    } else {
      this.tellName = "";
    }
    if (this.getQueryVariable("phone")) {
      this.tellNumber = this.getQueryVariable("phone");
    } else {
      this.tellNumber = "";
    }
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log('这是移动')
      this.clientSide = false;
    } else {
      this.clientSide = true;
    }
    // 设置单个页面的body的背景色
  },

  methods: {
    // 截取app传的token和参数
    getQueryVariable(variable) {
      // 获取？后参数的位置截取
      var query = window.location.href.substring(
        window.location.href.lastIndexOf("?") + 1
      );
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    async getweChatPay() {
      webGetWXDetail({
        url: window.location.href.split("#")[0],
      }).then((res) => {
        if (res.code == "0000") {
          //通过config接口注入权限验证配置
          wx.config({
            debug: false,
            appId: "wx3c5d7c6f964f3094",
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
            openTagList: ["wx-open-launch-app"],
          });
          wx.ready(function () {
            var s_title = "上海道裕物流-个人招商", // 分享标题
              s_link = "https://www.dylnet.cn/h5share/leagueus", // 分享链接
              s_desc =
                "塑环境，优服务，打造道裕全球物流平台，让世界没有难运的货", //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 359.png"; // 分享图标

            wx.updateAppMessageShareData({
              title: s_title, // 分享标题
              desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {},
            });
            wx.updateTimelineShareData({
              title: s_desc, // 分享标题
              // desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {
                // 设置成功
              },
            });
          });
        }
      });
    },
    onSubmit() {
      if (!this.tellName) {
        Toast("请输入联系人");
        return;
      }

      if (this.tellNumber) {
        let reg = /^1[1356789]\d{9}$/;
        if (reg.test(this.tellNumber) && this.tellNumber.length == 11) {
          if (this.result.length != 0) {
            this.achieve();
          } else {
            Toast("请选则代理类型");
          }
        } else {
          Toast("请输入正确的手机号");
        }
      } else {
        Toast("请输入联系方式");
      }
    },
    async achieve() {
      let res = await axios.post(
        "https://www.dylnet.cn/api/business/attractInvestment/saveAttractInvestment",
        {
          userName: this.tellName,
          phoneNumber: this.tellNumber,
          agentType: this.agencyValue,
        }
      );
      if (res.data.code == "0000") {
        Toast.success("申请已提交");
      } else {
        Toast(res.data.message);
      }
    },
    agencyChange() {
      this.showType = true;
    },
    toggle(item, index) {
      this.$refs.checkboxes[index].toggle();
      let arr = [];
      arr.push(item.itemValue);
      arr.map((ite, idx) => {
        if (this.agencyData.indexOf(ite) == -1) {
          this.agencyData.push(item.itemValue);
        } else if (this.agencyData.indexOf(ite) > -1) {
          this.agencyData.splice(this.agencyData.indexOf(ite), 1);
        }
      });
    },
    confirm() {
      this.showType = false;
      this.agencyValue = this.result.join();
    },
    cancel() {
      this.showType = false;
      this.result = [];
      this.agencyValue = "";
    },
  },
};
</script>


<style lang="scss" scoped>
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
.leagueus {
  .leagueus-img1 {
    height: 580px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }
  .leagueus-img2 {
    height: 380px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }
  .leagueus-input {
    padding: 0 30px;
    box-sizing: border-box;
    background: #d70601;
    border-radius: 0px 0px 0px 0px;
    .input-contact {
      margin-bottom: 16px;
      div:nth-child(1) {
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        line-height: 22px;
        margin-bottom: 6px;
      }
      div:nth-child(2) {
        input {
          font-size: 16px;
          font-weight: 400;
          height: 50px;
          width: 100%;
          background: #ffffff;
          border-radius: 7px;
          color: #333;
          border: none;
          box-sizing: border-box;
          padding-left: 20px;
        }
        input::-webkit-input-placeholder {
          font-size: 16px;
          color: #a38281;
        }
        input:-moz-placeholder {
          /* FF 4-18 */
          color: #a38281;
        }
        input::-moz-placeholder {
          /* FF 19+ */
          color: #a38281;
        }
        input:focus {
          color: #303133;
          outline: none;
          background-color: #ffffff;
        }
      }
    }
    .input-tell {
      margin-bottom: 16px;
      div:nth-child(1) {
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        line-height: 22px;
        margin-bottom: 6px;
      }
      div:nth-child(2) {
        input {
          font-size: 16px;
          font-weight: 400;
          height: 50px;
          width: 100%;
          background: #ffffff;
          border-radius: 7px;
          color: #333;
          border: none;
          box-sizing: border-box;
          padding-left: 20px;
        }
        input::-webkit-input-placeholder {
          font-size: 16px;
          color: #a38281;
        }
        input:-moz-placeholder {
          /* FF 4-18 */
          color: #a38281;
        }
        input::-moz-placeholder {
          /* FF 19+ */
          color: #a38281;
        }
        input:focus {
          color: #303133;
          outline: none;
          background-color: #ffffff;
        }
      }
    }
    .input-agency {
      margin-bottom: 32px;
      div:nth-child(1) {
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        line-height: 22px;
        margin-bottom: 6px;
      }
      div:nth-child(2) {
        .van-cell {
          border-radius: 7px;
          box-sizing: border-box;
          padding: 0 0 0 16px;
          /deep/.van-field__body {
            input {
              height: 50px;
              font-size: 16px;
              background: #ffffff;
              color: #333;
              border: none;
            }
            input::-webkit-input-placeholder {
              font-size: 16px;
              color: #a38281;
            }
            input:-moz-placeholder {
              /* FF 4-18 */
              color: #a38281;
            }
            input::-moz-placeholder {
              /* FF 19+ */
              color: #a38281;
            }
            input:focus {
              color: #303133;
              outline: none;
              background-color: #ffffff;
            }
          }
        }
      }
    }
    .input-btn {
      width: 100%;
      height: 54px;
      background: url("../../assets/container/组 10572@2x.png") no-repeat;
      background-size: 100% 54px;
    }
  }
  .leagueus-img3 {
    height: 717px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }
  .leagueus-img4 {
    height: 863px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
  }
  .cancle {
    padding: 15px 0px 15px 18px;
    font-size: 18px;
    color: #1989fa;
  }
  .confirm {
    padding: 15px 18px 15px 0px;
    font-size: 18px;
    color: #1989fa;
  }
}
</style>
