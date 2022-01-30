<template>
  <div
    :class="isAlive ? 'alive' : 'dead'"
    class="cell"
    @mousedown="toggle"
  />
</template>

<script>

export default {
  name:"Cell",
  props: {
    isAlive: {
      type: Boolean,
      default: false
    },
    indexY: {
      type: Number,
    },
    indexX: {
      type: Number,
    },
  },
  emits: ['toggleCell'],
  methods: {
    toggle() {
      this.$emit('toggleCell', this.indexX, this.indexY, !this.isAlive);
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
