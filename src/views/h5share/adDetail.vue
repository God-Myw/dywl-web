<template>
	<div class="adDetail">
		<div class="header">
			<img src="@/assets/h5share/组_12261@2x.png" alt="" />
			<img src="@/assets/h5share/组_12201@2x.png" @click="app" alt="" />
		</div>
		<div class="pic">
			<el-carousel height="150px">
				<el-carousel-item v-for="item in 4" :key="item">
					<img src="@/assets/h5share/组_12256@2x.png" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="content">
			<div class="name menu">
				<div class="logo">
					<img src="@/assets/h5share/组_12256@2x.png" alt="" />
				</div>
				<div class="gsname">
					<p>千星国际仓储(上海)有限公司</p>
					<p>后置三摄组合让您轻松拍出专业大片般的视效画面。</p>
				</div>
			</div>
			<div class="intr menu">
				<div class="title">公司简介</div>
				<div class="deinfo">
					千星国际仓储(上海)有限公司是千诺国际上海分公司，专业从事进出口代理，进口代理，出口代理，进出口报关、报检等一站式全程服务及相关商务咨询的公司。
					每个国家都有自己的进出口贸易管理制度，在进出口贸易操作上原理简单但手续复杂，稍有不当会对整个贸易进程起到阻碍作用。千通国际拥有从事国际贸易和国际国内运输多年工作经验的专业人才，熟悉进出口流程中的各个环节。涉及的产品广泛用于石油、化工、电力、冶金、机械、纺织、汽车、环保、网络和医疗器械等行业。全心全意为客户服务是千通国际服务的宗旨。千通国际将利用丰富的业务经验，良好
				</div>
			</div>
			<div class="info menu">
				<div class="title">商家信息</div>
				<div class="in">
					<ul class="first">
						<li>主营业务</li>
						<li>企业地址</li>
						<li>联系人</li>
						<li>联系电话</li>
						<li>查看地图</li>
					</ul>
					<ul class="second">
						<li>报关 | 报检 | 进出口代理</li>
						<li>上海市虹口区杨树浦路248号瑞丰国际大厦1001室</li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="foot">
			<img src="@/assets/h5share/组_12256@2x.png" @click="phone" alt="" />
		</div>
	</div>
</template>
<script>
	import { a } from "@/api/h5share";
	import CallApp from "callapp-lib";
	export default {
		data() {
			return {
				clientSide: false,
				show: false,
			};
		},
		mounted() {
			this.guid =
				new URLSearchParams(window.location.href.split("?")[1]).get("guid") ||
				false;
			this.getData();
		},
		methods: {
			getData() {},
			phone() {
				window.location.href = "tel:400-9009-618";
			},
			app() {
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
				// window.location.href = "DYLogisticsApp://";
				// window.location.href = "tencent1110877537://";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		align-items: center;
		height: 48px;
		img {
			height: 85%;
			margin: 0px 10px;
		}
	}
	.pic {
		height: 209px;
		.el-carousel {
			position: relative;
			height: 100%;
			/deep/.el-carousel__container {
				top: 0;
				height: 85% !important;
			}
			/deep/.el-carousel__indicators {
				padding-right: 12px;
				position: relative;
				text-align: right;
				.el-carousel__indicator {
					.el-carousel__button {
						width: 9px;
						background: #000000;
						height: 5px;
					}
				}
				.is-active {
					.el-carousel__button {
						width: 9px;
						background: #ffffff;
						height: 5px;
					}
				}
			}
		}
		.el-carousel__item {
			height: 209px;
			background-color: black;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-bottom: 90px;
		.menu {
			width: 96%;
			border-radius: 8px;
			background-color: #ffffff;
			margin: 12px 0px 0px 0px;
			padding: 12px;
			.title {
				font-size: 16px;
				font-family: 苹方-简-中粗体, 苹方-简;
				font-weight: normal;
				color: #000000;
				padding: 12px 12px 12px 0px;
			}
		}
		.name {
			display: flex;
			justify-content: space-between;
			.logo {
				width: 64px;
				height: 64px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.gsname {
				width: 240px;
				p:nth-of-type(1) {
					font-size: 17px;
					font-family: 苹方-简-中黑体, 苹方-简;
					font-weight: normal;
					color: #333333;
				}
				p:nth-of-type(2) {
					font-size: 12px;
					font-family: 苹方-简-常规体, 苹方-简;
					font-weight: normal;
					color: #666666;
				}
			}
		}
		.intr {
			.deinfo {
				font-size: 14px;
				font-family: 苹方-简-常规体, 苹方-简;
				font-weight: normal;
				color: #333333;
			}
		}
		.info {
			.in {
				display: flex;
				ul {
					li {
						padding: 12px 12px 12px 0px;
					}
				}
				.first {
					li {
						width: 76px;
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #999999;
					}
				}
				.second {
					li {
						font-size: 14px;
						font-family: 苹方-简-常规体, 苹方-简;
						font-weight: normal;
						color: #333333;
					}
				}
			}
		}
	}
	.foot {
		height: 78px;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: #ffffff;
		img {
			margin-top: 10px;
			width: 90%;
		}
	}
</style>
