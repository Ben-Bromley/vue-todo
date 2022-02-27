<script setup>
import IconEcosystemVue from "../components/icons/IconEcosystem.vue";
import { ref } from "vue";

const calculatorValue = ref('');
const currentOperation = ref(null);
const buttons = ref([
  1,
  2,
  3,
  "&divide;",
  4,
  5,
  6,
  "&times;",
  7,
  8,
  9,
  "&minus;",
  0,
  ".",
  "=",
  "&plus;",
]);

const handleClick = (buttonValue) => {

    if (typeof buttonValue === 'number'){
        calculatorValue.value += String(buttonValue);
    };

}

</script>
<template>
  <section>
    <h1>
      <IconEcosystemVue />
      Calculator
    </h1>
    <div>
      <input v-model="calculatorValue" type="text" name="value" id="calculator-value" />
    </div>
    <section id="calculator-grid">
      <button
        class="calculator-button"
        v-for="buttonLabel in buttons"
        :key="buttonLabel"
        v-html="buttonLabel"
        @click="handleClick(buttonLabel)"
      />
    </section>
  </section>
</template>
<style scoped>
input,
button {
  font-size: calc(2vmax + 0.4rem);
}
input#calculator-value {
  width: 100%;
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: 20px;
  border: none;
  border-radius: 5px;
  margin: 30px 0;
}
section#calculator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  grid-gap: 10px;
}
button.calculator-button {
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: 15px;
  border-radius: 5px;
}
</style>