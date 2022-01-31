<template>
  <div class="box">
  <button
    class="m-button"
    @click="sendEvent(IButtonActions.speedDown)">
    Slow
  </button>

  <button
    class="m-button"
    @click="sendEvent(IButtonActions.speedUp)">
      Speed up
    </button>

  <template v-if="isRunning">
    <button
      class="m-button-error"
      @click="sendEvent(IButtonActions.togglePlay)">
      Stop
    </button>
  </template>

  <template v-else>
    <button
      class="m-button"
      title="togglePlay"
      @click="sendEvent(IButtonActions.togglePlay)">
      Play
    </button>
  </template>

  <button
    class="m-button-error"
    title="togglePlay"
    @click="sendEvent(IButtonActions.refresh)">
    Clear
  </button>

  <button
    class="m-button"
    title="togglePlay"
    @click="sendEvent(IButtonActions.nextStep)">
    Next step
  </button>

  <button
    class="m-button"
    title="togglePlay"
    @click="sendEvent(IButtonActions.createRandomMatrix)">
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
    IButtonActions: {
      type: Object
    }
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