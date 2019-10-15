export class clsCountryCodes {

    static flagImage(findCountryCode3) {

        let countries = [
            {cc3: "CAD", cc2: "CA", flag: "CA"},
            {cc3: "HKD", cc2: "HK", flag: "HK"},
            {cc3: "ISK", cc2: "IS", flag: "IS"},
            {cc3: "CHF", cc2: "CH", flag: "CH"},
            {cc3: "EUR", cc2: "", flag: ""},
            {cc3: "PHP", cc2: "", flag: ""},
            {cc3: "DKK", cc2: "", flag: ""},
            {cc3: "HUF", cc2: "", flag: ""},
            {cc3: "CZK", cc2: "", flag: ""},
            {cc3: "AUS", cc2: "", flag: ""},
            {cc3: "RON", cc2: "", flag: ""},
            {cc3: "SEK", cc2: "", flag: ""},
            {cc3: "IDR", cc2: "", flag: ""},
            {cc3: "INR", cc2: "", flag: ""},
            {cc3: "BRL", cc2: "", flag: ""},
            {cc3: "RUB", cc2: "", flag: ""},
            {cc3: "HRK", cc2: "", flag: ""},
            {cc3: "JPY", cc2: "", flag: ""},
            {cc3: "THB", cc2: "", flag: ""},
            {cc3: "SGD", cc2: "", flag: ""},
            {cc3: "PLN", cc2: "", flag: ""},
            {cc3: "BGM", cc2: "", flag: ""},
            {cc3: "TRY", cc2: "", flag: ""},
            {cc3: "CNY", cc2: "", flag: ""},
            {cc3: "NOK", cc2: "", flag: ""},
            {cc3: "NZD", cc2: "", flag: ""},
            {cc3: "ZAR", cc2: "", flag: ""},
            {cc3: "USD", cc2: "", flag: ""},
            {cc3: "MXN", cc2: "", flag: ""},
            {cc3: "ILS", cc2: "", flag: ""},
            {cc3: "GBP", cc2: "GB", flag: "GB"},
            {cc3: "KRW", cc2: "", flag: ""},
            {cc3: "MYR", cc2: "", flag: ""},
        ]

        let cc3 = findCountryCode3

        let country = countries.find(obj => obj.cc3 === cc3);

        if (country) {
            return `/flags/${country.flag}_100.png`
        }

    }

}