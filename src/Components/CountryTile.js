import React from "react"
import CountryFlag from "./CountryFlag"
import styled from 'styled-components'
import {LineSeries, XAxis, XYPlot} from "react-vis";

const Polaroid = styled.div`
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    align-contents: center;
    justify-content: center;
    margin: 1rem 1rem;
    height: 5rem;
    width: 15rem;
    border: 1px solid #C0C0C0;
    cursor: pointer;
    transition: height .3s, width .3s, margin .3s, active .1s, background-color .1s;
      
    :hover {
        height: 5.2rem;
        width: 16rem;
        margin: .5rem .5rem;
    }
    
    :active {
        background-color: #D3D3D3;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
        transform: translateY(2px);
    }
`

const PolaroidWide = styled.div`
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    align-contents: center;
    justify-content: center;
    margin: 1rem 1rem;
    height: 7rem;
    width: 45rem;
    cursor: pointer;
    transition: 0.3s;
    border: 1px solid #C0C0C0;
      
    transition: height .3s, width .3s, margin .3s, active .1s, background-color .1s;
      
    :hover {
        height: 7.2rem;
        width: 47rem;
        margin: .8rem .8rem;
    }
    
    :active {
        background-color: #D3D3D3;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
        transform: translateY(2px);
    }
`

const InfoBox = styled.div`
    display: flex;
    align-contents: center;
    justify-content: center;
    padding: 1rem 1rem 1rem 1rem;
    font-size: 1rem;
    width: 200px;
`

const InfoBoxEditing = styled.div`
    display: flex;
    flex-direction: column;
    align-contents: center;
    justify-content: center;
    padding: 1rem 1rem 1rem 1rem;
    font-size: 1rem;
`

const Side = styled.div`
    width: 300px;
    height: 25px;
    border: 2rem 2rem;
    padding: 1rem 1rem;
`

class CountryTile extends React.Component {

    render() {

        if (this.props.bEditMode) {
            return (
                <Polaroid>
                    <InfoBoxEditing>
                        <div>
                            {this.props.country.bShow &&
                            <img
                                src="/eeye.png"
                                width={'45px'}
                                alt="display currency on home page"
                            />
                            }
                        </div>
                        <div>
                            {this.props.country.title}
                        </div>
                    </InfoBoxEditing>
                </Polaroid>
            );
        }

        if (!this.props.bEditMode) {
            return (

                <PolaroidWide>

                    <CountryFlag countrycode={this.props.country.title} size={"MEDIUM"}/>

                    <InfoBox>
                        {this.props.country.title}<br/>
                        Value: £99.99<br/>
                        Exchange Rate: {this.props.country.exchangeRate}
                    </InfoBox>

                    <Side>
                        <XYPlot
                            stackBy="y"
                            width={300}
                            height={100}>
                            <XAxis/>
                            <LineSeries
                                data={this.props.country.getInReactVisFormat()}/>
                        </XYPlot>
                    </Side>

                </PolaroidWide>
            );
        }

    }

}

export default CountryTile;