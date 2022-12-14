<template>
  <div class="riskgoods" :class="{ intervoyageinland: clientSide }">
    <div class="riskgoods_bg">
      <div class="riskgoods_cont">
        <div class="risk_port">
          <div class="risk_port_t">
            <div class="port_l" @click="showport(1)">
              <div>{{ begName.en }}</div>
              <div>{{ begName.zh }}</div>
            </div>
            <div class="port_c"></div>
            <div class="port_r" @click="showport(2)">
              <div>{{ endName.en }}</div>
              <div>{{ endName.zh }}</div>
            </div>
          </div>
          <div class="risk_port_b" @click="calendarShow">
            <div class="risk_port_time">
              <div></div>
              <div>{{ dateList }}</div>
            </div>
            <div v-if="deleteStutas" class="risk_port_b_calendar"></div>
            <div
              v-else
              @click.stop="deletedate"
              class="risk_port_b_delete"
            ></div>
          </div>
        </div>
        <div class="risk_goods">
          <div class="goods_info">货物信息</div>
          <div class="goods_name">
            <van-field
              v-model="goodsName"
              label="货物名称"
              placeholder="请填写货物名称"
              input-align="right"
            />
          </div>
          <div class="goods_type" @click="showgoodType = true">
            <div class="goods_type_l">
              <div>货物类型</div>
              <div class="goods_type_l_txt" v-if="goodTypeStutas">
                请选择类型
              </div>
              <div class="goods_type_l_ttxt" v-else>{{ goodstype.name }}</div>
            </div>
            <div class="goods_type_r"></div>
          </div>
        </div>
        <div class="risk_box">
          <div class="box_info">箱型&数量</div>
          <div class="box_li">
            <ul>
              <li v-for="item in BookingList" :key="item.guid">
                <div class="box_li_l">{{ item.box_type }}</div>
                <div class="box_li_r">
                  <div @click="redBoxNum(item.guid)"></div>
                  <div>{{ item.num }}</div>
                  <div @click="addBoxNum(item.guid)"></div>
                </div>
              </li>
            </ul>
          </div>
          <div class="box_remark">
            <div>备注</div>
            <div>（选填）</div>
          </div>
          <div class="box-field">
            <van-field
              v-model="boxRemark"
              rows="2"
              type="textarea"
              maxlength="300"
              placeholder="请填写备注"
              show-word-limit
            />
          </div>
        </div>
        <div class="risk_certificate">
          <div class="certificate_title">相关危化证书</div>
          <div class="certificate_cont">
            <div class="certificate_cont_l">您的证书是否齐全？</div>
            <div class="certificate_cont_r">
              <div
                @click="certificate('1')"
                :class="{ certicolor: certifiStuts == 1 }"
              >
                是
              </div>
              <div
                @click="certificate('2')"
                :class="{ certicolor: certifiStuts == 2 }"
              >
                否
              </div>
            </div>
          </div>
        </div>
        <div class="risk_phone">
          <div class="phone_title">联系方式</div>
          <div class="phone_man">
            <van-field
              v-model="relation"
              label="联系人"
              placeholder="请填写联系人"
              input-align="right"
            />
            <!-- <div>联系人</div>
        <div>周丹泰</div> -->
          </div>
          <div class="phone_tel">
            <van-field
              v-model="phoneTel"
              label="联系电话"
              placeholder="请填写联系电话"
              input-align="right"
              :formatter="formatterTel"
              :error-message="errorText"
            />
            <!-- <div>联系电话</div>
        <div>13270721078</div> -->
          </div>
        </div>
        <div class="risk_btn" @click="onSubmit">确认提交</div>
      </div>
    </div>

    <!--  :close-on-click-overlay="false" -->
    <van-action-sheet v-model="showportbeg">
      <div class="begsheet">
        <div class="begsheet_seach">
          <van-search
            v-model="begvalue"
            @input="portseach()"
            placeholder="请输入搜索关键词"
          />
        </div>
        <div class="logding" v-if="loading">
          <van-loading type="spinner" />
        </div>
        <div v-else class="begsheet_list">
          <ul>
            <li
              v-for="(item, index) in dataList"
              :key="index"
              @click="pickon(item.code)"
              :class="{ portcheck: item.code == portcheckId }"
            >
              <div>{{ item.textValue }}</div>
              <div>{{ dataListEn[index].textValue }}</div>
            </li>
            <li></li>
          </ul>
        </div>
        <div class="begsheet_btn">
          <div @click="reset">重置</div>
          <div @click="surePort">确定</div>
        </div>
      </div>
    </van-action-sheet>
    <div class="goodType">
      <van-action-sheet
        v-model="showgoodType"
        :actions="actions"
        @select="onSelect"
      />
    </div>
    <van-calendar
      color="#1989fa"
      v-model="calendarStuts"
      type="range"
      position="right"
      allow-same-day
      @confirm="onConfirm"
      :formatter="formatter"
      :round="false"
      @close="beforeConfirm"
    />
    <van-popup class="succShow" round v-model="succShow">
      <div class="succShow-tit">提交成功</div>
      <div class="succShow-cont">
        您的信息提交成功，道裕客服将为您提供后续服务
      </div>
      <div class="succShow-btn" @click="endPop">我知道了</div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Dialog,
  Field,
  Button,
  Toast,
  ActionSheet,
  Search,
  Loading,
  Calendar,
  Notify,
  Popup,
} from 'vant'
Vue.use(Dialog)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(ActionSheet)
  .use(Search)
  .use(Loading)
  .use(Calendar)
  .use(Popup)
  .use(Notify)
import { webGetWXDetail } from '../../api/h5share'
import axios from 'axios'
export default {
  data() {
    return {
      clientSide: false,
      certifiStuts: 0,
      boxRemark: '',
      goodsName: '',
      phoneTel: '',
      relation: '',
      BookingList: [],
      showportbeg: false,
      loading: false,
      calendarStuts: false,
      showgoodType: false,
      deleteStutas: true,
      goodTypeStutas: true,
      begvalue: '',
      portcheckId: '',
      dataList: [],
      dataListEn: [],
      actions: [],
      dateList: '请选择运输日期',
      errorText: '',
      goodstype: {},
      resoluport: 1,
      timestamp: [],
      begName: {
        zh: '起始港',
        en: '请选择',
        startPort: '',
      },
      endName: {
        zh: '目的港',
        en: '请选择',
        endPort: '',
      },
      succShow: false,
      BoxNum: 0,
    }
  },
  mounted() {
    this.getBokList()
    this.getGoodsType()
    this.getweChatPay()
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log('这是移动')
      this.clientSide = false
    } else {
      this.clientSide = true
    }
    // 设置单个页面的body的背景色
  },
  methods: {
    async getweChatPay() {
      webGetWXDetail({
        url: window.location.href.split('#')[0],
      }).then((res) => {
        if (res.code == '0000') {
          //通过config接口注入权限验证配置
          // eslint-disable-next-line no-undef
          wx.config({
            debug: false,
            appId: 'wx3c5d7c6f964f3094',
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
            openTagList: ['wx-open-launch-app'],
          })
          // eslint-disable-next-line no-undef
          wx.ready(function () {
            var s_title = '危化品集装箱', // 分享标题
              s_link = 'https://www.dylnet.cn/#/h5share/riskgoods', // 分享链接
              s_desc = '全球危化品箱运输，进出口一站式服务', //分享描述
              s_imgUrl = 'https://www.dylnet.cn/container/img/蒙版组 369.png' // 分享图标
            // eslint-disable-next-line no-undef
            wx.updateAppMessageShareData({
              title: s_title, // 分享标题
              desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {},
            })
            // eslint-disable-next-line no-undef
            wx.updateTimelineShareData({
              title: s_desc, // 分享标题
              // desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {
                // 设置成功
              },
            })
          })
        }
      })
    },
    async getBokList() {
      let res = await axios.get(
        'https://www.dylnet.cn/api/business/dangerousGoodsBooking/getBoxTypeList'
      )
      if (res.data.code == '0000') {
        res.data.data.boxTypeList.map((item) => {
          item['num'] = 0
        })
        this.BookingList = res.data.data.boxTypeList
      } else {
        this.BookingList = []
      }
    },
    async getList() {
      this.loading = true
      let res = await axios.get(
        'https://www.dylnet.cn/api/sys/dict/type?type=port&likeName=' +
          this.begvalue
      )
      if (res.data.code == '0000') {
        this.dataList = res.data.data.zh[0].items
        this.dataListEn = res.data.data.en[0].items
        this.loading = false
      } else {
        this.dataList = []
      }
    },
    // 货物类型
    async getGoodsType() {
      let res = await axios.get(
        'https://www.dylnet.cn/api/sys/dict/type?type=dangerous_type'
      )
      if (res.data.code == '0000') {
        res.data.data.zh[0].items.map((item) => {
          this.actions.push({
            name: item.textValue,
            id: item.code,
          })
        })
      } else {
        this.actions = []
      }
    },
    // 验证手机号
    formatterTel(val) {
      const reg = /^1[1356789]\d{9}$/
      if (!val) return ''
      if (!reg.test(val)) {
        this.errorText = '请输入正确的手机号'
      } else {
        this.errorText = ''
      }
      return val
    },

    // 证书是否
    certificate(chk) {
      if (chk == this.certifiStuts) {
        this.certifiStuts = 0
      } else {
        this.certifiStuts = chk
      }
    },
    // 港口查询
    portseach() {
      if (this.begvalue) {
        this.getList()
      }
    },
    showport(id) {
      this.resoluport = id
      this.showportbeg = true
      this.getList()
    },
    // 港口选中
    pickon(id) {
      this.portcheckId = id
    },
    surePort() {
      this.dataList.map((item, index) => {
        if (item.code == this.portcheckId) {
          if (this.resoluport == 1) {
            this.begName = {
              zh: item.textValue,
              en: this.dataListEn[index].textValue,
              startPort: this.portcheckId,
            }
          } else if (this.resoluport == 2) {
            this.endName = {
              zh: item.textValue,
              en: this.dataListEn[index].textValue,
              endPort: this.portcheckId,
            }
          }
        }
      })
      this.portcheckId = ''
      this.begvalue = ''
      this.showportbeg = false
    },
    // 重置
    reset() {
      this.portcheckId = ''
      this.begvalue = ''
      this.getList()
    },
    // 删除日期
    deletedate() {
      this.deleteStutas = true
      this.dateList = '请选择运输日期'
    },
    formatter(day) {
      if (day.type === 'start') {
        day.bottomInfo = '起始日期'
      } else if (day.type === 'end') {
        day.bottomInfo = '截止日期'
      } else if (day.type === 'start-end') {
        day.bottomInfo = '起始/截止'
      }
      return day
    },
    calendarShow() {
      this.calendarStuts = true
      this.deleteStutas = false
    },
    onConfirm(date) {
      this.timestamp = [date[0].getTime(), date[1].getTime()]
      this.calendarStuts = false
      let weekList = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ]
      this.dateList =
        date[0].getMonth() +
        1 +
        '月' +
        date[0].getDate() +
        '日' +
        weekList[date[0].getDay()] +
        '~' +
        (date[1].getMonth() + 1) +
        '月' +
        date[1].getDate() +
        '日' +
        weekList[date[1].getDay()]
    },
    beforeConfirm() {
      if (this.dateList == '请选择运输日期') {
        this.deleteStutas = true
      } else {
        this.deleteStutas = false
      }
    },
    // 选择类型
    onSelect(item) {
      this.goodTypeStutas = false
      this.showgoodType = false
      this.goodstype = item
    },
    // 添加箱型数量
    addBoxNum(id) {
      this.BookingList.map((item) => {
        if (item.guid == id) {
          item.num++
        }
      })
    },
    // 添加箱型减少
    redBoxNum(id) {
      this.BookingList.map((item) => {
        if (item.guid == id && item.num > 0) {
          item.num--
        }
      })
    },
    async onSubmit() {
      if (this.begName.zh == '起始港') {
        return Notify({ type: 'primary', message: '请选择起始港' })
      }
      if (this.endName.zh == '目的港') {
        return Notify({ type: 'primary', message: '请选择目的港' })
      }
      if (!this.timestamp[0]) {
        return Notify({ type: 'primary', message: '请选择运输时间' })
      }
      if (!this.goodsName) {
        return Notify({ type: 'primary', message: '请输入货物名称' })
      }
      if (this.goodTypeStutas) {
        return Notify({ type: 'primary', message: '请输入货物类型' })
      }
      let BoxNum = 0
      this.BookingList.map((item) => {
        BoxNum += item.num
      })
      if (BoxNum <= 0) {
        return Notify({ type: 'primary', message: '请选择箱型的数量' })
      }
      if (this.certifiStuts == 0) {
        return Notify({ type: 'primary', message: '请选择相关证书' })
      }
      if (!this.relation) {
        return Notify({ type: 'primary', message: '请输入联系人' })
      }
      if (!this.phoneTel) {
        return Notify({ type: 'primary', message: '请输入手机号' })
      }
      let boxList = this.BookingList.map((item) => {
        return { boxTypeId: item.guid, many: item.num }
      })
      let res = await axios.post(
        'https://www.dylnet.cn/api/business/dangerousGoodsBooking/saveDangerousGoodsBookingByWeb',
        {
          startPort: this.begName.startPort,
          endPort: this.endName.endPort,
          startDate: this.timestamp[0],
          endDate: this.timestamp[1],
          palletName: this.goodsName,
          palletType: this.goodstype.id,
          certificate: this.certifiStuts,
          name: this.relation,
          phoneCode: '+86',
          phoneNumber: this.phoneTel,
          boxList: boxList,
          remark: this.boxRemark,
        }
      )
      if (res.data.code == '0000') {
        this.succShow = true
      } else {
        Toast.fail(res.data.message)
      }
    },
    endPop() {
      this.succShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.tyzt-zht {
  font-family: 'tyzt-zht', Arial;
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
.riskgoods {
  background: #f1f3f5;
  // padding: 0 10px;
  .riskgoods_bg {
    width: 100%;
    height: 401px;
    background: url('../../assets/container/蒙版组 339@2x.png') no-repeat;
    background-size: 100% 401px;
    .riskgoods_cont {
      padding-top: 285px;
      padding-bottom: 50px;
      margin: 0 10px;
      .risk_port {
        background: #ffffff;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 10px;
        .risk_port_t {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          .port_l {
            div {
              width: 122px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            div:nth-child(1) {
              line-height: 20px;
              font-size: 14px;
              font-family: 'tyzt-zht', Arial;
              color: #333333;
            }
            div:nth-child(2) {
              line-height: 30px;
              font-size: 20px;
              font-family: 'tyzt-zht', Arial;
              color: #333333;
            }
          }
          .port_c {
            width: 44px;
            height: 6px;
            background: url('../../assets/container/组 3786@2x.png') no-repeat;
            background-size: 44px 6px;
            margin-top: 20px;
          }
          .port_r {
            div {
              width: 122px;
              text-align: right;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            div:nth-child(1) {
              line-height: 20px;
              font-size: 14px;
              font-family: 'tyzt-zht', Arial;
              color: #333333;
            }
            div:nth-child(2) {
              line-height: 30px;
              font-size: 20px;
              font-family: 'tyzt-zht', Arial;
              color: #333333;
            }
          }
        }
        .risk_port_b {
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
          .risk_port_time {
            display: flex;
            div:nth-child(1) {
              width: 20px;
              height: 20px;
              background: url('../../assets/container/蒙版组 289@2x.png')
                no-repeat;
              background-size: 20px 20px;
              margin-right: 16px;
            }
            div:nth-child(2) {
              font-size: 16px;
              color: #888888;
              line-height: 20px;
            }
          }
          .risk_port_b_calendar {
            width: 20px;
            height: 20px;
            background: url('../../assets/container/蒙版组 288@2x.png')
              no-repeat;
            background-size: 20px 20px;
          }
          .risk_port_b_delete {
            width: 20px;
            height: 20px;
            background: url('../../assets/container/蒙版组 306@2x.png')
              no-repeat;
            background-size: 20px 20px;
          }
        }
      }
      .risk_goods {
        background: #ffffff;
        border-radius: 6px;
        padding: 18px 20px 10px;
        margin-bottom: 10px;
        .goods_info {
          font-size: 16px;
          line-height: 22px;
          font-family: 'tyzt-zht', Arial;
          color: #000000;
          margin-bottom: 8px;
        }
        .goods_name {
          padding: 12px 0;
          .van-cell {
            padding: 0;
            /deep/ .van-field__label {
              color: #333333;
            }
          }
          // display: flex;
          // justify-content: space-between;
          // div:nth-child(1) {
          //   line-height: 20px;
          //   font-size: 14px;
          //   color: #333333;
          // }
          // div:nth-child(2) {
          //   line-height: 20px;
          //   font-size: 14px;
          //   color: #cccccc;
          // }
        }
        .goods_type {
          padding: 14px 0;
          display: flex;
          align-items: center;
          .goods_type_l {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            div:nth-child(1) {
              height: 20px;
              font-size: 14px;
              color: #333333;
            }
            .goods_type_l_txt {
              height: 20px;
              font-size: 14px;
              color: #cccccc;
            }
            .goods_type_l_ttxt {
              height: 20px;
              font-size: 14px;
              color: #333333;
            }
          }
          .goods_type_r {
            width: 6px;
            height: 10px;
            margin-left: 16px;
            background: url('../../assets/container/路径 3466@2x.png') no-repeat;
            background-size: 6px 10px;
          }
        }
      }
      .risk_box {
        background: #ffffff;
        border-radius: 6px;
        padding: 18px 20px 10px;
        margin-bottom: 10px;
        .box_info {
          font-size: 16px;
          line-height: 22px;
          font-family: 'tyzt-zht', Arial;
          color: #000000;
          margin-bottom: 16px;
        }
        .box_li {
          ul {
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              .box_li_l {
                height: 22px;
                font-size: 16px;
                font-family: 'tyzt-zht', Arial;
                color: #333333;
              }
              .box_li_r {
                display: flex;
                div:nth-child(1) {
                  width: 24px;
                  height: 24px;
                  background: url('../../assets/container/组 5068@2x.png')
                    no-repeat;
                  background-size: 24px 24px;
                }
                div:nth-child(2) {
                  line-height: 24px;
                  font-size: 16px;
                  font-family: 'tyzt-zht', Arial;
                  color: #333333;
                  width: 72px;
                  text-align: center;
                }
                div:nth-child(3) {
                  width: 24px;
                  height: 24px;
                  background: url('../../assets/container/组 5067@2x.png')
                    no-repeat;
                  background-size: 24px 24px;
                }
              }
            }
          }
        }
        .box_remark {
          display: flex;
          padding: 14px 0;
          div:nth-child(1) {
            line-height: 20px;
            font-size: 14px;
            color: #333333;
          }
          div:nth-child(2) {
            line-height: 18px;
            font-size: 12px;
            color: #999999;
          }
        }
        .box-field {
          margin-bottom: 8px;
          .van-cell {
            // padding: 0;
            background-color: #f9f9f9;
          }
        }
      }
      .risk_certificate {
        background: #ffffff;
        border-radius: 6px;
        padding: 18px 20px 10px;
        margin-bottom: 10px;
        .certificate_title {
          font-size: 16px;
          line-height: 22px;
          font-family: 'tyzt-zht', Arial;
          color: #000000;
          margin-bottom: 8px;
        }
        .certificate_cont {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          .certificate_cont_l {
            height: 20px;
            font-size: 14px;
            color: #333333;
          }
          .certificate_cont_r {
            display: flex;
            .certicolor {
              background: #6ea2fb;
              color: #ffffff;
            }
            div {
              background: #eef2f6;
              border-radius: 4px;
              width: 44px;
              font-size: 12px;
              line-height: 28px;
              color: #666666;
              margin-left: 16px;
              text-align: center;
            }
          }
        }
      }
      .risk_phone {
        background: #ffffff;
        border-radius: 6px;
        padding: 18px 20px 10px;
        margin-bottom: 32px;
        .phone_title {
          font-size: 16px;
          line-height: 22px;
          font-family: 'tyzt-zht', Arial;
          color: #000000;
          margin-bottom: 8px;
        }
        .phone_man {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          .van-cell {
            padding: 0;
            /deep/ .van-field__label {
              color: #333333;
            }
          }
          // div:nth-child(1) {
          //   height: 20px;
          //   font-size: 14px;
          //   color: #333333;
          // }
          // div:nth-child(2) {
          //   height: 20px;
          //   font-size: 14px;
          //   color: #333333;
          // }
        }
        .phone_tel {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          .van-cell {
            padding: 0;
            /deep/ .van-field__label {
              color: #333333;
            }
            /deep/.van-field__error-message {
              text-align: right;
            }
          }
          // div:nth-child(1) {
          //   height: 20px;
          //   font-size: 14px;
          //   color: #333333;
          // }
          // div:nth-child(2) {
          //   height: 20px;
          //   font-size: 14px;
          //   color: #333333;
          // }
        }
      }
      .risk_btn {
        margin: 0 24px;
        line-height: 44px;
        background: #4486f6;
        border-radius: 22px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
      }
    }
  }
  .begsheet {
    height: 80vh;
    .begsheet_seach {
      position: absolute;
      width: 100%;
      .van-search {
        padding: 10px 20px 6px;
        .van-cell {
          padding: 10px 8px 10px 0;
        }
      }
    }
    .logding {
      position: absolute;
      left: 50%;
      right: 50%;
      top: 40%;
    }
    .begsheet_list {
      padding-top: 62px;
      padding-bottom: 90px;
      ul {
        li {
          padding: 12px 20px 7px;
          border-bottom: 1px solid #f6f6f6;
          div:nth-child(1) {
            line-height: 22px;
            font-size: 16px;
            color: #333333;
          }
          div:nth-child(2) {
            line-height: 18px;
            font-size: 12px;
            color: #999999;
          }
        }
        .portcheck {
          background: #f5f9ff;
          div:nth-child(1) {
            color: #4486f6;
          }
          div:nth-child(2) {
            color: #4486f6;
          }
        }
      }
    }
    .begsheet_btn {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;
      background: #fff;
      padding: 10px 30px 45px;
      div:nth-child(1) {
        background: #f1f3f5;
        border-radius: 22px 22px 22px 22px;
        padding: 8px 52px;
        font-size: 18px;
        color: #333333;
      }
      div:nth-child(2) {
        background: #4486f6;
        border-radius: 22px 22px 22px 22px;
        padding: 8px 52px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
  /deep/.van-calendar__confirm {
    margin: 17px 0 50px 0;
  }
  .goodType {
    /deep/.van-popup {
      height: 300px;
    }
  }
  .succShow {
    width: 75%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 30px;
    box-sizing: border-box;
    .succShow-tit {
      font-size: 18px;
      font-family: 'tyzt-zht', Arial;
      margin-bottom: 10px;
    }
    .succShow-cont {
      font-size: 16px;
      margin-bottom: 16px;
    }
    .succShow-btn {
      font-size: 16px;
      background: #4486f6;
      padding: 6px 18px;
      color: #fff;
      border-radius: 18px;
    }
  }
}
</style>
