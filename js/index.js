import { fetchCodes } from "./fetchCodes.js";
import { renderCodes } from "./renderCodes.js";
init();

async function init() {
  await fetchCodes();
  renderCodes();
}
