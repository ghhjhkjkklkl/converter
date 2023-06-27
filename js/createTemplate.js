import { getFullName } from "./utils.js";
import state from "./state.js";

export function createCardTemplate({ code, amount, name }) {
  return `
  <div>
  <p>${code}</p>
  <p>${name}</p>
  <p>${amount}</p>
  </div>
  `;
}

export function createLatestTemplate(code, rate, action) {
  const name = getFullName(state.codes, code);
  return `
  <div class="single__group">
    <p>${code}</p>
    <p>${name}</p>
    <p>${rate}</p>
    <button class="btn">${action}</button>
  </div>
  `;
}
