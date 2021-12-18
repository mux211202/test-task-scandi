import React, { PureComponent } from 'react'
import CurrencySwitcher from './CurrencySwitcher/CurrencySwitcher';
import CartLogo from '../../../img/cart_logo.svg';
import CartContext from '../../../store/cart-context';
import CartOverlay from '../../CartOverlay/CartOverlay';
export default class CurrencyCartContainer extends PureComponent {
    render() {
        const {activeCurrency, currencies, changeActiveCurrency, createActiveCurrencyObj} = this.props;
        return (
            <CartContext.Consumer>
                {
                (cartCtx)=>{
                    const {setTotalAmount, items, toggleCartOverlay, isCartOverlayVisible, logCheckout} = cartCtx;
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
                            <img src={CartLogo} alt='cart-logo'/>
                        </div>
                        <div className='cart-overlay-container'>
                            {isCartOverlayVisible ? <CartOverlay
                                                    logCheckout={logCheckout}
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
