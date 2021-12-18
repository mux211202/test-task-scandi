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
				return(
					<div className='container'>
						<Header/>
						<Switch>
							{ctx.categories.length > 0 ? //we start to mount this component when categories are loaded
								<Route exact path='/category/:id' 
								render={({match}) =>{
									return(
									<CategoryPage
									setError={ctx.setError}
									error={ctx.error}
									categories={ctx.categories}
									activeCurrency={ctx.activeCurrency}
									products={ctx.products}
									urlCategory={match.params.id} 
									changeActiveCategory={ctx.changeActiveCategory}
									getProducts={ctx.getProducts}/>
								)}}/> : null
							}
							<Route path='/product/:id' exact
								render={({match})=>{
									return(
										<ProductPage
										activeCurrency={ctx.activeCurrency}
										products={ctx.products} 
										productId={match.params.id}/>
									)
								}}
							/>
							<Route path='/cart' exact
								render={()=>{
									return(
										<CartPage activeCurrency={ctx.activeCurrency}/>
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

