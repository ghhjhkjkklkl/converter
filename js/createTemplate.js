import { getFullName } from "./utils.js";
import state from "./state.js";

export function createCardTemplate({ code, amount, name }) {
  return `
  <div class="result-item__wrapper">
  <span class="result-item__circle"></span>
  <div class="result-item__group">
  <p class="result-item__code">${code}</p>
  <p class="result-item__name">${name}</p>
  </div>
  <p class="result-item__amount">${amount.toFixed(2)}</p>
  </div>
  `;
}

export function createLatestTemplate(code, rate, action) {
  const name = getFullName(state.codes, code);
  return `
  <div class="single__group">
    <p class="single__group-code">${code}</p>
    <p>${name}</p>
    <p>${rate}</p>
    <button class="btn">${action}</button>
  </div>
  `;
}
