<template>
   <div class="box">
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>gen # {{ currentTick }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>alive: {{ cellsAlive }} ({{Math.round(cellsAlive * 100 / cellCount) }} %)</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>speed: {{ currentSpeed }} %</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile" v-if="historyCacher.isCycled">
        <strong>Oooops, it looped ;)</strong>
      </div>
  </div>
</template>

<script>
export default {
  name:'Stats',
  props: {
    currentTick: {
      default: 0,
      type: Number,
    },
    cellCount: {
      default: 0,
      type: Number,
    },
    cellsAlive: {
      default: 0,
      type: Number,
    },
    currentSpeed: {
      default: 0,
      type: Number,
    },
    historyCacher: {
      type: Object,
      default: (()=> {})
    }
  },
}
</script>

<style scoped lang="scss">
.box {
  background-color: #e7eef5;
  color:black;
  display: flex;
  align-items:center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}
.column {
  margin: 0;
}
</style>