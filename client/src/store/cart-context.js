import React, { Component } from 'react';

const CartContext = React.createContext({
    items:[],
    totalAmount: '$ 0',
    addToCart: ()=>{},
    removeFromCart: ()=>{},
    setCartAttribute: ()=>{},
    setTotalAmount: ()=>{},
    isCartOverlayVisible: false,
    toggleCartOverlay: ()=>{}
});

export  class CartContextProvider extends Component {
    constructor(){
        super();
        this.state={
            items:[],
            totalAmount: '$ 0', 
            addToCart: ()=>{},
            removeFromCart: ()=>{},
            isCartOverlayVisible: false
        }
    }
    toggleCartOverlay = () => {
        this.setState(({isCartOverlayVisible}) => {
            const newDisplay = !isCartOverlayVisible;
            return {
                isCartOverlayVisible: newDisplay
            }
        })
    }
    setTotalAmount = (items, activeCurrency) => {
        const amountStr = this.countTotalAmount(items, activeCurrency);
        this.setState({totalAmount: amountStr})
    }
    countTotalAmount=(items, activeCurrency)=>{
        if(items.length > 0) {
            const activeCurrencyPrices = items.map(item =>{
                const activePrice = item.prices.filter(pirce =>pirce.currency === activeCurrency.value)[0].amount;
                return activePrice*item.amount
            });
            const sum = activeCurrencyPrices.reduce((prevVal, currentVal) => prevVal +currentVal).toFixed(2);
            const amountStr = `${activeCurrency.string.slice(0,1)} ${sum}`;
            return amountStr
        }else{
            return
        }
        
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
                if(itemInArr.attributes && attributes && itemInArr.id === item.id){
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
            const newTotal = this.countTotalAmount(updatedItems, activeCurrency);
            return {
                totalAmount: newTotal,
                items: updatedItems
            };
        })
    }
    removeFromCart = (item, activeCurrency) => {
        this.setState(({items}) =>{
            const itemIndex = items.findIndex(itemInArr => {
                if(itemInArr.attributes && item.attributes && itemInArr.id === item.id){
                    return this.checkEqualAttributes(itemInArr.attributes, item.attributes);
                }
            });
            let updatedItems;
            let updatedTotalAmount;
            if(item.amount === 1){
                updatedItems = [...items];
                updatedItems.splice(itemIndex, 1);
                if(items.length === 1){
                    updatedTotalAmount = `${activeCurrency.string.slice(0,1)} 0`;
                }else{ 
                    updatedTotalAmount = this.countTotalAmount(updatedItems, activeCurrency);   
                }
            }else{
                updatedItems = [...items];
                const updatedItem = {
                    ...item,
                    amount: items[itemIndex].amount -1
                }
                updatedItems[itemIndex] = updatedItem;
                updatedTotalAmount = this.countTotalAmount(updatedItems, activeCurrency);
            }
            return {
                totalAmount: updatedTotalAmount,
                items: updatedItems
            };
        })
    }
    setCartAttribute = (item, attributeName, index) => {
        this.setState(({items})=>{
            const itemIndex = items.findIndex(itemInArr => {
                if(itemInArr.attributes && item.attributes && itemInArr.id === item.id){
                    return this.checkEqualAttributes(itemInArr.attributes, item.attributes);
                }
            });
            const attributes = items[itemIndex].attributes;
            const attributeIndex  = attributes.findIndex(attribute => attribute.name === attributeName);
            const newAtribute = {...attributes[attributeIndex], selectedValueIndex: index};
            const len = attributes.length;
            const newAtributes = [...attributes.slice(0,attributeIndex), newAtribute, ...attributes.slice(attributeIndex+1, len)];
            const updatedItem = {...item, attributes: newAtributes};
            const updatedItems = [...items];
            updatedItems[itemIndex] = updatedItem;
            return {
                items: updatedItems
            }
               
        });
    }
    render() {
        const contextValue = {
            ...this.state,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            setCartAttribute: this.setCartAttribute,
            setTotalAmount: this.setTotalAmount,
            toggleCartOverlay: this.toggleCartOverlay
        }
        return (
            <CartContext.Provider value={contextValue}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext;