import React, { Component } from 'react'

export default class CurrencySwitcher extends Component {
    onCurrencyChangeHandler = (e) => {
        const {changeActiveCurrency} = this.props;
        const newCurrency = e.target.value;
        changeActiveCurrency(newCurrency)
    }
    render() {
        const { currencies, activeCurrency } = this.props;
        return (
            <div className='currency-select-container'>
                <select
                className='currency-select' 
                onChange={this.onCurrencyChangeHandler}
                value={ activeCurrency.value }>
                    {currencies.map(currency =>
                        <option 
                        value={currency.value} 
                        key={`ID${currency.string}`}>
                            {currency.string}
                        </option>
                    )}
                </select>
            </div>
        )
    }
}
