export default class {
  #p_cached;
  #p_isCycled;

  constructor(){
    this.#p_cached = [];
    this.#p_isCycled = false;
  }

  invalidate(){
    this.#p_cached = [];
    this.#p_isCycled = false;
  }

  get isCycled() {
    return this.#p_isCycled;
  }

  updateHistory(_matrix){
    const cached = this.#p_cached;

    const serialized = JSON.stringify(_matrix);

    for(let i = cached.length; i > 0; i --) {
      if(cached[i] === serialized) {
        this.#p_isCycled = true;
      }
    }

    cached.push(serialized);
    
    if(cached.length > 5)
      cached.shift();
  }
}