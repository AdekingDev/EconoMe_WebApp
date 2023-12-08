document.addEventListener('DOMContentLoaded', function () {
    const fromCurrency = document.querySelector('.from select');
    const toCurrency = document.querySelector('.to select');
    const amountInput = document.querySelector('.amount input');
    const exchangeRateText = document.querySelector('.exchange-rate');
    const form = document.querySelector('form');

    // Your static API response
    const apiResponse = {
        "result":"success",
        "documentation":"https://www.exchangerate-api.com/docs",
        "terms_of_use":"https://www.exchangerate-api.com/terms",
        "time_last_update_unix":1699920001,
        "time_last_update_utc":"Tue, 14 Nov 2023 00:00:01 +0000",
        "time_next_update_unix":1700006401,
        "time_next_update_utc":"Wed, 15 Nov 2023 00:00:01 +0000",
        "base_code":"USD",
        "conversion_rates":{
        "USD":1,
        "AED":3.6725,
        "AFN":73.7710,
        "ALL":98.4037,
        "AMD":402.8752,
        "ANG":1.7900,
        "AOA":836.9087,
        "ARS":350.0300,
        "AUD":1.5683,
        "AWG":1.7900,
        "AZN":1.6996,
        "BAM":1.8291,
        "BBD":2.0000,
        "BDT":110.5417,
        "BGN":1.8295,
        "BHD":0.3760,
        "BIF":2830.2678,
        "BMD":1.0000,
        "BND":1.3595,
        "BOB":6.8908,
        "BRL":4.9083,
        "BSD":1.0000,
        "BTN":83.2640,
        "BWP":13.6180,
        "BYN":3.2757,
        "BZD":2.0000,
        "CAD":1.3804,
        "CDF":2484.6329,
        "CHF":0.9021,
        "CLP":913.7262,
        "CNY":7.2923,
        "COP":4077.8175,
        "CRC":529.0292,
        "CUP":24.0000,
        "CVE":103.1189,
        "CZK":22.9878,
        "DJF":177.7210,
        "DKK":6.9748,
        "DOP":56.6211,
        "DZD":135.0147,
        "EGP":30.9099,
        "ERN":15.0000,
        "ETB":55.9111,
        "EUR":0.9352,
        "FJD":2.2689,
        "FKP":0.8152,
        "FOK":6.9769,
        "GBP":0.8153,
        "GEL":2.6937,
        "GGP":0.8152,
        "GHS":12.0076,
        "GIP":0.8152,
        "GMD":65.4439,
        "GNF":8587.6870,
        "GTQ":7.7966,
        "GYD":210.9207,
        "HKD":7.8092,
        "HNL":24.5667,
        "HRK":7.0462,
        "HTG":132.5657,
        "HUF":352.7694,
        "IDR":15698.2408,
        "ILS":3.8595,
        "IMP":0.8152,
        "INR":83.2713,
        "IQD":1308.9012,
        "IRR":41994.2194,
        "ISK":143.5065,
        "JEP":0.8152,
        "JMD":155.8858,
        "JOD":0.7090,
        "JPY":151.6632,
        "KES":151.8560,
        "KGS":89.3399,
        "KHR":4119.0753,
        "KID":1.5683,
        "KMF":460.0841,
        "KRW":1322.1280,
        "KWD":0.3085,
        "KYD":0.8333,
        "KZT":466.1409,
        "LAK":20551.0741,
        "LBP":15000.0000,
        "LKR":325.6472,
        "LRD":189.5145,
        "LSL":18.7155,
        "LYD":4.8688,
        "MAD":10.2113,
        "MDL":17.9527,
        "MGA":4507.1889,
        "MKD":57.5992,
        "MMK":2091.1794,
        "MNT":3473.0529,
        "MOP":8.0432,
        "MRU":39.6280,
        "MUR":44.5511,
        "MVR":15.4399,
        "MWK":1682.6192,
        "MXN":17.6463,
        "MYR":4.7080,
        "MZN":63.8823,
        "NAD":18.7155,
        "NGN":809.0977,
        "NIO":36.4357,
        "NOK":11.0987,
        "NPR":133.2224,
        "NZD":1.6998,
        "OMR":0.3845,
        "PAB":1.0000,
        "PEN":3.7887,
        "PGK":3.7271,
        "PHP":56.0305,
        "PKR":287.1426,
        "PLN":4.1393,
        "PYG":7355.8738,
        "QAR":3.6400,
        "RON":4.6527,
        "RSD":109.5774,
        "RUB":92.0620,
        "RWF":1264.2491,
        "SAR":3.7500,
        "SBD":8.4210,
        "SCR":13.1389,
        "SDG":576.6894,
        "SEK":10.8580,
        "SGD":1.3596,
        "SHP":0.8152,
        "SLE":22.6882,
        "SLL":22688.1741,
        "SOS":572.0105,
        "SRD":38.1159,
        "SSP":1055.1364,
        "STN":22.9122,
        "SYP":12873.2536,
        "SZL":18.7155,
        "THB":35.9862,
        "TJS":10.9427,
        "TMT":3.4999,
        "TND":3.1525,
        "TOP":2.3693,
        "TRY":28.6029,
        "TTD":6.7289,
        "TVD":1.5683,
        "TWD":32.2981,
        "TZS":2496.8802,
        "UAH":36.1638,
        "UGX":3772.1956,
        "UYU":39.7193,
        "UZS":12313.1346,
        "VES":35.3148,
        "VND":24365.8466,
        "VUV":121.0285,
        "WST":2.7415,
        "XAF":613.4454,
        "XCD":2.7000,
        "XDR":0.7599,
        "XOF":613.4454,
        "XPF":111.5983,
        "YER":249.1668,
        "ZAR":18.7163,
        "ZMW":22.8974,
        "ZWL":5760.2261
        }
    };

    // Populate the currency dropdowns
    for (let code in apiResponse.conversion_rates) {
        let optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.innerText = code;
        fromCurrency.appendChild(optionFrom);

        let optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.innerText = code;
        toCurrency.appendChild(optionTo);
    }

    function loadFlag(element) {
        const country_code = country_list[element.value];
        const imgTag = element.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${country_code.toLowerCase()}.png`;
      }

    // Function to calculate exchange rate
    function getExchangeRate(from, to) {
        const fromRate = apiResponse.conversion_rates[from];
        const toRate = apiResponse.conversion_rates[to];
        return toRate / fromRate;
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        const exchangeRate = getExchangeRate(fromValue, toValue);
        const convertedAmount = amount * exchangeRate;
        exchangeRateText.innerText = `1 ${fromValue} = ${exchangeRate.toFixed(6)} ${toValue}\n${amount} ${fromValue} = ${convertedAmount.toFixed(2)} ${toValue}`;
    });
});
