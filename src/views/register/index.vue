<template>
  <div class="register">
    <div class="register_bg">
      <div class="login_cont">
        <div class="login_img">
          <img src="../../assets/login/组 8599.png" alt="" />
        </div>
        <div class="login_import">
          <div class="login_else">
            <div class="login_else_r" @click="impower">
              <div></div>
              <div>微信登录</div>
            </div>
            <div class="login_else_c">
              <div>已有账号</div>
              <div @click="goLogin">立即登录</div>
            </div>
          </div>
          <div class="login_identity">
            <div class="login_identity_correct">
              <el-select
                v-model="identity"
                placeholder="请选择注册身份"
                style="width: 324px"
              >
                <el-option label="货主" value="4"></el-option>
                <el-option label="船东" value="5"></el-option>
              </el-select>
            </div>

            <div v-if="identityError" class="login_error">请选择身份</div>
          </div>
          <div class="login_ID">
            <div class="login_ID_correct">
              <el-input
                v-model="accountID"
                placeholder="账号8-15位，建议用手机号，无特殊字符"
                style="width: 324px"
              ></el-input>
            </div>

            <div v-if="accountIDError" class="login_error">
              账号不能为空，建议用手机号
            </div>
          </div>
          <div class="login_input_recoin">
            <div class="login_input_recoin_correct">
              <div class="recoin_zone">
                <el-select v-model="value">
                  <el-option
                    v-for="item in options"
                    :key="item.code"
                    :label="item.textValue"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="recoin_flagstaff"></div>
              <div class="recoin_input">
                <input
                  v-model="tellNumber"
                  type="text"
                  placeholder="请输入您的手机号"
                />
              </div>
            </div>

            <div v-if="tellNumberError" class="login_error">
              请输入正确的手机号码
            </div>
          </div>
          <div class="login_input_auth">
            <div class="login_input_auth_correct">
              <div class="auth_input">
                <input v-model="authNumber" placeholder="请输入验证码" />
              </div>
              <div class="auth_flagstaff"></div>
              <div class="auth_authCode" @click="authCode">
                <div v-if="authCodeStutas">获取验证码</div>
                <div v-else style="color: #4791ff">再次获取{{ time }}s</div>
              </div>
            </div>

            <div v-if="authNumberError" class="login_error">
              请输入正确的验证码
            </div>
          </div>
          <div class="login_input_password">
            <div class="login_input_password_correct">
              <div class="login_input_password_l">
                <input
                  v-model="passWord"
                  :type="inputType"
                  placeholder="密码8-16位字母数字组合，无特殊字符"
                />
              </div>
              <div
                @click="changeEye"
                :class="
                  inputType == 'type'
                    ? 'login_input_password_eye'
                    : 'login_input_password_cleye'
                "
              ></div>
            </div>

            <div v-if="passWordError" class="login_error">
              密码8-16位字母数字组合
            </div>
          </div>

          <div class="login_into" @click="goRegister">立即注册</div>
          <div class="login_agreement">
            <el-checkbox v-model="checked"></el-checkbox>
            <div>登录注册代表同意</div>
            <div>
              <a
                href="https://dylnet.cn/api/sys/ServiceAgreement"
                target="_blank"
                >道裕物流服务协议</a
              >
            </div>
            <div>和</div>
            <div>
              <a href="https://dylnet.cn/Privacy.html" target="_blank"
                >隐私政策</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      authCodeStutas: true,
      time: 60,
      inputType: "password",
      checked: true,
      identity: "",
      accountID: "",
      tellNumber: "",
      authNumber: "",
      passWord: "",
      phoneCode: "",
      options: [],
      value: 152,
      identityError: false,
      accountIDError: false,
      tellNumberError: false,
      authNumberError: false,
      passWordError: false,
    };
  },
  mounted() {
    this.options = JSON.parse(sessionStorage.getItem("options"));
    // this.getareaCode();
  },
  watch: {
    identity(newValue) {
      if (newValue) {
        this.identityError = false;
      }
    },
    accountID(newValue) {
      if (newValue) {
        this.accountIDError = false;
      }
    },
    tellNumber(newValue) {
      if (newValue) {
        this.tellNumberError = false;
      }
    },
    authNumber(newValue) {
      if (newValue) {
        this.authNumberError = false;
      }
    },
    passWord(newValue) {
      if (newValue) {
        this.passWordError = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem("fullpath", from.path);
    sessionStorage.setItem("fullquery", JSON.stringify(from.query));
    next();
  },
  methods: {
    impower() {
      //拉取授权页面
      let APPID = "wxe76e2cf87e4bb1a9";
      let REDIRECT_URI = encodeURIComponent(
        "https://www.dylnet.cn/#/perfection"
      );
      // https://open.weixin.qq.com/connect/qrconnect?appid=wxe76e2cf87e4bb1a9&redirect_uri=https://www.dylnet.cn&response_type=code&scope=snsapi_login&state=dywl
      location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;
    },
    authCode() {
      if (this.authCodeStutas) {
        let reg = /^1[1356789]\d{9}$/;
        if (reg.test(this.tellNumber) && this.tellNumber.length == 11) {
          this.authCodeStutas = false;
          this.getInvitationcode();
        } else {
          this.tellNumberError = true;
        }
      }
    },
    async getInvitationcode() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue;
        }
      });
      let res = await axios.get("https://www.dylnet.cn/api/sys/verify/code", {
        params: {
          type: 2,
          templateCode: 4,
          languageType: 0,
          phoneNumber: this.tellNumber,
          phoneCode: this.phoneCode,
        },
      });
      if (res.data.code == "0000") {
        this.IntTime();
        this.authCodeStutas = false;
      }
    },
    // 倒计时
    IntTime() {
      let timer = setInterval(() => {
        this.time--;
        this.time = this.time >= 0 ? this.time : 0;
        if (this.time == 0) {
          clearInterval(timer);
          this.authCodeStutas = true;
          this.time = 60;
        }
      }, 1000);
    },
    changeEye() {
      if (this.inputType == "password") {
        this.inputType = "type";
      } else {
        this.inputType = "password";
      }
    },
    // 获取+86
    // async getareaCode() {
    //   let res = await axios.get("https://www.dylnet.cn/api/sys/dict/all", {
    //     params: {
    //       type: 1,
    //     },
    //   });
    //   if (res.data.code == "0000") {
    //     this.options = res.data.data.zh[21].items;
    //     this.value = 152;
    //   }
    // },
    // 登录页面
    goLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 注册
    async goRegister() {
      if (!this.identity) {
        this.identityError = true;
      }
      if (!this.accountID) {
        this.accountIDError = true;
      }
      if (!this.tellNumber) {
        this.tellNumberError = true;
      }
      if (!this.authNumber) {
        this.authNumberError = true;
      }
      let pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (!this.passWord || !pass.test(this.passWord)) {
        this.passWordError = true;
      }
      if (!this.checked) {
        this.$message.error("请先勾选同意服务协议！");
      }
      if (
        !this.identityError &&
        !this.accountIDError &&
        !this.tellNumberError &&
        !this.authNumberError &&
        !this.passWordError &&
        this.checked
      ) {
        let res = await axios.post(
          "https://www.dylnet.cn/api/sys/user/registerForWebByPromotionNew",
          {
            type: 1,
            accountId: this.accountID,
            password: this.passWord,
            phoneNumber: this.tellNumber,
            verifyCode: this.authNumber,
            userType: this.identity,
            phoneCode: this.phoneCode,
          }
        );

        if (res.data.code == "0000") {
          this.$message.success(res.data.message);
          this.$router.push({
            path: "/login",
          });
        } else {
          this.$message.error(res.data.message);
        }
      }
    },
  },
};
</script>
<style lang="scss">
.el-message {
  min-width: 0;
}
</style>
<style lang="scss" scoped>
/deep/.el-input__inner {
  height: 44px;
  line-height: 44px;
}

.login_input_recoin {
  /deep/.el-select {
    .el-input__inner {
      border: none;
      padding: 0;
      width: 60px;
    }
    .el-input__icon {
      width: 14px;
    }
  }
}
.register {
  .register_bg {
    width: 100%;
    height: 340px;
    background: url("../../assets/login/蒙版组 327.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 520px;
    .login_cont {
      padding: 100px 0 0 0;
      margin: 0 auto;
      width: 836px;
      display: flex;
      box-shadow: 0px 4px 20px rgba(69, 81, 104, 0.16);
      .login_img {
        flex-shrink: 0;
        width: 400px;
        height: 581px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .login_import {
        // padding: 40px 56px 0;
        width: 436px;
        box-sizing: border-box;
        background: #fff;
        .login_error {
          color: #f56c6c;
          font-size: 12px;
          line-height: 12px;
          text-align: right;
          margin: -14px 10px 8px 0;
        }
        .login_else {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
          box-sizing: border-box;
          padding: 40px 56px 0;
          .login_else_r {
            display: flex;
            cursor: pointer;
            div:nth-child(1) {
              width: 16px;
              height: 16px;
              background: url("../../assets/login/蒙版组 315@2x.png") no-repeat;
              background-size: 16px 16px;
              margin-right: 6px;
            }
            div:nth-child(2) {
              font-size: 14px;
              font-weight: 400;
              line-height: 16px;
              color: #4791ff;
            }
            &:hover {
              div:nth-child(1) {
                width: 16px;
                height: 16px;
                background: url("../../assets/login/蒙版组 315@2x (1).png")
                  no-repeat;
                background-size: 16px 16px;
              }
              div:nth-child(2) {
                color: #376bc5;
              }
            }
          }
          .login_else_c {
            display: flex;
            font-size: 14px;
            line-height: 16px;
            color: #909399;
            div:nth-child(2) {
              margin-left: 12px;
              color: #4791ff;
              cursor: pointer;
            }
          }
        }
        .login_identity {
          margin: 0 56px;

          .login_identity_correct {
            margin-bottom: 20px;
          }
        }
        .login_ID {
          margin: 0 56px;
          .login_ID_correct {
            margin-bottom: 20px;
          }
        }
        .login_input_recoin {
          margin: 0 56px;
          .login_input_recoin_correct {
            width: 324px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            display: flex;
            align-items: center;

            margin-bottom: 20px;
            &:hover {
              border: 1px solid #409eff;
            }
            .recoin_zone {
              margin-left: 20px;
              font-size: 14px;
              font-weight: 400;
              line-height: 14px;
              color: #303133;
              cursor: pointer;
            }
            .recoin_flagstaff {
              flex-shrink: 0;
              display: block;
              height: 28px;
              width: 2px;
              background: #dcdfe6;
              margin: 0 20px 0 10px;
            }
            .recoin_input {
              input {
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                color: #000;
                border: none;
                padding: 0;
                height: 42px;
              }
              input::-webkit-input-placeholder {
                color: #c0c4cc;
              }
              input:-moz-placeholder {
                /* FF 4-18 */
                color: #c0c4cc;
              }
              input::-moz-placeholder {
                /* FF 19+ */
                color: #c0c4cc;
              }
              input:focus {
                color: #303133;
                outline: none;
                background-color: transparent;
              }
            }
          }
        }
        .login_input_auth {
          margin: 0 56px;
          .login_input_auth_correct {
            width: 324px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-left: 20px;
            box-sizing: border-box;
            &:hover {
              border: 1px solid #409eff;
            }
            .auth_input {
              input {
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                color: #000;
                border: none;
                height: 42px;
                padding: 0;
                width: 192px;
              }
              input::-webkit-input-placeholder {
                color: #c0c4cc;
              }
              input:-moz-placeholder {
                /* FF 4-18 */
                color: #c0c4cc;
              }
              input::-moz-placeholder {
                /* FF 19+ */
                color: #c0c4cc;
              }
              input:focus {
                color: #303133;
                outline: none;
                background-color: transparent;
              }
            }
            .auth_flagstaff {
              flex-shrink: 0;
              display: block;
              height: 28px;
              width: 2px;
              background: #dcdfe6;
            }
            .auth_authCode {
              // padding-right: 16px;
              width: 92px;
              text-align: right;
              font-size: 14px;
              font-weight: 400;
              line-height: 42px;
              color: #4791ff;
              cursor: pointer;
            }
          }
        }
        .login_input_password {
          margin: 0 56px;
          .login_input_password_correct {
            width: 324px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-left: 20px;
            box-sizing: border-box;
            &:hover {
              border: 1px solid #409eff;
            }
            .login_input_password_l {
              input {
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                height: 42px;
                color: #000;
                border: none;
                padding: 0;
                width: 270px;
              }
              input::-webkit-input-placeholder {
                color: #c0c4cc;
              }
              input:-moz-placeholder {
                /* FF 4-18 */
                color: #c0c4cc;
              }
              input::-moz-placeholder {
                /* FF 19+ */
                color: #c0c4cc;
              }
              input:focus {
                color: #303133;
                outline: none;
                background-color: transparent;
              }
            }
            .login_input_password_cleye {
              width: 16px;
              height: 16px;
              background: url("../../assets/login/蒙版组 141@2x.png") no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
              cursor: pointer;
              &:hover {
                width: 16px;
                height: 16px;
                background: url("../../assets/login/蒙版组 330@2x.png")
                  no-repeat;
                background-size: 16px 16px;
                margin-right: 14px;
              }
            }
            .login_input_password_eye {
              width: 16px;
              height: 16px;
              background: url("../../assets/login/组 8607@2x.png") no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
              cursor: pointer;
              &:hover {
                width: 16px;
                height: 16px;
                background: url("../../assets/login/组 8608@2x.png") no-repeat;
                background-size: 16px 16px;
                margin-right: 14px;
              }
            }
          }
        }
        .login_into {
          width: 324px;
          text-align: center;
          margin: 0 56px;
          margin-bottom: 36px;
          background: linear-gradient(94deg, #59a4ff 0%, #3b7cfb 100%);
          font-size: 16px;
          line-height: 44px;
          color: #ffffff;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            background: #376bc5;
          }
        }
        .login_agreement {
          font-size: 14px;
          line-height: 16px;
          height: 16px;
          color: #909399;
          display: flex;
          justify-content: center;
          div:nth-child(2) {
            margin-left: 8px;
          }
          div:nth-child(3) {
            a {
              color: #4791ff;
              margin: 0 8px;
            }
            color: #4791ff;
          }

          div:nth-child(5) {
            a {
              color: #4791ff;
              margin-left: 8px;
            }
            color: #4791ff;
          }
        }
      }
    }
  }
}
</style>
