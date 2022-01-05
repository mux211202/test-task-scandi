import React, { PureComponent } from 'react';

const CartContext = React.createContext({
    items:[],
    totalAmount: '$ 0',
    addToCart: ()=>{},
    removeFromCart: ()=>{},
    setTotalAmount: ()=>{},
    isCartOverlayVisible: false,
    toggleCartOverlay: ()=>{},
    logCheckout: ()=>{}
});

export  class CartContextProvider extends PureComponent {
    constructor(){
        super();
        this.state={
            items:[],
            totalAmount: '$ 0', 
            isCartOverlayVisible: false,
            itemsCount:0
        }
    }
    componentDidMount(){
        const sessionItems = JSON.parse(sessionStorage.getItem('items')); // get get items from session
        const sessionTotal = JSON.parse(sessionStorage.getItem('total'));
        const sessionItemsCount = JSON.parse(sessionStorage.getItem('itemsCount'));
        if(sessionItems){
            this.setState({items: sessionItems, totalAmount: sessionTotal, itemsCount: sessionItemsCount })
        }else{
            return
        }
    }

    updateSessionStorage = (data, dataType) => {
        const jsonItems = JSON.stringify(data);
        sessionStorage.setItem(`${dataType}`, jsonItems);
    }

    toggleCartOverlay = () => {
        this.setState(({isCartOverlayVisible}) => {
            const newDisplay = !isCartOverlayVisible;
            if(!isCartOverlayVisible){
                document.body.style.overflow = 'hidden';
            }else{
                document.body.style.overflow = 'auto';
            }
            return {
                isCartOverlayVisible: newDisplay
            }
        })
    }

    setTotalAmount = (items, activeCurrency) => { // this functions sets total amount state
        const amountStr = this.countTotalAmount(items, activeCurrency);
        this.updateSessionStorage(amountStr, 'total');
        this.updateSessionStorage(activeCurrency, 'activeCurrency');
        this.setState({totalAmount: amountStr})
    }//two functions are done not to call sate update in addToCart function

    countTotalAmount=(items, activeCurrency)=>{ // this function calculates total amount
        if(items.length > 0) {  
            const activeCurrencyPrices = items.map(item =>{
                const activePrice = item.prices.filter(pirce =>pirce.currency === activeCurrency.value)[0].amount;
                return activePrice*item.amount
            });
            const sum = activeCurrencyPrices.reduce((prevVal, currentVal) => prevVal +currentVal).toFixed(2);
            const amountStr = `${activeCurrency.string.slice(0,1)} ${sum}`;
            return amountStr
        }else{
            const amountStr = `${activeCurrency.string.slice(0,1)} 0`;
            return amountStr
        }    
    };

    setCartDefaultAttributes = (attributes) => { //sets all attributes to first position if user added item to the cart from category page
        const newAttributes = attributes.map(attribute => {
            return {...attribute, selectedValueIndex: 0}
        }); 
        return newAttributes
    }

    checkEqualAttributes = (existingItemAttributes, attributes)=>{//checks if items have similar attributes
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

    findItemIndex = (items, item) =>{
        const itemIndex = items.findIndex(itemInArr => {
            if(itemInArr.attributes && item.attributes && itemInArr.id === item.id){
                return this.checkEqualAttributes(itemInArr.attributes, item.attributes);
            }else{
                return null
            }
        });
        return itemIndex
    }

    addToCart = (item, activeCurrency, attributes = false) => {
        this.setState(({items, itemsCount})=>{
            if(!attributes){
                attributes = this.setCartDefaultAttributes(item.attributes);
            }
            item = {...item, attributes}
            const existingCartItemIndex = this.findItemIndex(items, item); //check if we have item with same id and selected attrbutes
            const  existingCartItem = items[existingCartItemIndex];
            let updatedItems;
            // console.log(existingCartItemIndex)
            if(existingCartItem){
                const updatedItem = {
                    ...existingCartItem,
                    attributes,
                    amount: existingCartItem.amount + 1 // if we have than we do amount++
                }
                updatedItems = [...items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else{
                updatedItems = items.concat({...item, attributes, amount: 1}); //if we dont have than we add new item to the array
            }
            const newTotal = this.countTotalAmount(updatedItems, activeCurrency);
            this.updateSessionStorage(updatedItems, 'items');
            this.updateSessionStorage(newTotal, 'total');
            const newItemsCount = itemsCount+1;
            this.updateSessionStorage(newItemsCount, 'itemsCount');
            return {
                totalAmount: newTotal,
                items: updatedItems,
                itemsCount: newItemsCount
            };
        })
    }

    removeFromCart = (item, activeCurrency) => {
        this.setState(({items, itemsCount}) =>{
            const itemIndex = this.findItemIndex(items, item);
            let updatedItems;
            let newTotal;
            if(item.amount === 1){// if item's previous amount is 1 item we delete this item from the array
                updatedItems = [...items];
                updatedItems.splice(itemIndex, 1);
                if(items.length === 1){
                    newTotal = `${activeCurrency.string.slice(0,1)} 0`;
                }else{ 
                    newTotal = this.countTotalAmount(updatedItems, activeCurrency);   
                }
            }else{ // else we just decrease amount by 1
                updatedItems = [...items];
                const updatedItem = {
                    ...item,
                    amount: items[itemIndex].amount -1
                }
                updatedItems[itemIndex] = updatedItem;
                newTotal = this.countTotalAmount(updatedItems, activeCurrency);
            }
            this.updateSessionStorage(updatedItems, 'items');
            this.updateSessionStorage(newTotal, 'total');
            const newItemsCount = itemsCount-1;
            this.updateSessionStorage(newItemsCount, 'itemsCount');
            return {
                totalAmount: newTotal,
                items: updatedItems,
                itemsCount: newItemsCount
            };
        })
    }


    logCheckout = () => { // console logs information about order: checkout click
        const {items, totalAmount} = this.state;
        if(items.length > 0){
            console.log('User has ordered these items:');
            console.log(items);
            console.log('User needs to pay:');
            console.log(totalAmount)
        }else{
            return
        }
    }
    
    render() {
        const contextValue = {
            ...this.state,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            setTotalAmount: this.setTotalAmount,
            toggleCartOverlay: this.toggleCartOverlay,
            logCheckout: this.logCheckout
        }
        return (
            <CartContext.Provider value={contextValue}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext;