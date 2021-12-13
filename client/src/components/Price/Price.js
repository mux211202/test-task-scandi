import React, { Component } from 'react'

export default class Price extends Component {
    render() {
        const {prices, activeCurrency, amount, pricePropsStr} = this.props;
        let priceString;
        if(prices && prices.length>0){
            const activePrice = prices[prices.findIndex((price) => price.currency ===activeCurrency.value)].amount;
            priceString = amount ? `${activeCurrency.string.slice(0,1)} ${(activePrice * amount).toFixed(2)}` 
                                : `${activeCurrency.string.slice(0,1)} ${activePrice.toFixed(2)}`;
        }else{
            priceString = pricePropsStr;
        }
        return (
            <>
                {priceString}
            </>
        )
    }
}
