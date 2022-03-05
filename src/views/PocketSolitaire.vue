<script setup>
import { ref, watchEffect, reactive } from "vue";
import PocketSolitaireGame from "../assets/js/games/pocket-solitaire";
import GameBoard from "../components/games/pocket-solitaire/gameboard.vue";
import ModalWindow from "../components/general/modalwindow.vue";

// initialise reactive values
const pegs = ref([]);
const options = reactive({ draggingEnabled: false });
const showModal = ref(false);
const gameOver = ref(false);
// wrapper of protection for passing into object methods
const myRefs = { pegs };

// initialise game
const game = new PocketSolitaireGame(myRefs.pegs, options);

const playAgain = () => {
  closeWindow();
  game.reset(myRefs.pegs);
};

const closeWindow = () => {
  showModal.value = false;
};

watchEffect(() => {
  // check gameover state
  gameOver.value = game.checkGameOver(myRefs.pegs);
  if (gameOver.value === true) {
    setTimeout(() => {
      showModal.value = true;
    }, 350);
  }
});

// TODO: USE ARRAY TO TRACK GAME STATE, ADD UNDO BUTTON (ARRAY.POP)
</script>
<template>
  <ModalWindow
    :show="showModal"
    title="Game Over"
    message="Would you like to play again?"
    primaryText="Play Again"
    @primary="playAgain()"
    @secondary="closeWindow()"
  />
  <section>
    <div><h1 align="center">Pocket Solitaire</h1></div>
  </section>
  <GameBoard :game="game" :myRefs="myRefs" :options="options" />
  <section id="game-buttons">
    <button @click="game.reset(myRefs.pegs)">Reset</button>
    <button @click="game.toggleDragging(options)">
      {{ options.draggingEnabled ? "Pause" : "Play" }}
    </button>
  </section>
</template>
<style scoped>
@import "../assets/app.css";

section#game-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  max-width: 350px;
  margin: 40px auto 0 auto;
}
</style>