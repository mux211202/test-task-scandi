import React, { Component } from 'react'
import './Button.css';
export default class Button extends Component {
    render() {
        const {w, h, children, onClick, btnClass} = this.props;
        return (
            <button onClick={onClick} className={`styled-btn ${btnClass}`} style={{
                width: w,
                height: h
            }}>
                {children}
            </button>
        )
    }
}
