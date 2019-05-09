import './App.scss'

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/home/Home'
import Customers from './components/customers/Customers'
import CustomerDetail from './components/customers/crud/CustomerDetail'
import CustomerEdit from './components/customers/crud/CustomerEdit'
import Products from './components/products/Products'
import ProductDetail from './components/products/crud/ProductDetail'
import ProductEdit from './components/products/crud/ProductEdit'
import About from './components/about/About'
import RouteError from './components/common/RouteError'
import Navigation from './components/common/navigation/Navigation'

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<div>
						<Navigation />
						<div className="content">
							<Switch>
								<Route path="/" component={Home} exact />
								<Route path="/customers" component={Customers} exact />
								<Route path="/customers/:id" component={CustomerDetail} exact />
								<Route path="/customers/:id/edit" component={CustomerEdit} />
								<Route path="/products" component={Products} exact />
								<Route path="/products/:id" component={ProductDetail} exact />
								<Route path="/products/:id/edit" component={ProductEdit} exact />
								<Route path="/about" component={About} />
								<Route component={RouteError} />
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
