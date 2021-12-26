import React, { PureComponent } from 'react';
import CartItem from './CartItem';
import './CartComponent.css';
import CartContext from '../../store/cart-context';
import Price from '../Price/Price';
import Button from '../Layout/Button';
export default class CartComponent extends PureComponent {
    render() {
        const {activeCurrency} = this.props;
        return (
            <CartContext.Consumer>
            { (cartCtx) => {
                const {items, totalAmount, addToCart, removeFromCart, setCartAttribute, isCartOverlayVisible, logCheckout} = cartCtx;
                const itemsCount = items.length;
                return(
                    <>
                    <div className='cart-items'>
                        {itemsCount > 0 ? items.map((item, i)=>{
                            const attributeValuesStr = item.attributes.map((attribute)=>attribute.selectedValueIndex).join("");//for unique key
                            return(
                                <CartItem
                                    setAttributeValue={setCartAttribute} 
                                    removeFromCart={removeFromCart}
                                    addToCart={addToCart}
                                    key={`cart-${item.id}/attributes=${attributeValuesStr}/index=${i}`}
                                    activeCurrency={activeCurrency}
                                    productData={item}
                                />
                            )
                        }
                        ) : <p>No products in cart</p>}
                        <div className='grey-hl'></div>
                        
                        {!isCartOverlayVisible && <Button btnClass={itemsCount > 0 ? '' : 'blocked'} onClick={logCheckout} h='50px' w='220px'>CHECK OUT</Button>}
                    </div>
                    <div className='total-amount'>
                        <span>Total: </span>
                        <Price
                        pricePropsStr={totalAmount} 
                        activeCurrency={activeCurrency}/>
                    </div>
                    </>
                )
            }}
            </CartContext.Consumer>
        )
    }
}
