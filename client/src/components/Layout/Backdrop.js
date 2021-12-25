import React, { Component } from 'react'
import './Backdrop.css';
export default class Backdrop extends Component {
    render() {
        const {toggleCartOverlay} = this.props;
        return (
            <div className='backdrop' onClick={toggleCartOverlay}/>
        )
    }
}
