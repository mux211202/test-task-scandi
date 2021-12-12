import React, { Component } from 'react'
import CurrencySwitcher from './CurrencySwitcher/CurrencySwitcher';
import CartLogo from '../../../img/cart_logo.svg';
import CartContext from '../../../store/cart-context';
import { Link } from 'react-router-dom';
export default class CurrencyCartContainer extends Component {
    render() {
        const {activeCurrency, currencies, changeActiveCurrency} = this.props;
        return (
            <CartContext.Consumer>
                {
                (cartCtx)=>{
                    const length = cartCtx.items.length;
                    return (
                    <div className='currency-cart-container'>
                        <CurrencySwitcher
                        activeCurrency={activeCurrency} 
                        currencies={currencies} 
                        changeActiveCurrency={changeActiveCurrency}/>
                        <div className='header-cart-logo'>
                            {length>0 && <div className='cart-items-counter'>{length}</div>}
                            <Link to='/cart'><img src={CartLogo} atl='cart-logo'/></Link>
                        </div>
                    </div>
                )}    
                }
            </CartContext.Consumer>
            
        )
    }
}
