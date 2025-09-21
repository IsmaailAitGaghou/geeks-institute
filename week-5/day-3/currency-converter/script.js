const form = document.querySelector("#converter-form");
const fromCurrencySelect = document.querySelector("#from-currency");
const toCurrencySelect = document.querySelector("#to-currency");
const resultDisplay = document.querySelector("#result");
const switchBtn = document.querySelector("#switch-button");
let apiKey = "18ac5d2b27975a2eaa18603a";

const getCurrencies = async () => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    data.supported_codes.join(", ");
    return data.supported_codes;
  } catch (error) {
    console.log("Error fetching currency codes:", error);
    return [];
  }
};

const populateCurrencyDropdowns = async () => {
  const currencies = await getCurrencies();

  currencies.forEach(([code, name]) => {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${name}`;
    fromCurrencySelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = `${code} - ${name}`;
    toCurrencySelect.appendChild(option2);
  });
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.conversion_result);
    return data.conversion_result;
  } catch (error) {
    console.log("Error fetching exchange rates:", error);
    return 0;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(document.querySelector("#amount").value);
  const fromCurrency = document.querySelector("#from-currency").value;
  const toCurrency = document.querySelector("#to-currency").value;

  if (!amount || !fromCurrency || !toCurrency) {
    alert("Please fill in all fields.");
    return;
  }

  const result = await convertCurrency(amount, fromCurrency, toCurrency);
  resultDisplay.textContent = result.toFixed(2);
});

populateCurrencyDropdowns();

switchBtn.addEventListener("click", () => {
  const temp = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = temp;
});