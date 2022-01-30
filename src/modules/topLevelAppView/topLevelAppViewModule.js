import AppView from "./parts/AppView";

export default class {
  name = 'top-level-app-view';

  configure(_app) {
    _app.appView = AppView;
    _app.mountNode = "#app";
  }
}