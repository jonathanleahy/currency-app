import React from "react";
import {clsCurrencies} from "../Classes/clsCurrencies";
import CountryTile from "./CountryTile";
import styled from "styled-components";
import CurrencyGraphCompare from "./CurrencyGraphCompare";

const Header = styled.div`
    min-height: 10vh;
    width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
`

const Board = styled.div`
    display: flex;
    width: 900px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: ${props => props.bEdit ? "row" : "column"};
`

const Small = styled.div`
    font-size: 1rem;
`

const Button = styled.button`
    height: 5rem;
    width: 10rem;
    margin: .8rem .8rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    transition: height .3s, width .3s, margin .3s, active .1s, background-color .1s;
      
    :hover {
        height: 5.3rem;
        width: 10.3rem;
        margin: .6rem .6rem;
    }
    
    :active {
        background-color: #D3D3D3;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
        transform: translateY(2px);
    }
`

class Main extends React.Component {

    constructor(props) {
        super(props);

        let newCurrencies = new clsCurrencies()
        newCurrencies.addCurrency("CAD", true)
        newCurrencies.addCurrency("CHF", true)
        newCurrencies.addCurrency("HKD", true)
        newCurrencies.addCurrency("ISK", false)
        newCurrencies.addCurrency("PHP", false)
        newCurrencies.addCurrency("EUR", false)
        newCurrencies.addCurrency("DKK", false)
        newCurrencies.addCurrency("HUF", false)
        newCurrencies.addCurrency("CZK", false)
        newCurrencies.addCurrency("AUS", false)
        newCurrencies.addCurrency("RON", false)
        newCurrencies.addCurrency("SEK", false)
        newCurrencies.addCurrency("IDR", false)
        newCurrencies.addCurrency("INR", false)
        newCurrencies.addCurrency("BRL", false)
        newCurrencies.addCurrency("RUB", false)
        newCurrencies.addCurrency("HRK", false)
        newCurrencies.addCurrency("JPY", false)
        newCurrencies.addCurrency("THB", false)
        newCurrencies.addCurrency("SGD", false)
        newCurrencies.addCurrency("PLN", false)
        newCurrencies.addCurrency("BGM", false)
        newCurrencies.addCurrency("TRY", false)
        newCurrencies.addCurrency("CNY", false)
        newCurrencies.addCurrency("NOK", false)
        newCurrencies.addCurrency("NZD", false)
        newCurrencies.addCurrency("ZAR", false)
        newCurrencies.addCurrency("USD", false)
        newCurrencies.addCurrency("MXN", false)
        newCurrencies.addCurrency("ILS", false)
        newCurrencies.addCurrency("GBP", true)
        newCurrencies.addCurrency("KRW", false)
        newCurrencies.addCurrency("MYR", false)

        newCurrencies.baseValue = "100"
        newCurrencies.baseCurrency = "GBP"

        this.state = {
            currencies: newCurrencies,
            bShowAllCurrencies: false
        };

    }

    async componentDidMount() {
        let newCurrencies = this.state.currencies
        await newCurrencies.getExchangeRateData()
        this.setState({currencies: newCurrencies})
    }

    async onSelect(country) {

        let currencies = this.state.currencies

        currencies.baseCurrency = country

        if (this.state.bShowAllCurrencies) {
            const objIndex = currencies.currencies.findIndex(obj => obj.currency === country);
            currencies.currencies[objIndex].bShow = !currencies.currencies[objIndex].bShow
        }

        await currencies.getExchangeRateData()
        this.setState({currencies: currencies})
    }

    onShowHide() {
        let bShowHide = !this.state.bShowAllCurrencies
        this.setState({bShowAllCurrencies: bShowHide})
    }

    render() {

        if (this.state.currencies.length === 0) {
            return null
        }

        return (
            <div>

                <Header>
                    <div>
                        Base Currency:
                    </div>
                </Header>

                <Board>
                    {this.state.currencies.currencies
                        .filter(currency => currency.currency === this.state.currencies.baseCurrency)
                        .map((item, key) => {
                            return (
                                <div key={key}>
                                    <CountryTile country={item} bEditMode={false}/>
                                </div>
                            )
                        })}
                </Board>
                <br/>

                <Header>
                    <div>

                        {!this.state.bShowAllCurrencies &&
                        <Button onClick={() => this.onShowHide()}>
                            <img
                                src="/pencil.png"
                                width={'45px'}
                                alt={"client to edit"}
                            />
                        </Button>
                        }

                        {this.state.bShowAllCurrencies &&
                        <Button onClick={() => this.onShowHide()}>
                            <img
                                src="/return-arrow.png"
                                width={'45px'}
                                alt={"click to return"}
                            />
                        </Button>
                        }
                    </div>
                </Header>


                {this.state.bShowAllCurrencies &&
                <div>
                    <Header>
                        <div>
                            Values:<br/>
                        </div>
                    </Header>
                    <Board bEdit={this.state.bShowAllCurrencies}>
                        Hello
                    </Board>
                </div>
                }

                <Header>
                    <div>
                        {!this.state.bShowAllCurrencies &&
                        <div>
                            Currencies:<br/>
                        </div>
                        }
                        {this.state.bShowAllCurrencies &&
                        <div>
                            Currencies to Display:<br/>
                        </div>
                        }
                    </div>
                </Header>

                {this.state.bShowAllCurrencies &&
                <Board bEdit={this.state.bShowAllCurrencies}>
                    {this.state.currencies.currencies
                        .map((item, key) => {
                            return (
                                <div onClick={() => this.onSelect(item.currency)} key={key}>
                                    <CountryTile country={item} bEditMode={this.state.bShowAllCurrencies}/>
                                </div>
                            )
                        })}
                </Board>
                }

                {!this.state.bShowAllCurrencies &&
                <Board bEdit={this.state.bShowAllCurrencies}>
                    {this.state.currencies.currencies
                        .filter(currency => currency.bShow !== this.state.bShowAllCurrencies)
                        .filter(currency => currency.currency !== this.state.currencies.baseCurrency)
                        .map((item, key) => {
                            return (
                                <div onClick={() => this.onSelect(item.currency)} key={key}>
                                    <CountryTile country={item} bEditMode={this.state.bShowAllCurrencies}/>
                                </div>
                            )
                        })}
                </Board>
                }

                <Header>
                    Graph comparing all the live charts
                </Header>
                <CurrencyGraphCompare/>

                <Header>
                </Header>

            </div>
        );
    }
}

export default Main;

