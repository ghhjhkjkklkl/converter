import state from "./state.js";
import vars from "./vars.js";
import { getFullName, formatCurrency, formatDate } from "./utils.js";
import { createCardTemplate } from "./createTemplate.js";

const {
  success,
  error,
  tabsBtn,
  contents,
  resultFrom,
  resultTo,
  exchangeRates,
  lastUpdateDate,
  selectFrom,
  selectTo,
} = vars;

export function onInputHandler({ target: { name, value } }) {
  state[name] = +value;
}

export function onChangeHandler({ target: { name, value } }) {
  state.pair[name] = value;
  console.log(state.pair);
}
export function onSwitchHandler() {
  const {
    pair: { from, to },
  } = state;

  if (!from || !to) {
    return;
  }

  state.pair = {
    from: to,
    to: from,
  };

  selectFrom.value = to;
  selectTo.value = from;
}

export async function onSubmitHandler(e) {
  e.preventDefault();
  console.log("x");
  const {
    url,
    amount,
    pair: { from, to },
  } = state;

  console.log(state);

  if (!amount || !from || !to) {
    alert("Enter all data");
    return;
  } else if (amount <= 0) {
    alert("Err");
    return;
  }

  try {
    const response = await fetch(`${url}/pair/${from}/${to}/${amount}`);
    const data = await response.json();
    console.log(data);
    if (data.result === success) {
      renderResult(data);
    } else if (data.result === error) {
      alert("Something went wrong...");
    }
  } catch (error) {
    console.log(error);
  }
}

export function onChangeTabsHandler(e) {
  if (e.target.classList.contains("header__item")) {
    for (let btn of tabsBtn) {
      btn.classList.remove("isActive");
    }
    for (let tabContent of contents) {
      tabContent.classList.remove("isActive");
    }
    const tabId = e.target.dataset.tab;
    localStorage.setItem("activeTab", tabId);
    const tabContent = document.querySelector(`[data-content="${tabId}"]`);
    tabContent.classList.add("isActive");
  }
}

for (let tabContent of contents) {
  tabContent.classList.remove("isActive");
}
const tabIdFromLS = localStorage.getItem("activeTab") || "1";
const tabContent = document.querySelector(`[data-content="${tabIdFromLS}"]`);
tabContent.classList.add("isActive");

function renderResult({
  base_code: baseCode,
  conversion_rate: rate,
  conversion_result: result,
  target_code: targetCode,
  time_last_update_utc: updateTime,
}) {
  const from = {
    code: baseCode,
    amount: state.amount,
    name: getFullName(state.codes, baseCode),
  };

  const to = {
    code: targetCode,
    amount: result,
    name: getFullName(state.codes, targetCode),
  };

  const baseValue = formatCurrency(baseCode, 1);
  const targetValue = formatCurrency(targetCode, rate);

  resultFrom.innerHTML = createCardTemplate(from);
  resultTo.innerHTML = createCardTemplate(to);
  exchangeRates.innerHTML = `${baseValue} = ${targetValue}`;
  lastUpdateDate.innerHTML = `Last update ${formatDate(updateTime)}`;
}
