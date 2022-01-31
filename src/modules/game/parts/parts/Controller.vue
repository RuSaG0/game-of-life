<template>
  <div class="box">
  <button
    class="m-button"
    @click="sendEvent('slowDown')">
    Slow
  </button>

  <button
    class="m-button"
    @click="sendEvent('speedUp')">
      Speed up
    </button>

  <template v-if="isRunning">
    <button
      class="m-button-error"
      @click="sendEvent('togglePlay')">
      Stop
    </button>
  </template>

  <template v-else>
    <button
      class="m-button"
      title="togglePlay"
      @click="sendEvent('togglePlay')">
      Play
    </button>
  </template>

  <button
    class="m-button-error"
    title="togglePlay"
    @click="sendEvent('clear')">
    Clear
  </button>

  <button
    class="m-button"
    title="togglePlay"
    @click="sendEvent('nextStep')">
    Next step
  </button>

  <button
    class="m-button"
    title="togglePlay"
    @click="sendEvent('randomSeed')">
    Random
  </button>

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
</style>