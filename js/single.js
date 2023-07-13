import state from "./state.js";
import vars from "./vars.js";
import { createLatestTemplate } from "./createTemplate.js";

const {
  success,
  error,
  errorMessageSingle,
  baseCurrenciesFromLS,
  singleCurrency,
  singleCurrencyList,
  singleSelect,
  singleSelectAdd,
} = vars;

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
      if (baseCurrenciesFromLS) {
        renderLatest(baseCurrenciesFromLS);
      } else {
        renderLatest();
      }
    } else if (data.result === error) {
      errorMessageSingle.innerHTML = "<p>Something went wrong...</p>";
    }
  } catch (error) {
    errorMessageSingle.innerHTML = "<p>Something went wrong...</p>";
  }
}

fetchLatest();

function renderLatestItem(code, rate) {
  singleCurrencyList.insertAdjacentHTML(
    "afterbegin",
    createLatestTemplate(
      code,
      rate,
      "Remove",
      "transparent",
      "2px solid pink",
      "10px"
    )
  );
}

function renderLatest(currencies) {
  const {
    baseCurrencies,
    currencyRate: { base_code: baseCode, conversion_rates: rates },
  } = state;

  currencies = currencies || baseCurrencies;

  const code = localStorage.getItem("startCode") || baseCode;

  singleCurrency.innerHTML = createLatestTemplate(
    code,
    "1.00",
    "Change",
    "skyblue",
    "none",
    "20px"
  );

  singleCurrencyList.innerHTML = "";

  Object.entries(rates).forEach(([code, rate]) => {
    if (currencies.includes(code) && code !== baseCode) {
      console.log(currencies);
      renderLatestItem(code, rate.toFixed(2));
    }
  });
}

export function onChangeLatestItem({ target }) {
  if (target.classList.contains("btn")) {
    singleSelect.classList.add("active");
  }
}

export function onChangeSingleSelect({ target: { value } }) {
  singleSelect.classList.remove("active");

  state.currencyRate.startCode = value;

  fetchLatest();
  updateCurrenciesInLS();
  updateStartCodeInLS();
}

export function onDeleteLatestItem({ target }) {
  if (target.classList.contains("btn")) {
    const latestItem = target.closest(".single__group");
    latestItem.remove();
    const itemCode = latestItem.querySelector(".single__group-code").innerText;
    state.baseCurrencies = state.baseCurrencies.filter(
      (code) => code !== itemCode
    );
    updateCurrenciesInLS();
  }
}

export function onClickSingleBtnAdd() {
  singleSelectAdd.classList.add("active");
}

export function onChangeSingleSelectAdd({ target: { value } }) {
  const {
    currencyRate: { conversion_rates: rates },
  } = state;
  let newRate = 1;

  singleSelectAdd.classList.remove("active");

  Object.entries(rates).forEach(([code, rate]) => {
    if (code === value) {
      newRate = rate.toFixed(2);
    }
  });

  state.baseCurrencies.push(value);
  renderLatestItem(value, newRate, "Delete");

  updateCurrenciesInLS();
}

function updateCurrenciesInLS() {
  localStorage.setItem("baseCurrencies", JSON.stringify(state.baseCurrencies));
}

function updateStartCodeInLS() {
  localStorage.setItem("startCode", state.currencyRate.startCode);
}
