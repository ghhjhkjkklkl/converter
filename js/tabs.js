import vars from "./vars.js";
const { tabsBtn, contents } = vars;

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
console.log(tabIdFromLS);
const tabContent = document.querySelector(`[data-content="${tabIdFromLS}"]`);
tabContent.classList.add("isActive");
