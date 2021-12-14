import React, { Component } from 'react'

export default class CurrencySwitcher extends Component {
    onCurrencyChangeHandler = (e) => {
        const {changeActiveCurrency, items, setTotalAmount, createActiveCurrencyObj} = this.props;
        const target = e.target.value;
        const newCurrency = createActiveCurrencyObj(target); // this function is needed to create currency obj before state update to pass obj as an argument
        setTotalAmount(items, newCurrency);
        changeActiveCurrency(target);
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
