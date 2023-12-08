const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button"),
exchangeIcon = document.querySelector("form .icon"),
amountInput = document.querySelector("form input"),
exchangeRateTxt = document.querySelector("form .exchange-rate");

// Assuming country_list is an object containing currency codes as keys and country codes as values
// Example: const country_list = { "USD": "US", "NPR": "NP", ... };

function populateDropdowns() {
  dropList.forEach((list, index) => {
    const selectedCurrency = index === 0 ? "USD" : "NPR";
    for (const currency_code in country_list) {
      const isSelected = currency_code === selectedCurrency ? "selected" : "";
      const optionTag = `<option value="${currency_code}" ${isSelected}>${currency_code}</option>`;
      list.insertAdjacentHTML("beforeend", optionTag);
    }
  });
}

function loadFlag(element) {
  const country_code = country_list[element.value];
  const imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagcdn.com/48x36/${country_code.toLowerCase()}.png`;
}

function swapCurrencies() {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
}

function getExchangeRate() {
  let amountVal = amountInput.value || "1";
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://xe.com/xecurrencydata/vg11qj0sp0fi8uqnj41l4nisgu/latest/${fromCurrency.value}`;

  fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.rates[toCurrency.value];
    let totalExRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
  }).catch(() => {
    exchangeRateTxt.innerText = "Something went wrong";
  });
}

// Event Listeners
window.addEventListener("load", populateDropdowns);
window.addEventListener("load", getExchangeRate);
getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});
exchangeIcon.addEventListener("click", swapCurrencies);
dropList.forEach(drop => {
  drop.addEventListener("change", e => loadFlag(e.target));
});
