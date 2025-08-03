const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let timer = null;

function updateDisplay(value) {
  display.textContent = value;
}

function autoCalculate() {
  try {
    if (currentInput === "") return;
    if (currentInput.includes("/0")) {
      updateDisplay("Error: ÷ by 0");
      currentInput = "";
      return;
    }

    const result = eval(currentInput);
    updateDisplay(result);
    currentInput = result.toString();
  } catch {
    updateDisplay("Invalid");
    currentInput = "";
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");

    if (value === "C") {
      currentInput = "";
      updateDisplay("0");
      clearTimeout(timer);
      return;
    }

    const lastChar = currentInput.slice(-1);
    if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(lastChar)) {
      return; // prevent double operator
    }

    currentInput += value;
    updateDisplay(currentInput);

    clearTimeout(timer);
    timer = setTimeout(autoCalculate, 1000); // wait 2 sec
  });
});
