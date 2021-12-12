import React, { Component } from 'react';
import "./CategoryPage.css";
import ProductCard from '../components/ProductCard/ProductCard';
export default class CategoryPage extends Component {
    componentDidMount(){
        const {urlCategory, changeActiveCategory, getProducts, categories} = this.props;
        const categoryObj = categories.filter(category => category.name === urlCategory)[0];
        if(categories[0].loaded || categoryObj.loaded || categoryObj === undefined){
            changeActiveCategory(urlCategory);
        }else{
            getProducts(urlCategory);
            changeActiveCategory(urlCategory);
        }
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
        const {products, urlCategory, activeCurrency} = this.props;
        let categoryProducts;
        if(urlCategory==='all'){
            categoryProducts = products;
        }else{
            categoryProducts = products.filter((product)=>product.category === urlCategory);
        }
        categoryProducts = categoryProducts.sort(this.productsSortFunction);
        return (
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
            </>
        )
    }
}
