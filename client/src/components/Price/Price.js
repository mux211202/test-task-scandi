import React, { Component } from 'react'

export default class Price extends Component {
    render() {
        const {prices, activeCurrency} = this.props;
        const activePrice = prices[prices.findIndex((price) => price.currency ===activeCurrency.value)].amount;
        const priceString = `${activeCurrency.string.slice(0,1)} ${activePrice}`;
        return (
            <>
                {priceString}
            </>
        )
    }
}
