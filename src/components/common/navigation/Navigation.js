import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'

const Navigation = () => {
	return (
  <ul className="menuHeader">
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/customers">Customers</NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
  </ul>
	)
}

export default Navigation
