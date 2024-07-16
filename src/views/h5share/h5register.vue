<template>
	<div class="h5register" :class="{ intervoyageinland: clientSide }">
		<div class="h5register_img">
			<img src="../../assets/container/组 8262@2x.png" alt="" />
		</div>
		<div class="h5register_input">
			<van-field v-model="tel" placeholder="请输入您的手机号码" type="tel" />
			<van-field v-model="sms" placeholder="请输入短信验证码">
				<template #button>
					<div class="authCode" @click="authCode()">
						<i></i>
						<div v-if="authCodeStutas">获取验证码</div>
						<div v-else style="color: #909399">再次发送{{ time }}s</div>
					</div>
				</template>
			</van-field>
			<van-field v-model="password" spellcheck="false" placeholder="请设定您的密码" />
			<div class="password_hint">密码8-16位，必须包含字母和数字，不含特殊字符</div>
		</div>
		<div class="h5register_go" @click="goRegister"></div>
		<div class="h5register_deal">
			* 注册即表示同意
			<span @click="showservedeal = true">《道裕物流服务协议》、</span
			><span @click="showprivacydeal = true">《隐私协议》</span>
		</div>
		<van-dialog
			v-model="showservedeal"
			title="道裕物流服务协议"
			confirmButtonText="我已知晓"
			confirmButtonColor="#fff"
		>
			<Servedeal></Servedeal>
		</van-dialog>
		<van-dialog
			v-model="showprivacydeal"
			title="隐私协议"
			confirmButtonText="我已知晓"
			confirmButtonColor="#fff"
		>
			<Privacydeal></Privacydeal>
		</van-dialog>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Dialog, Field, Button, Toast } from "vant";
	Vue.use(Dialog).use(Field).use(Button).use(Toast);
	import Servedeal from "../../componentsH5/servedeal";
	import Privacydeal from "../../componentsH5/privacydeal";
	import { webGetWXDetail } from "../../api/h5share";
	import axios from "axios";
	import CryptoJS from "crypto-js";
	export default {
		components: {
			Servedeal,
			Privacydeal,
		},
		data() {
			return {
				clientSide: false,
				authCodeStutas: true,
				time: 60,
				tel: "",
				sms: "",
				password: "",
				showservedeal: false,
				showprivacydeal: false,
				isAndroidOrIOS: "+86",
				promotionNumber: "",
			};
		},
		created() {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				// console.log('这是移动')
				this.clientSide = false;
				document.querySelector("body").setAttribute("style", "background:#3d5af5;");
			} else {
				this.clientSide = true;
			}
			// 设置单个页面的body的背景色
		},

		mounted() {
			// 移动端页面键盘弹出后导致body高度变低背景色被挤上去解决方法
			//
			this.getweChatPay();
		},
		methods: {
			AndroidOrIOS() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isAndroid) {
					this.isAndroidOrIOS = "+86";
				}
				if (isiOS) {
					this.isAndroidOrIOS = "+86";
				}
				return false;
			},
			// 截取app传的token和参数
			getQueryVariable(variable) {
				// 获取？后参数的位置截取
				var query = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
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
						wx.config({
							debug: false,
							appId: "wx3c5d7c6f964f3094",
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.sign,
							jsApiList: ["hideMenuItems"],
						});
						wx.ready(function () {
							wx.hideOptionMenu();
						});
					}
				});
			},
			authCode() {
				if (this.authCodeStutas) {
					let reg = /^1[1356789]\d{9}$/;
					if (reg.test(this.tel) && this.tel.length == 11) {
						this.getInvitationcode();
					} else {
						Toast("手机号码不正确");
					}
				}
			},
			async getInvitationcode() {
				webGetWXDetail({
					url: window.location.href.split("#")[0],
				}).then((res) => {});
				const key = CryptoJS.enc.Utf8.parse("shanghaidaoyu999");
				const text = this.tel;
				let encryptoText = CryptoJS.AES.encrypt(text, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7,
				}).toString();
				let res = await axios.get("https://www.dylnet.cn/api/sys/verify/code", {
					params: {
						type: 2,
						templateCode: 4,
						languageType: 0,
						phoneNumber: encryptoText,
						phoneCode: this.isAndroidOrIOS,
					},
				});1
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
			goRegister() {
				// this.authCodeStutas = true;
				if (this.tel) {
					if (this.sms) {
						let pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
						if (pass.test(this.password)) {
							this.RegisterID();
						} else {
							Toast("密码格式错误");
						}
					} else {
						Toast("请输入正确验证码");
					}
				} else {
					Toast("请输入手机号");
				}
			},
			async RegisterID() {
				Toast.loading({
					forbidClick: true,
					duration: 0,
				});
				let res = await axios.post("https://www.dylnet.cn/api/sys/user/registerForWebByPromotion", {
					accountId: this.tel,
					password: this.password,
					phoneNumber: this.tel,
					verifyCode: this.sms,
					promotionNumber: this.getQueryVariable("InvitationCode"),
					type: 1,
					userType: 4,
					phoneCode: "+86",
				});
				if (res.data.code == "0000") {
					this.authCodeStutas = true;
					this.tel = "";
					this.password = "";
					this.sms = "";
					Toast.success("注册成功");
				} else {
					Toast(res.data.message);
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	/deep/.van-cell {
		padding: 14px 28px 14px 32px;
		background: #f2f6fc;
		border-radius: 26px; /*no*/
		margin: 7px 0 9px 0;
		.van-field__control {
			font-size: 18px;
			color: #303133;
		}
		input::-webkit-input-placeholder {
			font-size: 16px;
			color: #909399;
		}
	}
	/deep/.van-button {
		margin: 10px 20px 20px 20px;
	}
	/deep/.van-field__button {
		padding: 0;
	}
	/deep/.van-button__content {
		background: #4e78ff;
		height: 44px;
		margin: 0 auto;
		border-radius: 22px; /*no*/
	}
	/deep/.van-dialog__header {
		font-family: "tyzt-zht", Arial;
		font-size: 18px;
		margin-bottom: 16px;
	}
	.tyzt-zht {
		font-family: "tyzt-zht", Arial;
	}
	.h5register {
		background: #3d5af5;
		// height: 100%;
		.h5register_img {
			height: 329px;
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
		.h5register_input {
			padding: 0 30px;
			margin-bottom: 24px;
			.authCode {
				font-size: 16px;
				display: flex;
				box-sizing: border-box;
				// justify-content: flex-start;
				color: #4486f6;
				width: 118px;
				i {
					display: block;
					flex-shrink: 0;
					background: #7eaeff;
					width: 1px;
					height: 24px;
					margin: 0 17px 0 2px;
				}
			}
			.password_hint {
				margin-top: 1px;
				text-align: center;
				font-size: 12px;
				line-height: 12px;
				color: #bec8ff;
			}
		}
		.h5register_go {
			background: url("../../assets/container/蒙版组 343@2x.png") no-repeat;
			background-size: cover;
			width: 315px;
			height: 56px;
			margin: 0 auto;
			margin-bottom: 12px;
		}
		.h5register_deal {
			padding-bottom: 60px;
			text-align: center;
			font-size: 12px;
			line-height: 12px;
			color: #ffff;
			span {
				color: #8ddcff;
			}
		}
	}
	.intervoyageinland {
		width: 375px;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
