<template>
  <div class="dywl_header">
    <div class="CommonHeader">
      <div class="CommonHeader_left">
        <div class="CommonHeader_img">
          <img
            @click="goBack"
            src="../assets/homepage/蒙版组 257@2x.png"
            alt=""
          />
        </div>
        <div class="CommonHeader_tab">
          <ul>
            <li
              class="hoverEffect"
              :class="activeClass == 1 ? 'router-link-active' : ''"
              @click="gohome(1)"
            >
              首页
            </li>

            <li
              v-popover:popoverserve
              :class="activeClass == 2 ? 'router-link-active' : ''"
            >
              产品服务
            </li>
            <li
              v-popover:popovertool
              :class="activeClass == 3 ? 'router-link-active' : ''"
            >
              实用工具
            </li>
            <li
              class="hoverEffect"
              :class="activeClass == 4 ? 'router-link-active' : ''"
              @click="gohome(4)"
            >
              关于我们
            </li>
            <li
              class="hoverEffect"
              v-if="roleinfo.allianceStutas == 2"
              @click="gowalliance()"
            >
              加盟商
            </li>
            <li
              class="hoverEffect"
              :class="activeClass == 5 ? 'router-link-active' : ''"
              v-else
              @click="goworkbench"
            >
              工作台
            </li>
            <li
              class="hoverEffect"
              :class="activeClass == 6 ? 'router-link-active' : ''"
              @click="activeClass = 6"
            >
              中文
            </li>
            <li
              class="hoverEffect"
              :class="activeClass == 7 ? 'router-link-active' : ''"
              @click="activeClass = 7"
            >
              En
            </li>
          </ul>
        </div>
      </div>
      <div class="CommonHeader_right">
        <div class="CommonHeader_hotline">
          <span>咨询热线</span><span>400-9009-618</span>
        </div>
        <div class="CommonHeader_appdown">
          <div>App下载</div>
          <i></i>
          <div class="appdown_none">
            <div class="appdown_QRcode">
              <div class="appdown_QRcode_l">
                <div><img src="../assets/homepage/组 7975.png" alt="" /></div>
                <div>道裕智慧物流APP</div>
                <div>扫描上方二维码下载</div>
              </div>
              <div class="appdown_QRcode_r">
                <img src="../assets/homepage/蒙版组 265.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <!-- 登录成功头像 -->
        <HeaderLoginImg v-if="intoState"></HeaderLoginImg>
        <div class="CommonHeader_Btn" v-else>
          <div
            v-if="intoStutas == '1'"
            class="CommonHeader_login"
            @click="loginStatus = true"
          >
            注册<span style="padding: 0 5px">|</span>登录
          </div>
          <div
            v-if="intoStutas == '2'"
            class="CommonHeader_login"
            @click="goRegister"
          >
            注册
          </div>
          <div
            v-if="intoStutas == '3'"
            class="CommonHeader_login"
            @click="goLogin"
          >
            登录
          </div>
        </div>
      </div>
    </div>
    <el-popover
      ref="popoverserve"
      placement="bottom-start"
      width="390"
      trigger="hover"
      v-model="popoverStuts"
    >
      <div class="product_popover_menu">
        <div class="popover_menu_list">
          <div class="popover_title">集装箱现舱</div>
          <div class="popover_cont">
            <ul>
              <li
                v-for="(item, index) in popoverList"
                :key="index"
                :class="item.hotspan ? 'hotspan' : ''"
                @click="goPopoverlist(item.id)"
              >
                <span><img :src="item.url" alt="" /></span
                ><span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="popover_menu_list">
          <div class="popover_title">散杂货运输</div>
          <div class="popover_cont">
            <ul>
              <li
                v-for="(item, index) in palletList"
                :key="index"
                @click="goPopoverlist(item.id)"
              >
                <span><img :src="item.url" alt="" /></span
                ><span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="popover_menu_list">
          <div class="popover_title">其他服务</div>
          <div class="popover_cont">
            <ul>
              <li
                v-for="(item, index) in OtherServices"
                :key="index"
                @click="goPopoverlist(item.id)"
              >
                <span><img :src="item.url" alt="" /></span
                ><span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-popover>
    <!-- 实用工具 -->
    <el-popover
      ref="popovertool"
      placement="bottom-start"
      width="731"
      trigger="hover"
      v-model="popovertollStuts"
    >
      <div class="tool_popover_menu">
        <div class="popover_menu_list">
          <div class="popover_title">航运操作</div>
          <div class="popover_cont">
            <ul>
              <li @click="goportmessage()">
                <a class="hotspan">
                  <span
                    ><img
                      src="../assets/popover-menu/组 8396@2x.png"
                      alt="" /></span
                  ><span>港口信息</span>
                </a>
              </li>
              <li v-for="(item, index) in shippingList" :key="index">
                <a
                  :href="item.askip"
                  target="_blank"
                  :class="item.hotspan ? 'hotspan' : ''"
                >
                  <span><img :src="item.url" alt="" /></span
                  ><span>{{ item.title }}</span></a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="popover_menu_list">
          <div class="popover_title">海洋气象</div>
          <div class="popover_cont">
            <ul>
              <li v-for="(item, index) in marineList" :key="index">
                <a href="" :href="item.askip" target="_blank">
                  <span><img :src="item.url" alt="" /></span
                  ><span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-popover>
    <!-- 登录注册 -->
    <el-dialog
      :visible.sync="loginStatus"
      width="836px"
      top="20vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="closeFun()"
    >
      <div class="login_cont" v-if="cargoStutas">
        <div class="login_img">
          <img src="../assets/login/组 8598.png" alt="" />
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
              @click="impower"
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
          <div
            v-if="loginCutstatus == '2'"
            @click="alterpassword"
            class="login_forgetpw"
          >
            忘记密码？
          </div>
          <div class="login_into" @click="immediately">立即登录</div>
          <div class="login_else">
            <div class="login_else_l" @click="goRegister">
              <div></div>
              <div>新用户注册</div>
            </div>
            <div class="login_else_r" @click="goRegister2">
              <div></div>
              <div> Registing（Email）</div>
            </div>
            <div class="login_else_join" @click="cargoStutas = false">
              加盟商登录
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
      <div class="login_cont" v-else>
        <div class="login_img">
          <img src="../assets/login/组 8598.png" alt="" />
        </div>
        <div class="login_import">
          <div class="login_title" @click="cargoStutas = false">加盟商登录</div>
          <div class="login_input_number">
            <div class="login_input_number_correct">
              <input
                v-model="allianceId"
                type="text"
                placeholder="请输入您的账号"
              />
            </div>
            <div v-if="allianceIdError" class="login_error">账号不能为空</div>
          </div>
          <div class="login_input_password">
            <div class="login_input_password_correct">
              <div class="login_input_password_l">
                <input
                  v-model="lliancepw"
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
            <div v-if="lliancepwError" class="login_error">密码不能为空</div>
          </div>
          <div class="login_into" @click="wallianceLog">立即登录</div>
          <div class="login_return">
            <div class="login_return_l">
              <i></i>
              <div @click="backlogin">船东/货主登录</div>
            </div>
            <el-tooltip effect="light" placement="bottom-end">
              <div slot="content">
                请联系道裕物流工作人员或客服重置密码<br />客服电话 400-9009-618
              </div>
              <div class="login_return_r">忘记密码？</div>
            </el-tooltip>
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
    </el-dialog>
    <Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import Hint from "../components/hint.vue";
import HeaderLoginImg from "../components/HeaderLoginImg.vue";
export default {
  inject: ["reload"],
  components: {
    Hint,
    HeaderLoginImg,
  },
  data() {
    return {
      intoState: false,
      bookingEnd: "",
      hintStutas: false,
      popoverStuts: false,
      popovertollStuts: false,
      loginStatus: false,
      authCodeStutas: true,
      cargoStutas: true,
      loginCutstatus: "1",
      time: 60,
      inputType: "password",
      Lilist: [
        {
          name: "首页",
          id: 1,
        },
        {
          name: "产品服务",
          id: 2,
        },
        {
          name: "实用工具",
          id: 3,
        },
        {
          name: "关于我们",
          id: 4,
        },
      ],
      popoverList: [
        {
          title: "现舱秒杀",
          id: 1,
          hotspan: true,
          url: require("../assets/popover-menu/组 8381@2x.png"),
        },
        {
          title: "集装箱订舱",
          id: 2,
          url: require("../assets/popover-menu/组 8355@2x.png"),
        },
        {
          title: "现舱竞价",
          id: 3,
          url: require("../assets/popover-menu/组 8354@2x.png"),
        },
        {
          title: "集装箱买卖",
          id: 4,
          url: require("../assets/popover-menu/组 8356@2x.png"),
        },
      ],
      palletList: [
        {
          title: "国际货盘",
          id: 5,
          url: require("../assets/popover-menu/组 8360@2x.png"),
        },
        {
          title: "国内货盘",
          id: 6,
          url: require("../assets/popover-menu/组 8368@2x.png"),
        },
        {
          title: "国际航次",
          id: 7,
          url: require("../assets/popover-menu/组 8357@2x.png"),
        },
        {
          title: "国内航次",
          id: 8,
          url: require("../assets/popover-menu/组 8369@2x.png"),
        },
      ],
      OtherServices: [
        {
          title: "加盟商申请",
          id: 9,
          url: require("../assets/popover-menu/组 8658@2x.png"),
        },
      ],
      shippingList: [
        {
          title: "BDI指数",
          url: require("../assets/popover-menu/组 8397@2x.png"),
          askip: "http://www.dylnet.cn/BDI.html",
          // 是否带hot标签
          // hotspan: true,
        },
        {
          title: "船位查询",
          url: require("../assets/popover-menu/组 8398@2x.png"),
          askip: "http://weixin.shipxy.com/shipxy/map",
        },
        {
          title: "航程计算",
          url: require("../assets/popover-menu/组 8399@2x.png"),
          askip: "https://sea-distances.org",
        },
        {
          title: "海关官网",
          url: require("../assets/popover-menu/组 8400@2x.png"),
          askip: "http://www.dylnet.cn/123/hgwz.html",
        },
        {
          title: "搜集装箱",
          url: require("../assets/popover-menu/组 8401@2x.png"),
          askip: "http://container.chinaports.com",
        },
        {
          title: "集装箱尺寸",
          url: require("../assets/popover-menu/组 8402@2x.png"),
          askip: "http://www.dylnet.cn/123/jzxcc_wep.html",
        },
        {
          title: "舱单信息",
          url: require("../assets/popover-menu/组 8406@2x.png"),
          askip: "http://query.customs.gov.cn/MNFTQ",
        },
        {
          title: "船舶拍卖",
          url: require("../assets/popover-menu/组 8414@2x.png"),
          askip: "http://www.shipbid.net",
        },
        {
          title: "拍卖公告",
          url: require("../assets/popover-menu/组 8457@2x.png"),
          askip: "http://wx.csi.com.cn/app/pm/list.aspx",
        },
        {
          title: "船价指数",
          url: require("../assets/popover-menu/组 8412@2x.png"),
          askip: "http://wx.csi.com.cn/app/HYZX/CJZS.aspx?view=1",
        },
        {
          title: "燃油价格",
          url: require("../assets/popover-menu/组 8411@2x.png"),
          askip: "http://www.hyqfocus.com/m/bunker_index.jsp",
        },
        {
          title: "检查缺陷",
          url: require("../assets/popover-menu/组 8456@2x.png"),
          askip: "http://www.dylnet.cn/123/PSCqx.html",
        },
        {
          title: "航运缩写",
          url: require("../assets/popover-menu/组 8455@2x.png"),
          askip: "http://www.marinecircle.com/wx/abbr.jsp",
        },
        {
          title: "编码查询",
          url: require("../assets/popover-menu/组 8454@2x.png"),
          askip: "https://www.hsbianma.com",
        },
      ],
      marineList: [
        {
          title: "全球气象",
          url: require("../assets/popover-menu/组 8452@2x.png"),
          askip: "https://www.ventusky.com",
        },
        {
          title: "全球海况",
          url: require("../assets/popover-menu/组 8451@2x.png"),
          askip: "https://www.passageweather.com/mini",
        },
        {
          title: "潮汐查询",
          url: require("../assets/popover-menu/组 8449@2x.png"),
          askip: "https://www.cnss.com.cn/html/tideWechatNew.html",
        },
        {
          title: "海浪预警",
          url: require("../assets/popover-menu/组 8448@2x.png"),
          askip: "http://www.nmefc.cn/hailang/24hourdetail.aspx",
        },
        {
          title: "台风路径",
          url: require("../assets/popover-menu/组 8453@2x.png"),
          askip: "http://typhoon.zjwater.gov.cn/default.aspx",
        },
        {
          title: "水位公告",
          url: require("../assets/popover-menu/组 8450@2x.png"),
          askip: "https://cjhy.mot.gov.cn/zxfw/cxfw/swgg",
        },
        {
          title: "风力换算",
          url: require("../assets/popover-menu/组 8446@2x.png"),
          askip: " http://www.dylnet.cn/123/fldjhs.html",
        },
        {
          title: "公路里程",
          url: require("../assets/popover-menu/组 8447@2x.png"),
          askip: "http://tools.2345.com/m/jiaotong/lc.htm",
        },
      ],
      options: [],
      roleinfo: [],
      value: 152,
      intoStutas: "1",
      activeClass: "",
      tellNumber: "",
      authNumber: "",
      IdNumber: "",
      passWord: "",
      phoneCode: "",
      allianceId: "",
      lliancepw: "",
      recoinError: false,
      authError: false,
      numberError: false,
      passwordError: false,
      allianceIdError: false,
      lliancepwError: false,
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("roleinfo"))) {
      this.roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
    }
    if (JSON.parse(sessionStorage.getItem("tabsId"))) {
      this.activeClass = JSON.parse(sessionStorage.getItem("tabsId"));
    } else {
      this.activeClass = 1;
    }
    // 获取是否登录状态
    if (localStorage.getItem("token")) {
      this.intoState = true;
    } else {
      this.intoState = false;
    }
  },
  mounted() {
    // this.getareaCode();
    if (!JSON.parse(sessionStorage.getItem("options"))) {
      this.getareaCode();
    } else {
      this.options = JSON.parse(sessionStorage.getItem("options"));
    }
  },
  computed: mapState(["productid"]),
  watch: {
    productid(newdata) {
      switch (newdata) {
        case 1:
          this.activeClass = newdata;
          this.$router.push("/index");
          break;
        case 2:
          this.activeClass = newdata;
          break;
        case 3:
          this.activeClass = newdata;
          break;
        case 4:
          this.activeClass = newdata;
          this.$router.push("/aboutUs");
          break;
        case 5:
          this.activeClass = newdata;
          this.$router.push("/workbench");
          break;
        case 6:
          this.activeClass = newdata;
          break;
        case 7:
          this.activeClass = newdata;
          break;
      }
    },
    tellNumber(newValue) {
      let reg = /^1[1356789]\d{9}$/;
      if (reg.test(newValue) && newValue.length == 11) {
        this.recoinError = false;
      }
    },
    authNumber(newValue) {
      if (newValue) {
        this.authError = false;
      }
    },
    IdNumber(newValue) {
      if (newValue) {
        this.numberError = false;
      }
    },
    passWord(newValue) {
      if (newValue) {
        this.passwordError = false;
      }
    },
    allianceId(newValue) {
      if (newValue) {
        this.allianceIdError = false;
      }
    },
    lliancepw(newValue) {
      if (newValue) {
        this.lliancepwError = false;
      }
    },
    $route(to, from) {
      if (to.path == "/login") {
        this.intoStutas = "2";
      } else if (to.path == "/register") {
        this.intoStutas = "3";
      } else {
        this.intoStutas = "1";
      }
    },
  },
  methods: {
    ...mapMutations(["product"]),
    goworkbench() {
      if (localStorage.getItem("token")) {
        // this.$router.push("/workbench");
        this.activeClass = 5;
        this.product(5);
      } else {
        this.loginStatus = true;
      }
    },
    gohome(id) {
      this.activeClass = id;
      this.product(id);
    },
    gowalliance() {
      if (localStorage.getItem("token")) {
        this.$router.push("/walliance/homepage");
      } else {
        this.loginStatus = true;
      }
    },
    // 获取+86
    async getareaCode() {
      let res = await axios.get("https://www.dylnet.cn/api/sys/dict/all", {
        params: {
          type: 1,
        },
      });
      if (res.data.code == "0000") {
        this.options = res.data.data.zh[21].items;
        sessionStorage.setItem(
          "options",
          JSON.stringify(res.data.data.zh[21].items)
        );
      }
    },
    impower() {
      //拉取授权页面
      let APPID = "wxe76e2cf87e4bb1a9";
      let REDIRECT_URI = encodeURIComponent(
        "https://www.dylnet.cn/perfection"
      );
      // https://open.weixin.qq.com/connect/qrconnect?appid=wxe76e2cf87e4bb1a9&redirect_uri=https://www.dylnet.cn&response_type=code&scope=snsapi_login&state=dywl
      location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;
    },
    goBack() {
      this.$router.push("/");
      this.product(1);
    },
    alterpassword() {
      this.loginStatus = false;
      this.$router.push({
        path: "/amendCode",
      });
    },
    // 弹出框跳转
    goPopoverlist(id) {
      this.popoverStuts = false;
      this.product(2);
      if (id == 9) {
        if (localStorage.getItem("token")) {
          this.$router.push({
            path: "/otherServe/agency",
          });
        } else {
          this.loginStatus = true;
        }
      }

      switch (id) {
        case 1:
          this.$router.push({
            path: "/product",
            query: { active: "first" },
          });
          break;
        case 2:
          this.$router.push({
            path: "/product",
            query: { active: "third" },
          });
          break;
        case 3:
          this.$router.push({
            path: "/product",
            query: { active: "second" },
          });
          break;
        case 4:
          this.$router.push({
            path: "/product/containerdeal",
          });
          break;
        case 5:
          this.$router.push({
            path: "/product/pallet",
            query: { active: "foreign" },
          });
          break;
        case 6:
          this.$router.push({
            path: "/product/pallet",
            query: { active: "internal" },
          });
          break;
        case 7:
          this.$router.push({
            path: "/product/voyagetime",
            query: { active: "foreign" },
          });
          break;
        case 8:
          this.$router.push({
            path: "/product/voyagetime",
            query: { active: "internal" },
          });
          break;
      }
    },
    // 港口信息
    goportmessage() {
      this.popoverStuts = false;
      this.product(3);
      this.$router.push({
        path: "/tool/portmessage",
      });
    },
    dighintStutas(stats) {
      this.hintStutas = stats;
    },
    gohint() {
      this.hintStutas = true;
    },
    //#region
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
    //#endregion
    loginCut(id) {
      this.loginCutstatus = id;
    },
    changeEye() {
      if (this.inputType == "password") {
        this.inputType = "type";
      } else {
        this.inputType = "password";
      }
    },
    authCode() {
      if (this.authCodeStutas) {
        let reg = /^1[1356789]\d{9}$/;
        if (reg.test(this.tellNumber) && this.tellNumber.length == 11) {
          this.authCodeStutas = false;
          this.getInvitationcode();
        } else {
          this.recoinError = true;
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
          templateCode: 2,
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
    // 登录页面
    goLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 登录
    async immediately() {
      this.options.map((item) => {
        if (item.code == this.value) {
          this.phoneCode = item.textValue;
        }
      });
      if (this.loginCutstatus == "1") {
        if (!this.tellNumber) {
          this.recoinError = true;
        }
        if (!this.authNumber) {
          this.authError = true;
        }
        if (!this.authError && !this.recoinError) {
          // 47.101.56.77:10443/user/login
          let res = await axios.post("https://www.dylnet.cn/api/sys/login/in", {
            type: 2,
            phoneCode: this.phoneCode,
            phoneNumber: this.tellNumber,
            verifyCode: this.authNumber,
            languageType: "0",
            channelId: "3",
          });

          if (res.data.code == "0000") {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem(
              "roleinfo",
              JSON.stringify({
                accountId: res.data.data.user.accountId,
                checkStatus: res.data.data.user.checkStatus,
                userType: res.data.data.user.userType,
                phoneNumber: res.data.data.user.phoneNumber,
                email: res.data.data.user.email,
                name:
                  res.data.data.user.firstName + res.data.data.user.lastName,
              })
            );
            this.loginStatus = false;
            this.reload();
            this.$message.success("登录成功");
            // this.$router.push({
            //   path: "/login",
            // });
          } else {
            this.$message.error(res.data.message);
          }
        }
      } else {
        if (!this.IdNumber) {
          this.numberError = true;
        }
        if (!this.passWord) {
          this.passwordError = true;
        }
        if (!this.numberError && !this.passwordError) {
          let res = await axios.post("https://www.dylnet.cn/api/sys/login/in", {
            type: 1,
            accountId: this.IdNumber,
            password: this.passWord,
            languageType: "0",
            channelId: "3",
          });

          if (res.data.code == "0000") {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem(
              "roleinfo",
              JSON.stringify({
                accountId: res.data.data.user.accountId,
                checkStatus: res.data.data.user.checkStatus,
                userType: res.data.data.user.userType,
                phoneNumber: res.data.data.user.phoneNumber,
                email: res.data.data.user.email,
                name:
                  res.data.data.user.firstName + res.data.data.user.lastName,
              })
            );
            this.loginStatus = false;
            this.reload();
            this.$message.success("登录成功");

            // this.$router.push({
            //   path: "/login",
            // });
          } else {
            this.$message.error(res.data.message);
          }
        }
      }
    },
    async wallianceLog() {
      if (!this.allianceId) {
        this.allianceIdError = true;
      }
      if (!this.lliancepw) {
        this.lliancepwError = true;
      }
      if (!this.allianceIdError && !this.lliancepwError) {
        let res = await axios.post("https://www.dylnet.cn/api/sys/login/jms", {
          type: 1,
          accountId: this.allianceId,
          password: this.lliancepw,
          languageType: "0",
          channelId: "3",
        });

        if (res.data.code == "0000") {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem(
            "roleinfo",
            JSON.stringify({
              accountId: res.data.data.user.accountId,
              checkStatus: res.data.data.user.checkStatus,
              userType: res.data.data.user.userType,
              phoneNumber: res.data.data.user.phoneNumber,
              email: res.data.data.user.email,
              name: res.data.data.user.accountId,
              applyType: res.data.data.user.applyType,
              allianceStutas: 2,
            })
          );
          this.loginStatus = false;
          this.reload();
          this.$message.success("登录成功");
        } else {
          this.$message.error(res.data.message);
        }
      }
    },
    backlogin() {
      this.cargoStutas = true;
    },

    // 注册页面
    goRegister() {
      this.loginStatus = false;
      this.$router.push({
        path: "/register",
      });
    },
    goRegister2() {
      this.loginStatus = false;
      this.$router.push({
        path: "/register2",
      });
    },
    closeFun() {
      this.reload();
      // Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>
<style lang="scss">
.el-popper {
  padding: 0;
  .product_popover_menu {
    padding: 30px 27px 14px;
    box-sizing: border-box;
    .popover_menu_list {
      margin-bottom: 15px;
      .popover_title {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
        margin-bottom: 7px;
      }
      .popover_cont {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            box-sizing: border-box;
            width: 150px;
            padding: 6px 9px;
            margin: 5px 7px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-radius: 4px;
            position: relative;
            &:hover {
              background: #ebeef5;
            }
            span {
              display: block;
            }
            span:nth-child(1) {
              width: 32px;
              height: 32px;
              margin-right: 12px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            span:nth-child(2) {
              font-size: 14px;
              font-weight: 400;
              line-height: 14px;
              color: #303133;
            }
          }
          .hotspan::after {
            content: "";
            position: absolute;
            background: url("../assets/popover-menu/组 8431@2x.png") no-repeat;
            background-size: 35px 18px;
            width: 35px;
            height: 18px;
            top: -5px;
            left: 35px;
          }
        }
      }
    }
  }
  .tool_popover_menu {
    padding: 30px 28px 8px;
    box-sizing: border-box;
    .popover_menu_list {
      margin-bottom: 16px;
      .popover_title {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        color: #303133;
        font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
        margin-bottom: 4px;
      }
      .popover_cont {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            list-style-type: none;
            position: relative;
            a {
              box-sizing: border-box;
              padding: 6px 4px 6px 10px;
              margin: 10px 12px 10px 6px;
              display: flex;
              cursor: pointer;
              border-radius: 4px;
              display: block;
              align-items: center;
              text-decoration: none;
              display: flex;
              width: 150px;
              &:hover {
                background: #ebeef5;
              }
              span {
                display: block;
                flex-shrink: 0;
              }
              span:nth-child(1) {
                width: 32px;
                height: 32px;
                margin-right: 16px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              span:nth-child(2) {
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                color: #303133;
              }
            }
            .hotspan::after {
              content: "";
              position: absolute;
              background: url("../assets/popover-menu/组 8431@2x.png") no-repeat;
              background-size: 35px 18px;
              width: 35px;
              height: 18px;
              top: 5px;
              left: 39px;
            }
          }
        }
      }
    }
  }
}
</style>
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
  .login_cont {
    display: flex;
    box-shadow: 0px 4px 20px rgba(69, 81, 104, 0.16);
    .login_img {
      flex-shrink: 0;
      width: 400px;
      height: 464px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .login_import {
      padding: 40px 56px 0;
      width: 436px;
      box-sizing: border-box;
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
        margin-bottom: 40px;
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

      .login_title {
        font-size: 28px;
        font-family: "SourceHanSansCN-Medium", "微软雅黑", Arial;
        color: #333333;
        margin-bottom: 36px;
        padding-top: 16px;
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
            flex-shrink: 0;
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
            background: url("../assets/login/蒙版组 141@2x.png") no-repeat;
            background-size: 16px 16px;
            margin-right: 14px;
            cursor: pointer;
            &:hover {
              width: 16px;
              height: 16px;
              background: url("../assets/login/蒙版组 330@2x.png") no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
            }
          }
          .login_input_password_eye {
            width: 16px;
            height: 16px;
            background: url("../assets/login/组 8607@2x.png") no-repeat;
            background-size: 16px 16px;
            margin-right: 14px;
            cursor: pointer;
            &:hover {
              width: 16px;
              height: 16px;
              background: url("../assets/login/组 8608@2x.png") no-repeat;
              background-size: 16px 16px;
              margin-right: 14px;
            }
          }
        }
      }
      .login_forgetpw {
        font-size: 14px;
        color: #909399;
        margin: -8px 0 16px 0;
        cursor: pointer;
        &:hover {
          color: #376bc5;
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
        margin-bottom: 48px;
        .login_else_l {
          display: flex;
          cursor: pointer;
          div:nth-child(1) {
            width: 16px;
            height: 16px;
            background: url("../assets/login/蒙版组 311@2x.png") no-repeat;
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
              background: url("../assets/login/蒙版组 311@2x (1).png") no-repeat;
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
          margin: 0 64px 0 20px;
          cursor: pointer;
          &:hover {
            color: #376bc5;
          }
        }
        .login_else_r {
          cursor: pointer;
          display: flex;
          div:nth-child(1) {
            width: 16px;
            height: 16px;
            // background: url("../assets/login/蒙版组 315@2x.png") no-repeat;
            background-size: 16px 16px;
            margin-right: 6px;
          }
          div:nth-child(2) {
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color: #909399;
          }
          &:hover {
            div:nth-child(1) {
              width: 16px;
              height: 16px;
              // background: url("../assets/login/蒙版组 315@2x (1).png") no-repeat;
              background-size: 16px 16px;
            }
            div:nth-child(2) {
              color: #376bc5;
            }
          }
        }
        .login_else_join {
          font-size: 14px;
          color: #909399;
          cursor: pointer;
          &:hover {
            color: #376bc5;
          }
        }
      }
      .login_return {
        display: flex;
        justify-content: space-between;
        margin-bottom: 57px;
        .login_return_l {
          display: flex;
          align-items: center;
          cursor: pointer;
          i {
            background: url("../assets/container/蒙版组 331@2x.png") no-repeat;
            display: block;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            margin-right: 4px;
          }
          div {
            font-size: 14px;
            color: #4791ff;
          }
        }
        .login_return_r {
          font-size: 14px;
          color: #999999;
          cursor: pointer;
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
            text-decoration: underline;
            color: #909399;
            margin: 0 8px;
          }
        }
      }
    }
  }
}
.dywl_header {
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #eee;
  z-index: 99;
  .CommonHeader {
    width: 1164px;
    height: 80px;
    margin: 0 auto;
    display: flex;

    justify-content: space-between;
    .CommonHeader_left {
      display: flex;
      align-items: center;
      .CommonHeader_img {
        width: 160px;
        height: 56px;
        // margin: 19px 0 5px 0;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .CommonHeader_tab {
        ul {
          position: relative;
          display: flex;
          margin: 20px 0 0 27px;
          li {
            font-size: 16px;
            line-height: 16px;
            font-weight: 400;
            cursor: pointer;
            color: #303133;
            margin-right: 5px;
            position: relative;
            padding: 0 15px 15px;
          }
          .hoverEffect:hover {
            color: #3b7cfb;
            // font-weight: 500;
          }
          li:nth-child(1) {
            margin-right: 21px;
          }
          .CommonHeader_tab_tli {
            margin-left: 47px;
            margin-right: 21px;
          }
          li.router-link-active {
            color: #3b7cfb;
          }
          li.router-link-active::after {
            content: "";
            width: 24px;
            height: 3px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -12px;
            display: block;
            background: #3b7cfb;
          }
        }
      }
    }
    .CommonHeader_right {
      display: flex;
      align-items: center;
      .CommonHeader_hotline {
        margin: 0 39px 0 0;
        display: flex;
        span {
          display: block;
          font-size: 14px;
          line-height: 14px;
          height: 14px;
        }
        span:nth-child(1) {
          color: #606266;
        }
        span:nth-child(2) {
          color: #3b7cfb;
          margin-left: 13px;
        }
      }
      .CommonHeader_appdown {
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: #606266;
        display: flex;
        cursor: pointer;
        position: relative;
        i {
          background: url("../assets/homepage/蒙版组 1@2x.png") no-repeat;
          background-size: 16px 16px;
          width: 16px;
          height: 16px;
          margin-left: 8px;
          display: block;
        }
        &:hover {
          color: #3b7cfb;
          i {
            background: url("../assets/homepage/蒙版组 1@2x (1).png") no-repeat;
            background-size: 16px 16px;
            width: 16px;
            height: 16px;
            margin-left: 8px;
            display: block;
          }
          .appdown_none {
            display: block;
          }
        }
      }
      .appdown_none {
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
        margin-left: -190px;
        display: none;
        width: 380px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        filter: drop-shadow(0 0 6px rgba(69, 81, 104, 0.2));
        border-radius: 6px;
        .appdown_QRcode {
          display: flex;
          margin-left: 36px;
          .appdown_QRcode_l {
            padding-top: 42px;
            div:nth-child(1) {
              width: 124px;
              height: 124px;
              margin-bottom: 18px;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            div:nth-child(2) {
              font-size: 16px;
              font-weight: 400;
              line-height: 16px;
              color: #3b7cfb;
              margin-bottom: 8px;
            }
            div:nth-child(3) {
              font-size: 14px;
              font-weight: 400;
              line-height: 14px;
              color: #606266;
            }
          }
          .appdown_QRcode_r {
            padding-top: 14px;
            margin-left: 16px;
            width: 192px;
            height: 230px;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
      .appdown_none::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border: 16px solid transparent;
        border-bottom-color: #ffffff;
        top: -32px;
        left: 222px;
      }
      .CommonHeader_Btn {
        .CommonHeader_login {
          width: 86px;
          text-align: center;
          font-size: 14px;
          line-height: 14px;
          color: #ffffff;
          background: #3b7cfb;
          border-radius: 2px;
          padding: 8px 0;
          margin: 0 0 0 20px;
          cursor: pointer;

          &:hover {
            background: #4791ff;
          }
        }
      }
    }
  }
}
</style>
