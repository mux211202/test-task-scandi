import React, { PureComponent } from 'react'
import CategoryContext from './store/category-context';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import PageNotFound from './pages/PageNotFound';
export default class App extends PureComponent {
	 render() {
		 return (
			 <CategoryContext.Consumer>
				{(ctx)=>{
				const {categories, activeCurrency, products, error, changeActiveCategory, getProducts, setError} = ctx;
				return(
					<div className='container'>
						<Header/>
						<Switch>
							{categories.length > 0 ? //we start to mount this component when categories are loaded
								<Route exact path='/category/:id' 
								render={({match}) =>{
									return(
									<CategoryPage
									setError={setError}
									error={error}
									categories={categories}
									activeCurrency={activeCurrency}
									products={products}
									urlCategory={match.params.id} 
									changeActiveCategory={changeActiveCategory}
									getProducts={getProducts}/>
								)}}/> : null
							}
							<Route path='/product/:id' exact
								render={({match})=>{
									return(
										<ProductPage
										activeCurrency={activeCurrency}
										products={products} 
										productId={match.params.id}/>
									)
								}}
							/>
							<Route path='/cart' exact
								render={()=>{
									return(
										<CartPage activeCurrency={activeCurrency}/>
									)
								}}
							/>
							<Route path='/' exact>
								<Redirect to='/category/all'/>
							</Route>
							<Route path='*' exact>
								<PageNotFound/>
							</Route>
						</Switch>
					</div>
				)}}
			</CategoryContext.Consumer>
		 )
	 }
 }

