import React, { Fragment } from "react";
import CountryTile from "./CountryTile";

class BaseCurrencyTile extends React.Component {

    render() {
        return (
            <Fragment>
                {this.props.currencies.currencies
                    .filter(currency => currency.currency === this.props.currencies.baseCurrency)
                    .map((item, key) => {
                        return (
                            <div key={key}>
                                <CountryTile country={item} bEditMode={false}/>
                            </div>
                        )
                    })}
            </Fragment>
        );
    }

}

export default BaseCurrencyTile;