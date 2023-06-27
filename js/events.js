import vars from "./vars.js";
import {
  onChangeTabsHandler,
  onInputHandler,
  onChangeHandler,
  onSubmitHandler,
  onSwitchHandler,
} from "./convert.js";

import { onChangeLatestItem } from "./single.js";

const {
  tabs,
  inputAmount,
  selects,
  form,
  switchCurrenciesBtn,
  singleCurrency,
} = vars;

tabs.addEventListener("click", onChangeTabsHandler);

inputAmount.addEventListener("input", onInputHandler);

selects.forEach((select) => select.addEventListener("change", onChangeHandler));

form.addEventListener("submit", onSubmitHandler);

switchCurrenciesBtn.addEventListener("click", onSwitchHandler);
singleCurrency.addEventListener("click", onChangeLatestItem);
