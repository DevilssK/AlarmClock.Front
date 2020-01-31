<template>
  <div class="clock_preset">
    <div class="title">{{preset.Game}}</div>
    <div class="time-container">
      <div
        class="time"
        v-for="(AlarmTime, index) in getTime(preset.AlarmTime)"
        :key="AlarmTime + index"
      >{{AlarmTime}}</div>
    </div>
    <div class="days-container">
      <div 
        class="day"
        v-for="(day, index) in days()"
        :key="day.key"
        :class="{ active: isDayActive1(index+1)}"
      >{{formatDay(day)[0]}}</div>
    </div>
  </div>
</template>

<script>
import days from "@/api/days";
import { formatActivationFlag } from "@/api/formatActivationFlag";
import { getPresetList } from "../api/clockApi";

export default {
  name: "preset",
  props: {
    preset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
       ActiveDays : formatActivationFlag(this.preset.activationFlag)
    };
  },
  mounted() {
    console.log(formatActivationFlag(this.preset.activationFlag));
  },
  methods: {

    days() {
    return days;
    },
    
    getTime(time) {
      return time.split("");
    },
    formatDay(day) {
      return Object.keys(day)[0];
    },
    isDayActive(clock, index) {
      return clock.days.find(e => e === index + 1);
    },
        isDayActive1(index){
       return this.ActiveDays[index];
    }

  }
};
</script>
<style lang="scss" scoped>
.clock_preset {
  min-height: 200px;
  max-height: 220px;
  max-width: 350px;
  min-width: 100px;
  flex-grow: 1;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 1%;

  background: rgb(1, 1, 133);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.5s;
  border-radius: 25px 25px 25px 25px;
  box-shadow: 0px -1px 30px 0px rgba(0, 0, 0, 0.9);
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 177, 0.644);
    transform: scale(1.1);
  }
  .title {
    height: 30%;
    margin-top: 3%;
    color: white;
    font-size: 50px;
font-family: 'Source Sans Pro', sans-serif;

  }
  .time-container {
    height: 50%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  

    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      width: 48px;
      height: 72px;
      margin: 0 4px;
      padding: 4px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      &:nth-child(1n) {
        background: rgba(207, 207, 207, 0.835);
        color: rgb(0, 0, 0);
        border-radius: 2px;
      }
      &:nth-child(3n) {
        width: 20px;
        background: none;
        color: gray;
      }
    }
  }
  .days-container {
    height: 10%;
    display: flex;
    justify-content: space-between;
    width: 80%;
    .day {
      margin: 0% 0%;
      background-color: rgba(226, 226, 226, 0.938);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        border: 1px solid red;
        background-color: plum;
      }
    }
  }
}
</style>
