<script setup>
import { onMounted, ref } from "vue";
const id = ref(0);
const pegs = ref([]);
const holes = ref([]);

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

// filter pegs to just the one to render
const getPeg = (holeId) => {
  return pegs.value.filter((peg) => {
    return peg.position === holeId;
  });
};

onMounted(() => {
  generateBoard();
});

const startDrag = (event, peg) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("pegID", peg.id);
  // event.dataTransfer.setData("pegPOS", peg.position);
};

const onDrop = (event, newHole) => {
  const pegID = event.dataTransfer.getData("pegID");
  const peg = pegs.value.find((peg) => peg.id == pegID);

  // get the old hole for old coord reference
  let oldHole = holes.value.find((hole) => hole.id === peg.position);

  // check there's no pegs in that hole already
  let existingPeg = pegs.value.find((altPeg) => altPeg.position == newHole.id);

  // check conditions for moving a peg

  // TODO: ONLY ALLOW MOVEMENT IF JUMPING OVER A PEG
  if (
    (((oldHole.x + 2 == newHole.x || oldHole.x - 2 == newHole.x) &&
      oldHole.y == newHole.y) ||
      ((oldHole.y + 2 == newHole.y || oldHole.y - 2 == newHole.y) &&
        oldHole.x == newHole.x)) &&
    !existingPeg
  ) {
    // update peg position, move to new hole
    peg.position = newHole.id;


    // REMOVE PEG
    // average finds peg between jump, relies on the peg movement rules working
    let holeRef = {x: (oldHole.x + newHole.x) / 2, y: (oldHole.y + newHole.y) / 2}
    // get hole of peg based on coords
    let holeToRemove = holes.value.find((hole) => {
      return hole.x === holeRef.x && hole.y === holeRef.y 
    });
    // get peg based on hole id
    let pegToRemove = pegs.value.find((peg)=>peg.position == holeToRemove.id)
    // remove peg by filtering on id
    pegs.value = pegs.value.filter((peg)=>{
      return peg.id != pegToRemove.id;
    })

  }
};

// TODO: ADD WATCHER, IF THERE ARE NO POSSIBLE MOVES LEFT, DECLARE GAME OVER

// TODO: add modal with score and streaks and stuff (wordle style)

// when dropped, set the item coordinates to the location of that div
</script>
<template>
  <button @click="reset()">Reset</button>
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
      <!-- {{ hole.x }},{{ hole.y }} -->
      <div
        v-for="peg in getPeg(hole.id)"
        :key="peg.id"
        class="pin"
        draggable="true"
        @dragstart="startDrag($event, peg)"
      ></div>
    </div>
  </section>
</template>
<style scoped>
section#peg-grid {
  display: grid;
  grid-template-columns: repeat(7, 60px);
  justify-items: center;
  grid-gap: 25px;
  font-size: 0.8rem;
}
.hole {
  height: 60px;
  width: 60px;
  background: var(--color-background-mute);
  border-radius: 50%;
  padding: 7px;
}
.pin {
  height: 100%;
  width: 100%;
  background: rgb(139, 139, 0);
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
</style>