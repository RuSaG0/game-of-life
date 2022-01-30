<template>
  <Grid 
    :message="message"
    :current-speed="speed"
    />
</template>

<script>
// Components
import Grid from './components/Grid.vue'

export default {
  components: { Grid },
  name: 'App',
  mounted(){

  },
  data: function(){
    return {
      speed: 100,
      intervalID: 0,
      message: ''
    }
  }
}
</script>

<style>
</style>
