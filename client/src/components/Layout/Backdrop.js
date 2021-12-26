import React, { PureComponent } from 'react'
import './Backdrop.css';
export default class Backdrop extends PureComponent {
    render() {
        const {toggleCartOverlay} = this.props;
        return (
            <div className='backdrop' onClick={toggleCartOverlay}/>
        )
    }
}
