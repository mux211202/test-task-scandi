import React, { Component } from 'react';
import CartItem from './CartItem';
import './CartComponent.css';
import CartContext from '../../store/cart-context';
export default class CartComponent extends Component {
    render() {
        const {activeCurrency} = this.props;
        return (
            <CartContext.Consumer>
            { (cartCtx) => {
                const {items, totalAmount, addToCart, removeFromCart} = cartCtx;
                return(
                    <div className='cart-items'>
                        {items.length > 0 ? items.map((item)=>{
                            return(
                                <CartItem
                                    removeFromCart={removeFromCart}
                                    addToCart={addToCart}
                                    key={`cart-${item.id}`}
                                    activeCurrency={activeCurrency}
                                    productData={item}
                                />
                            )
                        }) : <p>No products in cart</p>}
                    </div>
                )
            }}
            </CartContext.Consumer>
        )
    }
}
