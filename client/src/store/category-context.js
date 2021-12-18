import React, { PureComponent } from 'react';
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
    createActiveCurrencyObj: ()=>{},
    setError: ()=>{}
});

export  class CategoryContextProvider extends PureComponent {
    constructor(){
        super();
        this.state={
            activeCategory:'',
            activeCurrency: {value: 'USD', string:'$ USD'},
            products:[],
            categories:[],
            currencies:[],
            error:''
        }
    }
    setError=(error)=>{
        this.setState({error});
    }
    getAllCategories = () =>{//set category array
        const allCategory = {__typename: 'Category', name:'all', loaded: false, index: 0}//create an all category object
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
    getAllCurrencies = () =>{//set all currencies array
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
                            value: currency,//value is just an abbreviation('USD', 'GPB')
                            string: `${currenciesLogoDict[key]} ${currency}`//string is currency's logo + value
                        }
                    }
                }
                return null   
            });
            this.setState({currencies: newCurrencies})
        })
    }
    componentDidMount(){
        this.getAllCurrencies();
        this.getAllCategories();
        const sessionCurrency = JSON.parse(sessionStorage.getItem('activeCurrency'));
        if(sessionCurrency){
            this.changeActiveCurrency(sessionCurrency);
        }
    }
    getAllProducts =() =>{ //a method that is used in getProducts method, just to do it shorter
        const {categories} = this.state;
        const categArr = categories.filter(elem=> elem.name !== 'all');
        let productsArr = [];
		categArr.forEach((categ) =>{//get products for every category, we have, to show all products
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
    setLoadedCategory = (categ) =>{//this function is needed to remember what categories user has already loaded
        this.setState(({categories}) =>{
            let categArr = [];
            const categObj = categories.filter(category => category.name === categ)[0];
            if (!categObj || categObj === undefined || categObj.loaded){//if category is already loaded-> return
                return
            }else if(categ === 'all'){//if category==='all', update all categories to loaded
                categArr = categories.map((category) => {return {...category, loaded: true}})
            }else{//else -> find the category and update 'loaded' key
                const index = categories.findIndex((category) => category.name === categ);
                categArr = categories;
                categArr[index].loaded = true;
                let loadedCount = 0;
                categArr.forEach(category => {
                    if(category.loaded){
                        loadedCount++
                    }
                })
                if(loadedCount === categories.length - 1){//if this is the last loaded category update 'all' category as loaded
                    categArr[0].loaded = true
                }  
            }
            return {
                categories: categArr
            }
            
        })
    }
    createActiveCurrencyObj = (currency) => {//this function is needed to create currency object outside this file
        const {currencies} = this.state;
        const currencyObj = currencies.filter((cur)=> cur.value === currency)[0];
        return currencyObj
    }
    changeActiveCurrency = (currency) => {
        if(typeof currency === 'string'){
            const currencyObj = this.createActiveCurrencyObj(currency);   
            this.setState({activeCurrency: currencyObj})
        }else{
            this.setState({activeCurrency: currency})
        }
    }
    changeActiveCategory = (categ) => {
        this.setLoadedCategory(categ);
        this.setState(({activeCategory, categories}) =>{
            const categoryObj = categories.filter(category => category.name === categ)[0];
            let er;
            let newCategory;
            if(categoryObj !== undefined && categoryObj){ //if catgory obj exists in category array
                er = '';
                newCategory = categoryObj;
            }else{//else set an error
                er = 'url-not-correct';
                newCategory = activeCategory;
            }
            return{
                error: er,
                activeCategory: newCategory
            }
        });
    }
    render() {
        const contextValue = {
            ...this.state, 
            changeActiveCategory: this.changeActiveCategory,
            changeActiveCurrency: this.changeActiveCurrency,
            getProducts: this.getProducts,
            createActiveCurrencyObj: this.createActiveCurrencyObj,
            setError: this.setError
        }
        return (
            <CategoryContext.Provider value={contextValue}>
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}

export default CategoryContext;