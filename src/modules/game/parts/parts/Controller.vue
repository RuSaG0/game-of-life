<template>
 <div class="box">
    <p class="control">
      <button
        class="button"
        title="slow down"
        @click="sendEvent('slowDown')">
        <i class="fas fa-backward"/>
    </button></p>
    <p class="control">
      <button
        :class="isRunning ? 'green' : 'red'"
        class="button"
        title="play"
        @click="sendEvent('play')">
        <font-awesome-icon v-show="isRunning" :icon="['fas', 'stop']"></font-awesome-icon>
        <font-awesome-icon v-show="!isRunning" :icon="['fas', 'play']"></font-awesome-icon>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="Create new one"
        @click="sendEvent('clear')">
        <i class="fas fa-redo"/>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="next step"
        @click="sendEvent('nextStep')">
        <i class="fas fa-step-forward"/>
    </button></p>
    <p class="control">
      <button
        class="button"
        title="speed up"
        @click="sendEvent('speedUp')">
        <i class="fas fa-forward"/>
    </button></p>
    <p class="control">
      <button
        class="button"
        @click="sendEvent('randomSeed')">
        <span class="icon">
          <i class="fas fa-random"/>
        </span>
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