import React, { PureComponent } from 'react'

export default class ProductPageContainer extends PureComponent {
    componentDidMount(){
        const { getActiveProduct, productId, products, setActiveProduct } = this.props;
        const productIndex = products.findIndex(product => productId === product.id );
        if(products.length === 0 || productIndex === -1){ 
            getActiveProduct(productId);
        }else{
            const productData = products[productIndex];
            setActiveProduct(productData);
        }
    }
    render() {
        return (
            <div className='product-page-container'>
                {this.props.children}
            </div>
        )
    }
}
