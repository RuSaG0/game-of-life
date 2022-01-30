<template>
  <div class="dynamicsComponents">
    <div
        class="dynamicsComponents__left"
        :style="{width: width + 'px'}"
    >
        <template
            v-for="item in $store.state.mainMenu"
            :key="item.id"
        >
          <div class="dynamicsComponents__left__item dynamicsComponents__left__item__current"
          >
            <template v-if="item.component">
              <component :is="item.component"/>
            </template>
            <template v-else>
              <router-link
                  :to="item.link"
                  class="router__link"
              >
                <span class="left__item__link"> {{ item.title }} </span>
              </router-link>
            </template>
          </div>
        </template>
    </div>
    </div>
    <router-view />
</template>

<script>
export default {
  name: "AppView",
}
</script>

<style lang="scss" scoped>
@import "../../styles/total.scss";

@font-face {
  font-family: "Roboto";
  src: url("../../../assets/fonts/Roboto-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("../../../assets/fonts/Roboto-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("../../../assets/fonts/Roboto-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("../../../assets/fonts/Roboto-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

.dynamicsComponents {
    position: relative;
    display: flex;
    flex: 1;
    justify-content: space-between;

    .dynamicsComponents__left {
      display: flex;
      align-items: center;
      min-width: 34px;
      margin-right: 10px;

      .router__link {
        height: 100%;
        white-space: nowrap;
        display: flex;
        align-items: center;
        padding: 2px 5px;
        text-decoration: none;
        margin: 10px;

        .left__item__link {
          position: relative;
          margin-right: 5px;
          font-size: 1rem;
          color: var(--text90);
          text-decoration: none;
        }

        &:hover {
          .left__item__link {
            color: var(--primary100);
          }
        }
      }

      .router-link-active {
        .left__item__link {
          color: var(--primary100);
        }

        &::before {
          content: "";
          height: 3px;
          left: 5px;
          right: 5px;
          bottom: -5px;
          position: absolute;
          background-color: var(--primary100);
        }

        .arrow__down {
          fill: var(--primary100);
        }
      }

      .dynamicsComponents__left__item {
        margin-right: 20px;
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
        border-radius: 3px;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          .left__item__link {
            color: var(--primary100);
          }

          .arrow__down {
            fill: var(--primary100);
          }

          cursor: pointer;
        }
      }
    }

  }
</style>