import vars from "./vars.js";
import {
  onInputHandler,
  onChangeHandler,
  onSubmitHandler,
  onSwitchHandler,
} from "./convert.js";

import {
  onChangeLatestItem,
  onChangeSingleSelect,
  onDeleteLatestItem,
  onClickSingleBtnAdd,
  onChangeSingleSelectAdd,
} from "./single.js";

import { onChangeTabsHandler } from "./tabs.js";

const {
  tabs,
  inputAmount,
  selectsPair,
  form,
  switchCurrenciesBtn,
  singleCurrency,
  singleSelect,
  singleCurrencyList,
  singleSelectAdd,
  singleBtnAdd,
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
singleBtnAdd.addEventListener("click", onClickSingleBtnAdd);
singleSelectAdd.addEventListener("change", onChangeSingleSelectAdd);
