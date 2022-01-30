export default class  {
  name='main-menu';
  #p_log = null;
  #p_app = null;
  #p_items = [];

  set log(_log) {
    this.#p_log = _log;
  }

  install(_app) {
    const self = this;
    this.#p_app = _app;

    _app.interfaces.mainMenu = {
      add(_menuItem) {
        const store = _app.interfaces.store;
        if (store == null) {
          self.addItemInternal(self.#p_items, _menuItem);
          return;
        }
        store.commit('mainMenuAdd', _menuItem);
      },
      remove(_id) {
        const store = _app.interfaces.store;
        if (store == null) {
          self.removeItemInternal(self.#p_items);
          return;
        }
        store.commit('mainMenuRemove', _id);
      }
    };
  }

  store(_store) {
    const self = this;
    const items = this.#p_items;
    const log = this.#p_log;

    _store.state.mainMenu = items;
    log.i(`initing store with **${items.length}** elements in menu...`);

    _store.mutations.mainMenuAdd = (_state, _menuItem) => {
      self.addItemInternal(_state.mainMenu, _menuItem);
    };
    _store.mutations.mainMenuRemove = (_state, _menuId) => {
      self.removeItemInternal(_state.mainMenu, _menuId);
    };
    log.i(`store !!inited!!`);
  }

  addItemInternal(_items, _menuItem) {
    const log = this.#p_log;
    log.i(`registering menu item **${_menuItem.id}**...`);
    _items.push(_menuItem);
    this.sortItemsInternal(_items);
    log.i(`menu item **${_menuItem.id}** !!registered!!`);
  }

  removeItemInternal(_items, _id) {
    const log = this.#p_log;
    log.i(`unregistering menu item **${_id}**...`);
    const index = _items.findIndex(_z => _z.id === _id);
    if (index < 0) {
      log.w(`element [${_id}] not found`);
      return;
    }
    _items.splice(index, 1);
    log.i(`menu item **${_id}** !!unregistered!!`);
  }

  sortItemsInternal(_items) {
    _items.sort((_x, _y) => {
      const x = _x.z ?? 'zzzzz';
      const y = _y.z ?? 'zzzzz';
      if (x > y) return 1;
      if (x < y) return -1;
      return 0;
    });
  }
}