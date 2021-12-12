import React, { Component } from 'react';

const CartContext = React.createContext({
    items:[],
    totalAmount: 0,
    addToCart: ()=>{}
});

export  class CartContextProvider extends Component {
    constructor(){
        super();
        this.state={
            items:[],
            totalAmount: 0, 
            addToCart: ()=>{},
            removeFromCart: ()=>{}
        }
    }
    setTotalAmount=(items, activeCurrency)=>{
        const activeCurrencyPrices = items.map(item =>{
            const activePrice = item.prices.filter(pirce =>pirce.currency === activeCurrency.value)[0].amount;
            return activePrice*item.amount
        });
        const sum = activeCurrencyPrices.reduce((prevVal, currentVal) => prevVal +currentVal);
        return sum.toFixed(2)
    };
    setCartDefaultAttributes = (attributes) => {
        const newAttributes = attributes.map(attribute => {
            return {...attribute, selectedValueIndex: 0}
        }); 
        return newAttributes
    }
    checkEqualAttributes = (existingItemAttributes, attributes)=>{
        let equalAttributesCounter = 0;
        let isAttributesEqual = false;
        if(existingItemAttributes.length !== attributes.length){
            return false
        }else{
            attributes.forEach((attribute,i)=>{
                if(attribute.selectedValueIndex === existingItemAttributes[i].selectedValueIndex){
                    equalAttributesCounter++;
                }
            });
            isAttributesEqual = equalAttributesCounter === attributes.length;
            return isAttributesEqual;
        }
        
    }
    addToCart = (item, activeCurrency, attributes = false) => {
        this.setState(({items})=>{
            if(!attributes){
                attributes = this.setCartDefaultAttributes(item.attributes);
            }
            const existingCartItemIndex = items.findIndex(itemInArr => {
                if(itemInArr.attributes && attributes){
                    return this.checkEqualAttributes(itemInArr.attributes, attributes);
                }
            });
            const  existingCartItem = items[existingCartItemIndex];
            let updatedItems;
            if(existingCartItem){
                const updatedItem = {
                    ...existingCartItem,
                    attributes,
                    amount: existingCartItem.amount + 1
                }
                updatedItems = [...items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else{
                updatedItems = items.concat({...item, attributes, amount: 1});
            }
            const updatedTotalAmount = this.setTotalAmount(updatedItems, activeCurrency);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        })
    }
    removeFromCart = (item, activeCurrency) => {
        this.setState(({items, totalAmount}) =>{
            const itemIndex = items.findIndex(itemInArr => {
                if(itemInArr.attributes && item.attributes){
                    return this.checkEqualAttributes(itemInArr.attributes, item.attributes);
                }
            });
            let updatedItems;
            if(item.amount === 1){
                updatedItems = [...items];
                updatedItems.splice(itemIndex, 1);
            }else{
                updatedItems = [...items];
                const updatedItem = {
                    ...item,
                    amount: items[itemIndex].amount -1
                }
                updatedItems[itemIndex] = updatedItem;
            }
            const updatedTotalAmount = this.setTotalAmount(updatedItems, activeCurrency);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        })
    }
    render() {
        const contextValue = {
            ...this.state,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart
        }
        return (
            <CartContext.Provider value={contextValue}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext;