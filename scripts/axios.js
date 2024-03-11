const loadCurrencies = async () => {
    try {
      const { data } = await axios.get("https://dull-pink-sockeye-tie.cyclic.app/students/available");
      const currencySelect = document.getElementById("currency-select");
      
      data.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency.code;
        option.text = `${currency.name} (${currency.symbol})`;
        currencySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };
  
  loadCurrencies();
  