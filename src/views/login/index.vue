<template>
  <div class="login">
    <div class="login_bg">
      <div class="login_cont">
        <div class="login_img">
          <img src="../../assets/login/组 8599.png" alt="" />
        </div>
        <div class="login_import">
          <div class="login_cut">
            <div
              :class="{ login_cut_status: loginCutstatus == '1' }"
              class="login_cut_tel"
              @click="loginCut(1)"
            >
              手机登录
            </div>
            <div
              :class="{ login_cut_status: loginCutstatus == '2' }"
              class="login_cut_pass"
              @click="loginCut(2)"
            >
              密码登录
            </div>
            <div
              :class="{ login_cut_status: loginCutstatus == '3' }"
              class="login_cut_pass"
              @click="loginCut(3)"
            >
              微信登录
            </div>
          </div>
          <div class="login_input_recoin" v-if="loginCutstatus == '1'">
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
            <div v-if="recoinError" class="login_error">
              请输入正确的手机号码
            </div>
          </div>
          <div class="login_input_number" v-else>
            <div class="login_input_number_correct">
              <input
                v-model="IdNumber"
                type="text"
                placeholder="请输入您的账号"
              />
            </div>
            <div v-if="numberError" class="login_error">账号不能为空</div>
          </div>
          <div class="login_input_auth" v-if="loginCutstatus == '1'">
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

            <div v-if="authError" class="login_error">请输入正确的验证码</div>
          </div>
          <div class="login_input_password" v-else>
            <div class="login_input_password_correct">
              <div class="login_input_password_l">
                <input
                  v-model="passWord"
                  :type="inputType"
                  placeholder="请输入您的密码"
                />
              </div>
              <div
                :class="
                  inputType == 'type'
                    ? 'login_input_password_eye'
                    : 'login_input_password_cleye'
                "
                @click="changeEye"
              ></div>
            </div>
            <div v-if="passwordError" class="login_error">
              密码8-16位字母数字组合
            </div>
          </div>
          <div class="login_into" @click="immediately">立即登录</div>
          <div class="login_else">
            <div class="login_else_l" @click="goRegister">
              <div></div>
              <div>新用户注册</div>
            </div>
            <div class="login_else_c" @click="goRegister2">
              <div></div>
              <div> Registing（Email）</div>
            </div>
            <div
              v-if="loginCutstatus == '2'"
              @click="alterpassword"
              class="login_else_c"
            >
              忘记密码？
            </div>
            <div v-else class="login_else_c" style="width: 70px"></div>
            <div class="login_else_r" @click="impower">
              <div></div>
              <div>微信登录</div>
            </div>
          </div>
          <div class="login_agreement">
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
import axios from 'axios'
export default {
  inject: ['reload'],
  data() {
    return {
      options: [],
      value: 152,
      loginCutstatus: '1',
      authCodeStutas: true,
      inputType: 'password',
      tellNumber: '',
      authNumber: '',
      IdNumber: '',
      passWord: '',
      phoneCode: '',
      recoinError: false,
      authError: false,
      numberError: false,
      passwordError: false,
    }
  },
  mounted() {
    this.options = JSON.parse(sessionStorage.getItem('options'))
  },
  watch: {
    tellNumber(newValue) {
      let reg = /^1[1356789]\d{9}$/
      if (reg.test(newValue) && newValue.length == 11) {
        this.recoinError = false
      }
    },
    authNumber(newValue) {
      if (newValue) {
        this.authError = false
      }
    },
    IdNumber(newValue) {
      if (newValue) {
        this.numberError = false
      }
    },
    passWord(newValue) {
      if (newValue) {
        this.passwordError = false
      }
    },
  },
  methods: {
    impower() {
      //拉取授权页面
      let APPID = 'wxe76e2cf87e4bb1a9'
      let REDIRECT_URI = encodeURIComponent(
        'https://www.dylnet.cn/perfection'
      )
      // https://open.weixin.qq.com/connect/qrconnect?appid=wxe76e2cf87e4bb1a9&redirect_uri=https://www.dylnet.cn&response_type=code&scope=snsapi_login&state=dywl
      location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`
    },
    // 注册页面
    goRegister() {
      this.$router.push({
        path: '/register',
      })
    },
    goRegister2() {
      this.$router.push({
        path: '/register2',
      })
    },
    loginCut(id) {
      this.loginCutstatus = id
    },
    changeEye() {
      if (this.inputType == 'password') {
        this.inputType = 'type'
      } else {
        this.inputType = 'password'
      }
    },
    authCode() {
      if (this.authCodeStutas) {
        let reg = /^1[1356789]\d{9}$/
        if (reg.test(this.tellNumber) && this.tellNumber.length == 11) {
          this.authCodeStutas = false
          this.getInvitationcode()
        } else {
          this.recoinError = true
        }
      }
    },
    // 手机号登录短信验证
    async getInvitationcode() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue
        }
      })
      let res = await axios.get('https://www.dylnet.cn/api/sys/verify/code', {
        params: {
          type: 2,
          templateCode: 2,
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
    // 登录
    async immediately() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue
        }
      })
      if (this.loginCutstatus == '1') {
        if (!this.tellNumber) {
          this.recoinError = true
        }
        if (!this.authNumber) {
          this.authError = true
        }
        if (!this.authError && !this.recoinError) {
          // 47.101.56.77:10443/user/login
          let res = await axios.post('https://www.dylnet.cn/api/sys/login/in', {
            type: 2,
            phoneCode: this.phoneCode,
            phoneNumber: this.tellNumber,
            verifyCode: this.authNumber,
            languageType: '0',
            channelId: '3',
          })

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
                name:
                  res.data.data.user.firstName + res.data.data.user.lastName,
              })
            )
            this.loginStatus = false
            this.$router.push({
              path: sessionStorage.getItem('fullpath'),
              query: JSON.parse(sessionStorage.getItem('fullquery')),
            })
            this.reload()
            this.$message.success('登录成功')
          } else {
            this.$message.error(res.data.message)
          }
        }
      } else {
        if (!this.IdNumber) {
          this.numberError = true
        }
        if (!this.passWord) {
          this.passwordError = true
        }
        if (!this.numberError && !this.passwordError) {
          let res = await axios.post('https://www.dylnet.cn/api/sys/login/in', {
            type: 1,
            accountId: this.IdNumber,
            password: this.passWord,
            languageType: '0',
            channelId: '3',
          })

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
                name:
                  res.data.data.user.firstName + res.data.data.user.lastName,
              })
            )
            this.loginStatus = false
            this.$router.push({
              path: sessionStorage.getItem('fullpath'),
              query: JSON.parse(sessionStorage.getItem('fullquery')),
            })
            this.reload()
            this.$message.success('登录成功')
            // this.$router.push({
            //   path: "/login",
            // });
          } else {
            this.$message.error(res.data.message)
          }
        }
      }
    },
    alterpassword() {
      this.$router.push({
        path: '/amendCode',
      })
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
  },
}
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

.login {
  .login_bg {
    width: 100%;
    height: 340px;
    background: url('../../assets/login/蒙版组 327.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 520px;
    .login_cont {
      display: flex;
      padding: 100px 0 0 0;
      margin: 0 auto;
      width: 836px;
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
        padding: 54px 56px 0;
        background: #fff;
        width: 436px;
        box-sizing: border-box;
        border-radius: 0 6px 6px 0;
        .login_error {
          color: #f56c6c;
          font-size: 12px;
          line-height: 12px;
          text-align: right;
          margin: -12px 10px 10px 0;
        }
        .login_cut {
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
          .login_cut_tel {
            width: 72px;
            height: 42px;
            font-size: 18px;
            line-height: 42px;
            color: #909399;
            margin-right: 32px;
            cursor: pointer;
          }
          .login_cut_pass {
            width: 72px;
            height: 42px;
            font-size: 18px;
            line-height: 42px;
            margin-right: 32px;
            color: #909399;
            cursor: pointer;
          }
          .login_cut_status {
            color: #4791ff;
            border-bottom: 2px solid #4791ff;
          }
        }
        .login_input_recoin {
          .login_input_recoin_correct {
            width: 324px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
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
        .login_input_number {
          .login_input_number_correct {
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
            input {
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              width: 280px;
              height: 42px;
              color: #000;
              border: none;
              padding: 0;
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
        .login_input_auth {
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
                width: 240px;
                height: 42px;
                color: #000;
                border: none;
                padding: 0;
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
              background: url('../../assets/login/蒙版组 141@2x.png') no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
              cursor: pointer;
              &:hover {
                width: 16px;
                height: 16px;
                background: url('../../assets/login/蒙版组 330@2x.png')
                  no-repeat;
                background-size: 16px 16px;
                margin-right: 14px;
              }
            }
            .login_input_password_eye {
              width: 16px;
              height: 16px;
              background: url('../../assets/login/组 8607@2x.png') no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
              cursor: pointer;
              &:hover {
                width: 16px;
                height: 16px;
                background: url('../../assets/login/组 8608@2x.png') no-repeat;
                background-size: 16px 16px;
                margin-right: 14px;
              }
            }
          }
        }
        .login_into {
          width: 100%;
          text-align: center;
          margin-bottom: 28px;
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
        .login_else {
          display: flex;
          justify-content: space-between;
          margin-bottom: 72px;
          .login_else_l {
            display: flex;
            cursor: pointer;
            div:nth-child(1) {
              width: 16px;
              height: 16px;
              background: url('../../assets/login/蒙版组 311@2x.png') no-repeat;
              background-size: 16px 16px;
              margin-right: 6px;
            }
            div:nth-child(2) {
              font-size: 14px;
              font-weight: 400;
              line-height: 16px;
              color: #4791ff;
              white-space: nowrap;
            }
            &:hover {
              div:nth-child(1) {
                width: 16px;
                height: 16px;
                background: url('../../assets/login/蒙版组 311@2x (1).png')
                  no-repeat;
                background-size: 16px 16px;
              }
              div:nth-child(2) {
                color: #376bc5;
              }
            }
          }
          .login_else_c {
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color: #909399;
            margin: 0 0px 0 20px;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: #376bc5;
            }
          }
          .login_else_r {
            display: flex;
            cursor: pointer;
            div:nth-child(1) {
              width: 16px;
              height: 16px;
              background: url('../../assets/login/蒙版组 315@2x.png') no-repeat;
              background-size: 16px 16px;
              margin-right: 6px;
            }
            div:nth-child(2) {
              font-size: 14px;
              font-weight: 400;
              line-height: 16px;
              color: #4791ff;
              white-space: nowrap;
            }
            &:hover {
              div:nth-child(1) {
                width: 16px;
                height: 16px;
                background: url('../../assets/login/蒙版组 315@2x (1).png')
                  no-repeat;
                background-size: 16px 16px;
              }
              div:nth-child(2) {
                color: #376bc5;
              }
            }
          }
        }
        .login_agreement {
          font-size: 12px;
          line-height: 12px;
          color: #909399;
          display: flex;
          justify-content: center;
          div:nth-child(2),
          div:nth-child(4) {
            a {
              color: #4791ff;
              margin: 0 8px;
            }
          }
        }
      }
    }
  }
}
</style>
