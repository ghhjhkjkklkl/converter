import state from "./state.js";
import vars from "./vars.js";
import { createLatestTemplate } from "./createTemplate.js";

const { success, error, singleCurrency, singleCurrencyList, singleSelect } =
  vars;

async function fetchLatest() {
  const {
    url,
    currencyRate: { startCode },
  } = state;
  try {
    const response = await fetch(`${url}/latest/${startCode}`);
    const data = await response.json();

    if (data.result === success) {
      state.currencyRate = { ...state.currencyRate, ...data };
      console.log(state.currencyRate);
      renderLatest();
    } else if (data.result === error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchLatest();

function renderLatestItem(code, rate) {
  singleCurrencyList.insertAdjacentHTML(
    "afterbegin",
    createLatestTemplate(code, rate, "Delete")
  );
}

function renderLatest() {
  const {
    baseCurrencies,
    currencyRate: { base_code: baseCode, conversion_rates: rates },
  } = state;

  singleCurrency.innerHTML = createLatestTemplate(baseCode, "1.00", "Change");

  Object.entries(rates).forEach(([code, rate]) => {
    if (baseCurrencies.includes(code) && code !== baseCode) {
      renderLatestItem(code, rate.toFixed(2));
    }
  });
}

export function onChangeLatestItem({ target }) {
  if (target.classList.contains("btn")) {
    singleSelect.classList.add("active");
  }
}
