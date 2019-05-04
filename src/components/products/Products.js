import React from 'react'
import ProductsList from './list/ProductsList'
import './Products.scss'

const Products = () => {
  return (
    <div className='products'>
      <ProductsList className='products-list'/>
    </div>
  )
}

export default Products
