<template>
 <div class="box">
    <p class="control">
      <button
        class="m-button"
        title="slow down"
        @click="sendEvent('slowDown')">
        <b>Slow</b>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="speed up"
        @click="sendEvent('speedUp')">
        <b>Speed up</b>
    </button></p>
    <p class="control">
      <button
        :class="isRunning ? 'green' : 'red'"
        class="button"
        title="play"
        @click="sendEvent('play')">
        <b>Play / stop</b>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="Create new one"
        @click="sendEvent('clear')">
        <b>Clear</b>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="next step"
        @click="sendEvent('nextStep')">
        <b>Next step</b>
    </button></p>
    <p class="control">
      <button
        class="button"
        @click="sendEvent('randomSeed')">
        <b>Random</b>
    </button></p>
  </div>
</template>

<script>
export default {
  name: 'Controller',
  props: {
    isRunning: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['send'],
  methods: {
    sendEvent(_event) {
      this.$emit('send', _event);
    },
  },

}
</script>

<style scoped lang="scss">
  .box {
    padding:0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
  }
  .green {
    background-color: hsla(120, 77%, 26%, 0.6);
  }
  .red {
    background-color: hsla(0, 67%, 31%, 0.6);
  }
</style>