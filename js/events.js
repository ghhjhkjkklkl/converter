import vars from "./vars.js";
import {
  onChangeTabsHandler,
  onInputHandler,
  onChangeHandler,
  onSubmitHandler,
  onSwitchHandler,
} from "./convert.js";

import {
  onChangeLatestItem,
  onChangeSingleSelect,
  onDeleteLatestItem,
} from "./single.js";

const {
  tabs,
  inputAmount,
  selectsPair,
  form,
  switchCurrenciesBtn,
  singleCurrency,
  singleSelect,
  singleCurrencyList,
} = vars;

tabs.addEventListener("click", onChangeTabsHandler);

inputAmount.addEventListener("input", onInputHandler);

selectsPair.forEach((select) =>
  select.addEventListener("change", onChangeHandler)
);

form.addEventListener("submit", onSubmitHandler);

switchCurrenciesBtn.addEventListener("click", onSwitchHandler);
singleCurrency.addEventListener("click", onChangeLatestItem);
singleSelect.addEventListener("change", onChangeSingleSelect);
singleCurrencyList.addEventListener("click", onDeleteLatestItem);
