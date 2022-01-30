import Log from "../log/log";

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { createStore } from 'vuex';

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

class InterfacesImpl {
  register(_property, _factory) {
    let val;
    Object.defineProperty(this, _property, {
      enumerable: false,
      configurable: false,
      get: () => {
        if (!val)
          val = _factory();
        return val;
      }
    });
  }
}

export default class Application {
  #p_modules = [];
  #p_log = Log.New("app");
  #p_appView = null;
  #p_mountDOMNodeId = null;
  #p_router = null;
  #p_store = null;
  #p_vueApp = null;
  #p_unnamedModuleIndex = 1;
  interfaces = new InterfacesImpl();
  libs = {};


  get vueApp() {
    return this.#p_vueApp;
  }

  get modules() {
    return this.#p_modules;
  }

  set appView(_applicationView) {
    this.#p_appView = _applicationView;
  }

  set mountNode(_mountDOMNodeId) {
    this.#p_mountDOMNodeId = _mountDOMNodeId;
  }

  get router() {
    return this.#p_router;
  }

  get store() {
    return this.#p_store;
  }

  get log() {
    return this.#p_log;
  }

  use(_appModule) {
    const log = this.#p_log;
    if (_appModule.name == null) {
      _appModule.name = `unnamed-${this.#p_unnamedModuleIndex}`;
      this.#p_unnamedModuleIndex++;
    }

    log.i(`use **${_appModule.name}**`);
    let logSetter = getOwnPropertyDescriptor(_appModule, 'log')?.set;
    if (logSetter == null && _appModule.__proto__ != null)
      logSetter = getOwnPropertyDescriptor(_appModule.__proto__, 'log')?.set;

    if (logSetter && typeof _appModule.name == 'string' && _appModule.name.length > 0) {
      const moduleLog = this.#p_log[_appModule.name];
      logSetter.call(_appModule, moduleLog);
    }

    this.#p_modules.push(_appModule);

    return this;
  }

  async runAsync() {
    const self = this;
    const log = this.#p_log;
    const modules = this.#p_modules;

    // **************************
    // initializing
    // **************************
    this.interfaces.log = log;

    // **************************
    // install async
    // **************************
    const logUngroup = log.groupCollapsed('run');
    const installUngroup = log.groupCollapsed('install');
    let moduleIndex = 0;
    while (moduleIndex < modules.length) {
      for (; moduleIndex < modules.length; moduleIndex++) {
        const module = modules[moduleIndex];
        if (module.install != null) {
          log.i(`installing **${module.name}** module`);
          try {
            module.install(self);
            log.i(`**${module.name}** !!installed!!`);
          } catch (e) {
            log.e(`**${module.name}** installation failed, ${e}`);
          }
        }
        if (module.installAsync != null) {
          log.i(`**${module.name}** installing async...`);
          try {
            await module.installAsync(self);
            log.i(`**${module.name}** async !!installed!!`);
          } catch (e) {
            log.e(`**${module.name}** async installation failed, ${e}`);
          }
        }
      }
    }
    installUngroup();

    // **************************
    // configure
    // **************************
    const configureUngroup = log.groupCollapsed('configure');
    this.#p_modules.forEach(_m => {
      if (_m.configure == null) return;
      log.i(`configure ${_m.name}...`);
      try {
        _m.configure(self);
        log.i(`**${_m.name}** !!configured!!`);
      } catch (e) {
        log.e(`**${_m.name}** configuring failed, ${e}`);
      }
    });
    

    for (let i = 0; i < this.#p_modules.length; i++) {
      const module = this.#p_modules[i];

      if (module.configureAsync == null)
        continue;
      log.i(`configure **${module.name}**...`);
      try {
        await module.configureAsync(this);
        log.i(`**${module.name}** async !!configured!!`);
      } catch (e) {
        log.e(`**${module.name}** async configuration failed, ${e}`);
      }
    }
    configureUngroup();

    // **************************
    // wire
    // **************************
    const wireUngroup = log.groupCollapsed('wire');
    this.#p_modules.forEach(_m => {
      if (_m.wire == null) return;
      log.i(`wiring **${_m.name}** ...`);
      try {
        _m.wire();
        log.i(`**${_m.name}** !!wired!!`);
      } catch (e) {
        log.e(`**${_m.name}** wiring failed, ${e}`);
      }
    });
    wireUngroup();

    // **************************
    // post wire
    // **************************
    const postWireUngroup = log.groupCollapsed('post wire');
    this.#p_modules.forEach(_m => {
      if (_m.postWire == null) return;
      log.i(`post wiring **${_m.name}**...`);
      try {
        _m.postWire();
        log.i(`**${_m.name}** post !!wired!!`);
      } catch (e) {
        log.e(`**${_m.name}** post wiring failed, ${e}`);
      }
    });
    postWireUngroup();

    // **************************
    // creating Vue
    // **************************
    const vueUngroup = log.groupCollapsed('vue');
    if (this.#p_appView == null) {
      log.e(`application can't start, because app view is not defined`);
      return;
    }
    const vueApp = createApp(this.#p_appView);
    this.interfaces.vueApp = vueApp;
    this.#p_vueApp = vueApp;

    const vueLog = log['vue'];
    vueApp.use({
      install(_vApp) {
        _vApp.config.globalProperties.$app = self;
      }
    });
    vueApp.mixin({
      created() {
        if (this.$options.name != null) {
          this.$log = vueLog[this.$options.name];
        } else {
          this.$log = vueLog;
        }
      },
      beforeUnmount() {
        const ds = this.$ds;
        if(!ds)
          return;
        while(ds.length > 0)
          ds.pop()();
      }
    });

    // **************************
    // init routes
    // **************************
    const vueRoutesUngroup = log.groupCollapsed('vue routes');
    const routes = [];
    this.#p_modules.forEach(_m => {
      if (_m.routes == null)
        return;
      log.i(`**${_m.name}** configure vue routes ...`);
      try {
        _m.routes(routes);
        log.i(`**${_m.name}** vue routes !!configured!!`);
      } catch (e) {
        log.e(`**${_m.name}** configuring vue routes failed, ${e}`);
      }
    });

    const router = createRouter({
      history: createWebHashHistory(),
      routes
    });
    this.interfaces.router = router;
    this.#p_router = router;
    vueApp.use(router);
    vueRoutesUngroup();

    // **************************
    // init store
    // **************************
    const vueStoreUngroup = log.groupCollapsed('vue store');
    const storeConfiguration = {
      state: {
      },
      mutations: {
      },
      getters: {
      },
      actions: {
      }
    };
    this.#p_modules.forEach(_m => {
      if (_m.store == null)
        return;
      log.i(`**${_m.name}** configure vue store...`);
      try {
        _m.store(storeConfiguration);
        log.i(`**${_m.name}** vue store !!configured!!`);
      } catch (e) {
        log.e(`**${_m.name}** configuring vue store failed, ${e}`);
      }
    });
    const store = new createStore(storeConfiguration);
    this.interfaces.store = store;
    this.#p_store = store;
    vueApp.use(store);
    vueStoreUngroup();

    // **************************
    // configuring vue app
    // **************************
    const vueConfigureUngroup = log.groupCollapsed('configure vue');
    this.#p_modules.forEach(_m => {
      if (_m.vue == null)
        return;
      log.i(`**${_m.name}** configure vue ...`);
      try {
        _m.vue(vueApp);

        log.i(`**${_m.name}** vue !!configured!!`);
      } catch (e) {
        log.e(`**${_m.name}** configuring vue failed, ${e}`);
      }
    });
    vueConfigureUngroup();
    // **************************
    // run
    // **************************
    const runUngroup = log.groupCollapsed('run');
    this.#p_modules.forEach(_m => {
      if (_m.run == null)
        return;
      log.i(`**${_m.name}** running ...`);
      try {
        _m.run();
        log.i(`**${_m.name}** !!ran!!`);
      } catch (e) {
        log.e(`**${_m.name}** running failed, ${e}`);
      }
    });
    runUngroup();

    // **************************
    // mounting
    // **************************
    const mountNode = this.#p_mountDOMNodeId;
    if (typeof mountNode != 'string' || mountNode.length === 0) {
      log.e(`application can't start, because mount node is not defined or empty`);
      return;
    }

    log.i(`mounting to **${mountNode}**...`);
    vueApp.mount(mountNode);
    log.i(`application !!mounted!!`);

    vueUngroup();
    logUngroup();

  }
}