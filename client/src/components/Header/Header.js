import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryContext from '../../store/category-context';
import CategoryList from './CategoryList/CategoryList';
import './Header.css';
import headerLogo from '../../img/header_logo.svg';
import CurrencyCartContainer from './CurrencyCartContainer/CurrencyCartContainer';
export default class Header extends Component {
    render() {
        return (
            <CategoryContext.Consumer>
				{(ctx)=>{
				return(
					<header className='header'>
                        <CategoryList
                        getProducts={ctx.getProducts}
                        changeActiveCategory={ctx.changeActiveCategory} 
                        categories={ctx.categories} 
                        activeCategory={ctx.activeCategory}/>
                        <Link to='/'><img alt='header-logo' className='header-logo' src={headerLogo}/></Link>
                        <CurrencyCartContainer
                        changeActiveCurrency={ctx.changeActiveCurrency} 
                        currencies={ctx.currencies} 
                        activeCurrency={ctx.activeCurrency}
                        />
                        
                    </header>
				)}}
			</CategoryContext.Consumer>
            
        )
    }
}
