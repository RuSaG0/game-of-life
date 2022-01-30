import InfoPage from './parts/InfoPage';

export default class {
  name = 'info';
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
      path: '/info',
      name: 'info',
      component: InfoPage,
      props: true,
    });
  }

  postWire() {
    this.#p_app.interfaces.mainMenu.add({
      id: 'info',
      title: 'Info',
      link: {name: 'info'},
      z: 'ZZZ',
    });
  }
}