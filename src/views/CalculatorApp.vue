<script setup>
import IconEcosystemVue from "../components/icons/IconEcosystem.vue";
import { ref, computed } from "vue";

// Array(2), numbers to be displayed
const calcVal = ref(["", ""]);
// current mathematical operation, to be represented as a HTML entity
const curOp = ref(null);

// list of button labels
const buttons = ref([
  1, 2, 3, "&divide;",
  4,5, 6, "&times;",
  7, 8, 9, "&minus;",
  0, ".", "&equals;", "&plus;",
]);

// return first number or all values depending on if an operation has been set
const displayVal = computed(() => {
  return curOp.value === null
    ? calcVal.value[0]
    : calcVal.value[0] + ` ${curOp.value} ` + calcVal.value[1];
});


  // determine action based on button text value
const handleClick = (buttonValue) => {

    if (typeof buttonValue === "number") {
    // if value is number, append it.
    //  append to 1st or 2nd value depending on if an operation has been chosen
    calcVal.value[curOp.value === null ? 0 : 1] += String(buttonValue);
  } else if (buttonValue === "&equals;") {

    // only run if both operands are set
    if (!calcVal.value[1]){
      return;
    }

    // if the button pressed is equals, get the answer
    let answer = equals();

    // set answer to show if not null
    // this means the answer can be used in a future operation
    if (answer) {
      calcVal.value = [answer, ""];
      curOp.value = null;
    } else {
    // prevents issues cause by not selecting an operation before clicking equals
      clear();
    }

  } else if (buttonValue === ".") {

    // if there's no number before this, append a 0 first
    let checkVal = String(calcVal.value[curOp.value === null ? 0 : 1])
    if (!checkVal.charAt(checkVal.length -1)){
        calcVal.value[curOp.value === null ? 0 : 1] += "0"
    }
    // append decimal point normally
    calcVal.value[curOp.value === null ? 0 : 1] += "."

  } else {
    //   change operator
    //   only update operator if second number is unset
    if (calcVal.value[1] === "") {
      curOp.value = buttonValue;
    }
  }
};

const equals = () => {
  // convert values to integers
  let no1 = parseFloat(calcVal.value[0]);
  let no2 = parseFloat(calcVal.value[1]);
  switch (curOp.value) {
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
  calcVal.value = ["", ""];
  curOp.value = null;
};
</script>
<template>
  <section>
    <h1>
      <IconEcosystemVue />
      Calculator
    </h1>
    <div>
      <p id="calculator-value" v-html="displayVal"></p>
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