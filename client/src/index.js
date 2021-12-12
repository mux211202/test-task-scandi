import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CategoryContextProvider } from './store/category-context';
import { ProductContextProvider } from './store/product-context';
import { CartContextProvider } from './store/cart-context';

ReactDOM.render(
	<CategoryContextProvider>
		<ProductContextProvider>
			<CartContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</CartContextProvider>
		</ProductContextProvider>
	</CategoryContextProvider>,
	document.getElementById('root')
);


