// lightweight partial EventEmitter, since the full node EventEmitter isn't present in wechat

export default class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  addListener(name, callback) {
    if (!this._listeners[name]) this._listeners[name] = [];
    this._listeners[name].push(callback);
  }

  trigger(name, evt) {
    if (this._listeners[name]) {
      this._listeners[name].forEach(listener => listener(evt));
    }
  }

  removeAllListeners() {
    this._listeners = {};
  }
}
