import React, { PureComponent } from 'react';
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
    attributes:[],
    error:''
});

export  class ProductContextProvider extends PureComponent {
    constructor(){
        super();
        this.state={
            allSettedProducts: [],
            activeProduct:{},
            attributes:[],
            error:''
        }
    }

    setAllSettedProducts = (productId, allSettedProducts, attributes) => {//set products that we have already loaded
        const productIndInArr = allSettedProducts.findIndex((product)=> product.id === productId);
        const productsLen = allSettedProducts.length;
        const newSettedProduct = {...allSettedProducts[productIndInArr], attributes}
        const newSettedProducts =   [...allSettedProducts.slice(0,productIndInArr), 
                                    newSettedProduct, 
                                    ...allSettedProducts.slice(productIndInArr+1, productsLen)];
        return newSettedProducts
    }

    setAttributeValue = (product, attributeName, index) => {
        this.setState(({attributes, allSettedProducts})=>{
            const attributeIndex  = attributes.findIndex(attribute => attribute.name === attributeName);
            const newAtribute = {...attributes[attributeIndex], selectedValueIndex: index};
            const len = attributes.length;
            const newAtributes = [...attributes.slice(0,attributeIndex), newAtribute, ...attributes.slice(attributeIndex+1, len)];
            const newSettedProducts = this.setAllSettedProducts(product.id, allSettedProducts, newAtributes);
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
            if(productIndexInArr === -1){//if we dont have this product in allSettedProducts -> add it to allSettedProducts array
                return {
                    error:'', 
                    activeProduct: productData,
                    allSettedProducts: [...allSettedProducts, productAndAttributes],
                    attributes
                }
            }else{
                console.log([...allSettedProducts])
                return  {
                    error: '',
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
            console.log(res)
            if(res.data.product){ 
                this.setActiveProduct(res.data.product);
                this.setState({error: ''});
            }else{
                this.setState({error: 'url-not-correct'});
            }
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