<script setup>
const props = defineProps(["todo"]);
</script>
<template>
  <li class="todo-item">
    <button @click="$emit('complete-task')">✅</button>
    <span :class="{ complete: props.todo.done }">{{ props.todo.text }}</span>
    <button @click="$emit('remove-task')" style="margin-left: auto">❌</button>
  </li>
</template>
<style scoped>
@import url("@/assets/app.css");

li.todo-item {
  list-style: none;
  width: 100%;
  display: flex;
  align-items: center;
}

button,
li {
  font-size: calc(2vmax + 0.4rem);
}

button {
  background: none;
  border: none;
  padding: 5px 20px;
}

.complete {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>