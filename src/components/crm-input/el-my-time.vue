<template>
  <el-form-item label="创建时间">
    <el-date-picker
      style="width: 310px"
      v-model="myTimes"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy-MM-dd HH:mm"
      type="datetimerange"
      :editable="false"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptionsAll"
      :default-time="['00:00:00', '23:59:59']"
      popper-class="fansTime"
    >
    </el-date-picker>
    <input type="text" v-model="myTimes" />
  </el-form-item>
</template>

<script>
export default {
  name: 'elMyTime',
  props: ['value'],
  data() {
    return {
      myTimes: '',
      pickerOptionsAll: this.constTime.pickerOptionsAll
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  watch: {
    myTimes: function() {
      this.$emit('update', this.myTimes)
    }
  }
}
</script>
