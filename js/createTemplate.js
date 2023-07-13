import { getFullName } from "./utils.js";
import state from "./state.js";

export function createCardTemplate({ code, amount, name, color }) {
  return `
  <div class="result-item__wrapper">
  <span style="background: ${color}" class="result-item__circle"></span>
  <div>
  <div class="result-item__group">
  <p class="code">${code}</p>
  <p class="name">${name}</p>
  </div>
  <p class="amount">${amount.toFixed(2)}</p>
  </div>
  </div>
  `;
}

export function createLatestTemplate(
  code,
  rate,
  action,
  color,
  border,
  margin
) {
  const name = getFullName(state.codes, code);
  return `
  <div style="background: ${color}; border: ${border}; margin-bottom: ${margin}" class="single__group">
  <div class="single__group-wrapper">
  <p class="code single__group-code">${code}</p>
    <p class="name">${name}</p>
    </div>
    <p class="amount">${rate}</p>
    <button class="btn single__group-btn">${action}</button>
  </div>
  `;
}
