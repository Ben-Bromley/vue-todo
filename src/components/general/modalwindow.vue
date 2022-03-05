<script setup>
const props = defineProps(["title", "message", "show", "primaryText", "secondaryText"]);
</script>

<template>
  <section v-if="props.show" class="modal-container">
    <div class="modal-inner">
      <div>
        <h1>{{ props.title }}</h1>
      </div>
      <p>{{ props.message }}</p>
      <div class="button-container">
        <button @click="$emit('primary')">{{props.primaryText}}</button>
        <button @click="$emit('secondary')">Close</button>
      </div>
    </div>
  </section>
</template>

<style>
@import "@/assets/app.css";
section.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #3338;
  backdrop-filter: blur(2px);
}
div.modal-inner {
  background: var(--color-background);
  color: var(--color-text);
  padding: 25px;
  width: 80%;
  max-width: 300px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

div.modal-inner p {
  margin-bottom: 15px;
}

div.button-container {
  display: flex;
  justify-content: stretch;
}

button {
  margin: 2px;
  width: 50%;
}
</style>