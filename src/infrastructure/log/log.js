import StopWatch from "../toolkit/stopwatch";

let sw = new StopWatch();

const handler = {
  get: function (target, name) {
    return name in target ? target[name] : target.sub(name);
  }
};

const userOSUsesDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const darkColorifyAccentRegexp = /\*\*(.*?)\*\*/gm;
const darkColorifyAccentTarget = "'\x1b[36m$1\x1b[37m'";
const darkColorifySucceedRegexp = /!!(.*?)!!/gm;
const darkColorifySucceedTarget = '\x1b[32m$1\x1b[37m';

const lightColorifyAccentRegexp = /\*\*(.*?)\*\*/gm;
const lightColorifyAccentTarget = "'\x1b[34m$1\x1b[30m'";
const lightColorifySucceedRegexp = /!!(.*?)!!/gm;
const lightColorifySucceedTarget = '\x1b[32m$1\x1b[37m';

export default class Log {
  static New(_scope) {
    const root = new Log(_scope);
    return new Proxy(root, handler);
  }

  constructor(_scope) {
    this.p_scope = _scope ?? null;
  }

  sub(_scope) {
    let res = this.p_scope === null ? new Log(_scope) : new Log(`${this.p_scope}/${_scope}`);
    return new Proxy(res, handler);
  }

  elapsed() {
    let totalSeconds = sw.elapsed() / 1000;
    let minutes = Math.floor(totalSeconds / 60);
    let sec = totalSeconds - minutes * 60;
    if (minutes > 0)
      return `${minutes}:${sec.toFixed(2)}`;

    return `${sec.toFixed(2)}`;
  }

  colorify(_msg){
    let msg;
    if(userOSUsesDarkScheme)
    {
      msg = _msg.replace(darkColorifyAccentRegexp, darkColorifyAccentTarget);
      msg = msg.replace(darkColorifySucceedRegexp, darkColorifySucceedTarget);
    }
    else {
      msg = _msg.replace(lightColorifyAccentRegexp, lightColorifyAccentTarget);
      msg = msg.replace(lightColorifySucceedRegexp, lightColorifySucceedTarget);
    }
    return msg;
  }
  groupCollapsed(_desc){
    console.groupCollapsed (`${this.elapsed()} | ${this.p_scope} | ${this.colorify(_desc)}`);
    return ()=>console.groupEnd();
  }
  group(_desc){
    console.group (`${this.elapsed()} | ${this.p_scope} | ${this.colorify(_desc)}`);
    return ()=>console.groupEnd();
  }
  i(_msg) {
    if(userOSUsesDarkScheme)
      console.info(`${this.elapsed()} | \x1b[33m${this.p_scope}\x1b[37m | ${this.colorify(_msg)}`);
    else
      console.info(`${this.elapsed()} | \x1b[103m${this.p_scope}\x1b[30m | ${this.colorify(_msg)}`);
  }

  e(_msg) {
    if(userOSUsesDarkScheme)
      console.error(`${this.elapsed()} | \x1b[33m$${this.p_scope}\x1b[37m | ${this.colorify(_msg)}`);
    else
      console.error(`${this.elapsed()} | \x1b[103m${this.p_scope}\x1b[30m | ${this.colorify(_msg)}`);
  }

  w(_msg) {
    if(userOSUsesDarkScheme)
      console.warn(`${this.elapsed()} | \x1b[33m${this.p_scope}\x1b[37m | ${this.colorify(_msg)}`);
    else
      console.warn(`${this.elapsed()} | \x1b[103m${this.p_scope}\x1b[30m | ${this.colorify(_msg)}`);
  }
}