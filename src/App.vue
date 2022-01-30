<template>
<div class="GOL">
    <section class="hero primary-background">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a
                class="navbar-item"
                style="color: #fff">
                <span class="icon">
                  <i class="fas fa-heartbeat"/>
                </span>
                <span><strong>GAME OF LIFE</strong></span>
              </a>
              <span
                :class="{'is-active': isNavbar}"
                class="navbar-burger burger"
                data-target="navbarMenuHeroA"
                @click="isNavbar = !isNavbar">
                <span/>
                <span/>
                <span/>
              </span>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="columns box">
            <div class="column">
              <transition
                mode="out-in"
                name="fade">
                <keep-alive>
                  <Grid
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
import Controller from './components/Controller.vue'
import Grid from './components/Grid.vue'
import { nextTick } from 'vue';

export default {
  components: { Grid, Controller },
  name: 'App',
  data: function(){
    return {
      speed: 100,
      intervalID: 0,
      message: '',
      isRunning:false,
      isNavbar: false,
      isExport:false
    }
  },
  methods:{
    toClipboard() {
      this.isExport = false;
      let copyString = document.querySelector('#copystring');
      copyString.setAttribute('type', 'text');
      copyString.select();
      document.execCommand('copy');
    },
    delegate(_event) {
      if (_event === 'play') {
        this.isRunning = !this.isRunning;
        this.restartInterval();
      } else if (_event === 'slowDown') {
        this.speed > 100 ? this.changeSpeed(-100) : this.changeSpeed(-20);
        this.restartInterval();
      } else if (_event === 'speedUp') {
        this.speed < 100 ? this.changeSpeed(20) : this.changeSpeed(100);
        this.restartInterval();
      } else {
        this.updateMessage(_event);
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
  background-image: linear-gradient(
    to right top,
    #ffd464,
    #ff9766,
    #e4667e,
    #a34d91,
    #42448c
  );
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
