import React, { PureComponent } from 'react'
import CurrencySwitcher from './CurrencySwitcher/CurrencySwitcher';
import CartLogo from '../../../img/cart_logo.svg';
import CartContext from '../../../store/cart-context';
import CartOverlay from '../../CartOverlay/CartOverlay';
export default class CurrencyCartContainer extends PureComponent {
    constructor(){
        super();
        this.state={
            isSwitcherVisible: false
        }
    }
    setSwitcherDisplay = (display) =>{
        this.setState({isSwitcherVisible:display});
    }
    render() {
        const {activeCurrency, currencies, changeActiveCurrency, createActiveCurrencyObj} = this.props;
        const {isSwitcherVisible} =this.state;
        return (
            <CartContext.Consumer>
                {
                (cartCtx)=>{
                    const {setTotalAmount, items, toggleCartOverlay, isCartOverlayVisible, logCheckout, itemsCount} = cartCtx;
                    return (
                    <>
                    <div className='currency-cart-container'>
                        <CurrencySwitcher
                        setSwitcherDisplay={this.setSwitcherDisplay}
                        createActiveCurrencyObj={createActiveCurrencyObj}
                        setTotalAmount={setTotalAmount}
                        items={items}
                        isCartOverlayVisible={isCartOverlayVisible}
                        activeCurrency={activeCurrency} 
                        currencies={currencies} 
                        changeActiveCurrency={changeActiveCurrency}/>
                        <div onClick={!isSwitcherVisible ? toggleCartOverlay : ()=>{}} className='header-cart-logo'>
                            {itemsCount>0 && <div className='cart-items-counter'>{itemsCount}</div>}
                            <img src={CartLogo} atl='cart-logo'/>
                        </div>
                        <div className='cart-overlay-container'>
                            {isCartOverlayVisible ? <CartOverlay
                                                    logCheckout={logCheckout}
                                                    toggleCartOverlay={toggleCartOverlay}  
                                                    itemsCount={itemsCount} 
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
