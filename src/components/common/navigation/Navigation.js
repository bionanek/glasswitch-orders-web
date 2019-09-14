import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'

const Navigation = () => {
	return (
		<ul className="menuHeader">
			<li>
				<NavLink to="/customers">Customers</NavLink>
			</li>
			<li>
				<NavLink to="/products">Products</NavLink>
			</li>
			<li>
				<NavLink to="/orders">Orders</NavLink>
			</li>
		</ul>
	)
}

export default Navigation
