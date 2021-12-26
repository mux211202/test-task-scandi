import React, { Component } from 'react'
import switcher from '../../../../img/switcher.svg';
export default class CurrencySwitcher extends Component {
    constructor(){
        super();
        this.state={
            isSwitcherVisible: false
        }
    }
    onCurrencyChangeHandler = (e) => {
        const {changeActiveCurrency, items, setTotalAmount, createActiveCurrencyObj} = this.props;
        const target = e.target.getAttribute('data-value');
        const newCurrency = createActiveCurrencyObj(target); // this function is needed to create currency obj before state update to pass obj as an argument
        setTotalAmount(items, newCurrency);
        changeActiveCurrency(target);
        this.toggleSwitcherDisplay();
    }
    toggleSwitcherDisplay = () => {
        const {isCartOverlayVisible, setSwitcherDisplay} = this.props;
        if(isCartOverlayVisible){
            return
        }else{
            this.setState(({isSwitcherVisible})=>{
                const newDisplay = !isSwitcherVisible
                const switcherBtn = document.querySelector('.currency-select-switcher');
                if(newDisplay){
                    switcherBtn.style.transform = 'translateY(-50%) rotate(0deg)';
                }else{
                    switcherBtn.style.transform = 'translateY(-50%) rotate(180deg)';
                }
                setSwitcherDisplay(newDisplay);
                return {isSwitcherVisible: newDisplay}
            })
        }
    }
    render() {
        const { currencies, activeCurrency } = this.props;
        const { isSwitcherVisible } = this.state;
        return (
            <div className='currency-select-container'>
                <div className='value'>{activeCurrency.string.slice(0,1)}</div>
                {isSwitcherVisible ? 
                <div className='currency-select'>
                    {currencies.map(currency =>
                        <div
                        className='currency-select-item' 
                        onClick={this.onCurrencyChangeHandler}
                        data-value={currency.value} 
                        key={`ID${currency.string}`}>
                            {currency.string}
                        </div>
                    )}
                </div> : null}
                <img className='currency-select-switcher' src={switcher} onClick={this.toggleSwitcherDisplay}/>
                
            </div>
        )
    }
}
