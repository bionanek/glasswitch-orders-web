import './App.scss'

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Customers from './components/customers/Customers'
import CustomerCRUD from './components/customers/crud/CustomerCRUD'
import Products from './components/products/Products'
import ProductCRUD from './components/products/crud/ProductCRUD'
import Orders from './components/orders/Orders'
import OrderCRUD from './components/orders/crud/OrderCRUD'
import ScrollToTop from './components/common/navigation/ScrollToTop'
import RouteError from './components/common/RouteError'
import Navigation from './components/common/navigation/Navigation'

export default function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop>
					<div>
						<Navigation />
						<div className="content">
							<Switch>
								<Route path="/" component={Customers} exact />
								<Route path="/customers" component={Customers} exact />
								<Route path="/customers/:id" component={CustomerCRUD} exact />
								<Route path="/customers/:id/edit" component={CustomerCRUD} />
								<Route path="/products" component={Products} exact />
								<Route path="/products/:id" component={ProductCRUD} exact />
								<Route path="/products/:id/edit" component={ProductCRUD} exact />
								<Route path="/orders" component={Orders} exact />
								<Route path="/orders/create" component={OrderCRUD} exact />
								<Route path="/orders/:id" component={OrderCRUD} exact />
								<Route path="/orders/:id/edit" component={OrderCRUD} exact />
								<Route component={RouteError} />
							</Switch>
						</div>
					</div>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	)
}
