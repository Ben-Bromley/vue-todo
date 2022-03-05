<script setup>
import { ref, onMounted, } from "vue";
import db from "../assets/js/utilities/todo/db";
import IconDocumentationVue from "../components/icons/IconDocumentation.vue";

let id = 0;

const todos = ref([]);
const thisTodo = ref(null);

const completeTask = async (todo) => {
  todo.done = !todo.done;
  const complete = await db.tasks
    .where("taskId")
    .equals(todo.id)
    .modify({ done: todo.done });
};

const deleteTask = async (todo) => {
  todos.value = todos.value.filter((t) => t.id != todo.id);
  const removeTodo = await db.tasks.where("taskId").equals(todo.id).delete();
};

const addTodo = async () => {
  // add task to array
  if (thisTodo.value) {
    let newTodo = { id: id++, text: thisTodo.value, done: false };
    todos.value.push(newTodo);
    thisTodo.value = "";

    // add task to Dexie
    const saveTodo = await db.tasks.add({
      taskId: newTodo.id,
      text: newTodo.text,
      done: newTodo.done,
    });
  }
};

onMounted(async () => {
  // get stored tasks
  let tasks = await db.tasks.toArray();

  // if there's stored tasks, add them to reactive todos ref
  if (tasks.length) {
    todos.value = [];
    tasks.forEach((task) => {
      todos.value.push({ id: task.taskId, text: task.text, done: task.done });
    });
  } else {
    // if no stored todos, add sample todos and store them
    todos.value = [
      { id: id++, text: "Take out the trash", done: false },
      { id: id++, text: "Do the dishes", done: false },
    ];
    todos.value.forEach(async (todo) => {
      // add task to Dexie
      const saveInitial = await db.tasks.add({
        taskId: todo.id,
        text: todo.text,
        done: todo.done,
      });
    });
  }
});

</script>
<template>
  <section>
    <h1><IconDocumentationVue /> My To-do's</h1>
    <p class="small-text" v-if="!todos.length">
      (Type in the text box below, and press enter to add the task)
    </p>
    <input
      @keyup.enter="addTodo()"
      v-model="thisTodo"
      name="task"
      type="text"
      id="task-input"
      placeholder="I have to..."
    />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <button @click="completeTask(todo)">✅</button>
        <span :class="{ complete: todo.done }">{{ todo.text }}</span>
        <button @click="deleteTask(todo)" style="margin-left: auto">❌</button>
      </li>
    </ul>
  </section>
</template>
<style scoped>
@import url("../assets/app.css");

p.small-text {
  font-size: 0.7rem;
  margin-bottom: 10px;
}

li,
input {
  width: 100%;
  display: flex;
  align-items: center;
}

button,
li,
input {
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