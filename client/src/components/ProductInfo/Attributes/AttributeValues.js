import React, { PureComponent } from 'react'

export default class AttributeValues extends PureComponent {
    render() {
        const {items, type, selectedValueIndex, name} = this.props.attribute;
        const {setAttributeValue, productData} = this.props;
        return (
            <div className='attribute-values'>
                {
                    items.map((item, i)=>{
                        return(
                            type==='text' ?
                            <div
                            onClick={()=>{setAttributeValue(productData,name, i)}}
                            className= {selectedValueIndex=== i ? 'attribute-value active' : 'attribute-value'} 
                            key={`${item.value}`}>
                                {item.value}
                            </div> : 
                            <div
                            onClick={()=>{setAttributeValue(productData,name, i)}}
                            style={{backgroundColor:`${item.value}`}} 
                            className= {selectedValueIndex=== i ? 'attribute-value color active' : 'attribute-value'}  
                            key={`${item.value}`}></div>
                        )
                    })
                }        
            </div>
        )
    }
}
