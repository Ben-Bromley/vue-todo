<script setup>
import { ref, watchEffect, reactive } from "vue";
import PocketSolitaireGame from "../assets/js/games/PocketSolitaire";

// initialise reactive values
const pegs = ref([]);
const options = reactive({ draggingEnabled: false });

// wrapper of protection for passing into object methods
const myRefs = { pegs };

// initialise game
const game = new PocketSolitaireGame(myRefs.pegs, options);

watchEffect(() => {
  // check gameover state
  let gameOver = game.checkGameOver(myRefs.pegs);
  if (gameOver === true) {
    // TODO: add modal with score and streaks and stuff (wordle style)
    setTimeout(() => {
      alert("GAME OVER");
    }, 350);
  }
});

// TODO: USE ARRAY TO TRACK GAME STATE, ADD UNDO BUTTON (ARRAY.POP)
</script>
<template>
  <section>
    <div>
      <h1 align="center">Pocket Solitaire</h1>
    </div>
  </section>
  <section id="peg-grid">
    <span id="c1" class="corner" />
    <span id="c2" class="corner" />
    <span id="c3" class="corner" />
    <span id="c4" class="corner" />
    <div
      class="hole"
      v-for="hole in game.holes"
      :key="hole.id"
      @drop="game.onDrop($event, hole, myRefs.pegs)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        v-for="peg in game.filterPegsForBoard(hole.id, myRefs.pegs)"
        :key="peg.id"
        class="pin"
        :draggable="options.draggingEnabled"
        @dragstart="game.startDrag($event, peg, pegs)"
      />
    </div>
  </section>
  <section id="game-buttons">
    <button @click="game.reset(myRefs.pegs)">Reset</button>
    <button @click="game.toggleDragging(options)">
      {{ options.draggingEnabled ? "Pause" : "Play" }}
    </button>
  </section>
</template>
<style scoped>
@import "../assets/app.css";

section#peg-grid {
  display: grid;
  grid-template-columns: repeat(7, var(--peg-size));
  justify-items: center;
  grid-gap: calc(10px + 1vw);
  font-size: 0.8rem;
  margin: 0 auto;
  width: min-content;
}
.hole {
  height: var(--peg-size);
  width: var(--peg-size);
  background: var(--color-background-mute);
  border-radius: 50%;
  padding: calc(3px + 5%);
  user-select: none;
}
.pin {
  user-select: none;
  height: 100%;
  width: 100%;
  background: var(--color-peg);
  border-radius: 50%;
}

.corner {
  /* border: 1px solid white; */
  width: 100%;
  display: block;
}
#c1 {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
}
#c2 {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 6;
  grid-column-end: 8;
}
#c3 {
  grid-row-start: 6;
  grid-row-end: 8;
  grid-column-start: 1;
  grid-column-end: 3;
}
#c4 {
  grid-row-start: 6;
  grid-row-end: 8;
  grid-column-start: 6;
  grid-column-end: 8;
}

section#game-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  max-width: 350px;
  margin: 40px auto 0 auto;
}
</style>