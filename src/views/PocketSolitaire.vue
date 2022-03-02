<script setup>
import { onMounted, ref, watch } from "vue";
const id = ref(0);
const pegs = ref([]);
const holes = ref([]);
const isDraggable = ref(true);

const generateBoard = () => {
  // generate pegs
  for (let i = 1; i < 33; i++) {
    pegs.value.push({ id: i });
  }

  // skip center peg
  pegs.value.forEach((peg) => {
    peg.position = peg.id <= 16 ? peg.id : peg.id + 1;
  });

  // add hole IDs
  for (let j = 1; j <= 33; j++) {
    holes.value.push({ id: j });
  }

  // add coords to hole
  holes.value.forEach((hole) => {
    hole.x = (hole.id % 7) + 1;
    if (hole.id < 7 || hole.id > 27) {
      // janky way to set x coords for first 6 holes
      hole.x = hole.id % 3 === 0 ? 5 : (hole.id % 3) + 2;
    }

    hole.y = 1;
    if (hole.id > 3) {
      hole.y++;
    }
    if (hole.id > 6) {
      hole.y++;
    }
    if (hole.id > 13) {
      hole.y++;
    }
    if (hole.id > 20) {
      hole.y++;
    }
    if (hole.id > 27) {
      hole.y++;
    }
    if (hole.id > 30) {
      hole.y++;
    }
    if (hole.id > 33) {
      hole.y++;
    }
  });
};

const reset = () => {
  pegs.value = [];
  holes.value = [];
  generateBoard();
};

const toggleDragging = () => {
  isDraggable.value = !isDraggable.value;
};

// filter pegs to just the one to render
const getPeg = (holeId) => {
  return pegs.value.filter((peg) => {
    return peg.position === holeId;
  });
};

const startDrag = (event, peg) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("pegID", peg.id);
  // event.dataTransfer.setData("pegPOS", peg.position);
};

const onDrop = (event, newHole) => {
  const pegID = event.dataTransfer.getData("pegID");
  const thisPeg = pegs.value.find((peg) => peg.id == pegID);

  // get the old hole for old coord reference
  let oldHole = holes.value.find((hole) => hole.id === thisPeg.position);

  // check there's no pegs in that hole already
  let existingPeg = pegs.value.find((altPeg) => altPeg.position == newHole.id);

  // check conditions for moving a peg

  // TODO: ONLY ALLOW MOVEMENT IF MOVING 2 SPACES
  if (
    (((oldHole.x + 2 == newHole.x || oldHole.x - 2 == newHole.x) &&
      oldHole.y == newHole.y) ||
      ((oldHole.y + 2 == newHole.y || oldHole.y - 2 == newHole.y) &&
        oldHole.x == newHole.x)) &&
    !existingPeg
  ) {
    // average finds peg between jump, relies on the peg movement rules working
    let jumpedHoleCoords = {
      x: (oldHole.x + newHole.x) / 2,
      y: (oldHole.y + newHole.y) / 2,
    };
    // get hole of peg based on coords
    let holeToRemove = holes.value.find((hole) => {
      return hole.x === jumpedHoleCoords.x && hole.y === jumpedHoleCoords.y;
    });

    // get peg based on hole id
    let pegToRemove = pegs.value.find((peg) => peg.position == holeToRemove.id);

    // only move peg, if there is another peg to jump over
    if (pegToRemove) {
      // update peg position, move to new hole
      thisPeg.position = newHole.id;

      // remove peg by filtering on id
      pegs.value = pegs.value.filter((peg) => {
        return peg.id != pegToRemove.id;
      });
    }
  }
};

onMounted(() => {
  generateBoard();
});

const checkNeighbourPegs = (checkPeg) => {
  let adjacentPegCount = 0;
  let hasNeighbourPegs = false;

  // for a given peg, check all of the pegs
  pegs.value.forEach((tempPeg, key) => {
    // get the temp hole for a peg (for comparison)
    let tempHole = holes.value.find((hole) => hole.id === tempPeg.position);
    // get the hole for the peg we're checking
    let checkHole = holes.value.find((hole) => hole.id === checkPeg.position);

    // if there's a peg adjacent to another peg, return true
    if (
      (tempHole.y === checkHole.y - 1 && tempHole.x === checkHole.x) ||
      (tempHole.y === checkHole.y + 1 && tempHole.x === checkHole.x) ||
      (tempHole.x === checkHole.x - 1 && tempHole.y === checkHole.y) ||
      (tempHole.x === checkHole.x + 1 && tempHole.y === checkHole.y)
    ) {
      // console.log(tempPeg.id + ' is adjacent to ' + checkPeg.id)
      adjacentPegCount++;
      hasNeighbourPegs = true;
    }
  });
  return [hasNeighbourPegs, adjacentPegCount];
};

watch(pegs, () => {
  let gameOver = true;

  pegs.value.forEach((checkPeg) => {
    // check if peg has neighbour pegs
    let [hasNeighbourPegs, adjacentPegCount] = checkNeighbourPegs(checkPeg);
    if (hasNeighbourPegs) {
      gameOver = false;
      // console.log(`Peg ${checkPeg.id} has ${adjacentPegCount} adjacent pegs`);
    }
  });
  // console.log("---------- END ----------");

  if (gameOver === true) {
    // end game and display modal
    setTimeout(() => {
      alert("GAME OVER");
    }, 350);
  }
});
// TODO: add modal with score and streaks and stuff (wordle style)

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
      v-for="hole in holes"
      :key="hole.id"
      @drop="onDrop($event, hole)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        v-for="peg in getPeg(hole.id)"
        :key="peg.id"
        class="pin"
        :draggable="isDraggable"
        @dragstart="startDrag($event, peg)"
      />
    </div>
  </section>
  <section id="game-buttons">
    <button @click="reset()">Reset</button>
    <button @click="toggleDragging()">
      {{ isDraggable ? "Pause" : "Play" }}
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