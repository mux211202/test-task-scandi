import React, { Component } from 'react';
import Price from '../Price/Price';
export default class CartItem extends Component {
    plusOnClickHandler = () => {
        const {addToCart, productData, activeCurrency} = this.props;
        addToCart(productData, activeCurrency, productData.attributes);
    }
    minusOnClickHandler = () => {
        const {removeFromCart, productData, activeCurrency} = this.props;
        removeFromCart(productData, activeCurrency)
    }
    render() {
        const {activeCurrency} = this.props;
        const {name, brand, amount, gallery, prices} = this.props.productData;
        return (
            <>
            <div className='grey-hl'></div>
            <div className='cart-item'>
                <div className='left-side'>
                    <div className='product-name'>{name}</div>
                    <div className='product-brand'>{brand}</div>
                    <div className='product-price'>
                        <Price prices={prices} activeCurrency={activeCurrency}/>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='amount-controller'>
                        <div className='amount-controller-item' onClick={this.plusOnClickHandler}>+</div>
                        <div className='amount'>{amount}</div>
                        <div className='amount-controller-item' onClick={this.minusOnClickHandler}>-</div>
                    </div>
                    <div className='mini-gallery'>
                        <img className='cart-item-img' alt='cart-product' src={`${gallery[0]}`}/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
