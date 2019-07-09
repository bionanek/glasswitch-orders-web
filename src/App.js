import './App.scss'

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/home/Home'
import Customers from './components/customers/Customers'
import CustomerCRUD from './components/customers/crud/CustomerCRUD'
import Products from './components/products/Products'
import ProductCRUD from './components/products/crud/ProductCRUD'
import Orders from './components/orders/Orders'
import OrderCreate from './components/orders/crud/OrderCreate'
import OrderDetail from './components/orders/crud/OrderDetail'
import OrderEdit from './components/orders/crud/OrderEdit'
import About from './components/about/About'
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
								<Route path="/" component={Home} exact />
								<Route path="/customers" component={Customers} exact />
								<Route path="/customers/:id" component={CustomerCRUD} exact />
								<Route path="/customers/:id/edit" component={CustomerCRUD} />
								<Route path="/products" component={Products} exact />
								<Route path="/products/:id" component={ProductCRUD} exact />
								<Route path="/products/:id/edit" component={ProductCRUD} exact />
								<Route path="/orders" component={Orders} exact />
								<Route path="/orders/create" component={OrderCreate} exact />
								<Route path="/orders/:id" component={OrderDetail} exact />
								<Route path="/orders/:id/edit" component={OrderEdit} exact />
								<Route path="/about" component={About} />
								<Route component={RouteError} />
							</Switch>
						</div>
					</div>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	)
}
