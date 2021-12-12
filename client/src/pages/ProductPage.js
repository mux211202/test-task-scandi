import React, { Component } from 'react';
import ProductContext from '../store/product-context';
import ProductPageContainer from '../components/ProductPageContainer/ProductPageContainer';
import Galery from '../components/Galery/Galery';
import ProductInfo from '../components/ProductInfo/ProductInfo';
export default class ProductPage extends Component {
    render() {
        const { activeCurrency } = this.props;
        return (
            <ProductContext.Consumer>
                {(ctx)=>{
                const isProductLoaded = Object.keys(ctx.activeProduct).length !== 0;
                return(
                    <ProductPageContainer
                    products={this.props.products}
                    productId={this.props.productId}
                    getActiveProduct={ctx.getActiveProduct}
                    setActiveProduct={ctx.setActiveProduct}
                    >
                        {
                            isProductLoaded ? 
                            <>
                            <Galery galeryData={ctx.activeProduct.gallery}/>
                            <ProductInfo
                            attributes={ctx.attributes}
                            setAttributeValue={ctx.setAttributeValue}
                            settedProducts = {ctx.allSettedProducts} 
                            activeCurrency={activeCurrency} 
                            productData={ctx.activeProduct}/>
                            </>
                            :<p>Loading...</p>
                        }
                    </ProductPageContainer>
                )}}
			</ProductContext.Consumer>
        )
    }
}
