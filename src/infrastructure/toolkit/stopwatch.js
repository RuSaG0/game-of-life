export default class Stopwatch {
  constructor() {
    this.begin = Date.now();
  }

  elapsed() {
    return Date.now() - this.begin;
  }

  reset() {
    this.begin = Date.now();
  }

  static start() {
    return new Stopwatch();
  }
}