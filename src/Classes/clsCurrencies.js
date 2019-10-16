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

/**
 * Supporting custom compare function which allows
 * the correct sorting of '2019-10-01' string type date
 */
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

/**
 * Class: Holds an Array of Date and Rate records
 */
class clsDatedRates {
    constructor() {
        this.datedRatings = []
    }

    addRate(date, rate) {
        this.datedRatings.push({id: date, rate: rate})
        return true
    }

    /**
     * The Dates (datesRatings) have to be put into date order 
     * after all the entries have been imported   
     */
    sortDates() {
        this.datedRatings = this.datedRatings.sort(compareValues('id', 'desc'))
    }
}

/**
 * A Single Currency. Holds all the details relating to the currency
 */
class clsACurrency {
    constructor(currencyTitle, bShow) {
        this.title = currencyTitle
        this.bShow = bShow
        this.exchangeRate = "."
        this.datedRates = new clsDatedRates()
    }

    /**
     * The React-vis chart library likes to receive it's data in
     * [ {x: 1, y: 2}, {x: 2, y: 3} ] format, this will convert the
     * dated Ratings into a format React-vis likes
     */
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

/**
 * Holds the Base Currency and Start and End dates 
 * and an Array of Currencies and the Base Currency Details
 */
export class clsCurrencies {
    constructor() {
        this.currencies = []
        this.baseValue = 0
        this.baseCurrency = ''
        this.startDate = ''
        this.endDate = ''
    }

    /**
     * Add a new Currency to the Currencies Array
     */
    addCurrency(currency, bShow) {
        this.currencies.push(new clsACurrency(currency, bShow))
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

    /**
     * Reset/Empty the Dated Rates Array
     */
    resetDates(currencyTitle) {
        let selectedCurrency = this.currencies
            .filter(currency => currency.title === currencyTitle)
            .reduce(function (currency) {
                return currency
            })
        selectedCurrency.datedRates = new clsDatedRates()
    }

    resetCountryDates() {
        this.currencies.forEach((currency) => {
            currency.resetDates()
        })
    }

    /**
     * Requests the JSON from the exchange rates api and
     * then parses it and boils it down into the this.currencies class
     */
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

        // Iterate through the data and pull out individual "Country", "Date" and "Rating" entries. These are then
        // added to the specific currency object
        let keys = Object.keys(data.rates)
        keys.forEach((dateElement) => {
            for (let [key, value] of Object.entries(data.rates[dateElement])) {
                this.addARate(key, dateElement, value)
            }
        })
        this.sortedDatedRates()
    }

}

