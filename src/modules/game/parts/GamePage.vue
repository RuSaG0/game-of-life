<template>
<h2 class="m-h2">Game </h2>
<div class="GOL">
    <section class="hero primary-background">
      <div class="hero-body">
        <div class="container">
          <div class="columns box">
            <div class="column">
              <transition
                mode="out-in"
                name="fade">
                <keep-alive>
                  <Grid
                    :IButtonActions="IButtonActions"
                    :message="message"
                    :current-speed="speed" />
                </keep-alive>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container">
          <div class="columns">
            <div class="column is-fullwidth">
              <Controller
                :IButtonActions="IButtonActions"
                :is-running="isRunning"
                @send="delegate($event)"/>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>

// Components
import Controller from './parts/Controller.vue'
import Grid from './parts/Grid.vue'
import { nextTick } from 'vue';

// Utils
import {IButtonActions} from './utils/buttonsActions';

// Core
import {markRaw} from 'vue';

export default {
  components: { Grid, Controller },
  name: 'App',
  data: function(){
    return {
      speed: 100,
      intervalID: 0,
      message: '',
      isRunning:false,
      IButtonActions: markRaw(IButtonActions)
    }
  },
  methods:{
    delegate(_event) {
      const IButtonActions = this.IButtonActions;
      
      switch(_event) {
        case IButtonActions.togglePlay:
          this.isRunning = !this.isRunning;
          this.restartInterval();
          break;
        case IButtonActions.speedDown:
          this.speed > 100 ? this.changeSpeed(-100) : this.changeSpeed(-20);
          this.restartInterval();
          break;
        case IButtonActions.speedUp:
          this.speed < 100 ? this.changeSpeed(20) : this.changeSpeed(100);
          this.restartInterval();
          break;
        case IButtonActions.refresh:
          this.isRunning = false;
          this.restartInterval();
          this.updateMessage(_event);
          break;
        case IButtonActions.createRandomMatrix:
          this.isRunning = false;
          this.restartInterval();
          this.updateMessage(_event);
          break;
        default:
          this.updateMessage(_event);
          break;
      }
    },
    updateMessage(_newMessage) {
      this.message = _newMessage;
      nextTick(this.resetMessage);
    },
    resetMessage(){
      this.message = '';
    },
    changeSpeed(_speed) {
      this.speed += _speed;
      if (this.speed < 20) {
        this.speed = 20;
      } else if (this.speed > 500) {
        this.speed = 500;
      }
    },
    restartInterval() {
      clearInterval(this.intervalID);
      if (this.isRunning) {
        this.intervalID = setInterval(
          this.updateMessage,
          50000 / this.speed,
          'nextStep'
        );
      }
    },
  }
}
</script>

<style lang="scss">
html,
body {
  color: #000;
  margin: 0px;
}
#app {
  color: #fff;
}

.hero-body {
  padding: 1rem;
  margin: 1rem;
}


.footer {
  padding: 1rem;
  background-color: transparent;
}

.navbar-item {
  color: #ff9766;
}

.hr {
  position: relative;
  border-top: 2px solid #414b5c;
  margin: 0px;
  bottom: 0;
}
</style>
