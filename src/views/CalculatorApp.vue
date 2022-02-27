<script setup>
import IconEcosystemVue from "../components/icons/IconEcosystem.vue";
import { ref, computed } from "vue";

// Array(2), numbers to be displayed
const calculatorValue = ref(["", ""]);
// current mathematical operation, to be represented as a HTML entity
const currentOperation = ref(null);

// list of button labels
const buttons = ref([
  1, 2, 3, "&divide;",
  4,5, 6, "&times;",
  7, 8, 9, "&minus;",
  0, ".", "&equals;", "&plus;",
]);

// return first number or all values depending on if an operation has been set
const displayValue = computed(() => {
  return currentOperation.value === null
    ? calculatorValue.value[0]
    : calculatorValue.value[0] + ` ${currentOperation.value} ` + calculatorValue.value[1];
});


  // determine action based on button text value
const handleClick = (buttonValue) => {

    if (typeof buttonValue === "number") {
    // if value is number, append it.
    //  append to 1st or 2nd value depending on if an operation has been chosen
    calculatorValue.value[currentOperation.value === null ? 0 : 1] += String(buttonValue);
  } else if (buttonValue === "&equals;") {
    // if the button pressed is equals, get the answer
    let answer = equals();

    // set answer if not null
    // this means the answer can be used in a future operation
    if (answer) {
      calculatorValue.value = [answer, ""];
      currentOperation.value = null;
    } else {
    // prevents issues cause by not selecting an operation before clicking equals
      clear();
    }

  } else if (buttonValue === ".") {
    // if there's no number before this, append a 0 first
    if (!calculatorValue.value[currentOperation.value === null ? 0 : 1].at(-1)){
        calculatorValue.value[currentOperation.value === null ? 0 : 1] += String(0)
    }
    // append decimal point normally
    calculatorValue.value[currentOperation.value === null ? 0 : 1] += "."

  } else {
    //   change operator
    //   only update operator if second number is unset
    if (calculatorValue.value[1] === "") {
      currentOperation.value = buttonValue;
    }
  }
};

const equals = () => {
  // convert values to integers
  let no1 = parseFloat(calculatorValue.value[0]);
  let no2 = parseFloat(calculatorValue.value[1]);
  switch (currentOperation.value) {
    case "&divide;":
      return no1 / no2;
      break;
    case "&times;":
      return no1 * no2;
      break;
    case "&minus;":
      return no1 - no2;
      break;
    case "&plus;":
      return no1 + no2;
      break;
    default:
      alert("No Operation Selected");
      return;
  }
};

const clear = () => {
  calculatorValue.value = ["", ""];
  currentOperation.value = null;
};
</script>
<template>
  <section>
    <h1>
      <IconEcosystemVue />
      Calculator
    </h1>
    <div>
      <p id="calculator-value" v-html="displayValue"></p>
    </div>
    <section id="calculator-grid">
      <button
        class="calculator-button"
        v-for="buttonLabel in buttons"
        :key="buttonLabel"
        v-html="buttonLabel"
        @click="handleClick(buttonLabel)"
      />
      <button class="calculator-button" @click="clear()">C</button>
    </section>
  </section>
</template>
<style scoped>
@import url("../assets/app.css");

p#calculator-value,
button {
  font-size: calc(2vmax + 0.4rem);
  user-select: none !important;
}

input:focus,
input:active {
  border: none;
  outline: none;
}
p#calculator-value {
  width: 100%;
  background: var(--color-background-mute);
  color: var(--color-text);
  height: 60px;
  padding: 20px;
  display: flex;
  align-items: center;
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