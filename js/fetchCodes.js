import state from "./state.js";
import vars from "./vars.js";
const { success, error, errorMessage } = vars;

export async function fetchCodes() {
  try {
    const response = await fetch(`${state.url}/codes`);
    const data = await response.json();
    if (data.result === success) {
      state.codes = data.supported_codes;
    } else if (data.result === error) {
      console.log(error);
    }
  } catch (err) {
    errorMessage.innerHTML = "<p>Something went wrong...</p>";
  }
}
