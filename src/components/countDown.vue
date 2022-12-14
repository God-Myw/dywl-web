<template>
  <div class="countDown">
    <div v-if="days != 0" class="countDown_days">{{ days }}天</div>
    <div class="countDown_bg">
      <div>{{ hours }}</div>
    </div>
    <div class="countDown_dot"></div>
    <div class="countDown_bg">
      <div>{{ minutes }}</div>
    </div>
    <div class="countDown_dot"></div>
    <div class="countDown_bg">
      <div>{{ seconds }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["endDate"],
  data() {
    return {
      // endDate: "2021-12-17 17:30:00", // 截止时间
      // endDate: 1639903860000, // 截止时间时间戳
      days: 0,
      hours: "00",
      minutes: "00",
      seconds: "00",
      residue: 0,
    };
  },
  created() {
    this.getResidueDate();
  },
  mounted() {
  },
  methods: {
    getResidueDate() {
      let set = setInterval(() => {
        this.residue = new Date(this.endDate).getTime() - new Date();
        if (new Date(this.endDate).getTime() - new Date() > 0) {
          this.days = parseInt(Math.floor(this.residue / 1000 / 60 / 60 / 24)); //天
          this.hours = this.addZero(
            Math.floor((this.residue / 1000 / 60 / 60) % 24)
          ); //时
          this.minutes = this.addZero(
            Math.floor((this.residue / 1000 / 60) % 60)
          ); //分
          this.seconds = this.addZero(Math.floor((this.residue / 1000) % 60)); //秒
        } else {
          clearInterval(set);
          this.$emit("openactivity", true);
        }
      }, 1000);
    },
    addZero(d) {
      return parseInt(d) < 10 ? "0" + d : d;
    },
  },
};
</script>

<style lang="scss" scoped>
.countDown {
  display: flex;
  align-items: center;
  .countDown_days {
    font-size: 14px;
    font-weight: 400;
    color: #303133;
    margin-right: 11px;
  }
  .countDown_bg {
    padding: 5px 3px;
    background: #4791ff;
    border-radius: 4px;
    div {
      font-size: 14px;
      height: 14px;
      width: 16px;
      line-height: 14px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .countDown_dot {
    background: url("../assets/homepage/蒙版组 178@2x.png") no-repeat;
    background-size: 14px 14px;
    width: 14px;
    height: 14px;
  }
}
</style>
