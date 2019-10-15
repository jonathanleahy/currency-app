import React from "react";
import {clsCountryCodes} from "../Classes/clsCountryCodes";
import styled from "styled-components";

const Container = styled.div`
    width: 250px;
    display: flex;
    position: relative;
`

class CountryFlag extends React.Component {

    render() {
        return (
            <Container>
                <img
                    src={clsCountryCodes.flagImage(this.props.countrycode)}
                    alt={this.props.countrycode}
                    width={'100%'}
                />
            </Container>
        );
    }

}

export default CountryFlag;