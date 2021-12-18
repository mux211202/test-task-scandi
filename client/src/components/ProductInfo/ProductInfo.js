import React, { PureComponent } from 'react';
import './ProductInfo.css';
import Attributes from './Attributes/Attributes';
import Price from '../Price/Price';
import Button from '../Layout/Button';
import CartContext from '../../store/cart-context';
export default class ProductInfo extends PureComponent {
    render() {
        const {activeCurrency, setAttributeValue, productData, attributes} = this.props;
        const { name, brand, id, prices, description } = this.props.productData;
        return (
            <CartContext.Consumer>
                {
                (cartCtx)=>{
                    return(
                    <div className='product-info'>
                        <h2 className='product-name'>{name}</h2>
                        <div className='product-brand'>{brand}</div>
                        {attributes.length > 0 && 
                            <Attributes
                            productData={productData} 
                            setAttributeValue={setAttributeValue} 
                            id={id} attributes={attributes}
                        />}
                        <div className='product-price'>
                            <span>PRICE:</span>
                            <div>
                                <Price activeCurrency={activeCurrency} prices={prices}/>
                            </div>
                        </div>
                        <Button 
                        onClick={()=>{cartCtx.addToCart(productData, activeCurrency, attributes)}}
                        w='292px' 
                        h='52px'>
                            ADD TO CART
                        </Button>
                        <div className='product-description' dangerouslySetInnerHTML={{__html:description}}/>
                    </div>
                    )
                }
                }
            </CartContext.Consumer>
        )
    }
}
