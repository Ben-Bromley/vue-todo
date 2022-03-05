<script setup>
import { ref, onMounted } from "vue";
import db from "../assets/js/utilities/todo/db";
import IconDocumentationVue from "../components/icons/IconDocumentation.vue";
import ToDoApp from "../assets/js/utilities/todo/";
import TodoItem from "../components/utilities/todo/todo.vue";

const todoApp = new ToDoApp();

const todos = ref([]);
const thisTodo = ref(null);
const myRefs = { thisTodo, todos };

onMounted(async () => {
  todoApp.retrieveTasks(myRefs.todos);
});
</script>
<template>
  <section>
    <h1><IconDocumentationVue /> My To-do's</h1>
    <p class="small-text" v-if="!todos.length">
      (Type in the text box below, and press enter to add the task)
    </p>
    <input
      v-model="thisTodo"
      @keyup.enter="todoApp.addTask(myRefs.thisTodo, myRefs.todos)"
      type="text"
      id="task-input"
      placeholder="I have to..."
    />
    <ul>
      <TodoItem
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @complete-task="todoApp.completeTask(todo)"
        @remove-task="todoApp.removeTask(todo, myRefs.todos)"
      />
    </ul>
  </section>
</template>
<style scoped>
@import url("../assets/app.css");

p.small-text {
  font-size: 0.7rem;
  margin-bottom: 10px;
}

input {
  width: 100%;
  display: flex;
  align-items: center;
}

input {
  font-size: calc(2vmax + 0.4rem);
}

input[type="text"]#task-input {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  background: var(--color-background-mute);
  color: var(--color-text);
  border: none;
  min-width: 250px;
}

ul {
  padding-left: 0;
}
</style>