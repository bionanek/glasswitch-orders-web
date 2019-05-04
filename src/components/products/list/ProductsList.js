import React, { Component } from 'react'
import testProducts from '../ProductsData'
import SimpleList from '../../common/simpleList/SimpleList'
import { withRouter } from 'react-router-dom'

class ProductsList extends Component {
    productsListObjects = testProducts.map(product => {
        return {
            title: product.name,
            subTitle: product.category,
            deletable: product.deletable,
            editHandler: (e) => {
                e.stopPropagation()
                const editUrl = `products/${product.id}/edit`
                this.props.history.push(editUrl)
            },
            clickHandler: () => {
                this.props.history.push(`products/${product.id}`)
            },
            deleteHandler: null
        }
    }, this)

    render() {
        return (
            <div className='products-list-wrapper'>
                <SimpleList
                    elements={this.productsListObjects}
                    deletable={true}
                    editable={true}
                    clickable={true}
                />
            </div>
        )
    }
}

export default withRouter(ProductsList)