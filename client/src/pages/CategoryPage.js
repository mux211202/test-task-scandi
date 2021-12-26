import React, { PureComponent } from 'react';
import "./CategoryPage.css";
import ProductCard from '../components/ProductCard/ProductCard';
import PageNotFound from './PageNotFound';
export default class CategoryPage extends PureComponent {
    componentDidMount(){
        const {urlCategory, changeActiveCategory, getProducts, categories, setError} = this.props;
        const categoryObj = categories.filter(category => category.name === urlCategory)[0];
        if(categoryObj !== undefined){
            setError('');
            if(categories[0].loaded || categoryObj.loaded || categoryObj === undefined){
                changeActiveCategory(urlCategory);
            }else{
                getProducts(urlCategory);
                changeActiveCategory(urlCategory);
            }
        }else{
            setError('url-not-correct');
        }
        
    }
    componentWillUnmount(){
        const {changeActiveCategory} = this.props;
        changeActiveCategory({});
    }
    productsSortFunction = (a, b) => {
        const nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        
        if(a.inStock){
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
        }else{
            return 1
        }
        if(b.inStock){
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
        }else{
            return 1
        }
    }
    
    render() {
        const {products, urlCategory, activeCurrency,error} = this.props;
        let categoryProducts;
        if(urlCategory==='all'){
            categoryProducts = products;
        }else{
            categoryProducts = products.filter((product)=>product.category === urlCategory);
        }
        categoryProducts = categoryProducts.sort(this.productsSortFunction);
        return (
            <>
                {error !== 'url-not-correct' ? 
                <>
                <h1 className="category-name">
                    {this.props.urlCategory}
                </h1>
                <div className="product-card-container">
                    {
                        categoryProducts.map((product)=>{
                            return(<ProductCard
                                    activeCategory={urlCategory}
                                    activeCurrency={activeCurrency} 
                                    key={`${product.id}-product-card`} 
                                    data={product}/>
                                )
                        })
                    }
                </div>
                </> : <PageNotFound/>}
            </>
        )
    }
}
