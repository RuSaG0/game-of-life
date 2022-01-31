<template>
  <div class="box">

  <div class="buttonWrapper">
    <p class="m-p">Speed: </p>
  <div
    class="iconWrapper iconWrapper"
    @click="sendEvent(IButtonActions.speedDown)">
    <ArrowDownIcon class="arrowDownIcon arrowDownIcon-down"/>
  </div>
  <div
    class="iconWrapper iconWrapper-up"
    @click="sendEvent(IButtonActions.speedUp)">
    <ArrowDownIcon class="arrowDownIcon arrowDownIcon-up"/>
  </div>

  </div>

  <div class="buttonWrapper">
    <p class="m-p">Evolution: </p>
  <div
    class="iconWrapper iconWrapper"
    @click="sendEvent(IButtonActions.nextStep)">
    <ArrowDownIcon class="arrowDownIcon arrowDownIcon-next"/>
  </div>

  </div>
  
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
    @click="sendEvent(IButtonActions.createRandomMatrix)">
    Random
  </button>
  </div>
</template>

<script>
// Icons
import ArrowDownIcon from '@/assets/icons/arrow__down';

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
  components: {
    ArrowDownIcon
  },
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

  .buttonWrapper{
    display: flex;
    align-content: center;
    .iconWrapper {
      margin-left: 5px;
      width: 20px;
      cursor: pointer;
      .arrowDownIcon{
        width:12px;
        &-down {
          transform: rotate(0deg);
        }
        &-up {
          transform: rotate(180deg);
        }
        &-next{
          transform: rotate(-90deg);
        }
        &:hover {
          fill: var(--primary100);
        }
      }
    }
  }
</style>