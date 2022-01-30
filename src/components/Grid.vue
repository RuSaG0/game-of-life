<template>
  <div>
    <Stats
      :current-tick="currentTick"
      :cell-count="cellCount"
      :cells-alive="cellsAlive"
      :cells-created="cellsCreated"
      :current-speed="currentSpeed"/>
    <div
      class="game-grid columns"
      @mousedown="isMouseDown = true"
      @mouseup="isMouseDown = false"
      @mouseleave="isMouseDown = false">
      <div
        v-for="(col, indexX) in gridList"
        :key="indexX"
        class="game-column">
        <Cell
          v-for="(isAlive, indexY) in col"
          :key="indexY"
          :status-obj="isAlive"
          :is-mouse-down="isMouseDown"
          @wasUpdated="updateCellCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Components
import Stats from './Stats.vue'
import Cell from './Cell.vue'

export default {
  components: { Stats, Cell },
  props: {
    message: {
      default: '',
      type: String,
    },
    importToken: {
      default: '',
      type: String,
    },
    currentSpeed: {
      default: 0,
      type: Number,
    },
  },
  emits: ['exportToken'],
  data: function(){
    return {
      width: 46,
      height: 20,
      gridList: [],
      cellsAlive: 0,
      cellsCreated: 0,
      cellCount: 0,
      currentTick: 0,
      isMouseDown: false,
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
    setCell(x, y, alive) {
      if (this.gridList[x][y].isAlive != alive) {
        this.gridList[x][y].isAlive = alive;
        this.updateCellCount(alive);
      }
    },
    update() {
      let tempArr = [];
      for (let i = 0; i < this.width; i++) {
        tempArr[i] = [];
        for (let j = 0; j < this.height; j++) {
          let status = this.gridList[i][j].isAlive;
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
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.setCell(i, j, tempArr[i][j]);
        }
      }
    },
    getNeighbours(posX, posY) {
      let neighbours = 0;
      if (posX <= this.width && posY <= this.height) {
        for (let offsetX = -1; offsetX < 2; offsetX++) {
          for (let offsetY = -1; offsetY < 2; offsetY++) {
            let newX = posX + offsetX;
            let newY = posY + offsetY;
            if (
              (offsetX != 0 || offsetY != 0) &&
              newX >= 0 &&
              newX < this.width &&
              newY >= 0 &&
              newY < this.height &&
              this.gridList[posX + offsetX][posY + offsetY].isAlive == true
            ) {
              neighbours++;
            }
          }
        }
      }
      return neighbours;
    },
    reset() {
      this.currentTick = 0;
      this.cellsAlive = 0;
      this.cellsCreated = 0;
      this.gridList.forEach((col) => {
        col.forEach((cell) => {
          cell.isAlive = false;
        });
      });
    },
    randomSeed() {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          let rand = Math.random();
          if (rand < 0.2) {
            this.setCell(i, j, true);
          } else {
            this.setCell(i, j, false);
          }
        }
      }
    },
    importSession() {
      this.reset();
      let regex = /\[\d+,\d+\]/gm;
      let tempArr = this.importToken.match(regex);
      if (tempArr) {
        tempArr.forEach((element) => {
          element = element.substring(1, element.length - 1);
          let xy = element.split(',');
          this.setCell(+xy[0], +xy[1], true);
        });
      }
    },
    exportSession() {
      let exportToken = '';
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          if (this.gridList[i][j].isAlive) {
            exportToken += '[' + i + ',' + j + ']';
          }
        }
      }
      this.$emit('exportToken', exportToken);
    },
    updateCellCount(bool) {
      if (bool) {
        this.cellsAlive++;
        this.cellsCreated++;
      } else {
        this.cellsAlive--;
      }
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
