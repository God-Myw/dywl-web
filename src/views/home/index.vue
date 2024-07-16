<template>
	<div class="home">
		<div class="home_bg">
			<div class="home_content">
				<div class="home_title">一站式国际物流在线服务平台</div>
				<div class="home_search_bg">
					<!-- tab切换 -->
					<div class="home_search_tab">
						<ul>
							<li
								v-for="(item, index) in hsearchTab"
								:key="item.id"
								@click="searchTab(index)"
								:class="{ home_search_tab_active: index == current }"
							>
								{{ item.name }}
							</li>
						</ul>
					</div>
					<Homesearch :current="current"></Homesearch>
				</div>
				<!-- 热门搜索 -->
				<div class="home_hot">
					<div class="hot_title">热门搜索：</div>
					<div class="hot_details">
						<ul>
							<li v-for="item in hotseachData" :key="item.id">
								{{ item.name }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 跳动数字 -->
		<div class="home_exhibition_bg">
			<div class="home_exhibition">
				<ul>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.palletSum) + Number(this.emergencySum)*7"
								:duration="1000"
								suffix=""
							></countTo>
						</div>
						<div>水运货源</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.voyageLineSum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>航线覆盖</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.huoZhuSum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>货主</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.chuanDongSum) + 1564"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>船东</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.spartSum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>船用商品</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.portSum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>港口</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.shipBookingSum) + 2000"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>船舶交易</div>
					</li>
					<!-- <li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.palletSum1)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>物供数</div>
					</li> -->
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.specialSum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>特种车船</div>
					</li>
					<li>
						<div>
							<countTo
								:startVal="Number(0)"
								:endVal="Number(this.emergencySum)"
								:duration="1000"
								separator=","
								suffix=""
							></countTo>
						</div>
						<div>互助园</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 国际国内集装箱 -->
		<div class="home_container">
			<!-- 更多 -->
			<div class="more" @click="goProduct()"></div>
			<div class="container_title">国际、国内集装箱</div>
			<div class="container_tabs">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="集装箱订舱" name="third"></el-tab-pane>
					<el-tab-pane label="现舱秒杀" name="first"></el-tab-pane>
					<!-- <el-tab-pane label="现舱竞拍" name="second"></el-tab-pane> -->
				</el-tabs>
			</div>
			<!-- 现舱秒杀  -->
			<div class="container_list" v-if="activeName == 'first'">
				<ul v-loading="loading3">
					<li @click="SeckillDetails(item.type)" v-for="item in seckillData" :key="item.guid">
						<div class="container_list_start">
							<div class="start_l">
								<div class="start_l_from">
									<div class="start_l_from_china">
										<i></i>
										<div>{{ item.startPortCn }}</div>
									</div>
									<div class="start_l_from_eng">{{ item.startPortEn }}</div>
								</div>
								<div class="start_l_end">
									<div class="end_l_from_china">
										<i></i>
										<div>{{ item.endPortCn }}</div>
									</div>
									<div class="end_l_from_eng">{{ item.endPortEn }}</div>
								</div>
							</div>
							<div class="start_r">
								<div class="start_r_Closing">
									<span>截关</span>
									<span>{{ item.closingTimeWeek }}</span>
									<span>{{ item.closingTime }}</span>
								</div>
								<div class="start_r_sail">
									<span>开船</span>
									<span>{{ item.sailingTimeWeek }}</span>
									<span>{{ item.sailingTime }}</span>
								</div>
								<div class="start_r_voyage">
									<span>航程</span>
									<span>{{ item.voyage }}天</span>
								</div>
							</div>
						</div>
						<div class="container_list_box">
							<div class="box_pile">
								<div></div>
								<div>箱型</div>
								<div class="box_pile_boxType">
									<span v-for="ite in item.boxs" :key="ite.guid">
										<span>{{ ite.boxType }}</span>
										<span class="spandisp"> / </span>
									</span>
								</div>
							</div>
							<div class="box_seckill">
								<div></div>
								<div>秒杀价</div>
								<div class="box_pile_priceType">
									<span v-for="ite in item.boxs" :key="ite.guid">
										<span
											><i v-if="ite.moneyType == 0">￥</i>
											<i v-if="ite.moneyType == 1">$</i>
											<i v-if="ite.moneyType == 2">€</i>{{ ite.teJia }}</span
										>
										<span class="spandisp"> / </span>
									</span>
								</div>
							</div>
						</div>
						<div class="container_list_time">
							<div class="time_foreshow" v-if="item.type == 1">{{ item.startTime }} 开始</div>
							<div class="time_countDown" v-if="item.type == 2">
								<div>距结束</div>
								<div><CountDown :endDate="item.endTimeFormat"></CountDown></div>
							</div>
						</div>
						<div v-if="item.type == 1" class="container_foreshow_tag"></div>
						<div v-if="item.type == 2" class="container_seckill_tag"></div>
					</li>
				</ul>
			</div>
			<!-- 现舱竞拍 -->
			<div class="container_list_auctio" v-if="activeName == 'second'">
				<ul v-loading="loading3">
					<li v-for="item in newauctioData" :key="item.guid">
						<div class="container_list_start">
							<div class="start_l">
								<div class="start_l_from">
									<div class="start_l_from_china">
										<i></i>
										<div>{{ item.startPortCn }}</div>
									</div>
									<div class="start_l_from_eng">{{ item.startPortEn }}</div>
								</div>
								<div class="start_l_end">
									<div class="end_l_from_china">
										<i></i>
										<div>{{ item.endPortCn }}</div>
									</div>
									<div class="end_l_from_eng">{{ item.endPortEn }}</div>
								</div>
							</div>
							<div class="start_r">
								<div class="start_r_Closing">
									<span>截关</span>
									<span>{{ item.closingTimeWeek }}</span>
									<span>{{ item.closingTime }}</span>
								</div>
								<div class="start_r_sail">
									<span>开船</span>
									<span>{{ item.sailingTimeWeek }}</span>
									<span>{{ item.sailingTime }}</span>
								</div>
								<div class="start_r_voyage">
									<span>航程</span>
									<span>{{ item.voyage }}天</span>
								</div>
							</div>
						</div>
						<div class="container_list_box">
							<div class="box_auctio_l">
								<div class="box_auctio_number">
									<div>{{ item.BoxType }}</div>
									<div>
										数量<span>{{ item.boxSum }}</span>
									</div>
								</div>
								<div class="container_list_time">
									<div v-if="item.type == 1" class="time_foreshow">{{ item.startTime }} 开始</div>
									<div v-if="item.type == 2" class="time_countDown">
										<div>距结束</div>
										<div>
											<CountDown :endDate="item.endTimeFormat"></CountDown>
										</div>
									</div>
								</div>
							</div>
							<div class="box_auctio_r">
								<div class="box_auctio_r_starting">
									起拍价<span>
										<i v-if="item.seaFreightType == 0">￥</i>
										<i v-if="item.seaFreightType == 1">$</i>
										<i v-if="item.seaFreightType == 2">€</i>{{ item.seaFreight }}</span
									>
								</div>
								<div v-if="item.type == 2" class="box_auctio_r_present">
									当前价<span>
										<i v-if="item.seaFreightType == 0">￥</i>
										<i v-if="item.seaFreightType == 1">$</i>
										<i v-if="item.seaFreightType == 2">€</i>{{ item.currentPrice }}</span
									>
								</div>
							</div>
						</div>
						<div v-if="item.type == 1" class="container_foreshow_tag"></div>
						<div v-if="item.type == 2" class="container_seckill_tag"></div>
					</li>
				</ul>
			</div>
			<!-- 集装箱订舱 -->
			<div class="container_list_book" v-if="activeName == 'third'">
				<ul v-loading="loading3">
					<li v-for="item in bookingData" :key="item.guid">
						<div class="container_list_start">
							<div class="start_l">
								<div class="start_l_from">
									<div class="start_l_from_china">
										<i></i>
										<div>{{ item.startPortCn }}</div>
									</div>
									<div class="start_l_from_eng">{{ item.startPortEn }}</div>
								</div>
								<div class="start_l_end">
									<div class="end_l_from_china">
										<i></i>
										<div>{{ item.endPortCn }}</div>
									</div>
									<div class="end_l_from_eng">{{ item.endPortEn }}</div>
								</div>
							</div>
							<div class="start_r">
								<div class="start_r_Closing">
									<span>截关</span>
									<span>{{ item.closingTimeWeek }}</span>
									<span>{{ item.closingTimeString }}</span>
								</div>
								<div class="start_r_sail">
									<span>开船</span>
									<span>{{ item.sailingTimeWeek }}</span>
									<span>{{ item.sailingTimeString }}</span>
								</div>
								<div class="start_r_voyage">
									<span>航程</span>
									<span>{{ item.voyage }}天</span>
								</div>
							</div>
						</div>
						<div class="container_list_box">
							<div class="box_pile">
								<div></div>
								<div>
									<span>20GP</span><span style="padding: 0 2px">/</span><span>40GP</span
									><span style="padding: 0 2px">/</span><span>40HQ</span>
								</div>
							</div>
							<div class="box_seckill">
								<div></div>
								<div>
									<span v-if="item.haiyunTwentyGpTejia">{{ item.haiyunTwentyGpTejia }}</span>
									<span v-else>--</span>
									<span>/</span>
									<span v-if="item.haiyunFortyGpTejia">{{ item.haiyunFortyGpTejia }}</span>
									<span v-else>--</span>
									<span>/</span>
									<span v-if="item.haiyunFortyHqTejia">{{ item.haiyunFortyHqTejia }}</span>
									<span v-else>--</span>
								</div>
							</div>
						</div>
						<div class="container_list_label">
							<span>限时特价</span>
							<span>可载重大件</span>
							<span>可载件杂货</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 国际、国内散杂货运输 -->
		<div class="home_straygoods">
			<div class="straygoods_title">国际、国内散杂货运输</div>
			<div class="straygoods_content">
				<div class="straygoods_content_l">
					<div class="straygoods_freight_title">
						<div class="straygoods_freight_p" v-if="pallet == 'foreign'">Goods Shipped</div>
						<div class="straygoods_freight_p" v-else>我有货要运</div>
						<div class="straygoods_freight_t">
							<div></div>
							<div v-if="pallet == 'foreign'">Supporting services</div>
							<div v-else>配套衍生服务</div>
							<div></div>
							<div v-if="pallet == 'foreign'">Quotation negotiation</div>
							<div v-else>报价洽谈</div>
						</div>
					</div>
					<div class="straygoods_freight_seach">
						<div class="straygoods_freight_seach_input">
							<div class="straygoods_freight_ico">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
							<!-- 搜索框 -->
							<div>
								<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
									<el-form-item prop="origin">
										<el-select
											v-model="ruleForm.origin"
											filterable
											clearable
											:placeholder="pallet == 'foreign' ? 'L/P' : '从哪里起运'"
										>
											<el-option
												v-for="item in startPortList"
												:key="item.code"
												:label="item.textValue"
												:value="item.code"
											>
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item prop="purpose">
										<el-select
											v-model="ruleForm.purpose"
											filterable
											clearable
											:placeholder="pallet == 'foreign' ? 'D/P' : '货到哪里去'"
										>
											<el-option
												v-for="item in endtPortList"
												:key="item.code"
												:label="item.textValue"
												:value="item.code"
											>
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item prop="goodsName">
										<el-select
											v-model="ruleForm.goodsName"
											filterable
											clearable
											:placeholder="
												pallet == 'foreign' ? 'select the name of the goods' : '请选择货物名称'
											"
										>
											<el-option
												v-for="(item, index) in goodsNameList"
												:value="item.code"
												:label="item.textValue"
												:key="index"
											>
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item class="te_input">
										<el-col :span="10">
											<el-form-item prop="minton">
												<el-input
													v-model="ruleForm.minton"
													oninput="value=value.replace(/[^0-9.]/g,'')"
													:placeholder="pallet == 'foreign' ? 'Minton' : '最小吨位'"
													style="width: 112px"
												></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="2" style="padding-left: 6px">-</el-col>
										<el-col :span="10">
											<el-form-item prop="maxton">
												<el-input
													v-model="ruleForm.maxton"
													oninput="value=value.replace(/[^0-9.]/g,'')"
													:placeholder="pallet == 'foreign' ? 'Maxton' : '最大吨位'"
													style="width: 112px"
												></el-input>
											</el-form-item>
										</el-col>
										<el-col
											v-if="pallet == 'foreign'"
											style="font-size: 16px; color: #909399; padding-left: 4px"
											:span="1"
											>Ton</el-col
										>
										<el-col
											v-else
											style="font-size: 16px; color: #909399; padding-left: 4px"
											:span="1"
											>吨</el-col
										>
									</el-form-item>
								</el-form>
							</div>
						</div>
						<div class="straygoods_freight_bott">
							<div v-if="pallet == 'foreign'" class="">
								After the customer service calculates the price, they will notify you by message
							</div>
							<div v-else class="straygoods_freight_bott_l">客服计算价格后将消息通知您</div>
							<div v-if="pallet == 'foreign'" class="straygoods_freight_bott_r">
								<span v-if="roleinfo.allianceStutas == 2">Next step</span>
								<span v-else @click="freightNext">Next step</span>
							</div>
							<div v-else class="straygoods_freight_bott_r">
								<span v-if="roleinfo.allianceStutas == 2">下一步</span>
								<span v-else @click="freightNext">下一步</span>
							</div>
						</div>
					</div>
				</div>
				<div class="straygoods_content_r">
					<!-- 更多 -->
					<div class="more" @click="toproduct()"></div>
					<div class="straygoods_pallet">
						<span @click="foreignpallet()" :class="pallet == 'foreign' ? 'pallet_optfor' : ''"
							>Recommended international pallets</span
						>
						<span @click="internalpallet()" :class="pallet == 'internal' ? 'pallet_optfor' : ''"
							>推荐国内货盘</span
						>
					</div>
					<div class="pallet_cont">
						<el-carousel v-loading="loading" height="320px">
							<el-carousel-item
								v-for="(items, index) in foreignData"
								indicator-position="none"
								:key="index"
							>
								<ul>
									<li v-for="item in items" :key="item.guid">
										<div class="pallet_cont_li_h">
											{{ pallet == "foreign" ? item.titleEnPallet : item.titleCnPallet }}
											<span v-if="item.goodsWeight">/</span>
											<i v-if="item.goodsWeight"
												>{{ item.goodsWeight }}{{ pallet == "foreign" ? "Ton" : "吨" }}</i
											>
											<span v-if="item.goodsVolume && pallet == 'foreign'">/</span>
											<i v-if="item.goodsVolume && pallet == 'foreign'">{{ item.goodsVolume }}m³</i>
										</div>
										<div class="pallet_cont_li_b">
											<div class="li_pallet_date">
												<div class="li_pallet_date_s">
													<div>{{ pallet == "foreign" ? "Load" : "装货" }}</div>
													<div>{{ item.loadDate | renderTime }}</div>
												</div>
												<div class="li_pallet_date_e">
													<div>{{ pallet == "foreign" ? "Date" : "日期" }}</div>
													<div>{{ item.endDate | renderTime }}</div>
												</div>
											</div>
											<div class="li_pallet_g"></div>
											<div class="li_pallet_place">
												<div class="li_pallet_place_s">
													<div v-if="pallet == 'foreign'" class="li_pallet_place_cir"></div>
													<div v-else class="li_pallet_place_cir_foreign"></div>
													<div>
														{{ pallet == "foreign" ? item.titleEnStart : item.titleCnStart }}
													</div>
												</div>
												<div class="li_pallet_place_e">
													<div></div>
													<div>{{ pallet == "foreign" ? item.titleEnDes : item.titleCnDes }}</div>
												</div>
											</div>
											<div v-if="pallet == 'foreign'" class="li_pallet_btn">
												<div @click="toDetforeign(item.guid)">
													{{ pallet == "foreign" ? "Detail" : "详情" }}
												</div>
												<div @click="gohint">{{ pallet == "foreign" ? "Grab" : "抢单" }}</div>
											</div>
											<div v-else class="li_pallet_btn_internal">
												<div @click="toDetinternal(item.guid)">
													{{ pallet == "foreign" ? "Detail" : "详情" }}
												</div>
												<div @click="gohint">{{ pallet == "foreign" ? "Grab" : "抢单" }}</div>
											</div>
										</div>
									</li>
								</ul>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
			</div>
		</div>
		<!-- 广告轮播 -->
		<div class="home_banner">
			<el-carousel height="126px" trigger="click" arrow="never" autoplay>
				<el-carousel-item>
					<img src="../../assets/homepage/组 8489.png" alt="" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../assets/homepage/组 8490.png" alt="" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../assets/homepage/组 8488.png" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 国际、国内航次 -->
		<div class="home_voyage">
			<div class="voyage_content">
				<div class="voyage_content_l">
					<div class="voyage_freight_title">
						<div v-if="voyage == 'foreign'" class="voyage_freight_p">Build Ship Rotations</div>
						<div v-else class="voyage_freight_p">我要发布航次</div>
						<div v-if="voyage != 'foreign'" class="voyage_freight_t">
							<div></div>
							<div>真实船期</div>
							<div>最新船舶信息</div>
						</div>
						<div v-else class="voyage_freight_t">
							<div></div>
							<div>Real shipping schedule</div>
							<div>Latest ship information</div>
						</div>
					</div>

					<div class="announce_voyage">
						<div v-if="voyage == 'foreign'" class="announce_new_voyage">
							<div>
								<span></span>
								<span>Building New Rotations</span>
							</div>
							<div>select the publishing voyage area</div>
						</div>
						<div v-else class="announce_new_voyage">
							<div>
								<span></span>
								<span>发布新航次</span>
							</div>
							<div>请选择发布航次区域</div>
						</div>
						<div class="announce_foreign_voyage">
							<img src="../../assets/homepage/组 4465.png" alt="" />
						</div>
						<div class="announce_internal_voyage">
							<img src="../../assets/homepage/组 4464.png" alt="" />
						</div>
					</div>
				</div>
				<div class="voyage_content_r">
					<!-- 更多 -->
					<div class="more" @click="toVoyagetime()"></div>
					<div class="straygoods_voyage">
						<span @click="foreignvoyage()" :class="voyage == 'foreign' ? 'voyage_optfor' : ''"
							>Recommended Global Rotaions</span
						>
						<span @click="internalvoyage()" :class="voyage == 'internal' ? 'voyage_optfor' : ''"
							>Recommended Coastal Rotaions</span
						>
					</div>
					<div class="voyage_cont">
						<ul v-loading="loading2">
							<li @click="toDetvoforeign()" v-for="item in forVoyageData" :key="item.guid">
								<div class="voyage_cont_li_h">
									<div>
										{{ voyage == "foreign" ? item.titleEn : item.titleCn }}<span>/</span
										>{{ item.acceptTon }}
										吨
									</div>
									<div v-if="voyage == 'foreign'">
										{{ item.voyageLineName }}
									</div>
								</div>
								<div class="voyage_cont_li_b">
									<div class="li_pallet_date">
										<div class="li_pallet_date_s">
											<div v-if="voyage == 'foreign'">ETA</div>
											<div v-else>空船</div>
											<div>{{ item.expectStartDate | renderTime }}</div>
										</div>
										<div class="li_pallet_date_e">
											<div v-if="voyage == 'foreign'">ETD</div>
											<div v-else>日期</div>
											<div>{{ item.expectEndDate | renderTime }}</div>
										</div>
									</div>
									<div class="li_pallet_g"></div>
									<div class="li_pallet_place">
										<div class="li_pallet_place_s">
											<div v-if="voyage == 'foreign'" class="li_pallet_place_cir"></div>
											<div v-else class="li_pallet_place_cir_foreign"></div>
											<div v-if="item.voyageLine.length > 0">
												{{
													voyage == "foreign"
														? item.voyageLine[0].titleCN
														: item.voyageLine[0].titleCN
												}}
											</div>
										</div>
										<div class="li_pallet_place_e">
											<div></div>
											<div v-if="item.voyageLine.length == 1 && voyage == 'internal'">待定</div>
											<div v-else>
												<span class="voyageend" v-for="(ite, idx) in item.voyageLine" :key="idx"
													>{{ ite.titleCN }}<span class="oyagenum">、</span></span
												>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 船舶供应 -->
		<div class="home_voyage">
			<div class="voyage_content">
				<div class="voyage_content_l">
					<div class="voyage_freight_title">
						<div class="voyage_freight_p">船舶供应</div>
						<div class="voyage_freight_t">
							<div></div>
							<div>真实船期</div>
							<div>最新船舶信息</div>
						</div>
					</div>
					<div class="announce_voyage" @click="toReSpart" style="padding-bottom: 17px">
						<div class="announce_new_voyage">
							<div>
								<span></span>
								<span>发布新商品</span>
							</div>
						</div>
					</div>
				</div>
				<div class="voyage_content_r" style="margin-left: 115px">
					<!-- 更多 -->
					<div class="more" @click="toshipSpart()"></div>
					<div class="straygoods_voyage" style="margin: 30px 0px"></div>
					<div class="voyage_cont" style="margin-left: -97px">
						<ul v-loading="loading2">
							<li v-for="item in shipSpartData" :key="item.creater" style="width: 47%">
								<div class="voyage_cont_li_h" style="width: 100%">
									<div>
										{{ item.tradeName }}
									</div>
									<div>{{ item.oneLevelId }}/{{ item.twoLevelId }}/{{ item.brand }}</div>
								</div>
								<div class="voyage_cont_li_b" style="width: 100%">
									<div class="li_pallet_date">
										<img
											:src="
												source == 1
													? `http://58.33.34.10:10443/images/spart/${item.fileName}`
													: `http://39.105.35.83:10443/images/spart/${item.fileName}`
											"
											style="width: 60px; height: 60px"
										/>
									</div>
									<div class="li_pallet_place">
										<div class="li_pallet_place_s">
											<div>
												说明 :<span>{{ item.partExplain }}</span>
											</div>
										</div>
										<div class="li_pallet_place_s">
											<div>
												详情描述 :<span>{{ item.details }}</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 实用工具 -->
		<div class="home_practicalTool">
			<Practicaltool></Practicaltool>
		</div>
		<Hint @dighintStutas="dighintStutas" :hintStutas="hintStutas"></Hint>
	</div>
</template>
<script>
	import axios from "axios";
	import { mapMutations } from "vuex";
	import Practicaltool from "../../components/Practicaltool.vue";
	import CountDown from "../../components/countDown.vue";
	import Homesearch from "../../components/homesearch.vue";
	import {
		getContainerSpikeList,
		getAuctionCustomerList,
		getShipBookingList,
	} from "../../api/activity.js";
	import { getPalletListByWeb, getVoyageListByWeb } from "../../api/pallet";
	import { getSpartList } from "../../api/workbench";
	// 数字跳动
	import countTo from "vue-count-to";
	import Hint from "../../components/hint.vue";
	export default {
		data() {
			return {
				hintStutas: false,
				loading: false,
				loading2: false,
				loading3: false,
				options: [
					{
						value: "1",
						label: "上海港",
					},
				],
				ruleForm: {
					origin: "",
					purpose: "",
					goodsName: "",
					minton: "",
					maxton: "",
				},
				rules: {
					origin: [{ required: true, message: "请填写始发港", trigger: "change" }],
					purpose: [{ required: true, message: "请填写目的港", trigger: "change" }],
					goodsName: [{ required: true, message: "请选择货物", trigger: "change" }],
					minton: [{ required: true, message: "请输入最小吨位", trigger: "blur" }],
					maxton: [{ required: true, message: "请输入最大吨位", trigger: "blur" }],
				},
				// 测试倒计时
				endDate: "2021-12-20 18:00:00",
				Wxcode: "",
				hsearchTab: [
					{
						name: "海运订舱",
						id: "1",
					},
					{
						name: "散货货盘",
						id: "2",
					},
					{
						name: "集装箱买卖",
						id: "3",
					},
				],
				hotseachData: [
					{
						name: "宁波-洛杉矶(40HQ)",
						id: 1,
					},
					{
						name: "上海-休斯顿(40HQ)",
						id: 2,
					},
					{
						name: "上海-纽约(20GP)",
						id: 3,
					},
					{
						name: "天津-安特卫普(40HQ)",
						id: 4,
					},
					{
						name: "青岛-菲利克斯托(20GP)",
						id: 5,
					},
				],
				current: 0,
				activeName: "third",
				pallet: "foreign",
				voyage: "foreign",
				seckillData: [],
				auctioData: [],
				bookingData: [],
				foreignData: [],
				forVoyageData: [],
				startPortList: [],
				endtPortList: [],
				goodsNameList: [],
				roleinfo: [],
				shipSpartData: [],
				chuanDongSum: "",
				voyageLineSum: "",
				spartSum: "",
				huoZhuSum: "",
				portSum: "",
				palletSum: "",
				shipBookingSum: "",
				palletSum1: "",
				specialSum: "",
				emergencySum: "",
				source: "",
			};
		},
		components: {
			countTo,
			Practicaltool,
			CountDown,
			Homesearch,
			Hint,
		},
		mounted() {
			this.source = localStorage.getItem("source");
			if (this.$route.query.code) {
				this.Wxcode = this.$route.query.code;
				return this.$router.push("/");
			}
			// 集装箱秒杀
			// this.containerseckill();
			// 集装箱订舱
			this.containerbooking();
			// 集装箱竞拍
			// this.containerauctio();
			// 货盘数据
			this.foreignpallet();
			// 航次数据
			this.foreignvoyage();
			// 起始港
			this.getBegList();
			// 货物名称
			this.goodsName();
			// 船舶备件
			this.getSpartList();
			this.getnum();
			setInterval(() => {
				this.getnum();
			}, 3000);
		},
		created() {
			if (JSON.parse(localStorage.getItem("roleinfo"))) {
				this.roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
			}
		},
		computed: {
			newauctioData() {
				return this.auctioData.filter((item) => {
					return item.type != 0; //返回type==0的项，添加到newauctioData数组
				});
			},
		},
		methods: {
			async getnum() {
				let res = await axios({
					url: "api/sys/user/getIndexUserData",
					method: "get",
				});
				if (res.data.code == "0000") {
					this.chuanDongSum = res.data.data.chuanDongSum + 10000;
					this.voyageLineSum = res.data.data.voyageLineSum;
					this.spartSum = res.data.data.spartSum;
					this.huoZhuSum = res.data.data.huoZhuSum + 40000;
					this.portSum = res.data.data.portSum + 10000;
					this.palletSum = res.data.data.palletSum;
					this.shipBookingSum = res.data.data.shipBookingSum;
					this.palletSum1 = res.data.data.palletSum;
					this.specialSum = res.data.data.specialSum;
					this.emergencySum = res.data.data.emergencySum;
				}
			},
			async getBegList() {
				let res = await axios.get("https://www.dylnet.cn/api/sys/dict/type?type=port");
				if (res.data.code == "0000") {
					this.startPortList = res.data.data.zh[0].items;
					this.endtPortList = res.data.data.zh[0].items;
				} else {
					this.startPortList = [];
					this.endtPortList = [];
				}
			},
			async goodsName() {
				let res = await axios.get("https://www.dylnet.cn/api/sys/dict/type?type=goods_name");
				if (res.data.code == "0000") {
					this.goodsNameList = res.data.data.zh[0].items;
				} else {
					this.goodsNameList = [];
				}
			},
			dighintStutas(stats) {
				this.hintStutas = stats;
			},
			gohint() {
				this.hintStutas = true;
			},
			...mapMutations(["product"]),
			containerseckill() {
				let SpikeList = {
					currentPage: 1,
					pageSize: 3,
				};
				this.loading3 = true;
				getContainerSpikeList(SpikeList).then((res) => {
					this.loading3 = false;
					if (res.code == "0000") {
						this.seckillData = res.data.result;
					} else {
						this.seckillData = [];
					}
				});
			},
			containerauctio() {
				let SpikeList = {
					currentPage: 1,
					pageSize: 3,
				};
				this.loading3 = true;
				getAuctionCustomerList(SpikeList).then((res) => {
					this.loading3 = false;
					if (res.code == "0000") {
						this.auctioData = res.data.result;
					} else {
						this.auctioData = [];
					}
				});
			},
			containerbooking() {
				this.loading3 = true;
				getShipBookingList().then((res) => {
					this.loading3 = false;
					if (res.code == "0000") {
						this.bookingData = res.data.shipBookings.slice(0, 3);
					} else {
						this.bookingData = [];
					}
				});
			},
			// 更多产品服务
			goProduct() {
				this.product(2);
				this.$router.push({
					path: "/product",
					query: { active: this.activeName },
				});
			},
			searchTab(index) {
				this.current = index;
			},
			handleClick(tab) {
				switch (tab.name) {
					case "first":
						this.containerseckill();
						break;
					case "second":
						this.containerauctio();
						break;
					case "third":
						this.containerbooking();
						break;
				}
			},
			// 下一步
			freightNext() {
				if (localStorage.getItem("token")) {
					if (this.ruleForm.minton > this.ruleForm.maxton) {
						this.$message.warning("最大吨位不能小于最小吨位！！");
					}
					this.$refs.ruleForm.validate((valid) => {
						if (valid) {
							this.$router.push({
								name: "bulkCargo",
								params: {
									origin: this.ruleForm.origin,
									purpose: this.ruleForm.purpose,
									goodsName: this.ruleForm.goodsName,
									minton: this.ruleForm.minton,
									maxton: this.ruleForm.maxton,
								},
							});
						}
					});
				} else {
					this.$message.warning("请先登录");
				}
			},
			// 国际货盘
			foreignpallet() {
				this.loading = true;
				this.pallet = "foreign";
				let Palletforeign = {
					keyword: "",
					internationalTransport: 1,
					currentPage: 1,
					pageSize: 12,
				};
				getPalletListByWeb(Palletforeign).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						let data = res.data.palletListByWeb.records;
						this.foreignData = [data.slice(0, 4), data.slice(4, 8), data.slice(8, 12)];
					} else {
						this.foreignData = [];
					}
				});
			},
			// 国内货盘
			internalpallet() {
				this.loading = true;
				this.pallet = "internal";
				let Palletinternal = {
					keyword: "",
					internationalTransport: 0,
					currentPage: 1,
					pageSize: 4,
				};
				getPalletListByWeb(Palletinternal).then((res) => {
					this.loading = false;
					if (res.code == "0000") {
						this.foreignData = res.data.palletListByWeb.records;
					} else {
						this.foreignData = [];
					}
				});
			},
			// 国际航次
			foreignvoyage() {
				this.loading2 = true;
				this.voyage = "foreign";
				let Palletforeign = {
					keyword: "",
					internationalTransport: 1,
					currentPage: 1,
					pageSize: 2,
				};
				getVoyageListByWeb(Palletforeign).then((res) => {
					this.loading2 = false;
					if (res.code == "0000") {
						this.forVoyageData = res.data.voyages.records;
					} else {
						this.forVoyageData = [];
					}
				});
			},
			// 国内航次
			internalvoyage() {
				this.loading2 = true;
				this.voyage = "internal";
				let Palletforeign = {
					keyword: "",
					internationalTransport: 0,
					currentPage: 1,
					pageSize: 2,
				};
				getVoyageListByWeb(Palletforeign).then((res) => {
					this.loading2 = false;
					if (res.code == "0000") {
						this.forVoyageData = res.data.voyages.records;
					} else {
						this.forVoyageData = [];
					}
				});
			},
			getSpartList() {
				let params = {
					number: this.number || "",
					tradeName: this.tradeName || "",
					oneLevelId: this.oneLevelId || "",
					twoLevelId: this.twoLevelId || "",
					shelf: this.shelf || "",
					currentPage: 1,
					pageSize: 2,
				};
				getSpartList(params).then((res) => {
					if (res.code == "0000") {
						this.shipSpartData = res.data.records;
					} else {
						this.shipSpartData = [];
					}
				});
			},
			toReSpart() {
				this.$router.push("/workbench/spart/reSpart");
			},
			// 秒杀详情
			SeckillDetails(id) {
				// this.product(2);
				// if (id == 2) {
				//   this.$router.push({
				//     path: "/product/seckillDet",
				//     query: { id: 1 },
				//   });
				// } else if (id == 1) {
				//   this.$router.push({
				//     path: "/product/foreshow",
				//     query: { id: 2 },
				//   });
				// }
			},
			// 国际国内航次
			toVoyagetime() {
				this.product(2);
				this.$router.push({
					path: "/product/voyagetime",
					query: { active: this.voyage },
				});
			},
			// 船舶备件
			toshipSpart() {
				this.product(2);
				this.$router.push({
					path: "/product/shipSpart",
					query: { active: this.voyage },
				});
			},
			// 国际国内货盘
			toproduct() {
				this.product(2);
				this.$router.push({
					path: "/product/pallet",
					query: { active: this.pallet },
				});
			},
			// 国内货盘详情
			toDetinternal(id) {
				this.product(2);
				this.$router.push({
					path: "/details/pallet/internal",
					query: { id: id },
				});
			},
			// 国际货盘详情
			toDetforeign(id) {
				this.product(2);
				this.$router.push({
					path: "/details/pallet/foreign",
					query: { guid: id },
				});
			},
			// 国内国际航次详情
			toDetvoforeign() {
				this.product(2);
				if (this.voyage == "foreign") {
					this.$router.push({
						path: "/details/voyagetime/foreign",
						query: { id: 1 },
					});
				} else {
					this.$router.push({
						path: "/details/voyagetime/internal",
						query: { id: 1 },
					});
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.home {
		.home_bg {
			background: url("../../assets/homepage/蒙版组 259.png") no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 340px;
			.home_content {
				width: 1164px;
				margin: 0 auto;
				.home_title {
					text-align: center;
					padding: 60px 0 36px 0;
					font-size: 40px;
					line-height: 40px;
					font-weight: 400;
					color: #ffffff;
					text-shadow: 0px 0px 10px rgba(0, 68, 145, 0.47);
					letter-spacing: 4px;
				}
				.home_search_bg {
					margin: 0 auto;
					width: 1080px;
					background: rgba(#000000, 0.15);
					border-radius: 6px;
					padding: 14px 44px 24px;
					box-sizing: border-box;
					.home_search_tab {
						ul {
							display: flex;
							padding: 0 0 14px 5px;
							li {
								font-size: 16px;
								font-weight: 400;
								color: #ffffff;
								margin: 0 15px;
								padding: 8px 15px;
								line-height: 16px;
								position: relative;
								cursor: pointer;
								&:hover {
									background: #51aeff;
									border-radius: 16px;
								}
							}
							li:hover::after {
								content: "";
								width: 23px;
								height: 12px;
								position: absolute;
								background: url("../../assets/homepage/多边形 1@2x (2).png") no-repeat;
								background-size: 23px 12px;
								display: block;
								bottom: -10px;
								top: 29px;
								left: 50%;
								margin-left: -11px;
							}
							.home_search_tab_active {
								background: #51aeff;
								border-radius: 16px;
							}
							.home_search_tab_active::after {
								content: "";
								width: 23px;
								height: 12px;
								position: absolute;
								background: url("../../assets/homepage/多边形 1@2x (2).png") no-repeat;
								background-size: 23px 12px;
								display: block;
								top: 29px;
								left: 50%;
								margin-left: -11px;
							}
						}
					}
				}
				.home_hot {
					display: flex;
					flex-wrap: wrap;
					margin-left: 171px;
					margin-top: 20px;
					.hot_title {
						font-size: 14px;
						font-weight: 400;
						line-height: 14px;
						color: #b7ceff;
						margin-right: 12px;
					}
					.hot_details {
						ul {
							display: flex;
							flex-wrap: wrap;
							li {
								font-size: 14px;
								font-weight: 400;
								line-height: 14px;
								color: #b7ceff;
								margin-right: 28px;
							}
						}
					}
				}
			}
		}
		.home_exhibition_bg {
			background: linear-gradient(180deg, #e5eeff 0%, #ffffff 67%, #ffffff 100%);
			margin-bottom: 70px;
			.home_exhibition {
				width: 1164px;
				margin: 0 auto;
				ul {
					display: flex;
					justify-content: center;
					li {
						flex-shrink: 0;
						text-align: center;
						padding: 11px 0 10px;
						margin: 0 13px;
						width: 100px;
						div:nth-child(1) {
							font-size: 24px;
							line-height: 26px;
							font-family: "d-din", "Microsoft YaHei", Arial;
							font-weight: 400;
							color: #49556d;
							margin-bottom: 7px;
						}
						div:nth-child(2) {
							font-size: 14px;
							line-height: 14px;
							font-weight: 400;
							color: #909399;
						}
					}
				}
			}
		}
		.home_container {
			width: 1164px;
			margin: 0 auto;
			position: relative;
			.more {
				width: 52px;
				height: 16px;
				background: url("../../assets/homepage/组 8506@2x.png") no-repeat;
				background-size: cover;
				position: absolute;
				cursor: pointer;
				right: 10px;
				top: 83px;
				z-index: 5;
			}
			.container_title {
				text-align: center;
				font-size: 28px;
				font-weight: 400;
				line-height: 28px;
				color: #303133;
				margin-bottom: 36px;
			}
			.container_tabs {
				margin-bottom: 11px;
			}
			// 现舱秒杀
			.container_list {
				margin-bottom: 100px;
				ul {
					display: flex;
					justify-content: space-between;
					li {
						box-sizing: border-box;
						height: 224px;
						background: #ffffff;
						border: 1px solid #ebeef5;
						width: 380px;
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						border-radius: 6px;
						padding: 24px 33px 0 24px;
						position: relative;
						cursor: pointer;
						.container_list_start {
							display: flex;
							justify-content: space-between;
							margin-bottom: 14px;
							.start_l {
								flex-shrink: 0;
								.start_l_from {
									margin-bottom: 10px;
									.start_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 179@2x.png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.start_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
								.start_l_end {
									.end_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 180@2x.png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.end_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
							}
							.start_r {
								flex-shrink: 0;
								margin-left: 24px;
								padding-top: 8px;
								.start_r_Closing {
									margin-bottom: 14px;
									display: flex;
									span {
										display: block;
									}
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										color: #303133;

										margin: 3px 0 1px 0;
									}
								}
								.start_r_sail {
									margin-bottom: 14px;
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										margin: 3px 0 1px 0;
										color: #303133;
									}
								}
								.start_r_voyage {
									span {
										font-size: 14px;
										line-height: 14px;
										font-weight: 400;
										color: #3b7cfb;
										margin-right: 8px;
									}
								}
							}
						}
						.container_list_box {
							.box_pile {
								display: flex;
								margin-bottom: 4px;
								div:nth-child(1) {
									width: 20px;
									height: 20px;
									background: url("../../assets/homepage/蒙版组 256@2x.png") no-repeat;
									background-size: cover;
								}
								div:nth-child(2) {
									font-size: 14px;
									font-weight: 500;
									color: #303133;
									width: 42px;
									line-height: 20px;
									margin: 0 14px 0 10px;
								}
								.box_pile_boxType {
									display: flex;
									span {
										display: block;
										font-size: 14px;
										font-weight: 400;
										line-height: 20px;
										color: #303133;
										display: flex;
										align-items: center;
									}
									// .spandisp {
									// padding: 0 2px 0 4px;
									// width: 6px;
									// }
									span:nth-last-child(1) {
										.spandisp {
											display: none;
										}
									}
								}
							}
							.box_seckill {
								display: flex;
								div:nth-child(1) {
									width: 20px;
									height: 20px;
									background: url("../../assets/homepage/蒙版组 250@2x.png") no-repeat;
									background-size: cover;
								}
								div:nth-child(2) {
									font-size: 14px;
									font-weight: 500;
									color: #e95b5b;
									font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									line-height: 20px;
									margin: 0 14px 0 10px;
								}
								.box_pile_priceType {
									display: flex;
									span {
										font-size: 18px;
										font-family: "D-DINxp", "Microsoft YaHei", Arial;
										font-weight: 400;
										color: #e95b5b;
										line-height: 20px;
										display: block;
										display: flex;
										align-items: center;
									}
									// .spandisp {
									// padding: 0 4px 0 4px;
									// width: 6px;
									// }
									span:nth-last-child(1) {
										.spandisp {
											display: none;
										}
									}
								}
							}
						}

						.container_list_time {
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #909399;
							.time_foreshow {
								padding-top: 18px;
							}
							.time_countDown {
								padding-top: 13px;
								display: flex;
								align-items: center;
								div:nth-child(1) {
									margin-right: 8px;
								}
							}
						}
						.container_foreshow_tag {
							position: absolute;
							background: url("../../assets/homepage/组 7962@2x.png") no-repeat;
							background-size: cover;
							display: block;
							width: 54px;
							height: 20px;
							top: 0;
							right: 0;
						}
						.container_seckill_tag {
							position: absolute;
							background: url("../../assets/homepage/组 6947@2x.png") no-repeat;
							background-size: cover;
							display: block;
							width: 54px;
							height: 20px;
							top: 0;
							right: 0;
						}
					}
				}
			}
			// 现舱竞拍
			.container_list_auctio {
				margin-bottom: 100px;
				ul {
					display: flex;
					justify-content: space-between;
					li {
						box-sizing: border-box;
						height: 224px;
						width: 380px;
						background: #ffffff;
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						border: 1px solid #ebeef5;
						border-radius: 6px;
						padding: 32px 33px 0 24px;
						position: relative;
						cursor: pointer;
						.container_list_start {
							display: flex;
							justify-content: space-between;
							margin-bottom: 20px;
							.start_l {
								.start_l_from {
									margin-bottom: 10px;
									.start_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 179@2x.png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.start_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
								.start_l_end {
									.end_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 180@2x-1.png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.end_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
							}
							.start_r {
								margin-left: 24px;
								.start_r_Closing {
									margin-bottom: 14px;
									display: flex;
									span {
										display: block;
									}
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										color: #303133;
										margin: 3px 0 1px 0;
									}
								}
								.start_r_sail {
									margin-bottom: 14px;
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										margin: 3px 0 1px 0;
										color: #303133;
									}
								}
								.start_r_voyage {
									span {
										font-size: 14px;
										line-height: 14px;
										font-weight: 400;
										color: #3b7cfb;
										margin-right: 8px;
									}
								}
							}
						}
						.container_list_box {
							display: flex;
							.box_auctio_l {
								width: 172px;
								.box_auctio_number {
									display: flex;
									height: 20px;
									align-items: center;
									div:nth-child(1) {
										font-size: 16px;
										font-weight: 500;
										line-height: 16px;
										margin-right: 25px;
										color: #303133;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									div:nth-child(2) {
										font-size: 16px;
										font-weight: 400;
										line-height: 16px;
										color: #303133;

										span {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #3b7cfb;
											margin-left: 10px;
										}
									}
								}
								.container_list_time {
									font-size: 14px;
									font-weight: 400;
									line-height: 14px;
									color: #909399;
									.time_foreshow {
										padding-top: 22px;
									}
									.time_countDown {
										padding-top: 16px;
										display: flex;
										align-items: center;
										div:nth-child(1) {
											margin-right: 8px;
										}
									}
								}
							}
							.box_auctio_r {
								margin-left: 24px;
								.box_auctio_r_starting {
									margin-bottom: 11px;
									font-size: 14px;
									height: 20px;
									line-height: 20px;
									color: #909399;
									span {
										font-size: 18px;
										font-weight: 400;
										color: #ff6851;
										font-family: "D-DINxp", "Microsoft YaHei", Arial;
										margin-left: 12px;
									}
								}
								.box_auctio_r_present {
									font-size: 14px;
									height: 20px;
									line-height: 20px;
									color: #909399;
									span {
										font-size: 18px;
										font-weight: 400;
										color: #ff6851;
										font-family: "D-DINxp", "Microsoft YaHei", Arial;
										margin-left: 12px;
									}
								}
							}
						}
						.container_foreshow_tag {
							position: absolute;
							background: url("../../assets/homepage/组 7962@2x.png") no-repeat;
							background-size: cover;
							display: block;
							width: 54px;
							height: 20px;
							top: 0;
							right: 0;
						}
						.container_seckill_tag {
							position: absolute;
							background: url("../../assets/homepage/组 6947@2x (2).png") no-repeat;
							background-size: cover;
							display: block;
							width: 54px;
							height: 20px;
							top: 0;
							right: 0;
						}
					}
				}
			}
			// 集装箱订舱
			.container_list_book {
				margin-bottom: 100px;
				ul {
					display: flex;
					justify-content: space-between;
					li {
						box-sizing: border-box;
						height: 224px;
						width: 380px;
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						background: #ffffff;
						border: 1px solid #ebeef5;
						border-radius: 6px;
						padding: 32px 33px 0 24px;
						position: relative;
						cursor: pointer;
						.container_list_start {
							display: flex;
							justify-content: space-between;
							margin-bottom: 13px;
							.start_l {
								.start_l_from {
									margin-bottom: 10px;
									.start_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 179@2x.png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.start_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
								.start_l_end {
									.end_l_from_china {
										display: flex;
										margin-bottom: 2px;
										i {
											flex-shrink: 0;
											display: block;
											width: 20px;
											height: 20px;
											background: url("../../assets/homepage/蒙版组 180@2x (1).png") no-repeat;
											background-size: cover;
											margin-right: 10px;
										}
										div {
											font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
											width: 142px;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											font-size: 18px;
											line-height: 18px;
											font-weight: 500;
											color: #303133;
										}
									}
									.end_l_from_eng {
										width: 142px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 12px;
										line-height: 14px;
										font-weight: 400;
										color: #909399;
										margin-left: 30px;
									}
								}
							}
							.start_r {
								margin-left: 24px;
								.start_r_Closing {
									margin-bottom: 14px;
									display: flex;
									span {
										display: block;
									}
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										color: #303133;
										margin: 3px 0 1px 0;
									}
								}
								.start_r_sail {
									margin-bottom: 14px;
									span:nth-child(1) {
										font-size: 14px;
										font-weight: 400;
										color: #909399;
										line-height: 14px;
										margin: 1px 0;
									}
									span:nth-child(2) {
										font-size: 16px;
										line-height: 16px;
										font-weight: 500;
										color: #303030;
										padding: 0 6px 0 8px;
										font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
									}
									span:nth-child(3) {
										font-size: 12px;
										line-height: 12px;
										font-weight: 400;
										margin: 3px 0 1px 0;
										color: #303133;
									}
								}
								.start_r_voyage {
									span {
										font-size: 14px;
										line-height: 14px;
										font-weight: 400;
										color: #3b7cfb;
										margin-right: 8px;
									}
								}
							}
						}
						.container_list_box {
							margin-bottom: 12px;
							.box_pile {
								display: flex;
								margin-bottom: 4px;
								div:nth-child(1) {
									width: 20px;
									height: 20px;
									background: url("../../assets/homepage/蒙版组 256.png") no-repeat;
									background-size: cover;
								}
								div:nth-child(2) {
									margin-left: 11px;
									font-size: 14px;
									font-weight: 400;
									line-height: 20px;
									color: #303133;
								}
							}
							.box_seckill {
								display: flex;
								div:nth-child(1) {
									width: 20px;
									height: 20px;
									background: url("../../assets/homepage/蒙版组 74.png") no-repeat;
									background-size: cover;
									span {
										padding: 0 3px;
									}
								}
								div:nth-child(2) {
									margin-left: 8px;
									font-size: 18px;
									font-family: "D-DINxp", "Microsoft YaHei", Arial;
									font-weight: 400;
									line-height: 20px;
									color: #ff7c41;
									span {
										padding: 0 3px;
									}
								}
							}
						}
						.container_list_label {
							span {
								display: inline-block;
								// box-sizing: border-box;
								margin-right: 8px;
								font-size: 12px;
								font-weight: 400;
								line-height: 12px;
								color: #4791ff;
								padding: 3px 4px;
								border: 1px solid #91c1ff;
								border-radius: 4px;
							}
						}
					}
				}
			}
		}
		.home_straygoods {
			width: 1164px;
			margin: 0 auto;
			margin-bottom: 51px;
			.straygoods_title {
				text-align: center;
				font-size: 28px;
				font-weight: 400;
				line-height: 28px;
				color: #303133;
			}
			.straygoods_content {
				display: flex;
				.straygoods_content_l {
					margin-top: 50px;
					.straygoods_freight_title {
						display: flex;
						margin-bottom: 25px;
						.straygoods_freight_p {
							font-size: 18px;
							font-weight: normal;
							line-height: 29px;
							color: #303133;
							margin-right: 14px;
							font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
						}
						.straygoods_freight_t {
							padding: 7px 12px 7px 8px;
							background: #f2f9ff;
							border-radius: 4px;
							display: flex;
							align-items: center;
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #4791ff;
							div:nth-child(1) {
								background: url("../../assets/homepage/蒙版组 273.png") no-repeat;
								background-size: cover;
								width: 14px;
								height: 14px;
								margin-right: 4px;
							}
							div:nth-child(3) {
								background: url("../../assets/homepage/蒙版组 274.png") no-repeat;
								background-size: cover;
								margin: 0 4px 0 12px;
								width: 14px;
								height: 14px;
							}
						}
					}
					.straygoods_freight_seach {
						box-sizing: border-box;
						padding: 19px 35px 15px 23px;
						// width: 380px;
						// height: 308px;
						border: 1px solid #ebeef5;
						background: linear-gradient(180deg, #f5f9ff 0%, #ffffff 38%, #ffffff 100%);
						box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
						border-radius: 6px;
						.straygoods_freight_seach_input {
							display: flex;
							.straygoods_freight_ico {
								div {
									margin: 10px 20px 38px 0;
								}
								div:nth-child(1) {
									background: url("../../assets/homepage/蒙版组 179.png") no-repeat;
									background-size: cover;
									width: 20px;
									height: 20px;
								}
								div:nth-child(2) {
									background: url("../../assets/homepage/蒙版组 180.png") no-repeat;
									background-size: cover;
									width: 20px;
									height: 20px;
								}
								div:nth-child(3) {
									background: url("../../assets/homepage/蒙版组 270.png") no-repeat;
									background-size: cover;
									width: 20px;
									height: 20px;
								}
								div:nth-child(4) {
									background: url("../../assets/homepage/蒙版组 271.png") no-repeat;
									background-size: cover;
									width: 20px;
									height: 20px;
								}
							}
						}
						.straygoods_freight_bott {
							display: flex;
							padding-top: 4px;
							// align-items: center;
							.straygoods_freight_bott_l {
								flex-shrink: 0;
								font-size: 14px;
								font-weight: 400;
								line-height: 14px;
								color: #606266;
							}
							.straygoods_freight_bott_r {
								margin-left: 34px;
								margin-top: -14px;
								span {
									display: block;
									cursor: pointer;
									box-sizing: border-box;
									text-align: center;
									width: 104px;
									background: #e6f2ff;
									border: 1px solid #91c1ff;
									border-radius: 30px;
									padding: 12px 0 10px 0;
									font-size: 16px;
									line-height: 16px;
									color: #4791ff;
								}
							}
						}
					}
				}
				.straygoods_content_r {
					position: relative;
					margin-top: 48px;
					// margin-left: 12px;
					.more {
						width: 52px;
						height: 16px;
						background: url("../../assets/homepage/组 8506@2x.png") no-repeat;
						background-size: cover;
						position: absolute;
						cursor: pointer;
						right: 10px;
						top: 6px;
						z-index: 5;
					}
					.straygoods_pallet {
						display: flex;
						margin-bottom: 24px;
						margin-left: 12px;
						position: relative;
						width: 775px;
						span {
							display: block;
							font-size: 16px;
							background: #ffffff;
							border: 1px solid #dcdfe6;
							opacity: 1;
							border-radius: 4px;
							padding: 7px 19px;
							font-weight: 400;
							line-height: 16px;
							color: #606266;
							margin-right: 14px;
							cursor: pointer;
							&:hover {
								border: 1px solid #4791ff;
								color: #4791ff;
							}
						}
						.pallet_optfor {
							color: #3b7cfb;
							background: #e6f2ff;
							border: 1px solid #e6f2ff;
							&:hover {
								border: 1px solid #e6f2ff;
							}
						}
					}
					.pallet_cont {
						.el-carousel__item {
							height: auto;
							ul {
								display: flex;
								flex-wrap: wrap;
								li {
									box-sizing: border-box;
									margin-left: 12px;
									margin-bottom: 12px;
									height: 148px;
									width: 380px;
									background: #ffffff;
									border: 1px solid #ebeef5;
									box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
									border-radius: 6px;
									.pallet_cont_li_h {
										background: #f5f9ff;
										border-radius: 5px 5px 0 0;
										border-bottom: 1px solid #ebeef5;
										font-size: 16px;
										font-weight: 400;
										line-height: 16px;
										color: #303133;
										padding: 14px 0 13px 20px;
										span {
											padding: 0 4px;
										}
									}
									.pallet_cont_li_b {
										display: flex;
										.li_pallet_date {
											margin: 27px 7px 32px 7px;
											font-size: 14px;
											font-weight: 400;
											line-height: 14px;
											color: #303133;
											.li_pallet_date_s {
												margin-bottom: 16px;
												display: flex;
												div:nth-child(1) {
													margin-right: 8px;
												}
											}
											.li_pallet_date_e {
												display: flex;
												div:nth-child(1) {
													margin-right: 8px;
												}
											}
										}
										.li_pallet_g {
											width: 1px;
											height: 40px;
											background: #e4e7ed;
											margin: 29px 14px 35px 0;
										}
										.li_pallet_place {
											font-size: 16px;
											font-weight: 400;
											line-height: 16px;
											color: #303133;
											margin: 26px 0 32px 0;
											.li_pallet_place_s {
												margin-bottom: 14px;
												display: flex;
												align-items: center;
												height: 16px;
												.li_pallet_place_cir {
													margin-right: 8px;
													width: 8px;
													height: 8px;
													background: #4791ff;
													border-radius: 50%;
												}
												.li_pallet_place_cir_foreign {
													margin-right: 8px;
													width: 8px;
													height: 8px;
													background: #26a6e9;
													border-radius: 50%;
												}
												div:nth-child(2) {
													width: 126px;
													white-space: nowrap;
													overflow: hidden;
													text-overflow: ellipsis;
													margin-right: 2px;
													font-size: 16px;
													font-weight: 400;
													line-height: 16px;
													color: #303133;
												}
											}
											.li_pallet_place_e {
												display: flex;
												align-items: center;
												height: 16px;
												div:nth-child(1) {
													margin-right: 8px;
													width: 8px;
													height: 8px;
													background: #ff7c41;
													border-radius: 50%;
												}
												div:nth-child(2) {
													width: 126px;
													white-space: nowrap;
													overflow: hidden;
													text-overflow: ellipsis;
													font-size: 16px;
													font-weight: 400;
													line-height: 16px;
													color: #303133;
												}
											}
										}
										.li_pallet_btn {
											margin-top: 18px;
											margin-right: 28px;
											div {
												background: #ffffff;
												border: 1px solid #ebeef5;
												box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
												border-radius: 4px;
												cursor: pointer;
												font-size: 14px;
												padding: 6px 25px;
												font-weight: 400;
												line-height: 14px;
											}
											div:nth-child(1) {
												color: #606266;
												margin-bottom: 10px;
												&:hover {
													background: #f5f9ff;
												}
											}
											div:nth-child(2) {
												background: #4791ff;
												color: #fff;
												&:hover {
													background: #51aeff;
												}
											}
										}
										.li_pallet_btn_internal {
											margin-top: 18px;
											margin-right: 28px;
											div {
												background: #ffffff;
												border: 1px solid #ebeef5;
												box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
												border-radius: 4px;
												cursor: pointer;
												font-size: 14px;
												padding: 6px 25px;
												font-weight: 400;
												line-height: 14px;
											}
											div:nth-child(1) {
												color: #606266;
												margin-bottom: 10px;
												&:hover {
													background: #f5f9ff;
												}
											}
											div:nth-child(2) {
												background: #26a6e9;
												color: #fff;
												&:hover {
													background: #3db4f2;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		.home_banner {
			width: 1164px;
			margin: 0 auto;
		}
		.home_voyage {
			width: 1164px;
			margin: 0 auto;
			margin-bottom: 120px;
			.voyage_content {
				display: flex;
				width: 1164px;
				.voyage_content_l {
					margin-top: 51px;

					.voyage_freight_title {
						display: flex;
						margin-bottom: 27px;
						.voyage_freight_p {
							font-size: 18px;
							font-weight: normal;
							line-height: 28px;
							color: #303133;
							margin-right: 16px;
							font-family: "SourceHanSansCN-Medium", "Microsoft YaHei", Arial;
						}
						.voyage_freight_t {
							padding: 7px 12px 7px 8px;
							background: #f2f9ff;
							border-radius: 4px;
							display: flex;
							align-items: center;
							font-size: 14px;
							font-weight: 400;
							line-height: 14px;
							color: #4791ff;
							div:nth-child(1) {
								background: url("../../assets/homepage/蒙版组 276.png") no-repeat;
								background-size: cover;
								width: 14px;
								height: 14px;
								margin-right: 4px;
							}
							div:nth-child(2) {
								margin-right: 3px;
							}
						}
					}
					.announce_voyage {
						box-sizing: border-box;
						border: 1px solid #ebeef5;
						background: linear-gradient(180deg, #f1f7ff 0%, #ffffff 37%, #ffffff 100%);
						box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05);
						border-radius: 6px;
						display: flex;
						.announce_new_voyage {
							margin: 53px 14px 54px 23px;
							div:nth-child(1) {
								display: flex;
								margin-bottom: 8px;
								span:nth-child(1) {
									background: url("../../assets/homepage/蒙版组 272.png") no-repeat;
									width: 16px;
									height: 16px;
									display: block;
									margin-right: 6px;
								}
								span:nth-child(2) {
									display: block;
									font-size: 16px;
									font-weight: 400;
									line-height: 16px;
									color: #3b7cfb;
								}
							}
							div:nth-child(2) {
								font-size: 14px;
								font-weight: 400;
								line-height: 14px;
								color: #909399;
							}
						}
						.announce_foreign_voyage {
							width: 94px;
							height: 90px;
							margin: 28px 0 27px;
							position: relative;
							img {
								width: 100%;
								height: 100%;
								display: block;
								cursor: pointer;
							}
						}
						.announce_foreign_voyage:hover::after {
							content: "";
							width: 94px;
							height: 90px;
							background: rgba(82, 174, 255, 0.05);
							border-radius: 8px;
							position: absolute;
							cursor: pointer;
							top: 0;
							left: 0;
						}
						.announce_internal_voyage {
							width: 94px;
							height: 90px;
							margin: 28px 19px 27px 8px;
							position: relative;
							img {
								width: 100%;
								height: 100%;
								display: block;
								cursor: pointer;
							}
						}
						.announce_internal_voyage:hover::after {
							content: "";
							width: 94px;
							height: 90px;
							background: rgba(82, 174, 255, 0.05);
							border-radius: 8px;
							position: absolute;
							cursor: pointer;
							top: 0;
							left: 0;
						}
					}
				}
				.voyage_content_r {
					margin-top: 48px;
					position: relative;
					.more {
						width: 52px;
						height: 16px;
						background: url("../../assets/homepage/组 8506@2x.png") no-repeat;
						background-size: cover;
						position: absolute;
						cursor: pointer;
						right: 10px;
						top: 6px;
						z-index: 5;
					}
					.straygoods_voyage {
						display: flex;
						margin-bottom: 24px;
						margin-left: 12px;
						position: relative;
						width: 755px;
						span {
							display: block;
							font-size: 16px;
							background: #ffffff;
							border: 1px solid #dcdfe6;
							opacity: 1;
							border-radius: 4px;
							padding: 7px 19px;
							font-weight: 400;
							line-height: 16px;
							color: #606266;
							margin-right: 14px;
							cursor: pointer;
							&:hover {
								border: 1px solid #4791ff;
								color: #4791ff;
							}
						}
						.voyage_optfor {
							color: #3b7cfb;
							background: #e6f2ff;
							border: 1px solid #e6f2ff;
							&:hover {
								border: 1px solid #e6f2ff;
							}
						}
					}
					.voyage_cont {
						ul {
							display: flex;
							flex-wrap: wrap;
							li {
								margin-left: 12px;
								box-sizing: border-box;
								height: 148px;
								background: #ffffff;
								border: 1px solid #ebeef5;
								box-shadow: 0px 1px 3px rgba(73, 85, 109, 0.1);
								border-radius: 6px;
								cursor: pointer;
								.voyage_cont_li_h {
									background: #f5f9ff;
									border-radius: 5px 5px 0px 0px;
									font-size: 16px;
									font-weight: 400;
									line-height: 16px;
									color: #303133;
									padding: 13px 19px 12px 19px;
									border-bottom: 1px solid #ebeef5;
									display: flex;
									justify-content: space-between;
									width: 340px;
									div:nth-child(1) {
										width: 180px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										margin-right: 2px;
										span {
											display: inline-block;
											width: 12px;
											text-align: center;
											padding: 0 2px;
										}
									}
									div:nth-child(2) {
										width: 158px;
										text-align: right;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
									}
								}
								.voyage_cont_li_b {
									display: flex;
									.li_pallet_date {
										margin: 26px 14px 32px 19px;
										font-size: 14px;
										font-weight: 400;
										line-height: 14px;
										color: #303133;
										.li_pallet_date_s {
											margin-bottom: 16px;
											display: flex;
											div:nth-child(1) {
												margin-right: 8px;
												width: 28px;
											}
										}
										.li_pallet_date_e {
											display: flex;
											div:nth-child(1) {
												margin-right: 8px;
												width: 28px;
											}
										}
									}
									.li_pallet_g {
										width: 1px;
										height: 40px;
										background: #e4e7ed;
										margin: 28px 14px 34px 0;
									}
									.li_pallet_place {
										font-size: 16px;
										font-weight: 400;
										line-height: 16px;
										display: flex;
										flex-direction: column;
										justify-content: space-between;
										color: #303133;
										margin: 25px 0 31px 0;
										.li_pallet_place_s {
											margin-bottom: 14px;
											display: flex;
											align-items: center;
											height: 16px;
											span {
												margin-left: 20px;
												font-size: 12px;
												color: rgb(117, 115, 115);
											}
											.li_pallet_place_cir {
												margin-right: 8px;
												width: 8px;
												height: 8px;
												background: #4791ff;
												border-radius: 50%;
											}
											.li_pallet_place_cir_foreign {
												margin-right: 8px;
												width: 8px;
												height: 8px;
												background: #26a6e9;
												border-radius: 50%;
											}
											div:nth-child(2) {
												width: 212px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
												margin-right: 2px;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
												color: #303133;
											}
										}
										.li_pallet_place_e {
											display: flex;
											align-items: center;
											height: 16px;
											div:nth-child(1) {
												margin-right: 8px;
												width: 8px;
												height: 8px;
												background: #ff7c41;
												border-radius: 50%;
											}
											div:nth-child(2) {
												width: 212px;
												white-space: nowrap;
												overflow: hidden;
												text-overflow: ellipsis;
												font-size: 16px;
												font-weight: 400;
												line-height: 16px;
												color: #303133;
												.voyageend:nth-child(1) {
													display: none;
												}
												.voyageend:last-child {
													.oyagenum {
														display: none;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		.home_practicalTool {
			height: 188px;
			background: #f3f8ff;
		}
	}
	.el-input,
	.el-select {
		width: 280px;
	}
	/deep/ .te_input {
		.el-form-item {
			margin-bottom: 0;
		}
	}
	/deep/ .el-form-item {
		margin-bottom: 18px;
	}
	/deep/.el-tabs__nav-wrap::after {
		width: 474px;
	}
	/deep/.el-tabs {
		margin-left: 361px;
	}
	/deep/.el-tabs__nav {
		margin-left: 64px;
	}

	/deep/.el-tabs__item {
		padding: 0 33px;
		font-size: 16px;
		color: #606266;
	}
	/deep/.el-tabs__item:hover {
		color: #3b7cfb;
	}
	/deep/.el-tabs__item.is-active {
		color: #3b7cfb;
	}
	/deep/.el-tabs__active-bar {
		background: #3b7cfb;
	}

	/deep/ .el-tabs__nav-scroll {
		overflow: visible;
	}
	/deep/ .el-tabs__nav-wrap {
		overflow: visible;
		height: 40px;
	}
	/deep/ #tab-first::after {
		content: "";
		display: block;
		width: 56px;
		height: 18px;
		background: #f56a3f;
		background: url("../../assets/homepage/组 7967@2x.png") no-repeat;
		background-size: cover;
		top: -10px;
		right: -12px;
		position: absolute;
	}
	/deep/.el-carousel__indicators--horizontal {
		left: 90%;
	}
	/deep/.el-carousel__container {
		overflow: hidden;
		border-radius: 6px;
	}
	/deep/ .el-carousel__item {
		width: 1164px;
		height: 126px;

		img {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>
