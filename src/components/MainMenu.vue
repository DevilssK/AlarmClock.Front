
<template>
  <div class="container">
    <div class="Presets">
      <div class="presetlist" v-if="Presets.length !== 0">
        <PresetCard v-for="preset in Presets" :key="preset.presetId" :preset="preset"></PresetCard>

      </div>
      <div v-else>Vous n'avez pas de presets</div>
      <div class="text" @click="Home">
        <button class="button">Back to Clock</button>
      </div>
    </div>

  </div>
</template>

<script>
import { getPresetList } from "../api/clockApi";
import PresetJson from "../../public/presets.json";

import PresetComp from "./Preset";

export default {
  components: {
    PresetCard: PresetComp
  },
  data() {
    return {
      Presets: PresetJson.PresetList
      
    };
  },
  async mounted() {
   // this.PresetList = await getPresetList();
  console.log(PresetJson.PresetList);
  },
  methods: {
    Home() {
      this.$router.replace("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
      width: 100vw;
    height: 100vh;
    .text{
      text-align: center;
    }
    .button{
      margin: -9px  3px;
    }

  .presetlist {
    justify-content: space-around;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 97vw;
    height: 90vh;
    flex-wrap: wrap;

  }
  .button{
      padding: 9px 17px !important; 
  }
}
</style>
