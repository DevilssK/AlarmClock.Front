<template>
<div class="reflex-container">
	<h1>Test your reaction time!</h1>
		<p>Click on the boxes and circles as quickly as you can. Your reaction time will be posted below: </p>
	
		<p id="printReactionTime"></p>
	
		<div id="box" @click="clicked"></div>
		</div>
</template>

<script>
export default {
  computed: {},
  props: {
    // onWin: {
    //   type: Function,
    //   required: true
    // }
  },
  data() {
    return {
      isSend: false,
      number: null,
      score: 0,
      clickedTime: 0,
      createdTime: null,
      reactionTime: 0,
      showNumber: false,
      minRange: '99',
      time: 5000,
      loaded: false,
      color:'',
    };
  },
   mounted(){
     this.makeBox();
  },
  methods: {
    
   
		
			 makeBox() {
          console.log('makeBox')

					var time=Math.random();
					time=time*3000;
				
				setTimeout(function() {
				
					if (Math.random()>0.5) {
					
						document.getElementById("box").style.borderRadius="100px";
						
						} else {
						
							document.getElementById("box").style.borderRadius="0";
						}
						
					var top= Math.random();
						top= top*400;
					var left= Math.random();
						left= left*700; 
						
					document.getElementById("box").style.top = top + "px";
					document.getElementById("box").style.left = left + "px"; 
					document.getElementById("box").style.backgroundColor = this.getRandomColor			
					document.getElementById("box").style.display="block";
					
        
          this.createdTime = Date.now();
          console.log("justCreated");
          console.log(this.createdTime);
					
				}, time); 

      },

      getRandomColor() {
				
				var letters = "0123456789ABCDEF".split('');
				var color = "#";
				for (var i = 0; i < 6; i++) {
					color += letters[Math.round(Math.random() * 15)];
        } //ends for loop 
        this.color = color;
				return color;
			
			
			} ,// ends getRandomColor Function
		
      
			clicked(){
				console.log("Clicked");
				this.clickedTime = Date.now();
        
				console.log("clickedtime" + this.clickedTime);
        console.log(this.createdTime);
        Date.
				this.reactionTime = Math.floor((this.createdTime - this.clickedTime)/1000) ;
        console.log("react"+this.reactionTime);
        
				document.getElementById("printReactionTime").innerHTML="Your Reaction Time is: " + this.reactionTime + "seconds";
				document.getElementById("box").style = "display : none"
				
				this.makeBox();
				
				
			}
			
			
			
			
		
		
		
  }
};
</script>

<style lang="scss" scoped>

#box {
				width: 200px;
				height: 200px;
				background-color: blue;
				display: none;
				position: relative; 
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