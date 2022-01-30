export default class {
  cached;

  constructor(){
    this.cached = [];
  }

  isCycled(_array){
    const serialized = JSON.stringify(_array);
    
    // С конца = Вероятность того, что похожая популяция была 1-2 шага назад больше, чем 4-5 шагов назад.
    // P.S. за 0.2с (самый быстрый режим) по Бойеру-Муру мы должны точно то сравнить 5 строк.
    for(let i = this.cached.length; i > 0; i --) {
      if(this.cached[i] === serialized) {
        return true
      }
    }

    this.cached.push(serialized);
    
    if(this.cached.length > 5)
      this.cached.shift();
    
    return false;
  }
}