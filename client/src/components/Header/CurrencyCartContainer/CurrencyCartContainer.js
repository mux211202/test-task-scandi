import React, { Component } from 'react'
import CurrencySwitcher from './CurrencySwitcher/CurrencySwitcher';
import CartLogo from '../../../img/cart_logo.svg';
import CartContext from '../../../store/cart-context';
import { Link } from 'react-router-dom';
import CartOverlay from '../../CartOverlay/CartOverlay';
export default class CurrencyCartContainer extends Component {
    render() {
        const {activeCurrency, currencies, changeActiveCurrency, createActiveCurrencyObj} = this.props;
        return (
            <CartContext.Consumer>
                {
                (cartCtx)=>{
                    const {setTotalAmount, items, toggleCartOverlay, isCartOverlayVisible  } = cartCtx;
                    const length = items.length;
                    return (
                    <>
                    <div className='currency-cart-container'>
                        <CurrencySwitcher
                        createActiveCurrencyObj={createActiveCurrencyObj}
                        setTotalAmount={setTotalAmount}
                        items={items}
                        activeCurrency={activeCurrency} 
                        currencies={currencies} 
                        changeActiveCurrency={changeActiveCurrency}/>
                        <div onClick={toggleCartOverlay} className='header-cart-logo'>
                            {length>0 && <div className='cart-items-counter'>{length}</div>}
                            <img src={CartLogo} atl='cart-logo'/>
                        </div>
                        <div className='cart-overlay-container'>
                            {isCartOverlayVisible ? <CartOverlay
                                                    toggleCartOverlay={toggleCartOverlay}  
                                                    itemsCount={length} 
                                                    activeCurrency={activeCurrency}/>
                            : null} 
                        </div>
                    </div>
                    
                    </>
                )}    
                }
            </CartContext.Consumer>
            
        )
    }
}
