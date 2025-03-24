const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    const sunIcon = toggleButton.querySelector("i.sun");
    const moonIcon = toggleButton.querySelector("i.moon");

    if (isDarkMode) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
    } else {
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
    }
});

const amountInput = document.getElementById("amount");
const amountError = document.getElementById("amountError");
amountInput.addEventListener("input", () => {
    if (parseFloat(amountInput.value) < 0) {
        amountInput.value = "0";
    }
    amountError.style.display = "none";
});

function showError(message) {
    amountError.innerText = message;
    amountError.style.display = "block";
}

document.getElementById("convertButton").addEventListener("click", function () {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || isNaN(amount) || amount <= 0) {
        showError("Please enter a valid amount.");
        return;
    }

    const apiKey = "a3aa76605120e9f93964245a";
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "error") {
                showError("Failed to fetch exchange rate. Please try again.");
                return;
            }
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById("result").innerText = `Converted amount: ${convertedAmount} ${toCurrency}`;
            amountError.style.display = "none";
        })
        .catch(error => {
            showError("Error fetching exchange rate.");
        });
});
