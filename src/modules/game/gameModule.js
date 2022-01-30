import GamePage from './parts/GamePage';

export default class {
  name = 'game';
  #p_log = null;
  #p_app = null;

  set log(_log) {
    this.#p_log = _log;
  }

  install(_app) {
    this.#p_app = _app;
  }

  routes(_routes) {
    _routes.push({
      path: '/game',
      name: 'game',
      component: GamePage
    });
  }

  postWire() {
    this.#p_app.interfaces.mainMenu.add({
      id: 'game',
      title: 'Game',
      link: {name: 'game'},
      z: 'Z',
    });
  }
  
}