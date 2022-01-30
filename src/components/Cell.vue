<template>
  <div
    :class="isAlive ? 'alive' : 'dead'"
    class="cell"
    @mousedown="reborn(true)"
  />
</template>

<script>

export default {
  name:"Cell",
  props: {
    statusObj: {
      type: Object,
      default: () => ({
        isAlive: false
      })
    },
  },
  emits: ['wasUpdated'],
  data: function(){
    return {
      isAlive: false,
    }
  },
  watch: {
    'statusObj.isAlive': {
      deep: true,
      handler(_val){
        this.isAlive = _val ?? false;
      }
    }
  },
  methods: {
    reborn(_bool) {
      if (_bool) {
        this.isAlive = !this.isAlive;
        console.warn(this.isAlive);
        this.$emit('wasUpdated', this.isAlive);
      }
    },
  }
}
</script>

<style>
.cell {
  flex: 1;
  user-select: none;
  border-right: 1px solid #1a0707;
  border-bottom: 1px solid #1a0707;
  padding-bottom: 100%;
}

.cell:hover {
  background-color: rgba(132, 26, 26, 0.6);
}

.alive {
  background-color: #bb4747 !important;
}
</style>
