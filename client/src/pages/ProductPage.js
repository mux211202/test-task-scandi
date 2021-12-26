import React, { PureComponent } from 'react';
import ProductContext from '../store/product-context';
import ProductPageContainer from '../components/ProductPageContainer/ProductPageContainer';
import Galery from '../components/Galery/Galery';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import PageNotFound from './PageNotFound';
export default class ProductPage extends PureComponent {
    render() {
        const { activeCurrency, productId, products } = this.props;
        return (
            <ProductContext.Consumer>
                {(ctx)=>{
                const isProductLoaded = Object.keys(ctx.activeProduct).length !== 0;
                const isUrlIncorrect = ctx.error === 'url-not-correct';
                return(
                    <ProductPageContainer
                    products={products}
                    productId={productId}
                    getActiveProduct={ctx.getActiveProduct}
                    setActiveProduct={ctx.setActiveProduct}
                    >
                        {
                            isProductLoaded &&
                            <>
                            <Galery galeryData={ctx.activeProduct.gallery}/>
                            <ProductInfo
                            attributes={ctx.attributes}
                            setAttributeValue={ctx.setAttributeValue}
                            settedProducts = {ctx.allSettedProducts} 
                            activeCurrency={activeCurrency} 
                            productData={ctx.activeProduct}/>
                            </>
                            
                        }
                        {isUrlIncorrect &&  <PageNotFound/> }
                    </ProductPageContainer>
                )}}
			</ProductContext.Consumer>
        )
    }
}
