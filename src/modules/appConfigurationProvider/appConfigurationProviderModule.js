export default class {
  name = 'app-configuration-provider';
  #p_log = null;

  set log(_log) {
    this.#p_log = _log;
  }

  async installAsync(_app) {
    _app.interfaces.configuration = {
      modules: []
    };
  }
}