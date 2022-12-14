<template>
  <div class="login">
    <div class="login_bg">
      <div class="amendcode">
        <div class="amendcode_header">设置新密码</div>
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
                placeholder="设置新密码"
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
            密码8-16位字母数字组合，无特殊字符
          </div>
        </div>
        <div class="login_input_password">
          <div class="login_input_password_correct">
            <div class="login_input_password_l">
              <input
                v-model="npassWord"
                :type="ninputType"
                placeholder="确认新密码"
              />
            </div>
            <div
              @click="nchangeEye"
              :class="
                ninputType == 'type'
                  ? 'login_input_password_eye'
                  : 'login_input_password_cleye'
              "
            ></div>
          </div>
          <div v-if="npassWordError" class="login_error">二次密码不相同</div>
        </div>
        <div class="amendcode_warning">
          注：密码8-16位字母数字组合，无特殊字符
        </div>
        <div class="amendcode_btn" @click="submit">确认提交</div>
        <div class="amendcode_back" @click="goback()">
          <div></div>
          <div>返回登录</div>
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
      options: [],
      value: 152,
      inputType: "password",
      ninputType: "password",
      tellNumber: "",
      authNumber: "",
      passWord: "",
      npassWord: "",
      phoneCode: "",
      tellNumberError: false,
      authNumberError: false,
      passWordError: false,
      npassWordError: false,
    };
  },
  mounted() {
    this.options = JSON.parse(sessionStorage.getItem("options"));
  },
  watch: {
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
    npassWord(newValue) {
      if (newValue) {
        this.npassWordError = false;
      }
    },
  },
  methods: {
    async submit() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue;
        }
      });
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
      if (!this.passWord) {
        this.passWordError = true;
      }
      if (this.passWord != this.npassWord) {
        this.npassWordError = true;
      }
      if (
        !this.tellNumberError &&
        !this.authNumberError &&
        !this.passWordError &&
        !this.npassWordError
      ) {
        let res = await axios.put(
          "https://www.dylnet.cn/api/sys/user/password/find",
          {
            type: 1,
            phoneCode: this.phoneCode,
            phoneNumber: this.tellNumber,
            phoneVerifyCode: this.authNumber,
            newPassword: this.passWord,
            repeatPassword: this.npassWord,
          }
        );
        if (res.data.code == "0000") {
          this.$router.go(-1);
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      }
    },
    // 手机号登录短信验证
    async getInvitationcode() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue;
        }
      });
      let res = await axios.get("https://www.dylnet.cn/api/sys/verify/code", {
        params: {
          type: 2,
          templateCode: 5,
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
    nchangeEye() {
      if (this.ninputType == "password") {
        this.ninputType = "type";
      } else {
        this.ninputType = "password";
      }
    },
    goback() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
/deep/.el-dialog {
  border-radius: 6px;
}
/deep/.el-dialog__header {
  padding: 0;
  .el-dialog__close {
    font-size: 30px;
  }
}
/deep/.el-dialog__body {
  padding: 0;
}
.login {
  .login_bg {
    width: 100%;
    height: 240px;
    background: url("../../assets/login/蒙版组 327.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 520px;
    padding-top: 100px;
    .login_error {
      color: #f56c6c;
      font-size: 12px;
      line-height: 12px;
      text-align: right;
      margin: -14px 10px 8px 0;
    }
    .amendcode {
      margin: 0 auto;
      width: 436px;
      height: 560px;
      background: #ffffff;
      box-shadow: 0px 4px 20px #45516829;
      border-radius: 6px;
      .amendcode_header {
        font-size: 24px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        color: #303133;
        padding: 36px 0 44px 0;
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
              background: url("../../assets/login/蒙版组 330@2x.png") no-repeat;
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
      .amendcode_warning {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #4791ff;
        padding-left: 58px;
        margin-bottom: 44px;
      }
      .amendcode_btn {
        margin: 0 56px;
        width: 324px;
        background: linear-gradient(94deg, #58a3ff 0%, #3b7cfb 100%);
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        line-height: 44px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 36px;
        cursor: pointer;
      }
      .amendcode_back {
        display: flex;
        margin-left: 56px;
        cursor: pointer;
        div:nth-child(1) {
          width: 16px;
          height: 16px;
          background: url("../../assets/login/蒙版组 331@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
          color: #4791ff;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
