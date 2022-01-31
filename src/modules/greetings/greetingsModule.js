import GreetingPage from './parts/GreetingPage';

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
      path: '/',
      name: 'greeting',
      component: GreetingPage,
    });
  }
}