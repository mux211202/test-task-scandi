import React, { Component } from 'react';
import './ProductInfo.css';
import Attributes from './Attributes/Attributes';
import Price from '../Price/Price';
import Button from '../Layout/Button';
import CartContext from '../../store/cart-context';
export default class ProductInfo extends Component {
    setProductDescription = () => {
        const descrBlock = document.querySelector('.product-description');
        const {productData} = this.props;
        descrBlock.innerHTML = productData.description;
    }
    componentDidMount(){
        this.setProductDescription();
    }
    componentDidUpdate(){
        this.setProductDescription();
    }
    render() {
        const {activeCurrency, setAttributeValue, productData, attributes} = this.props;
        const { name, brand, id, prices, description, inStock } = this.props.productData;
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
                        btnClass={inStock ? '' : 'blocked' } 
                        onClick={()=>{if(inStock){cartCtx.addToCart(productData, activeCurrency, attributes)}else return}}
                        w='292px' 
                        h='52px'>
                            ADD TO CART
                        </Button>
                        <div className='product-description'/>
                    </div>
                    )
                }
                }
            </CartContext.Consumer>
        )
    }
}
