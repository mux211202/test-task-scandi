import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom';
export default class CategoryList extends PureComponent {
    
    onClickHandler=(e)=>{
        const value = e.target.innerHTML;
        const {changeActiveCategory, getProducts, categories} = this.props;
        const categoryObj = categories.filter(category => category.name === value)[0];
        if(categories[0].loaded || categoryObj.loaded || categoryObj === undefined){
            changeActiveCategory(value);
        }else{
            getProducts(value);
            changeActiveCategory(value);
        }   
    }
    render() {
        const {categories, activeCategory} = this.props;
        
        return (
            <ul className='category-list'>
                {categories.map((category) => {
                    return(
                        <li
                        key={category.name} 
                        className='category-list-item'>
                            <NavLink
                            onClick={this.onClickHandler} 
                            to={`/category/${category.name}`}
                            className={activeCategory === category.name ? "active" : ""}>
                                {category.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
