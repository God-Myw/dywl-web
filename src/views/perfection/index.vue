<template>
  <div class="login">
    <div class="login_bg" v-if="showPage">
      <div class="amendcode">
        <div class="amendcode_header">绑定手机&完善信息</div>
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
        <div class="amendcode_btn" @click="binding()">绑定并登录</div>
        <div class="amendcode_back" @click="goback">
          <div></div>
          <div>返回登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reloadHeader'],
  data() {
    return {
      authCodeStutas: true,
      time: 60,
      options: [],
      value: 152,
      tellNumber: '',
      authNumber: '',
      identity: '',
      phoneCode: '',
      unionid: '',
      showPage: false,
      tellNumberError: false,
      authNumberError: false,
      identityError: false,
    }
  },
  mounted() {
    this.options = JSON.parse(sessionStorage.getItem('options'))
    this.getWxLogin()
  },
  watch: {
    tellNumber(newValue) {
      if (newValue) {
        this.tellNumberError = false
      }
    },
    authNumber(newValue) {
      if (newValue) {
        this.authNumberError = false
      }
    },
    identity(newValue) {
      if (newValue) {
        this.identityError = false
      }
    },
  },
  methods: {
    async getWxLogin() {
      let res = await axios.get(
        'https://www.dylnet.cn/api/sys/login/getWxLoginWeb/' +
          this.$route.query.code,
        {
          params: {
            channelId: 3,
            deviceSn: '423153563243werr4123',
          },
        }
      )
      if (res.data.code == '0000') {
        if (res.data.data.code == '0001') {
          this.showPage = true
          this.unionid = res.data.data.unionid
        } else {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem(
            'roleinfo',
            JSON.stringify({
              accountId: res.data.data.user.accountId,
              checkStatus: res.data.data.user.checkStatus,
              userType: res.data.data.user.userType,
              phoneNumber: res.data.data.user.phoneNumber,
              email: res.data.data.user.email,
              name: res.data.data.user.firstName + res.data.data.user.lastName,
            })
          )
          this.reloadHeader()
          this.$router.push({
            path: '/index',
          })

          this.$message.success('登录成功')
        }
      }
    },
    async binding() {
      if (!this.identity) {
        this.identityError = true
      }
      if (!this.tellNumber) {
        this.tellNumberError = true
      }
      if (!this.authNumber) {
        this.authNumberError = true
      }
      if (
        !this.identityError &&
        !this.tellNumberError &&
        !this.authNumberError
      ) {
        let res = await axios.post(
          'https://www.dylnet.cn/api/sys/login/webAuthentication',
          {
            unionid: this.unionid,
            verifyCode: this.authNumber,
            userType: this.identity,
            channelId: '3',
            phoneNumber: this.tellNumber,
            phoneCode: this.phoneCode,
          }
        )
        if (res.data.code == '0000') {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem(
            'roleinfo',
            JSON.stringify({
              accountId: res.data.data.user.accountId,
              checkStatus: res.data.data.user.checkStatus,
              userType: res.data.data.user.userType,
              phoneNumber: res.data.data.user.phoneNumber,
              email: res.data.data.user.email,
              name: res.data.data.user.firstName + res.data.data.user.lastName,
            })
          )
          this.reloadHeader()
          this.$router.push({
            path: '/index',
          })
          this.$message.success('登录成功')
        }
      }
    },
    authCode() {
      if (this.authCodeStutas) {
        let reg = /^1[1356789]\d{9}$/
        if (reg.test(this.tellNumber) && this.tellNumber.length == 11) {
          this.authCodeStutas = false
          this.getInvitationcode()
        } else {
          this.tellNumberError = true
        }
      }
    },
    async getInvitationcode() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue
        }
      })
      let res = await axios.get('https://www.dylnet.cn/api/sys/verify/code', {
        params: {
          type: 2,
          templateCode: 4,
          languageType: 0,
          phoneNumber: this.tellNumber,
          phoneCode: this.phoneCode,
        },
      })
      if (res.data.code == '0000') {
        this.IntTime()
        this.authCodeStutas = false
      }
    },
    // 倒计时
    IntTime() {
      let timer = setInterval(() => {
        this.time--
        this.time = this.time >= 0 ? this.time : 0
        if (this.time == 0) {
          clearInterval(timer)
          this.authCodeStutas = true
          this.time = 60
        }
      }, 1000)
    },
    goback() {
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login_input_recoin {
  /deep/ .el-select {
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
    background: url('../../assets/login/蒙版组 327.png') no-repeat;
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
      height: 470px;
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
      .login_identity {
        margin: 0 56px;
        .login_identity_correct {
          margin-bottom: 24px;
        }
      }
      .amendcode_btn {
        margin: 32px 56px 0;
        height: 44px;
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
          background: url('../../assets/login/蒙版组 331@2x.png') no-repeat;
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
