import React from "react";
import {clsCountryCodes} from "../Classes/CountryCodes";
import CountryFlag from "../Classes/CountryFlag";

class BaseCurrencySelection extends React.Component {

    render() {
        return (
            <div>
                <CountryFlag countrycode={this.props.currencies.baseCurrency} size={"MEDIUM"}/>
            </div>
        );
    }
}

export default BaseCurrencySelection;