<script setup>
import { ref } from "vue";
const apps = ref([
  {
    title: "Todo App",
    path: "todo",
    description: "Keep track of all your To Do's",
  },
  {
    title: "Calculator App",
    path: "calculator",
    description: "A simple calculator application",
  },
  {
    title: "Pocket Solitaire",
    path: "pocket-solitaire",
    description: "The classic pocket solitaire game",
  },
]);
</script>
<template>
  <main>
    <section class="landing">
      <div>
        <h1>Welcome to Vuetilities</h1>
        <p>
          Vuetilities is a collection of web-based utility apps, designed and
          built by
          <a class="link" href="https://www.github.com/ben-bromley"
            >Ben Bromley</a
          >
        </p>
      </div>
    </section>
    <section class="card-container">
      <a
        :href="'/' + app.path"
        class="card"
        v-for="app in apps"
        :key="app.title"
      >
        <div>
          <h2>{{ app.title }}</h2>
          <p>{{ app.description }}</p>
        </div>
      </a>
    </section>
  </main>
</template>
<style scoped>
section {
  margin-bottom: 40px;
}
.landing {
  text-align: center;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.landing div {
  max-width: 80ch;
}

h1 {
  font-size: clamp(2rem, 5vw, 5rem);
}
.landing p {
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 200;
}

@keyframes load {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.landing {
  animation-name: load;
  animation-duration: 1s;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 10px;
}
.card {
  background: var(--color-background-soft);
  padding: 16px;
  border-radius: 10px;
  user-select: none;
  margin: 0;
}
</style>