
<template>
  <section>
    <div class="container" v-if="!gamseIsSelected">
      <div class="clock">
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
        </div>
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
          <div class="num">3</div>
          <div class="num">4</div>
          <div class="num">5</div>
          <div class="num">6</div>
          <div class="num">7</div>
          <div class="num">8</div>
          <div class="num">9</div>
        </div>
        <div class="colon"></div>
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
          <div class="num">3</div>
          <div class="num">4</div>
          <div class="num">5</div>
        </div>
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
          <div class="num">3</div>
          <div class="num">4</div>
          <div class="num">5</div>
          <div class="num">6</div>
          <div class="num">7</div>
          <div class="num">8</div>
          <div class="num">9</div>
        </div>
        <div class="colon"></div>
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
          <div class="num">3</div>
          <div class="num">4</div>
          <div class="num">5</div>
        </div>
        <div class="column">
          <div class="num">0</div>
          <div class="num">1</div>
          <div class="num">2</div>
          <div class="num">3</div>
          <div class="num">4</div>
          <div class="num">5</div>
          <div class="num">6</div>
          <div class="num">7</div>
          <div class="num">8</div>
          <div class="num">9</div>
        </div>
      </div>
      <div v-if="!this.RingOn"> 
         <div class="text" @click="MainMenu">
        <button class="button">Go to Presets</button>
      </div>
      </div>
      <div v-else>
        <audio controls autoplay style="display:none" id="myAudio" loop>
          <source :src="MusicName + Time" type="audio/mpeg">
        </audio>
        <button class="button" @click="Game">Jouer</button>
      </div>
     
    </div>
    <NumberGame :onWin="onWinGame" v-if="gamseIsSelected" />
  </section>
</template>


<script>
import { runClock } from "../api/clockScript.js";7
import { getClockInfo } from "../api/clockApi.js";
import PresetFile from "../../public/presets.json";
import vue from 'vue';
import NumberGame from '@/games/Number.vue'


// TODO
// refacto display game 
// set preset 
// clear game display 

// 

export default {
  components: {
    NumberGame
  },
  data() {
    return {
      ClockName: "",
      RingOn: false,
      MusicName: "",
      Time: "#t=00:00:00",
      EndTime: "",
      ClockTime: "None",
      GameName: "",
      Loop: {},
      PresetList: PresetFile.PresetList,
      PresetNumber: -1,
      gamseIsSelected: false,
      runClock
    };
  },
  async mounted() {

    //this.ClockName = await getClockInfo();
    this.clockName = "default-Name";
    let columns = Array.from(document.getElementsByClassName("column"));
    this.runClock(columns);
    var date;
      this.Loop = window.setInterval(() => {
        date = new Date;
          this.ClockUpdate(date);
          console.log(date.getSeconds());
          this.TestClock();
      }, 1000);
  },


  methods: {

    onWinGame () {
      this.$router.push("/home");
      this.gamseIsSelected = false;
      console.log("win");
      this.$forceUpdate();
  },

    MainMenu() {

      this.$router.replace("/MainMenu");
    },

    RingBell() {

      this.RingOn = true;
      console.log("RingOn")
    },

    async TestClock() {

      var d = new Date;
      var n = this.FormatHour(d);

      console.log("Actual hour : " + n);
      console.log("Alarm hour : " + this.ClockTime);

   

      if(n == this.ClockTime) {
        console.log(true)
        this.RingBell()
      }
      else {
        return false;
      }
    },

    Game() {
      window.clearInterval(this.Loop);
       console.log("Stop Loop");
       this.EndTime = document.getElementById("myAudio").currentTime.toFixed(2);
       if (this.EndTime < 10) {

         this.EndTime = "0" + this.EndTime;
       }
      this.gamseIsSelected = true

       var temp = this.EndTime.split(".");
      // this.EndTime = temp[0];
     //  this.$router.replace("/" + this.GameName + "/" + this.EndTime + "/" + this.PresetNumber);
    },

    ClockUpdate(date) {

      var day = date.getDay();
      var flagTab;

      for (var i = 0 ; i < this.PresetList.length ; i++) {

        flagTab = this.formatActivationFlag(this.PresetList[i].ActivationFlag);
        
        if (day == 1 && 
            flagTab[0] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 2 && 
            flagTab[1] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 3 && 
            flagTab[2] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 4 && 
            flagTab[3] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 5 && 
            flagTab[4] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 6 && 
            flagTab[5] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
        else if (day == 0 && 
            flagTab[6] && 
            flagTab[7]) 
        {

          this.AlarmUpdate(date, this.PresetList[i], i);
        }
      }
    },

    AlarmUpdate(date, Alarm, i) {

      var hour = this.FormatHour(date);
      if (hour <= Alarm.AlarmTime) {

        if (this.ClockTime == "None" || this.ClockTime > Alarm.AlarmTime) {

          this.ClockTime = Alarm.AlarmTime;
          this.MusicName = Alarm.Music;
          this.GameName = Alarm.Game;
          this.PresetNumber = i;
        }
      }
    },

    formatActivationFlag(flag) {
      let flagArray = [];
      for (let i = 2; i <= 255; i = i << 1) {
        if ((flag & i) !== 0) {
          flagArray.push(true);
        } else {
          flagArray.push(false);
        }
      }
      if ((flag & 1) != 0) flagArray.push(true);
      else flagArray.push(false);
      return flagArray;
    },

    FormatHour(date) {

      var formatDate = "";
      if (date.getHours() < 10) 
      {
        formatDate = "0" + date.getHours();
      }
      else 
      {
        formatDate = date.getHours();
      }

      formatDate += ":";

      if (date.getMinutes() < 10) 
      {
        formatDate += "0" + date.getMinutes();
      }
      else 
      {
        formatDate += date.getMinutes();
      }

      formatDate += ":";

      if (date.getSeconds() < 10) 
      {
        formatDate += "0" + date.getSeconds();
      }
      else 
      {
        formatDate += date.getSeconds();
      }

      return formatDate;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

.container {
  text-align: center;
  color: #0e141b;
  font-family: "Josefin Sans";
  font-weight: 300;

  .text {
    font-size: 25px;
    .link {
    }
  }

  .clock {
    
    max-height: 500px;
    overflow: hidden;
    

    .column,
    .colon {
      display: inline-block;
      vertical-align: top;
      font-size: 100px;
      line-height: 86px;
    }

    .column {
      transition: -webkit-transform 300ms;
      transition: transform 300ms;
      transition: transform 300ms, -webkit-transform 300ms;
    }

    .colon {
      transition: -webkit-transform 300ms;
      transition: transform 300ms;
      transition: transform 300ms, -webkit-transform 300ms;
      -webkit-transform: translateY(calc(50vh - 43px));
      transform: translateY(calc(50vh - 43px));
    }
    .colon:after {
      content: ":";
    }

    .num {
      transition: opacity 1000ms, text-shadow 100ms;
      opacity: 0;
    }
    .num.visible {
      opacity: 1;
      padding: 4%;
      margin: 15px;
      font-size: 116px;
      color: rgb(236, 236, 236);

      text-shadow: 1px 10px 0px rgba(121, 121, 121, 0.199);
    }
    .num.close {
      opacity: 0.35;
    }
    .num.far {
      opacity: 0;
      width: 0%;
    }
    .num.distant {
      opacity: 0;
    }
  }
}
</style>
