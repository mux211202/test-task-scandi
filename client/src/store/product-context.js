import React, { Component } from 'react';
import { productQuery } from '../queries';
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

const ProductContext = React.createContext({
    activeProduct:{},
    getActiveProduct: ()=>{},
    allSettedProducts: [],
    setActiveProduct: ()=>{},
    setAttributeValue: ()=>{},
    attributes:[]
});

export  class ProductContextProvider extends Component {
    constructor(){
        super();
        this.state={
            allSettedProducts: [],
            activeProduct:{},
            attributes:[]
        }
    }
    setAttributeValue = (productId, attributeName, index) => {
        this.setState(({attributes, allSettedProducts})=>{
            const attributeIndex  = attributes.findIndex(attribute => attribute.name === attributeName);
            const newAtribute = {...attributes[attributeIndex], selectedValueIndex: index};
            const len = attributes.length;
            const newAtributes = [...attributes.slice(0,attributeIndex), newAtribute, ...attributes.slice(attributeIndex+1, len)];

            const productIndInArr = allSettedProducts.findIndex((product)=> product.id === productId);
            const productsLen = allSettedProducts.length;
            const newSettedProduct = {...allSettedProducts[productIndInArr], attributes: newAtributes}
            const newSettedProducts =   [...allSettedProducts.slice(0,productIndInArr), 
                                        newSettedProduct, 
                                        ...allSettedProducts.slice(productIndInArr+1, productsLen)];
            return {
                attributes: newAtributes,
                allSettedProducts: newSettedProducts
            }
               
        });
    }
    setDefaultAttributes = (product) => {
        const {attributes} = product;
        const newAttributes = attributes.map(attribute => {
            return {...attribute, selectedValueIndex: 0}
        });
        return newAttributes
    }
    setActiveProduct = (productData) => {
        this.setState(({allSettedProducts}) => {
            const attributes = this.setDefaultAttributes(productData);
            const productAndAttributes = {...productData, attributes};
            const productIndexInArr = allSettedProducts.findIndex((product)=> product.id === productData.id);
            if(productIndexInArr === -1){
                return {
                    activeProduct: productData,
                    allSettedProducts: [...allSettedProducts, productAndAttributes],
                    attributes
                }
            }else{
                console.log([...allSettedProducts])
                return  {
                    activeProduct: allSettedProducts[productIndexInArr],
                    attributes: allSettedProducts[productIndexInArr].attributes
                }
            }
        })
    }
    getActiveProduct = (productId) => {
        client.query({
            query: productQuery(productId)
        }).then(res =>{
            this.setActiveProduct(res.data.product);
        })
    }
   
    render() {
        const contextValue = {
            ...this.state,
            getActiveProduct: this.getActiveProduct,
            setActiveProduct: this.setActiveProduct,
            setAttributeValue: this.setAttributeValue
        }
        return (
            <ProductContext.Provider value={contextValue}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

export default ProductContext;