import state from "./state.js";
import vars from "./vars.js";

const { selects } = vars;

export function renderCodes() {
  selects.forEach((select) => {
    const options = [];
    state.codes.forEach(([code, name]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${code} | ${name}`;
      options.push(option);
    });
    select.append(...options);
  });
}
