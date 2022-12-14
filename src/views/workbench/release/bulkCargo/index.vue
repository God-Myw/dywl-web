<template>
  <div class="bulkCargo">
    <div class="header" v-if="defaultCurrent == 0">我有散杂货要运</div>
    <div class="header" v-else>
      我有散杂货要运-<span v-if="InternationalTransport == 1">国际</span
      ><span v-else>国内</span>
    </div>
    <div class="cont">
      <!-- 步骤条 -->
      <div class="cont-step">
        <t-steps :defaultCurrent="defaultCurrent">
          <t-step-item title="从哪里起运"></t-step-item>
          <t-step-item title="其他运输信息"></t-step-item>
          <t-step-item title="完成"></t-step-item>
        </t-steps>
      </div>
      <div class="cont-line"></div>
      <t-loading size="medium" :loading="loading" showOverlay>
        <!-- 阶段一---表单 -->
        <div class="stage-one" v-if="defaultCurrent == 0">
          <div class="ele-sele">
            <div class="ele-sele-beg">
              <div>
                <span style="color: red; padding-right: 2px">*</span> 起运港
              </div>
              <el-select
                v-model="formData.startPort"
                filterable
                style="width: 400px"
                size="small"
                clearable
                placeholder="从哪里起运"
              >
                <el-option
                  v-for="item in startPortList"
                  :key="item.code"
                  :label="item.textValue"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ele-sele-beg">
              <div>
                <span style="color: red; padding-right: 2px">*</span> 目的港
              </div>
              <el-select
                v-model="formData.destinationPort"
                filterable
                style="width: 400px"
                size="small"
                clearable
                placeholder="货到哪里去"
              >
                <el-option
                  v-for="item in endtPortList"
                  :key="item.code"
                  :label="item.textValue"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="cont-from">
            <t-form
              :data="formData"
              :rules="rules"
              ref="startform"
              @submit="onSubmit"
              labelAlign="left"
            >
              <!-- <t-form-item label="起运港" name="startPort">
              <t-select
                v-model="formData.startPort"
                class="demo-select-base"
                style="width: 400px"
                placeholder="从哪里起运"
                clearable
                filterable
              >
                <t-option
                  v-for="(item, index) in startPortList"
                  :value="item.code"
                  :label="item.textValue"
                  :key="index"
                >
                  {{ item.textValue }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="目的港" name="college">
              <t-select
                v-model="formData.college"
                class="demo-select-base"
                style="width: 400px"
                placeholder="货到哪里去"
                clearable
                filterable
              >
                <t-option
                  v-for="(item, index) in options"
                  :value="item.value"
                  :label="item.label"
                  :key="index"
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item> -->
              <t-form-item label="货物名称" name="goodsLevel">
                <t-select
                  v-model="formData.goodsLevel"
                  class="demo-select-base"
                  style="width: 400px"
                  placeholder="请选择货物名称"
                  clearable
                  filterable
                >
                  <t-option
                    v-for="(item, index) in goodsNameList"
                    :value="item.code"
                    :label="item.textValue"
                    :key="index"
                  >
                    {{ item.textValue }}
                  </t-option>
                </t-select>
              </t-form-item>
              <t-form-item label="货物重量" name="goodsWeight">
                <t-input
                  :style="{ width: '112px' }"
                  placeholder="最小吨位"
                  v-model="formData.goodsWeight"
                />
                <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
                <t-input
                  :style="{ width: '112px' }"
                  placeholder="最大吨位"
                  v-model="formData.goodsMaxWeight"
                />
                <span :style="{ lineHeight: '32px' }">&nbsp;&nbsp;吨</span>
              </t-form-item>
            </t-form>
          </div>
          <div class="cont-inform">
            <div></div>
            <div>客服计算价格后将消息通知您</div>
          </div>
          <div class="cont-line"></div>
          <div class="cont-nextstep">
            <t-button theme="primary" @click="nextStep">下一步</t-button>
          </div>
        </div>
        <!-- 阶段二---表单--国际 -->
        <div
          class="stage-inter"
          v-if="defaultCurrent == 1 && InternationalTransport == 1"
        >
          <div class="inter-transport">
            <div class="inter-title">
              <div></div>
              <div>运输信息</div>
            </div>
            <div class="inter-from">
              <t-form
                :data="formData"
                :rules="rules"
                ref="interform"
                layout="inline"
                @submit="interSubmit"
                :labelWidth="110"
                labelAlign="left"
                :requiredMark="false"
              >
                <t-form-item label="受载日期" name="loadDate">
                  <t-date-picker
                    style="width: 400px"
                    v-model="formData.loadDate"
                    placeholder="请选择日期"
                    mode="date"
                    clearable
                  />
                </t-form-item>
                <t-form-item label="截止日期" name="endDate">
                  <t-date-picker
                    style="width: 400px"
                    v-model="formData.endDate"
                    placeholder="请选择日期"
                    mode="date"
                    clearable
                  />
                </t-form-item>
              </t-form>
            </div>
          </div>
          <div class="inter-message">
            <div class="message-title">
              <div></div>
              <div>货物信息</div>
            </div>
            <div class="message-from">
              <t-form
                :data="formData"
                :rules="rules"
                ref="interinfoform"
                layout="inline"
                @submit="interinfoSubmit"
                :labelWidth="110"
                labelAlign="left"
                :requiredMark="false"
              >
                <t-form-item label="货物体积" name="goodsVolume">
                  <t-input
                    style="width: 400px"
                    placeholder="请输入体积"
                    v-model="formData.goodsVolume"
                    suffix="m³"
                    clearable
                  ></t-input>
                </t-form-item>
                <t-form-item label="存放位置" name="location">
                  <t-select
                    v-model="formData.location"
                    class="demo-select-base"
                    style="width: 400px"
                    placeholder="请选择货物存放位置"
                    clearable
                    filterable
                  >
                    <t-option
                      v-for="(item, index) in goodsLocationList"
                      :value="item.code"
                      :label="item.textValue"
                      :key="index"
                    >
                      {{ item.textValue }}
                    </t-option>
                  </t-select>
                </t-form-item>
                <t-form-item label="货物性质" name="goodsProperty">
                  <t-select
                    v-model="formData.goodsProperty"
                    class="demo-select-base"
                    style="width: 400px"
                    placeholder="请选择货物性质"
                    clearable
                    filterable
                  >
                    <t-option
                      v-for="(item, index) in goodsPropertyList"
                      :value="item.code"
                      :label="item.textValue"
                      :key="index"
                    >
                      {{ item.textValue }}
                    </t-option>
                  </t-select>
                </t-form-item>
                <t-form-item label="是否可叠加" name="isSuperposition">
                  <t-radio-group v-model="formData.isSuperposition">
                    <t-radio
                      @click.native.prevent="handleRadioClick('0')"
                      value="0"
                      >可以</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClick('1')"
                      value="1"
                      >不可以</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClick('2')"
                      value="2"
                      >部分可以</t-radio
                    >
                  </t-radio-group>
                </t-form-item>
                <t-form-item label="是否重大件" name="majorParts">
                  <t-radio-group v-model="formData.majorParts">
                    <t-radio
                      @click.native.prevent="handleRadioClickmajor('1')"
                      value="1"
                      >是</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClickmajor('0')"
                      value="0"
                      >否</t-radio
                    >
                  </t-radio-group>
                </t-form-item>
                <t-form-item label="  ">
                  <div class="mes-intention">佣金<span>(选填)</span></div>
                  <t-select
                    v-model="formData.addCommission"
                    class="demo-select-base"
                    style="width: 180px"
                    placeholder="Add.com"
                    clearable
                    filterable
                  >
                    <t-option
                      v-for="(item, index) in Addoptions"
                      :value="item.value"
                      :label="item.label"
                      :key="index"
                    >
                      {{ item.label }}
                    </t-option>
                  </t-select>
                  <span :style="{ lineHeight: '32px' }"
                    >&nbsp;&nbsp;+&nbsp;&nbsp;</span
                  >
                  <t-select
                    v-model="formData.commission"
                    class="demo-select-base"
                    style="width: 180px"
                    placeholder="com"
                    clearable
                    filterable
                  >
                    <t-option
                      v-for="(item, index) in comoptions"
                      :value="item.value"
                      :label="item.label"
                      :key="index"
                    >
                      {{ item.label }}
                    </t-option>
                  </t-select>
                </t-form-item>
              </t-form>
            </div>
            <div class="message-remark">
              <div>备注<span>(选填)</span></div>
              <div>
                <t-textarea
                  v-model="formData.remark"
                  placeholder="请输入备注"
                  :maxlength="300"
                  style="width: 400px"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                ></t-textarea>
              </div>
            </div>
            <div class="message-img">
              <div class="message-img-title">
                <div>货物清单</div>
                <div>(至多三张)</div>
              </div>
              <!-- pallet -->
              <t-upload
                action="https://www.dylnet.cn/api/sys/file/upLoadFuJian/pallet"
                v-model="formData.files"
                @fail="handleFail"
                theme="image"
                accept="image/*"
                multiple
                :max="3"
              ></t-upload>
            </div>
          </div>
          <div class="inter-handling">
            <div class="handling-title">
              <div></div>
              <div>意向价&装卸率</div>
              <div>（选填）</div>
            </div>
            <div class="handling-cont">
              <div class="handling-intention">
                <div>意向价</div>
                <div>
                  <t-input
                    label=" $ "
                    placeholder="请输入金额"
                    v-model="formData.intentionMoney"
                    suffix="USD"
                    style="width: 240px"
                  />
                </div>
              </div>
              <div class="handling-install">
                <div>装率</div>
                <div>
                  <t-input
                    placeholder="请填写装率"
                    v-model="formData.loadingRate"
                    style="width: 180px"
                  />
                </div>
              </div>
              <div class="handling-unload">
                <div>卸率</div>
                <div>
                  <t-input
                    placeholder="请填写卸率"
                    v-model="formData.unloadingRate"
                    style="width: 180px"
                  />
                </div>
              </div>
              <div class="handling-clause">
                <div>意向条款</div>
                <div>
                  <t-radio-group v-model="formData.intentClause" allowUncheck>
                    <t-radio
                      @click.native.prevent="handleRadioClickClause('FILO')"
                      value="FILO"
                      >FILO</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClickClause('FLT')"
                      value="FLT"
                      >FLT</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClickClause('LIFO')"
                      value="LIFO"
                      >LIFO</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClickClause('FLO')"
                      value="FLO"
                      >FLO</t-radio
                    >
                    <t-radio
                      @click.native.prevent="handleRadioClickClause('FLOST')"
                      value="FLOST"
                      >FLOST</t-radio
                    >
                  </t-radio-group>
                </div>
              </div>
            </div>
          </div>
          <div class="handling-info">
            <div class="relation-title">
              <div></div>
              <div>联系信息</div>
            </div>
            <div class="relation-from">
              <div>
                <t-form
                  :data="formData"
                  :rules="rules"
                  ref="interperform"
                  @submit="interperSubmit"
                  :labelWidth="110"
                  labelAlign="left"
                  :requiredMark="false"
                >
                  <t-form-item label="联系人" name="contacter">
                    <t-input
                      style="width: 400px"
                      placeholder="请填写联系人"
                      v-model="formData.contacter"
                      clearable
                    ></t-input>
                  </t-form-item>
                  <t-form-item label="联系电话" name="contactPhone">
                    <t-select
                      v-model="formData.phoneCode"
                      class="demo-select-base"
                      style="width: 64px"
                    >
                      <t-option
                        v-for="(item, index) in postponeTel"
                        :value="item.code"
                        :label="item.textValue"
                        :key="index"
                      >
                        {{ item.textValue }}
                      </t-option>
                    </t-select>
                    <t-input
                      style="width: 337px"
                      placeholder="请填写联系电话"
                      :maxlength="11"
                      v-model="formData.contactPhone"
                      clearable
                    ></t-input>
                  </t-form-item>
                </t-form>
              </div>
              <div class="relation-mailbox">
                <div>邮箱<span>(选填)</span></div>
                <div>
                  <t-input
                    style="width: 400px"
                    placeholder="请填写邮箱"
                    v-model="formData.email"
                    clearable
                  ></t-input>
                </div>
              </div>
            </div>
          </div>
          <div class="inter-serve">
            <div class="serve-title">
              <div></div>
              <div>其他服务(选填)</div>
            </div>
            <div>
              <t-checkbox-group>
                <t-checkbox-group
                  v-model="formData.serveCheck"
                  :options="interserveList"
                ></t-checkbox-group>
              </t-checkbox-group>
            </div>
          </div>
          <div class="cont-inform">
            <div></div>
            <div>客服计算价格后将消息通知您</div>
          </div>
          <div class="cont-line"></div>
          <div class="cont-nextstep">
            <t-button
              style="margin-right: 20px"
              variant="outline"
              theme="default"
              @click="lastStep"
              >上一步</t-button
            >
            <t-button theme="primary" @click="internextStep">提交</t-button>
          </div>
        </div>
        <!-- 阶段二---表单--国内 -->
        <div
          class="stage-two"
          v-if="defaultCurrent == 1 && InternationalTransport != 1"
        >
          <div class="two-transport">
            <div class="transport-title">
              <div></div>
              <div>运输信息</div>
            </div>
            <div class="transport-from">
              <div>
                <t-form
                  :data="formData"
                  :rules="rules"
                  ref="inlandform"
                  @submit="inlandSubmit"
                  :labelWidth="110"
                  labelAlign="left"
                  :requiredMark="false"
                >
                  <t-form-item label="装货日期" name="loadDate">
                    <t-date-picker
                      style="width: 240px"
                      v-model="formData.loadDate"
                      placeholder="请选择装货时间"
                      mode="date"
                      clearable
                    />
                    <span :style="{ lineHeight: '32px' }"
                      >&nbsp;&nbsp;&nbsp;</span
                    >
                    <t-select
                      v-model="formData.datepostpone"
                      class="demo-select-base"
                      style="width: 148px"
                    >
                      <t-option
                        v-for="(item, index) in postponeDate"
                        :value="item.value"
                        :label="item.label"
                        :key="index"
                      >
                        {{ item.label }}
                      </t-option>
                    </t-select>
                  </t-form-item>
                  <t-form-item label="所需船舶吨位" name="weightMin">
                    <t-input
                      :style="{ width: '112px' }"
                      placeholder="最小吨位"
                      v-model="formData.weightMin"
                    />
                    <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
                    <t-input
                      :style="{ width: '112px' }"
                      placeholder="最大吨位"
                      v-model="formData.weightMax"
                    />
                    <span :style="{ lineHeight: '32px' }">&nbsp;&nbsp;吨</span>
                  </t-form-item>
                </t-form>
                <div class="transport-rate">
                  <div>意向价<span>(选填)</span></div>
                  <div>
                    <t-radio
                      @change="onChangeRate(1)"
                      :checked="rateValue"
                      :allowUncheck="true"
                      >按每吨收费</t-radio
                    >
                  </div>
                  <div>
                    <t-input
                      v-model="formData.chargeTypeValue"
                      v-if="formData.chargeType == 1"
                      style="width: 282px"
                      suffix="元/吨"
                      placeholder="请填写航运费"
                    />
                  </div>
                </div>
                <div class="transport-bag">
                  <div>
                    <t-radio
                      @change="onChangeBag(2)"
                      :checked="bagValue"
                      :allowUncheck="true"
                      >按总包干价</t-radio
                    >
                  </div>
                  <div>
                    <t-input
                      v-model="formData.chargeTypeValue"
                      v-if="formData.chargeType == 2"
                      style="width: 282px"
                      suffix="元"
                      placeholder="请填写总包干价"
                    />
                  </div>
                </div>
              </div>
              <div class="transport-remark">
                <div>备注<span>(选填)</span></div>
                <div>
                  <t-textarea
                    v-model="formData.remark"
                    placeholder="请输入备注"
                    :maxlength="300"
                    style="width: 400px"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                  ></t-textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="two-relation">
            <div class="relation-title">
              <div></div>
              <div>联系信息</div>
            </div>
            <div class="relation-from">
              <div>
                <t-form
                  :data="formData"
                  :rules="rules"
                  ref="contactform"
                  @submit="contactSubmit"
                  :labelWidth="110"
                  labelAlign="left"
                  :requiredMark="false"
                >
                  <t-form-item label="联系人" name="contacter">
                    <t-input
                      style="width: 400px"
                      placeholder="请填写联系人"
                      v-model="formData.contacter"
                      clearable
                    ></t-input>
                  </t-form-item>
                  <t-form-item label="联系电话" name="contactPhone">
                    <t-select
                      v-model="formData.phoneCode"
                      class="demo-select-base"
                      style="width: 64px"
                    >
                      <t-option
                        v-for="(item, index) in postponeTel"
                        :value="item.code"
                        :label="item.textValue"
                        :key="index"
                      >
                        {{ item.textValue }}
                      </t-option>
                    </t-select>
                    <t-input
                      style="width: 337px"
                      placeholder="请填写联系电话"
                      v-model="formData.contactPhone"
                      clearable
                    ></t-input>
                  </t-form-item>
                </t-form>
              </div>
              <div class="relation-mailbox">
                <div>邮箱<span>(选填)</span></div>
                <div>
                  <t-input
                    style="width: 400px"
                    placeholder="请填写邮箱"
                    v-model="formData.email"
                    clearable
                  ></t-input>
                </div>
              </div>
            </div>
          </div>
          <div class="two-serve">
            <div class="serve-title">
              <div></div>
              <div>其他服务 (选填)</div>
            </div>
            <div class="serve-cont">
              <t-checkbox-group
                v-model="formData.serveCheck"
                :options="serveList"
                @change="onChange"
              ></t-checkbox-group>
            </div>
            <div class="serve-address" v-if="visible">
              <div class="address-left">
                <div class="address-left-name">发货地址</div>
                <div>
                  <t-cascader
                    v-model="formData.shippingAddress"
                    :options="shipAddress"
                    clearable
                    valueType="full"
                    style="width: 400px; background: #fff; margin-bottom: 8px"
                    class="t-demo-cascader"
                    trigger="hover"
                    placeholder="所在地区（省 / 市 / 区）"
                    :keys="{ label: 'label', value: 'label' }"
                  ></t-cascader>
                  <t-textarea
                    v-model="formData.shippingAddressDetails"
                    style="width: 400px"
                    placeholder="请填写发货详细地址"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                    name="description"
                  />
                </div>
              </div>
              <div class="address-right">
                <div class="address-left-name">收货地址</div>
                <div>
                  <t-cascader
                    v-model="formData.receivingAddress"
                    :options="receiAddress"
                    clearable
                    trigger="hover"
                    valueType="full"
                    style="width: 400px; background: #fff; margin-bottom: 8px"
                    placeholder="所在地区（省 / 市 / 区）"
                    :keys="{ label: 'label', value: 'label' }"
                    class="t-demo-cascader"
                  ></t-cascader>
                  <t-textarea
                    v-model="formData.receivingAddressDetails"
                    style="width: 400px"
                    placeholder="请填写收获详细地址"
                    name="description"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="cont-inform">
            <div></div>
            <div>客服计算价格后将消息通知您</div>
          </div>
          <div class="cont-line"></div>
          <div class="cont-nextstep">
            <t-button
              style="margin-right: 20px"
              variant="outline"
              theme="default"
              @click="lastStep"
              >上一步</t-button
            >
            <t-button theme="primary" @click="nextEnd">提交</t-button>
          </div>
        </div>
      </t-loading>
      <!-- 阶段三--完成 -->
      <div class="stage-end" v-if="defaultCurrent == 2">
        <div class="end-img">
          <img src="../../../../assets/workbench/组 7400.png" alt="" />
        </div>
        <div class="end-p">发布成功！</div>
        <div class="end-inform">
          <div></div>
          <div>客服计算价格后将消息通知您</div>
        </div>
        <div class="end-btn">
          <t-button
            theme="default"
            @click="goworkbench()"
            style="margin-right: 20px"
            variant="outline"
            >返回发布首页</t-button
          >
          <t-button theme="default" @click="gobulk()" variant="outline"
            >继续发布货盘</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { postPallet } from "../../../../api/bulkCargo.js";

import shipAddress from "../../../../assets/area.json";
export default {
  inject: ["reload"],
  data() {
    return {
      defaultCurrent: 0,
      rateValue: true,
      bagValue: false,
      visible: false,
      loading: false,
      formData: {
        startPort: "",
        destinationPort: "",
        goodsLevel: "",
        goodsWeight: "",
        goodsMaxWeight: "",

        loadDate: "",
        datepostpone: 2,
        weightMin: "",
        weightMax: "",
        remark: "",
        chargeType: 1,
        chargeTypeValue: "",
        contacter: "",
        phoneCode: 152,
        contactPhone: "",
        email: "",
        unionTransport: 0,
        isBind: 0,
        insuranceJiangyun: 0,
        insuranceKache: 0,
        shippingAddress: [],
        receivingAddress: [],
        shippingAddressDetails: "",
        receivingAddressDetails: "",

        endDate: "",
        goodsVolume: "",
        location: "",
        goodsProperty: "",
        isSuperposition: "",
        majorParts: "",
        intentionMoney: "",
        loadingRate: "",
        unloadingRate: "",
        intentClause: "",
        addCommission: "",
        commission: "",
        palletFileLis: [],
        serveCheck: [],
        files: [],
      },
      startPortList: [],
      endtPortList: [],
      goodsNameList: [],
      goodsPropertyList: [],
      goodsLocationList: [],
      Addoptions: [
        {
          label: "0.6125%",
          value: "0.6125%",
        },
        {
          label: "1%",
          value: "1%",
        },
        {
          label: "1.25%",
          value: "1.25%",
        },
        {
          label: "2%",
          value: "2%",
        },
        {
          label: "2.5%",
          value: "2.5%",
        },
        {
          label: "3.75%",
          value: "3.75%",
        },
        {
          label: "5%",
          value: "5%",
        },
      ],
      comoptions: [
        {
          label: "0.6125%",
          value: "0.6125%",
        },
        {
          label: "1%",
          value: "1%",
        },
        {
          label: "1.25%",
          value: "1.25%",
        },
        {
          label: "2%",
          value: "2%",
        },
        {
          label: "2.5%",
          value: "2.5%",
        },
        {
          label: "3.75%",
          value: "3.75%",
        },
        {
          label: "5%",
          value: "5%",
        },
      ],
      roleinfo: [],
      InternationalTransport: 1,
      palletGuid: "2",
      postponeDate: [
        { label: "+1天", value: 1 },
        { label: "+2天", value: 2 },
        { label: "+3天", value: 3 },
        { label: "+4天", value: 4 },
        { label: "+5天", value: 5 },
        { label: "+6天", value: 6 },
        { label: "+7天", value: 7 },
      ],
      postponeTel: [{ code: 152, textValue: "+86", remark: "" }],

      serveList: [
        { label: "是否需要联合运输", value: "unionTransport" },
        { label: "是否需要绑扎", value: "isBind" },
        { label: "是否需要江运海运险", value: "insuranceJiangyun" },
        { label: "是否需要卡车运输险", value: "insuranceKache" },
      ],
      interserveList: [
        { label: "是否需要联合运输", value: "unionTransport" },
        { label: "是否需要绑扎", value: "isBind" },
        { label: "是否需要江运海运险", value: "insuranceJiangyun" },
        { label: "是否需要卡车运输险", value: "insuranceKache" },
        { label: "是否需要集港", value: "isGangji" },
      ],
      value: "",

      shipAddress: [],
      receiAddress: [],
      rules: {
        goodsLevel: [
          { required: true, message: "请选择货物名称", type: "error" },
        ],
        goodsWeight: [
          { required: true, message: "请填写货物最小最大重量", type: "error" },
        ],
        weightMin: [
          {
            required: false,
            message: "请填写所需船舶最小最大吨位",
            type: "error",
          },
        ],
        loadDate: [
          {
            required: true,
            message: "请选择装货日期",
            type: "error",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择截止日期",
            type: "error",
          },
        ],
        contacter: [{ required: true, message: "请填写联系人", type: "error" }],
        goodsVolume: [
          { required: false, message: "请填写货物体积", type: "error" },
        ],
        contactPhone: [
          { required: true, message: "请填写联系电话", type: "error" },
        ],
        location: [
          { required: false, message: "请选择存放位置", type: "error" },
        ],
        goodsProperty: [
          { required: false, message: "请选择货物性质", type: "error" },
        ],
        isSuperposition: [
          { required: false, message: "请选择是否叠加", type: "error" },
        ],
        majorParts: [
          { required: false, message: "请选择是否叠重大件", type: "error" },
        ],

        college: [{ required: true, message: "请选择起运港", type: "error" }],
        startPort: [{ required: true, message: "请选择起运港", type: "error" }],
        name: [{ required: true, message: "请填写联系人", type: "error" }],
      },
    };
  },
  components: {},
  created() {
    this.shipAddress = shipAddress;
    this.receiAddress = shipAddress;
    if (JSON.parse(localStorage.getItem("roleinfo"))) {
      this.roleinfo = JSON.parse(localStorage.getItem("roleinfo"));
    }
  },
  mounted() {
    if (this.roleinfo.name) {
      this.formData.contacter = this.roleinfo.name;
    }

    this.formData.contactPhone = this.roleinfo.phoneNumber;
    this.formData.email = this.roleinfo.email;
    // 起始港
    this.getBegList();
    // 货物名称
    this.goodsName();
    // this.postponeTel = sessionStorage.getItem('options')
    //  货物性质
    this.goodsProperty();
    //  存放位置
    this.goodsLocation();
    if (this.$route.params.origin || this.$route.params.purpose) {
      this.formData.startPort = this.$route.params.origin;
      this.formData.destinationPort = this.$route.params.purpose;
      this.formData.goodsLevel = this.$route.params.goodsName;
      this.formData.goodsWeight = this.$route.params.minton;
      this.formData.goodsMaxWeight = this.$route.params.maxton;
      this.onSubmit({ validateResult: true });
    }
  },

  methods: {
    // 单选框可以取消
    handleRadioClick(val) {
      this.formData.isSuperposition === val
        ? (this.formData.isSuperposition = "")
        : (this.formData.isSuperposition = val + "");
    },
    // 单选框可以取消中大件
    handleRadioClickmajor(val) {
      this.formData.majorParts === val
        ? (this.formData.majorParts = "")
        : (this.formData.majorParts = val + "");
    },
    handleRadioClickClause(val) {
      this.formData.intentClause === val
        ? (this.formData.intentClause = "")
        : (this.formData.intentClause = val + "");
    },
    async getBegList() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=port"
      );
      if (res.data.code == "0000") {
        this.startPortList = res.data.data.zh[0].items;
        this.endtPortList = res.data.data.zh[0].items;
      } else {
        this.startPortList = [];
        this.endtPortList = [];
      }
    },
    async goodsProperty() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=goods_property"
      );
      if (res.data.code == "0000") {
        this.goodsPropertyList = res.data.data.zh[0].items;
      } else {
        this.goodsPropertyList = [];
      }
    },
    async goodsLocation() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=cargo_save_location"
      );
      if (res.data.code == "0000") {
        this.goodsLocationList = res.data.data.zh[0].items;
      } else {
        this.goodsLocationList = [];
      }
    },
    async goodsName() {
      let res = await axios.get(
        "https://www.dylnet.cn/api/sys/dict/type?type=goods_name"
      );
      if (res.data.code == "0000") {
        this.goodsNameList = res.data.data.zh[0].items;
      } else {
        this.goodsNameList = [];
      }
    },
    async onSubmit({ validateResult }) {
      if (
        this.formData.startPort === "" ||
        this.formData.destinationPort === ""
      ) {
        return this.$message.warning("请填写起始港或目的港");
      }
      if (validateResult === true) {
        this.loading = true;
        postPallet({
          startPort: this.formData.startPort,
          destinationPort: this.formData.destinationPort,
          goodsLevel: this.formData.goodsLevel,
          goodsWeight: this.formData.goodsWeight,
          goodsMaxWeight: this.formData.goodsMaxWeight,
          type: 1,
        }).then((res) => {
          if (res.code == "0000") {
            this.defaultCurrent = 1;
            this.InternationalTransport = res.data.InternationalTransport;
            this.palletGuid = res.data.palletGuid;
            this.loading = false;
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    // 阶段一 --- 下一步
    nextStep() {
      if (
        Number(this.formData.goodsWeight) > Number(this.formData.goodsMaxWeight)
      ) {
        this.$message.warning("请填写正确吨位！");
      } else {
        this.$refs.startform.submit();
      }
    },
    // 阶段二国内 --- 下一步
    nextEnd() {
      this.$refs.inlandform.submit();
    },
    // 国内发布
    inlandSubmit({ validateResult }) {
      if (Number(this.formData.weightMin) > Number(this.formData.weightMax)) {
        this.$message.warning("请填写正确船舶吨位！");
      } else {
        if (validateResult === true) {
          this.$refs.contactform.submit();
        }
      }
    },
    // 国内发布
    contactSubmit({ validateResult }) {
      this.formData.unionTransport = 0;
      this.formData.isBind = 0;
      this.formData.insuranceJiangyun = 0;
      this.formData.insuranceKache = 0;
      this.formData.serveCheck.map((item) => {
        if (item == "unionTransport") {
          this.formData.unionTransport = 1;
        }
        if (item == "isBind") {
          this.formData.isBind = 1;
        }
        if (item == "insuranceJiangyun") {
          this.formData.insuranceJiangyun = 1;
        }
        if (item == "insuranceKache") {
          this.formData.insuranceKache = 1;
        }
      });

      if (validateResult === true) {
        this.loading = true;
        postPallet({
          startPort: this.formData.startPort,
          destinationPort: this.formData.destinationPort,
          goodsLevel: this.formData.goodsLevel,
          goodsWeight: this.formData.goodsWeight,
          goodsMaxWeight: this.formData.goodsMaxWeight,
          loadDate: new Date(this.formData.loadDate).getTime(),
          endDate:
            new Date(this.formData.loadDate).getTime() +
            24 * 60 * 60 * 1000 * this.formData.datepostpone,

          weightMin: this.formData.weightMin,
          weightMax: this.formData.weightMax,
          remark: this.formData.remark,
          chargeType: this.formData.chargeType,
          chargeTypeValue: this.formData.chargeTypeValue,
          contacter: this.formData.contacter,
          phoneCode: this.formData.phoneCode,
          contactPhone: this.formData.contactPhone,
          email: this.formData.email,
          unionTransport: this.formData.unionTransport,
          isBind: this.formData.isBind,
          insuranceJiangyun: this.formData.insuranceJiangyun,
          insuranceKache: this.formData.insuranceKache,
          shippingAddress: this.formData.shippingAddress.toString(),
          receivingAddress: this.formData.receivingAddress.toString(),
          shippingAddressDetails: this.formData.shippingAddressDetails,
          receivingAddressDetails: this.formData.receivingAddressDetails,
          guid: this.palletGuid,
          type: 2,
          state: 1,
        }).then((res) => {
          if (res.code == "0000") {
            this.defaultCurrent = 2;
            this.loading = false;
          }
        });
      }
    },

    // 阶段二国际 --- 下一步
    internextStep() {
      this.$refs.interform.submit();
    },
    interSubmit({ validateResult }) {
      if (
        new Date(this.formData.loadDate).getTime() >
        new Date(this.formData.endDate).getTime()
      ) {
        this.$message.warning("截止日期不得大于受载日期！");
      } else {
        if (validateResult === true) {
          this.$refs.interinfoform.submit();
        }
      }
    },
    interinfoSubmit({ validateResult }) {
      if (validateResult === true) {
        this.$refs.interperform.submit();
      }
    },
    interperSubmit({ validateResult }) {
      this.formData.unionTransport = 0;
      this.formData.isBind = 0;
      this.formData.insuranceJiangyun = 0;
      this.formData.insuranceKache = 0;
      this.formData.isGangji = 0;
      this.formData.serveCheck.map((item) => {
        if (item == "unionTransport") {
          this.formData.unionTransport = 1;
        }
        if (item == "isBind") {
          this.formData.isBind = 1;
        }
        if (item == "insuranceJiangyun") {
          this.formData.insuranceJiangyun = 1;
        }
        if (item == "insuranceKache") {
          this.formData.insuranceKache = 1;
        }
        if (item == "isGangji") {
          this.formData.isGangji = 1;
        }
      });
      this.formData.files.map((item) => {
        this.formData.palletFileLis.push({
          fileName: item.response.data.fileName,
          type: "2",
        });
      });
      if (validateResult === true) {
        // this.loading = true
        postPallet({
          startPort: this.formData.startPort,
          destinationPort: this.formData.destinationPort,
          goodsLevel: this.formData.goodsLevel,
          goodsWeight: this.formData.goodsWeight,
          goodsMaxWeight: this.formData.goodsMaxWeight,
          loadDate: new Date(this.formData.loadDate).getTime(),
          endDate: new Date(this.formData.endDate).getTime(),
          goodsVolume: this.formData.goodsVolume,
          location: this.formData.location,
          goodsProperty: this.formData.goodsProperty,
          isSuperposition: this.formData.isSuperposition,
          majorParts: this.formData.majorParts,
          intentionMoney: this.formData.intentionMoney,
          loadingRate: this.formData.loadingRate,
          unloadingRate: this.formData.unloadingRate,
          intentClause: this.formData.intentClause,
          addCommission: this.formData.addCommission,
          commission: this.formData.commission,
          palletFileLis: this.formData.palletFileLis,
          remark: this.formData.remark,
          contacter: this.formData.contacter,
          phoneCode: this.formData.phoneCode,
          contactPhone: this.formData.contactPhone,
          email: this.formData.email,
          unionTransport: this.formData.unionTransport,
          isBind: this.formData.isBind,
          insuranceJiangyun: this.formData.insuranceJiangyun,
          insuranceKache: this.formData.insuranceKache,
          isGangji: this.formData.isGangji,

          guid: this.palletGuid,
          type: 2,
          state: 1,
        }).then((res) => {
          if (res.code == "0000") {
            this.defaultCurrent = 2;
            // this.loading = false
          }
        });
      }
    },

    lastStep() {
      this.defaultCurrent = 0;
    },
    onChangeRate(id) {
      this.formData.chargeType = id;
      this.rateValue = true;
      this.bagValue = false;
    },
    onChangeBag(id) {
      this.formData.chargeType = id;
      this.bagValue = true;
      this.rateValue = false;
    },
    onChange() {
      let checkStuts = this.formData.serveCheck.some((item) => {
        return item == "unionTransport";
      });
      if (checkStuts) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    },

    gobulk() {
      this.reload();
    },
    goworkbench() {
      this.$router.push("/workbench");
    },
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.t-form-inline {
  row-gap: 0;
}
/deep/.el-input__inner {
  font-size: 14px;
  border: 1px solid #dcdcdc;
}
.bulkCargo {
  background: #f5f7fa;
  .header {
    margin-bottom: 24px;
    height: 48px;
    background: #e6e9ee;
    padding-left: 44px;
    line-height: 48px;
    font-size: 16px;
    font-weight: 500;
    font-family: "SourceHanSansCN-Medium", Arial;
    color: #333333;
  }
  .cont {
    margin: 0 auto;
    width: 1164px;
    background: #ffffff;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 32px;
    .cont-step {
      padding-right: 370px;
    }
    .cont-line {
      width: 100%;
      border-bottom: 1px solid #eeeeee;
      margin: 28px 0 34px;
    }
    .stage-one {
      .ele-sele {
        .ele-sele-beg {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          div:nth-child(1) {
            font-size: 14px;
            margin-right: 45px;
            color: rgba(0, 0, 0, 0.9);
          }
        }
      }
      .cont-from {
        margin-bottom: 113px;
      }
      .cont-inform {
        display: flex;
        div:nth-child(1) {
          background: url("../../../../assets/workbench/sound@2x.png") no-repeat;
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        div:nth-child(2) {
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #606266;
        }
      }
    }
    .stage-two {
      .two-transport {
        margin-bottom: 72px;
        .transport-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
        .transport-from {
          display: flex;
          justify-content: space-between;
          margin-right: 16px;
          .transport-rate {
            height: 32px;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            div:nth-child(1) {
              font-size: 14px;
              color: #000;
              line-height: 32px;
              span {
                padding-left: 8px;
                color: rgba(0, 0, 0, 0.4);
                padding-right: 22px;
              }
            }
            div:nth-child(2) {
              margin-right: 22px;
            }
          }
          .transport-bag {
            height: 32px;
            display: flex;
            align-items: center;
            margin-left: 109px;
            div:nth-child(1) {
              margin-right: 22px;
            }
          }
          .transport-remark {
            display: flex;
            height: 56px;
            div:nth-child(1) {
              font-size: 14px;
              color: #000;
              line-height: 32px;
              span {
                padding-left: 8px;
                color: rgba(0, 0, 0, 0.4);
                padding-right: 22px;
              }
            }
          }
        }
      }
      .two-relation {
        margin-bottom: 72px;
        .relation-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
        .relation-from {
          display: flex;
          justify-content: space-between;
          margin-right: 16px;
          .relation-mailbox {
            display: flex;
            height: 56px;
            div:nth-child(1) {
              font-size: 14px;
              color: #000;
              line-height: 32px;
              span {
                padding-left: 8px;
                color: rgba(0, 0, 0, 0.4);
                padding-right: 22px;
              }
            }
          }
        }
      }
      .two-serve {
        margin-bottom: 81px;
        .serve-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
        .serve-cont {
          margin-bottom: 32px;
          .t-checkbox-group {
            /deep/.t-checkbox {
              margin-right: 60px;
            }
          }
        }
        .serve-address {
          height: 148px;
          background: #f6f6f6;
          box-sizing: border-box;
          border-radius: 6px;

          padding: 18px 0 32px 15px;
          display: flex;
          .address-left {
            display: flex;
            margin-right: 40px;
            .address-left-name {
              padding-top: 9px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.9);
              margin-right: 31px;
            }
          }
          .address-right {
            display: flex;
            .address-left-name {
              padding-top: 9px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.9);
              margin-right: 31px;
            }
          }
        }
      }
      .cont-line {
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        margin: 28px 0 34px;
      }
      .cont-inform {
        display: flex;
        div:nth-child(1) {
          background: url("../../../../assets/workbench/sound@2x.png") no-repeat;
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        div:nth-child(2) {
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #606266;
        }
      }
      .cont-nextstep {
        text-align: right;
      }
    }
    .stage-inter {
      .inter-transport {
        margin-bottom: 72px;
        .inter-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
      }
      .inter-message {
        margin-bottom: 72px;
        .message-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
        .message-from {
          .mes-intention {
            font-size: 14px;
            color: #000;
            line-height: 32px;
            margin-left: 165px;
            span {
              padding-left: 8px;
              color: rgba(0, 0, 0, 0.4);
              padding-right: 40px;
            }
          }
        }
        .message-remark {
          display: flex;
          height: 56px;
          margin-bottom: 24px;
          div:nth-child(1) {
            font-size: 14px;
            color: #000;
            line-height: 32px;
            span {
              padding-left: 8px;
              color: rgba(0, 0, 0, 0.4);
              padding-right: 34px;
            }
          }
        }
        .message-img {
          display: flex;
          margin-bottom: 72px;
          .message-img-title {
            padding-right: 52px;
            font-size: 14px;
            color: #000;
            div:nth-child(2) {
              padding-top: 4px;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.4);
            }
          }
        }
      }
      .inter-handling {
        margin-bottom: 72px;
        .handling-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
          div:nth-child(3) {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
            height: 16px;
            line-height: 16px;
          }
        }
        .handling-cont {
          display: flex;
          flex-wrap: wrap;
          .handling-intention {
            display: flex;
            align-items: center;
            margin-right: 150px;
            div:nth-child(1) {
              margin-right: 55px;
              font-size: 14px;
              color: #000;
            }
          }
          .handling-install {
            display: flex;
            align-items: center;
            div:nth-child(1) {
              margin-right: 17px;
              font-size: 14px;
              color: #000;
            }
          }
          .handling-unload {
            display: flex;
            align-items: center;
            div:nth-child(1) {
              margin-right: 17px;
              font-size: 14px;
              color: #000;
            }
          }
          .handling-clause {
            padding-top: 26px;
            display: flex;
            align-items: center;
            div:nth-child(1) {
              margin-right: 41px;
              font-size: 14px;
              color: #000;
            }
          }
        }
      }
      .handling-info {
        margin-bottom: 72px;
        .relation-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
        .relation-from {
          display: flex;
          justify-content: space-between;
          margin-right: 16px;
          .relation-mailbox {
            display: flex;
            height: 56px;
            div:nth-child(1) {
              font-size: 14px;
              color: #000;
              line-height: 32px;
              span {
                padding-left: 8px;
                color: rgba(0, 0, 0, 0.4);
                padding-right: 22px;
              }
            }
          }
        }
      }
      .inter-serve {
        margin-bottom: 82px;
        .serve-title {
          display: flex;
          margin-bottom: 24px;
          div:nth-child(1) {
            width: 4px;
            height: 16px;
            background: #0052d9;
            border-radius: 2px;
            margin-right: 8px;
          }
          div:nth-child(2) {
            color: #000;
            font-family: "SourceHanSansCN-Medium", Arial;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
          div:nth-child(3) {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
            height: 16px;
            line-height: 16px;
          }
        }
      }
      .cont-line {
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        margin: 28px 0 34px;
      }
      .cont-inform {
        display: flex;
        div:nth-child(1) {
          background: url("../../../../assets/workbench/sound@2x.png") no-repeat;
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        div:nth-child(2) {
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #606266;
        }
      }
      .cont-nextstep {
        text-align: right;
      }
    }
    .stage-end {
      display: flex;
      flex-direction: column;
      align-items: center;
      .end-img {
        width: 286px;
        height: 286px;
        margin-bottom: 12px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .end-p {
        height: 20px;
        font-size: 20px;
        color: #37383b;
        margin-bottom: 19px;
      }
      .end-inform {
        display: flex;
        margin-bottom: 33px;
        div:nth-child(1) {
          background: url("../../../../assets/workbench/sound@2x.png") no-repeat;
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        div:nth-child(2) {
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #606266;
        }
      }
    }
  }
}
</style>
