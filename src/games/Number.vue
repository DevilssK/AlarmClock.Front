<template>
  <div class="number-game-container" v-if="loaded">
    <div class="loader" v-if="showNumber"><div class="bar"></div></div>
    <div class="number-show" v-if="showNumber">
      {{number}}
    </div>
    <div class="number-input" v-else-if="!isSend && !showNumber">
     <div class="input-container">
      <input type="text" v-model="inputValue">
      <img @click="sendNumber" src="../../public/checked.png">
    </div>
     <div class="input-container">

      <div class="numbersKeyboard">
        <div @click="() => pushNumber('0')" class="nuberkey">0</div>
        <div @click="() => pushNumber('1')" class="nuberkey">1</div>
        <div @click="() => pushNumber('2')" class="nuberkey">2</div>
        <div @click="() => pushNumber('3')" class="nuberkey">3</div>
        <div @click="() => pushNumber('4')" class="nuberkey">4</div>
        <div @click="() => pushNumber('5')" class="nuberkey">5</div>
        <div @click="() => pushNumber('6')" class="nuberkey">6</div>
        <div @click="() => pushNumber('7')" class="nuberkey">7</div>
        <div @click="() => pushNumber('8')" class="nuberkey">8</div>
        <div @click="() => pushNumber('9')" class="nuberkey">9</div>
        <button @click="() => pushNumber('-1')" class="supr">del</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  props: {
    onWin: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isSend: false,
      number: null,
      score: 0,
      inputValue: "",
      showNumber: false,
      minRange: '99',
      time: 5000,
      loaded: false
    };
  },
  async created(){
    this.resetGame()
    await this.generateRandom(false)
    this.loaded = true
  },
  methods: {
    pushNumber(input){
      if(!this.inputValue) this.inputValue = ''
      if(input == "-1"){ this.inputValue = this.inputValue.slice(0 , this.inputValue.length - 1 )}
      else this.inputValue += input;
      
      },

    generateRandom (retry) {
      setTimeout(_ => {
        this.showNumber = true;
      }, 500)
      if(!retry) {
        this.minRange = this.minRange + '9'
        this.number = Math.floor(
          Math.random() * Number(this.minRange)
        );
      } 
      if(this.score === 3) this.onWin();
      setTimeout(_ => {
        this.showNumber = false
      }, this.time)
    },
    async sendNumber (){
      this.send = true
      if(this.number.toString() === this.inputValue) {
        this.score = this.score + 1
        await this.generateRandom(false)
      } else {
        this.isSend = false
        await this.generateRandom(true)
      }
      this.inputValue = ''
    },
    resetGame() {
      this.isSend = false
      this.number = null
      this.score = 0
      this.inputValue = null
      this.showNumber = false
      this.minRange = '99'
    }
  }
};
</script>

<style lang="scss" scoped>

@keyframes loader-animation {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.number-game-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .number-show {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    
  }

  .loader {
    height: 40px;
    width: 100vw;
    align-self: flex-start
  }

  .loader .bar {
    position: relative;
    height: 40px;
    width: 100%;
    background-color: dodgerblue;
    animation-name: loader-animation;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .number-input {
    align-items: center;
    justify-content: center;
    height: 120px;
    display: flex;
  flex-direction: column;


input {
  display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 300px;
  height: 60px;
  padding: 10px 20px;
  border: none;
  -webkit-border-radius: 29px;
  border-radius: 29px;
  font: normal 38px/normal "Courier New", Courier, monospace;
  color: rgba(255,255,255,1);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: #5aace2;
  -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
  text-shadow: 5px 1px 0 rgba(102,102,102,0.66) ;
  -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);

    }
    .numbersKeyboard{
      margin-top: 30px;
      display: flex;
      width: 60vw;
      justify-content: space-around;
      .nuberkey{
    align-items: center;
    justify-content: center;
    display: flex;
        background-color: rgb(209, 209, 209);
        font-size: 30px;
        font-weight: 500;
        width: 60px;
        height: 60px;
        text-align: center;
        font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
        border-radius: 50%
      }
    }

    .validate {
        background-color: greenyellow;
    }
  }

}
</style>