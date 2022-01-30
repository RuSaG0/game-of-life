<template>
  <h2 class="m-h2">Info</h2>

  <h3 class="m-h3">What is it?</h3>
  <p class="m-p">
    The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game, m
    eaning that its evolution is determined by its initial state, requiring no further input. 
    One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is 
    Turing complete and can simulate a universal constructor or any other Turing machine.
  </p>

  <h3 class="m-h3">Rules</h3>
  <p class="m-p">
    The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two 
    possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts 
    with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
  </p>
  <ul>
    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
  </ul>

  <p class="m-p">These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</p>

  <ul>
    <li>Any live cell with two or three live neighbours survives.</li>
    <li>Any dead cell with three live neighbours becomes a live cell.</li>
    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
  </ul>
    
  <p class="m-p">  The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; 
    births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.[nb 1] \Each generation is a pure function of the preceding one.
    The rules continue to be applied repeatedly to create further generations.</p>
      
</template>

<script>
export default {
  name:"InfoPage"
}
</script>

<style lang="scss" scoped>
ul {
  color:var(--text80);;
  margin:15px 30px;
}
ul.li {
  list-style-type: circle;

}
</style>