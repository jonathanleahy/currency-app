/**
 * Example Usage:
 * let currencies = new clsCurrencies()
 * currencies.addCurrency('GBP')
 * currencies.addCurrency('CAD')
 * currencies.startDate = '2019-10-01'
 * currencies.endDate = '2019-10-10'
 * await currencies.getExchangeRateData()
 */

import axios from "axios";

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            parseInt(a[key].replace(/-/g, '')) : a[key];
        const varB = (typeof b[key] === 'string') ?
            parseInt(b[key].replace(/-/g, '')) : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ?
                (comparison * -1) : comparison
        );
    };
}

class clsDatedRates {
    constructor() {
        this.datedRatings = []
    }

    addRate(date, rate) {
        this.datedRatings.push({id: date, rate: rate})
        return true
    }

    sortDates() {
        this.datedRatings = this.datedRatings.sort(compareValues('id', 'desc'))
    }
}

class clsACurrency {
    constructor(currencyTitle, bShow) {
        this.title = currencyTitle
        this.bShow = bShow
        this.exchangeRate = "."
        this.datedRates = new clsDatedRates()
    }

    getInReactVisFormat() {

        let data = this.datedRates.datedRatings.map((daterate) => {
            let a = new Date(daterate.id)
            return {x: a, y: daterate.rate}
        })

        return data
    }

    resetDates() {
        this.datedRates = new clsDatedRates()
    }
}

export class clsCurrencies2 {

    constructor() {
        this.currencies = []
        this.baseValue = 0
        this.baseCurrency = ''
        this.startDate = ''
        this.endDate = ''
    }

    addCurrency(currency, bShow) {
        this.currencies.push(new clsACurrency(currency, bShow))
    }

    resetDates(currencyTitle) {
        let selectedCurrency = this.currencies
            .filter(currency => currency.title === currencyTitle)
            .reduce(function (currency) {
                return currency
            })
        selectedCurrency.datedRates = new clsDatedRates()
    }

    addARate(currencyTitle, date, rate) {
        let selectedCurrency = this.currencies
            .filter(currency => currency.title === currencyTitle)
            .reduce(function (currency) {
                return currency
            })
        selectedCurrency.datedRates.addRate(date, rate)
    }

    sortedDatedRates() {
        this.currencies.forEach(function (currency) {
            currency.datedRates.sortDates()
        })
    }

    resetCountryDates() {
        this.currencies.forEach((currency) => {
            currency.resetDates()
        })
    }

    async getExchangeRateData() {

        let selectCurrencies = this.currencies
            .filter(currency => currency.bShow === true)
            .map(function (currency) {
                return currency.title
            }).join()

        let url = `https://api.exchangeratesapi.io/history?start_at=${this.startDate}&end_at=${this.endDate}&symbols=${selectCurrencies}&base=${this.baseCurrency}`

        const getData = async url => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                return error;
            }
        }

        let data = await getData(url)

        this.resetCountryDates()

        let keys = Object.keys(data.rates)

        keys.forEach((dateElement) => {
            for (let [key, value] of Object.entries(data.rates[dateElement])) {
                this.addARate(key, dateElement, value)
            }
        })

        this.sortedDatedRates()

    }

}

