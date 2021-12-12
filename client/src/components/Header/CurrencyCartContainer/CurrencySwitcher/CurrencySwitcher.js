import React, { Component } from 'react'

export default class CurrencySwitcher extends Component {
    render() {
        const { currencies, changeActiveCurrency, activeCurrency } = this.props;
        
        return (
            <div className='currency-select-container'>
                <select
                className='currency-select' 
                onChange={(e)=>{changeActiveCurrency(e.target.value)}}
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
