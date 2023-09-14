import state from "./state.js";
import vars from "./vars.js";
import { createLatestTemplate } from "./createTemplate.js";

const {
  success,
  error,
  errorMessageSingle,
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
      renderLatest();
    } else {
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

  console.log("Hello");

  currencies = currencies || baseCurrencies;

  /* const code = localStorage.getItem("startCode") || baseCode; */

  singleCurrency.innerHTML = createLatestTemplate(
    baseCode,
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

function onChangeLatestItem({ target }) {
  if (target.classList.contains("btn")) {
    singleSelect.classList.add("active");
  }
}

function onChangeSingleSelect({ target: { value }, target }) {
  singleSelect.classList.remove("active");

  //state.currencyRate.startCode = value;
  state.currencyRate = { ...state.currencyRate, startCode: value };

  fetchLatest();
  target.value = "";
  saveToLS();
}

function onDeleteLatestItem({ target }) {
  if (target.classList.contains("btn")) {
    const latestItem = target.closest(".single__group");
    latestItem.remove();
    const itemCode = latestItem.querySelector(".single__group-code").innerText;
    removeCurrencyFromLS(itemCode);
  }
}

function onClickSingleBtnAdd() {
  singleSelectAdd.classList.add("active");
}

function onChangeSingleSelectAdd({ target: { value } }) {
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

  renderLatestItem(value, newRate, "Delete");
  state.baseCurrencies.push(value);
  saveToLS();
}

function saveToLS() {
  localStorage.setItem("baseCurrencies", JSON.stringify(state.baseCurrencies));
  localStorage.setItem("startCode", state.currencyRate.startCode);
}

function removeCurrencyFromLS(code) {
  const index = state.baseCurrencies.indexOf(code);
  if (index !== -1) {
    state.baseCurrencies.splice(index, 1);
    saveToLS();
  }
}

function loadFromLS() {
  const startCode = localStorage.getItem("startCode");
  const baseCurrenciesJSON = localStorage.getItem("baseCurrencies");

  if (startCode) {
    state.currencyRate.startCode = startCode;
  }

  if (baseCurrenciesJSON) {
    state.baseCurrencies = JSON.parse(baseCurrenciesJSON);
  }
  console.log(renderLatest(state.baseCurrencies));
}

export {
  loadFromLS,
  onChangeSingleSelectAdd,
  onClickSingleBtnAdd,
  onDeleteLatestItem,
  onChangeSingleSelect,
  onChangeLatestItem,
};
