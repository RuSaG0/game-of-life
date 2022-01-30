<template>
 <div class="box">
    <div class="field has-addons has-addons-centered is-marginless">
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          title="slow down"
          @click="sendEvent('slowDown')">
          <i class="fas fa-backward"/>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          :class="isRunning ? 'green' : 'red'"
          class="button"
          title="play"
          @click="sendEvent('play')">
         <font-awesome-icon v-show="isRunning" :icon="['fas', 'stop']"></font-awesome-icon>
         <font-awesome-icon v-show="!isRunning" :icon="['fas', 'play']"></font-awesome-icon>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          title="clear grid"
          @click="sendEvent('redoSession')">
          <i class="fas fa-redo"/>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          title="next step"
          @click="sendEvent('nextStep')">
          <i class="fas fa-step-forward"/>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          title="speed up"
          @click="sendEvent('speedUp')">
          <i class="fas fa-forward"/>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          @click="sendEvent('randomSeed')">
          <span class="icon">
            <i class="fas fa-random"/>
          </span>
          <b>Random</b>
      </button></p>
    </div>
    <div class="field has-addons has-addons-centered is-marginless">
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          @click="sendEvent('importSession')">
          <span class="icon">
            <i class="far fa-edit"/>
          </span>
          <b>Import</b>
      </button></p>
      <p class="control">
        <button
          :disabled="mainComponent !== 'gamePage'"
          class="button"
          @click="sendEvent('exportSession')">
          <span class="icon">
            <i class="far fa-save"/>
          </span>
          <b>Export</b>
      </button></p>
    </div>
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
    mainComponent: {
      default: 'gamePage',
      type: String,
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
    padding: 0;
  }
  .green {
    background-color: hsla(120, 77%, 26%, 0.6);
  }
  .red {
    background-color: hsla(0, 67%, 31%, 0.6);
  }
</style>