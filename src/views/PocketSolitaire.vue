<script setup>
import { ref } from "vue";
const id = ref(0);
// const pegs = ref(Array(32));
const holes = ref(Array(33));

// when dropped, set the item coordinates to the location of that div
</script>
<template>
  <section id="peg-grid">
    <span id="c1" class="corner" />
    <span id="c2" class="corner" />
    <span id="c3" class="corner" />
    <span id="c4" class="corner" />
    <div class="hole" v-for="hole in holes" :key="hole">
      <div class="pin" draggable="true"></div>
    </div>
  </section>
</template>
<style scoped>
section#peg-grid {
  display: grid;
  grid-template-columns: repeat(7, 35px);
  justify-items: center;
  grid-gap: 15px;
}
.hole {
  height: 35px;
  width: 35px;
  background: var(--color-background-mute);
  border-radius: 50%;
  padding: 5px;
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