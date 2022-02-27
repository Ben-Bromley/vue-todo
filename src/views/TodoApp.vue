<script setup>
import { ref } from "vue";
import IconDocumentationVue from "../components/icons/IconDocumentation.vue";
let id = 0;

const todos = ref([
  { id: id++, text: "Take out the trash", done: false },
  { id: id++, text: "Do the dishes", done: false },
]);
const newTodo = ref(null);

const completeTask = (todo) => {
  todo.done = !todo.done;
};

const deleteTask = (todo) => {
  todos.value = todos.value.filter((t) => t.id != todo.id);
};

const addTodo = () => {
  if (newTodo.value) {
    todos.value.push({ id: id++, text: newTodo.value, done: false });
    newTodo.value = "";
  }
};
</script>
<template>
  <section>
    <h1><IconDocumentationVue /> My To-do's</h1>
    <input
      @keyup.enter="addTodo()"
      v-model="newTodo"
      name="task"
      type="text"
      id="task-input"
      placeholder="I have to..."
    />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <button @click="completeTask(todo)" >✅</button>
        <span :class="{ complete: todo.done }">{{ todo.text }}</span>
        <button @click="deleteTask(todo)" style="margin-left: auto">❌</button>
      </li>
    </ul>
  </section>
</template>
<style scoped>
@import url('../assets/app.css');

li,
input {
  width: 100%;
  display: flex;
  align-items: center;
}

button, li, input {
  font-size: calc(2vmax + 0.4rem);

}

input[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  background: var(--color-background-mute);
  color: var(--color-text);
  border: none;
  min-width: 250px;
}

button {
  background: none;
  border: none;
  padding: 5px 20px;
}

ul {
  padding-left: 0;
}

li {
  list-style: none;
}

.complete {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>