<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="30"
          height="30"
        />
      </RouterLink>
      <div>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <RouterLink to="/todo">To-Do</RouterLink>
        <RouterLink to="/calculator">Calculator</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  margin-bottom: 50px;
}

a {
  color: var(--color-text);
  text-decoration: none;
  margin-right: 20px;
}

a:hover {
  opacity: 0.7;
}
</style>
