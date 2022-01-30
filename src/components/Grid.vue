<template>
  <div>
    <Info 
      :current-tick="currentTick"
      :cell-count="cellCount"
      :cells-alive="cellsAlive"
      :cells-created="cellsCreated"
      :current-speed="currentSpeed"
      />

      <div
        v-for="(col, indexX) in gridList"
        :key="indexX"
      >
        <Cell 
          v-for="(isAlive, indexY) in col"
          :key="indexY"
          @wasUpdated="updateCellCount"
        />
      </div>
  </div>
</template>

<script>
// Components
import Cell from './Cell.vue'
import Info from './Info.vue'

export default {
  components: { Info, Cell },
  props: {
    currentSpeed: {
      default: 0,
      type: Number,
    },
    message: {
      default: '',
      type: String,
    },
  },
  data: function(){
    return {
      width: 46,
      height: 20,
      cellsAlive: 0,
      cellsCreated: 0,
      cellCount: 0,
      currentTick: 0,
    }
  },
  mounted(){
    this.cellCalc();
  },
  methods: {
    cellCalc() {
      for (let i = 0; i < this.width; i++) {
        this.gridList[i] = [];
        for (let j = 0; j < this.height; j++) {
          this.gridList[i][j] = {isAlive: false};
        }
      }
      this.cellCount = this.width * this.height;
    },
  }
}
</script>

<style>

</style>