import vars from "./vars.js";
const { tabsBtn, contents } = vars;

showTabs();

function showTabs() {
  for (let tabContent of contents) {
    tabContent.classList.remove("isActive");
  }

  const tabIdFromLS = localStorage.getItem("activeTab") || "1";
  const tabContent = document.querySelector(`[data-content="${tabIdFromLS}"]`);
  tabContent.classList.add("isActive");
  for (let btn of tabsBtn) {
    btn.classList.remove("isActive");
  }
  const btn = document.querySelector(`[data-tab="${tabIdFromLS}"]`);
  console.log(btn);
  btn.classList.add("isActive");
}

export function onChangeTabsHandler(e) {
  if (e.target.classList.contains("header__item")) {
    for (let btn of tabsBtn) {
      btn.classList.remove("isActive");
    }
    const tabId = e.target.dataset.tab;
    e.target.classList.add("isActive");
    localStorage.setItem("activeTab", tabId);
    showTabs();
  }
}
