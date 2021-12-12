import React, { Component } from 'react'
import './Button.css';
export default class Button extends Component {
    render() {
        const {w, h, children, onClick} = this.props;
        return (
            <button onClick={onClick} className='styled-btn' style={{
                width: w,
                height: h
            }}>
                {children}
            </button>
        )
    }
}
