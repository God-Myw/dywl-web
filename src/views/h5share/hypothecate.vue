<template>
  <div class="hypothecate" :class="{ intervoyageinland: clientSide }">
    <div class="service_bg">
      <div class="service_table">
        <div class="tab-title">基本信息</div>
        <van-form>
          <van-field
            v-model="field.companyName"
            label="申请公司名"
            name="申请公司名"
            placeholder="请填写公司名称"
            :rules="[{ required: true, message: '' }]"
          />
          <van-field
            v-model="field.address"
            label="联系地址"
            name="联系地址"
            placeholder="请填写地址"
            :rules="[{ required: true, message: '' }]"
          />
          <van-field
            v-model="field.contacter"
            label="联系人姓名"
            name="联系人姓名"
            placeholder="请填写姓名"
            :rules="[{ required: true, message: '' }]"
          />
          <van-field
            v-model="field.phoneNumber"
            label="联系人电话"
            name="联系人电话"
            placeholder="请填写电话"
            :rules="[{ required: true, message: '' }]"
          />

          <van-field
            v-model="field.email"
            label="邮箱"
            name="邮箱"
            placeholder="请填写邮箱"
            :rules="[{ required: true, message: '' }]"
          />
          <van-field name="营业执照" label="营业执照">
            <template #input>
              <van-uploader v-model="field.picList" :after-read="afterRead" />
            </template>
          </van-field>
        </van-form>
      </div>
      <div class="service_table">
        <div class="tab-title">融资需求</div>
        <div class="tab-financing">
          <div class="fina-l">上一年海运费总收入</div>
          <div class="fina-r">
            <div class="fina-inpt">
              <van-cell-group>
                <van-field v-model="field.annualIncome" input-align="right" />
              </van-cell-group>
            </div>
            <div class="fina-text">万美元</div>
          </div>
        </div>
        <div class="tab-nid" @click="opensheet">
          <div class="tab-hope">希望融资</div>
          <div class="tab-input">
            <div class="tab-input-l" v-if="field.needMoney">
              {{ field.needMoney }}
              <div v-if="radio == 0">万元</div>
              <div v-else>万美元</div>
            </div>
            <div class="tab-input-r" v-else>请输入金额</div>
          </div>
          <div class="tab-money"></div>
        </div>
      </div>
      <div class="box-sign">
        <i style="color: red">*</i>
        注：以上申请信息请真实填写,才能保证银行审核通过
      </div>
      <div class="box"></div>
    </div>
    <div class="relation" :class="{ intervoyage: clientSide }">
      <div class="phone" @click="teleDig = true">
        <div></div>
        <div>拨打400热线</div>
      </div>
      <div class="intention" @click="onSubmit">立即申请</div>
    </div>
    <van-action-sheet v-model="showsheet" title="希望融资金额">
      <div class="content">
        <div class="content-money">选择货币</div>
        <div class="content-change">
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="0">人民币</van-radio>
            <van-radio name="1">美元</van-radio>
          </van-radio-group>
        </div>
        <div class="content-hope">
          <div>希望融资</div>
          <div>
            <van-cell-group>
              <van-field v-model="field.needMoney" />
            </van-cell-group>
          </div>
          <div v-if="radio == 0">万元</div>
          <div v-else>万美元</div>
        </div>
        <div class="content-btn" @click="closesheet">确认</div>
      </div>
    </van-action-sheet>
    <van-popup class="popup" v-model="popupStutas">
      <div>提交成功</div>
      <div>
        您的申请提交成功，我们将尽快联系您，以安排上门让您填写更详情的纸质申请材料，谢谢！
      </div>
      <div @click="popupStutas = false">我知道了</div>
    </van-popup>
    <van-dialog
      v-model="teleDig"
      title="拨打客服电话"
      :show-confirm-button="false"
    >
      <div class="teletxt">
        我们即将为您拨打<span style="color: #4088f4; padding-left: 10px"
          >400-9009-618</span
        >
      </div>
      <div class="telebtn">
        <div @click="teleDig = false">取消</div>
        <div @click="Calltele">立即拨打</div>
      </div>
    </van-dialog>
    <van-dialog
      v-model="show"
      title="是否打开道裕物流App"
      :show-confirm-button="false"
    >
      <div class="btnCs">
        <div class="btn-left" @click="btndis">取消</div>
        <div>
          <wx-open-launch-app
            id="launch-btn"
            @error="handleErrorFn"
            @launch="handleLaunchFn"
            appid="wx03327e343064e998"
          >
            <script type="text/wxtag-template">
              <style>.btn { color: #fff;padding: 6px 38px;border: 1px solid #4088F4;background: #4088F4;font-size: 16px; border-radius: 18px;}</style>
              <div class="btn">确定</div>
            </script>
          </wx-open-launch-app>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import CallApp from "callapp-lib";
import { Form, Field, ActionSheet, Popup, RadioGroup, Radio } from "vant";

Vue.use(Popup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Field).use(Form).use(ActionSheet);
import axios from "axios";
import { webGetWXDetail } from "../../api/h5share";
export default {
  data() {
    return {
      clientSide: false,
      dataList: [],
      teleDig: false,
      show: false,
      showsheet: false,
      popupStutas: false,
      radio: "1",
      countIndex: 3,
      field: {
        companyName: "",
        address: "",
        contacter: "",
        phoneNumber: "",
        email: "",
        picList: [],
        annualIncome: "",
        needMoney: "",
      },
    };
  },
  mounted() {
    // this.getList();
    this.getweChatPay();
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
    afterRead(file, detail) {
      // 此时可以自行将文件上传至服务器
      // 1.先判断是否是单个对象
      // 2.否则就是数组，需要遍历进行转换，再上传（当然，如果你们接口支持同时传多个到服务器，就需要对后面的逻辑进行修改）
      if (!Array.isArray(file)) {
        this.uploadImgFun(file.content);
      } else {
        for (let i = 0; i < file.length; i++) {
          if (this.field.picList.length + i >= this.countIndex) {
            Toast("最多上传3张图片");
            break;
          } else {
            this.uploadImgFun(file[i].content);
          }
        }
      }
    },
    uploadImgFun(content) {
      // 再做一次最大张数图片的判断，避免异步偷跑
      if (this.field.picList.length >= 3) {
        Toast("最多上传9张图片");
        return;
      }
      // 创建表单数据格式，以表单的数据传递，对该表单进行添加参数
      let formData = new FormData();
      // formData.append("参数名1", "参数值1");
      // formData.append("参数名2", "参数值2");
      // formData.append("参数名3", "参数值3");
      formData.append("file", this.dataURLtoFileFun(content, "file.jpg"));
      // 注意需要在调用接口的时候修改请求头为"multipart/form-data"，以表单的格式上传
      console.log(formData.getAll("file"));
    },
    // bae64转文件对象
    dataURLtoFileFun(dataurl, filename) {
      // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    openApp() {
      this.show = true;
    },
    handleErrorFn() {
      const options = {
        scheme: {
          // 用来配置 URL Scheme 所必须的那些字段
          protocol: "DYLogisticsApp://", // APP 协议，就是你要打开的 APP 的标识 DYLogisticsApp://
        },
        appstore: "https://apps.apple.com/cn/app/id1493154544", // appstore的下载地址
        yingyongbao:
          "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 应用宝的下载地址
        fallback:
          "https://a.app.qq.com/o/simple.jsp?pkgname=com.luhaisco.dywl&fromcase=40003", // 唤端失败后跳转的地址
      };
      new CallApp(options).open({ path: "" });
    },
    handleLaunchFn() {
      this.show = false;
    },
    btndis() {
      this.show = false;
    },
    Calltele() {
      window.location.href = "tel://400-9009-618";
    },
    opensheet() {
      this.showsheet = true;
    },
    closesheet() {
      this.showsheet = false;
    },

    async onSubmit() {
      let res = await axios.post(
        "https://www.dylnet.cn/api/business/financial/saveFinancialkUser",
        {
          companyName: this.field.companyName,
          address: this.field.address,
          contacter: this.field.contacter,
          phoneNumber: this.field.phoneNumber,
          email: this.field.email,
          // picList: this.field.picList,
          annualIncome: this.field.annualIncome,
          needMoney: this.field.needMoney,
          moneyType: this.radio,
        }
      );
      if (res.data.code == "0000") {
        this.popupStutas = true;
      } else {
      }
    },
    async getweChatPay() {
      webGetWXDetail({
        url: window.location.href.split("#")[0],
      }).then((res) => {
        if (res.code == "0000") {
          //通过config接口注入权限验证配置
          // eslint-disable-next-line no-undef
          wx.config({
            debug: false,
            appId: "wx3c5d7c6f964f3094",
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
            openTagList: ["wx-open-launch-app"],
          });
          // eslint-disable-next-line no-undef
          wx.ready(function () {
            var s_title = "海运费垫付金融产品", // 分享标题
              s_link = "https://www.dylnet.cn/#/h5share/hypothecate", // 分享链接
              s_desc =
                "银行为货代提供年化3-5%的无抵押授信，见票即垫付。申请简便，额度上不封顶", //分享描述
              s_imgUrl = "https://www.dylnet.cn/container/img/蒙版组 360.png"; // 分享图标
            // eslint-disable-next-line no-undef
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
  },
};
</script>

<style lang="scss" scoped>
.tyzt-zht {
  font-family: "tyzt-zht", Arial;
}
/deep/.van-dialog {
  border-radius: 5px;
}
/deep/.van-hairline--top-bottom::after {
  border-width: 0px;
}
/deep/.popup {
  padding: 0 31px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  div:nth-child(1) {
    margin: 20px 0 8px;
    font-size: 18px;
    font-family: "tyzt-zht", Arial;
    font-weight: normal;
    color: #333333;
  }
  div:nth-child(2) {
    width: 238px;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  }
  div:nth-child(3) {
    display: inline-block;
    margin: 16px 0 20px;
    background: #4088f4;
    border-radius: 16px;
    padding: 6px 36px;
    font-size: 16px;
    color: #ffffff;
  }
}
.hypothecate {
  .service_bg {
    background: url("../../assets/container/蒙版组 361@2x.png") no-repeat;
    background-size: 100% 484px;
    width: 100%;
    height: 484px;
    padding: 365px 10px 0;
    .service_table {
      border-radius: 10px;
      background: #fff;
      margin-bottom: 10px;
      padding-bottom: 14px;
      .tab-title {
        padding: 17px 0 7px 16px;
        font-family: "tyzt-zht", Arial;
        color: #333333;
        font-size: 16px;
        line-height: 24px;
      }
      .tab-financing {
        display: flex;
        padding: 0 16px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        .fina-l {
          font-size: 14px;
          font-weight: normal;
          color: #333333;
        }
        .fina-r {
          display: flex;
          align-items: center;
          .fina-inpt {
            /deep/.van-field__control {
              color: #e6531d;
              width: 80px;
              font-size: 16px;
              border: none;
            }
          }
          .fina-text {
            font-size: 14px;
            font-weight: normal;
            color: #333333;
          }
        }
      }
      .tab-nid {
        display: flex;
        padding: 13px 16px;
        align-items: center;
        justify-content: space-between;
        .tab-hope {
          font-size: 14px;
          font-weight: normal;
          color: #333333;
        }
        .tab-input {
          .tab-input-l {
            display: flex;
            font-size: 16px;
            font-weight: normal;
            color: #e6531d;
          }
          .tab-input-r {
            font-size: 14px;
            font-weight: normal;
            color: #cccccc;
          }
        }
        .tab-money {
          background: url("../../assets/container/路径 3466@2x.png") no-repeat;
          background-size: 6px 10px;
          width: 6px;
          height: 10px;
        }
      }
    }

    .box-sign {
      font-size: 12px;
      line-height: 20px;
      color: #666666;
      text-align: center;
    }
    .box {
      height: 120px;
    }
  }
  .relation {
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    padding: 10px 10px 40px 16px;
    align-items: center;
    justify-content: space-between;
    .phone {
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-child(1) {
        background: url("../../assets/container/组 10346@2x.png") no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
      div:nth-child(2) {
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        font-family: "tyzt-zht", Arial;
        color: #333333;
      }
    }
    .intention {
      line-height: 22px;
      font-size: 16px;
      padding: 9px 95px;
      color: #ffffff;
      background: linear-gradient(270deg, #0762f5 0%, #219cff 100%);
      border-radius: 6px;
    }
  }
  .intervoyage {
    width: 375px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.btnCs {
  display: flex;
  margin: 20px 0 28px 0;
  justify-content: center;
  .btn-left {
    margin-right: 32px;
    font-size: 14px;
    line-height: 32px;
    border-radius: 18px;
    padding: 0 36px;
    color: #4088f4;
    border: 1px solid #4088f4;
  }
}
.teletxt {
  text-align: center;
  margin: 12px 0 20px 0;
  font-size: 14px;
}
.telebtn {
  display: flex;
  justify-content: center;
  margin-bottom: 17px;
  div {
    border-radius: 18px;
    // height: 28px;
    font-size: 14px;
    line-height: 28px;
  }
  div:nth-child(1) {
    margin-right: 28px;
    padding: 0 36px;
    color: #4088f4;
    border: 1px solid #4088f4;
  }
  div:nth-child(2) {
    color: #fff;
    padding: 0 23px;
    background: #4088f4;
  }
}
.content {
  padding: 0 28px;
  .content-money {
    font-size: 16px;
    font-family: "tyzt-zht", Arial;
    color: #333333;
    padding: 13px 0;
  }
  .content-change {
    margin-bottom: 15px;
  }
  .content-hope {
    display: flex;
    align-items: center;
    margin-bottom: 112px;
    div {
      font-size: 14px;
      font-weight: normal;
      color: #333333;
    }

    div:nth-child(2) {
      /deep/.van-field__control {
        color: #e6531d;
        font-size: 20px;
        width: 120px;
        height: 40px;
        background: #f1f3f5;
        padding: 0 0 0 15px;
      }
    }
  }
  .content-btn {
    background: #4486f6;
    padding: 11px 140px;
    border-radius: 24px;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 40px;
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
