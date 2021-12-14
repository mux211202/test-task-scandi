import React, { Component } from 'react';
import  ReactDOM  from 'react-dom';
import CartComponent from '../CartComponent/CartComponent';
import './CartOverlay.css';
import Backdrop from '../Layout/Backdrop';
import Button from '../Layout/Button';
import { Link } from 'react-router-dom';
export default class CartOverlay extends Component {
    render() {
        const {activeCurrency, itemsCount, toggleCartOverlay} = this.props;
        return (
            <>
            { ReactDOM.createPortal(<Backdrop/>, document.getElementById('backdrop-root'))}
            <div className='cart-overlay'>
                <div className='cart-overlay-title'> <span className='bold'>My bag, </span>{itemsCount} <span> items</span></div>
                <CartComponent activeCurrency={activeCurrency}/>
                <div className='cart-overlay-btns'>
                    <Link to='/cart' onClick={toggleCartOverlay} className='cart-link btn'>VIEW BAG</Link>
                    <Button h='43px' w='140px'>CHECK OUT</Button>
                </div>
            </div>
            </>
        )
    }
}
