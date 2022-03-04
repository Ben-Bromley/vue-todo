<script setup>
    import Peg from './peg.vue';
    const props = defineProps(['game', 'myRefs', 'options'])
</script>
<template>
    <section id="peg-grid">
    <span id="c1" class="corner" />
    <span id="c2" class="corner" />
    <span id="c3" class="corner" />
    <span id="c4" class="corner" />
    <div
      class="hole"
      v-for="hole in props.game.holes"
      :key="hole.id"
      @drop="props.game.onDrop($event, hole, props.myRefs.pegs)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Peg
        v-for="peg in props.game.filterPegsForBoard(hole.id, props.myRefs.pegs)"
        :key="peg.id"
        class="pin"
        :draggable="props.options.draggingEnabled"
        @dragstart="props.game.startDrag($event, peg, props.myRefs.pegs)"
      />
    </div>
  </section>
</template>
<style scoped>

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