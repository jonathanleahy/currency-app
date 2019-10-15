import {clsACurrency} from "./clsACurrency";

export class clsCurrencies {

    constructor() {
        this.currencies = []
        this.baseValue = 0
        this.baseCurrency = ''
    }

    addCurrency(currency, bShow) {
        this.currencies.push(new clsACurrency(currency, bShow))
    }

    addRate(currency, date, value) {

    }

    async getExchangeRateData() {

        try {

            let selectCurrencies = this.currencies
                .filter(currency => currency.bShow === true)
                .map(function (currency) {
                    return currency.currency
                }).join()

            let response = await fetch(`https://api.exchangeratesapi.io/history?start_at=2018-07-01&end_at=2018-09-13&symbols=${selectCurrencies}`)

            let data = await response.json()

            let keys = Object.keys(data.rates)
            keys.forEach(function (dateElement) {
                let currencyKeys = Object.keys(data.rates[dateElement])
                currencyKeys.forEach(function (currencyKeysElement) {
                    // we have extracted a piece of data, so add it to the relevant country date data
                    // TODO: addRate
                })
            })

            this.currencies[0].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[1].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[2].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[3].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[4].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[5].exchangeRate = Math.floor(Math.random() * 10)
            this.currencies[6].exchangeRate = Math.floor(Math.random() * 10)

        } catch (err) {
            console.log("Issue")
        }

    }

}