import React, { PureComponent } from 'react';
import Galery from '../Galery/Galery';
import './CartGalery.css'
export default class CartGalery extends PureComponent {
    render() {
        const {galeryData} = this.props;
        return (
            <>
                <Galery galeryData={galeryData} cartGalery={true}/>
            </>
        )
    }
}
