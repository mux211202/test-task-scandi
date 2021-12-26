import React, { PureComponent } from 'react'
import AttributeBlock from './AttributeBlock';
export default class Attributes extends PureComponent {
    render() {
        const {attributes, id, setAttributeValue, productData} = this.props;
        return (
            <div className='attributes-container'>
                {
                    attributes.map((attribute)=>{
                        return(
                            <AttributeBlock
                            productData={productData}
                            setAttributeValue={setAttributeValue}
                            key={`${id}-${attribute.name}`}
                            attribute={attribute}   
                            />
                        )
                    })
                }
            </div>
        )
    }
}
