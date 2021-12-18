import React, { PureComponent } from 'react'
import AttributeValues from './AttributeValues';
export default class AttributeBlock extends PureComponent {
    render() {
        const {attribute, productData, setAttributeValue} = this.props;
        return (
            <div className='attribute-block'>
                <span className='attribute-name'>
                    {attribute.name}
                </span>
                <AttributeValues setAttributeValue={setAttributeValue} productData={productData} attribute={attribute}/>
            </div>
        )
    }
}
