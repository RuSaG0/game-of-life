import * as Vue from "vue";

import "core-js/stable";
import "regenerator-runtime/runtime";

import TopLevelAppViewModule from "./modules/topLevelAppView/topLevelAppViewModule";
import Application from "./infrastructure/app/application";
import AppConfigurationProviderModule from "./modules/appConfigurationProvider/appConfigurationProviderModule";
import MainMenuModule from "./modules/mainMenu/mainMenuModule";

import GamePack from './modules/game/gameModule';
import InfoPack from './modules/info/infoModule';
import GreetingPack from './modules/greetings/greetingsModule';
// *********************************************************
// Setup version
// *********************************************************
window.Vue = Vue;
// ************************
// Creating application
// ************************
const app = new Application();

// ************************
// Installing modules
// ************************
const appLogUngroup = app.log.groupCollapsed('configure');
app
  .use(new AppConfigurationProviderModule())

// -----------------------------------
// App View
// -----------------------------------
app
  .use(new TopLevelAppViewModule())
  .use(new MainMenuModule())
  
// Sections
app
  .use(new GamePack())
  .use(new GreetingPack())
  .use(new InfoPack())
  

appLogUngroup();
setTimeout(async () => await app.runAsync(), 0);