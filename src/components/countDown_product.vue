<template>
  <div class="countDown">
    <div v-if="days != 0" class="countDown_days">{{ days }}天</div>
    <div class="countDown_bg">
      <span>{{ hours }}</span>
    </div>
    <div class="countDown_dot">:</div>
    <div class="countDown_bg">
      <span>{{ minutes }}</span>
    </div>
    <div class="countDown_dot">:</div>
    <div class="countDown_bg">
      <span>{{ seconds }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["endDate"],
  data() {
    return {
      // endDate: "2021-12-29 17:30:00", // 截止时间q
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
    // console.log(this.endDate);
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
    line-height: 14px;
    color: #4791ff;
    margin-right: 4px;
  }
  .countDown_bg {
    span {
      display: block;
      width: 20px;
      text-align: center;
      font-size: 14px;
      line-height: 14px;
      font-weight: 400;
      color: #4791ff;
    }
  }
  .countDown_dot {
    font-size: 14px;
    line-height: 14px;
  }
}
</style>
