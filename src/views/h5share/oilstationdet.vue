<template>
  <div class="h5register" :class="{ intervoyageinland: clientSide }">
    <div class="oil_swipe" v-if="dataList.attachments">
      <van-swipe
        class="my-swipe"
        style="height: 280px"
        indicator-color="white"
        @change="onChange"
      >
        <van-swipe-item v-for="(item, idx) in dataList.attachments" :key="idx">
          <video
            v-if="item.fileType == 'specialvideo'"
            height="100%"
            width="100%"
            controls
            controlslist="nodownload noplaybackrate"
            disablePictureInPicture
          >
            <source
              :src="
                'http://58.33.34.10:10443/images/specialvideo/' + item.fileName
              "
              type="video/mp4"
            />
          </video>
          <div class="swipe_img">
            <img
              v-if="item.fileType == 'specialpic'"
              :src="
                'http://58.33.34.10:10443/images/specialpic/' + item.fileName
              "
              alt=""
            />
          </div>
        </van-swipe-item>
        <!-- <van-swipe-item> </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/video/组 8488.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/video/组 8490.png" alt="" />
        </van-swipe-item> -->
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ dataList.attachments.length }}
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="oil_lower">
      <div class="oil_header">
        <div class="oil_header_title tyzt-zht">
          {{ dataList.title }}
        </div>
        <div class="oil_header_cont">
          <div class="oil_cont_l">
            <div>种类</div>
            <div>{{ dataList.specialName }}</div>
          </div>
          <div class="oil_cont_r">
            <div v-if="dataList.views">{{ dataList.views }}</div>
            <div else>0</div>
            <div>浏览</div>
            <div>{{ distance }}km</div>
          </div>
        </div>
        <div class="oil_header_icon" v-if="dataList.modelType == 2"></div>
        <div class="oil_header_icon2" v-if="dataList.modelType == 1"></div>
      </div>
      <div class="oil_description" v-if="dataList.attribute">
        <div class="descrip_header tyzt-zht">产品参数</div>
        <div class="descrip_nav">
          <ul>
            <li v-for="(item, index) in dataList.attribute" :key="index">
              <div>{{ item.specialTypeName }}</div>
              <div>{{ item.specialTypeValue }} {{ item.unitValue }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="oil_supplier" v-if="dataList.authInfo">
        <div class="supplier_header tyzt-zht">供应商信息</div>
        <div class="supplier_nav" v-if="dataList.authInfo.userAuthType == '1'">
          <div class="supplier_nav_l">个人经营</div>
          <div class="supplier_nav_r">{{ dataList.authInfo.name }}</div>
        </div>
        <div class="supplier_nav" v-if="dataList.authInfo.userAuthType == '2'">
          <div class="supplier_nav_c">{{ dataList.authInfo.name }}</div>
        </div>
      </div>
      <div class="oil_synopsis">
        <div class="synopsis_header tyzt-zht">产品简介</div>
        <div class="synopsis_p">
          {{ dataList.introduction }}
        </div>
      </div>
      <div class="oil_btn">
        <div @click="teleDig = true">拨打电话</div>
      </div>
    </div>
    <van-dialog v-model="teleDig" title="拨打电话" :show-confirm-button="false">
      <div class="teletxt">
        <span v-if="dataList.authInfo">{{
          dataList.authInfo.contactPhone
        }}</span>
      </div>
      <div class="telebtn">
        <div @click="teleDig = false">取消</div>
        <div @click="Calltele">立即拨打</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog, Field, Button, Toast } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { webGetWXDetail } from '../../api/h5share'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Dialog).use(Field).use(Button).use(Toast)
import axios from 'axios'

export default {
  data() {
    return {
      clientSide: false,
      teleDig: false,
      current: 0,
      distance: '',
      dataList: [],
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // console.log('这是移动')
      this.clientSide = false
    } else {
      this.clientSide = true
    }
  },
  methods: {
    // 截取app传的token和参数
    getQueryVariable(variable) {
      // 获取？后参数的位置截取
      var query = window.location.href.substring(
        window.location.href.lastIndexOf('?') + 1
      )
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    onChange(index) {
      this.current = index
    },
    Calltele() {
      window.location.href = 'tel://' + this.dataList.authInfo.contactPhone
    },
    async getweChatPay(token, Guid, distance, specialName) {
      webGetWXDetail({
        url: window.location.href.split('#')[0],
      }).then((res) => {
        if (res.code == '0000') {
          //通过config接口注入权限验证配置
          wx.config({
            debug: false,
            appId: 'wx3c5d7c6f964f3094',
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.sign,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
            openTagList: ['wx-open-launch-app'],
          })
          wx.ready(function () {
            var s_title = '特种车船租赁出售', // 分享标题
              s_link =
                'https://www.dylnet.cn/#/h5share/oilstationdet?token=' +
                token +
                '&Guid=' +
                Guid +
                '&distance=' +
                distance, // 分享链接
              s_desc = specialName, //分享描述
              s_imgUrl = 'https://www.dylnet.cn/container/img/蒙版组 343.png' // 分享图标

            wx.updateAppMessageShareData({
              title: s_title, // 分享标题
              desc: s_desc, // 分享描述
              link: s_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: s_imgUrl, // 分享图标
              success: function () {},
            })
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
    async getList() {
      this.distance = this.getQueryVariable('distance')
      let res = await axios.get(
        'https://www.dylnet.cn/api/business/specialVehicle/getSpecialVehicleTruckDetailForApp',
        {
          headers: {
            token: this.getQueryVariable('token'),
          },
          params: {
            vehicleUserGuid: this.getQueryVariable('Guid'),
          },
        }
      )
      if (res.data.code == '0000') {
        this.dataList = res.data.data

        this.getweChatPay(
          this.getQueryVariable('token'),
          this.getQueryVariable('Guid'),
          this.distance,
          this.dataList.specialName
        )
      } else {
        this.dataList = []
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tyzt-zht {
  font-family: 'tyzt-zht', Arial;
}
/deep/.van-swipe-item {
  background: rgba(0, 0, 0, 1);
  .swipe_img {
    height: 280px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  // 当前播放时间
  video::-webkit-media-controls-current-time-display {
    display: none !important;
  }
  // 剩余时间
  video::-webkit-media-controls-time-remaining-display {
    display: none !important;
  }
  // 音量按钮
  video::-webkit-media-controls-volume-control-container {
    display: none !important;
  }
  // 全屏
  video::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }
  // 时间轴
  video::-webkit-media-controls-timeline {
    display: none !important;
  }
}
.intervoyageinland {
  width: 375px;
  left: 0;
  right: 0;
  margin: auto;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 4px 10px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.39);
  color: #ffffff;
  border-radius: 10px;
}
.h5register {
  .oil_lower {
    margin: 10px;
    .oil_header {
      position: relative;
      border-radius: 6px;
      background: #fff;
      padding: 24px 20px 19px;
      margin-bottom: 10px;
      .oil_header_title {
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #333333;
        margin-bottom: 16px;
      }
      .oil_header_cont {
        display: flex;
        justify-content: space-between;

        .oil_cont_l {
          display: flex;

          div {
            font-size: 14px;
            line-height: 20px;
          }
          div:nth-child(1) {
            color: #999999;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #333333;
          }
        }
        .oil_cont_r {
          display: flex;
          div {
            font-size: 12px;
            line-height: 20px;
            color: #999999;
          }
          div:nth-child(2) {
            margin: 0 28px 0 4px;
          }
        }
      }
      .oil_header_icon {
        position: absolute;
        width: 32px;
        height: 16px;
        left: 0;
        top: 0;
        background: url('../../assets/container/组 9819@2x.png') no-repeat;
        background-size: 32px 16px;
      }
      .oil_header_icon2 {
        position: absolute;
        width: 32px;
        height: 16px;
        left: 0;
        top: 0;
        background: url('../../assets/container/组 9820@2x.png') no-repeat;
        background-size: 32px 16px;
      }
    }
    .oil_description {
      background: #ffffff;
      border-radius: 6px;
      padding-bottom: 24px;
      margin-bottom: 10px;
      .descrip_header {
        font-size: 16px;
        line-height: 22px;
        color: #333333;
        padding: 18px 0 14px 20px;
      }
      .descrip_nav {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            flex-shrink: 0;
            width: 118px;
            padding: 8px 0 11px 20px;
            box-sizing: border-box;
            div:nth-child(1) {
              font-size: 12px;
              margin-bottom: 4px;
              font-weight: normal;
              line-height: 17px;
              color: #999999;
            }
            div:nth-child(2) {
              font-size: 14px;

              line-height: 20px;
              color: #333333;
            }
          }
        }
      }
    }
    .oil_supplier {
      background: #fff;
      border-radius: 6px;
      margin-bottom: 10px;
      .supplier_header {
        font-size: 16px;
        line-height: 22px;
        color: #333333;
        padding: 18px 0 16px 20px;
      }
      .supplier_nav {
        display: flex;
        margin-left: 20px;
        padding-bottom: 28px;
        .supplier_nav_l {
          font-size: 14px;
          font-weight: normal;
          line-height: 20px;
          color: #999999;
        }
        .supplier_nav_r {
          font-size: 14px;
          margin-left: 12px;
          line-height: 20px;
          color: #333333;
        }
        .supplier_nav_c {
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
      }
    }
    .oil_synopsis {
      background: #fff;
      // padding-bottom: 80px;
      border-radius: 6px;
      margin-bottom: 125px;
      .synopsis_header {
        font-size: 16px;
        line-height: 22px;
        color: #333333;
        padding: 18px 0 16px 20px;
      }
      .synopsis_p {
        padding: 0 20px;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        word-break: break-all;
        padding-bottom: 28px;
      }
    }
    .oil_btn {
      position: fixed;
      width: 100%;
      background: #fff;
      bottom: 0;
      display: flex;
      left: 0;
      justify-content: center;
      padding: 10px 0 30px 0;

      div {
        background: #2a5187;
        border-radius: 22px;
        text-align: center;
        font-size: 18px;
        line-height: 28px;
        padding: 9px 0 10px 0;
        width: 280px;
        text-align: center;
        color: #ffffff;
      }
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
      padding: 2px 36px;
      color: #2a5187;
      border: 1px solid #2a5187;
    }
    div:nth-child(2) {
      color: #fff;
      padding: 3px 23px;
      background: #2a5187;
    }
  }
}
</style>
