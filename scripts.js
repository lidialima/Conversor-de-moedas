const convertButton = document.querySelector(".convert-button");
const fromCurrencySelect = document.querySelector(".from-currency-select"); // Moeda de origem
const toCurrencySelect = document.querySelector(".to-currency-select"); // Moeda de destino

async function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueConverted = document.querySelector(".currency-value"); // Resultado da conversão
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // Valor a ser convertido

  //async await
  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( Response => Response.json())

  // Valores das moedas em relação ao Real
  const rates = {
    BRL: 1,
    USD: data.USDBRL.high,
    EUR: data.EURBRL.high,
    GBP: 7.70, // Atualize com valores válidos
    BTC: data.BTCBRL.high,
  };

  const fromRate = rates[fromCurrencySelect.value]; // Valor da moeda de origem
  const toRate = rates[toCurrencySelect.value]; // Valor da moeda de destino

  if (!inputCurrencyValue || isNaN(inputCurrencyValue)) {
    alert("Por favor, insira um valor válido.");
    return;
  }
  

  // Calcula a taxa de conversão
  const conversionRate = toRate / fromRate;

  // Converte o valor
  const convertedValue = inputCurrencyValue * conversionRate;

  // Formata e exibe o valor a ser convertido
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: fromCurrencySelect.value,
  }).format(inputCurrencyValue);

  // Formata e exibe o valor convertido
  currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: toCurrencySelect.value,
  }).format(convertedValue);
}

function changeCurrency() {
  const fromCurrencyName = document.getElementById("from-currency-name");
  const toCurrencyName = document.getElementById("to-currency-name");
  const fromCurrencyImage = document.querySelector(".from-currency-img");
  const toCurrencyImage = document.querySelector(".to-currency-img");

  const currencyNames = {
    BRL: "Real",
    USD: "Dólar Americano",
    EUR: "Euro",
    GBP: "Libra",
    BTC: "Bitcoin",
  };

  const currencyImages = {
    BRL: "./assets/real.png",
    USD: "./assets/dolar.png",
    EUR: "./assets/euro.png",
    GBP: "./assets/libra.png",
    BTC: "./assets/bitcoin.png",
  };

  fromCurrencyName.innerHTML = currencyNames[fromCurrencySelect.value];
  fromCurrencyImage.src = currencyImages[fromCurrencySelect.value];
  
  toCurrencyName.innerHTML = currencyNames[toCurrencySelect.value];
  toCurrencyImage.src = currencyImages[toCurrencySelect.value];

  convertValues();
}

fromCurrencySelect.addEventListener("change", changeCurrency);
toCurrencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
