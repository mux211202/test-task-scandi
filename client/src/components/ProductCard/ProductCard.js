import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";
import cartIcon from "../../img/product-cart-icon.svg";
import Price from '../Price/Price';
import CartContext from '../../store/cart-context';
export default class ProductCard extends Component {
    render() {
        const {prices, name, gallery, id, inStock} = this.props.data;
        const {activeCurrency, data, activeCategory} = this.props;
        return (
            <CartContext.Consumer>
                {
                    (cartCtx)=>{
                        const {addToCart} = cartCtx;
                        return(
                        <div className='card-container'>
                            <Link className="product-card" to={inStock ? `/product/${id}` : `/category/${activeCategory}`}>
                                
                                    <img className='product-main-image' alt={name} src={gallery[0]}/>
                                    <div className='product-card-name'>{name}</div>
                                    <div className='product-card-price'>
                                        <Price prices={prices} activeCurrency={activeCurrency} />
                                    </div>
                                {!inStock && <div className= 'out-of-stock'>OUT OF STOCK</div>}
                            </Link>
                            {inStock && <img onClick={()=>{console.log(data); addToCart(data, activeCurrency)}}className="product-cart-icon" src={cartIcon}/>}
                        </div>
                    )}
                }
            </CartContext.Consumer>
            
        )
    }
}
