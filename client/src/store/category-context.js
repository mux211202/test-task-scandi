import React, { Component } from 'react';
import { CATEGORIES, CURRENCIES, categoryQuery } from '../queries';
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

const CategoryContext = React.createContext({
    activeCategory:'all',
    products: [],
    categories:[],
    activeCurrency: {value: 'USD', string:'$ USD'},
    currencies:[],
    changeActiveCategory: ()=>{},
    changeActiveCurrency: ()=>{},
    getProducts: ()=>{},
});

export  class CategoryContextProvider extends Component {
    constructor(){
        super();
        this.state={
            activeCategory:'all',
            activeCurrency: {value: 'USD', string:'$ USD'},
            products:[],
            categories:[],
            currencies:[],
        }
    }
    getAllCategories = () =>{
        const allCategory = {__typename: 'Category', name:'all', loaded: false, index: 0}
        client.query({
            query: CATEGORIES
        }).then(res =>{
            let categArr = res.data.categories.map((categ, index)=>{
                return {...categ, loaded: false, index}
            });
            const resArr = [allCategory, ...categArr];
            this.setState({categories: resArr});
        })
    }
    getAllCurrencies = () =>{
        client.query({
            query: CURRENCIES
        }).then(res =>{
            const currencies = res.data.currencies;
            const currenciesLogoDict = { //an object where we add a logo of currency and it's abbreviation
                'USD':'$',
                'GBP':'£',
                'AUD':'$',
                'JPY':'¥',
                'RUB':'₽',
                'EUR':'€'
            }
            const newCurrencies = currencies.map((currency)=>{
                for(const key in currenciesLogoDict){
                    if(key===currency){
                        return{
                            value: currency,
                            string: `${currenciesLogoDict[key]} ${currency}`
                        }
                    }  
                }      
            });
            this.setState({currencies: newCurrencies})
        })
    }
    componentDidMount(){
        this.getAllCurrencies()
        this.getAllCategories();
    }
    getAllProducts =() =>{ //a method that is used in getProducts method, just to do it shorter
        const {categories} = this.state;
        const categArr = categories.filter(elem=> elem.name !== 'all');
        let productsArr = [];
		categArr.forEach((categ) =>{
			client.query({
				query: categoryQuery(categ.name)
			}).then(result =>
				this.setState(()=>{
                    const categProducts = result.data.category.products;
                    const newArr = [...productsArr, ...categProducts];
                    productsArr = newArr;
                    return{
                        products: newArr,
                    }
                    
					
				}));
		})
    }
    getProducts = (categ) => {
        if(categ === 'all'){
            this.getAllProducts();
        }else{
            client.query({
                query: categoryQuery(categ)
            }).then(res =>{
                this.setState(({products}) => { 
                        const categProducts = res.data.category.products;
                        return {
                            products:[...categProducts, ...products],
                        }
                });
            })
        }
    }
    setLoadedCategory = (categ) =>{
        this.setState(({categories}) =>{
            let categArr = [];
            const categObj = categories.filter(category => category.name === categ)[0];
            if (categories[0].loaded || categObj.loaded || categObj === undefined){
                return
            }else if(categ === 'all'){
                categArr = categories.map((category) => {return {...category, loaded: true}})
            }else{
                const index = categories.findIndex((category) => category.name === categ);
                categArr = categories;
                categArr[index].loaded = true;
                let loadedCount = 0;
                categArr.forEach(category => {
                    if(category.loaded){
                        loadedCount++
                    }
                })
                if(loadedCount === categories.length - 1){
                    categArr[0].loaded = true
                }  
            }
            return {
                categories: categArr
            }
            
        })
    }
    changeActiveCurrency = (currency) => {
        const {currencies} = this.state;
        const currencyObj = currencies.filter((cur)=> cur.value === currency)[0];
        this.setState({activeCurrency: currencyObj})
    }
    changeActiveCategory = (categ) => {
        this.setLoadedCategory(categ);
        this.setState({activeCategory: categ});
    }
    render() {
        const contextValue = {
            ...this.state, 
            changeActiveCategory: this.changeActiveCategory,
            changeActiveCurrency: this.changeActiveCurrency,
            getProducts: this.getProducts,
        }
        return (
            <CategoryContext.Provider value={contextValue}>
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}

export default CategoryContext;