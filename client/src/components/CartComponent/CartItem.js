import React, { PureComponent } from 'react';
import Price from '../Price/Price';
import Attributes from '../ProductInfo/Attributes/Attributes';
import CartGalery from '../CartGalery/CartGalery';
export default class CartItem extends PureComponent {
    plusOnClickHandler = () => {
        const {addToCart, productData, activeCurrency} = this.props;
        addToCart(productData, activeCurrency, productData.attributes);
    }
    minusOnClickHandler = () => {
        const {removeFromCart, productData, activeCurrency} = this.props;
        removeFromCart(productData, activeCurrency)
    }
    render() {
        const {activeCurrency, productData, setAttributeValue} = this.props;
        const {name, brand, amount, gallery, prices, id} = this.props.productData;
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
                    <Attributes
                        productData={productData} 
                        setAttributeValue={setAttributeValue} 
                        id={id} attributes={productData.attributes}
                    />
                </div>
                <div className='right-side'>
                    <div className='amount-controller'>
                        <div className='amount-controller-item' onClick={this.plusOnClickHandler}>+</div>
                        <div className='amount'>{amount}</div>
                        <div className='amount-controller-item' onClick={this.minusOnClickHandler}>-</div>
                    </div>
                    <div className='mini-gallery'>
                        <CartGalery galeryData={gallery}/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
