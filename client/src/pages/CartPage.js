import React, { Component } from 'react';
import CartComponent from '../components/CartComponent/CartComponent';

export default class CartPage extends Component {
    render() {
        const {activeCurrency} = this.props;
        return (
            <div className='cart-page'>
                <CartComponent activeCurrency={activeCurrency}/>
            </div>
        )
    }
}
