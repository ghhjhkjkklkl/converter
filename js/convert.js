import state from "./state.js";
import vars from "./vars.js";
import { getFullName, formatCurrency, formatDate } from "./utils.js";
import { createCardTemplate } from "./createTemplate.js";

const {
  success,
  error,
  errorMessageConvert,
  resultFrom,
  resultTotal,
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
      errorMessageConvert.innerHTML = "Something went wrong...";
    }
  } catch (error) {
    errorMessageConvert.innerHTML = "Something went wrong...";
  }
}

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
    color: "pink",
  };

  const to = {
    code: targetCode,
    amount: result,
    name: getFullName(state.codes, targetCode),
    color: "lightgreen",
  };

  const baseValue = formatCurrency(baseCode, 1);
  const targetValue = formatCurrency(targetCode, rate);

  resultFrom.innerHTML = createCardTemplate(from);
  resultTotal.innerHTML = "=";
  resultTo.innerHTML = createCardTemplate(to);
  exchangeRates.innerHTML = `${baseValue} = ${targetValue}`;
  lastUpdateDate.innerHTML = `Last update ${formatDate(updateTime)}`;
}
