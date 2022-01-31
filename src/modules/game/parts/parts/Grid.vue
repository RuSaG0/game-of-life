<template>
  <Stats
    :current-tick="currentTick"
    :cell-count="matrixSize"
    :cells-alive="cellsAlive"
    :current-speed="currentSpeed"
    :historyCacher="historyCacher" />
  <div
    class="game-grid columns">
    <div
      v-for="(col, indexX) in matrix"
      :key="indexX"
      class="game-column">
      <Cell
        v-for="(isAlive, indexY) in col"
        :key="indexY"
        :indexY="indexY"
        :indexX="indexX"
        :isAlive="isAlive"
        @toggleCell="changeCellValue"
      />
    </div>
  </div>
</template>

<script>
// Components
import Stats from './Stats.vue'
import Cell from './Cell.vue'

// Utils
import HistoryCacher  from '../utils/cacher';

// Core
import {markRaw} from 'vue';

const CREATION_TRESHHOLD = .2;

export default {
  components: { Stats, Cell },
  props: {
    message: {
      default: '',
      type: String,
    },
    currentSpeed: {
      default: 0,
      type: Number,
    },
    IButtonActions: {
      type: Object
    }
  },
  data: function(){
    return {
      rows: 40,
      columns: 20,
      matrix: [],
      cellsAlive: 0,
      currentTick: 0,
      historyCacher: markRaw(new HistoryCacher()),
      isCycled: false
    }
  },
  watch: {
    message(_event) {
      const IButtonActions = this.IButtonActions;

      switch(_event) {
        case IButtonActions.nextStep:
          this.cellsAlive = 0;
          this.updateMatrixByEvolution();
          this.currentTick++;
          break;
        case IButtonActions.refresh:
          this.invalidateMatrix();
          break;
        case IButtonActions.createRandomMatrix:
          this.invalidateMatrix();
          this.fillMatrixByRandom();
          break;
      }
    },
  },
  mounted(){
    this.createFalsyMatrix();
  },
  computed: {
    matrixSize() {
      if(typeof this.rows === 'number' && typeof this.columns === 'number')
        return this.rows * this.columns;
      else
        return 0;
    }
  },
  methods: {
    createFalsyMatrix() {
      for (let i = 0; i < this.rows; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < this.columns; j++) {
          this.matrix[i][j] = false;
        }
      }
    },
    changeCellValue(_x, _y, _alive) {
      this.matrix[_x][_y] = _alive;
      this.updateCellCount(_alive);
    },
    updateMatrixByEvolution() {
      let tempArr = [];
      for (let i = 0; i < this.rows; i++) {
        tempArr[i] = [];
        for (let j = 0; j < this.columns; j++) {
          let status = this.matrix[i][j];
          let neighbours = this.getNeighbours(i, j);
          let result = false;
          if (status && neighbours < 2) {
            result = false;
          }
          if ((status && neighbours == 2) || neighbours == 3) {
            result = true;
          }
          if (status && neighbours > 3) {
            result = false;
          }
          if (!status && neighbours == 3) {
            result = true;
          }
          tempArr[i][j] = result;
        }
      }
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.changeCellValue(i, j, tempArr[i][j]);
        }
      }
      this.historyCacher.updateHistory(tempArr);
    },
    getNeighbours(_posX, _posY) {
      let neighbours = 0;
      if (_posX <= this.rows && _posY <= this.columns) {
        for (let offsetX = -1; offsetX < 2; offsetX++) {
          for (let offsetY = -1; offsetY < 2; offsetY++) {
            let newX = _posX + offsetX;
            let newY = _posX + offsetY;
            if (
              (offsetX != 0 || offsetY != 0) &&
              newX >= 0 &&
              newX < this.rows &&
              newY >= 0 &&
              newY < this.columns &&
              this.matrix[_posX + offsetX][_posY + offsetY] == true
            ) {
              neighbours++;
            }
          }
        }
      }
      return neighbours;
    },
    fillMatrixByRandom() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          let rand = Math.random();
          if (rand < CREATION_TRESHHOLD) {
            this.changeCellValue(i, j, true);
          } else {
            this.changeCellValue(i, j, false);
          }
        }
      }
    },
    updateCellCount(_isAlive) {
      if (_isAlive) this.cellsAlive++;
    },
    invalidateMatrix() {
      this.currentTick = 0;
      this.cellsAlive = 0;
      this.createFalsyMatrix();
      this.historyCacher.invalidate()
    },
  },
}
</script>

<style lang="scss">
.game-grid {
  border-top: 1px solid #1a0707;
  border-left: 1px solid #1a0707;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  max-width: 60%;
  max-height: 60%;
  margin: auto;
}
.game-column {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  flex-direction: column;
}
</style>
